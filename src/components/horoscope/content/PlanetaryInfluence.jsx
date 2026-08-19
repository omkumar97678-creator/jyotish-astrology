import React from 'react';
import { motion } from 'framer-motion';

export default function PlanetaryInfluence({ influences = [] }) {
  const list = influences && influences.length > 0 ? influences : [
    { sym: '☉', name: 'Sun', pos: 'Leo 14°', house: 'House 5', influence: 'Vitality & Core Will' },
    { sym: '☽', name: 'Moon', pos: 'Cancer 02°', house: 'House 4', influence: 'Intuition & Emotions' },
    { sym: '♃', name: 'Jupiter', pos: 'Taurus 27°', house: 'House 2', influence: 'Wisdom & Growth' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {list.map((p, i) => (
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
          <div className="text-xs font-mono-num" style={{ color: 'var(--col-copper)' }}>{p.pos} • {p.house}</div>
          <div className="mt-2.5 text-xs" style={{ color: 'var(--col-teal)', lineHeight: 1.5 }}>{p.influence}</div>
        </motion.div>
      ))}
    </div>
  );
}