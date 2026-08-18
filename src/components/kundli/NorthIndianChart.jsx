import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Authentic Vedic North Indian Kundli Geometry (viewBox: 0 0 400 400)
// Pure straight lines: Outer square (10,10 to 390,390), 2 corner diagonals, and 1 center diamond.
// Zero circles, zero ellipses.

const houses = [
  {
    num: 1,
    sign: 'Leo',
    rashiHi: 'Simha',
    rashiAbbr: 'Sim (5)',
    domain: 'Self, Body, Vitality & Appearance',
    planets: [
      { name: 'Sun', color: '#C8822A' },
      { name: 'Ven', color: '#2AABA8' },
    ],
    polygon: '200,10 295,105 200,200 105,105',
    labelPos: { x: 200, y: 40 },
    rashiPos: { x: 200, y: 62 },
    planetPos: { x: 200, y: 125 },
  },
  {
    num: 2,
    sign: 'Virgo',
    rashiHi: 'Kanya',
    rashiAbbr: 'Kan (6)',
    domain: 'Wealth, Family & Speech',
    planets: [],
    polygon: '200,10 390,10 295,105',
    labelPos: { x: 285, y: 28 },
    rashiPos: { x: 310, y: 45 },
    planetPos: { x: 295, y: 65 },
  },
  {
    num: 3,
    sign: 'Libra',
    rashiHi: 'Tula',
    rashiAbbr: 'Tul (7)',
    domain: 'Courage, Siblings & Effort',
    planets: [{ name: 'Mer', color: '#2AABA8' }],
    polygon: '390,10 390,200 295,105',
    labelPos: { x: 372, y: 75 },
    rashiPos: { x: 358, y: 95 },
    planetPos: { x: 345, y: 130 },
  },
  {
    num: 4,
    sign: 'Scorpio',
    rashiHi: 'Vrishchik',
    rashiAbbr: 'Vri (8)',
    domain: 'Mother, Home, Conveyance & Happiness',
    planets: [],
    polygon: '295,105 390,200 295,295 200,200',
    labelPos: { x: 360, y: 200 },
    rashiPos: { x: 335, y: 200 },
    planetPos: { x: 295, y: 200 },
  },
  {
    num: 5,
    sign: 'Sagittarius',
    rashiHi: 'Dhanu',
    rashiAbbr: 'Dha (9)',
    domain: 'Children, Intellect, Past Merits & Creativity',
    planets: [],
    polygon: '390,200 390,390 295,295',
    labelPos: { x: 372, y: 325 },
    rashiPos: { x: 358, y: 305 },
    planetPos: { x: 345, y: 270 },
  },
  {
    num: 6,
    sign: 'Capricorn',
    rashiHi: 'Makar',
    rashiAbbr: 'Mak (10)',
    domain: 'Health, Debts, Enemies & Daily Work',
    planets: [],
    polygon: '200,390 390,390 295,295',
    labelPos: { x: 285, y: 372 },
    rashiPos: { x: 310, y: 355 },
    planetPos: { x: 295, y: 335 },
  },
  {
    num: 7,
    sign: 'Aquarius',
    rashiHi: 'Kumbh',
    rashiAbbr: 'Kum (11)',
    domain: 'Spouse, Marriage, Business & Partnership',
    planets: [{ name: 'Sat', color: '#C8822A' }],
    polygon: '200,200 295,295 200,390 105,295',
    labelPos: { x: 200, y: 360 },
    rashiPos: { x: 200, y: 338 },
    planetPos: { x: 200, y: 275 },
  },
  {
    num: 8,
    sign: 'Pisces',
    rashiHi: 'Meen',
    rashiAbbr: 'Mee (12)',
    domain: 'Longevity, Sudden Events & Transformation',
    planets: [],
    polygon: '10,390 200,390 105,295',
    labelPos: { x: 115, y: 372 },
    rashiPos: { x: 90, y: 355 },
    planetPos: { x: 105, y: 335 },
  },
  {
    num: 9,
    sign: 'Aries',
    rashiHi: 'Mesh',
    rashiAbbr: 'Mes (1)',
    domain: 'Dharma, Fortune, Higher Wisdom & Father',
    planets: [{ name: 'Rah', color: 'rgba(232, 228, 220, 0.85)' }],
    polygon: '10,200 10,390 105,295',
    labelPos: { x: 28, y: 325 },
    rashiPos: { x: 42, y: 305 },
    planetPos: { x: 55, y: 270 },
  },
  {
    num: 10,
    sign: 'Taurus',
    rashiHi: 'Vrishabh',
    rashiAbbr: 'Vri (2)',
    domain: 'Career, Status, Honor & Public Life',
    planets: [{ name: 'Jup', color: '#2AABA8' }],
    polygon: '105,105 200,200 105,295 10,200',
    labelPos: { x: 40, y: 200 },
    rashiPos: { x: 65, y: 200 },
    planetPos: { x: 105, y: 200 },
  },
  {
    num: 11,
    sign: 'Gemini',
    rashiHi: 'Mithun',
    rashiAbbr: 'Mit (3)',
    domain: 'Gains, Income, Aspirations & Friends',
    planets: [{ name: 'Mar', color: '#C8822A' }],
    polygon: '10,10 10,200 105,105',
    labelPos: { x: 28, y: 75 },
    rashiPos: { x: 42, y: 95 },
    planetPos: { x: 55, y: 130 },
  },
  {
    num: 12,
    sign: 'Cancer',
    rashiHi: 'Kark',
    rashiAbbr: 'Kar (4)',
    domain: 'Subconscious, Isolation, Expenses & Moksha',
    planets: [{ name: 'Moo', color: '#2AABA8' }],
    polygon: '10,10 200,10 105,105',
    labelPos: { x: 115, y: 28 },
    rashiPos: { x: 90, y: 45 },
    planetPos: { x: 105, y: 65 },
  },
];

export default function NorthIndianChart() {
  const [hoveredHouse, setHoveredHouse] = useState(null);

  const activeHouseData = hoveredHouse ? houses.find((h) => h.num === hoveredHouse) : null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Chart SVG */}
      <div className="relative w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[380px] aspect-square select-none mx-auto">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(200,130,42,0.12)]"
        >
          {/* House Interactive Hit Areas (Polygons) */}
          {houses.map((h) => {
            const isHov = hoveredHouse === h.num;
            return (
              <polygon
                key={h.num}
                points={h.polygon}
                fill={isHov ? 'rgba(200, 130, 42, 0.16)' : 'rgba(255, 255, 255, 0.01)'}
                className="cursor-pointer transition-colors duration-200"
                onMouseEnter={() => setHoveredHouse(h.num)}
                onMouseLeave={() => setHoveredHouse(null)}
              />
            );
          })}

          {/* 100% Straight Line Geometry (Zero Circles, Zero Ellipses) */}
          <g fill="none" stroke="#C8822A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {/* 1. Outer Square */}
            <rect x="10" y="10" width="380" height="380" strokeWidth="1.8" strokeOpacity="0.85" />

            {/* 2. Full Diagonal (Top-Left to Bottom-Right) */}
            <line x1="10" y1="10" x2="390" y2="390" strokeOpacity="0.65" />

            {/* 3. Full Diagonal (Bottom-Left to Top-Right) */}
            <line x1="10" y1="390" x2="390" y2="10" strokeOpacity="0.65" />

            {/* 4. Center Kendra Diamond connecting 4 outer edge midpoints */}
            <polygon points="200,10 390,200 200,390 10,200" strokeWidth="1.6" strokeOpacity="0.8" />
          </g>

          {/* House Labels, Signs & Planets (Pure Text - Zero Glyph Circles) */}
          {houses.map((h) => {
            const isLagna = h.num === 1;
            return (
              <g key={`labels-${h.num}`} className="pointer-events-none">
                {/* House Number */}
                <text
                  x={h.labelPos.x}
                  y={h.labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isLagna ? '#C8822A' : 'rgba(232, 228, 220, 0.45)'}
                  fontSize="9.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isLagna ? 'bold' : 'normal'}
                >
                  H{h.num}
                </text>

                {/* Rashi Abbreviation & Number */}
                <text
                  x={h.rashiPos.x}
                  y={h.rashiPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(232, 228, 220, 0.38)"
                  fontSize="8.5"
                  fontFamily="system-ui, sans-serif"
                >
                  {h.rashiAbbr}
                </text>

                {/* Planet Text Labels */}
                {h.planets.length > 0 && (
                  <g>
                    {h.planets.map((p, pIdx) => {
                      const yOffset = h.planets.length > 1 ? (pIdx === 0 ? -8 : 8) : 0;
                      return (
                        <text
                          key={p.name}
                          x={h.planetPos.x}
                          y={h.planetPos.y + yOffset}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={p.color}
                          fontSize="11.5"
                          fontWeight="700"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          {p.name}
                        </text>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip upon House Hover */}
        <AnimatePresence>
          {activeHouseData && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-max max-w-[280px] p-2.5 rounded-lg shadow-xl text-center glass-card"
              style={{
                background: 'rgba(18, 21, 46, 0.96)',
                border: '1px solid rgba(200, 130, 42, 0.5)',
              }}
            >
              <div className="font-semibold text-xs text-[var(--col-copper)]">
                House {activeHouseData.num} • {activeHouseData.sign} ({activeHouseData.rashiHi})
              </div>
              <div className="text-[11px] text-[var(--col-moonstone)] mt-0.5">
                {activeHouseData.planets.length > 0
                  ? activeHouseData.planets.map((p) => p.name).join(', ')
                  : 'No Planets (Empty House)'}
              </div>
              <div className="text-[10px] text-[var(--col-moonstone-dim)] mt-0.5 italic">
                {activeHouseData.domain}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend & Current Lagna */}
      <div className="w-full mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)] space-y-2 text-center">
        {/* Row 1: Planet Type Color Legend (No bullet circles) */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--col-moonstone)' }}>
            <span style={{ color: '#2AABA8' }}>■</span> Benefic planets
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--col-moonstone)' }}>
            <span style={{ color: '#C8822A' }}>■</span> Malefic planets
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--col-moonstone)' }}>
            <span style={{ color: 'rgba(232, 228, 220, 0.85)' }}>■</span> Nodes (Rahu/Ketu)
          </span>
        </div>

        {/* Row 2: Lagna Highlight */}
        <div className="text-xs pt-1">
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium"
            style={{
              background: 'rgba(200, 130, 42, 0.12)',
              border: '1px solid rgba(200, 130, 42, 0.35)',
              color: 'var(--col-copper)',
            }}
          >
            ✦ Lagna: Leo (Simha) — 1st House
          </span>
        </div>
      </div>
    </div>
  );
}
