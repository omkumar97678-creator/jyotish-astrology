import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from '@/components/numerology/AnimatedNumber';

const SCORE = 28;
const TOTAL = 36;

export default function CoupleHeader({ p1, p2 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(SCORE / TOTAL), 100);
    return () => clearTimeout(t);
  }, []);

  const R = 82;
  const C = 2 * Math.PI * R;

  const boyName = p1?.name?.trim() || 'Harsh';
  const girlName = p2?.name?.trim() || 'Mahika';
  const boyDob = p1?.dob?.day ? `${p1.dob.day}/${p1.dob.month}/${p1.dob.year}` : '14 Oct 1996';
  const boyPlace = p1?.birthPlace || 'Mumbai';
  const girlDob = p2?.dob?.day ? `${p2.dob.day}/${p2.dob.month}/${p2.dob.year}` : '22 Mar 1998';
  const girlPlace = p2?.birthPlace || 'Delhi';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: '32px 24px' }}
    >
      {/* 3-Column Couple Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left">
        {/* Left Side: Boy */}
        <div className="flex flex-col items-center md:items-start order-2 md:order-1">
          <div className="text-xs uppercase font-medium tracking-widest" style={{ color: 'var(--col-copper)' }}>
            Person 1 (Boy)
          </div>
          <h2 className="font-display mt-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--col-copper)' }}>
            {boyName}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
            {boyDob} • {boyPlace}
          </p>

          <div className="mt-4 space-y-1.5 text-sm w-full max-w-[200px] text-center md:text-left">
            <div className="flex justify-between md:justify-start md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Rashi:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Scorpio (Vrishchik)</span>
            </div>
            <div className="flex justify-between md:justify-start md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Nakshatra:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Jyeshtha</span>
            </div>
          </div>
        </div>

        {/* Center: Score Ring & Heart Pulse */}
        <div className="flex flex-col items-center justify-center order-1 md:order-2">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-[170px] h-[170px] sm:w-[200px] sm:h-[200px]" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke="var(--col-copper)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.22, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-lg mb-1"
                style={{ color: 'var(--col-copper)', textShadow: '0 0 16px rgba(200, 130, 42, 0.6)' }}
              >
                ♡
              </motion.span>
              <div className="font-mono-num text-copper-gradient font-bold" style={{ fontSize: '2.6rem', lineHeight: 1 }}>
                <AnimatedNumber value={SCORE} duration={1600} />
                <span style={{ fontSize: '1.4rem', color: 'var(--col-moonstone-dim)' }}>/{TOTAL}</span>
              </div>
              <div className="text-[11px] mt-1 uppercase tracking-wider" style={{ color: 'var(--col-moonstone-dim)' }}>
                36 Gunas
              </div>
            </div>
          </div>

          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(200, 130, 42, 0.15)',
              color: 'var(--col-copper)',
              border: '1px solid rgba(200, 130, 42, 0.4)',
            }}
          >
            Good Match ✦
          </div>
        </div>

        {/* Right Side: Girl */}
        <div className="flex flex-col items-center md:items-end order-3 text-center md:text-right">
          <div className="text-xs uppercase font-medium tracking-widest" style={{ color: 'var(--col-copper)' }}>
            Person 2 (Girl)
          </div>
          <h2 className="font-display mt-1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--col-copper)' }}>
            {girlName}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
            {girlDob} • {girlPlace}
          </p>

          <div className="mt-4 space-y-1.5 text-sm w-full max-w-[200px] text-center md:text-right">
            <div className="flex justify-between md:justify-end md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Rashi:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Virgo (Kanya)</span>
            </div>
            <div className="flex justify-between md:justify-end md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Nakshatra:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Hasta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Verdict Strip */}
      <div
        className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 p-4 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--col-glass-border)',
        }}
      >
        {/* Left Side: Score Interpretation & 4 Mini Badges */}
        <div className="space-y-2.5">
          <div className="text-sm font-semibold" style={{ color: 'var(--col-moonstone)' }}>
            <span className="font-mono-num text-[var(--col-copper)] font-bold">28/36</span> — This is a <span style={{ color: 'var(--col-teal)' }}>GOOD MATCH</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }}
            >
              ✓ Emotionally Compatible
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }}
            >
              ✓ Intellectually Matched
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(200, 130, 42, 0.15)', color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.35)' }}
            >
              ~ Health Attention Needed
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }}
            >
              ✓ Financially Aligned
            </span>
          </div>
        </div>

        {/* Right Side: Recommendation */}
        <div className="lg:max-w-xs lg:text-right pt-2 lg:pt-0 border-t lg:border-t-0 border-[rgba(255,255,255,0.06)]">
          <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--col-copper)' }}>
            Recommendation
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
            Auspicious for marriage after Manglik remedy for Person 2.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
