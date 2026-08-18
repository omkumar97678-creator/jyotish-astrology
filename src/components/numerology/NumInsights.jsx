import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function NumInsights() {
  const { lang } = useLang();

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
          {lang === 'hinglish' ? 'अंक ज्योतिष विश्लेषण' : 'Numerology Insights'}
        </span>
      </div>
      <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
        {lang === 'hinglish'
          ? 'Life Path 7 ke roop mein, aap satya aur gyan ke khoji hain. Aapka analytical dimaag gehri aatmik aur intuitive shakti se juda hua hai, jo aapko darshan, shodh aur aatmik khoj ki taraf aakarshit karta hai. Is personal year (5) mein naye anubhav aur yatraayein aapke gyan ko aur vishal banayengi.'
          : 'As a Life Path 7, you are a seeker of truth and wisdom. Your analytical mind pairs with a deep intuitive gift, drawing you toward philosophy, research, and spiritual exploration. You value solitude as a space to recharge and reflect, yet your insights often guide others more than you realize. This personal year (5) invites change and adventure — lean into new experiences, as they will expand the very understanding you naturally seek.'}
      </p>
    </motion.div>
  );
}