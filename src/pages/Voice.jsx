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

const jyotishReply = (q) =>
  q.toLowerCase().includes('career')
    ? 'This year favors steady growth in your career. Saturn\'s transit asks for discipline, but rewards patient effort with recognition around late autumn.'
    : 'Based on your kundli, the planetary alignment suggests a period of reflection and opportunity. Trust your intuition and stay grounded in your decisions.';

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

  const startFlow = (userText) => {
    clearTimers();
    if (userText) {
      setMessages((m) => [...m, { role: 'user', text: userText, time: now() }]);
    }
    setVoiceState('listening');

    timers.current.push(setTimeout(() => setVoiceState('speaking'), 3000));

    timers.current.push(
      setTimeout(() => {
        const last = userText || 'Tell me about my Moon sign personality.';
        setMessages((m) => [...m, { role: 'jyotish', text: jyotishReply(last), time: now() }]);
        setVoiceState('idle');
      }, 6000)
    );
  };

  const onSend = () => {
    if (!text.trim()) return;
    startFlow(text.trim());
    setText('');
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-28 pb-8">
        <VoiceHeader />
        <KundliContext />

        <div className="glass-card mt-6 flex flex-col items-center" style={{ padding: '36px 24px' }}>
          <Waveform state={voiceState} />
          <div className="my-4" />
          <MicButton state={voiceState} onClick={() => voiceState === 'idle' && startFlow()} />
          <div className="mt-4" />
          <StatusText state={voiceState} />
        </div>

        <div className="mt-6">
          <Suggestions show={voiceState === 'idle' && voiceMode} onAsk={(q) => startFlow(q)} />
        </div>

        <Conversation messages={messages} />

        <div className="mt-8">
          <InputBar
            value={text}
            onChange={setText}
            onSend={onSend}
            voiceMode={voiceMode}
            onToggleVoice={() => setVoiceMode((v) => !v)}
          />
          <SessionBar seconds={sessionTime} />
        </div>
      </main>
    </div>
  );
}