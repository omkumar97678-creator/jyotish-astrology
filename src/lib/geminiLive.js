import { GoogleGenAI } from '@google/genai';
import { getCompleteNumerology } from './kundliService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ── Build Full Astrologer System Prompt with Kundli & Numerology ──
export function buildAstroSystemPrompt(kundliData) {
  const name = kundliData?.name || 'Seeker';
  const dob = kundliData?.date_of_birth || kundliData?.dob || '2004-09-08';
  const birthPlace = kundliData?.birth_place || kundliData?.place || 'Delhi, India';
  const birthTime = kundliData?.time_of_birth || kundliData?.time || 'Sunrise Chart';
  const lagna = kundliData?.lagna || 'Scorpio (Vrishchik)';
  const rashi = kundliData?.rashi || 'Gemini (Mithun)';
  const nakshatra = kundliData?.nakshatra || 'Ardra';

  // Calculate complete numerology numbers
  const numerology = getCompleteNumerology(name, dob);
  const mulank = kundliData?.mulank || numerology?.mulank || 8;
  const lifePath = kundliData?.life_path_number || numerology?.lifePathNumber || 5;
  const destiny = kundliData?.destiny_number || numerology?.destinyNumber || 3;
  const soulUrge = kundliData?.soul_urge_number || numerology?.soulUrgeNumber || 9;
  const luckyNumbers = numerology?.luckyNumbers?.join(', ') || '5, 3, 6';
  const luckyColors = numerology?.luckyColors?.join(', ') || 'Golden Yellow, Emerald Green';
  const dasha = kundliData?.current_dasha?.lord || kundliData?.mahadasha?.activeDasha?.planet || 'Active Mahadasha';

  return `
You are a warm, wise, authentic Vedic Astrologer (Jyotishi) speaking on a 1-on-1 LIVE voice phone consultation with ${name}.

SEEKER'S VEDIC CHART & NUMEROLOGY CONTEXT:
- Name: ${name}
- Date of Birth: ${typeof dob === 'object' ? `${dob.year}-${dob.month}-${dob.day}` : dob}
- Birth Place: ${birthPlace}
- Birth Time: ${typeof birthTime === 'object' ? `${birthTime.hour}:${birthTime.minute} ${birthTime.period || ''}` : birthTime}
- Ascendant / Lagna: ${lagna}
- Moon Sign (Chandra Rashi): ${rashi}
- Janma Nakshatra: ${nakshatra}
- Active Mahadasha: ${dasha}
- Mulank (Birth Day Number): ${mulank}
- Bhagyank / Life Path Number: ${lifePath}
- Namank / Destiny Number: ${destiny}
- Soul Urge Number: ${soulUrge}
- Lucky Numbers: ${luckyNumbers}
- Lucky Colors: ${luckyColors}

STRICT CONVERSATIONAL RULES:
1. **Never Ask for Birth Details**:
   - You ALREADY have the seeker's complete chart and numerology numbers above.
   - If seeker asks "Mera Life Path Number kya hai?" or "Mera Mulank kya hai?", answer IMMEDIATELY with their exact numbers (Life Path: ${lifePath}, Mulank: ${mulank}, Destiny: ${destiny}).
2. **Natural Phone Call Flow**:
   - Speak naturally like a real human astrologer on a phone call.
   - If user says "Hello" or "Namaste", greet them warmly in 1 short sentence: "Namaste ${name} ji! Main aapka Jyotish saathi hoon. Kahiye, aaj aap kis vishay me baat karna chahte hain?"
   - For astrology questions, keep responses concise (2 to 3 spoken sentences) so the user can easily talk back and forth.
3. **Audio-Only Output**:
   - Never use markdown (*, **, #, bullet points). Speak in clean, warm conversational Hindi-English / English.
`;
}

// ── Convert PCM Float32 to 16-bit PCM Little Endian ──────────────
function floatTo16BitPCM(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

// ── ArrayBuffer to Base64 ─────────────────────────────────────────
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// ── Decode Base64 PCM16 to Float32Array ───────────────────────────
function base64PCM16ToFloat32(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const view = new DataView(buffer);
  const numSamples = Math.floor(len / 2);
  const float32 = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const int16 = view.getInt16(i * 2, true);
    float32[i] = int16 < 0 ? int16 / 32768 : int16 / 32767;
  }
  return float32;
}

// ── Gemini 3.1 Live Session Manager ──────────────────────────────
export class GeminiLiveSession {
  constructor() {
    this.client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.session = null;
    this.isActive = false;

    // Audio Input (Microphone)
    this.mediaStream = null;
    this.inputAudioContext = null;
    this.inputSource = null;
    this.processor = null;
    this.inputAnalyser = null;

    // Audio Output (Speaker Queue)
    this.outputAudioContext = null;
    this.nextPlayTime = 0;
    this.isPlaying = false;
    this.audioQueue = [];
    this.activeSourceNodes = [];

    // Callbacks
    this.onStateChange = null; // 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'disconnected' | 'error'
    this.onAudioLevel = null;  // (level: number) => void
    this.onAiResponse = null;  // (text: string) => void
    this.onError = null;       // (err: any) => void

    this.animFrameId = null;
  }

  // ── Start Gemini Live Session ───────────────────
  async start(kundliData) {
    if (this.isActive) return true;

    this.isActive = true;
    this.onStateChange?.('connecting');

    const systemPrompt = buildAstroSystemPrompt(kundliData);

    try {
      // 1. Initialize Microphone (Audio Input)
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.inputAudioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000,
      });

      if (this.inputAudioContext.state === 'suspended') {
        await this.inputAudioContext.resume();
      }

      this.inputSource = this.inputAudioContext.createMediaStreamSource(this.mediaStream);
      this.inputAnalyser = this.inputAudioContext.createAnalyser();
      this.inputAnalyser.fftSize = 64;
      this.inputSource.connect(this.inputAnalyser);

      // ScriptProcessor for 16kHz PCM streaming
      this.processor = this.inputAudioContext.createScriptProcessor(2048, 1, 1);
      this.inputSource.connect(this.processor);
      this.processor.connect(this.inputAudioContext.destination);

      this.processor.onaudioprocess = (e) => {
        if (!this.isActive || !this.session) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16Buffer = floatTo16BitPCM(inputData);
        const base64Chunk = arrayBufferToBase64(pcm16Buffer);

        try {
          this.session.sendRealtimeInput({
            mediaChunks: [
              {
                mimeType: 'audio/pcm;rate=16000',
                data: base64Chunk,
              },
            ],
          });
        } catch (err) {
          // Ignore transient send errors
        }
      };

      // 2. Initialize Output Audio Context (24kHz for Gemini Live Audio)
      this.outputAudioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 24000,
      });
      if (this.outputAudioContext.state === 'suspended') {
        await this.outputAudioContext.resume();
      }
      this.nextPlayTime = this.outputAudioContext.currentTime;

      // 3. Connect to Gemini 3.1 Live WebSocket API
      this.session = await this.client.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: 'Zephyr', // Natural, warm conversational voice
              },
            },
          },
          thinkingConfig: {
            thinkingLevel: 'minimal', // Lowest latency
          },
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
        },
        callbacks: {
          onopen: () => {
            console.log('✦ Gemini Live WebSocket connected');
            this.onStateChange?.('listening');
            this._startWaveformTracking();
          },
          onmessage: (message) => {
            // Check for AI audio output
            if (message.serverContent?.modelTurn?.parts) {
              const parts = message.serverContent.modelTurn.parts;
              for (const part of parts) {
                if (part.inlineData?.data) {
                  this._playAudioChunk(part.inlineData.data);
                  this.onStateChange?.('speaking');
                }
                if (part.text) {
                  this.onAiResponse?.(part.text);
                }
              }
            }

            // User Interrupted AI speaking
            if (message.serverContent?.interrupted) {
              console.log('✦ User interrupted AI — stopping playback');
              this._stopCurrentPlayback();
              this.onStateChange?.('listening');
            }

            // Turn complete
            if (message.serverContent?.turnComplete) {
              this._scheduleTurnCompleteCheck();
            }
          },
          onerror: (err) => {
            console.error('Gemini Live error:', err);
            this.onError?.(err?.message || 'Gemini Live error');
          },
          onclose: (e) => {
            console.log('Gemini Live session closed:', e);
            if (this.isActive) {
              this.stop();
            }
          },
        },
      });

      return true;
    } catch (err) {
      console.error('Failed to start Gemini Live Session:', err);
      this.stop();
      this.onError?.(err?.message || 'Connection failed. Please check mic permissions.');
      this.onStateChange?.('error');
      return false;
    }
  }

  // ── Play Incoming PCM Chunk Seamlessly ─────────
  _playAudioChunk(base64Pcm) {
    if (!this.outputAudioContext || !this.isActive) return;

    try {
      const float32Samples = base64PCM16ToFloat32(base64Pcm);
      const audioBuffer = this.outputAudioContext.createBuffer(
        1,
        float32Samples.length,
        24000
      );
      audioBuffer.getChannelData(0).set(float32Samples);

      const sourceNode = this.outputAudioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(this.outputAudioContext.destination);

      const currentTime = this.outputAudioContext.currentTime;
      if (this.nextPlayTime < currentTime) {
        this.nextPlayTime = currentTime + 0.02; // Small 20ms safety offset
      }

      sourceNode.start(this.nextPlayTime);
      this.nextPlayTime += audioBuffer.duration;
      this.isPlaying = true;
      this.activeSourceNodes.push(sourceNode);

      sourceNode.onended = () => {
        const idx = this.activeSourceNodes.indexOf(sourceNode);
        if (idx > -1) this.activeSourceNodes.splice(idx, 1);

        if (
          this.activeSourceNodes.length === 0 &&
          this.outputAudioContext &&
          this.outputAudioContext.currentTime >= this.nextPlayTime - 0.05
        ) {
          this.isPlaying = false;
          if (this.isActive) {
            this.onStateChange?.('listening');
          }
        }
      };
    } catch (err) {
      console.warn('Audio chunk decode/play error:', err);
    }
  }

  // ── Stop Current Audio Playback (For Interruptions) ──
  _stopCurrentPlayback() {
    for (const source of this.activeSourceNodes) {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {
        /* ignore */
      }
    }
    this.activeSourceNodes = [];
    this.isPlaying = false;
    if (this.outputAudioContext) {
      this.nextPlayTime = this.outputAudioContext.currentTime;
    }
  }

  // ── Interrupt AI ───────────────────────────────
  interrupt() {
    this._stopCurrentPlayback();
    this.onStateChange?.('listening');
  }

  // ── Schedule Return to Listening when Queue Ends ──
  _scheduleTurnCompleteCheck() {
    const checkInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(checkInterval);
        return;
      }

      if (
        !this.isPlaying ||
        !this.outputAudioContext ||
        this.outputAudioContext.currentTime >= this.nextPlayTime - 0.05
      ) {
        clearInterval(checkInterval);
        this.isPlaying = false;
        this.onStateChange?.('listening');
      }
    }, 150);
  }

  // ── Waveform Level Tracking ────────────────────
  _startWaveformTracking() {
    if (!this.inputAnalyser) return;
    const dataArray = new Uint8Array(this.inputAnalyser.frequencyBinCount);

    const track = () => {
      if (!this.isActive || !this.inputAnalyser) return;

      this.inputAnalyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const level = sum / dataArray.length / 255;
      this.onAudioLevel?.(level);

      this.animFrameId = requestAnimationFrame(track);
    };

    this.animFrameId = requestAnimationFrame(track);
  }

  // ── Send Text Prompt through Live Session ──────
  async sendText(text) {
    if (!this.session || !this.isActive) return;

    this.onStateChange?.('thinking');

    try {
      await this.session.sendClientContent({
        turns: [
          {
            role: 'user',
            parts: [{ text: text }],
          },
        ],
        turnComplete: true,
      });
    } catch (err) {
      console.error('sendText error:', err);
      this.onStateChange?.('listening');
    }
  }

  // ── Stop / End Session ─────────────────────────
  async stop() {
    this.isActive = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this._stopCurrentPlayback();

    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }

    if (this.inputSource) {
      this.inputSource.disconnect();
      this.inputSource = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.inputAudioContext) {
      try {
        await this.inputAudioContext.close();
      } catch (e) {
        /* ignore */
      }
      this.inputAudioContext = null;
    }

    if (this.outputAudioContext) {
      try {
        await this.outputAudioContext.close();
      } catch (e) {
        /* ignore */
      }
      this.outputAudioContext = null;
    }

    if (this.session) {
      try {
        if (this.session.close) await this.session.close();
      } catch (e) {
        /* ignore */
      }
      this.session = null;
    }

    this.onStateChange?.('disconnected');
  }
}
