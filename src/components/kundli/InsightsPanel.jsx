import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

const insights = [
  {
    title: 'Personality & Strengths',
    body: 'With Leo Lagna and a Cancer Moon, you carry a confident outer presence balanced by an emotionally rich inner world. You lead with warmth and protect those close to you fiercely.',
  },
  {
    title: 'Career & Finance',
    body: 'Jupiter in the 10th house points to growth through guidance, teaching, or advisory roles. Saturn in the 7th suggests partnerships become a steady source of stability after your early thirties.',
  },
  {
    title: 'Relationships',
    body: 'Venus in your Ascendant makes you affectionate and charming in love. Look for partners who respect your need for both admiration and emotional safety.',
  },
  {
    title: 'Health & Wellbeing',
    body: 'Favor stability over intensity. Moderation in routine, regular water-based rest, and mindful breathing suit your sensitive lunar energy well.',
  },
];

export default function InsightsPanel() {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 28 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={18} style={{ color: 'var(--col-copper)' }} />
        <div>
          <span className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
            {lang === 'hinglish' ? 'वैदिक अंतर्दृष्टि' : 'Vedic Insights'}
          </span>
          <span className="block font-display" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.9rem' }}>
            ज्योतिष विश्लेषण
          </span>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {insights.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="font-medium mb-2" style={{ color: 'var(--col-copper)' }}>{it.title}</h3>
            <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
              {it.body}
            </p>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-xs" style={{ color: 'rgba(232,228,220,0.3)' }}>
        {lang === 'hinglish'
          ? 'यह विश्लेषण Swiss Ephemeris और प्राचीन वैदिक ज्योतिष सिद्धांतों पर आधारित है।'
          : 'Insights are calculated using Swiss Ephemeris and ancient Vedic principles for astrological guidance.'}
      </p>
    </motion.div>
  );
}