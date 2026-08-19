import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function NumInsights({ numData }) {
  const { lang } = useLang();

  const insight = numData?.insight || 'Your cosmic numbers reveal a powerful path of wisdom, visionary purpose, and personal growth.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card mt-6 relative"
      style={{ padding: 28, borderLeft: '3px solid var(--col-copper)' }}
    >
      <span
        className="absolute top-4 right-4 text-xs px-3 py-1 font-medium"
        style={{
          color: 'var(--col-copper)',
          border: '1px solid rgba(200,130,42,0.35)',
          borderRadius: 'var(--r-full)',
          background: 'rgba(200,130,42,0.08)',
        }}
      >
        {lang === 'hinglish' ? 'वैदिक अंक गणना' : 'Vedic Calculation'}
      </span>
      <div className="flex items-center gap-2 mb-5">
        <span style={{ color: 'var(--col-copper)', fontSize: 22 }}>✦</span>
        <span className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
          {lang === 'hinglish' ? 'अंक ज्योतिष सम्पूर्ण विश्लेषण' : 'Comprehensive Numerology Insights'}
        </span>
      </div>
      <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
        {insight}
      </p>
    </motion.div>
  );
}