import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Lucky() {
  const { lang } = useLang();

  const colors = [
    { name: lang === 'hinglish' ? 'Sunehra (Gold)' : 'Gold', hex: '#D4AF37' },
    { name: lang === 'hinglish' ? 'Baingani (Purple)' : 'Purple', hex: '#7C5BA8' },
    { name: lang === 'hinglish' ? 'Hara (Green)' : 'Green', hex: '#3FA86A' },
  ];

  const cards = [
    {
      title: lang === 'hinglish' ? 'Shubh Ank (Lucky Numbers)' : 'Lucky Numbers',
      type: 'numbers',
      values: [3, 7, 21]
    },
    {
      title: lang === 'hinglish' ? 'Shubh Rang (Lucky Colors)' : 'Lucky Colors',
      type: 'colors',
      values: colors
    },
    {
      title: lang === 'hinglish' ? 'Shubh Din (Lucky Day)' : 'Lucky Day',
      type: 'day',
      value: lang === 'hinglish' ? 'Guruwar (Thursday)' : 'Thursday',
      icon: '♃'
    },
    {
      title: lang === 'hinglish' ? 'Shubh Ratna (Gemstone)' : 'Lucky Gemstone',
      type: 'gem',
      value: lang === 'hinglish' ? 'Pukhraj (Yellow Sapphire)' : 'Yellow Sapphire',
      desc: lang === 'hinglish' ? 'Brihaspati ko balwan karne aur gyaan badhane ke liye dharan karein.' : 'Worn to strengthen Jupiter and invite wisdom.'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
          {t.lucky_title[lang]}
        </div>
        <div className="font-display mt-1 mb-5" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.95rem' }}>
          {lang === 'hinglish' ? 'शुभ तत्व — वैदिक गणना' : 'Auspicious Elements'}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card"
            style={{ padding: 22, borderLeft: '3px solid var(--col-copper)' }}
          >
            <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>{c.title}</div>

            {c.type === 'numbers' && (
              <div className="mt-3 flex flex-wrap gap-2">
                {c.values.map((n) => (
                  <span
                    key={n}
                    className="font-mono-num"
                    style={{
                      color: 'var(--col-copper)',
                      background: 'rgba(200,130,42,0.12)',
                      border: '1px solid rgba(200,130,42,0.35)',
                      borderRadius: 'var(--r-full)',
                      padding: '5px 14px',
                      fontSize: '1rem',
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

            {c.type === 'colors' && (
              <div className="mt-3 flex flex-wrap gap-4">
                {c.values.map((co) => (
                  <div key={co.name} className="flex items-center gap-2">
                    <span style={{ width: 16, height: 16, borderRadius: '9999px', background: co.hex, boxShadow: `0 0 10px ${co.hex}` }} />
                    <span className="text-sm" style={{ color: 'var(--col-moonstone)' }}>{co.name}</span>
                  </div>
                ))}
              </div>
            )}

            {c.type === 'day' && (
              <div className="mt-3 flex items-center gap-2">
                <span style={{ color: 'var(--col-copper)', fontSize: 20 }}>{c.icon}</span>
                <span className="font-display" style={{ color: 'var(--col-moonstone)', fontSize: '1.3rem' }}>{c.value}</span>
              </div>
            )}

            {c.type === 'gem' && (
              <div className="mt-3">
                <div className="font-display" style={{ color: 'var(--col-moonstone)', fontSize: '1.3rem' }}>{c.value}</div>
                <p className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}