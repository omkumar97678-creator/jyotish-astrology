import React from 'react';

export default function StepShell({ question, subtext, children }) {
  return (
    <div>
      <h1 className="font-display" style={{ fontSize: 'clamp(28px, 6vw, 40px)', color: 'var(--col-moonstone)' }}>
        {question}
      </h1>
      <p className="mt-2 mb-8" style={{ color: 'var(--col-moonstone-dim)' }}>
        {subtext}
      </p>
      {children}
    </div>
  );
}