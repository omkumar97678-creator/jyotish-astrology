import { GoogleGenAI, Modality } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ── Build System Prompt from Kundli Data ──
export function buildAstroContext(kundliData) {
  if (!kundliData) {
    return `
You are ज्योतिष AI, an authentic, wise Vedic Astrologer (Jyotishi).
Answer questions about Vedic astrology with warm, conversational clarity.
Keep answers concise — 2 to 3 spoken sentences.
Occasionally weave in natural Sanskrit terms (Lagna, Rashi, Dasha, Karma, Dharma).
Never use markdown asterisks (*, **), bullet points, or numbered lists because your response will be spoken aloud to the user.
`;
  }

  return `
You are ज्योतिष AI, an authentic, wise Vedic Astrologer (Jyotishi) with deep knowledge of the seeker's birth chart.

SEEKER'S COMPLETE VEDIC KUNDLI:
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
  : 'Sun in Leo, Moon in Gemini, Mars in Leo, Mercury in Virgo, Jupiter in Virgo, Venus in Cancer, Saturn in Cancer, Rahu in Aries, Ketu in Libra'}

CURRENT DASHA:
${kundliData.current_dasha ? 
  `${kundliData.current_dasha.lord || ''} Mahadasha (${kundliData.current_dasha.start || ''} - ${kundliData.current_dasha.end || ''})`
  : 'Dasha period currently active'}

NUMEROLOGY:
Life Path Number: ${kundliData.life_path_number || kundliData.numerology?.lifePathNumber || '7'}
Destiny Number: ${kundliData.destiny_number || kundliData.numerology?.destinyNumber || '9'}

SPOKEN RESPONSE RULES:
1. You have full access to this person's chart above.
2. Answer the seeker's question directly with warm, uplifting, spoken Vedic wisdom.
3. Keep each answer concise — 2 to 3 sentences maximum (under 30 seconds spoken).
4. Address them by name "${kundliData.name || 'Seeker'}" naturally.
5. Reference their specific Lagna, Moon sign, Nakshatra, or planets when relevant.
6. Do NOT use markdown symbols like *, **, #, or bullet points because this will be spoken aloud in audio.
7. Be empowering, positive, and spiritually grounded.
`;
}

// ── Generate Astrological Response via Gemini 3.6 Flash ──
export async function generateGeminiAstrologyAnswer(question, kundliData) {
  const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const systemPrompt = buildAstroContext(kundliData);

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemPrompt}\n\nSeeker Question: "${question}"\nSpoken Astrological Answer:`,
    });

    const text = response.text?.trim();
    return text || `Based on your ${kundliData?.lagna || 'chart'}, the planetary energies show auspicious clarity and progress for your path.`;
  } catch (err) {
    console.warn('Gemini 3.6 Flash generation error:', err);
    // Fallback
    return `According to your ${kundliData?.lagna || 'Lagna'} and ${kundliData?.rashi || 'Moon'} sign, current planetary alignments bring strength and auspicious guidance for your journey.`;
  }
}

// ── Generate Ultra-HD Zephyr Audio via Gemini TTS ──────
export async function generateZephyrAudio(text, voiceName = 'Zephyr') {
  const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // Clean text of markdown before sending to TTS
  const cleanText = text.replace(/[*_#`~]/g, '').trim();

  const models = [
    'gemini-3.1-flash-tts-preview',
    'gemini-2.5-flash-preview-tts'
  ];

  for (const model of models) {
    try {
      const response = await client.models.generateContent({
        model: model,
        contents: cleanText,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voiceName || 'Zephyr'
              }
            }
          }
        }
      });

      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (audioData) {
        return audioData; // Base64 audio PCM
      }
    } catch (err) {
      console.warn(`TTS generation failed for ${model}:`, err);
    }
  }

  return null;
}

// ── Main Conversational Gemini Live Voice Session ─────
export class GeminiLiveSession {
  constructor() {
    this.isActive = false;

    // Web Audio
    this.audioContext = null;
    this.mediaStream = null;
    this.analyser = null;
    this.animFrameId = null;
    this.activeSource = null;

    // Speech Recognition
    this.recognition = null;

    // Callbacks
    this.onTranscript = null;
    this.onAiResponse = null;
    this.onAudioLevel = null;
    this.onStateChange = null;
    this.onError = null;

    this.kundliData = null;
    this.voiceName = 'Zephyr';
  }

  // ── Start Live Voice Session ───────────
  async start(kundliData, voiceName = 'Zephyr') {
    this.kundliData = kundliData;
    this.voiceName = voiceName || 'Zephyr';
    this.isActive = true;

    try {
      // 1. Microphone access & Waveform analyzer
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 24000,
      });

      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);

      this._startWaveformTracking();

      // 2. Initialize Speech Recognition
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-IN';

        this.recognition.onresult = async (event) => {
          if (!this.isActive) return;
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript && transcript.trim()) {
            this.onTranscript?.(transcript);
            await this.processUserSpeech(transcript);
          }
        };

        this.recognition.onerror = (e) => {
          if (e.error === 'no-speech' && this.isActive) {
            this._restartRecognition();
          }
        };

        this.recognition.onend = () => {
          if (this.isActive && this.audioContext && !this.activeSource) {
            this._restartRecognition();
          }
        };

        try {
          this.recognition.start();
        } catch (e) {
          /* ignore */
        }
      }

      this.onStateChange?.('listening');
      return true;
    } catch (err) {
      console.error('Failed to start Live Voice session:', err);
      this.onError?.(err);
      this.onStateChange?.('error');
      return false;
    }
  }

  // ── Track real-time audio waveform level ──
  _startWaveformTracking() {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    const update = () => {
      if (!this.isActive || !this.analyser) return;

      this.analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const level = sum / dataArray.length / 255;
      this.onAudioLevel?.(level);

      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  // ── Process User Speech: Brain + Zephyr Voice ──
  async processUserSpeech(userText) {
    if (!this.isActive) return;

    this.onStateChange?.('thinking');

    try {
      // 1. Generate Vedic Astrological Answer
      const aiAnswer = await generateGeminiAstrologyAnswer(userText, this.kundliData);
      this.onAiResponse?.(aiAnswer);

      // 2. Generate HD Zephyr Voice Audio
      const audioBase64 = await generateZephyrAudio(aiAnswer, this.voiceName);

      if (audioBase64 && this.isActive) {
        this.onStateChange?.('speaking');
        await this._playAudioBase64(audioBase64);
      }

      if (this.isActive) {
        this.onStateChange?.('listening');
        this._restartRecognition();
      }
    } catch (err) {
      console.error('Error processing speech turn:', err);
      if (this.isActive) {
        this.onStateChange?.('listening');
        this._restartRecognition();
      }
    }
  }

  // ── Play HD Zephyr Audio Chunk ────────
  async _playAudioBase64(base64Audio) {
    return new Promise((resolve) => {
      if (!this.audioContext || !this.isActive) {
        resolve();
        return;
      }

      try {
        const binaryStr = atob(base64Audio);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        // Convert PCM16 (24kHz) to Float32
        const pcm16 = new Int16Array(bytes.buffer);
        const float32 = new Float32Array(pcm16.length);
        for (let i = 0; i < pcm16.length; i++) {
          float32[i] = pcm16[i] / 32768.0;
        }

        const audioBuffer = this.audioContext.createBuffer(1, float32.length, 24000);
        audioBuffer.getChannelData(0).set(float32);

        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);

        this.activeSource = source;

        source.onended = () => {
          this.activeSource = null;
          resolve();
        };

        source.start();
      } catch (err) {
        console.error('Audio playback error:', err);
        resolve();
      }
    });
  }

  // ── Restart Speech Recognition safely ──
  _restartRecognition() {
    if (this.recognition && this.isActive && !this.activeSource) {
      try {
        this.recognition.start();
      } catch (e) {
        /* already active */
      }
    }
  }

  // ── Send text question directly ───────
  async sendText(text) {
    if (!this.isActive) return;
    await this.processUserSpeech(text);
  }

  // ── Stop active speech playback ───────
  stopPlayback() {
    if (this.activeSource) {
      try {
        this.activeSource.stop();
      } catch (e) {
        /* ignore */
      }
      this.activeSource = null;
    }
  }

  // ── End session ───────────────────────
  async stop() {
    this.isActive = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.stopPlayback();

    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        /* ignore */
      }
      this.recognition = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      try {
        await this.audioContext.close();
      } catch (e) {
        /* ignore */
      }
      this.audioContext = null;
    }

    this.onStateChange?.('disconnected');
  }
}
