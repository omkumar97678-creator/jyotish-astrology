import React from 'react';
import { motion } from 'framer-motion';

const SYMBOLS = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
  Rahu: '☊',
  Ketu: '☋',
};

export default function DashaTimeline({ dashas = null, mahadasha = null }) {
  // If real dashas array is passed
  const list =
    dashas && Array.isArray(dashas) && dashas.length > 0
      ? dashas.map((d) => ({
          planet: d.lord,
          sym: SYMBOLS[d.lord] || '✦',
          range: `${d.start}–${d.end}`,
          dur: `${d.years} yrs`,
          isCurrent: Boolean(d.isCurrent),
        }))
      : mahadasha?.timeline && mahadasha.timeline.length > 0
      ? mahadasha.timeline.map((m) => ({
          planet: m.planet,
          sym: m.sym || '✦',
          range: m.range,
          dur: m.dur,
          isCurrent: m.state === 'current',
        }))
      : [
          { planet: 'Rahu', sym: '☊', range: '2004–2018', dur: '14 yrs', isCurrent: false },
          { planet: 'Jupiter', sym: '♃', range: '2018–2034', dur: '16 yrs', isCurrent: true },
          { planet: 'Saturn', sym: '♄', range: '2034–2053', dur: '19 yrs', isCurrent: false },
          { planet: 'Mercury', sym: '☿', range: '2053–2070', dur: '17 yrs', isCurrent: false },
          { planet: 'Ketu', sym: '☋', range: '2070–2077', dur: '7 yrs', isCurrent: false },
          { planet: 'Venus', sym: '♀', range: '2077–2097', dur: '20 yrs', isCurrent: false },
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
      <div>
        <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
          Vimshottari Dasha Timeline
        </div>
        <div className="font-display mt-1 mb-4" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.95rem' }}>
          विंशोत्तरी महादशा कालचक्र
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
        {list.map((d, i) => {
          const current = d.isCurrent;
          return (
            <motion.div
              key={`${d.planet}-${d.range}-${i}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                background: current ? 'rgba(200,130,42,0.15)' : 'rgba(255,255,255,0.03)',
                border: current ? '1px solid rgba(200,130,42,0.45)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '12px 16px',
                minWidth: '120px',
                flex: '0 0 auto',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--col-copper)', fontSize: 16 }}>{d.sym}</span>
                <span style={{ color: 'var(--col-copper)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {d.planet}
                </span>
              </div>
              <div
                style={{
                  color: '#E8E4DC',
                  fontSize: '0.85rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginTop: 4,
                }}
              >
                {d.range}
              </div>
              <div
                style={{
                  color: 'var(--col-moonstone-dim)',
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginTop: 2,
                }}
              >
                {d.dur}
              </div>
              {current && (
                <div
                  style={{
                    background: '#C8822A',
                    color: '#0D0F2B',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    marginTop: '6px',
                    display: 'inline-block',
                  }}
                >
                  Current
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}