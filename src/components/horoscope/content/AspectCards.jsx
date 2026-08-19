import React from 'react';
import { motion } from 'framer-motion';

export default function AspectCards({ aspects = [] }) {
  const list = aspects && aspects.length > 0 ? aspects : [
    { icon: '♡', title: 'Love & Relations', value: 78, label: 'Good', text: 'An honest conversation deepens mutual bonds.', tip: 'Lucky for: New connections and deep sharing' },
    { icon: '★', title: 'Career & Status', value: 85, label: 'Excellent', text: 'Recognition for strategic effort is on its way.', tip: 'Best time: Morning hours for major initiatives' },
    { icon: '✦', title: 'Health & Vitality', value: 68, label: 'Good', text: 'Steady stamina; pace your commitments wisely.', tip: 'Focus on: Fresh hydration and regular rest' },
    { icon: '₹', title: 'Finance & Wealth', value: 76, label: 'Good', text: 'Favorable stability; prioritize strategic savings.', tip: 'Good for: Budget planning and long-term gains' },
  ];

  const labelColor = (l) =>
    l === 'Excellent' || l === 'Uttam' ? 'var(--col-teal)' : l === 'Good' || l === 'Shreshtha' ? 'var(--col-copper)' : 'var(--col-moonstone-dim)';

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((a, i) => (
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
              <span className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
                {a.title}
              </span>
              <span className="text-xs font-semibold" style={{ color: labelColor(a.label) }}>
                {a.label}
              </span>
            </div>

            {/* Score bar */}
            <div className="mt-2.5 flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${a.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: a.value >= 80 ? 'var(--col-teal)' : 'var(--col-copper)',
                  }}
                />
              </div>
              <span className="font-mono-num text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>
                {a.value}%
              </span>
            </div>

            <p className="mt-3 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {a.text}
            </p>

            {a.tip && (
              <div className="mt-2 text-[11px]" style={{ color: 'var(--col-copper)', opacity: 0.9 }}>
                {a.tip}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}