import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const mock = [
  { role: 'user', text: 'What does my Life Path 7 mean?', time: '2:30 PM' },
  { role: 'ai', text: 'Your Life Path indicates you are a seeker of truth and wisdom. You are naturally analytical, introspective, and drawn to understanding the deeper mysteries of life.', time: '2:30 PM' },
  { role: 'user', text: 'What about my career this year?', time: '2:31 PM' },
];

export default function Conversation({ messages = [], isTyping = false }) {
  return (
    <div className="space-y-4 mt-6">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          return (
            <motion.div
              key={m.id || i}
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
                <p className="text-sm" style={{ color: 'var(--col-moonstone)', lineHeight: 1.6 }}>{m.text}</p>
                <div className="text-[10px] mt-1.5" style={{ color: 'var(--col-moonstone-dim)', textAlign: isUser ? 'right' : 'left' }}>
                  {m.time}
                </div>
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '12px 18px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(42,171,168,0.2)',
                borderRadius: '16px',
                width: 'fit-content',
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#2AABA8',
                    animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { now, mock };