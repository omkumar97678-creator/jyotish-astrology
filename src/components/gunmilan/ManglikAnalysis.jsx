import React from 'react';
import { motion } from 'framer-motion';

export default function ManglikAnalysis({ p1, p2 }) {
  const boyName = p1?.name?.trim() || 'Person 1 (Harsh)';
  const girlName = p2?.name?.trim() || 'Person 2 (Mahika)';

  const cards = [
    { who: boyName, status: 'Non-Manglik', dot: '#3FA86A', desc: 'No Mars affliction in core marriage houses (1, 4, 7, 8, 12).' },
    { who: girlName, status: 'Manglik', dot: 'var(--col-copper-light)', desc: 'Mars placed in 7th house indicates Manglik presence.' },
  ];

  const remedies = [
    'Kumbh Vivah ritual before marriage',
    'Mangal Puja on Tuesdays',
    'Wearing Red Coral (Moonga) gemstone',
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
          Manglik Analysis
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          मांगलिक विचार
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.who}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card flex flex-col justify-between"
            style={{ padding: 22 }}
          >
            <div className="flex items-center gap-3">
              <span style={{ width: 12, height: 12, borderRadius: '9999px', background: c.dot, boxShadow: `0 0 12px ${c.dot}` }} />
              <div>
                <div className="text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>{c.who}</div>
                <div className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>{c.status}</div>
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
              {c.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Manglik Consideration & Remedy Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card"
        style={{
          padding: 24,
          background: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span style={{ color: '#F59E0B', fontSize: 18 }}>⚠</span>
            <div>
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                Manglik Consideration
              </h4>
              <p className="text-xs" style={{ color: '#F59E0B' }}>मांगलिक दोष</p>
            </div>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.35)' }}
          >
            Moderate Dosha
          </span>
        </div>

        <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
          Person 2 (Mahika) has Manglik Dosha. However, this match is still considered compatible because the Bhakoot score (7/7) provides strong protection.
        </p>

        <div className="mt-5 pt-4 border-t border-[rgba(245,158,11,0.2)]">
          <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
            Suggested Remedies
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {remedies.map((rem) => (
              <span
                key={rem}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(200, 130, 42, 0.12)',
                  color: 'var(--col-copper)',
                  border: '1px solid rgba(200, 130, 42, 0.3)',
                }}
              >
                ✦ {rem}
              </span>
            ))}
          </div>
        </div>

        <div
          className="mt-4 p-3 rounded-lg text-xs"
          style={{
            background: 'rgba(42, 171, 168, 0.08)',
            border: '1px solid rgba(42, 171, 168, 0.3)',
            color: 'var(--col-moonstone-dim)',
          }}
        >
          <strong style={{ color: 'var(--col-teal)' }}>Note: </strong>
          Consult a qualified astrologer before making decisions based on Manglik status.
        </div>
      </motion.div>
    </motion.div>
  );
}
