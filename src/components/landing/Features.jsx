import React from 'react';
import { motion } from 'framer-motion';
import SectionHead from './SectionHead';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Features() {
  const { lang } = useLang();

  const features = [
    { icon: '☸', title: t.feature1_title[lang], desc: t.feature1_desc[lang] },
    { icon: '∑', title: t.feature2_title[lang], desc: t.feature2_desc[lang] },
    { icon: '⚭', title: t.feature3_title[lang], desc: t.feature3_desc[lang] },
    { icon: '☽', title: t.feature4_title[lang], desc: t.feature4_desc[lang] },
    { icon: '◉', title: t.feature5_title[lang], desc: t.feature5_desc[lang] },
    { icon: '☰', title: t.feature6_title[lang], desc: t.feature6_desc[lang] },
  ];

  return (
    <section id="features" className="relative pt-10 pb-28 px-5" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <SectionHead label={t.features_label[lang]} title={t.features_title[lang]} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(200,130,42,0.35)',
                boxShadow: '0 0 32px rgba(200,130,42,0.12)',
              }}
              className="glass-card"
              style={{ padding: 28 }}
            >
              <span
                style={{
                  width: '56px',
                  height: '56px',
                  fontSize: '32px',
                  color: '#C8822A',
                  background: 'rgba(200,130,42,0.1)',
                  border: '1px solid rgba(200,130,42,0.25)',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  lineHeight: 1,
                }}
              >
                {f.icon}
              </span>
              <h3 className="font-semibold" style={{ fontSize: '1.2rem', color: 'var(--col-moonstone)' }}>
                {f.title}
              </h3>
              <p className="mt-3" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                {f.desc}
              </p>
              <div className="mt-5 text-sm font-medium" style={{ color: 'var(--col-copper)' }}>
                {t.learn_more[lang]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}