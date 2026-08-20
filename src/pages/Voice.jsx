import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GeminiLiveSession, generateGeminiAstrologyAnswer } from '@/lib/geminiLive';
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
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioLevelRef = useRef(0);

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

  // ── Cleanup on unmount ────────────────
  useEffect(() => {
    return () => {
      sessionRef.current?.stop();
      clearInterval(timerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
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

  // ── Start voice session ───────────────
  const handleStartSession = async () => {
    setError(null);
    setVoiceState('requesting_mic');

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      setError('Microphone access denied. Please allow mic permission and try again.');
      setVoiceState('error');
      return;
    }

    setVoiceState('connecting');

    const session = new GeminiLiveSession();
    sessionRef.current = session;

    session.onStateChange = (state) => {
      setVoiceState(state);
    };

    session.onTranscript = (userText) => {
      addMessage('user', userText);
    };

    session.onAiResponse = (aiText) => {
      if (aiText && aiText.trim()) {
        addMessage('ai', aiText);
      }
    };

    session.onAudioLevel = (level) => {
      audioLevelRef.current = level;
    };

    session.onError = (err) => {
      console.error('Gemini Live session error:', err);
      setError(err?.message || 'Voice session connection issue.');
      setVoiceState('error');
    };

    const success = await session.start(kundliData, 'Zephyr');

    if (success) {
      setTimeout(() => {
        addMessage(
          'ai',
          kundliData
            ? `Namaste ${kundliData.name || 'Seeker'}! I have your complete Vedic chart ready (${kundliData.lagna || 'Ascendant'} Lagna). Speak your question, I am listening.`
            : 'Namaste! I am your Vedic astrology guide. Speak your question, I am listening.'
        );
      }, 1000);
    }
  };

  // ── End session ───────────────────────
  const handleEndSession = async () => {
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

  // ── Send text message (Clean quiet text chat - NO voice) ──
  const handleSendText = async () => {
    const text = textInput.trim();
    if (!text) return;

    addMessage('user', text);
    setTextInput('');

    try {
      const response = await generateGeminiAstrologyAnswer(text, kundliData);
      addMessage('ai', response);
    } catch (err) {
      console.error('Text question processing error:', err);
      const fallback = `Based on your chart, the planetary alignments encourage steady focus and auspicious progress.`;
      addMessage('ai', fallback);
    }
  };

  // ── Suggested questions (Clean quiet text chat - NO voice) ──
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
    try {
      const response = await generateGeminiAstrologyAnswer(question, kundliData);
      addMessage('ai', response);
    } catch (err) {
      console.error('Suggestion processing error:', err);
      const fallback = `According to your Vedic planetary alignments, this is an auspicious time for thoughtful decisions and growth.`;
      addMessage('ai', fallback);
    }
  };

  // ── Status text ───────────────────────
  const getStatusText = () => {
    switch (voiceState) {
      case 'idle':
        return 'Tap the mic to start live voice consultation';
      case 'requesting_mic':
        return 'Requesting microphone access...';
      case 'connecting':
        return 'Connecting with Zephyr Voice...';
      case 'listening':
        return 'Listening... speak your question';
      case 'thinking':
        return '✦ Reading the stars...';
      case 'speaking':
        return 'ज्योतिष AI is speaking (Zephyr Voice)';
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
          Powered by Gemini 3.1 · Zephyr Voice
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
            Speak naturally and receive spoken guidance in Zephyr voice
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