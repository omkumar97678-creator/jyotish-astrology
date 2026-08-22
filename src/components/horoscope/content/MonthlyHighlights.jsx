import React from 'react';
import { motion } from 'framer-motion';
import { signs } from '../horoData';

export default function MonthlyHighlights({ selected }) {
  const s = signs[selected] || signs[0];

  const timelineDates = [
    {
      date: 'Aug 19',
      title: 'New Moon — New beginnings',
      desc: 'Plant seeds for long-term projects and clarify your personal vision.',
      badge: 'Auspicious',
      badgeType: 'teal',
    },
    {
      date: 'Aug 22',
      title: 'Jupiter trine — Career boost',
      desc: 'Favorable planetary alignment brings recognition and support from superiors.',
      badge: 'Favorable',
      badgeType: 'copper',
    },
    {
      date: 'Aug 25',
      title: 'Mercury retrograde begins',
      desc: 'Avoid signing contracts, back up important data, and practice patience in communication.',
      badge: 'Caution',
      badgeType: 'amber',
    },
    {
      date: 'Sep 2',
      title: 'Full Moon in Pisces',
      desc: 'Heightened emotional clarity, completion of a long creative cycle.',
      badge: 'Emotional',
      badgeType: 'teal',
    },
  ];

  const transits = [
    {
      planet: 'Jupiter in Gemini',
      duration: 'Until Dec 2026',
      effect: 'Expanding communication skills, networking, and fruitful short travels.',
      impact: 'Career ↑',
      impactType: 'teal',
    },
    {
      planet: 'Saturn in Pisces',
      duration: 'Ongoing',
      effect: 'Discipline in spiritual, subconscious, and creative introspective pursuits.',
      impact: 'Health (Neutral)',
      impactType: 'copper',
    },
    {
      planet: 'Rahu in Pisces',
      duration: 'Until 2026',
      effect: 'Focus shifts to foreign connections, overseas opportunities, and deep spirituality.',
      impact: 'Mixed (~)',
      impactType: 'amber',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* A) Month Overview */}
      <div className="glass-card" style={{ padding: 28 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
              August 2026 for {s.en}
            </h3>
            <div className="text-xs font-mono-num mt-1 font-semibold" style={{ color: 'var(--col-copper)' }}>
              Monthly Solar & Lunar Transit Overview
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>Month Rating:</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--col-copper)' }}>
              ★★★★☆ <span className="font-mono-num text-xs">(4/5)</span>
            </span>
          </div>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
          August brings expansive energy to your ambitions with strong cosmic support for learning and skill development. While Mercury’s late-month transit requires vigilance, the overall planetary momentum strongly favors dedicated builders and leaders.
        </p>
      </div>

      {/* B) Important Dates (Timeline Style) */}
      <div className="glass-card" style={{ padding: 28 }}>
        <div className="text-xs uppercase mb-6 font-semibold tracking-wider" style={{ color: 'var(--col-copper)' }}>
          Important Dates & Lunar Milestones
        </div>

        <div className="relative pl-6 space-y-6 border-l-2 border-[rgba(200,130,42,0.35)]">
          {timelineDates.map((item) => (
            <div key={item.date} className="relative">
              {/* Timeline Dot */}
              <span
                className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full"
                style={{
                  background: item.badgeType === 'teal' ? 'var(--col-teal)' : item.badgeType === 'amber' ? '#F59E0B' : 'var(--col-copper)',
                  boxShadow: `0 0 10px ${item.badgeType === 'teal' ? 'var(--col-teal)' : item.badgeType === 'amber' ? '#F59E0B' : 'var(--col-copper)'}`,
                }}
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-num text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(200,130,42,0.15)', color: 'var(--col-copper)' }}>
                    {item.date}
                  </span>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
                    {item.title}
                  </h4>
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full self-start sm:self-auto"
                  style={
                    item.badgeType === 'teal'
                      ? { background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }
                      : item.badgeType === 'amber'
                      ? { background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.35)' }
                      : { background: 'rgba(200, 130, 42, 0.15)', color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.35)' }
                  }
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* C) Monthly Planetary Transits */}
      <div className="space-y-4">
        <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'var(--col-copper)' }}>
          Key Planetary Movements
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {transits.map((t) => (
            <div
              key={t.planet}
              className="glass-card p-5 flex flex-col justify-between"
              style={{ border: '1px solid var(--col-glass-border)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>{t.planet}</h4>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={
                      t.impactType === 'teal'
                        ? { background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)' }
                        : t.impactType === 'amber'
                        ? { background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }
                        : { background: 'rgba(200, 130, 42, 0.15)', color: 'var(--col-copper)' }
                    }
                  >
                    {t.impact}
                  </span>
                </div>
                <div className="text-[11px] font-mono-num mb-2" style={{ color: 'var(--col-copper)' }}>
                  Duration: {t.duration}
                </div>
                <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                  {t.effect}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* D) Monthly Love & Career Forecast */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Love This Month */}
        <div
          className="glass-card p-6"
          style={{ borderLeft: '4px solid var(--col-copper)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" style={{ color: 'var(--col-copper)' }}>♡</span>
            <h4 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
              Love & Relationships
            </h4>
          </div>
          <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
            Venus radiates warmth through your sector of connection during early August. Single signs encounter exciting magnetic interest in intellectual circles, while committed couples experience deeper trust through shared adventures.
          </p>
          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] text-xs font-semibold" style={{ color: 'var(--col-copper)' }}>
            Best dates for romance: <span className="font-mono-num text-[var(--col-moonstone)]">Aug 20, Aug 28, Sep 1</span>
          </div>
        </div>

        {/* Career This Month */}
        <div
          className="glass-card p-6"
          style={{ borderLeft: '4px solid var(--col-teal)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" style={{ color: 'var(--col-teal)' }}>★</span>
            <h4 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
              Career & Finance
            </h4>
          </div>
          <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
            Mid-month offers peak momentum for initiating major projects, pitching ideas, and asserting leadership. Financial returns from previous efforts begin crystallizing before the final week.
          </p>
          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] text-xs font-semibold" style={{ color: 'var(--col-teal)' }}>
            Best dates for career moves: <span className="font-mono-num text-[var(--col-moonstone)]">Aug 22, Aug 26</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
