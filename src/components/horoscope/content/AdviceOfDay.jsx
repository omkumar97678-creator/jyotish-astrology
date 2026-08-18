import React from 'react';
import { motion } from 'framer-motion';
import { advice } from '../horoData';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function AdviceOfDay() {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 28, borderLeft: '3px solid var(--col-copper)' }}
    >
      <div className="flex items-start gap-3">
        <span style={{ color: 'var(--col-copper)', fontSize: 24 }}>✦</span>
        <div>
          <div className="text-xs uppercase mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
            {t.advice_title[lang]}
          </div>
          <p className="text-sm italic" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8, maxWidth: 560 }}>
            “{advice}”
          </p>
        </div>
      </div>
    </motion.div>
  );
}