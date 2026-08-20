import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GeminiLiveSession } from '@/lib/geminiLive';
import { generateVoiceResponse } from '@/lib/aiService';
import StarField from '@/components/StarField';

// ── Waveform component ─────────────────
function Waveform({ level, voiceState }) {
  const BAR_COUNT = 32;
  const bars = Array.from({ length: BAR_COUNT });

  const getBarHeight = (i) => {
    if (voiceState === 'idle' || voiceState === 'disconnected') return 4;

    if (voiceState === 'listening') {
      const base = Math.max(4, (level || 0.1) * 80);
      const variation = Math.sin(Date.now() / 200 + i * 0.5) * base * 0.5;
      return Math.max(4, base + variation);
    }

    if (voiceState === 'speaking') {
      return Math.max(4, 20 + Math.sin(Date.now() / 150 + i * 0.3) * 25);
    }

    if (voiceState === 'thinking') {
      return Math.max(4, 8 + Math.sin(Date.now() / 400 + i * 0.8) * 6);
    }

    return 4;
  };

  const getBarColor = () => {
    switch (voiceState) {
      case 'listening':
        return '#C8822A';
      case 'speaking':
        return '#2AABA8';
      case 'thinking':
        return 'rgba(200,130,42,0.6)';
      default:
        return 'rgba(232,228,220,0.2)';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        height: '80px',
        justifyContent: 'center',
      }}
    >
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: getBarHeight(i) }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          style={{
            width: '3px',
            borderRadius: '2px',
            background: getBarColor(),
            minHeight: '4px',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  );
}

// ── Mic button with ripple ─────────────
function MicButton({ voiceState, onClick }) {
  const isActive = voiceState === 'listening' || voiceState === 'thinking';
  const isSpeaking = voiceState === 'speaking';

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Ripple rings when listening */}
      {isActive &&
        [1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(200,130,42,0.4)',
            }}
            animate={{
              scale: [1, 1.5 + i * 0.3],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          background: isSpeaking
            ? 'linear-gradient(135deg, #2AABA8, #1d8a87)'
            : 'linear-gradient(135deg, #C8822A, #E09840)',
          boxShadow: isActive
            ? '0 0 40px rgba(200,130,42,0.5)'
            : '0 0 20px rgba(200,130,42,0.2)',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {voiceState === 'connecting'
          ? '⏳'
          : voiceState === 'thinking'
          ? '🌟'
          : isSpeaking
          ? '⬜'
          : '🎙️'}
      </motion.button>
    </div>
  );
}

// ── Message bubble ─────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
      }}
    >
      {!isUser && (
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(42,171,168,0.2)',
            border: '1px solid rgba(42,171,168,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            marginRight: '8px',
            flexShrink: 0,
            marginTop: '4px',
          }}
        >
          ✦
        </div>
      )}

      <div
        style={{
          maxWidth: '75%',
          padding: '10px 14px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser ? 'rgba(200,130,42,0.12)' : 'rgba(42,171,168,0.08)',
          border: isUser
            ? '1px solid rgba(200,130,42,0.25)'
            : '1px solid rgba(42,171,168,0.2)',
        }}
      >
        {!isUser && (
          <div
            style={{
              fontSize: '0.7rem',
              color: '#2AABA8',
              marginBottom: '4px',
              fontWeight: '600',
            }}
          >
            ✦ ज्योतिष AI
          </div>
        )}
        <p
          style={{
            color: '#E8E4DC',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          {message.text}
        </p>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'rgba(232,228,220,0.35)',
            marginTop: '4px',
            textAlign: isUser ? 'right' : 'left',
          }}
        >
          {message.time}
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN VOICE PAGE ────────────────────
export default function Voice() {
  const navigate = useNavigate();

  // State
  const [voiceState, setVoiceState] = useState('idle');
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState(null);

  // Kundli data
  const [kundliData, setKundliData] = useState(null);

  // Refs
  const sessionRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const analyserRef = useRef(null);
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioLevelRef = useRef(0);
  const isSpeechModeRef = useRef(false);

  // ── Load kundli data on mount ─────────
  useEffect(() => {
    const stored = localStorage.getItem('kundli_data');
    if (stored) {
      try {
        setKundliData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse kundli data', e);
      }
    } else {
      const onboard = localStorage.getItem('jyotish_onboarding');
      if (onboard) {
        try {
          setKundliData(JSON.parse(onboard));
        } catch (e) {
          /* fallback */
        }
      }
    }
  }, []);

  // ── Auto scroll messages ──────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  // ── Session timer ─────────────────────
  useEffect(() => {
    if (
      voiceState !== 'idle' &&
      voiceState !== 'disconnected' &&
      voiceState !== 'error'
    ) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [voiceState]);

  // ── Waveform animation ────────────────
  useEffect(() => {
    const animate = () => {
      setAudioLevel(audioLevelRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ── Format timer ──────────────────────
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ── Add message to chat ───────────────
  const addMessage = useCallback((role, text) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, text, time }]);
  }, []);

  // ── Speak text aloud via Web Speech API ─
  const speakText = useCallback((text, onEnd) => {
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) =>
          v.lang.includes('en-IN') ||
          v.name.includes('India') ||
          v.name.includes('Rishi') ||
          v.name.includes('Veena')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onend = () => {
        onEnd?.();
      };
      utterance.onerror = () => {
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      onEnd?.();
    }
  }, []);

  // ── Stop all audio & recognition ──────
  const cleanupAudio = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        /* ignore */
      }
      recognitionRef.current = null;
    }

    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        /* ignore */
      }
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {
        /* ignore */
      }
      audioContextRef.current = null;
    }
  }, []);

  // ── Cleanup on unmount ────────────────
  useEffect(() => {
    return () => {
      sessionRef.current?.stop();
      cleanupAudio();
      clearInterval(timerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [cleanupAudio]);

  // ── Native Browser Speech Recognition Fallback ──
  const startBrowserSpeechEngine = useCallback(async () => {
    isSpeechModeRef.current = true;
    setVoiceState('listening');

    try {
      // 1. Start audio visualizer from mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const checkLevel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        audioLevelRef.current = sum / dataArray.length / 255;
        if (isSpeechModeRef.current) {
          requestAnimationFrame(checkLevel);
        }
      };
      requestAnimationFrame(checkLevel);

      // 2. Start Speech Recognition
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn('SpeechRecognition API not available in this browser');
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        if (!transcript || !transcript.trim()) return;

        addMessage('user', transcript);
        setVoiceState('thinking');

        try {
          const res = await generateVoiceResponse(transcript, kundliData);
          const aiText =
            typeof res === 'string'
              ? res
              : res?.answer || res?.response || 'Cosmic wisdom received.';

          addMessage('ai', aiText);
          setVoiceState('speaking');

          speakText(aiText, () => {
            if (isSpeechModeRef.current) {
              setVoiceState('listening');
              try {
                recognition.start();
              } catch (e) {
                /* ignore */
              }
            }
          });
        } catch (err) {
          console.error('AI answer generation error:', err);
          setVoiceState('listening');
        }
      };

      recognition.onerror = (e) => {
        console.warn('SpeechRecognition error:', e.error);
        if (e.error === 'no-speech' && isSpeechModeRef.current) {
          try {
            recognition.start();
          } catch (err) {
            /* ignore */
          }
        }
      };

      recognition.onend = () => {
        if (isSpeechModeRef.current && voiceState === 'listening') {
          try {
            recognition.start();
          } catch (e) {
            /* ignore */
          }
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Browser speech engine error:', err);
      setError('Microphone access denied. Please allow mic access and try again.');
      setVoiceState('error');
    }
  }, [addMessage, kundliData, speakText, voiceState]);

  // ── Start voice session ───────────────
  const handleStartSession = async () => {
    setError(null);
    setVoiceState('requesting_mic');

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      setError('Microphone access denied. Please allow mic access and try again.');
      setVoiceState('error');
      return;
    }

    setVoiceState('connecting');

    const session = new GeminiLiveSession();
    sessionRef.current = session;

    session.onStateChange = (state) => {
      setVoiceState(state);
    };

    session.onAiResponse = (text) => {
      if (text && text.trim()) {
        addMessage('ai', text);
      }
    };

    session.onAudioLevel = (level) => {
      audioLevelRef.current = level;
    };

    session.onError = (err) => {
      console.warn('Gemini Live session failed, falling back to Browser Speech Engine:', err);
      // Fallback seamlessly to native speech engine
      startBrowserSpeechEngine();
    };

    const success = await session.start(kundliData);

    if (success) {
      setTimeout(() => {
        addMessage(
          'ai',
          kundliData
            ? `Namaste ${kundliData.name || 'Seeker'}! I can see your complete Vedic chart. Your ${kundliData.lagna || 'Lagna'} Ascendant gives you a unique cosmic blueprint. What would you like to know?`
            : 'Namaste! I am your Vedic astrology guide. Ask me anything about your cosmic journey and destiny.'
        );
      }, 1200);
    } else {
      // Start fallback interactive voice engine
      await startBrowserSpeechEngine();
      const welcomeMsg = kundliData
        ? `Namaste ${kundliData.name || 'Seeker'}! I have your ${kundliData.lagna || 'Lagna'} chart ready. Speak your question or tap any suggestion.`
        : 'Namaste! I am your Vedic astrology guide. Speak your question or tap any suggestion below.';
      addMessage('ai', welcomeMsg);
      speakText(welcomeMsg);
    }
  };

  // ── End session ───────────────────────
  const handleEndSession = async () => {
    isSpeechModeRef.current = false;
    cleanupAudio();

    if (sessionRef.current) {
      await sessionRef.current.stop();
      sessionRef.current = null;
    }

    setVoiceState('disconnected');
    setSeconds(0);
    addMessage(
      'ai',
      'Session ended. Jai Jyotisha! 🙏 Come back anytime for cosmic guidance.'
    );
  };

  // ── Send text message ─────────────────
  const handleSendText = async () => {
    const text = textInput.trim();
    if (!text) return;

    addMessage('user', text);
    setTextInput('');

    if (sessionRef.current?.isActive) {
      await sessionRef.current.sendText(text);
    } else {
      setVoiceState('thinking');
      try {
        const response = await generateVoiceResponse(text, kundliData);
        const aiReply =
          typeof response === 'string'
            ? response
            : response?.answer || response?.response || 'Cosmic wisdom received.';
        addMessage('ai', aiReply);
        setVoiceState('speaking');
        speakText(aiReply, () => {
          setVoiceState('idle');
        });
      } catch (err) {
        console.error('Text question processing error:', err);
        const fallback = `Based on your chart, the current planetary energies encourage focus, patient wisdom, and steady progress in this phase.`;
        addMessage('ai', fallback);
        setVoiceState('idle');
      }
    }
  };

  // ── Suggested questions ───────────────
  const SUGGESTIONS = [
    'What does my Lagna reveal about me?',
    'Tell me about my current Mahadasha',
    'When will I get married?',
    'What career suits me best?',
    'Are there any Yogas in my chart?',
    'What are my lucky numbers?',
  ];

  const handleSuggestion = async (question) => {
    addMessage('user', question);
    if (sessionRef.current?.isActive) {
      await sessionRef.current.sendText(question);
    } else {
      setVoiceState('thinking');
      try {
        const response = await generateVoiceResponse(question, kundliData);
        const aiReply =
          typeof response === 'string'
            ? response
            : response?.answer || response?.response || 'Cosmic wisdom received.';
        addMessage('ai', aiReply);
        setVoiceState('speaking');
        speakText(aiReply, () => {
          setVoiceState('idle');
        });
      } catch (err) {
        console.error('Suggestion processing error:', err);
        const fallback = `According to your Vedic planetary alignments, this is an auspicious time for mindful reflection and decisive action.`;
        addMessage('ai', fallback);
        setVoiceState('idle');
      }
    }
  };

  // ── Status text ───────────────────────
  const getStatusText = () => {
    switch (voiceState) {
      case 'idle':
        return 'Tap the mic to begin your cosmic conversation';
      case 'requesting_mic':
        return 'Requesting microphone access...';
      case 'connecting':
        return 'Connecting to ज्योतिष AI...';
      case 'listening':
        return 'Listening... speak your question';
      case 'thinking':
        return '✦ Reading the stars...';
      case 'speaking':
        return 'ज्योतिष AI is speaking';
      case 'disconnected':
        return 'Session ended';
      case 'error':
        return error || 'Something went wrong';
      default:
        return '';
    }
  };

  const isSessionActive = ![
    'idle',
    'disconnected',
    'error',
    'requesting_mic',
    'connecting',
  ].includes(voiceState);

  return (
    <main
      style={{
        background: '#0D0F2B',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StarField count={80} />

      {/* ── Navbar ── */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 32px',
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => navigate('/kundli')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(232,228,220,0.6)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          ← Back to Kundli
        </button>

        <div
          style={{
            fontFamily: 'Yatra One, serif',
            fontSize: '1.2rem',
            color: '#C8822A',
          }}
        >
          ✦ ज्योतिष
        </div>

        <div
          style={{
            background: 'rgba(42,171,168,0.1)',
            border: '1px solid rgba(42,171,168,0.3)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '0.75rem',
            color: '#2AABA8',
          }}
        >
          Powered by Gemini Live · Zephyr
        </div>
      </nav>

      {/* ── Main content ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          padding: '20px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1
            style={{
              fontFamily: 'Yatra One, serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: '#E8E4DC',
              marginBottom: '8px',
            }}
          >
            Voice Astrology
          </h1>
          <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.9rem' }}>
            Ask anything about your kundli and destiny
          </p>
        </div>

        {/* Kundli context card */}
        {kundliData && (
          <div
            style={{
              background: 'rgba(200,130,42,0.06)',
              border: '1px solid rgba(200,130,42,0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  color: '#C8822A',
                  fontSize: '0.75rem',
                  marginBottom: '2px',
                }}
              >
                Reading kundli for:
              </div>
              <div
                style={{
                  color: '#E8E4DC',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                }}
              >
                {kundliData.name || 'Seeker'}
              </div>
              <div
                style={{
                  color: 'rgba(232,228,220,0.5)',
                  fontSize: '0.8rem',
                }}
              >
                {kundliData.lagna || 'Ascendant'} · {kundliData.rashi || 'Chandra Rashi'}
              </div>
            </div>
            <button
              onClick={() => navigate('/onboarding')}
              style={{
                background: 'none',
                border: '1px solid rgba(200,130,42,0.3)',
                borderRadius: '8px',
                color: '#C8822A',
                padding: '6px 12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Change
            </button>
          </div>
        )}

        {/* Waveform */}
        <Waveform level={audioLevel} voiceState={voiceState} />

        {/* Status text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={voiceState}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            style={{
              textAlign: 'center',
              color:
                voiceState === 'error' ? '#e07070' : 'rgba(232,228,220,0.6)',
              fontSize: '0.9rem',
              marginBottom: '20px',
              minHeight: '24px',
            }}
          >
            {getStatusText()}
          </motion.p>
        </AnimatePresence>

        {/* Mic button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <MicButton
            voiceState={voiceState}
            onClick={isSessionActive ? handleEndSession : handleStartSession}
          />
        </div>

        {/* Suggested questions — only when idle */}
        <AnimatePresence>
          {(voiceState === 'idle' || voiceState === 'listening') &&
            messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: '20px' }}
              >
                <p
                  style={{
                    color: 'rgba(232,228,220,0.4)',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    marginBottom: '10px',
                  }}
                >
                  Try asking...
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: 'center',
                  }}
                >
                  {SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        color: 'rgba(232,228,220,0.7)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = 'rgba(200,130,42,0.4)';
                        e.target.style.color = '#C8822A';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.target.style.color = 'rgba(232,228,220,0.7)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Chat messages */}
        {messages.length > 0 && (
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '16px',
              maxHeight: '350px',
              paddingRight: '4px',
            }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {voiceState === 'thinking' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  background: 'rgba(42,171,168,0.08)',
                  border: '1px solid rgba(42,171,168,0.2)',
                  borderRadius: '16px 16px 16px 4px',
                  width: 'fit-content',
                  marginBottom: '12px',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#2AABA8',
                    }}
                  />
                ))}
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Text input bar */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '10px 14px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && textInput.trim()) {
                handleSendText();
              }
            }}
            placeholder="Or type your question here..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#E8E4DC',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
            }}
          />
          <button
            onClick={handleSendText}
            disabled={!textInput.trim()}
            style={{
              background: textInput.trim()
                ? 'linear-gradient(135deg, #C8822A, #E09840)'
                : 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              color: textInput.trim() ? '#0D0F2B' : 'rgba(232,228,220,0.3)',
              fontWeight: '600',
              cursor: textInput.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
            }}
          >
            Send →
          </button>
        </div>

        {/* Session info */}
        {isSessionActive && (
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(232,228,220,0.3)',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            Session active · {formatTime(seconds)} elapsed · Tap mic to end
          </p>
        )}
      </div>
    </main>
  );
}