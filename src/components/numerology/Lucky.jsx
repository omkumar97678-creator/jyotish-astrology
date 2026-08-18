import React from 'react';
import { motion } from 'framer-motion';

const numbers = [3, 7, 21];
const colors = [
  { name: 'Purple', hex: '#7A5C9E' },
  { name: 'Silver', hex: '#C0C8D0' },
  { name: 'Green', hex: '#3FA86A' },
];

export default function Lucky() {
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
          Lucky Numbers
        </h3>
        <div className="flex gap-4">
          {numbers.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.1 }}
              className="font-mono-num flex items-center justify-center"
              style={{
                width: 64, height: 64, fontSize: '1.5rem',
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
          Lucky Colors
        </h3>
        <div className="flex gap-6">
          {colors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <span
                style={{
                  width: 44, height: 44, borderRadius: 'var(--r-full)',
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