import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const defaultGunaMeta = [
  { key: 'varna', name: 'Varna (वर्ण)', max: 1, desc: 'Spiritual compatibility — checks cultural and spiritual alignment (1 Point).' },
  { key: 'vashya', name: 'Vashya (वश्य)', max: 2, desc: 'Mutual attraction and dominance — assesses emotional harmony and balance of power (2 Points).' },
  { key: 'tara', name: 'Tara (तारा)', max: 3, desc: 'Birth star compatibility & destiny — indicates health, fortune, and long-term luck (3 Points).' },
  { key: 'yoni', name: 'Yoni (योनि)', max: 4, desc: 'Physical & temperamental compatibility — indicates intimate harmony and physical alignment (4 Points).' },
  { key: 'maitri', name: 'Graha Maitri (ग्रह मैत्री)', max: 5, desc: 'Mental & intellectual friendship — governed by Moon sign lords (5 Points).' },
  { key: 'gana', name: 'Gana (गण)', max: 6, desc: 'Temperament match (Deva, Manushya, Rakshasa) — behavioral alignment and outlook (6 Points).' },
  { key: 'bhakoot', name: 'Bhakoot (भकूट)', max: 7, desc: 'Emotional, financial & family prosperity — checks relationship growth and welfare (7 Points).' },
  { key: 'nadi', name: 'Nadi (नाड़ी)', max: 8, desc: 'Health & genetic compatibility — vital test for progeny and physiological wellbeing (8 Points).' },
];

export default function GunaTable({ gunaScores }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleRow = (i) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

  const rows = defaultGunaMeta.map((g) => {
    const item = gunaScores?.[g.key];
    let scoredVal = g.max;
    if (typeof item === 'object' && item !== null) {
      scoredVal = item.obtained ?? item.scored ?? item.score ?? g.max;
    } else if (typeof item === 'number') {
      scoredVal = item;
    }
    const displayScore = Math.min(Number(scoredVal) || 0, g.max);
    return {
      ...g,
      score: displayScore,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
          Ashtakoota 8 Guna Breakdown (36 Gunas)
        </div>
        <span className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
          Click row to expand description
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse', color: 'var(--col-moonstone)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--col-glass-border)' }}>
              <th className="text-left font-normal pb-2.5" style={{ color: 'var(--col-moonstone-dim)' }}>Guna</th>
              <th className="text-left font-normal pb-2.5" style={{ color: 'var(--col-moonstone-dim)' }}>Max</th>
              <th className="text-left font-normal pb-2.5" style={{ color: 'var(--col-moonstone-dim)' }}>Score</th>
              <th className="text-center font-normal pb-2.5" style={{ color: 'var(--col-moonstone-dim)' }}>Status</th>
              <th className="w-8 pb-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g, i) => {
              const isExpanded = expandedIndex === i;
              const full = g.score >= g.max;
              const zero = g.score <= 0;
              const color = full ? '#2AABA8' : zero ? 'rgba(220,80,80,0.8)' : '#C8822A';
              const sym = full ? '✓' : zero ? '✗' : '~';

              return (
                <React.Fragment key={g.name}>
                  <tr
                    onClick={() => toggleRow(i)}
                    className="cursor-pointer transition-colors hover:bg-white/[0.02]"
                    style={{
                      borderBottom: isExpanded ? 'none' : '1px solid rgba(255,255,255,0.04)',
                      background: isExpanded ? 'rgba(200, 130, 42, 0.05)' : 'transparent',
                    }}
                  >
                    <td className="py-3 font-medium">
                      <span style={{ color: isExpanded ? 'var(--col-copper)' : 'var(--col-moonstone)' }}>
                        {g.name}
                      </span>
                    </td>
                    <td className="py-3 font-mono-num" style={{ color: 'var(--col-moonstone-dim)' }}>
                      {g.max}
                    </td>
                    <td className="py-3 font-mono-num font-semibold" style={{ color: full ? 'var(--col-teal)' : 'var(--col-copper)' }}>
                      {g.score}
                    </td>
                    <td className="py-3 text-center font-bold text-sm" style={{ color }}>
                      {sym}
                    </td>
                    <td className="py-3 text-right pr-2">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <ChevronDown size={14} style={{ color: 'var(--col-moonstone-dim)' }} />
                      </motion.div>
                    </td>
                  </tr>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(200, 130, 42, 0.04)' }}>
                        <td colSpan={5} className="py-2.5 px-3">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-xs"
                            style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}
                          >
                            {g.desc}
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
