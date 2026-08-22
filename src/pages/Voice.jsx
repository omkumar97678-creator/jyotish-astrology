import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GeminiLiveSession } from '@/lib/geminiLive';
import { generateVoiceResponse } from '@/lib/aiService';
import { getCompleteNumerology } from '@/lib/kundliService';
import StarField from '@/components/StarField';

// ── Waveform Component (Two-Sided Waveform) ─────────
function Waveform({ voiceState, audioLevel }) {
  const BAR_COUNT = 40;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: '80px',
        marginBottom: '16px',
      }}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const isCenter = i > BAR_COUNT * 0.35 && i < BAR_COUNT * 0.65;

        let height = 4;
        let color = 'rgba(232,228,220,0.15)';

        if (voiceState === 'listening') {
          height = isCenter
            ? 4
            : Math.max(4, (audioLevel || 0.12) * 100 * Math.random() * Math.sin(i * 0.4) * 0.8 + 8);
          color = '#C8822A';
        } else if (voiceState === 'speaking') {
          height = Math.max(4, 20 + Math.sin(Date.now() / 120 + i * 0.4) * 20);
          color = '#2AABA8';
        } else if (voiceState === 'thinking') {
          height = 6 + Math.sin(Date.now() / 500 + i * 0.5) * 4;
          color = 'rgba(200,130,42,0.5)';
        }

        return (
          <motion.div
            key={i}
            animate={{ height }}
            transition={{ duration: 0.08 }}
            style={{
              width: '3px',
              borderRadius: '2px',
              background: color,
              minHeight: '4px',
              transition: 'background 0.3s',
            }}
          />
        );
      })}
    </div>
  );
}

// ── Central Voice Orb Button ─────────────────────────
function VoiceOrb({ voiceState, onClick }) {
  const isListening = voiceState === 'listening';
  const isSpeaking = voiceState === 'speaking';
  const isThinking = voiceState === 'thinking';
  const isConnecting = voiceState === 'connecting';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '120px',
        margin: '0 auto 24px',
      }}
    >
      {/* Ripple rings — only when listening */}
      {isListening &&
        [1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(200,130,42,0.3)',
            }}
            animate={{
              scale: [1, 1.8 + i * 0.3],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}

      {/* Main orb button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        animate={{
          boxShadow: isListening
            ? [
              '0 0 30px rgba(200,130,42,0.4)',
              '0 0 60px rgba(200,130,42,0.7)',
              '0 0 30px rgba(200,130,42,0.4)',
            ]
            : isSpeaking
              ? [
                '0 0 30px rgba(42,171,168,0.4)',
                '0 0 60px rgba(42,171,168,0.7)',
                '0 0 30px rgba(42,171,168,0.4)',
              ]
              : '0 0 20px rgba(200,130,42,0.2)',
        }}
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: Infinity,
          },
        }}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: isSpeaking
            ? 'linear-gradient(135deg, #2AABA8, #1d8a87)'
            : 'linear-gradient(135deg, #C8822A, #E09840)',
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {isConnecting ? '⏳' : isThinking ? '✦' : isSpeaking ? '⬛' : '🎙️'}
      </motion.button>
    </div>
  );
}

// ── Three-Dots Typing Indicator (For Silent Text Mode) ─
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        background: 'rgba(42,171,168,0.08)',
        border: '1px solid rgba(42,171,168,0.25)',
        borderRadius: '16px 16px 16px 4px',
        width: 'fit-content',
        marginBottom: '16px',
      }}
    >
      <span
        style={{
          fontSize: '0.8rem',
          color: '#2AABA8',
          fontWeight: '500',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        ✦ ज्योतिषी जी आपकी कुंडली देख रहे हैं...
      </span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#2AABA8',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Message Bubble Component ─────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '14px',
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
            marginRight: '10px',
            flexShrink: 0,
            marginTop: '4px',
          }}
        >
          ✦
        </div>
      )}

      <div
        style={{
          maxWidth: '78%',
          padding: '12px 16px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isUser ? 'rgba(200,130,42,0.14)' : 'rgba(42,171,168,0.08)',
          border: isUser
            ? '1px solid rgba(200,130,42,0.3)'
            : '1px solid rgba(42,171,168,0.2)',
        }}
      >
        {!isUser && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#2AABA8',
              marginBottom: '6px',
              fontWeight: '600',
            }}
          >
            ✦ ज्योतिषी
          </div>
        )}
        <p
          style={{
            color: '#E8E4DC',
            fontSize: '0.92rem',
            lineHeight: '1.6',
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {message.text}
        </p>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'rgba(232,228,220,0.35)',
            marginTop: '6px',
            textAlign: isUser ? 'right' : 'left',
          }}
        >
          {message.time}
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN VOICE & ASTROLOGY PAGE ───────────────────────
export default function Voice() {
  const navigate = useNavigate();

  // Mode Toggle: 'voice' | 'text'
  const [mode, setMode] = useState('voice');

  // Voice State: 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'disconnected' | 'error'
  const [voiceState, setVoiceState] = useState('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState(null);

  // Session Timer
  const [seconds, setSeconds] = useState(0);

  // Transcripts & Chat Messages
  const [voiceTranscript, setVoiceTranscript] = useState([]);
  const [textMessages, setTextMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Seeker Kundli Data
  const [kundliData, setKundliData] = useState(null);

  // Refs
  const sessionRef = useRef(null);
  const textMessagesEndRef = useRef(null);
  const voiceTranscriptEndRef = useRef(null);
  const audioLevelRef = useRef(0);
  const animFrameRef = useRef(null);

  const isSessionActive =
    voiceState === 'connecting' ||
    voiceState === 'listening' ||
    voiceState === 'thinking' ||
    voiceState === 'speaking';

  // ── Load Kundli on Mount ───────────────
  useEffect(() => {
    let profile = {};
    try {
      const stored = localStorage.getItem('kundli_data');
      if (stored) profile = { ...profile, ...JSON.parse(stored) };
      const onboard = localStorage.getItem('jyotish_onboarding');
      if (onboard) profile = { ...profile, ...JSON.parse(onboard) };
      const user = localStorage.getItem('jyotish_user');
      if (user) profile = { ...profile, ...JSON.parse(user) };
    } catch (e) {
      console.error('Failed to load profile', e);
    }

    if (Object.keys(profile).length > 0) {
      const num = getCompleteNumerology(
        profile.name || 'Seeker',
        profile.date_of_birth || profile.dob || '2004-09-08'
      );
      setKundliData({ ...profile, numerology: num });
    }
  }, []);

  // ── Waveform Animation Loop ────────────
  useEffect(() => {
    const animate = () => {
      setAudioLevel(audioLevelRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ── Session Timer (Fix NaN) ────────────
  useEffect(() => {
    let interval = null;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive]);

  // ── Auto-scroll Transcripts ───────────
  useEffect(() => {
    if (mode === 'text') {
      textMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      voiceTranscriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [textMessages, voiceTranscript, isTyping, mode]);

  // ── Cleanup on Unmount ─────────────────
  useEffect(() => {
    return () => {
      sessionRef.current?.stop();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Format Timer (MM:SS) ───────────────
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ── Mode Switch Handler ────────────────
  const handleModeSwitch = async (newMode) => {
    if (newMode === 'text' && sessionRef.current?.isActive) {
      await sessionRef.current.stop();
      sessionRef.current = null;
      setVoiceState('idle');
      setError(null);
    }
    setMode(newMode);
  };

  // ── Add Transcript Bubble ──────────────
  const addVoiceMessage = useCallback((role, text) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setVoiceTranscript((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, text, time },
    ]);
  }, []);

  const addTextMessage = useCallback((role, text) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTextMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role, text, time },
    ]);
  }, []);

  // ── Start Gemini Live Session ──────────
  const handleStartSession = async () => {
    setError(null);
    const session = new GeminiLiveSession();
    sessionRef.current = session;

    session.onStateChange = (state) => {
      setVoiceState(state);
    };

    session.onAudioLevel = (level) => {
      audioLevelRef.current = level;
    };

    session.onAiResponse = (text) => {
      if (text && text.trim()) {
        addVoiceMessage('ai', text);
      }
    };

    session.onError = (err) => {
      setError(err);
      setVoiceState('error');
    };

    await session.start(kundliData);
  };

  // ── End Gemini Live Session ────────────
  const handleEndSession = async () => {
    if (sessionRef.current) {
      await sessionRef.current.stop();
      sessionRef.current = null;
    }
    setVoiceState('disconnected');
    setTimeout(() => {
      setVoiceState('idle');
    }, 2500);
  };

  // ── Orb Click Behavior ─────────────────
  const handleOrbClick = async () => {
    if (isSessionActive) {
      if (voiceState === 'speaking') {
        // Interrupt AI
        sessionRef.current?.interrupt();
        setVoiceState('listening');
      } else {
        // End session
        await handleEndSession();
      }
    } else {
      // Start session
      await handleStartSession();
    }
  };

  // ── Suggestion Chip Click ──────────────
  const handleChipClick = async (question) => {
    addVoiceMessage('user', question);

    if (!sessionRef.current?.isActive) {
      await handleStartSession();
      setTimeout(async () => {
        await sessionRef.current?.sendText(question);
      }, 2000);
    } else {
      await sessionRef.current?.sendText(question);
    }
  };

  // ── Send Text Message (Silent Text Mode) ──
  const handleSendText = async () => {
    const text = textInput.trim();
    if (!text || isTyping) return;

    addTextMessage('user', text);
    setTextInput('');
    setIsTyping(true);

    try {
      const response = await generateVoiceResponse(text, kundliData);
      addTextMessage('ai', response.answer);
    } catch (err) {
      addTextMessage('ai', 'Sorry, could not connect. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const STATUS = {
    idle: '✦ Tap the orb to connect with your Jyotishi',
    connecting: 'Establishing cosmic connection...',
    listening: '🎙️ Listening — speak your question',
    thinking: '✦ Consulting the planetary positions...',
    speaking: 'ज्योतिषी बोल रहे हैं (Live Call)',
    disconnected: 'Session ended — Jai Jyotisha 🙏',
    error: error || 'Connection failed. Please check mic permission.',
  };

  const SUGGESTIONS = [
    'What does my Lagna reveal?',
    'Tell me about my Mahadasha',
    'When will I get married?',
    'What career suits me best?',
    'Any special Yogas in my chart?',
    'What are my lucky numbers?',
  ];

  return (
    <main
      style={{
        background: '#0D0F2B',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StarField count={75} />

      {/* ── Main Content Container (Proper padding to clear fixed top Navbar on mobile & desktop) ── */}
      <div
        className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '680px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Top Breadcrumb & Live Consultation Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <button
            onClick={() => navigate('/kundli')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(232,228,220,0.6)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: 0,
            }}
          >
            ← Back to Kundli
          </button>

          <div
            style={{
              background: 'rgba(42,171,168,0.1)',
              border: '1px solid rgba(42,171,168,0.3)',
              borderRadius: '20px',
              padding: '4px 14px',
              fontSize: '0.75rem',
              color: '#2AABA8',
              fontWeight: '500',
            }}
          >
            ✦ Live Vedic Consultation
          </div>
        </div>

        {/* Kundli Context Banner */}
        {kundliData && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(200,130,42,0.08)',
              border: '1px solid rgba(200,130,42,0.2)',
              borderRadius: '16px',
              padding: '10px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              color: '#E8E4DC',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            <div>
              <span style={{ color: '#C8822A', marginRight: '6px' }}>✦</span>
              <strong>{kundliData.name || 'Seeker'}</strong> · {kundliData.lagna || 'Ascendant'} ·{' '}
              {kundliData.rashi || 'Rashi'}
            </div>
            <div style={{ color: 'rgba(232,228,220,0.6)', fontSize: '0.8rem' }}>
              Life Path: <strong>{kundliData.numerology?.lifePathNumber || 5}</strong> · Mulank:{' '}
              <strong>{kundliData.numerology?.mulank || 8}</strong>
            </div>
          </motion.div>
        )}

        {/* ── Mode Toggle UI (Top of Page) ── */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            padding: '4px',
            gap: '4px',
            width: 'fit-content',
            margin: '0 auto 24px',
          }}
        >
          {[
            { id: 'voice', label: '🎙️ Voice Call' },
            { id: 'text', label: '⌨️ Text Chat' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleModeSwitch(id)}
              style={{
                padding: '8px 22px',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'all 0.25s ease',
                background:
                  mode === id
                    ? 'linear-gradient(135deg, #C8822A, #E09840)'
                    : 'transparent',
                color: mode === id ? '#0D0F2B' : 'rgba(232,228,220,0.5)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── MODE 1: VOICE MODE (Gemini 3.1 Live) ── */}
        {mode === 'voice' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Mic Permission or Connection Error Card */}
            {voiceState === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(220,80,80,0.08)',
                  border: '1px solid rgba(220,80,80,0.25)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                  {(typeof error === 'object' ? error?.isPermissionDenied : error?.toLowerCase()?.includes('permission'))
                    ? '🎤'
                    : '⚠️'}
                </div>
                <h3 style={{ color: '#E8E4DC', margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                  {(typeof error === 'object' ? error?.isPermissionDenied : error?.toLowerCase()?.includes('permission'))
                    ? 'Microphone Access Needed'
                    : 'Voice Connection Issue'}
                </h3>
                <p
                  style={{
                    color: 'rgba(232,228,220,0.7)',
                    fontSize: '0.88rem',
                    marginBottom: '16px',
                    lineHeight: '1.5',
                  }}
                >
                  {(typeof error === 'object' ? error?.message : error) ||
                    'Please allow microphone access or tap below to reconnect.'}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setError(null);
                      setVoiceState('idle');
                      handleStartSession();
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #C8822A, #E09840)',
                      border: 'none',
                      borderRadius: '100px',
                      padding: '10px 20px',
                      color: '#0D0F2B',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    🔄 Try Again
                  </button>
                  <button
                    onClick={() => {
                      setError(null);
                      setVoiceState('idle');
                      setMode('text');
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '100px',
                      padding: '10px 20px',
                      color: '#E8E4DC',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    Switch to Text Chat
                  </button>
                </div>
              </motion.div>
            )}

            {/* Waveform */}
            <Waveform voiceState={voiceState} audioLevel={audioLevel} />

            {/* Status Text */}
            <motion.p
              key={voiceState}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center',
                color:
                  voiceState === 'speaking'
                    ? '#2AABA8'
                    : voiceState === 'listening'
                      ? '#C8822A'
                      : 'rgba(232,228,220,0.6)',
                fontSize: '0.95rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: '500',
                marginBottom: '20px',
                minHeight: '24px',
              }}
            >
              {STATUS[voiceState] || STATUS.idle}
            </motion.p>

            {/* Central Voice Orb Button */}
            <VoiceOrb voiceState={voiceState} onClick={handleOrbClick} />

            {/* Suggestion Chips (only when idle) */}
            {voiceState === 'idle' && (
              <div style={{ marginBottom: '24px' }}>
                <p
                  style={{
                    color: 'rgba(232,228,220,0.4)',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    marginBottom: '10px',
                  }}
                >
                  Suggested questions to ask:
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
                      onClick={() => handleChipClick(q)}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        color: 'rgba(232,228,220,0.75)',
                        fontSize: '0.82rem',
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
                        e.target.style.color = 'rgba(232,228,220,0.75)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Chat Transcript (below chips) */}
            {voiceTranscript.length > 0 && (
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  maxHeight: '260px',
                  marginBottom: '16px',
                  paddingRight: '6px',
                }}
              >
                {voiceTranscript.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={voiceTranscriptEndRef} />
              </div>
            )}

            {/* Session Timer & Status Bar */}
            {isSessionActive && (
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'rgba(232,228,220,0.3)',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  marginTop: '8px',
                }}
              >
                Session active · {formatTime(seconds)} elapsed · Tap orb to interrupt / end
              </p>
            )}
          </div>
        )}

        {/* ── MODE 2: TEXT MODE (Silent OpenAI Chat) ── */}
        {mode === 'text' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Full chat area */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                overflowY: 'auto',
                maxHeight: '440px',
                minHeight: '280px',
                padding: '8px',
                marginBottom: '16px',
              }}
            >
              {textMessages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <p style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.88rem' }}>
                    Type your astrological questions below for instant silent Vedic guidance.
                  </p>
                </div>
              )}

              {textMessages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

              <div ref={textMessagesEndRef} />
            </div>

            {/* Text input bar */}
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '8px 12px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                placeholder="Ask anything about your kundli..."
                autoFocus
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#E8E4DC',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.92rem',
                  padding: '6px',
                }}
              />
              <button
                onClick={handleSendText}
                disabled={!textInput.trim() || isTyping}
                style={{
                  background:
                    textInput.trim() && !isTyping
                      ? 'linear-gradient(135deg, #C8822A, #E09840)'
                      : 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 18px',
                  color: textInput.trim() && !isTyping ? '#0D0F2B' : 'rgba(232,228,220,0.3)',
                  fontWeight: '600',
                  cursor: textInput.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
              >
                Send →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}