import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function Lucky({
  luckyNumbers = [1, 10, 19, 28],
  luckyColors = [
    { name: 'Gold / Amber', hex: '#D4AF37' },
    { name: 'Copper / Orange', hex: '#C8822A' },
    { name: 'Emerald', hex: '#10B981' },
  ],
}) {
  const { lang } = useLang();
  const numbers = luckyNumbers && luckyNumbers.length > 0 ? luckyNumbers : [1, 10, 19, 28];
  const colors = luckyColors && luckyColors.length > 0 ? luckyColors : [
    { name: 'Gold / Amber', hex: '#D4AF37' },
    { name: 'Copper / Orange', hex: '#C8822A' },
    { name: 'Emerald', hex: '#10B981' },
  ];

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card"
        style={{ padding: 26 }}
      >
        <h3 className="font-semibold mb-5" style={{ color: 'var(--col-moonstone)', fontSize: '1.1rem' }}>
          {lang === 'hinglish' ? 'Shubh Ank (Auspicious Numbers)' : 'Auspicious Numerology Numbers'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {numbers.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.08 }}
              className="font-mono-num flex items-center justify-center"
              style={{
                width: 58,
                height: 58,
                fontSize: '1.35rem',
                background: 'rgba(200,130,42,0.1)',
                border: '1px solid rgba(200,130,42,0.4)',
                borderRadius: 'var(--r-md)',
                color: 'var(--col-copper)',
              }}
            >
              {n}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-card"
        style={{ padding: 26 }}
      >
        <h3 className="font-semibold mb-5" style={{ color: 'var(--col-moonstone)', fontSize: '1.1rem' }}>
          {lang === 'hinglish' ? 'Shubh Rang (Harmonious Colors)' : 'Harmonious Vibration Colors'}
        </h3>
        <div className="flex flex-wrap gap-4">
          {colors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '9999px',
                  background: c.hex,
                  boxShadow: `0 0 14px ${c.hex}55`,
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'inline-block',
                }}
              />
              <span className="text-sm font-medium" style={{ color: 'var(--col-moonstone)' }}>
                {c.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}