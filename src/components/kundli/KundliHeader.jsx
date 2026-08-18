import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function KundliHeader({ data }) {
  const { lang } = useLang();
  const timeLabel = data.unknownTime
    ? (lang === 'hinglish' ? 'Sunrise Chart (Surya Uday)' : 'Sunrise Chart')
    : `${data.time.hour}:${data.time.minute || '00'} ${data.time.period}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <Link to="/" className="font-display text-lg" style={{ color: 'var(--col-copper)' }}>
        ✦ ज्योतिष
      </Link>
      <h1 className="font-display mt-4" style={{ fontSize: 'clamp(32px, 6vw, 52px)', color: 'var(--col-moonstone)' }}>
        {data.name}'s {t.kundli_subtitle[lang]}
      </h1>
      <div className="font-display mt-2" style={{ fontSize: '0.9rem', color: 'var(--col-copper)', opacity: 0.7 }}>
        {lang === 'hinglish' ? 'जन्म कुंडली — वैदिक ज्योतिष' : 'Vedic Birth Chart'}
      </div>
      <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
        {data.dob.day}.{data.dob.month}.{data.dob.year} • {timeLabel} • {data.birthPlace}
      </p>
    </motion.div>
  );
}