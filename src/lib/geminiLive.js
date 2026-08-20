import { GoogleGenAI, Modality } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ── Convert Linear PCM16 to Standard WAV Blob ────────
export function pcm16ToWavBlob(base64Pcm, sampleRate = 24000, numChannels = 1) {
  const binaryStr = atob(base64Pcm);
  const dataSize = binaryStr.length;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF identifier
  view.setUint8(0, 'R'.charCodeAt(0));
  view.setUint8(1, 'I'.charCodeAt(0));
  view.setUint8(2, 'F'.charCodeAt(0));
  view.setUint8(3, 'F'.charCodeAt(0));
  view.setUint32(4, 36 + dataSize, true);
  view.setUint8(8, 'W'.charCodeAt(0));
  view.setUint8(9, 'A'.charCodeAt(0));
  view.setUint8(10, 'V'.charCodeAt(0));
  view.setUint8(11, 'E'.charCodeAt(0));

  // fmt subchunk
  view.setUint8(12, 'f'.charCodeAt(0));
  view.setUint8(13, 'm'.charCodeAt(0));
  view.setUint8(14, 't'.charCodeAt(0));
  view.setUint8(15, ' '.charCodeAt(0));
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true);  // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
  view.setUint16(32, numChannels * 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // data subchunk
  view.setUint8(36, 'd'.charCodeAt(0));
  view.setUint8(37, 'a'.charCodeAt(0));
  view.setUint8(38, 't'.charCodeAt(0));
  view.setUint8(39, 'a'.charCodeAt(0));
  view.setUint32(40, dataSize, true);

  // Write PCM data
  const uint8View = new Uint8Array(buffer, 44);
  for (let i = 0; i < dataSize; i++) {
    uint8View[i] = binaryStr.charCodeAt(i);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

// ── Build Conversational Astrologer System Prompt ─────
export function buildAstroContext(kundliData) {
  const name = kundliData?.name || 'Seeker';
  const lagna = kundliData?.lagna || 'Aries (Mesh)';
  const rashi = kundliData?.rashi || 'Mesh';
  const nakshatra = kundliData?.nakshatra || 'Ashwini';

  return `
You are a warm, wise, authentic Indian Vedic Astrologer (Jyotishi) speaking on a 1-on-1 LIVE voice consultation with ${name}.

SEEKER'S CHART CONTEXT:
- Name: ${name}
- Lagna (Ascendant): ${lagna}
- Moon Sign (Chandra Rashi): ${rashi}
- Nakshatra: ${nakshatra}

CONVERSATION STYLE (STRICT RULES):
1. **Natural Human Conversation**:
   - If the user says casual greetings ("hello", "hi", "namaste", "kaise ho", "sun rahe ho"):
     Reply naturally and politely in 1 short sentence: "Namaste ${name} ji! Ji main sun raha hoon. Aaj aap apne jeevan ya kundli ke kis vishay me baat karna chahte hain?"
   - Do NOT dump full planetary details or chart summaries unless the user specifically asks an astrological question.
2. **When user asks a specific question** (e.g. career, marriage, health, yogas, dasha, future):
   - Give a warm, empowering, personalized answer in 2 to 3 spoken sentences.
   - Mention their Lagna (${lagna}) or Moon sign (${rashi}) naturally when relevant to their question.
3. **Audio-Only Output**:
   - NEVER use markdown characters (*, **, #, bullets, numbered lists). Speak clean conversational Hindi-English / English.
   - Keep answers short and sweet so the user can easily talk back and forth.
`;
}

// ── Generate Astrological Response via Gemini 3.6 Flash ──
export async function generateGeminiAstrologyAnswer(question, kundliData) {
  const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const systemPrompt = buildAstroContext(kundliData);

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemPrompt}\n\nUser said: "${question}"\nAstrologer spoken response:`,
    });

    const text = response.text?.trim();
    return text || `Namaste ${kundliData?.name || 'ji'}! May the divine stars illuminate your path. How can I guide you today?`;
  } catch (err) {
    console.warn('Gemini 3.6 Flash generation error:', err);
    return `Namaste ${kundliData?.name || 'ji'}! Ji main sun raha hoon. Kripya apna prashna poochein.`;
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

// ── Main Live Voice Call Session Manager ───────────────
export class LiveVoiceCallSession {
  constructor() {
    this.isActive = false;
    this.isSpeaking = false;

    // Web Audio
    this.audioContext = null;
    this.mediaStream = null;
    this.analyser = null;
    this.animFrameId = null;
    this.activeAudio = null;

    // Speech Recognition
    this.recognition = null;

    // Callbacks
    this.onAudioLevel = null;
    this.onStateChange = null; // 'listening' | 'thinking' | 'speaking' | 'disconnected'
    this.onError = null;

    this.kundliData = null;
    this.voiceName = 'Zephyr';
  }

  // ── Start Live Call ───────────────────
  async startCall(kundliData, voiceName = 'Zephyr') {
    this.kundliData = kundliData;
    this.voiceName = voiceName || 'Zephyr';
    this.isActive = true;
    this.isSpeaking = false;

    try {
      // 1. Initialize microphone & audio visualizer
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

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
          if (!this.isActive || this.isSpeaking || this.activeAudio) return;

          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript && transcript.trim()) {
            console.log('User spoke:', transcript);
            await this.processTurn(transcript);
          }
        };

        this.recognition.onerror = (e) => {
          if (e.error === 'no-speech' && this.isActive && !this.isSpeaking && !this.activeAudio) {
            this._restartRecognition();
          }
        };

        this.recognition.onend = () => {
          if (this.isActive && !this.isSpeaking && !this.activeAudio) {
            this._restartRecognition();
          }
        };
      }

      // Initial spoken greeting
      const greeting = kundliData?.name
        ? `Namaste ${kundliData.name}! Main aapka Jyotish saathi hoon. Kahiye, aaj aap kis baare me baat karna chahte hain?`
        : 'Namaste! Main aapka Jyotish saathi hoon. Kahiye, aaj aap kya janna chahte hain?';

      await this.speakResponse(greeting);

      return true;
    } catch (err) {
      console.error('Failed to start Voice Call:', err);
      this.onError?.(err);
      this.onStateChange?.('disconnected');
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

  // ── Process Conversation Turn ──────────
  async processTurn(userSpeech) {
    if (!this.isActive) return;

    // Mute microphone while thinking and generating
    this._stopRecognition();
    this.onStateChange?.('thinking');

    try {
      // 1. Compute personalized Vedic astrology reading
      const answer = await generateGeminiAstrologyAnswer(userSpeech, this.kundliData);

      // 2. Speak answer in Ultra-HD Zephyr Voice
      await this.speakResponse(answer);
    } catch (err) {
      console.error('Turn processing error:', err);
      if (this.isActive) {
        this.isSpeaking = false;
        this.onStateChange?.('listening');
        this._restartRecognition();
      }
    }
  }

  // ── Speak Response via Zephyr Audio ────
  async speakResponse(text) {
    if (!this.isActive) return;

    // Strictly ensure microphone is stopped before playing speaker audio
    this._stopRecognition();
    this.isSpeaking = true;
    this.onStateChange?.('thinking');

    try {
      const audioBase64 = await generateZephyrAudio(text, this.voiceName);

      if (audioBase64 && this.isActive) {
        const wavBlob = pcm16ToWavBlob(audioBase64, 24000, 1);
        const audioUrl = URL.createObjectURL(wavBlob);

        this.onStateChange?.('speaking');

        await new Promise((resolve) => {
          const audio = new Audio(audioUrl);
          this.activeAudio = audio;

          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            this.activeAudio = null;
            resolve();
          };

          audio.onerror = () => {
            URL.revokeObjectURL(audioUrl);
            this.activeAudio = null;
            resolve();
          };

          audio.play().catch((err) => {
            console.warn('Audio play interrupted:', err);
            resolve();
          });
        });
      }
    } catch (err) {
      console.error('speakResponse error:', err);
    }

    // Audio playback completed — wait 400ms for room echo buffer before listening again
    if (this.isActive) {
      this.isSpeaking = false;
      this.onStateChange?.('listening');
      setTimeout(() => {
        if (this.isActive && !this.isSpeaking && !this.activeAudio) {
          this._restartRecognition();
        }
      }, 400);
    }
  }

  // ── Stop Speech Recognition safely ─────
  _stopRecognition() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        /* ignore */
      }
    }
  }

  // ── Restart Speech Recognition safely ──
  _restartRecognition() {
    if (this.recognition && this.isActive && !this.isSpeaking && !this.activeAudio) {
      try {
        this.recognition.start();
      } catch (e) {
        /* already running */
      }
    }
  }

  // ── Stop active audio playback ────────
  stopAudio() {
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch (e) {
        /* ignore */
      }
      this.activeAudio = null;
    }
    this.isSpeaking = false;
  }

  // ── End Call ──────────────────────────
  async endCall() {
    this.isActive = false;
    this.isSpeaking = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.stopAudio();
    this._stopRecognition();
    this.recognition = null;

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
