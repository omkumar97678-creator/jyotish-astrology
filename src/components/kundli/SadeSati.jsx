import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function SadeSati() {
  const { lang } = useLang();

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
            className="text-xs px-3 py-1.5"
            style={{
              color: 'var(--col-teal)',
              background: 'rgba(42,171,168,0.1)',
              border: '1px solid rgba(42,171,168,0.35)',
              borderRadius: 'var(--r-full)',
            }}
          >
            {lang === 'hinglish' ? 'Sakriya Nahi (Not Active)' : 'Not Active'}
          </span>
        </div>

        <div className="flex-1">
          <p style={{ color: 'var(--col-moonstone)', fontSize: '1rem', lineHeight: 1.6 }}>
            {lang === 'hinglish'
              ? 'Aapki Chandra Rashi (Kark/Cancer) abhi Shani ke 7.5 saal ke prabhav se surakshit hai.'
              : "Your Moon sign (Cancer/Karka) is currently safe from Saturn's 7.5 year transit."}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <span style={{ color: 'var(--col-moonstone-dim)' }}>
              {lang === 'hinglish' ? 'Agli Sade Sati: ' : 'Next Sade Sati: '}
              <span style={{ color: 'var(--col-copper)' }}>{lang === 'hinglish' ? 'Lagbhag 2032 mein' : 'Expected around 2032'}</span>
            </span>
            <span style={{ color: 'var(--col-moonstone-dim)' }}>
              {lang === 'hinglish' ? 'Pichli Sade Sati: ' : 'Last Sade Sati: '}
              <span style={{ color: 'var(--col-copper)' }}>2002 – 2009</span>
            </span>
          </div>
        </div>
      </div>

      <p className="mt-5 pt-4 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6, borderTop: '1px solid var(--col-glass-border)' }}>
        {lang === 'hinglish'
          ? 'Sade Sati tab hoti hai jab Shani aapki Chandra Rashi se pehle, usme aur baad ke rashi mein gochar karta hai.'
          : 'Sade Sati occurs when Saturn transits through the sign before, of, and after your Moon sign.'}
      </p>
    </motion.div>
  );
}