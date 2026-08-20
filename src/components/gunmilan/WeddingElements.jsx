import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function WeddingElements({ calculatedData }) {
  const { lang } = useLang();

  // Derive auspicious colors based on Rashi elements
  const colors = [
    { name: lang === 'hinglish' ? 'Kesar / Peela (Gold)' : 'Sacred Saffron / Gold', dot: '#EAB308' },
    { name: lang === 'hinglish' ? 'Tamra / Laal (Coral)' : 'Warm Copper / Coral', dot: '#C8822A' },
    { name: lang === 'hinglish' ? 'Emerald Panna' : 'Emerald Teal', dot: '#2AABA8' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div>
        <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
          {lang === 'hinglish' ? 'Shubh Vivah Tatva & Muhurat' : 'Auspicious Wedding Elements'}
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          शुभ विवाह तत्व एवं मुहूर्त संकेत
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Card 1: Lucky Wedding Colors */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{ padding: 22 }}
        >
          <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            {lang === 'hinglish' ? 'Shubh Vastra Ke Rang (Lucky Colors)' : 'Lucky Wedding Attire Colors'}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium" style={{ color: 'var(--col-moonstone)' }}>
            {colors.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1.5">
                <span>{c.name}</span>
                <span style={{ color: c.dot, fontSize: '0.9rem' }}>●</span>
              </span>
            ))}
          </div>
          <div className="mt-2 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            {lang === 'hinglish'
              ? 'Mukhya vivah rasmon ke dauran kaale (black) aur dark grey rangon se bachein.'
              : 'Avoid dark shades like black or dark grey during primary rituals.'}
          </div>
        </motion.div>

        {/* Card 2: Auspicious Wedding Directions & Days */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
          style={{ padding: 22 }}
        >
          <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em' }}>
            {lang === 'hinglish' ? 'Shubh Din & Mandap Disha' : 'Auspicious Days & Muhurat Direction'}
          </div>
          <div className="text-sm font-medium" style={{ color: 'var(--col-moonstone)' }}>
            {lang === 'hinglish' ? 'Brihaspativar (Guruvar) & Shukravar' : 'Thursday (Brihaspativar) & Friday (Shukravar)'}
          </div>
          <div className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            {lang === 'hinglish' ? 'Shubh Mandap Disha: ' : 'Favorable Mandap Direction: '}
            <span style={{ color: 'var(--col-copper)', fontWeight: 600 }}>
              {lang === 'hinglish' ? 'Ishanya Disha (North-East)' : 'North-East (Ishanya)'}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
