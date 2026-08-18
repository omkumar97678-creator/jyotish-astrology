import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function AspectCards() {
  const { lang } = useLang();

  const detailedAspects = [
    {
      icon: '♡',
      title: t.love[lang],
      value: 78,
      label: lang === 'hinglish' ? 'Shreshtha' : 'Good',
      text: lang === 'hinglish' ? 'Khulkar baat karne se rishte mein gehraai aayegi.' : 'An honest conversation deepens a bond today.',
      tip: lang === 'hinglish' ? 'Shubh: Naye sampark aur gehre samvaad' : 'Lucky for: New connections, deep conversations',
    },
    {
      icon: '★',
      title: t.career[lang],
      value: 85,
      label: lang === 'hinglish' ? 'Uttam' : 'Excellent',
      text: lang === 'hinglish' ? 'Haal hi ke parishram ka samman jald milne wala hai.' : 'Recognition for recent work is on its way.',
      tip: lang === 'hinglish' ? 'Shubh samay: Subah ka waqt. Bachen: Shaam 4 baje ke baad ki meeting' : 'Best time: Morning hours. Avoid: Post 4PM meetings',
    },
    {
      icon: '✦',
      title: t.health[lang],
      value: 64,
      label: lang === 'hinglish' ? 'Madhyam' : 'Average',
      text: lang === 'hinglish' ? 'Sanyam rakhein — aaram bhi karya jitna zaroori hai.' : 'Pace yourself — rest is as important as action.',
      tip: lang === 'hinglish' ? 'Dhyan dein: Jal grahan aur aaram. Vyayam: Halka yoga' : 'Focus on: Rest and hydration. Exercise: Light yoga preferred',
    },
    {
      icon: '₹',
      title: t.finance[lang],
      value: 72,
      label: lang === 'hinglish' ? 'Shreshtha' : 'Good',
      text: lang === 'hinglish' ? 'Sthir aay ke yog hain; bina soche kharch na karein.' : 'Steady gains; avoid impulsive spending tonight.',
      tip: lang === 'hinglish' ? 'Bachen: Udhaar dene se. Shubh: Lambi avadhi ke nivesh' : 'Avoid: Lending money today. Good for: Long-term investments',
    },
  ];

  const labelColor = (l) =>
    l === 'Excellent' || l === 'Uttam' ? 'var(--col-teal)' : l === 'Good' || l === 'Shreshtha' ? 'var(--col-copper)' : 'var(--col-moonstone-dim)';

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {detailedAspects.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card flex items-start gap-4"
          style={{ padding: 22 }}
        >
          <span style={{ fontSize: 24, color: 'var(--col-copper)' }}>{a.icon}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium" style={{ color: 'var(--col-moonstone)', fontSize: '1rem' }}>
                {a.title}
              </h3>
              <span className="text-xs font-semibold" style={{ color: labelColor(a.label) }}>
                {a.label}
              </span>
            </div>

            <div className="mt-2.5 relative" style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-full)' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${a.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--col-copper), var(--col-copper-light))',
                  borderRadius: 'var(--r-full)',
                }}
              />
            </div>

            <p className="mt-3 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {a.text}
            </p>

            <div
              className="mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)] text-[11px] font-medium"
              style={{ color: 'var(--col-copper)' }}
            >
              ✦ {a.tip}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}