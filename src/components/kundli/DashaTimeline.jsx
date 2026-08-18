import React from 'react';
import { motion } from 'framer-motion';

const dashas = [
  { planet: 'Moon', sym: '☽', range: '1993–2003', dur: '10 yrs', state: 'past' },
  { planet: 'Mars', sym: '♂', range: '2003–2010', dur: '7 yrs', state: 'past' },
  { planet: 'Rahu', sym: '☊', range: '2010–2028', dur: '18 yrs', state: 'current' },
  { planet: 'Jupiter', sym: '♃', range: '2028–2044', dur: '16 yrs', state: 'future' },
  { planet: 'Saturn', sym: '♄', range: '2044–2063', dur: '19 yrs', state: 'future' },
  { planet: 'Mercury', sym: '☿', range: '2063–2080', dur: '17 yrs', state: 'future' },
  { planet: 'Ketu', sym: '☋', range: '2080–2087', dur: '7 yrs', state: 'future' },
  { planet: 'Venus', sym: '♀', range: '2087–2107', dur: '20 yrs', state: 'future' },
  { planet: 'Sun', sym: '☉', range: '2107–2113', dur: '6 yrs', state: 'future' },
];

function Pill({ d, i }) {
  const current = d.state === 'current';
  const past = d.state === 'past';

  const base = {
    padding: '14px 18px',
    borderRadius: 'var(--r-md)',
    border: '1px solid var(--col-glass-border)',
    minWidth: 160,
    flex: '0 0 auto',
    opacity: past ? 0.45 : 1,
  };

  if (current) {
    base.background = 'linear-gradient(135deg, var(--col-copper), var(--col-copper-light))';
    base.borderColor = 'transparent';
  } else {
    base.background = 'rgba(255,255,255,0.03)';
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: past ? 0.45 : 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      style={base}
    >
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 18, color: current ? 'var(--col-midnight)' : 'var(--col-copper)' }}>{d.sym}</span>
        <span
          className="font-medium"
          style={{ color: current ? 'var(--col-midnight)' : 'var(--col-moonstone)', fontSize: '0.95rem' }}
        >
          {d.planet}
        </span>
        {current && (
          <span
            className="text-xs px-2 py-0.5 ml-auto"
            style={{
              color: 'var(--col-midnight)',
              background: 'rgba(13,15,43,0.18)',
              borderRadius: 'var(--r-full)',
              fontWeight: 600,
            }}
          >
            Current
          </span>
        )}
      </div>
      <div
        className="mt-2 font-mono-num"
        style={{ color: current ? 'var(--col-midnight)' : 'var(--col-moonstone-dim)', fontSize: '0.85rem' }}
      >
        {d.range}
      </div>
      <div
        className="font-mono-num"
        style={{ color: current ? 'var(--col-midnight)' : 'var(--col-moonstone-dim)', fontSize: '0.75rem', opacity: 0.85 }}
      >
        {d.dur}
      </div>
    </motion.div>
  );
}

export default function DashaTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-xs uppercase mb-1" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        Complete Dasha Timeline
      </div>
      <div className="font-display mb-5" style={{ color: 'var(--col-moonstone)', fontSize: '1.5rem' }}>
        विंशोत्तरी दशा
        <span className="font-body block mt-1" style={{ fontSize: '0.85rem', color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
          Planetary periods throughout your life
        </span>
      </div>

      <div className="overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin' }}>
        <div className="flex gap-3 min-w-max">
          {dashas.map((d, i) => (
            <Pill key={d.planet} d={d} i={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}