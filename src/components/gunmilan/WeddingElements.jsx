import React from 'react';
import { motion } from 'framer-motion';

export default function WeddingElements() {
  const colors = [
    { name: 'Copper', dot: '#C8822A' },
    { name: 'Red', dot: '#EF4444' },
    { name: 'Gold', dot: '#EAB308' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div>
        <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
          Auspicious Wedding Elements
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          शुभ विवाह तत्व
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Card 1: Lucky Wedding Colors */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{ padding: 22 }}
        >
          <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            Lucky Wedding Colors
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium" style={{ color: 'var(--col-moonstone)' }}>
            {colors.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1.5">
                <span>{c.name}</span>
                <span style={{ color: c.dot, fontSize: '0.9rem' }}>●</span>
              </span>
            ))}
          </div>
          <div className="mt-2 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            Avoid: Black, Grey
          </div>
        </motion.div>

        {/* Card 2: Auspicious Wedding Dates */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
          style={{ padding: 22 }}
        >
          <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            Auspicious Wedding Dates
          </div>
          <div className="font-mono-num font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
            Nov–Dec 2025, Feb–Mar 2026
          </div>
          <div className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            Favorable Shukla Paksha alignments
          </div>
        </motion.div>

        {/* Card 3: Lucky Wedding Direction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card"
          style={{ padding: 22 }}
        >
          <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            Lucky Wedding Direction
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl" style={{ color: 'var(--col-copper)' }}>
              ↗
            </span>
            <span className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
              North-East (Ishaan)
            </span>
          </div>
          <div className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            Direction of spiritual prosperity and divine grace
          </div>
        </motion.div>

        {/* Card 4: Recommended Muhurat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card"
          style={{ padding: 22 }}
        >
          <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            Recommended Muhurat
          </div>
          <div className="font-medium text-base" style={{ color: 'var(--col-moonstone)' }}>
            Morning: 7:00 – 10:00 AM
          </div>
          <div className="mt-1 text-xs" style={{ color: '#F59E0B' }}>
            Avoid: Rahu Kaal period
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
