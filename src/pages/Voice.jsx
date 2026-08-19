import React, { useState, useEffect, useRef } from 'react';
import StarField from '@/components/StarField';
import VoiceHeader from '@/components/voice/VoiceHeader';
import KundliContext from '@/components/voice/KundliContext';
import Waveform from '@/components/voice/Waveform';
import StatusText from '@/components/voice/StatusText';
import MicButton from '@/components/voice/MicButton';
import Suggestions from '@/components/voice/Suggestions';
import Conversation, { now, mock } from '@/components/voice/Conversation';
import InputBar from '@/components/voice/InputBar';
import SessionBar from '@/components/voice/SessionBar';
import { generateVoiceResponse } from '@/lib/aiService';

export default function Voice() {
  const [voiceState, setVoiceState] = useState('idle');
  const [messages, setMessages] = useState(mock);
  const [sessionTime, setSessionTime] = useState(0);
  const [voiceMode, setVoiceMode] = useState(true);
  const [text, setText] = useState('');
  const timers = useRef([]);

  useEffect(() => {
    const id = setInterval(() => setSessionTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const startFlow = async (userText) => {
    clearTimers();
    const query = userText || 'Tell me about my Moon sign and current astrological phase.';
    setMessages((m) => [...m, { role: 'user', text: query, time: now() }]);
    setVoiceState('listening');

    timers.current.push(setTimeout(() => setVoiceState('speaking'), 1200));

    try {
      let kundliContext = null;
      try {
        const stored = localStorage.getItem('kundli_data') || localStorage.getItem('jyotish_onboarding');
        if (stored) kundliContext = JSON.parse(stored);
      } catch (e) {
        /* ignore */
      }

      const res = await generateVoiceResponse(query, kundliContext);
      const answer = res?.answer || 'Based on your Vedic chart, your planetary alignment brings clarity, wisdom, and auspicious progress in your personal and professional path.';
      
      timers.current.push(
        setTimeout(() => {
          setMessages((m) => [...m, { role: 'jyotish', text: answer, time: now() }]);
          setVoiceState('idle');
        }, 2200)
      );
    } catch (err) {
      console.warn('Voice AI response error:', err);
      timers.current.push(
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            {
              role: 'jyotish',
              text: 'According to your Vedic birth chart, planetary alignments highlight strong intuitive growth and steady progress.',
              time: now(),
            },
          ]);
          setVoiceState('idle');
        }, 2200)
      );
    }
  };

  const onSend = () => {
    if (!text.trim()) return;
    startFlow(text.trim());
    setText('');
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20">
        <VoiceHeader />
        <div className="mt-8">
          <KundliContext />
        </div>

        <div className="mt-12 text-center flex flex-col items-center">
          <Waveform state={voiceState} />
          <div className="mt-6">
            <StatusText state={voiceState} />
          </div>
          <div className="mt-6">
            <MicButton state={voiceState} onClick={() => startFlow()} />
          </div>
        </div>

        <div className="mt-10">
          <Suggestions onSelect={(q) => startFlow(q)} />
        </div>

        <div className="mt-8">
          <Conversation messages={messages} />
        </div>

        <div className="mt-8">
          <InputBar
            text={text}
            setText={setText}
            onSend={onSend}
            voiceMode={voiceMode}
            setVoiceMode={setVoiceMode}
          />
        </div>

        <div className="mt-6">
          <SessionBar time={sessionTime} />
        </div>
      </main>
    </div>
  );
}