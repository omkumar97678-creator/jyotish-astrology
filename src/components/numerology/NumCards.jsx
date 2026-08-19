import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

export default function NumCards({ numData }) {
  const cards = [
    {
      label: 'Destiny Number (नामांक)',
      value: numData?.destinyNumber || 3,
      desc: numData?.destinyDesc || 'Your purpose unfolds through communication, inspiring others, and expressive creative leadership.',
      how: 'Calculated from all letters in your name',
    },
    {
      label: 'Soul Urge Number (आत्म कारक)',
      value: numData?.soulUrgeNumber || 9,
      desc: numData?.soulUrgeDesc || 'Deep within, your soul seeks compassionate service, wisdom, harmony, and spiritual connection.',
      how: 'Calculated from vowels in your name',
    },
    {
      label: 'Personal Year Number (वार्षिक अंक)',
      value: numData?.personalYearNumber || 5,
      desc: numData?.personalYearDesc || 'This annual cycle brings dynamic growth, fresh horizons, and progressive change.',
      how: 'Calculated from Birth day + Month + Current year',
    },
  ];

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -5, borderColor: 'rgba(200,130,42,0.35)' }}
          className="glass-card"
          style={{ padding: 28 }}
        >
          <AnimatedNumber
            value={c.value}
            className="font-mono-num text-copper-gradient leading-none"
            style={{ fontSize: 64 }}
          />
          <h3 className="mt-3 font-semibold" style={{ fontSize: '1.15rem', color: 'var(--col-moonstone)' }}>
            {c.label}
          </h3>
          <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.65 }}>
            {c.desc}
          </p>
          <div className="mt-5 text-xs" style={{ color: 'rgba(232,228,220,0.35)' }}>
            How calculated: {c.how}
          </div>
        </motion.div>
      ))}
    </div>
  );
}