import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function VoiceHeader() {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start justify-between gap-4"
    >
      <div>
        <Link to="/kundli" className="inline-flex items-center gap-2 text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)' }}>
          <ArrowLeft size={16} /> {lang === 'hinglish' ? '← कुंडली पर वापस' : '← Back to Kundli'}
        </Link>
        <h1 className="font-display" style={{ fontSize: 'clamp(30px, 5vw, 46px)', color: 'var(--col-moonstone)' }}>
          {lang === 'hinglish' ? 'स्वर ज्योतिष (Voice)' : 'Voice Astrology'}
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
          {lang === 'hinglish' ? 'अपनी कुंडली या भविष्य के बारे में कोई भी प्रश्न पूछें' : 'Ask anything about your kundli and destiny'}
        </p>
      </div>
      <div
        className="text-xs px-3 py-1.5 whitespace-nowrap font-medium"
        style={{
          color: 'var(--col-teal)',
          background: 'var(--col-glass)',
          border: '1px solid rgba(42,171,168,0.35)',
          borderRadius: 'var(--r-full)',
        }}
      >
        ✦ {lang === 'hinglish' ? 'ज्योतिष परामर्श' : 'Jyotish Voice Consultation'}
      </div>
    </motion.div>
  );
}