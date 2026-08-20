import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LiveVoiceCallSession, generateGeminiAstrologyAnswer } from '@/lib/geminiLive';
import StarField from '@/components/StarField';

// ── Waveform Component ─────────────────
function Waveform({ level, voiceState }) {
  const BAR_COUNT = 36;
  const bars = Array.from({ length: BAR_COUNT });

  const getBarHeight = (i) => {
    if (voiceState === 'disconnected' || voiceState === 'idle') return 4;

    if (voiceState === 'listening') {
      const base = Math.max(6, (level || 0.12) * 100);
      const variation = Math.sin(Date.now() / 180 + i * 0.4) * base * 0.4;
      return Math.max(6, base + variation);
    }

    if (voiceState === 'speaking') {
      return Math.max(8, 25 + Math.sin(Date.now() / 120 + i * 0.35) * 35);
    }

    if (voiceState === 'thinking') {
      return Math.max(6, 12 + Math.sin(Date.now() / 300 + i * 0.6) * 8);
    }

    return 6;
  };

  const getBarColor = () => {
    switch (voiceState) {
      case 'listening':
        return '#C8822A';
      case 'speaking':
        return '#2AABA8';
      case 'thinking':
        return '#E09840';
      default:
        return 'rgba(232,228,220,0.2)';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '90px',
        justifyContent: 'center',
      }}
    >
      {bars.map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: getBarHeight(i) }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
          style={{
            width: '4px',
            borderRadius: '3px',
            background: getBarColor(),
            minHeight: '6px',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  );
}

// ── Three-Dots Typing Indicator ────────
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
        ✦ ज्योतिष AI is reading your chart
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

// ── Message Bubble ─────────────────────
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
          maxWidth: '75%',
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
            ✦ ज्योतिष AI
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

// ── MAIN VOICE & ASTROLOGY PAGE ────────
export default function Voice() {
  const navigate = useNavigate();

  // Call Mode vs Text Mode
  const [isCallActive, setIsCallActive] = useState(false);
  const [callState, setCallState] = useState('disconnected'); // 'connecting' | 'listening' | 'thinking' | 'speaking'
  const [callSeconds, setCallSeconds] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  // Text Chat State
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Kundli Data
  const [kundliData, setKundliData] = useState(null);

  // Refs
  const callSessionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioLevelRef = useRef(0);

  // ── Load Kundli on Mount ──────────────
  useEffect(() => {
    const stored = localStorage.getItem('kundli_data');
    if (stored) {
      try {
        setKundliData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse kundli', e);
      }
    } else {
      const onboard = localStorage.getItem('jyotish_onboarding');
      if (onboard) {
        try {
          setKundliData(JSON.parse(onboard));
        } catch (e) {
          /* ignore */
        }
      }
    }
  }, []);

  // ── Auto Scroll Chat ──────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Call Timer ────────────────────────
  useEffect(() => {
    if (isCallActive && callState !== 'disconnected') {
      timerRef.current = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isCallActive, callState]);

  // ── Waveform Animation ────────────────
  useEffect(() => {
    const animate = () => {
      setAudioLevel(audioLevelRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ── Cleanup on Unmount ────────────────
  useEffect(() => {
    return () => {
      callSessionRef.current?.endCall();
      clearInterval(timerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Format Timer (MM:SS) ──────────────
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ── Add Message Helper ────────────────
  const addMessage = useCallback((role, text) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, text, time }]);
  }, []);

  // ── START LIVE VOICE CALL ─────────────
  const handleStartCall = async () => {
    setIsCallActive(true);
    setCallState('connecting');
    setCallSeconds(0);

    const session = new LiveVoiceCallSession();
    callSessionRef.current = session;

    session.onStateChange = (state) => {
      setCallState(state);
    };

    session.onAudioLevel = (level) => {
      audioLevelRef.current = level;
    };

    session.onError = (err) => {
      console.error('Call session error:', err);
    };

    await session.startCall(kundliData, 'Zephyr');
  };

  // ── END LIVE VOICE CALL ───────────────
  const handleEndCall = async () => {
    if (callSessionRef.current) {
      await callSessionRef.current.endCall();
      callSessionRef.current = null;
    }
    setIsCallActive(false);
    setCallState('disconnected');
    setCallSeconds(0);
  };

  // ── SEND TEXT MESSAGE (Normal Quiet Chat) ──
  const handleSendText = async () => {
    const text = textInput.trim();
    if (!text || isTyping) return;

    addMessage('user', text);
    setTextInput('');
    setIsTyping(true);

    try {
      const response = await generateGeminiAstrologyAnswer(text, kundliData);
      setIsTyping(false);
      addMessage('ai', response);
    } catch (err) {
      setIsTyping(false);
      addMessage(
        'ai',
        'Based on your chart, the planetary alignments encourage steady focus and auspicious progress.'
      );
    }
  };

  // ── SUGGESTION CLICK (Normal Quiet Chat) ──
  const handleSuggestion = async (question) => {
    if (isTyping) return;

    addMessage('user', question);
    setIsTyping(true);

    try {
      const response = await generateGeminiAstrologyAnswer(question, kundliData);
      setIsTyping(false);
      addMessage('ai', response);
    } catch (err) {
      setIsTyping(false);
      addMessage(
        'ai',
        'According to your Vedic planetary alignments, this is an auspicious time for thoughtful decisions and growth.'
      );
    }
  };

  const SUGGESTIONS = [
    'What does my Lagna reveal about me?',
    'Tell me about my current Mahadasha',
    'When will I get married?',
    'What career suits me best?',
    'Are there any Yogas in my chart?',
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
      <StarField count={80} />

      {/* ── Navbar ── */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 32px',
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
            fontSize: '1.25rem',
            color: '#C8822A',
          }}
        >
          ✦ ज्योतिष AI
        </div>

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
          Google Zephyr HD Voice
        </div>
      </nav>

      {/* ── CONDITIONAL VIEW: LIVE CALL MODE VS TEXT CHAT ── */}
      {isCallActive ? (
        /* ══════════════════════════════════════════════════════════════
           LIVE VOICE CONSULTATION INTERFACE (Call Mode - Pure Audio)
           ══════════════════════════════════════════════════════════════ */
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            position: 'relative',
            zIndex: 10,
            maxWidth: '600px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Kundli badge */}
          {kundliData && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(200,130,42,0.08)',
                border: '1px solid rgba(200,130,42,0.25)',
                borderRadius: '30px',
                padding: '6px 18px',
                marginBottom: '28px',
                fontSize: '0.85rem',
                color: '#E8E4DC',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#C8822A' }}>✦</span>
              <span>
                Reading for: <strong>{kundliData.name || 'Seeker'}</strong> ({kundliData.lagna || 'Ascendant'})
              </span>
            </motion.div>
          )}

          {/* Central Pulsating Orb / Sphere */}
          <div
            style={{
              position: 'relative',
              width: '180px',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '36px',
            }}
          >
            {/* Ambient pulsating rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `2px solid ${
                    callState === 'speaking'
                      ? 'rgba(42,171,168,0.4)'
                      : callState === 'thinking'
                      ? 'rgba(224,152,64,0.4)'
                      : 'rgba(200,130,42,0.3)'
                  }`,
                }}
                animate={{
                  scale: [1, 1.4 + i * 0.25],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Core Orb Button */}
            <motion.div
              animate={{
                scale:
                  callState === 'speaking'
                    ? [1, 1.08, 1]
                    : callState === 'listening'
                    ? [1, 1.04, 1]
                    : 1,
                boxShadow:
                  callState === 'speaking'
                    ? '0 0 60px rgba(42,171,168,0.6)'
                    : callState === 'thinking'
                    ? '0 0 50px rgba(224,152,64,0.5)'
                    : '0 0 40px rgba(200,130,42,0.4)',
              }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background:
                  callState === 'speaking'
                    ? 'radial-gradient(circle, #2AABA8 0%, #176563 100%)'
                    : callState === 'thinking'
                    ? 'radial-gradient(circle, #E09840 0%, #8c5311 100%)'
                    : 'radial-gradient(circle, #C8822A 0%, #6d400e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px',
                border: '3px solid rgba(255,255,255,0.2)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {callState === 'connecting'
                ? '⏳'
                : callState === 'thinking'
                ? '🌟'
                : callState === 'speaking'
                ? '🔊'
                : '🎙️'}
            </motion.div>
          </div>

          {/* Real-time Waveform */}
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <Waveform level={audioLevel} voiceState={callState} />
          </div>

          {/* Status Label */}
          <motion.div
            key={callState}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                color: '#E8E4DC',
                fontFamily: 'Yatra One, serif',
                marginBottom: '4px',
              }}
            >
              {callState === 'connecting'
                ? 'Connecting to Live Consultation...'
                : callState === 'listening'
                ? 'Listening... Speak your question'
                : callState === 'thinking'
                ? '✦ Astrologer is reading your chart...'
                : callState === 'speaking'
                ? 'Astrologer is speaking'
                : 'Live Consultation Active'}
            </h2>
            <p
              style={{
                color: 'rgba(232,228,220,0.4)',
                fontSize: '0.85rem',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
              }}
            >
              Call Duration: {formatTime(callSeconds)}
            </p>
          </motion.div>

          {/* End Call Button */}
          <motion.button
            onClick={handleEndCall}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #e05252, #a82a2a)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '30px',
              padding: '14px 36px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(224,82,82,0.35)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <span>📞</span>
            <span>End Consultation</span>
          </motion.button>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════
           TEXT CONSULTATION & START CALL INTERFACE (Quiet Chat Mode)
           ══════════════════════════════════════════════════════════════ */
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '740px',
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Header Banner with Call CTA */}
          <div
            style={{
              background: 'rgba(200,130,42,0.06)',
              border: '1px solid rgba(200,130,42,0.25)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: 'Yatra One, serif',
                  fontSize: '1.35rem',
                  color: '#E8E4DC',
                  margin: '0 0 4px 0',
                }}
              >
                Voice & Text Astrology
              </h1>
              <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.85rem', margin: 0 }}>
                {kundliData?.name
                  ? `Reading for ${kundliData.name} (${kundliData.lagna || 'Ascendant'} · ${kundliData.rashi || 'Rashi'})`
                  : 'Instant Vedic astrological consultation'}
              </p>
            </div>

            <motion.button
              onClick={handleStartCall}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'linear-gradient(135deg, #C8822A, #E09840)',
                color: '#0D0F2B',
                border: 'none',
                borderRadius: '24px',
                padding: '10px 22px',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(200,130,42,0.3)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <span>🎙️</span>
              <span>Start Voice Call</span>
            </motion.button>
          </div>

          {/* Suggestions (only when chat is empty) */}
          {messages.length === 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p
                style={{
                  color: 'rgba(232,228,220,0.45)',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  marginBottom: '12px',
                }}
              >
                Suggested questions about your destiny:
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
                      padding: '8px 16px',
                      color: 'rgba(232,228,220,0.75)',
                      fontSize: '0.85rem',
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

          {/* Chat Messages Scroll Container */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '16px',
              minHeight: '280px',
              maxHeight: '440px',
              paddingRight: '6px',
            }}
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Animated 3-dot Typing Indicator */}
            <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Bar */}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && textInput.trim() && !isTyping) {
                  handleSendText();
                }
              }}
              placeholder="Type your astrology question here..."
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
    </main>
  );
}