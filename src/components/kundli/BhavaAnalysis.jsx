import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function BhavaAnalysis({ houses = [] }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const list =
    houses && houses.length > 0
      ? houses.map((h, idx) => {
          const num = h.number || h.num || idx + 1;
          const sign = h.sign || h.rashi?.name || 'Aries';
          const rashiHi = h.rashiHi || h.rashi?.hindi || 'Mesh';
          const ruler = h.ruler || h.lord || h.rashi?.lord || 'Mars';
          const sk = h.sk || `Bhava ${num}`;
          const domain = h.domain || 'Key Life Domain';

          let planetDisplay = 'Rikt (Empty)';
          if (h.planetDisplay) {
            planetDisplay = h.planetDisplay;
          } else if (h.planets && h.planets.length > 0) {
            planetDisplay =
              typeof h.planets[0] === 'string'
                ? h.planets.join(', ')
                : h.planets.map((p) => p.name || p.label).join(', ');
          }

          const reading =
            h.reading ||
            `${sign} (${rashiHi}) in House ${num}, ruled by ${ruler}. Influencing ${domain.toLowerCase()}.`;

          return {
            num,
            n: h.n || `${num}th`,
            sk,
            domain,
            sign,
            rashiHi,
            ruler,
            planetDisplay,
            reading,
          };
        })
      : [
          { num: 1, n: '1st', sk: 'Tanu Bhava (तनु भाव / लग्न भाव)', domain: 'Self & Vitality', sign: 'Scorpio', rashiHi: 'Vrishchik', ruler: 'Mars', planetDisplay: 'Rikt (Empty)', reading: 'Scorpio in 1st House ruled by Mars. Magnetic willpower, deep perception, and transformative physical resilience.' },
          { num: 2, n: '2nd', sk: 'Dhana Bhava (धन भाव / कुटुम्ब भाव)', domain: 'Wealth & Family', sign: 'Sagittarius', rashiHi: 'Dhanu', ruler: 'Jupiter', planetDisplay: 'Rikt (Empty)', reading: 'Sagittarius in 2nd House ruled by Jupiter. Generous values, truthful speech, and financial growth through ethical wisdom.' },
          { num: 3, n: '3rd', sk: 'Sahaja Bhava (सहज भाव / पराक्रम भाव)', domain: 'Courage & Siblings', sign: 'Capricorn', rashiHi: 'Makar', ruler: 'Saturn', planetDisplay: 'Rikt (Empty)', reading: 'Capricorn in 3rd House ruled by Saturn. Steadfast perseverance, disciplined efforts, and strategic communication.' },
          { num: 4, n: '4th', sk: 'Sukha Bhava (सुख भाव / मातृ भाव)', domain: 'Home & Peace', sign: 'Aquarius', rashiHi: 'Kumbh', ruler: 'Saturn', planetDisplay: 'Rikt (Empty)', reading: 'Aquarius in 4th House ruled by Saturn. Deep internal emotional independence, structured home life, and humanitarian mindset.' },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-xs uppercase mb-1" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        {t.bhava_title[lang]}
      </div>
      <div className="font-display mb-5" style={{ color: 'var(--col-moonstone)', fontSize: '1.5rem' }}>
        भाव विश्लेषण (12 Houses Analysis)
        <span className="font-body block mt-1" style={{ fontSize: '0.85rem', color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
          {t.bhava_subtitle[lang]}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.slice(0, 4).map((h, i) => (
          <motion.div
            key={`bhava-${h.num}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
            whileHover={{ borderColor: 'rgba(200,130,42,0.45)', boxShadow: '0 0 24px rgba(200,130,42,0.12)' }}
            className="glass-card"
            style={{ padding: 18 }}
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="font-mono-num font-semibold" style={{ color: 'var(--col-copper)' }}>
                {h.n} House • {h.sign} ({h.rashiHi})
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,130,42,0.1)', color: 'var(--col-copper)' }}>
                Lord: {h.ruler}
              </span>
            </div>
            <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{h.sk}</div>
            <div className="mt-1.5 font-medium" style={{ color: 'var(--col-moonstone)', fontSize: '0.95rem' }}>
              {h.domain}
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--col-teal)' }}>
              Planets: <span className="font-medium">{h.planetDisplay}</span>
            </div>
            <p className="mt-2 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {h.reading}
            </p>
          </motion.div>
        ))}

        <AnimatePresence>
          {open && (
            <div className="contents">
              {list.slice(4).map((h, i) => (
                <motion.div
                  key={`bhava-${h.num}-${i + 4}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
                  whileHover={{ borderColor: 'rgba(200,130,42,0.45)', boxShadow: '0 0 24px rgba(200,130,42,0.12)' }}
                  className="glass-card"
                  style={{ padding: 18 }}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-mono-num font-semibold" style={{ color: 'var(--col-copper)' }}>
                      {h.n} House • {h.sign} ({h.rashiHi})
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,130,42,0.1)', color: 'var(--col-copper)' }}>
                      Lord: {h.ruler}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{h.sk}</div>
                  <div className="mt-1.5 font-medium" style={{ color: 'var(--col-moonstone)', fontSize: '0.95rem' }}>
                    {h.domain}
                  </div>
                  <div className="mt-2 text-xs" style={{ color: 'var(--col-teal)' }}>
                    Planets: <span className="font-medium">{h.planetDisplay}</span>
                  </div>
                  <p className="mt-2 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                    {h.reading}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="btn-ghost cursor-pointer"
          style={{ color: 'var(--col-copper)', borderColor: 'rgba(200,130,42,0.35)' }}
        >
          {open
            ? (lang === 'hinglish' ? 'Pehle 4 ghar dikhao ↑' : 'Show first 4 houses ↑')
            : (lang === 'hinglish' ? 'Sabhi 12 ghar dekhein (Show all 12 houses) ↓' : t.show_all_houses[lang])}
        </button>
      </div>
    </motion.div>
  );
}