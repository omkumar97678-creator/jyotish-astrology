import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import KundliChart from '@/components/KundliChart';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

const floaters = [
  { s: '☉', top: '15%', left: '4%', d: '4s' },
  { s: '☽', top: '25%', right: '6%', d: '5s' },
  { s: '♂', top: '65%', left: '5%', d: '6s' },
  { s: '♃', top: '20%', right: '18%', d: '4.5s' },
  { s: '♄', top: '70%', right: '5%', d: '5.5s' },
];

const up = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Hero() {
  const { lang } = useLang();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.96]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 1, animation: 'rotate 80s linear infinite' }}
      >
        <div className="w-[85vw] max-w-[600px] sm:max-w-[700px] aspect-square flex items-center justify-center">
          <KundliChart size={600} opacity={0.08} />
        </div>
      </div>

      {/* Floating Planet Symbols */}
      {floaters.map((f, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute select-none pointer-events-none hidden xs:inline-block"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            bottom: f.bottom,
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: '#C8822A',
            opacity: 0.55,
            textShadow: '0 0 16px rgba(200, 130, 42, 0.4)',
            animation: `float ${f.d} ease-in-out infinite`,
            zIndex: 2,
          }}
        >
          {f.s}
        </span>
      ))}

      {/* Main Content */}
      <motion.div style={{ opacity, scale, zIndex: 10 }} className="relative text-center max-w-2xl w-full">
        <motion.div
          {...up(0.3)}
          className="inline-block text-[11px] sm:text-xs tracking-widest rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8"
          style={{ color: 'var(--col-copper)', border: '1px solid rgba(200,130,42,0.35)', background: 'rgba(200,130,42,0.06)' }}
        >
          {t.hero_badge[lang]}
        </motion.div>

        <motion.h1
          {...up(0.4)}
          className="font-display leading-none tracking-tight"
          style={{ fontSize: 'clamp(54px, 16vw, 132px)', color: 'var(--col-moonstone)' }}
        >
          ज्योतिष
        </motion.h1>

        <motion.h2
          {...up(0.5)}
          className="mt-3 sm:mt-4 font-light px-2"
          style={{ fontSize: 'clamp(18px, 4.5vw, 36px)', color: 'var(--col-moonstone-dim)' }}
        >
          {t.hero_subtitle[lang]}
        </motion.h2>

        <motion.p
          {...up(0.6)}
          className="mx-auto mt-4 sm:mt-6 text-sm sm:text-base px-3"
          style={{ color: 'var(--col-moonstone-dim)', maxWidth: 480, lineHeight: 1.7 }}
        >
          {t.hero_body[lang]}
        </motion.p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 px-4">
          <motion.div {...up(0.7)} className="w-full sm:w-auto">
            <Link
              to="/onboarding"
              className="btn-primary w-full sm:w-auto justify-center text-center py-4 px-8 sm:px-10 text-sm sm:text-base"
              style={{ boxShadow: '0 0 40px rgba(200,130,42,0.35)' }}
            >
              <span style={{ color: '#0D0F2B' }}>✦</span> {t.hero_cta[lang]}
            </Link>
          </motion.div>
          <motion.a {...up(0.8)} href="#features" className="btn-ghost w-full sm:w-auto text-center justify-center py-3.5 px-6 text-sm">
            {t.hero_learn[lang]}
          </motion.a>
        </div>

        {/* Trust Points */}
        <motion.div
          {...up(1.0)}
          className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-xs"
          style={{ color: 'rgba(232,228,220,0.45)' }}
        >
          <span>✓ {t.hero_trust1[lang]}</span>
          <span>•</span>
          <span>✓ {t.hero_trust2[lang]}</span>
          <span>•</span>
          <span>✓ {t.hero_trust3[lang]}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}