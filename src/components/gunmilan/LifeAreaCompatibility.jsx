import React from 'react';
import { motion } from 'framer-motion';

const areas = [
  {
    icon: '♡',
    title: 'Love & Attraction',
    pct: 85,
    badge: 'Excellent',
    badgeType: 'teal',
    desc: 'Strong mutual attraction and emotional understanding between partners.',
  },
  {
    icon: '₹',
    title: 'Financial Compatibility',
    pct: 72,
    badge: 'Good',
    badgeType: 'copper',
    desc: 'Shared financial goals with minor differences in spending habits.',
  },
  {
    icon: '☿',
    title: 'Intellectual Bond',
    pct: 90,
    badge: 'Excellent',
    badgeType: 'teal',
    desc: 'High mental compatibility, great communication and mutual respect.',
  },
  {
    icon: '🏠',
    title: 'Family & Children',
    pct: 68,
    badge: 'Good',
    badgeType: 'copper',
    desc: 'Compatible parenting values, supportive domestic outlook, good family harmony.',
  },
  {
    icon: '♂',
    title: 'Physical Compatibility',
    pct: 78,
    badge: 'Good',
    badgeType: 'copper',
    desc: 'Good physical and temperamental match with healthy relationship vitality.',
  },
  {
    icon: '✦',
    title: 'Spiritual Path',
    pct: 80,
    badge: 'Good',
    badgeType: 'copper',
    desc: 'Similar spiritual beliefs, mutual moral support, and shared life philosophy.',
  },
];

export default function LifeAreaCompatibility() {
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
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card flex flex-col justify-between"
            style={{ padding: 22 }}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg" style={{ color: 'var(--col-copper)' }}>
                    {a.icon}
                  </span>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
                    {a.title}
                  </h4>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={
                    a.badgeType === 'teal'
                      ? { background: 'rgba(42, 171, 168, 0.15)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.35)' }
                      : { background: 'rgba(200, 130, 42, 0.15)', color: 'var(--col-copper)', border: '1px solid rgba(200, 130, 42, 0.35)' }
                  }
                >
                  {a.badge}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex justify-between items-center text-xs mb-1.5 font-mono-num">
                  <span style={{ color: 'var(--col-moonstone-dim)' }}>Alignment</span>
                  <span className="font-semibold" style={{ color: 'var(--col-copper)' }}>{a.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${a.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--col-copper) 0%, var(--col-copper-light) 100%)' }}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                {a.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
