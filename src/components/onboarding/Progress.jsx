import React from 'react';

export default function Progress({ step, total }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              display: 'block',
              height: 8,
              width: i === step ? 28 : 8,
              borderRadius: 'var(--r-full)',
              background:
                i === step
                  ? 'var(--col-copper)'
                  : i < step
                  ? 'rgba(200,130,42,0.6)'
                  : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
      <span className="font-mono-num text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
        {step + 1} / {total}
      </span>
    </div>
  );
}