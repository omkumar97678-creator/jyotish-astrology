import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function FinalCta() {
  const { lang } = useLang();

  return (
    <section className="relative py-32 px-5 text-center" style={{ zIndex: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 58px)', color: 'var(--col-moonstone)' }}>
          {t.final_cta_title[lang]}
        </h2>
        <p className="mt-5" style={{ color: 'var(--col-moonstone-dim)' }}>
          {t.final_cta_body[lang]}
        </p>
        <Link
          to="/onboarding"
          className="btn-primary animate-glow-pulse mt-10"
          style={{ padding: '18px 52px', fontSize: '1.1rem' }}
        >
          <span style={{ color: '#0D0F2B' }}>✦</span> {t.final_cta_btn[lang]}
        </Link>
      </motion.div>
    </section>
  );
}