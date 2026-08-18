import React from 'react';
import { motion } from 'framer-motion';

const traits = ['Analytical', 'Intuitive', 'Independent', 'Spiritual', 'Creative', 'Visionary'];

export default function Traits() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <h2 className="font-display text-center mb-7" style={{ fontSize: 'clamp(26px, 4vw, 36px)', color: 'var(--col-moonstone)' }}>
        Your Core Traits
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {traits.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.12 }}
            className="glass-card px-5 py-2.5 text-sm"
            style={{
              borderRadius: 'var(--r-full)',
              border: '1px solid rgba(200,130,42,0.4)',
              color: 'var(--col-copper)',
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}