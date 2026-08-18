import React from 'react';
import { motion } from 'framer-motion';
import { signs, famousPersonalities } from '../horoData';

export default function NotablePersonalities({ selected }) {
  const s = signs[selected] || signs[0];
  const list = (famousPersonalities && famousPersonalities[s.en]) || (famousPersonalities && famousPersonalities.Aries) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 22 }}
    >
      <div className="text-xs uppercase mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        Notable {s.en} Personalities
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {list.map((name) => (
          <span
            key={name}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--col-moonstone)',
              border: '1px solid var(--col-glass-border)',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
