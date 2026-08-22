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
  const now = new Date();
  const currentYear = now.getFullYear();
  const todayDateStr = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let birthYear = 2004;
  if (typeof dob === 'string' && dob.includes('-')) {
    birthYear = parseInt(dob.split('-')[0], 10) || 2004;
  } else if (typeof dob === 'object' && dob?.year) {
    birthYear = parseInt(dob.year, 10) || 2004;
  }
  const currentAge = Math.max(1, currentYear - birthYear);

  return `
You are a warm, compassionate, highly knowledgeable female Vedic Astrologer (विदुषी ज्योतिषाचार्या / आचार्या) having a 1-on-1 LIVE voice phone conversation with ${name}.

VOICE & GENDER RULES (STRICT & CRITICAL):
- Your speaking voice is "Zephyr" (a natural, soothing FEMALE voice).
- You MUST ALWAYS speak using natural FIRST-PERSON FEMININE Hindi / Hinglish grammar and verbs.
  * ALWAYS use feminine forms: "main karti hoon", "main dekh rahi hoon", "main batati hoon", "main samajhti hoon", "main aapko salah deti hoon", "meri samajh se".
  * NEVER use masculine forms like: "karta hoon", "dekh raha hoon", "batata hoon", "bol raha hoon", "samajhta hoon".
- Speak with the maternal warmth, wisdom, and poise of a respected female Vedic Jyotishi.

REAL-WORLD TEMPORAL CONTEXT (CRITICAL):
- TODAY'S REAL-WORLD DATE: ${todayDateStr}
- CURRENT YEAR: ${currentYear}
- SEEKER'S CURRENT AGE: ~${currentAge} years old (Born: ${birthYear})
- TEMPORAL RULE: Today is in ${currentYear}. NEVER mention 2024 or 2025 as future years. All future predictions (such as marriage timing, career shifts, exams, business growth) MUST be for the present year ${currentYear} or future years (${currentYear + 1}, ${currentYear + 2}, ${currentYear + 3}, etc.).

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
   - Speak naturally like a real human female astrologer on a phone call.
   - If user says "Hello" or "Namaste", greet them warmly in 1 short sentence: "Namaste ${name} ji! Main aapki Jyotishi hoon. Kahiye, aaj main aapki kundli me kis vishay par madad kar sakti hoon?"
   - For astrology questions, keep responses concise (2 to 3 spoken sentences) so the user can easily talk back and forth.
3. **Audio-Only Output**:
   - Never use markdown (*, **, #, bullet points). Speak in clean, warm conversational Hindi-English / English.
`;
}

// ── Universal Fast Downsampling to 16kHz PCM ─────────────────────
function downsampleTo16k(buffer, fromSampleRate) {
  if (!buffer || buffer.length === 0) return new Float32Array(0);
  if (fromSampleRate === 16000) return buffer;
  const sampleRateRatio = fromSampleRate / 16000;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : buffer[offsetBuffer];
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
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

// ── Inline AudioWorklet Code ──────────────────────────────────────
const AUDIO_WORKLET_CODE = `
class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048;
    this.buffer = new Float32Array(this.bufferSize);
    this.bytesWritten = 0;
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const channelData = input[0];
    for (let i = 0; i < channelData.length; i++) {
      this.buffer[this.bytesWritten++] = channelData[i];
      if (this.bytesWritten >= this.bufferSize) {
        this.flush();
      }
    }
    return true;
  }

  flush() {
    this.port.postMessage(new Float32Array(this.buffer));
    this.bytesWritten = 0;
  }
}

registerProcessor('audio-processor', AudioProcessor);
`;

// ── Gemini 3.1 Live Session Manager ──────────────────────────────
export class GeminiLiveSession {
  constructor() {
    this.client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    this.session = null;
    this.isActive = false;

    // Single Unified AudioContext for Mobile & Desktop
    this.audioContext = null;
    this.mediaStream = null;
    this.inputSource = null;
    this.workletNode = null;
    this.processor = null;
    this.silenceNode = null;
    this.inputAnalyser = null;

    // Output Speaker Queue
    this.nextPlayTime = 0;
    this.isPlaying = false;
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

    // ── STEP 1: Microphone Access ──
    try {
      try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      } catch (advancedErr) {
        if (advancedErr.name === 'NotAllowedError' || advancedErr.name === 'PermissionDeniedError') {
          throw advancedErr;
        }
        console.warn('Advanced audio constraints failed, falling back to basic audio:', advancedErr);
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (micErr) {
      console.error('Microphone access failed:', micErr);
      const isPerm = micErr.name === 'NotAllowedError' || micErr.name === 'PermissionDeniedError';
      this.stop();
      this.onError?.({
        message: isPerm
          ? 'Microphone permission was denied. Please tap the lock icon 🔒 in your browser address bar and enable Microphone.'
          : 'Could not find a working microphone on this device.',
        isPermissionDenied: isPerm,
      });
      this.onStateChange?.('error');
      return false;
    }

    // ── STEP 2: Web Audio API & AudioContext ──
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.nextPlayTime = this.audioContext.currentTime;

      this.inputSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.inputAnalyser = this.audioContext.createAnalyser();
      this.inputAnalyser.fftSize = 64;
      this.inputSource.connect(this.inputAnalyser);

      this.silenceNode = this.audioContext.createGain();
      this.silenceNode.gain.value = 0;
      this.silenceNode.connect(this.audioContext.destination);

      const nativeSampleRate = this.audioContext.sampleRate || 48000;

      // Initialize Worklet or fallback
      let workletInitialized = false;
      if (this.audioContext.audioWorklet) {
        try {
          const blob = new Blob([AUDIO_WORKLET_CODE], { type: 'application/javascript' });
          const workletUrl = URL.createObjectURL(blob);
          await this.audioContext.audioWorklet.addModule(workletUrl);

          this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-processor');
          this.workletNode.port.onmessage = (e) => {
            if (!this.isActive || !this.session) return;
            const float32Data = e.data;
            const downsampled = downsampleTo16k(float32Data, nativeSampleRate);
            const pcm16Buffer = floatTo16BitPCM(downsampled);
            const base64Chunk = arrayBufferToBase64(pcm16Buffer);

            try {
              this.session.sendRealtimeInput({
                audio: {
                  mimeType: 'audio/pcm;rate=16000',
                  data: base64Chunk,
                },
              });
            } catch (err) {
              console.warn('Audio send error:', err);
            }
          };

          this.inputSource.connect(this.workletNode);
          this.workletNode.connect(this.silenceNode);
          workletInitialized = true;
        } catch (workletErr) {
          console.warn('Worklet load failed, falling back to ScriptProcessor:', workletErr);
        }
      }

      if (!workletInitialized) {
        this._setupScriptProcessorFallback(nativeSampleRate);
      }
    } catch (audioErr) {
      console.error('Audio initialization error:', audioErr);
      this.stop();
      this.onError?.({
        message: 'Audio system initialization failed on this browser.',
        isPermissionDenied: false,
      });
      this.onStateChange?.('error');
      return false;
    }

    // ── STEP 3: Gemini Live WebSocket API Connection with Timeout ──
    try {
      const connectPromise = this.client.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: 'Zephyr', // Natural, warm female voice
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
            console.error('Gemini Live WebSocket error:', err);
            this.stop();
            this.onError?.({
              message: 'Connection dropped. Tap Try Again to reconnect.',
              isPermissionDenied: false,
            });
            this.onStateChange?.('error');
          },
          onclose: (e) => {
            console.log('Gemini Live session closed:', e);
            if (this.isActive) {
              this.stop();
              this.onStateChange?.('disconnected');
            }
          },
        },
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('CONNECT_TIMEOUT'));
        }, 12000);
      });

      this.session = await Promise.race([connectPromise, timeoutPromise]);
      return true;
    } catch (wsErr) {
      console.error('Failed to connect to Gemini Live WebSocket:', wsErr);
      this.stop();
      const isTimeout = wsErr?.message === 'CONNECT_TIMEOUT';
      this.onError?.({
        message: isTimeout
          ? 'Connecting to live voice server timed out. Tap Try Again to reconnect.'
          : 'Could not connect to live voice server. Tap Try Again to reconnect.',
        isPermissionDenied: false,
      });
      this.onStateChange?.('error');
      return false;
    }
  }

  // ── ScriptProcessor Fallback ───────────────────
  _setupScriptProcessorFallback(nativeSampleRate) {
    this.processor = this.audioContext.createScriptProcessor(2048, 1, 1);
    this.inputSource.connect(this.processor);
    this.processor.connect(this.silenceNode);

    this.processor.onaudioprocess = (e) => {
      if (!this.isActive || !this.session) return;
      const inputData = e.inputBuffer.getChannelData(0);
      const downsampled = downsampleTo16k(inputData, nativeSampleRate);
      const pcm16Buffer = floatTo16BitPCM(downsampled);
      const base64Chunk = arrayBufferToBase64(pcm16Buffer);

      try {
        this.session.sendRealtimeInput({
          audio: {
            mimeType: 'audio/pcm;rate=16000',
            data: base64Chunk,
          },
        });
      } catch (err) {
        console.warn('Audio send error (fallback):', err);
      }
    };
  }

  // ── Play Incoming PCM Chunk Seamlessly ─────────
  _playAudioChunk(base64Pcm) {
    if (!this.audioContext || !this.isActive) return;

    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const float32Samples = base64PCM16ToFloat32(base64Pcm);
      const audioBuffer = this.audioContext.createBuffer(
        1,
        float32Samples.length,
        24000
      );
      audioBuffer.getChannelData(0).set(float32Samples);

      const sourceNode = this.audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(this.audioContext.destination);

      const currentTime = this.audioContext.currentTime;
      if (this.nextPlayTime < currentTime) {
        this.nextPlayTime = currentTime + 0.02; // 20ms safety offset
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
          this.audioContext &&
          this.audioContext.currentTime >= this.nextPlayTime - 0.05
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
    if (this.audioContext) {
      this.nextPlayTime = this.audioContext.currentTime;
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
        !this.audioContext ||
        this.audioContext.currentTime >= this.nextPlayTime - 0.05
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

    if (this.workletNode) {
      this.workletNode.disconnect();
      this.workletNode = null;
    }

    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }

    if (this.silenceNode) {
      this.silenceNode.disconnect();
      this.silenceNode = null;
    }

    if (this.inputSource) {
      this.inputSource.disconnect();
      this.inputSource = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
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
