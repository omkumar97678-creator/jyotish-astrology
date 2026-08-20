import React from 'react';
import { motion } from 'framer-motion';
import ZodiacIcon from '@/components/ZodiacIcon';
import Stars from './Stars';
import { SIGNS_DATA, signs } from '../horoData';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HeroPrediction({ selected, data }) {
  const { lang } = useLang();

  const selectedSign = signs[selected]?.en || data?.sign?.en || data?.sign?.name || 'Aries';
  const signInfo = SIGNS_DATA[selectedSign] || SIGNS_DATA['Aries'];

  const signDates = signInfo.dates;
  const signElement = signInfo.element;
  const signEmoji = signInfo.emoji;
  const signHindi = signInfo.hindi;
  const signRuled = signInfo.ruled;

  const pred =
    data?.prediction ||
    `Today brings a surge of cosmic vitality for ${selectedSign}. Focus on strategic moves and trust your intuition. High energy around collaborations will yield unexpected blessings.`;

  const energy = data?.energyLevel || 78;

  const timeBlocks = [
    {
      emoji: '🌅',
      title: t.morning[lang],
      time: '6 AM – 12 PM',
      desc: data?.timeBreakdown?.morning || (lang === 'hinglish' ? 'Naye irade aur focused dhyan ke liye uttam urja.' : 'High mental clarity, best for planning and setting intentions.'),
    },
    {
      emoji: '☀️',
      title: t.afternoon[lang],
      time: '12 PM – 6 PM',
      desc: data?.timeBreakdown?.afternoon || (lang === 'hinglish' ? 'Teamwork, meeting aur execution ke liye shreshtha.' : 'Productive collaborations, swift decision-making.'),
    },
    {
      emoji: '🌙',
      title: t.evening[lang],
      time: '6 PM – 10 PM',
      desc: data?.timeBreakdown?.evening || (lang === 'hinglish' ? 'Aatmik shanti, vishram aur parivar ke saath samay.' : 'Time to wind down, reflect, and spend with loved ones.'),
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
          sign={selectedSign}
          size={84}
          style={{
            color: '#C8822A',
            filter: 'drop-shadow(0 0 24px rgba(200, 130, 42, 0.45))',
          }}
        />
      </div>

      <div className="mt-4 font-display" style={{ fontSize: '1.6rem', color: 'var(--col-moonstone)' }}>
        {selectedSign} <span style={{ color: 'var(--col-moonstone-dim)', fontWeight: 400 }}>• {signDates}</span>
      </div>

      <div className="mt-1.5 text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>
        {signHindi} Rashi &nbsp;•&nbsp; {signElement} Sign &nbsp;•&nbsp; Ruled by {signRuled}
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
          {signEmoji} {signElement}
        </span>
      </div>

      <div className="mt-5">
        <Stars filled={energy >= 85 ? 5 : energy >= 70 ? 4 : 3} />
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
            {energy}%
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${energy}%` }}
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
        <div className="grid gap-3 sm:grid-cols-3">
          {timeBlocks.map((b) => (
            <div
              key={b.title}
              className="p-3.5 rounded-xl text-left"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--col-glass-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 18 }}>{b.emoji}</span>
                <span className="text-[11px] font-mono-num" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {b.time}
                </span>
              </div>
              <div className="mt-2 font-semibold text-xs" style={{ color: 'var(--col-moonstone)' }}>
                {b.title}
              </div>
              <p className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.55 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}