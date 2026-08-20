import React from 'react';

export default function SessionBar({ seconds = 0 }) {
  const totalSeconds = typeof seconds === 'number' && !isNaN(seconds) ? seconds : 0;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="text-center text-xs mt-4" style={{ color: 'var(--col-moonstone-dim)' }}>
      Session active • {formattedTime} elapsed
    </div>
  );
}