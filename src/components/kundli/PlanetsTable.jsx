import React from 'react';
import { motion } from 'framer-motion';

const planets = [
  { sym: '☉', name: 'Sun (सूर्य)', sign: 'Leo', house: '1', deg: '14°22′' },
  { sym: '☽', name: 'Moon (चंद्र)', sign: 'Cancer', house: '12', deg: '02°08′' },
  { sym: '♂', name: 'Mars (मंगल)', sign: 'Gemini', house: '11', deg: '19°47′' },
  { sym: '☿', name: 'Mercury (बुध)', sign: 'Virgo', house: '2', deg: '08°33′' },
  { sym: '♃', name: 'Jupiter (गुरु)', sign: 'Taurus', house: '10', deg: '27°51′' },
  { sym: '♀', name: 'Venus (शुक्र)', sign: 'Leo', house: '1', deg: '04°16′' },
  { sym: '♄', name: 'Saturn (शनि)', sign: 'Aquarius', house: '7', deg: '21°09′' },
  { sym: '☊', name: 'Rahu (राहु)', sign: 'Aries', house: '9', deg: '16°40′' },
  { sym: '☋', name: 'Ketu (केतु)', sign: 'Libra', house: '3', deg: '16°40′' },
];

export default function PlanetsTable() {
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
          ग्रह स्थिति
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
            {planets.map((p) => (
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