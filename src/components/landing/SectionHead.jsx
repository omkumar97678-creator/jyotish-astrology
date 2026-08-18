import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHead({ label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <div
        className="text-xs uppercase mb-4"
        style={{ color: 'var(--col-copper)', letterSpacing: '0.28em' }}
      >
        {label}
      </div>
      <h2
        className="font-display"
        style={{ fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--col-moonstone)' }}
      >
        {title}
      </h2>
    </motion.div>
  );
}