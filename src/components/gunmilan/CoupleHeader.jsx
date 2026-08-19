import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from '@/components/numerology/AnimatedNumber';

export default function CoupleHeader({ p1, p2, ashtakoot }) {
  const score = ashtakoot?.totalScore ?? 28;
  const total = ashtakoot?.maxScore ?? 36;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(score / total), 100);
    return () => clearTimeout(t);
  }, [score, total]);

  const R = 82;
  const C = 2 * Math.PI * R;

  const boyName = p1?.name?.trim() || 'Person 1';
  const girlName = p2?.name?.trim() || 'Person 2';
  const boyDob = p1?.dob?.day ? `${p1.dob.day}/${p1.dob.month}/${p1.dob.year}` : 'Date of Birth';
  const boyPlace = p1?.birthPlace || 'Location';
  const girlDob = p2?.dob?.day ? `${p2.dob.day}/${p2.dob.month}/${p2.dob.year}` : 'Date of Birth';
  const girlPlace = p2?.birthPlace || 'Location';

  const p1Rashi = ashtakoot?.person1?.rashi || 'Mesh (Aries)';
  const p1Nak = ashtakoot?.person1?.nakshatra || 'Ashwini';
  const p2Rashi = ashtakoot?.person2?.rashi || 'Karka (Cancer)';
  const p2Nak = ashtakoot?.person2?.nakshatra || 'Pushya';

  const getVerdict = (s) => {
    if (s >= 28) return { text: 'Excellent Match (उत्कृष्ट मिलान)', color: 'var(--col-teal)' };
    if (s >= 21) return { text: 'Good Match (शुभ मिलान)', color: 'var(--col-copper)' };
    if (s >= 18) return { text: 'Acceptable Match (स्वीकार्य मिलान)', color: '#F59E0B' };
    return { text: 'Low Compatibility (सावधानी आवश्यक)', color: '#EF4444' };
  };

  const verdict = getVerdict(score);

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
            Person 1
          </div>
          <h2 className="font-display mt-1" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--col-copper)' }}>
            {boyName}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
            {boyDob} • {boyPlace}
          </p>

          <div className="mt-4 space-y-1.5 text-sm w-full max-w-[220px] text-center md:text-left">
            <div className="flex justify-between md:justify-start md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Rashi:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{p1Rashi}</span>
            </div>
            <div className="flex justify-between md:justify-start md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Nakshatra:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{p1Nak}</span>
            </div>
          </div>
        </div>

        {/* Center: Score Ring & Heart Pulse */}
        <div className="flex flex-col items-center justify-center order-1 md:order-2">
          <div className="relative flex items-center justify-center" style={{ width: 190, height: 190 }}>
            <svg width="190" height="190" viewBox="0 0 190 190" className="transform -rotate-90">
              <circle
                cx="95"
                cy="95"
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
              />
              <motion.circle
                cx="95"
                cy="95"
                r={R}
                fill="none"
                stroke="url(#copperGrad)"
                strokeWidth="10"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                strokeLinecap="round"
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--col-copper-light)" />
                  <stop offset="100%" stopColor="var(--col-copper)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <AnimatedNumber
                value={score}
                className="font-mono-num font-bold text-copper-gradient leading-none"
                style={{ fontSize: '3rem' }}
              />
              <span className="text-xs uppercase font-medium mt-1" style={{ color: 'var(--col-moonstone-dim)', letterSpacing: '0.1em' }}>
                out of {total}
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: 'rgba(200,130,42,0.1)',
                border: '1px solid rgba(200,130,42,0.3)',
                color: verdict.color,
              }}
            >
              {verdict.text}
            </span>
          </div>
        </div>

        {/* Right Side: Girl */}
        <div className="flex flex-col items-center md:items-end order-3">
          <div className="text-xs uppercase font-medium tracking-widest" style={{ color: 'var(--col-teal)' }}>
            Person 2
          </div>
          <h2 className="font-display mt-1" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--col-teal)' }}>
            {girlName}
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
            {girlDob} • {girlPlace}
          </p>

          <div className="mt-4 space-y-1.5 text-sm w-full max-w-[220px] text-center md:text-right">
            <div className="flex justify-between md:justify-end md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Rashi:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{p2Rashi}</span>
            </div>
            <div className="flex justify-between md:justify-end md:gap-3">
              <span style={{ color: 'var(--col-moonstone-dim)' }}>Nakshatra:</span>
              <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{p2Nak}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
