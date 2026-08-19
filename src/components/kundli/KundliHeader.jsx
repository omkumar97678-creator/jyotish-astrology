import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function KundliHeader({ data }) {
  const { lang } = useLang();

  // Safe extraction of time
  let timeLabel = '';
  if (data?.unknownTime || data?.time_unknown) {
    timeLabel = lang === 'hinglish' ? 'Sunrise Chart (Surya Uday)' : 'Sunrise Chart';
  } else if (data?.time?.hour !== undefined) {
    timeLabel = `${data.time.hour}:${data.time.minute || '00'} ${data.time.period || 'AM'}`;
  } else if (data?.time_of_birth) {
    timeLabel = data.time_of_birth;
  } else {
    timeLabel = '12:00 PM';
  }

  // Safe extraction of dob
  let dobString = '';
  if (data?.dob?.day !== undefined) {
    dobString = `${data.dob.day}.${data.dob.month}.${data.dob.year}`;
  } else if (data?.date_of_birth) {
    dobString = data.date_of_birth;
  } else {
    dobString = '01.01.2000';
  }

  const name = data?.name || 'Seeker';
  const birthPlace = data?.birthPlace || data?.birth_place || 'New Delhi, India';

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
        {name}'s {t.kundli_subtitle[lang]}
      </h1>
      <div className="font-display mt-2" style={{ fontSize: '0.9rem', color: 'var(--col-copper)', opacity: 0.7 }}>
        {lang === 'hinglish' ? 'जन्म कुंडली — वैदिक ज्योतिष' : 'Vedic Birth Chart'}
      </div>
      <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
        {dobString} • {timeLabel} • {birthPlace}
      </p>
    </motion.div>
  );
}