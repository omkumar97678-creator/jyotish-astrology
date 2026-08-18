import React from 'react';

export default function SessionBar({ seconds }) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const time = `${m}:${String(s).padStart(2, '0')}`;
  return (
    <div className="text-center text-xs mt-4" style={{ color: 'var(--col-moonstone-dim)' }}>
      Session active • {time} elapsed • Tap mic to continue
    </div>
  );
}