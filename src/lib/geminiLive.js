import { GoogleGenAI, Modality, ThinkingLevel } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MODEL = 'gemini-2.0-flash-exp';

// ── Build System Prompt from Kundli Data ──
export function buildAstroContext(kundliData) {
  if (!kundliData) {
    return `
You are ज्योतिष AI, an expert Vedic astrologer.
Answer questions about Vedic astrology in a warm, conversational English tone.
Keep answers short — 2-3 sentences max.
Occasionally use Sanskrit terms naturally.
`;
  }

  return `
You are ज्योतिष AI, an expert Vedic astrologer with deep knowledge of the user's birth chart.

USER'S COMPLETE KUNDLI:
Name: ${kundliData.name || 'Seeker'}
Date of Birth: ${kundliData.date_of_birth || 'Not specified'}
Birth Place: ${kundliData.birth_place || 'Not specified'}
Birth Time: ${kundliData.time_of_birth || 'Sunrise Chart'}

CORE CHART DETAILS:
Lagna (Ascendant): ${kundliData.lagna || 'Aries'}
Rashi (Moon Sign): ${kundliData.rashi || 'Mesh'}
Nakshatra: ${kundliData.nakshatra || 'Ashwini'}
Gana: ${kundliData.gana || 'Deva'}
Manglik: ${kundliData.is_manglik ? 'Yes' : 'No'}

PLANETARY POSITIONS:
${kundliData.planets ? 
  Object.entries(kundliData.planets)
    .map(([p, d]) => `${p}: ${d.sign || d.rashi || ''}, House ${d.house || ''}, ${d.degree || ''}`)
    .join('\n') 
  : 'Standard planetary positions apply'}

CURRENT DASHA:
${kundliData.current_dasha ? 
  `${kundliData.current_dasha.lord || ''} Mahadasha (${kundliData.current_dasha.start || ''} - ${kundliData.current_dasha.end || ''})`
  : 'Dasha information not available'}

NUMEROLOGY:
Life Path Number: ${kundliData.life_path_number || ''}
Destiny Number: ${kundliData.destiny_number || ''}
Soul Urge Number: ${kundliData.soul_urge_number || ''}

CONVERSATION RULES (STRICT):
1. You have full access to this person's kundli above
2. Answer in warm, conversational English
3. Keep each answer SHORT — max 30 seconds when spoken
4. Use their name "${kundliData.name || 'Seeker'}" occasionally
5. Reference specific planets/houses from their chart
6. Mix occasional Hindi/Sanskrit terms naturally (karma, dharma, Lagna, Rashi, etc.)
7. Never make medical, legal, or financial decisions
8. Be positive and empowering, not scary
9. If asked something not in the chart, say so honestly
`;
}

// ── Main Gemini Live Class ──────────────
export class GeminiLiveSession {
  constructor() {
    this.client = null;
    this.session = null;
    this.isActive = false;

    // Audio contexts
    this.inputContext = null; // For mic (16kHz)
    this.outputContext = null; // For playback (24kHz)

    // Audio processing
    this.processor = null;
    this.mediaStream = null;
    this.audioQueue = [];
    this.isPlaying = false;

    // Callbacks
    this.onTranscript = null; // User speech text
    this.onAiResponse = null; // AI response text
    this.onAudioLevel = null; // Waveform data
    this.onStateChange = null; // Session state
    this.onError = null; // Error handler
  }

  // ── Initialize session ────────────────
  async start(kundliData, voiceName = 'Zephyr') {
    try {
      this.client = new GoogleGenAI({ 
        apiKey: GEMINI_API_KEY 
      });

      const systemPrompt = buildAstroContext(kundliData);

      this.session = await this.client.live.connect({
        model: MODEL,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voiceName || 'Zephyr'
              }
            }
          },
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.MINIMAL
          }
        },
        callbacks: {
          onopen: () => {
            console.log('✅ Gemini Live connected');
            this.isActive = true;
            this.onStateChange?.('connected');
          },
          onmessage: (message) => {
            this._handleMessage(message);
          },
          onerror: (error) => {
            console.error('Gemini Live error:', error);
            this.onError?.(error);
            this.onStateChange?.('error');
          },
          onclose: (event) => {
            console.log('Gemini Live closed:', event);
            this.isActive = false;
            this.onStateChange?.('disconnected');
          }
        }
      });

      // Start microphone
      await this._startMicrophone();
      this.onStateChange?.('listening');

      return true;
    } catch (error) {
      console.error('Failed to start session:', error);
      this.onError?.(error);
      return false;
    }
  }

  // ── Handle incoming messages ──────────
  _handleMessage(message) {
    // Audio response from Gemini
    if (message.data) {
      this._playAudioChunk(message.data);
      this.onStateChange?.('speaking');
    }

    // Text transcript (if available)
    if (message.text) {
      this.onAiResponse?.(message.text);
    }

    // Turn complete
    if (message.serverContent?.turnComplete) {
      this.onStateChange?.('listening');
    }

    // Interrupted (user spoke while AI speaking)
    if (message.serverContent?.interrupted) {
      this._stopPlayback();
      this.onStateChange?.('listening');
    }
  }

  // ── Start microphone input ────────────
  async _startMicrophone() {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    this.inputContext = new (window.AudioContext || window.webkitAudioContext)({ 
      sampleRate: 16000 
    });

    const source = this.inputContext.createMediaStreamSource(this.mediaStream);

    // Script processor for PCM data
    this.processor = this.inputContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (event) => {
      if (!this.isActive || !this.session) return;

      const inputData = event.inputBuffer.getChannelData(0);

      // Send audio level for waveform
      const level = this._getAudioLevel(inputData);
      this.onAudioLevel?.(level);

      // Convert Float32 to PCM16
      const pcm16 = this._float32ToPCM16(inputData);

      // Send to Gemini
      this.session.sendRealtimeInput({
        audio: {
          data: pcm16,
          mimeType: 'audio/pcm;rate=16000'
        }
      });
    };

    source.connect(this.processor);
    this.processor.connect(this.inputContext.destination);
  }

  // ── Play audio response ───────────────
  async _playAudioChunk(base64Audio) {
    if (!this.outputContext) {
      this.outputContext = new (window.AudioContext || window.webkitAudioContext)({ 
        sampleRate: 24000 
      });
    }

    try {
      // Decode base64 to ArrayBuffer
      const binaryStr = atob(base64Audio);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      // Convert PCM16 to Float32
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0;
      }

      // Create audio buffer
      const audioBuffer = this.outputContext.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      // Play
      const source = this.outputContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.outputContext.destination);
      source.start();
    } catch (err) {
      console.error('Audio playback error:', err);
    }
  }

  // ── Stop all playback ─────────────────
  _stopPlayback() {
    if (this.outputContext) {
      this.outputContext.close();
      this.outputContext = null;
    }
  }

  // ── Convert Float32 to PCM16 ──────────
  _float32ToPCM16(float32Array) {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);

    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  // ── Get audio level for waveform ──────
  _getAudioLevel(float32Array) {
    let sum = 0;
    for (let i = 0; i < float32Array.length; i++) {
      sum += Math.abs(float32Array[i]);
    }
    return sum / float32Array.length;
  }

  // ── Send text message ─────────────────
  async sendText(text) {
    if (!this.session || !this.isActive) return;

    try {
      this.session.sendClientContent({
        turns: [{
          role: 'user',
          parts: [{ text }]
        }],
        turnComplete: true
      });
      this.onStateChange?.('thinking');
    } catch (err) {
      console.error('Send text error:', err);
    }
  }

  // ── Interrupt AI response ─────────────
  interrupt() {
    this._stopPlayback();
    this.onStateChange?.('listening');
  }

  // ── End session ───────────────────────
  async stop() {
    this.isActive = false;

    // Stop microphone
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }

    // Close audio contexts
    if (this.inputContext) {
      await this.inputContext.close();
      this.inputContext = null;
    }
    if (this.outputContext) {
      await this.outputContext.close();
      this.outputContext = null;
    }

    // Close processor
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }

    // Close session
    if (this.session) {
      this.session.close();
      this.session = null;
    }

    this.onStateChange?.('disconnected');
  }
}
