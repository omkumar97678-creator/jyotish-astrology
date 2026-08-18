import React from 'react';
import { motion } from 'framer-motion';
import NorthIndianChart from './NorthIndianChart';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function ChartPanel() {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card flex flex-col items-center"
      style={{ padding: '28px 20px' }}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
            {t.north_chart_title[lang]}
          </h3>
          <span className="text-xs" style={{ color: 'var(--col-copper)' }}>
            {lang === 'hinglish' ? 'लग्न कुण्डली (डी-१)' : 'Lagna Chart (D-1)'}
          </span>
        </div>
        <span className="text-[11px] font-mono-num px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(200, 130, 42, 0.12)', color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.3)' }}>
          Rashi D1
        </span>
      </div>

      <NorthIndianChart />

      <p className="mt-4 text-xs text-center" style={{ color: 'var(--col-moonstone-dim)' }}>
        {lang === 'hinglish'
          ? 'Ghar number, rashi, grah aur jeevan kshetra dekhne ke liye kisi bhi ghar pe hover karein.'
          : 'Hover over any triangular house to inspect house number, zodiac sign, planets, and key life domains.'}
      </p>
    </motion.div>
  );
}