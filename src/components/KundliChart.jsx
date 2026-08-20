import React from 'react';
import { motion } from 'framer-motion';

// Authentic Vedic North Indian Kundli Geometry (viewBox: 0 0 300 300)
// Pure straight lines: Outer square, 2 full corner diagonals, and 1 center diamond.

const copper = '#C8822A';
const teal = '#2AABA8';

// House positions in North Indian chart SVG (viewBox 300x300):
const HOUSE_POSITIONS = {
  1:  { x: 150, y: 60 },   // Top center (House 1 / Lagna)
  2:  { x: 240, y: 60 },   // Top right (House 2)
  3:  { x: 265, y: 150 },  // Right (House 3)
  4:  { x: 240, y: 240 },  // Bottom right (House 4)
  5:  { x: 165, y: 265 },  // Bottom center right (House 5)
  6:  { x: 135, y: 265 },  // Bottom center left (House 6)
  7:  { x: 60,  y: 240 },  // Bottom left (House 7)
  8:  { x: 35,  y: 150 },  // Left (House 8)
  9:  { x: 60,  y: 60 },   // Top left (House 9)
  10: { x: 135, y: 35 },   // Top center left (House 10)
  11: { x: 165, y: 35 },   // Top center right (House 11)
  12: { x: 150, y: 150 },  // Center (inner) (House 12)
};

const isBenefic = (name) => {
  const n = String(name).toLowerCase();
  return (
    n.includes('jupiter') ||
    n.includes('guru') ||
    n.includes('venus') ||
    n.includes('shukra') ||
    n.includes('moon') ||
    n.includes('chandra') ||
    n.includes('mercury') ||
    n.includes('budh')
  );
};

export default function KundliChart({
  planets = null,
  animate = false,
  size = 300,
  opacity = 0.9,
}) {
  const anim = (i) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 0.6, delay: i * 0.08, ease: 'easeInOut' },
        }
      : {};

  // Group planets by house to offset multiples
  const planetsByHouse = {};
  if (planets && typeof planets === 'object') {
    Object.entries(planets).forEach(([name, pData]) => {
      const h = pData?.house || 1;
      if (!planetsByHouse[h]) planetsByHouse[h] = [];
      planetsByHouse[h].push({ name, ...pData });
    });
  }

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

      {/* Render Calculated Planets inside respective houses */}
      {planets &&
        Object.entries(planetsByHouse).map(([houseNum, pList]) => {
          const basePos = HOUSE_POSITIONS[houseNum] || { x: 150, y: 150 };
          return pList.map((p, idx) => {
            const offsetY = (idx - (pList.length - 1) / 2) * 13;
            const offsetX = pList.length > 2 ? ((idx % 2 === 0 ? -1 : 1) * 8) : 0;
            const posX = basePos.x + offsetX;
            const posY = basePos.y + offsetY;
            const shortName = p.symbol || p.name.slice(0, 3);

            return (
              <motion.text
                key={p.name}
                x={posX}
                y={posY}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isBenefic(p.name) ? teal : copper}
                fontSize={pList.length > 2 ? '9.5' : '11'}
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                className="select-none"
                initial={animate ? { opacity: 0, scale: 0 } : false}
                animate={animate ? { opacity: 1, scale: 1 } : false}
                transition={{ delay: 0.3 + idx * 0.05, type: 'spring', stiffness: 200 }}
              >
                {shortName}
              </motion.text>
            );
          });
        })}

      {/* Fallback default planets if none passed */}
      {!planets && (
        <>
          <motion.text x="150" y="60" textAnchor="middle" fill={copper} fontSize="11" fontWeight="700">☉</motion.text>
          <motion.text x="60" y="240" textAnchor="middle" fill={teal} fontSize="11" fontWeight="700">☽</motion.text>
          <motion.text x="135" y="35" textAnchor="middle" fill={copper} fontSize="11" fontWeight="700">♂</motion.text>
          <motion.text x="135" y="265" textAnchor="middle" fill={teal} fontSize="11" fontWeight="700">☿</motion.text>
          <motion.text x="165" y="35" textAnchor="middle" fill={teal} fontSize="11" fontWeight="700">♃</motion.text>
          <motion.text x="240" y="60" textAnchor="middle" fill={teal} fontSize="11" fontWeight="700">♀</motion.text>
          <motion.text x="35" y="150" textAnchor="middle" fill={copper} fontSize="11" fontWeight="700">♄</motion.text>
          <motion.text x="165" y="265" textAnchor="middle" fill={copper} fontSize="11" fontWeight="700">☊</motion.text>
          <motion.text x="165" y="35" textAnchor="middle" fill={copper} fontSize="11" fontWeight="700">☋</motion.text>
        </>
      )}
    </svg>
  );
}