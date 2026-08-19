import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function SadeSati({ sadeSati, rashi }) {
  const { lang } = useLang();

  const s = sadeSati || {
    active: false,
    phase: 'Not Active',
    desc: "Your Moon sign is currently not undergoing Saturn's 7.5 year transit.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 28, borderLeft: '3px solid var(--col-copper)' }}
    >
      <div className="text-xs uppercase mb-5" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        {t.sade_sati_title[lang]}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
        <div className="flex sm:flex-col items-center gap-4 sm:pr-6 sm:border-r" style={{ borderColor: 'var(--col-glass-border)' }}>
          <div style={{ fontSize: 48, color: 'var(--col-copper)', lineHeight: 1 }}>♄</div>
          <span
            className="text-xs px-3 py-1.5 font-medium whitespace-nowrap"
            style={{
              color: s.active ? '#F59E0B' : 'var(--col-teal)',
              background: s.active ? 'rgba(245,158,11,0.1)' : 'rgba(42,171,168,0.1)',
              border: `1px solid ${s.active ? 'rgba(245,158,11,0.35)' : 'rgba(42,171,168,0.35)'}`,
              borderRadius: 'var(--r-full)',
            }}
          >
            {s.active ? (lang === 'hinglish' ? `सक्रिय (${s.phase})` : `Active (${s.phase})`) : (lang === 'hinglish' ? 'सक्रिय नहीं (Not Active)' : 'Not Active')}
          </span>
        </div>

        <div className="flex-1">
          <p style={{ color: 'var(--col-moonstone)', fontSize: '1rem', lineHeight: 1.6 }}>
            {s.desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <span style={{ color: 'var(--col-moonstone-dim)' }}>
              {lang === 'hinglish' ? 'चन्द्र राशि: ' : 'Natal Moon Sign: '}
              <span style={{ color: 'var(--col-copper)' }}>{rashi || 'Cancer'}</span>
            </span>
            <span style={{ color: 'var(--col-moonstone-dim)' }}>
              {lang === 'hinglish' ? 'वर्तमान शनि गोचर: ' : 'Current Saturn Transit: '}
              <span style={{ color: 'var(--col-copper)' }}>Aquarius (कुंभ)</span>
            </span>
          </div>
        </div>
      </div>

      <p className="mt-5 pt-4 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6, borderTop: '1px solid var(--col-glass-border)' }}>
        {lang === 'hinglish'
          ? 'साढ़े साती तब होती है जब शनि आपकी चन्द्र राशि से 12वें, 1ले और 2रे भाव में गोचर करता है।'
          : 'Sade Sati occurs when Saturn transits through the 12th, 1st, and 2nd houses relative to your natal Moon sign.'}
      </p>
    </motion.div>
  );
}