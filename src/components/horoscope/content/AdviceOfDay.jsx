import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function AdviceOfDay({ advice }) {
  const { lang } = useLang();

  const text = advice || 'Trust the natural pacing of events today. When in doubt, let clarity catch up with action.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24, borderLeft: '3px solid var(--col-copper)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: 'var(--col-copper)', fontSize: 18 }}>✦</span>
        <span className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'var(--col-copper)' }}>
          {t.advice_of_day[lang]}
        </span>
      </div>
      <p className="text-sm italic" style={{ color: 'var(--col-moonstone)', lineHeight: 1.7 }}>
        “{text}”
      </p>
    </motion.div>
  );
}