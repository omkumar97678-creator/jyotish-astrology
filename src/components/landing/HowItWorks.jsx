import React from 'react';
import { motion } from 'framer-motion';
import SectionHead from './SectionHead';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HowItWorks() {
  const { lang } = useLang();

  const steps = [
    { n: '01', title: t.step1_title[lang], desc: t.step1_desc[lang] },
    { n: '02', title: t.step2_title[lang], desc: t.step2_desc[lang] },
    { n: '03', title: t.step3_title[lang], desc: t.step3_desc[lang] },
  ];

  return (
    <section className="relative py-24 px-5" style={{ background: 'var(--col-midnight-lift)', zIndex: 10 }}>
      <div className="max-w-5xl mx-auto">
        <SectionHead label={t.process_label[lang]} title={t.process_title[lang]} />
        <div className="relative grid gap-12 md:grid-cols-3">
          <div
            className="hidden md:block absolute left-[16%] right-[16%] top-[30px]"
            style={{ borderTop: '1px dashed rgba(200,130,42,0.25)' }}
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative text-center"
            >
              <div
                className="mx-auto flex items-center justify-center font-mono-num"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '9999px',
                  border: '1px solid rgba(200,130,42,0.3)',
                  background: 'rgba(200,130,42,0.1)',
                  color: 'var(--col-copper)',
                }}
              >
                {s.n}
              </div>
              <h3 className="mt-5 font-semibold" style={{ fontSize: '1.1rem', color: 'var(--col-moonstone)' }}>
                {s.title}
              </h3>
              <p className="mt-2" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}