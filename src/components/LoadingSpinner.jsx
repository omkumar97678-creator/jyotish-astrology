import React from 'react';

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(200, 130, 42, 0.2)',
          borderTop: '3px solid #C8822A',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          boxShadow: '0 0 20px rgba(200, 130, 42, 0.25)',
        }}
      />
      {text && (
        <p
          style={{
            color: 'rgba(232, 228, 220, 0.7)',
            fontSize: '0.92rem',
            letterSpacing: '0.04em',
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
