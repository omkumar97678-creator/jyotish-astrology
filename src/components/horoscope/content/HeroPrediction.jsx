import React from 'react';
import { motion } from 'framer-motion';
import ZodiacIcon from '@/components/ZodiacIcon';
import Stars from './Stars';
import { signs } from '../horoData';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HeroPrediction({ selected }) {
  const { lang } = useLang();
  const s = signs[selected] || signs[0];

  const pred =
    s.prediction ||
    `Today brings a surge of cosmic vitality for ${s.en}. Focus on strategic moves and trust your intuition. High energy around collaborations will yield unexpected blessings.`;

  const timeBlocks = [
    {
      emoji: '🌅',
      title: t.morning[lang],
      time: '6 AM – 12 PM',
      desc: lang === 'hinglish' ? 'Naye irade aur focused dhyan ke liye uttam urja.' : 'High mental clarity, best for planning and setting intentions.',
    },
    {
      emoji: '☀️',
      title: t.afternoon[lang],
      time: '12 PM – 6 PM',
      desc: lang === 'hinglish' ? 'Teamwork, meeting aur execution ke liye shreshtha.' : 'Productive collaborations, swift decision-making.',
    },
    {
      emoji: '🌙',
      title: t.evening[lang],
      time: '6 PM – 10 PM',
      desc: lang === 'hinglish' ? 'Aatmik shanti, vishram aur parivar ke saath samay.' : 'Time to wind down, reflect, and spend with loved ones.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card text-center p-5 sm:p-9"
    >
      {/* Symbol & Titles */}
      <div className="flex justify-center items-center py-2">
        <ZodiacIcon
          sign={s.en}
          size={84}
          style={{
            color: '#C8822A',
            filter: 'drop-shadow(0 0 24px rgba(200, 130, 42, 0.45))',
          }}
        />
      </div>

      <div className="mt-4 font-display" style={{ fontSize: '1.6rem', color: 'var(--col-moonstone)' }}>
        {s.en} <span style={{ color: 'var(--col-moonstone-dim)', fontWeight: 400 }}>• {s.range}</span>
      </div>

      <div className="mt-1.5 text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>
        {s.hi} Rashi &nbsp;•&nbsp; {s.element} Sign &nbsp;•&nbsp; Ruled by {s.ruler}
      </div>

      <div className="mt-3.5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'var(--col-glass)',
            border: '1px solid rgba(200, 130, 42, 0.4)',
            color: 'var(--col-copper)',
          }}
        >
          {s.elementBadge}
        </span>
      </div>

      <div className="mt-5">
        <Stars filled={4} />
      </div>

      <p className="mt-6 mx-auto text-sm" style={{ color: 'var(--col-moonstone-dim)', maxWidth: 540, lineHeight: 1.8 }}>
        {pred}
      </p>

      {/* A) Overall Energy Bar */}
      <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-left max-w-xl mx-auto">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-semibold uppercase tracking-wider" style={{ color: 'var(--col-copper)' }}>
            {t.energy_level[lang]}
          </span>
          <span className="font-mono-num font-bold text-sm" style={{ color: 'var(--col-copper)' }}>
            78%
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '78%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--col-copper) 0%, var(--col-copper-light) 100%)',
              boxShadow: '0 0 12px rgba(200, 130, 42, 0.45)',
            }}
          />
        </div>
        <div className="flex justify-between text-[11px] mt-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
          <span>{lang === 'hinglish' ? 'Kam' : 'Low'}</span>
          <span>{lang === 'hinglish' ? 'Madhyam' : 'Moderate'}</span>
          <span>{lang === 'hinglish' ? 'Uccha' : 'High'}</span>
        </div>
      </div>

      {/* B) Time-wise Predictions */}
      <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-left">
        <div className="text-xs uppercase mb-4 font-semibold tracking-wider text-center sm:text-left" style={{ color: 'var(--col-copper)' }}>
          {t.day_unfolds[lang]}
        </div>

        <div className="grid gap-3.5 md:grid-cols-3">
          {timeBlocks.map((tb, i) => (
            <motion.div
              key={tb.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-4 rounded-xl flex flex-col justify-between"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--col-glass-border)',
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{tb.emoji}</span>
                  <span className="text-[11px] font-mono-num" style={{ color: 'var(--col-copper)' }}>
                    {tb.time}
                  </span>
                </div>
                <div className="font-semibold text-sm mt-2" style={{ color: 'var(--col-moonstone)' }}>
                  {tb.title}
                </div>
                <p className="text-xs mt-1.5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                  {tb.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}