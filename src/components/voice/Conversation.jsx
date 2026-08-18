import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const mock = [
  { role: 'user', text: 'What does my Life Path 7 mean?', time: '2:30 PM' },
  { role: 'jyotish', text: 'Your Life Path 7 indicates you are a seeker of truth and wisdom. You are naturally analytical, introspective, and drawn to understanding the deeper mysteries of life.', time: '2:30 PM' },
  { role: 'user', text: 'What about my career this year?', time: '2:31 PM' },
];

function TypingDots() {
  return (
    <div className="flex gap-1 py-1">
      {[0, 0.2, 0.4].map((d) => (
        <motion.span
          key={d}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: d }}
          style={{ width: 7, height: 7, borderRadius: '9999px', background: 'var(--col-teal)' }}
        />
      ))}
    </div>
  );
}

export default function Conversation({ messages }) {
  return (
    <div className="space-y-4 mt-6">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isUser ? 40 : -40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="glass-card max-w-[85%]"
                style={{
                  padding: '14px 18px',
                  border: `1px solid ${isUser ? 'rgba(200,130,42,0.3)' : 'rgba(42,171,168,0.3)'}`,
                  borderRight: isUser ? '3px solid var(--col-copper)' : undefined,
                  borderLeft: !isUser ? '3px solid var(--col-teal)' : undefined,
                }}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="flex items-center justify-center"
                      style={{ width: 22, height: 22, borderRadius: '9999px', background: 'rgba(42,171,168,0.15)', color: 'var(--col-teal)', fontSize: 12 }}
                    >
                      ✦
                    </span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--col-teal)' }}>
                      ज्योतिष (Jyotish)
                    </span>
                  </div>
                )}
                {m.typing ? <TypingDots /> : (
                  <p className="text-sm" style={{ color: 'var(--col-moonstone)', lineHeight: 1.6 }}>{m.text}</p>
                )}
                <div className="text-[10px] mt-1.5" style={{ color: 'var(--col-moonstone-dim)', textAlign: isUser ? 'right' : 'left' }}>
                  {m.time}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export { now, mock };