import React, { useState, useEffect } from 'react';

const BAR_COUNT = 36;

const stateColor = (state) =>
  state === 'listening'
    ? 'var(--col-copper)'
    : state === 'speaking'
    ? 'var(--col-teal)'
    : 'rgba(232,228,220,0.35)';

export default function Waveform({ state }) {
  const [heights, setHeights] = useState(Array(BAR_COUNT).fill(6));

  useEffect(() => {
    const speed = state === 'idle' ? 420 : state === 'listening' ? 110 : 220;
    const id = setInterval(() => {
      setHeights((prev) =>
        prev.map(() => {
          if (state === 'idle') return 5 + Math.random() * 7;
          if (state === 'listening') return 12 + Math.random() * 72;
          if (state === 'speaking') return 14 + Math.random() * 38;
          return 5;
        })
      );
    }, speed);
    return () => clearInterval(id);
  }, [state]);

  const color = stateColor(state);

  return (
    <div className="flex items-end justify-center gap-1" style={{ height: 90 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: h,
            background: color,
            borderRadius: 2,
            opacity: state === 'idle' ? 0.55 : 0.9,
            transition: 'height 110ms ease-out, opacity 400ms ease',
          }}
        />
      ))}
    </div>
  );
}