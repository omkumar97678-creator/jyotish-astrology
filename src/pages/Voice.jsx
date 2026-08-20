import React, { useState, useEffect } from 'react';
import StarField from '@/components/StarField';
import VoiceHeader from '@/components/voice/VoiceHeader';
import KundliContext from '@/components/voice/KundliContext';
import Waveform from '@/components/voice/Waveform';
import StatusText from '@/components/voice/StatusText';
import MicButton from '@/components/voice/MicButton';
import Suggestions from '@/components/voice/Suggestions';
import Conversation, { mock } from '@/components/voice/Conversation';
import SessionBar from '@/components/voice/SessionBar';
import { generateVoiceResponse } from '@/lib/aiService';
import { useAuth } from '@/context/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const isUUID = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

export default function Voice() {
  const { user } = useAuth();
  const [voiceState, setVoiceState] = useState('idle');
  const [messages, setMessages] = useState(mock);
  const [seconds, setSeconds] = useState(0);
  const [inputMode, setInputMode] = useState('voice');
  const [textInput, setTextInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [kundliData, setKundliData] = useState({});
  const [sessionId, setSessionId] = useState(null);

  // ── FIX 1: Session Timer ──────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── FIX 3: Load Real User Kundli Data ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kundli_data') || localStorage.getItem('jyotish_onboarding') || '{}';
      setKundliData(JSON.parse(stored));
    } catch {
      setKundliData({});
    }
  }, []);

  // ── FIX 4.1: Create Voice Session in Supabase ──
  useEffect(() => {
    const createSession = async () => {
      if (!user || !isSupabaseConfigured()) return;
      try {
        const kundliId = localStorage.getItem('current_kundli_id');
        const { data, error } = await supabase
          .from('voice_sessions')
          .insert({
            user_id: user.id,
            kundli_id: isUUID(kundliId) ? kundliId : null,
            messages: [],
            session_duration: 0,
          })
          .select()
          .single();

        if (!error && data?.id) {
          setSessionId(data.id);
          console.log('Voice session created ✅', data.id);
        }
      } catch (err) {
        console.error('Session create failed:', err);
      }
    };

    createSession();
  }, [user]);

  // ── FIX 4.2: Save Messages to Supabase ──
  const saveMessages = async (updatedMessages) => {
    if (!sessionId || !isSupabaseConfigured()) return;
    try {
      await supabase
        .from('voice_sessions')
        .update({
          messages: updatedMessages,
          session_duration: seconds,
        })
        .eq('id', sessionId);
      console.log('Voice session messages saved ✅');
    } catch (err) {
      console.error('Messages save failed:', err);
    }
  };

  // ── FIX 4.3: Handle Send Message ───────
  const handleSendMessage = async (text) => {
    if (!text || !text.trim()) return;
    const queryText = text.trim();

    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: queryText,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const afterUserMessages = [...messages, userMsg];
    setMessages(afterUserMessages);
    saveMessages(afterUserMessages);

    // Show typing indicator
    setIsTyping(true);
    setVoiceState('speaking');

    try {
      // Call AI with real kundli context
      const response = await generateVoiceResponse(queryText, kundliData);
      const answerText =
        typeof response === 'string'
          ? response
          : (response?.answer || response?.insights || response?.overall || 'Based on your Vedic chart, your planetary alignment brings clarity, wisdom, and auspicious progress in your path.');

      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: answerText,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      const finalMessages = [...afterUserMessages, aiMsg];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } catch (err) {
      console.warn('Voice response error:', err);
      const errorMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: 'Sorry, could not connect. Please try again.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      const finalMessages = [...afterUserMessages, errorMsg];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } finally {
      setIsTyping(false);
      setVoiceState('idle');
    }
  };

  const startVoiceFlow = (question) => {
    setVoiceState('listening');
    const query = question || 'Tell me about my Moon sign and current planetary transit phase.';
    setTimeout(() => {
      handleSendMessage(query);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20">
        <VoiceHeader />

        {/* Real User Kundli Context */}
        <div className="mt-8">
          <KundliContext kundliData={kundliData} />
        </div>

        {/* Voice Visualization & Mic */}
        <div className="mt-12 text-center flex flex-col items-center">
          <Waveform state={voiceState} />
          <div className="mt-6">
            <StatusText state={voiceState} />
          </div>
          <div className="mt-6">
            <MicButton state={voiceState} onClick={() => startVoiceFlow()} />
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-10">
          <Suggestions onSelect={(q) => handleSendMessage(q)} />
        </div>

        {/* Conversation List with Typing Indicator */}
        <div className="mt-8">
          <Conversation messages={messages} isTyping={isTyping} />
        </div>

        {/* ── FIX 2: Switch to Text / Text Input ── */}
        <div className="mt-8">
          {inputMode === 'text' ? (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
              }}
            >
              <input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your question..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textInput.trim()) {
                    handleSendMessage(textInput);
                    setTextInput('');
                  }
                }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#E8E4DC',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                }}
                autoFocus
              />
              <button
                onClick={() => {
                  if (textInput.trim()) {
                    handleSendMessage(textInput);
                    setTextInput('');
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #C8822A, #E09840)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  color: '#0D0F2B',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Send →
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setInputMode('text')}
                className="btn-ghost text-sm cursor-pointer"
                style={{ padding: '12px 24px' }}
              >
                ⌨ Switch to text
              </button>
            </div>
          )}

          {inputMode === 'text' && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => setInputMode('voice')}
                className="btn-ghost text-xs cursor-pointer"
                style={{ padding: '8px 16px', color: 'var(--col-moonstone-dim)' }}
              >
                🎙 Switch to voice
              </button>
            </div>
          )}
        </div>

        {/* ── FIX 1: Session Timer ── */}
        <div className="mt-6">
          <SessionBar seconds={seconds} />
        </div>
      </main>
    </div>
  );
}