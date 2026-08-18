import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HoroHeader() {
  const { lang } = useLang();
  const today = new Date().toLocaleDateString(lang === 'hinglish' ? 'hi-IN' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
      <Link to="/" className="inline-flex items-center gap-2 text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)' }}>
        <ArrowLeft size={16} /> {lang === 'hinglish' ? '← Home Wapas Jao' : 'Back to Home'}
      </Link>
      <Link to="/" className="font-display text-lg block" style={{ color: 'var(--col-copper)' }}>
        ✦ ज्योतिष
      </Link>
      <h1 className="font-display mt-4" style={{ fontSize: 'clamp(32px, 6vw, 52px)', color: 'var(--col-moonstone)' }}>
        {t.horoscope_title[lang]}
      </h1>
      <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>{today}</p>
    </motion.div>
  );
}