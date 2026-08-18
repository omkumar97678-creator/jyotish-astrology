import React from 'react';
import { motion } from 'framer-motion';
import { lucky } from '../horoData';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function LuckyStrip() {
  const { lang } = useLang();

  const items = [
    [t.lucky_number[lang], lucky.number],
    [t.lucky_color[lang], lucky.color],
    [t.lucky_time[lang], lucky.time],
    [t.lucky_direction[lang], lucky.direction],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {items.map(([k, v]) => (
          <div key={k}>
            <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>{k}</div>
            <div className="mt-1 font-mono-num" style={{ color: 'var(--col-moonstone)', fontSize: '1.1rem' }}>{v}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}