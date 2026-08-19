import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

export default function LifePathHero({ numData }) {
  const number = numData?.lifePathNumber || 7;
  const title = numData?.title || 'The Seeker of Truth (केतु - Ketu)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="glass-card mt-10 text-center"
      style={{ padding: '48px 28px' }}
    >
      <div className="text-xs uppercase mb-4" style={{ color: 'var(--col-copper)', letterSpacing: '0.24em' }}>
        Life Path Number (भाग्यांक / मूलांक)
      </div>
      <AnimatedNumber
        value={number}
        duration={1400}
        className="font-mono-num text-copper-gradient leading-none"
        style={{ fontSize: 'clamp(96px, 18vw, 140px)' }}
      />
      <div className="mt-4 font-display" style={{ fontSize: '1.5rem', color: 'var(--col-moonstone)' }}>
        {title}
      </div>
      <p className="mt-2 text-sm max-w-xl mx-auto" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
        {numData?.desc}
      </p>
    </motion.div>
  );
}