import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function SummaryCards({ data }) {
  const { lang } = useLang();

  const lagnaVal = data?.lagna || 'Scorpio (Vrishchik)';
  const rashiVal = data?.rashi || 'Gemini (Mithun)';
  const nakshatraVal = data?.nakshatra ? `${data.nakshatra} (Pada ${data?.nakshatraPada || 1})` : 'Ardra';
  const ganaVal = data?.gana || 'Manushya';
  const nakshatraLord = data?.nakshatraLord || 'Rahu';

  const cards = [
    {
      label: lang === 'hinglish' ? 'Lagna (लग्न)' : 'Lagna (Ascendant)',
      value: lagnaVal,
      note: lang === 'hinglish' ? 'Janam ke samay uday rashi' : 'Rising sign at birth',
    },
    {
      label: lang === 'hinglish' ? 'Chandra Rashi (चन्द्र राशि)' : 'Janma Rashi (Moon Sign)',
      value: rashiVal,
      note: lang === 'hinglish' ? 'Jahan Chandrama virajman hai' : 'Where the Moon sits',
    },
    {
      label: lang === 'hinglish' ? 'Nakshatra (नक्षत्र)' : 'Nakshatra (Birth Star)',
      value: nakshatraVal,
      note: lang === 'hinglish' ? `Swami (Lord): ${nakshatraLord}` : `Lord: ${nakshatraLord}`,
    },
    {
      label: lang === 'hinglish' ? 'Gana (गण)' : 'Gana (Temperament)',
      value: ganaVal,
      note: lang === 'hinglish' ? 'Swabhav & Pravritti' : 'Nature & Temperament',
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