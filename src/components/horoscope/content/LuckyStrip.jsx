import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function LuckyStrip({ lucky }) {
  const { lang } = useLang();

  const lk = lucky || { number: 7, color: 'Gold', time: '6 – 8 PM', direction: 'North' };

  const items = [
    [t.lucky_number[lang], lk.number],
    [t.lucky_color[lang], lk.color],
    [t.lucky_time[lang], lk.time],
    [t.lucky_direction[lang], lk.direction],
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
            <div className="mt-1 font-mono-num font-medium" style={{ color: 'var(--col-moonstone)', fontSize: '1.1rem' }}>{v}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}