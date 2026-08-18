import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const gunas = [
  {
    name: 'Varna',
    max: 1,
    score: 1,
    desc: 'Spiritual compatibility — same varna indicates similar life values and spiritual alignment.',
  },
  {
    name: 'Vashya',
    max: 2,
    score: 2,
    desc: 'Control & attraction between partners — assesses mutual dominance, respect, and magnetic attraction.',
  },
  {
    name: 'Tara',
    max: 3,
    score: 2,
    desc: 'Birth star compatibility & destiny — indicates health, fortune, and luck for both partners.',
  },
  {
    name: 'Yoni',
    max: 4,
    score: 3,
    desc: 'Physical & temperamental compatibility — indicates mutual physical harmony and sexual compatibility.',
  },
  {
    name: 'Graha Maitri',
    max: 5,
    score: 4,
    desc: 'Mental & intellectual compatibility — governed by Moon sign lords, reflecting friendship and worldview.',
  },
  {
    name: 'Gana',
    max: 6,
    score: 5,
    desc: 'Temperament match — Deva, Manav, Rakshasa — indicates behavioral alignment and natural disposition.',
  },
  {
    name: 'Bhakoot',
    max: 7,
    score: 7,
    desc: 'Emotional & financial compatibility — checks relationship growth, mutual welfare, and prosperity.',
  },
  {
    name: 'Nadi',
    max: 8,
    score: 4,
    desc: 'Health & progeny compatibility — most important guna (8 points), checks genetic and physiological harmony.',
  },
];

export default function GunaTable() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleRow = (i) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

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
          Ashtakoota 8 Guna Breakdown
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
            {gunas.map((g, i) => {
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
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="text-xs pb-1"
                            style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}
                          >
                            <span style={{ color: 'var(--col-copper)' }}>✦ {g.name}: </span>
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
