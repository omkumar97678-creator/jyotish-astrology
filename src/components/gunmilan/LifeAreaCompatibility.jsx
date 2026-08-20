import React from 'react';
import { motion } from 'framer-motion';

export default function LifeAreaCompatibility({ calculatedData }) {
  const la = calculatedData?.lifeAreas || {
    love: 85,
    career: 80,
    health: 75,
    family: 82,
    physical: 78,
    spiritual: 80,
  };

  const getBadge = (pct) => {
    if (pct >= 80) return { label: 'Excellent', type: 'teal' };
    if (pct >= 60) return { label: 'Good', type: 'copper' };
    if (pct >= 40) return { label: 'Moderate', type: 'amber' };
    return { label: 'Attention', type: 'rose' };
  };

  const areas = [
    {
      icon: '♡',
      title: 'Love & Attraction',
      pct: la.love,
      badge: getBadge(la.love).label,
      badgeType: getBadge(la.love).type,
      desc: 'Emotional warmth, romantic resonance, and mutual psychological attraction.',
    },
    {
      icon: '₹',
      title: 'Career & Prosperity',
      pct: la.career,
      badge: getBadge(la.career).label,
      badgeType: getBadge(la.career).type,
      desc: 'Shared ambitions, intellectual synchronization, and vocational support.',
    },
    {
      icon: '⚕',
      title: 'Health & Vitality',
      pct: la.health,
      badge: getBadge(la.health).label,
      badgeType: getBadge(la.health).type,
      desc: 'Nadi & Tara harmony promoting physiological wellness and longevity.',
    },
    {
      icon: '🏠',
      title: 'Family & Harmony',
      pct: la.family,
      badge: getBadge(la.family).label,
      badgeType: getBadge(la.family).type,
      desc: 'Domestic values, family prosperity, and constructive generational growth.',
    },
    {
      icon: '♂',
      title: 'Physical Compatibility',
      pct: la.physical,
      badge: getBadge(la.physical).label,
      badgeType: getBadge(la.physical).type,
      desc: 'Yoni attraction and temperamental vitality balance between partners.',
    },
    {
      icon: '✦',
      title: 'Spiritual Path',
      pct: la.spiritual,
      badge: getBadge(la.spiritual).label,
      badgeType: getBadge(la.spiritual).type,
      desc: 'Gana temperament alignment, ethical values, and shared dharmic philosophy.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div>
        <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
          Compatibility by Life Area
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          जीवन क्षेत्र अनुकूलता
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="glass-card flex flex-col justify-between"
            style={{ padding: 22 }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span style={{ fontSize: 18, color: 'var(--col-copper)' }}>{a.icon}</span>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
                    {a.title}
                  </h4>
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={
                    a.badgeType === 'teal'
                      ? { background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }
                      : a.badgeType === 'copper'
                      ? { background: 'rgba(200, 130, 42, 0.15)', color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.35)' }
                      : { background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.35)' }
                  }
                >
                  {a.badge}
                </span>
              </div>

              {/* Dynamic percentage bar */}
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-xs font-mono-num font-semibold">
                  <span style={{ color: 'var(--col-moonstone-dim)' }}>Score</span>
                  <span style={{ color: 'var(--col-copper)' }}>{a.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        a.badgeType === 'teal'
                          ? 'linear-gradient(90deg, var(--col-teal), #4FD1C5)'
                          : 'linear-gradient(90deg, var(--col-copper), var(--col-copper-light))',
                    }}
                  />
                </div>
              </div>

              <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.55 }}>
                {a.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
