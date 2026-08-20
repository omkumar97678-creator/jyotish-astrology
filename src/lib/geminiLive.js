import { GoogleGenAI, Modality } from '@google/genai';
import OpenAI from 'openai';
import { getCompleteNumerology } from './kundliService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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
  const dob = kundliData?.date_of_birth || kundliData?.dob || '2004-09-08';
  const birthPlace = kundliData?.birth_place || kundliData?.place || 'Delhi, India';
  const birthTime = kundliData?.time_of_birth || kundliData?.time || 'Sunrise Chart';
  const lagna = kundliData?.lagna || 'Scorpio (Vrishchik)';
  const rashi = kundliData?.rashi || 'Gemini (Mithun)';
  const nakshatra = kundliData?.nakshatra || 'Ardra';

  // Calculate complete numerology
  const numerology = getCompleteNumerology(name, dob);
  const mulank = kundliData?.mulank || numerology?.mulank || 8;
  const lifePath = kundliData?.life_path_number || numerology?.lifePathNumber || 5;
  const destiny = kundliData?.destiny_number || numerology?.destinyNumber || 3;
  const soulUrge = kundliData?.soul_urge_number || numerology?.soulUrgeNumber || 9;
  const luckyNumbers = numerology?.luckyNumbers?.join(', ') || '5, 3, 6';
  const luckyColors = numerology?.luckyColors?.join(', ') || 'Golden Yellow, Emerald Green';
  const dasha = kundliData?.current_dasha?.lord || kundliData?.mahadasha?.activeDasha?.planet || 'Active Mahadasha';

  return `
You are a warm, wise, authentic Indian Vedic Astrologer (Jyotishi) speaking on a 1-on-1 consultation with ${name}.

SEEKER'S COMPLETE BIRTH CHART & NUMEROLOGY PROFILE:
- Seeker Name: ${name}
- Date of Birth (DOB): ${typeof dob === 'object' ? `${dob.year}-${dob.month}-${dob.day}` : dob}
- Birth Place: ${birthPlace}
- Birth Time: ${typeof birthTime === 'object' ? `${birthTime.hour}:${birthTime.minute} ${birthTime.period || ''}` : birthTime}
- Ascendant / Lagna: ${lagna}
- Moon Sign (Chandra Rashi): ${rashi}
- Janma Nakshatra: ${nakshatra}
- Current Mahadasha: ${dasha}
- Mulank (Birth Day Number): ${mulank}
- Bhagyank / Life Path Number: ${lifePath}
- Namank / Destiny Number: ${destiny}
- Soul Urge Number: ${soulUrge}
- Lucky Numbers: ${luckyNumbers}
- Lucky Colors: ${luckyColors}

CRITICAL RULES (READ CAREFULLY):
1. **NEVER ASK FOR BIRTH DETAILS**:
   - You ALREADY have the seeker's complete profile above (Name, DOB, Time, Place, Lagna, Rashi, Nakshatra, Mulank, Life Path Number, Destiny Number).
   - NEVER ask "Mujhe apna name ya date of birth batao" or "Please share your birth details".
   - If the seeker asks "Mera Life Path Number kya hai?" or "Mera Mulank kya hai?", answer IMMEDIATELY with their exact numbers (Life Path: ${lifePath}, Mulank: ${mulank}, Destiny: ${destiny}) and explain its astrological meaning!
2. **Natural Human Conversation**:
   - For greetings ("hello", "hi", "namaste", "kaise ho", "sun rahe ho"):
     Reply warmly: "Namaste ${name} ji! Ji main aapko sun raha hoon. Aaj aap apne jeevan ya kundli ke kis vishay me baat karna chahte hain?"
   - For specific questions (career, marriage, health, yogas, numbers, dasha):
     Provide an authentic, uplifting, personalized answer in 2 to 3 sentences using their chart details above.
3. **Format**:
   - Speak in clear conversational Hindi-English / English.
   - Do NOT use markdown asterisks (* or **) or bullet points in your output.
`;
}

// ── Generate Astrological Response via Gemini 3.6 Flash ──
export async function generateGeminiAstrologyAnswer(question, kundliData) {
  const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const systemPrompt = buildAstroContext(kundliData);

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemPrompt}\n\nSeeker Question: "${question}"\nAstrologer Response:`,
    });

    const text = response.text?.trim();
    return text || `Namaste ${kundliData?.name || 'ji'}! May the divine stars illuminate your path. How can I guide you today?`;
  } catch (err) {
    console.warn('Gemini 3.6 Flash generation error:', err);
    return `Namaste ${kundliData?.name || 'ji'}! Ji main sun raha hoon. Kripya apna prashna poochein.`;
  }
}

// ── Ultra-HD Studio Natural Voice Generator ───────────
// 1. Google Gemini 3.1 Flash TTS (Zephyr Voice)
// 2. OpenAI Neural Studio Voice (Nova / Alloy - 100% human natural tone)
export async function generateSpeechAudioBlob(text, voiceName = 'Zephyr') {
  const cleanText = text.replace(/[*_#`~]/g, '').trim();

  // Tier 1: Try Gemini TTS (Zephyr Voice)
  if (GEMINI_API_KEY) {
    try {
      const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await client.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
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
        return pcm16ToWavBlob(audioData, 24000, 1);
      }
    } catch (err) {
      console.warn('Gemini TTS limit, using OpenAI HD Studio Voice:', err?.message || err);
    }
  }

  // Tier 2: OpenAI HD Studio Voice (Nova / Alloy)
  if (OPENAI_API_KEY) {
    try {
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova', // Expressive, natural, warm human tone
        input: cleanText,
      });

      const arrayBuffer = await mp3.arrayBuffer();
      return new Blob([arrayBuffer], { type: 'audio/mp3' });
    } catch (err) {
      console.warn('OpenAI SDK TTS error:', err?.message || err);
    }
  }

  return null;
}

// ── Main Live Voice Call Session Manager ───────────────
export class LiveVoiceCallSession {
  constructor() {
    this.isActive = false;
    this.isSpeaking = false;
    this.isRecognizing = false;

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
      this._initSpeechRecognition();

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

  // ── Initialize Speech Recognition Engine ──
  _initSpeechRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition not supported in browser');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      this.recognition.onstart = () => {
        this.isRecognizing = true;
      };

      this.recognition.onresult = async (event) => {
        if (!this.isActive || this.isSpeaking || this.activeAudio) return;

        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript && transcript.trim()) {
          console.log('User speech recognized:', transcript);
          await this.processTurn(transcript);
        }
      };

      this.recognition.onerror = (e) => {
        this.isRecognizing = false;
        if (e.error === 'no-speech' && this.isActive && !this.isSpeaking && !this.activeAudio) {
          setTimeout(() => this._startRecognitionSafe(), 300);
        }
      };

      this.recognition.onend = () => {
        this.isRecognizing = false;
        if (this.isActive && !this.isSpeaking && !this.activeAudio) {
          setTimeout(() => this._startRecognitionSafe(), 300);
        }
      };
    } catch (err) {
      console.warn('SpeechRecognition init error:', err);
    }
  }

  // ── Safely start recognition ──────────
  _startRecognitionSafe() {
    if (!this.isActive || this.isSpeaking || this.activeAudio || !this.recognition) return;
    if (this.isRecognizing) return;

    try {
      this.recognition.start();
    } catch (e) {
      // If already running, ignore
    }
  }

  // ── Safely stop recognition ───────────
  _stopRecognitionSafe() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        /* ignore */
      }
      this.isRecognizing = false;
    }
  }

  // ── Process Conversation Turn ──────────
  async processTurn(userSpeech) {
    if (!this.isActive) return;

    this._stopRecognitionSafe();
    this.onStateChange?.('thinking');

    try {
      // 1. Compute personalized Vedic astrology reading
      const answer = await generateGeminiAstrologyAnswer(userSpeech, this.kundliData);

      // 2. Speak answer in Ultra-HD Studio Voice
      await this.speakResponse(answer);
    } catch (err) {
      console.error('Turn processing error:', err);
      if (this.isActive) {
        this.isSpeaking = false;
        this.onStateChange?.('listening');
        this._startRecognitionSafe();
      }
    }
  }

  // ── Speak Response via HD Audio ────────
  async speakResponse(text) {
    if (!this.isActive) return;

    this._stopRecognitionSafe();
    this.isSpeaking = true;
    this.onStateChange?.('thinking');

    try {
      const audioBlob = await generateSpeechAudioBlob(text, this.voiceName);

      if (audioBlob && this.isActive) {
        const audioUrl = URL.createObjectURL(audioBlob);

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
            console.warn('Audio play error:', err);
            resolve();
          });
        });
      }
    } catch (err) {
      console.error('speakResponse error:', err);
    }

    // Audio completed — wait 400ms before opening mic again
    if (this.isActive) {
      this.isSpeaking = false;
      this.onStateChange?.('listening');
      setTimeout(() => {
        if (this.isActive && !this.isSpeaking && !this.activeAudio) {
          this._startRecognitionSafe();
        }
      }, 400);
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
    this.isRecognizing = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.stopAudio();
    this._stopRecognitionSafe();
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
