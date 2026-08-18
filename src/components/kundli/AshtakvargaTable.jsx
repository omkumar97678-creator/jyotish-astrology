import React from 'react';
import { motion } from 'framer-motion';

const signs = ['Aries', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];

const ashtakvargaData = [
  {
    planet: 'Sun ☉',
    total: 48,
    scores: [4, 3, 5, 4, 5, 3, 4, 3, 5, 4, 3, 5],
    natalSignIndex: 4, // Leo (5th sign, index 4)
  },
  {
    planet: 'Moon ☽',
    total: 49,
    scores: [3, 5, 4, 5, 3, 4, 5, 3, 4, 5, 4, 4],
    natalSignIndex: 3, // Cancer (index 3)
  },
  {
    planet: 'Mars ♂',
    total: 39,
    scores: [5, 3, 4, 2, 4, 3, 3, 4, 2, 3, 4, 3],
    natalSignIndex: 2, // Gemini (index 2)
  },
  {
    planet: 'Mercury ☿',
    total: 54,
    scores: [4, 5, 5, 4, 5, 4, 6, 4, 5, 4, 4, 4],
    natalSignIndex: 6, // Libra (index 6)
  },
  {
    planet: 'Jupiter ♃',
    total: 56,
    scores: [5, 6, 4, 5, 5, 4, 4, 5, 6, 4, 4, 4],
    natalSignIndex: 1, // Taurus (index 1)
  },
  {
    planet: 'Venus ♀',
    total: 52,
    scores: [4, 5, 4, 4, 6, 5, 5, 3, 4, 4, 4, 4],
    natalSignIndex: 4, // Leo (index 4)
  },
  {
    planet: 'Saturn ♄',
    total: 39,
    scores: [3, 3, 4, 2, 3, 3, 4, 3, 3, 4, 5, 2],
    natalSignIndex: 10, // Aquarius (index 10)
  },
  {
    planet: 'Total (SAV)',
    total: 337,
    scores: [28, 30, 30, 26, 31, 26, 31, 25, 29, 28, 28, 26],
    natalSignIndex: -1,
    isSav: true,
  },
];

export default function AshtakvargaTable() {
  const getCellColor = (score, isSav) => {
    if (isSav) {
      if (score >= 30) return 'var(--col-teal)';
      if (score >= 28) return 'var(--col-copper)';
      return 'var(--col-moonstone-dim)';
    }
    if (score <= 2) return '#EF4444';
    if (score === 3) return 'rgba(232, 228, 220, 0.55)';
    if (score === 4) return 'var(--col-moonstone)';
    return 'var(--col-teal)'; // 5-8
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
            Ashtakvarga Scores
          </h3>
          <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
            अष्टकवर्ग — Planetary strength in each sign
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

      <p className="text-xs mb-5" style={{ color: 'var(--col-moonstone-dim)' }}>
        Higher score = stronger planet in that position. Score above 4 is considered favorable for individual Bindus (SAV total &gt; 28 is auspicious). Highlighted box indicates your natal planet position.
      </p>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <table className="w-full text-xs font-mono-num" style={{ borderCollapse: 'separate', borderSpacing: '2px', minWidth: 680 }}>
          <thead>
            <tr>
              <th className="text-left font-sans font-semibold py-2 px-2.5" style={{ color: 'var(--col-copper)' }}>Planet</th>
              <th className="text-center font-semibold py-2 px-2" style={{ color: 'var(--col-copper)' }}>Total</th>
              {signs.map((s) => (
                <th key={s} className="text-center font-sans font-medium py-2 px-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ashtakvargaData.map((row) => (
              <tr
                key={row.planet}
                style={{
                  background: row.isSav ? 'rgba(200, 130, 42, 0.08)' : 'transparent',
                }}
              >
                <td className="py-2 px-2.5 font-sans font-medium whitespace-nowrap" style={{ color: row.isSav ? 'var(--col-copper)' : 'var(--col-moonstone)' }}>
                  {row.planet}
                </td>
                <td className="text-center py-2 px-2 font-bold" style={{ color: row.isSav ? 'var(--col-copper)' : 'var(--col-moonstone)' }}>
                  {row.total}
                </td>
                {row.scores.map((score, sIdx) => {
                  const isNatal = row.natalSignIndex === sIdx;
                  return (
                    <td
                      key={sIdx}
                      className="text-center py-2 px-1.5 rounded transition-colors"
                      style={{
                        color: getCellColor(score, row.isSav),
                        fontWeight: isNatal || row.isSav ? 'bold' : 'normal',
                        background: isNatal
                          ? 'rgba(200, 130, 42, 0.22)'
                          : row.isSav && score >= 30
                          ? 'rgba(42, 171, 168, 0.12)'
                          : 'transparent',
                        border: isNatal ? '1px solid var(--col-copper)' : '1px solid transparent',
                      }}
                      title={isNatal ? `Natal Placement (${signs[sIdx]})` : `${row.planet} in ${signs[sIdx]}: ${score} points`}
                    >
                      {score}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
