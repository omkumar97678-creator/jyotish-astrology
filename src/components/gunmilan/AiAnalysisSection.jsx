import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function AiAnalysisSection({ aiAnalysis, calculatedData }) {
  const { lang } = useLang();

  const totalScore = calculatedData?.totalScore ?? 28;
  const label = calculatedData?.label || 'Good Match';

  const verdictText =
    aiAnalysis?.verdict ||
    `With ${totalScore} out of 36 gunas matched (${label}), this union possesses solid foundational compatibility. The planetary temperaments and birth stars support harmonious domestic stability, mutual respect, and fruitful shared aspirations.`;

  const strengthsText =
    aiAnalysis?.strengths ||
    `High mutual attraction and intellectual synchronization. The ${calculatedData?.rashi1 || 'First'} and ${calculatedData?.rashi2 || 'Second'} sign combination encourages emotional empathy, family harmony, and collective prosperity.`;

  const challengesText =
    aiAnalysis?.challenges ||
    aiAnalysis?.areasToNurture ||
    `Nurture open communication during periods of stress. Honoring each other's individual independence and decision-making styles will fortify long-term emotional trust.`;

  const timingText =
    aiAnalysis?.auspiciousTiming ||
    `Planetary transits of Jupiter (Guru) over the coming 12–18 months create highly auspicious and blessed windows for marital commitment and new auspicious beginnings.`;

  const sections = [
    {
      title: '✦ Overall Verdict',
      body: verdictText,
      accent: 'var(--col-copper)',
    },
    {
      title: '♡ Relationship Strengths',
      body: strengthsText,
      accent: 'var(--col-teal)',
    },
    {
      title: '⚠ Areas to Nurture',
      body: challengesText,
      accent: '#F59E0B',
    },
    {
      title: '✦ Auspicious Time to Marry',
      body: timingText,
      accent: 'var(--col-copper-light)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card relative"
      style={{ padding: 28, borderLeft: '3px solid var(--col-copper)' }}
    >
      <span
        className="absolute top-5 right-5 text-xs px-3 py-1 font-medium"
        style={{
          color: 'var(--col-copper)',
          border: '1px solid rgba(200,130,42,0.35)',
          borderRadius: '9999px',
          background: 'rgba(200,130,42,0.08)',
        }}
      >
        {lang === 'hinglish' ? 'वैदिक मूल्यांकन' : 'Vedic Evaluation'}
      </span>

      <div className="flex items-center gap-2 mb-6">
        <span style={{ color: 'var(--col-copper)', fontSize: 22 }}>✦</span>
        <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
          Detailed Compatibility Insights
        </h3>
      </div>

      <div className="space-y-6">
        {sections.map((sec, i) => (
          <div
            key={sec.title}
            className={i !== 0 ? 'pt-5 border-t border-[rgba(200,130,42,0.18)]' : ''}
          >
            <h4 className="font-semibold text-sm mb-2" style={{ color: sec.accent }}>
              {sec.title}
            </h4>
            <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
              {sec.body}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
