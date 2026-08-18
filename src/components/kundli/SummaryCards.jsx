import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function SummaryCards() {
  const { lang } = useLang();

  const cards = [
    {
      label: lang === 'hinglish' ? 'Lagna (लग्नेश)' : 'Lagna (Ascendant)',
      value: 'Leo (Singha)',
      note: lang === 'hinglish' ? 'Janam ke samay uday rashi' : 'Rising sign at birth'
    },
    {
      label: lang === 'hinglish' ? 'Rashi (चन्द्र राशि)' : 'Rashi (Moon Sign)',
      value: 'Cancer (Karka)',
      note: lang === 'hinglish' ? 'Jahan Chandrama virajman hai' : 'Where the Moon sits'
    },
    {
      label: lang === 'hinglish' ? 'Nakshatra (नक्षत्र)' : 'Nakshatra',
      value: 'Pushya',
      note: lang === 'hinglish' ? 'Janam nakshatra' : 'Birth star'
    },
    {
      label: lang === 'hinglish' ? 'Gana (गण)' : 'Gana',
      value: 'Manushya',
      note: lang === 'hinglish' ? 'Swabhav & Pravritti' : 'Temperament'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card p-4 sm:p-5"
        >
          <div className="text-[11px] sm:text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            {c.label}
          </div>
          <div className="mt-1.5 font-display text-lg sm:text-xl md:text-2xl" style={{ color: 'var(--col-moonstone)' }}>
            {c.value}
          </div>
          <div className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            {c.note}
          </div>
        </motion.div>
      ))}
    </div>
  );
}