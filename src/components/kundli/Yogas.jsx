import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Yogas({ yogas }) {
  const { lang } = useLang();

  const defaultYogas = [
    {
      name: 'Gajakesari Yoga (गजकेसरी योग)',
      desc: 'Jupiter in angular house from Moon — brings wisdom, leadership and prosperity.',
      descHinglish: 'Chandrama se kendra mein Guru — gyaan, uchh maan-samman aur aarthik samriddhi dilata hai.',
      level: 'Maha Raj Yoga (प्रबल)',
    },
    {
      name: 'Budhaditya Yoga (बुधादित्य योग)',
      desc: 'Sun and Mercury conjunction — sharp intellect, persuasive speech and executive clarity.',
      descHinglish: 'Surya aur Budh ki yuti — tezz buddhi, nipunata aur prabhavshali communication pradan karti hai.',
      level: 'Nipunata Yoga (प्रबल)',
    },
    {
      name: 'Dharma-Karmadhipati Yoga (राज योग)',
      desc: 'Alignment of 9th and 10th lords — grants continuous career ascent and recognition.',
      descHinglish: 'Navam aur Dasham bhav ke swami ka sanyog — nirantar career vriddhi aur samajik pratishtha dilata hai.',
      level: 'Raj Yoga (शुभ)',
    },
  ];

  const list = yogas && yogas.length > 0 ? yogas : defaultYogas;

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
          const desc =
            lang === 'hinglish'
              ? y.descHinglish || y.descHi || y.desc
              : y.desc;

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
                  {y.status || y.type || y.level || (lang === 'hinglish' ? 'शुभ योग' : 'Auspicious')}
                </span>
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                {desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}