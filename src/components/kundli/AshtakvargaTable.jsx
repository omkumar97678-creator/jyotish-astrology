import React from 'react';
import { motion } from 'framer-motion';

const signs = ['Aries', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];

const defaultAshtakvarga = [
  { planet: 'Sun ☉', total: 48, scores: [4, 3, 5, 4, 5, 3, 4, 3, 5, 4, 3, 5], natalSignIndex: 4 },
  { planet: 'Moon ☽', total: 49, scores: [3, 5, 4, 5, 3, 4, 5, 3, 4, 5, 4, 4], natalSignIndex: 2 },
  { planet: 'Mars ♂', total: 39, scores: [5, 3, 4, 2, 4, 3, 3, 4, 2, 3, 4, 3], natalSignIndex: 4 },
  { planet: 'Mercury ☿', total: 54, scores: [4, 5, 5, 4, 5, 4, 6, 4, 5, 4, 4, 4], natalSignIndex: 2 },
  { planet: 'Jupiter ♃', total: 56, scores: [5, 6, 4, 5, 5, 4, 4, 5, 6, 4, 4, 4], natalSignIndex: 5 },
  { planet: 'Venus ♀', total: 52, scores: [4, 5, 4, 4, 6, 5, 5, 3, 4, 4, 4, 4], natalSignIndex: 1 },
  { planet: 'Saturn ♄', total: 39, scores: [3, 3, 4, 2, 3, 3, 4, 3, 3, 4, 5, 2], natalSignIndex: 2 },
  { planet: 'Total (SAV)', total: 337, scores: [28, 30, 30, 26, 31, 26, 31, 25, 29, 28, 28, 26], natalSignIndex: -1, isSav: true },
];

export default function AshtakvargaTable({ ashtakvarga = null }) {
  const isValid =
    Array.isArray(ashtakvarga) &&
    ashtakvarga.length > 0 &&
    Array.isArray(ashtakvarga[0]?.scores);

  const list = isValid ? ashtakvarga : defaultAshtakvarga;

  const getCellColor = (score, isSav) => {
    if (isSav) {
      if (score >= 30) return 'var(--col-teal)';
      if (score >= 28) return 'var(--col-copper)';
      return 'var(--col-moonstone-dim)';
    }
    if (score <= 2) return '#EF4444';
    if (score === 3) return 'rgba(232, 228, 220, 0.55)';
    if (score === 4) return 'var(--col-moonstone)';
    return 'var(--col-teal)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 26 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
            Ashtakvarga Scores (अष्टकवर्ग चक्र)
          </h3>
          <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
            Planetary strength & auspicious points (Bindus) in each sign
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--col-moonstone-dim)' }}>
          <span className="inline-flex items-center gap-1">
            <span style={{ color: '#EF4444' }}>●</span> 0–2 Low
          </span>
          <span className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--col-moonstone)' }}>●</span> 3–4 Avg
          </span>
          <span className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--col-teal)' }}>●</span> 5+ Strong
          </span>
        </div>
      </div>

      <p className="text-xs mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
        Gold border highlights the sign occupied by that planet at birth. Signs with 28+ SAV points bestow high auspicious results during transits.
      </p>

      <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
        <table className="w-full text-xs text-center border-collapse min-w-[620px]">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th className="text-left font-semibold py-2 px-2.5" style={{ color: 'var(--col-copper)', minWidth: 100 }}>
                Planet
              </th>
              {signs.map((s) => (
                <th key={s} className="font-medium py-2 px-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {s}
                </th>
              ))}
              <th className="font-bold py-2 px-2.5" style={{ color: 'var(--col-copper)' }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((row, rIdx) => {
              const isSav = Boolean(row.isSav);
              const scores = Array.isArray(row.scores) ? row.scores : [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
              return (
                <tr
                  key={`${row.planet}-${rIdx}`}
                  style={{
                    borderBottom: isSav ? 'none' : '1px solid rgba(255,255,255,0.04)',
                    background: isSav ? 'rgba(200, 130, 42, 0.08)' : rIdx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                    fontWeight: isSav ? 700 : 400,
                  }}
                >
                  <td className="text-left py-2 px-2.5 font-medium whitespace-nowrap" style={{ color: isSav ? 'var(--col-copper)' : 'var(--col-moonstone)' }}>
                    {row.planet}
                  </td>
                  {scores.map((score, sIdx) => {
                    const isNatal = row.natalSignIndex === sIdx;
                    return (
                      <td
                        key={sIdx}
                        className="py-2 px-1.5 font-mono-num"
                        style={{
                          color: getCellColor(score, isSav),
                          background: isNatal ? 'rgba(200, 130, 42, 0.18)' : 'transparent',
                          border: isNatal ? '1px solid rgba(200, 130, 42, 0.6)' : 'none',
                          borderRadius: isNatal ? '4px' : '0',
                        }}
                      >
                        {score}
                      </td>
                    );
                  })}
                  <td className="py-2 px-2.5 font-mono-num font-bold" style={{ color: isSav ? 'var(--col-copper)' : 'var(--col-moonstone)' }}>
                    {row.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
