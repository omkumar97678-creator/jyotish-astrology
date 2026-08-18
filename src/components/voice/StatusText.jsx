import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function StatusText({ state }) {
  const { lang } = useLang();

  const textFor = (s) => {
    if (s === 'listening') {
      return lang === 'hinglish' ? 'सुन रहे हैं... कृपया बोलें' : 'Listening... speak now';
    }
    if (s === 'speaking') {
      return lang === 'hinglish' ? 'ज्योतिष आचार्य उत्तर दे रहे हैं...' : 'Jyotish Acharya is responding...';
    }
    return lang === 'hinglish' ? 'प्रश्न पूछने के लिए माइक दबाएं' : 'Tap the mic to ask a question';
  };

  return (
    <div className="h-6 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={state}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-sm font-medium"
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