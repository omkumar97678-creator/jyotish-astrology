import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HoroAiInsights({ data }) {
  const { lang } = useLang();

  const signName = data?.sign?.name || 'Aries';
  const ruler = data?.sign?.ruler || 'Mars';
  const transitSummary = data?.planetaryTransitSummary || 'Planetary transits activate key life domains.';
  const mantra = data?.mantra || '“I act with righteous courage and purposeful clarity.”';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card relative"
      style={{ padding: 26, borderLeft: '4px solid var(--col-copper)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--col-copper)', fontSize: 20 }}>✦</span>
          <h3 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
            {t.ai_horoscope_title[lang]}
          </h3>
        </div>
        <span
          className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
          style={{
            color: 'var(--col-copper)',
            border: '1px solid rgba(200,130,42,0.35)',
            background: 'rgba(200,130,42,0.08)',
          }}
        >
          {lang === 'hinglish' ? 'वैदिक फलकथन' : 'Vedic Transit Synthesis'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs uppercase font-semibold mb-1.5" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
            {lang === 'hinglish' ? 'Grah Drishti & Prabhav' : 'Planetary Gochar Insight'}
          </div>
          <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
            {lang === 'hinglish'
              ? `${signName} ke liye swami grah ${ruler} ki sthiti shubh gochar prabhavit kar rahi hai. ${transitSummary} Aaj aatmavishwas aur santulit nirnay lene ke liye shreshtha din hai.`
              : `For ${signName}, ruling planet ${ruler} and current transits (${transitSummary}) empower key foundational growth. Focus on balanced action and positive momentum.`}
          </p>
        </div>

        <div className="h-[1px]" style={{ background: 'rgba(200, 130, 42, 0.15)' }} />

        <div>
          <div className="text-xs uppercase font-semibold mb-1.5" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
            {lang === 'hinglish' ? 'Aaj ka Vedic Mantra' : "Today's Vedic Mantra"}
          </div>
          <p className="text-xs italic" style={{ color: 'var(--col-moonstone)', lineHeight: 1.7 }}>
            {mantra}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
