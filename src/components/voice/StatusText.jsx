import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const textFor = (s) =>
  s === 'listening' ? 'Listening... speak now' : s === 'speaking' ? 'Gemini is responding...' : 'Tap the mic to ask a question';

export default function StatusText({ state }) {
  return (
    <div className="h-6 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={state}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-sm"
          style={{
            color: state === 'listening' ? 'var(--col-copper)' : state === 'speaking' ? 'var(--col-teal)' : 'var(--col-moonstone-dim)',
          }}
        >
          {textFor(state)}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}