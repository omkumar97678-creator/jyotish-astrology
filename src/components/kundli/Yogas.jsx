import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Yogas({ yogas }) {
  const { lang } = useLang();

  const list = yogas && yogas.length > 0 ? yogas : [
    {
      name: 'Gaj Kesari Yoga',
      desc: lang === 'hinglish' ? 'Chandrama se kendra mein Guru — gyaan aur samriddhi lata hai' : 'Jupiter in angular house from Moon — brings wisdom and prosperity',
      level: 'Very Auspicious',
    },
    {
      name: 'Budhaditya Yoga',
      desc: lang === 'hinglish' ? 'Surya aur Budh ki yuti — teez buddhi aur communication' : 'Sun and Mercury conjunction — sharp intellect and communication',
      level: 'Strong',
    },
    {
      name: 'Lakshmi Yoga',
      desc: lang === 'hinglish' ? 'Shubh grah kendra mein — samriddhi aur maan-samman' : 'Auspicious Kendra alignment — brings prosperity and honor',
      level: 'Auspicious',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-xs uppercase mb-5" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        {t.yogas_title[lang]}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {list.map((y, i) => {
          return (
            <motion.div
              key={y.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: 22, borderLeft: '3px solid var(--col-copper)' }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 style={{ color: 'var(--col-copper)', fontSize: '1.05rem', fontWeight: 600 }}>{y.name}</h3>
                <span
                  className="text-xs px-2.5 py-1 whitespace-nowrap"
                  style={{
                    color: 'var(--col-teal)',
                    background: 'rgba(42,171,168,0.1)',
                    border: '1px solid rgba(42,171,168,0.35)',
                    borderRadius: 'var(--r-full)',
                  }}
                >
                  {y.level || (lang === 'hinglish' ? 'शुभ योग' : 'Auspicious')}
                </span>
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                {y.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}