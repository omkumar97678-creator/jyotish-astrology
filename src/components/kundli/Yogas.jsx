import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Yogas() {
  const { lang } = useLang();

  const yogas = [
    {
      name: 'Gaj Kesari Yoga',
      desc: lang === 'hinglish' ? 'Chandrama se kendra mein Guru — gyaan aur samriddhi lata hai' : 'Jupiter in angular house from Moon — brings wisdom and prosperity',
      badge: lang === 'hinglish' ? 'Shubh' : 'Benefic'
    },
    {
      name: 'Budhaditya Yoga',
      desc: lang === 'hinglish' ? 'Surya aur Budh ki yuti — teez buddhi aur communication' : 'Sun and Mercury conjunction — sharp intellect and communication',
      badge: lang === 'hinglish' ? 'Shubh' : 'Benefic'
    },
    {
      name: 'Shasha Yoga',
      desc: lang === 'hinglish' ? 'Shani swarashi mein — anushasan aur lambi safalta' : 'Saturn in own sign — discipline and long-term success',
      badge: lang === 'hinglish' ? 'Shaktishaali' : 'Powerful'
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
        {yogas.map((y, i) => {
          const powerful = y.badge === 'Powerful' || y.badge === 'Shaktishaali';
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
                    color: powerful ? 'var(--col-copper)' : 'var(--col-teal)',
                    background: powerful ? 'rgba(200,130,42,0.1)' : 'rgba(42,171,168,0.1)',
                    border: `1px solid ${powerful ? 'rgba(200,130,42,0.35)' : 'rgba(42,171,168,0.35)'}`,
                    borderRadius: 'var(--r-full)',
                  }}
                >
                  {y.badge}
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