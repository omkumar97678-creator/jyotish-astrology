import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Authentic Vedic North Indian Kundli Geometry (viewBox: 0 0 400 400)
const houseGeometries = [
  { num: 1, domain: 'Self, Body, Vitality & Appearance', polygon: '200,10 295,105 200,200 105,105', labelPos: { x: 200, y: 40 }, rashiPos: { x: 200, y: 62 }, planetPos: { x: 200, y: 125 } },
  { num: 2, domain: 'Wealth, Family & Speech', polygon: '200,10 390,10 295,105', labelPos: { x: 285, y: 28 }, rashiPos: { x: 310, y: 45 }, planetPos: { x: 295, y: 65 } },
  { num: 3, domain: 'Courage, Siblings & Effort', polygon: '390,10 390,200 295,105', labelPos: { x: 372, y: 75 }, rashiPos: { x: 358, y: 95 }, planetPos: { x: 345, y: 130 } },
  { num: 4, domain: 'Mother, Home, Conveyance & Happiness', polygon: '295,105 390,200 295,295 200,200', labelPos: { x: 360, y: 200 }, rashiPos: { x: 335, y: 200 }, planetPos: { x: 295, y: 200 } },
  { num: 5, domain: 'Children, Intellect & Romance', polygon: '390,200 390,390 295,295', labelPos: { x: 372, y: 325 }, rashiPos: { x: 358, y: 305 }, planetPos: { x: 345, y: 270 } },
  { num: 6, domain: 'Enemies, Health, Debts & Service', polygon: '390,390 200,390 295,295', labelPos: { x: 285, y: 372 }, rashiPos: { x: 310, y: 355 }, planetPos: { x: 295, y: 335 } },
  { num: 7, domain: 'Spouse, Partnership & Public Status', polygon: '200,200 295,295 200,390 105,295', labelPos: { x: 200, y: 360 }, rashiPos: { x: 200, y: 338 }, planetPos: { x: 200, y: 275 } },
  { num: 8, domain: 'Longevity, Transformation & Occult', polygon: '200,390 10,390 105,295', labelPos: { x: 115, y: 372 }, rashiPos: { x: 90, y: 355 }, planetPos: { x: 105, y: 335 } },
  { num: 9, domain: 'Dharma, Fortune, Guru & Higher Learning', polygon: '10,390 10,200 105,295', labelPos: { x: 28, y: 325 }, rashiPos: { x: 42, y: 305 }, planetPos: { x: 55, y: 270 } },
  { num: 10, domain: 'Karma, Career, Authority & Fame', polygon: '105,105 200,200 105,295 10,200', labelPos: { x: 40, y: 200 }, rashiPos: { x: 65, y: 200 }, planetPos: { x: 105, y: 200 } },
  { num: 11, domain: 'Gains, Aspirations & Social Network', polygon: '10,200 10,10 105,105', labelPos: { x: 28, y: 75 }, rashiPos: { x: 42, y: 95 }, planetPos: { x: 55, y: 130 } },
  { num: 12, domain: 'Losses, Liberation, Foreign Lands & Sleep', polygon: '10,10 200,10 105,105', labelPos: { x: 115, y: 28 }, rashiPos: { x: 90, y: 45 }, planetPos: { x: 105, y: 65 } },
];

export default function NorthIndianChart({ houses = [] }) {
  const [hovered, setHovered] = useState(null);

  // Merge geometric layouts with dynamically calculated house data
  const chartHouses = houseGeometries.map((geo, idx) => {
    const dynamic = houses && houses[idx] ? houses[idx] : null;
    return {
      ...geo,
      sign: dynamic?.sign || 'Aries',
      rashiHi: dynamic?.rashiHi || 'Mesh',
      rashiNumber: dynamic?.rashiNumber || idx + 1,
      rashiAbbr: dynamic?.rashiAbbr || `${dynamic?.sign?.slice(0, 3) || 'Ari'} (${dynamic?.rashiNumber || idx + 1})`,
      planets: dynamic?.planets || [],
    };
  });

  const activeHouse = hovered !== null ? chartHouses.find((h) => h.num === hovered) : null;

  return (
    <div className="relative flex flex-col items-center w-full max-w-[420px] mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 0 24px rgba(200, 130, 42, 0.15))',
          userSelect: 'none',
        }}
      >
        <defs>
          <radialGradient id="kundliCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200, 130, 42, 0.12)" />
            <stop offset="100%" stopColor="rgba(13, 15, 43, 0.6)" />
          </radialGradient>
        </defs>

        {/* Chart Background Canvas */}
        <rect x="10" y="10" width="380" height="380" fill="url(#kundliCenterGlow)" stroke="#C8822A" strokeWidth="2" />

        {/* 12 Interactive House Polygons */}
        {chartHouses.map((h) => {
          const isHovered = hovered === h.num;
          return (
            <polygon
              key={h.num}
              points={h.polygon}
              fill={isHovered ? 'rgba(200, 130, 42, 0.22)' : 'rgba(255, 255, 255, 0.015)'}
              stroke={isHovered ? '#E09840' : 'rgba(200, 130, 42, 0.55)'}
              strokeWidth={isHovered ? '2' : '1'}
              className="transition-colors duration-200 cursor-pointer"
              onMouseEnter={() => setHovered(h.num)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* Authentic Geometry Line Overlays */}
        {/* Diagonals */}
        <line x1="10" y1="10" x2="390" y2="390" stroke="#C8822A" strokeWidth="1.2" opacity="0.65" pointerEvents="none" />
        <line x1="390" y1="10" x2="10" y2="390" stroke="#C8822A" strokeWidth="1.2" opacity="0.65" pointerEvents="none" />
        {/* Central Diamond */}
        <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="#C8822A" strokeWidth="1.4" opacity="0.85" pointerEvents="none" />

        {/* House Labels, Rashi Signs & Planets */}
        {chartHouses.map((h) => {
          return (
            <g key={`labels-${h.num}`} pointerEvents="none">
              {/* House Number (H1, H2..) */}
              <text
                x={h.labelPos.x}
                y={h.labelPos.y}
                textAnchor="middle"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fill="rgba(232, 228, 220, 0.35)"
              >
                H{h.num}
              </text>

              {/* Rashi Number in Ancient Vedic Notation */}
              <text
                x={h.rashiPos.x}
                y={h.rashiPos.y}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="Yatra One, serif"
                fill="#C8822A"
              >
                {h.rashiNumber}
              </text>

              {/* Planets placed in this house */}
              {h.planets.length > 0 && (
                <text
                  x={h.planetPos.x}
                  y={h.planetPos.y}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="DM Sans, sans-serif"
                >
                  {h.planets.map((p, pIdx) => (
                    <tspan key={p.name} fill={p.color} dx={pIdx > 0 ? 5 : 0}>
                      {p.name}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* House Inspector Tooltip Card */}
      <div className="w-full mt-3 min-h-[58px]">
        <AnimatePresence mode="wait">
          {activeHouse ? (
            <motion.div
              key={activeHouse.num}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-xl text-center"
              style={{
                background: 'rgba(200, 130, 42, 0.1)',
                border: '1px solid rgba(200, 130, 42, 0.35)',
              }}
            >
              <div className="text-xs font-semibold" style={{ color: 'var(--col-copper)' }}>
                House {activeHouse.num} (भाव {activeHouse.num}): {activeHouse.sign} ({activeHouse.rashiHi})
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                {activeHouse.domain}
                {activeHouse.planets.length > 0 && (
                  <span className="ml-2 font-medium" style={{ color: 'var(--col-teal)' }}>
                    • Occupied by: {activeHouse.planets.map((p) => p.name).join(', ')}
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="p-2 text-center text-xs" style={{ color: 'rgba(232, 228, 220, 0.4)' }}>
              Hover over any triangle to inspect house domain & planetary occupants
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
