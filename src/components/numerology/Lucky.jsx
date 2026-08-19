import React from 'react';
import { motion } from 'framer-motion';

export default function Lucky({
  luckyNumbers = [1, 10, 19, 28],
  luckyColors = [
    { name: 'Gold / Amber', hex: '#D4AF37' },
    { name: 'Copper / Orange', hex: '#C8822A' },
    { name: 'Emerald', hex: '#10B981' },
  ],
}) {
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
          Auspicious Numerology Numbers
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
          Harmonious Vibration Colors
        </h3>
        <div className="flex flex-wrap gap-5">
          {colors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2"
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--r-full)',
                  background: c.hex,
                  boxShadow: `0 0 18px ${c.hex}66`,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              />
              <span className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{c.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}