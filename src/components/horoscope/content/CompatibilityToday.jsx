import React from 'react';
import { motion } from 'framer-motion';
import { signs, compatibilityData, compatibility } from '../horoData';

const signSymbols = {
  Aries: '♈︎', Taurus: '♉︎', Gemini: '♊︎', Cancer: '♋︎',
  Leo: '♌︎', Virgo: '♍︎', Libra: '♎︎', Scorpio: '♏︎',
  Sagittarius: '♐︎', Capricorn: '♑︎', Aquarius: '♒︎', Pisces: '♓︎',
};

function formatSignItem(item) {
  if (!item) return { sym: '✦', name: '' };
  if (typeof item === 'object' && item.name) {
    return item;
  }
  const str = String(item);
  const baseName = str.split(' ')[0];
  const sym = signSymbols[baseName] || '✦';
  return { sym, name: str };
}

export default function CompatibilityToday({ selected }) {
  const s = signs[selected] || signs[0] || { en: 'Aries', name: 'Aries' };
  const signKey = s.en || s.name || 'Aries';
  const compSource = compatibilityData || compatibility || {};
  const comp = compSource[signKey] || compSource.Aries || {};

  const bestList = (comp.best || comp.most || ['Leo (Simha)', 'Sagittarius (Dhanu)', 'Gemini (Mithun)']).map(formatSignItem);
  const challengingList = (comp.challenging || comp.caution || ['Cancer (Kark)', 'Capricorn (Makar)']).map(formatSignItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24 }}
    >
      <div className="mb-4">
        <h3 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
          Sign Compatibility Today
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
          Best and challenging signs for {signKey} today
        </p>
      </div>

      <div className="space-y-3">
        {/* Best Match Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(42, 171, 168, 0.08)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--col-teal)' }}>
            Most Compatible Today
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {bestList.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }}
              >
                <span>{item.sym}</span> {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Challenging Match Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#F59E0B' }}>
            Handle with Care
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {challengingList.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.3)' }}
              >
                <span>{item.sym}</span> {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
