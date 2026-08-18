import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

const START = 2019;
const END = 2038;
const NOW = new Date().getFullYear();
const progress = Math.min(100, Math.max(0, ((NOW - START) / (END - START)) * 100));

export default function Mahadasha() {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 28 }}
    >
      <div className="text-xs uppercase mb-5" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        {t.dasha_title[lang]}
      </div>

      <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--col-copper)' }}>
        {lang === 'hinglish' ? 'Shani Mahadasha (शनि महादशा)' : 'Saturn Mahadasha'}
      </div>
      <div className="mt-1 font-mono-num" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.95rem' }}>
        {START} – {END}
      </div>
      <div className="mt-2 text-sm" style={{ color: 'var(--col-moonstone)' }}>
        Antardasha: <span style={{ color: 'var(--col-copper)' }}>Saturn — Mercury</span>
      </div>
      <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
        {lang === 'hinglish'
          ? 'Anushasan, mehnat aur karmic sikhne ka samay.'
          : 'Period of discipline, hard work and karmic lessons.'}
      </p>

      <div className="mt-5">
        <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--col-moonstone-dim)' }}>
          <span>{START}</span>
          <span className="font-mono-num" style={{ color: 'var(--col-copper)' }}>{Math.round(progress)}%</span>
          <span>{END}</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--col-copper), var(--col-copper-light))',
              borderRadius: 'var(--r-full)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}