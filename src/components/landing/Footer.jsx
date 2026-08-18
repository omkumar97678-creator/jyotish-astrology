import React from 'react';

export default function Footer() {
  return (
    <footer
      className="relative px-4 sm:px-6 py-10 sm:py-14 text-center"
      style={{ borderTop: '1px solid rgba(200,130,42,0.2)', zIndex: 10 }}
    >
      <div className="font-display" style={{ fontSize: '1.4rem', color: 'var(--col-copper)' }}>
        ✦ ज्योतिष
      </div>
      <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-5 sm:gap-8 text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
        <a href="#features" className="hover:text-[var(--col-copper)] transition-colors py-1">Privacy Policy</a>
        <a href="#features" className="hover:text-[var(--col-copper)] transition-colors py-1">Terms</a>
        <a href="#features" className="hover:text-[var(--col-copper)] transition-colors py-1">Disclaimer</a>
      </div>
      <p className="mt-5 mx-auto px-4" style={{ color: 'rgba(232,228,220,0.35)', fontSize: '0.75rem', maxWidth: 460 }}>
        For entertainment & educational purposes only. Not a substitute for professional consultation.
      </p>
      <p className="mt-3" style={{ color: 'rgba(232,228,220,0.35)', fontSize: '0.75rem' }}>
        © 2025 Jyotish App • Made with Vedic Accuracy
      </p>
    </footer>
  );
}