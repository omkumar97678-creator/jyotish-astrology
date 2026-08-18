import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

const cards = [
  {
    label: 'Destiny Number',
    value: 3,
    desc: 'You are naturally expressive and creative. Your purpose unfolds through communication, art, and inspiring others with your ideas.',
    how: 'Sum of all letters in your full birth name',
  },
  {
    label: 'Soul Urge Number',
    value: 9,
    desc: 'Deep within, you are compassionate and humanitarian. You long to serve, heal, and bring wisdom to the world around you.',
    how: 'Sum of the vowels in your name',
  },
  {
    label: 'Personal Year Number',
    value: 5,
    desc: 'This year brings change, travel, and freedom. New opportunities invite you to embrace adventure and let go of the old.',
    how: 'Birth day + month + current year',
  },
];

export default function NumCards() {
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