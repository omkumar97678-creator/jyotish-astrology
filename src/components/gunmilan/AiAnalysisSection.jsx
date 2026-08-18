import React from 'react';
import { motion } from 'framer-motion';

export default function AiAnalysisSection() {
  const sections = [
    {
      title: '✦ Overall Verdict',
      body: 'With 28 out of 36 gunas matched, this is a good and harmonious pairing. Bhakoot and Gana align strongly, indicating emotional and temperamental balance. Since Person 2 is Manglik, a Mars remedy is advisable before marriage to neutralize any intensity. Overall, this match supports a stable, affectionate, and long-lasting relationship.',
      accent: 'var(--col-copper)',
    },
    {
      title: '♡ Relationship Strengths',
      body: 'Strong intellectual bond. Emotional balance between partners. Bhakoot alignment suggests long-term stability and constructive family growth.',
      accent: 'var(--col-teal)',
    },
    {
      title: '⚠ Areas to Nurture',
      body: 'Nadi score (4/8) suggests attention to health matters. Plan regular health check-ups together and maintain open dialogue during stressful times.',
      accent: '#F59E0B',
    },
    {
      title: '✦ Auspicious Time to Marry',
      body: '2025-2026 is a favorable period. Jupiter transiting 7th house brings blessings for marriage and auspicious partnership milestones.',
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
        AI Analysis
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
