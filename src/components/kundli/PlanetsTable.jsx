import React from 'react';
import { motion } from 'framer-motion';

const defaultPlanets = [
  { sym: '☉', name: 'Sun (सूर्य)', sign: 'Leo (Simha)', house: '10', deg: '142.05°' },
  { sym: '☽', name: 'Moon (चंद्र)', sign: 'Gemini (Mithun)', house: '7', deg: '69.64°' },
  { sym: '♂', name: 'Mars (मंगल)', sign: 'Leo (Simha)', house: '10', deg: '148.58°' },
  { sym: '☿', name: 'Mercury (बुध)', sign: 'Taurus (Vrishabh)', house: '6', deg: '33.44°' },
  { sym: '♃', name: 'Jupiter (गुरु)', sign: 'Virgo (Kanya)', house: '10', deg: '152.75°' },
  { sym: '♀', name: 'Venus (शुक्र)', sign: 'Aries (Mesh)', house: '6', deg: '20.55°' },
  { sym: '♄', name: 'Saturn (शनि)', sign: 'Gemini (Mithun)', house: '8', deg: '83.35°' },
  { sym: '☊', name: 'Rahu (राहु)', sign: 'Aries (Mesh)', house: '5', deg: '10.52°' },
  { sym: '☋', name: 'Ketu (केतु)', sign: 'Libra (Tula)', house: '11', deg: '190.52°' },
];

export default function PlanetsTable({ planets = null }) {
  const list =
    planets && typeof planets === 'object' && !Array.isArray(planets)
      ? Object.entries(planets).map(([name, data]) => ({
          name,
          sym: data.symbol || '☉',
          sign: data.sign || 'Aries',
          house: data.house || 1,
          deg: data.degree || '0.00°',
        }))
      : Array.isArray(planets) && planets.length > 0
      ? planets
      : defaultPlanets;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24 }}
    >
      <div>
        <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
          Planetary Positions
        </div>
        <div className="font-display mt-1 mb-4" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.95rem' }}>
          ग्रह स्थिति (Astronomical Sidereal Longitude)
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ color: 'var(--col-moonstone)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--col-glass-border)' }}>
              <th className="text-left font-normal pb-2" style={{ color: 'var(--col-moonstone-dim)' }}>Planet</th>
              <th className="text-left font-normal pb-2" style={{ color: 'var(--col-moonstone-dim)' }}>Sign</th>
              <th className="text-left font-normal pb-2" style={{ color: 'var(--col-moonstone-dim)' }}>House</th>
              <th className="text-right font-normal pb-2" style={{ color: 'var(--col-moonstone-dim)' }}>Degree</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td className="py-2.5 flex items-center gap-2">
                  <span style={{ color: 'var(--col-copper)' }}>{p.sym}</span>
                  <span>{p.name}</span>
                </td>
                <td className="py-2.5">{p.sign}</td>
                <td className="py-2.5 font-mono-num" style={{ color: 'var(--col-moonstone-dim)' }}>{p.house}</td>
                <td className="py-2.5 text-right font-mono-num" style={{ color: 'var(--col-moonstone-dim)' }}>{p.deg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}