import React from 'react';
import { motion } from 'framer-motion';

function calcNameNumber(name) {
  // Pythagorean: A=1.. I=9 etc.
  const map = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8 };
  const sum = String(name || '').toLowerCase().replace(/[^a-z]/g, '').split('').reduce((a, c) => a + (map[c] || 0), 0);
  const reduce = (n) => (n <= 9 || [11, 22, 33].includes(n)) ? n : reduce(String(n).split('').reduce((a, d) => a + +d, 0));
  return reduce(sum || 3);
}

export default function NumerologyPanel({ data }) {
  const lifePath = (() => {
    if (data?.life_path_number) return data.life_path_number;
    if (data?.dob?.day !== undefined) {
      const { day, month, year } = data.dob;
      const reduce = (n) => (n <= 9 || [11, 22, 33].includes(n)) ? n : reduce(String(n).split('').reduce((a, d) => a + +d, 0));
      const d = +day || 0, m = +month || 0, y = +(year || 0);
      return reduce(d + m + y);
    }
    if (data?.date_of_birth) {
      const digits = String(data.date_of_birth).replace(/[^0-9]/g, '');
      let sum = digits.split('').reduce((a, d) => a + +d, 0);
      while (sum > 9 && ![11, 22, 33].includes(sum)) {
        sum = String(sum).split('').reduce((a, d) => a + +d, 0);
      }
      return sum || 7;
    }
    return 7;
  })();

  const destiny = data?.destiny_number || calcNameNumber(data?.name || '');

  const readings = {
    1: 'Natural leader, ambitious and self-driven.',
    2: 'Peacemaker, sensitive and cooperative.',
    3: 'Creative, expressive and optimistic.',
    4: 'Practical, disciplined and reliable.',
    5: 'Adventurous, adaptable and freedom-loving.',
    6: 'Nurturing, responsible and family-oriented.',
    7: 'Analytical, introspective and spiritual.',
    8: 'Ambitious, organized and success-focused.',
    9: 'Compassionate, humanitarian and wise.',
    11: 'Master intuitive, inspiring and visionary.',
    22: 'Master builder, capable of grand achievements.',
    33: 'Master teacher, devoted to uplifting others.',
  };

  const items = [
    { label: 'Life Path', value: lifePath, meaning: readings[lifePath] || 'A unique path of growth.' },
    { label: 'Destiny (Name)', value: destiny, meaning: readings[destiny] || 'A name-driven purpose.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24 }}
    >
      <div className="text-xs uppercase mb-5" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        Numerology
      </div>
      <div className="grid gap-4">
        {items.map((it) => (
          <div key={it.label} className="flex items-start gap-4">
            <div
              className="font-mono-num flex items-center justify-center"
              style={{
                width: 56,
                height: 56,
                flexShrink: 0,
                fontSize: '1.6rem',
                background: 'rgba(200,130,42,0.1)',
                border: '1px solid rgba(200,130,42,0.4)',
                borderRadius: 'var(--r-md)',
                color: 'var(--col-copper)',
              }}
            >
              {it.value}
            </div>
            <div>
              <div className="font-medium text-sm" style={{ color: 'var(--col-moonstone)' }}>{it.label}</div>
              <p className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                {it.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}