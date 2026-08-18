import React from 'react';
import { motion } from 'framer-motion';

// Authentic Vedic North Indian Kundli Geometry (viewBox: 0 0 300 300)
// Pure straight lines: Outer square, 2 full corner diagonals, and 1 center diamond.
// Zero circles, zero ellipses.

const copper = '#C8822A';

const planetsData = [
  { x: 150, y: 88, name: 'Sun', color: '#C8822A' },
  { x: 150, y: 104, name: 'Ven', color: '#2AABA8' },
  { x: 260, y: 95, name: 'Mer', color: '#2AABA8' },
  { x: 150, y: 210, name: 'Sat', color: '#C8822A' },
  { x: 42, y: 205, name: 'Rah', color: 'rgba(232, 228, 220, 0.85)' },
  { x: 80, y: 150, name: 'Jup', color: '#2AABA8' },
  { x: 42, y: 95, name: 'Mar', color: '#C8822A' },
  { x: 80, y: 50, name: 'Moo', color: '#2AABA8' },
];

export default function KundliChart({ animate = false, size = 300, opacity = 0.9 }) {
  const anim = (i) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 0.6, delay: i * 0.08, ease: 'easeInOut' },
        }
      : {};

  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      style={{ opacity, overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* 100% Pure Straight Lines */}
      <g fill="none" stroke={copper} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Square */}
        <motion.rect x="10" y="10" width="280" height="280" strokeWidth="1.6" {...anim(0)} />

        {/* Diagonal 1: Top-Left to Bottom-Right */}
        <motion.line x1="10" y1="10" x2="290" y2="290" {...anim(1)} />

        {/* Diagonal 2: Bottom-Left to Top-Right */}
        <motion.line x1="10" y1="290" x2="290" y2="10" {...anim(2)} />

        {/* Center Kendra Diamond */}
        <motion.polygon points="150,10 290,150 150,290 10,150" strokeWidth="1.4" {...anim(3)} />
      </g>

      {/* Planet Text Labels (No circles) */}
      {planetsData.map((p, i) => (
        <motion.text
          key={p.name}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="central"
          initial={animate ? { opacity: 0, scale: 0.8 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : false}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
          fontSize="10.5"
          fontWeight="700"
          fill={p.color}
          fontFamily="system-ui, -apple-system, sans-serif"
          className="select-none"
        >
          {p.name}
        </motion.text>
      ))}
    </svg>
  );
}