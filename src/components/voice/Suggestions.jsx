import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const chips = [
  'What does my Lagna mean?',
  'When will I get married?',
  'Is 2025 good for my career?',
  'What are my lucky numbers?',
  'Tell me about my Saturn placement',
  'What is my Moon sign personality?',
];

export default function Suggestions({ show, onAsk }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden"
        >
          <div className="text-center mb-4 text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
            Try asking...
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {chips.map((c, i) => (
              <motion.button
                key={c}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
                onClick={() => onAsk(c)}
                className="px-4 py-2 text-sm rounded-full transition-colors"
                style={{
                  background: 'var(--col-glass)',
                  border: '1px solid rgba(200,130,42,0.4)',
                  color: 'var(--col-moonstone)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--col-copper)';
                  e.currentTarget.style.color = 'var(--col-midnight)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--col-glass)';
                  e.currentTarget.style.color = 'var(--col-moonstone)';
                }}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}