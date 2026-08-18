import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function PanchangToday() {
  const { lang } = useLang();

  const items = [
    { label: lang === 'hinglish' ? 'Tithi (तिथि)' : 'Tithi', val: 'Tritiya (3rd)', isAuspicious: false },
    { label: lang === 'hinglish' ? 'Nakshatra (नक्षत्र)' : 'Nakshatra', val: 'Rohini', isAuspicious: false },
    { label: lang === 'hinglish' ? 'Yoga (योग)' : 'Yoga', val: 'Siddha Yoga ✦', isAuspicious: true },
    { label: lang === 'hinglish' ? 'Karan (करण)' : 'Karana', val: 'Bava', isAuspicious: false },
    { label: lang === 'hinglish' ? 'Rahu Kaal (राहु काल)' : 'Rahu Kaal', val: '4:30 – 6:00 PM', isWarning: true },
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
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
            {t.panchang_today[lang]}
          </h3>
          <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
            {lang === 'hinglish' ? 'दैनिक पंचांग — आज की गणना' : 'Daily Panchang'}
          </p>
        </div>
        <span className="text-xs font-mono-num" style={{ color: 'var(--col-moonstone-dim)' }}>
          Vedic Calendar
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        {items.map((it) => (
          <div
            key={it.label}
            className="p-3 rounded-lg flex flex-col justify-between"
            style={{
              background: it.isWarning
                ? 'rgba(245, 158, 11, 0.08)'
                : 'rgba(255, 255, 255, 0.03)',
              border: it.isWarning
                ? '1px solid rgba(245, 158, 11, 0.3)'
                : '1px solid var(--col-glass-border)',
            }}
          >
            <span className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--col-moonstone-dim)' }}>
              {it.label}
            </span>
            <span
              className="mt-1.5 font-medium text-sm"
              style={{
                color: it.isWarning
                  ? '#F59E0B'
                  : it.isAuspicious
                  ? 'var(--col-teal)'
                  : 'var(--col-moonstone)',
              }}
            >
              {it.val}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
