import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

export default function LifePathHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="glass-card mt-10 text-center"
      style={{ padding: '48px 28px' }}
    >
      <div className="text-xs uppercase mb-4" style={{ color: 'var(--col-copper)', letterSpacing: '0.24em' }}>
        Life Path Number
      </div>
      <AnimatedNumber
        value={7}
        duration={1600}
        className="font-mono-num text-copper-gradient leading-none"
        style={{ fontSize: 'clamp(96px, 18vw, 140px)' }}
      />
      <div className="mt-4 font-display" style={{ fontSize: '1.5rem', color: 'var(--col-moonstone)' }}>
        The Seeker of Truth
      </div>
    </motion.div>
  );
}