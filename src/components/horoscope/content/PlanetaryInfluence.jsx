import React from 'react';
import { motion } from 'framer-motion';
import { planets } from '../horoData';

export default function PlanetaryInfluence() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {planets.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card text-center"
          style={{ padding: 22 }}
        >
          <div style={{ fontSize: 34, color: 'var(--col-copper)' }}>{p.sym}</div>
          <div className="mt-2 font-medium" style={{ color: 'var(--col-moonstone)' }}>{p.name}</div>
          <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{p.pos}</div>
          <div className="mt-3 text-sm" style={{ color: 'var(--col-teal)' }}>{p.influence}</div>
        </motion.div>
      ))}
    </div>
  );
}