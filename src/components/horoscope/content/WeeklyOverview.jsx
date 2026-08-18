import React from 'react';
import { motion } from 'framer-motion';
import { signs } from '../horoData';

export default function WeeklyOverview({ selected }) {
  const s = signs[selected] || signs[0];

  const days = [
    { day: 'Mon', date: '18', stars: 3, dotColor: 'var(--col-copper)', isToday: false, isBest: false },
    { day: 'Tue', date: '19', stars: 4, dotColor: 'var(--col-teal)', isToday: true, isBest: false },
    { day: 'Wed', date: '20', stars: 5, dotColor: 'var(--col-teal)', isToday: false, isBest: true },
    { day: 'Thu', date: '21', stars: 3, dotColor: 'var(--col-copper)', isToday: false, isBest: false },
    { day: 'Fri', date: '22', stars: 4, dotColor: 'var(--col-teal)', isToday: false, isBest: false },
    { day: 'Sat', date: '23', stars: 2, dotColor: '#F59E0B', isToday: false, isBest: false },
    { day: 'Sun', date: '24', stars: 3, dotColor: 'var(--col-copper)', isToday: false, isBest: false },
  ];

  const weeklyAspects = [
    {
      icon: '♡',
      title: 'Love & Relationships',
      value: 82,
      label: 'Favorable',
      text: 'Mid-week brings heartwarming moments. Best time to resolve past tensions on Wednesday evening.',
    },
    {
      icon: '★',
      title: 'Career & Ambition',
      value: 88,
      label: 'High Growth',
      text: 'Major momentum builds from Tuesday onwards. Pitch bold initiatives before Friday.',
    },
    {
      icon: '✦',
      title: 'Health & Vitality',
      value: 70,
      label: 'Moderate',
      text: 'Energy fluctuates over the weekend. Protect your sleep schedule and avoid overworking.',
    },
    {
      icon: '₹',
      title: 'Money & Wealth',
      value: 76,
      label: 'Steady',
      text: 'Good time for budget planning and resolving debts. Favorable financial news arrives Thursday.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* A) Week Overview Header */}
      <div className="glass-card" style={{ padding: 28 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
              Weekly Forecast for {s.en}
            </h3>
            <div className="text-xs font-mono-num mt-1 font-semibold" style={{ color: 'var(--col-copper)' }}>
              Aug 18 – Aug 24, 2026
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>Rating:</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--col-copper)' }}>
              ★★★★☆ <span className="font-mono-num text-xs">(4/5)</span>
            </span>
          </div>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
          A powerful week for career growth, strategic clarity, and personal development. Planetary transits favor decisive forward movement mid-week while urging mindful patience over the weekend.
        </p>
      </div>

      {/* B) Day-By-Day Breakdown */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div className="text-xs uppercase mb-4 font-semibold tracking-wider" style={{ color: 'var(--col-copper)' }}>
          Day-by-Day Energy Flow
        </div>

        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3 min-w-[580px]">
            {days.map((d) => (
              <div
                key={d.day}
                className="w-20 flex-shrink-0 glass-card flex flex-col items-center justify-between py-3 px-1.5 text-center relative"
                style={{
                  background: d.isToday
                    ? 'rgba(200, 130, 42, 0.12)'
                    : d.isBest
                    ? 'rgba(42, 171, 168, 0.1)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: d.isToday
                    ? '1px solid rgba(200, 130, 42, 0.5)'
                    : d.isBest
                    ? '1px solid rgba(42, 171, 168, 0.45)'
                    : '1px solid var(--col-glass-border)',
                }}
              >
                {d.isToday && (
                  <span
                    className="absolute -top-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase"
                    style={{ background: 'var(--col-copper)', color: 'var(--col-midnight)' }}
                  >
                    Today
                  </span>
                )}
                {d.isBest && (
                  <span
                    className="absolute -top-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase"
                    style={{ background: 'var(--col-teal)', color: 'var(--col-midnight)' }}
                  >
                    Best
                  </span>
                )}

                <span className="text-xs font-semibold" style={{ color: 'var(--col-moonstone)' }}>
                  {d.day}
                </span>
                <span className="font-mono-num text-sm font-bold my-0.5" style={{ color: 'var(--col-moonstone)' }}>
                  {d.date}
                </span>

                <div className="text-[10px] my-1" style={{ color: d.dotColor }}>
                  {'★'.repeat(d.stars)}
                </div>

                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '9999px',
                    background: d.dotColor,
                    boxShadow: `0 0 8px ${d.dotColor}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C) Weekly Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <div
          className="glass-card p-5 flex flex-col justify-between"
          style={{ border: '1px solid rgba(42, 171, 168, 0.4)', background: 'rgba(42, 171, 168, 0.05)' }}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase mb-1" style={{ color: 'var(--col-teal)' }}>
              <span>✦</span> Best Day This Week
            </div>
            <div className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
              Wednesday, Aug 20
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              Jupiter aspect — excellent for career moves, agreements, and expanding your reach.
            </p>
          </div>
        </div>

        <div
          className="glass-card p-5 flex flex-col justify-between"
          style={{ border: '1px solid rgba(245, 158, 11, 0.35)', background: 'rgba(245, 158, 11, 0.05)' }}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase mb-1" style={{ color: '#F59E0B' }}>
              <span>⚠</span> Challenge Day
            </div>
            <div className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
              Saturday, Aug 23
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              Saturn square — patience needed. Avoid emotional confrontations and hasty spending.
            </p>
          </div>
        </div>

        <div
          className="glass-card p-5 flex flex-col justify-between"
          style={{ border: '1px solid rgba(200, 130, 42, 0.4)', background: 'rgba(200, 130, 42, 0.05)' }}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase mb-1" style={{ color: 'var(--col-copper)' }}>
              <span>☀️</span> Lucky Window
            </div>
            <div className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
              Wed–Fri: 9:00–11:00 AM
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              Most auspicious time block for negotiations, signature of deals, and vital calls.
            </p>
          </div>
        </div>
      </div>

      {/* D) Weekly Focus Areas */}
      <div className="space-y-4">
        <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'var(--col-copper)' }}>
          Weekly Focus Areas
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {weeklyAspects.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <span style={{ fontSize: 24, color: 'var(--col-copper)' }}>{a.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm" style={{ color: 'var(--col-moonstone)' }}>{a.title}</h4>
                  <span className="text-xs font-semibold" style={{ color: 'var(--col-teal)' }}>{a.label}</span>
                </div>
                <div className="mt-2.5 relative" style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-full)' }}>
                  <div
                    style={{
                      width: `${a.value}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--col-copper), var(--col-copper-light))',
                      borderRadius: 'var(--r-full)',
                    }}
                  />
                </div>
                <p className="mt-3 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                  {a.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
