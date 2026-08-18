import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HoroAiInsights() {
  const { lang } = useLang();

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
          {lang === 'hinglish' ? 'AI Vishleshan' : 'AI Generated'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs uppercase font-semibold mb-1.5" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
            {lang === 'hinglish' ? 'Grah Drishti & Prabhav' : 'Planetary Insight'}
          </div>
          <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
            {lang === 'hinglish'
              ? 'Surya aapke pratham ghar ko urja de raha hai aur Chandrama shubh Tula rashi mein hai. Aaj vyaktigat vikas aur santulit rishton ke liye anukool avsar hain. Swami grah Mangal aapko aage badhne ki shakti de raha hai.'
              : 'With Sun energizing your first house and Moon in harmonious Libra, today holds significant potential for both personal expression and balanced relationships. Mars, your ruling planet, provides the drive — use it wisely.'}
          </p>
        </div>

        <div className="h-[1px]" style={{ background: 'rgba(200, 130, 42, 0.15)' }} />

        <div>
          <div className="text-xs uppercase font-semibold mb-1.5" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
            {lang === 'hinglish' ? 'Aaj ka Mantra' : "Today's Mantra"}
          </div>
          <p className="text-xs italic" style={{ color: 'var(--col-moonstone)', lineHeight: 1.7 }}>
            {lang === 'hinglish'
              ? '“Sahas bhay ki anupsthiti nahi, balki yeh nirnay hai ki kuch aur isse zyada mahatvapurna hai.”'
              : '“Courage is not the absence of fear, but the decision that something else is more important.”'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
