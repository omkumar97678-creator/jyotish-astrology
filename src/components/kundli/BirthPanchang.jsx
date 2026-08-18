import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function BirthPanchang() {
  const { lang } = useLang();

  const cards = [
    { label: lang === 'hinglish' ? 'Tithi (तिथि)' : 'Tithi (Lunar Day)', value: 'Dwadashi', sub: '12th' },
    { label: lang === 'hinglish' ? 'Vaar (वार)' : 'Vara (Weekday)', value: lang === 'hinglish' ? 'Somvar (Monday)' : 'Monday (Somvar)' },
    { label: lang === 'hinglish' ? 'Nitya Yoga (योग)' : 'Nitya Yoga', value: 'Shiva Yoga', sub: lang === 'hinglish' ? 'Shubh sanyog' : 'Auspicious combination' },
    { label: lang === 'hinglish' ? 'Karan (करण)' : 'Karana', value: 'Bava' },
    { label: lang === 'hinglish' ? 'Paksha (पक्ष)' : 'Paksha', value: 'Shukla Paksha', sub: lang === 'hinglish' ? 'Shukla Paksha' : 'Waxing Moon phase' },
    { label: lang === 'hinglish' ? 'Janam ke samay Surya Uday' : 'Sunrise at Birth', value: '06:42 AM' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-xs uppercase mb-1" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        {t.panchang_title[lang]}
      </div>
      <div className="font-display mb-5" style={{ color: 'var(--col-moonstone)', fontSize: '1.5rem' }}>
        पंचांग
        <span className="font-body block mt-1" style={{ fontSize: '0.85rem', color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
          {lang === 'hinglish' ? 'Aapke janam ke samay ka kalyankari panchang' : 'Cosmic almanac at the moment of your birth'}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card"
            style={{ padding: 18 }}
          >
            <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em', fontSize: '0.72rem' }}>
              {c.label}
            </div>
            <div className="mt-2 font-mono-num" style={{ color: 'var(--col-moonstone)', fontSize: '1.15rem' }}>
              {c.value}
            </div>
            {c.sub && (
              <div className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{c.sub}</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}