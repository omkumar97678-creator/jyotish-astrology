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

// ── Build System Prompt from Kundli Data ──────────────
export function buildAstroContext(kundliData) {
  if (!kundliData) {
    return `
You are an expert, compassionate Vedic Astrologer (Jyotishi).
Answer with warm, conversational clarity.
Keep answers concise — 2 to 3 spoken sentences.
Weave in natural Sanskrit terms (Lagna, Rashi, Dasha, Karma, Dharma).
Never use markdown asterisks (*, **), bullet points, or numbered lists because your response will be spoken aloud to the user.
`;
  }

  return `
You are an expert, compassionate Vedic Astrologer (Jyotishi) with deep knowledge of the seeker's birth chart.

SEEKER'S VEDIC CHART:
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
    .map(([p, d]) => `${p}: ${d.sign || d.rashi || ''}, House ${d.house || ''}`)
    .join('\n') 
  : 'Planets favorably placed in chart'}

CURRENT DASHA:
${kundliData.current_dasha ? 
  `${kundliData.current_dasha.lord || ''} Mahadasha (${kundliData.current_dasha.start || ''} - ${kundliData.current_dasha.end || ''})`
  : 'Current auspicious Dasha operating'}

NUMEROLOGY:
Life Path Number: ${kundliData.life_path_number || kundliData.numerology?.lifePathNumber || '7'}
Destiny Number: ${kundliData.destiny_number || kundliData.numerology?.destinyNumber || '9'}

RULES FOR SPOKEN VOICE:
1. Speak warmly and naturally like an authentic Indian Astrologer on a live phone consultation.
2. Answer the question directly in 2 to 3 sentences (under 30 seconds spoken).
3. Call the seeker "${kundliData.name || 'Seeker'}" naturally.
4. Reference their actual Lagna, Moon sign, Nakshatra, or planetary yogas when relevant.
5. Strictly NO markdown characters (*, **, #, bullets) because this is audio output.
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

// ── Main Live Voice Call Session Manager ───────────────
export class LiveVoiceCallSession {
  constructor() {
    this.isActive = false;

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
          if (!this.isActive) return;
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript && transcript.trim()) {
            await this.processTurn(transcript);
          }
        };

        this.recognition.onerror = (e) => {
          if (e.error === 'no-speech' && this.isActive) {
            this._restartRecognition();
          }
        };

        this.recognition.onend = () => {
          if (this.isActive && !this.activeAudio) {
            this._restartRecognition();
          }
        };

        try {
          this.recognition.start();
        } catch (e) {
          /* ignore */
        }
      }

      // Initial spoken greeting
      const greeting = kundliData?.name
        ? `Namaste ${kundliData.name}! I have your ${kundliData.lagna || 'Ascendant'} chart in front of me. What question is on your mind?`
        : 'Namaste! I am your Vedic astrology guide. What guidance do you seek today?';

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

    this.onStateChange?.('thinking');

    try {
      // 1. Compute personalized Vedic astrology reading
      const answer = await generateGeminiAstrologyAnswer(userSpeech, this.kundliData);

      // 2. Speak answer in Ultra-HD Zephyr Voice
      await this.speakResponse(answer);
    } catch (err) {
      console.error('Turn processing error:', err);
      if (this.isActive) {
        this.onStateChange?.('listening');
        this._restartRecognition();
      }
    }
  }

  // ── Speak Response via Zephyr Audio ────
  async speakResponse(text) {
    if (!this.isActive) return;

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

      if (this.isActive) {
        this.onStateChange?.('listening');
        this._restartRecognition();
      }
    } catch (err) {
      console.error('speakResponse error:', err);
      if (this.isActive) {
        this.onStateChange?.('listening');
        this._restartRecognition();
      }
    }
  }

  // ── Restart Speech Recognition ────────
  _restartRecognition() {
    if (this.recognition && this.isActive && !this.activeAudio) {
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
  }

  // ── End Call ──────────────────────────
  async endCall() {
    this.isActive = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.stopAudio();

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
