import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Mahadasha({ currentDasha, dashas, mahadasha, nakshatra }) {
  const { lang } = useLang();

  const active =
    currentDasha ||
    (dashas && Array.isArray(dashas) && dashas.find((d) => d.isCurrent)) ||
    mahadasha?.activeDasha ||
    {};

  const lord = active.lord || active.planet || mahadasha?.currentLord || 'Jupiter';
  const start = active.start || active.startYear || mahadasha?.startYear || 2018;
  const end = active.end || active.endYear || mahadasha?.endYear || 2034;
  const now = new Date().getFullYear();
  const progress = Math.min(100, Math.max(5, ((now - start) / Math.max(1, end - start)) * 100));

  const hindiLords = {
    Sun: 'Surya (सूर्य)',
    Moon: 'Chandra (चंद्र)',
    Mars: 'Mangal (मंगल)',
    Mercury: 'Budha (बुध)',
    Jupiter: 'Guru (गुरु)',
    Venus: 'Shukra (शुक्र)',
    Saturn: 'Shani (शनि)',
    Rahu: 'Rahu (राहु)',
    Ketu: 'Ketu (केतु)',
  };

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
        {lang === 'hinglish' ? `${hindiLords[lord] || lord} Mahadasha` : `${lord} Mahadasha`}
      </div>
      <div className="mt-1 font-mono-num" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.95rem' }}>
        {start} – {end}
      </div>
      <div className="mt-2 text-sm" style={{ color: 'var(--col-moonstone)' }}>
        Birth Nakshatra: <span style={{ color: 'var(--col-copper)' }}>{nakshatra || 'Ardra'}</span>
      </div>
      <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
        {lang === 'hinglish'
          ? 'Vimshottari dasha ke anusaar prabhavi graha kaal aur unki shakti ka samay.'
          : 'Vimshottari planetary period influencing major life events, focus, and transformation.'}
      </p>

      <div className="mt-5">
        <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--col-moonstone-dim)' }}>
          <span>{start}</span>
          <span className="font-mono-num" style={{ color: 'var(--col-copper)' }}>{Math.round(progress)}%</span>
          <span>{end}</span>
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