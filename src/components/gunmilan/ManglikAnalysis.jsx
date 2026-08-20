import React from 'react';
import { motion } from 'framer-motion';

export default function ManglikAnalysis({ p1, p2, calculatedData }) {
  const boyName = p1?.name?.trim() || 'Person 1';
  const girlName = p2?.name?.trim() || 'Person 2';

  const m1 = Boolean(calculatedData?.manglik1);
  const m2 = Boolean(calculatedData?.manglik2);

  const cards = [
    {
      who: boyName,
      status: m1 ? 'Manglik (मांगलिक)' : 'Non-Manglik (अ-मांगलिक)',
      dot: m1 ? 'var(--col-copper-light)' : '#3FA86A',
      desc: m1
        ? 'Mars energy is prominently positioned, providing high ambition, decisive leadership, and intense passion.'
        : 'No adverse Mars affliction in primary marriage houses (1, 4, 7, 8, 12). Peaceful and steady disposition.',
    },
    {
      who: girlName,
      status: m2 ? 'Manglik (मांगलिक)' : 'Non-Manglik (अ-मांगलिक)',
      dot: m2 ? 'var(--col-copper-light)' : '#3FA86A',
      desc: m2
        ? 'Mars placement highlights courage, fierce loyalty, and protective determination in domestic life.'
        : 'Neutral Mars balance in core houses. Emotional stability and gentle relational temperament.',
    },
  ];

  const hasAnyManglik = m1 || m2;
  const isBothManglik = m1 && m2;

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
          मांगलिक विचार एवं प्रभाव
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

      {/* Manglik Cancellation & Vedic Remedy Summary */}
      <div className="glass-card p-5" style={{ borderLeft: '3px solid var(--col-copper)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ color: 'var(--col-copper)' }}>✦</span>
          <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
            {isBothManglik
              ? 'Manglik Dosha Neutralized (दोष शमन)'
              : !hasAnyManglik
              ? 'Complete Manglik Harmony (दोष मुक्त)'
              : 'Vedic Harmonization & Guidance'}
          </h4>
        </div>
        <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
          {isBothManglik
            ? 'Since both partners have active Mars alignment, according to classical Vedic principles, Manglik Dosha cancels out naturally (तुल्य बल योग), creating excellent mutual understanding and energetic balance.'
            : !hasAnyManglik
            ? 'Neither partner has Mars affliction. The planetary energies are calm and supportive for marriage with no special remedies required.'
            : 'One partner carries dynamic Mars energy. Chanting Hanuman Chalisa together on Tuesdays, practicing mutual patience during disagreements, or simple charity brings auspicious harmony.'}
        </p>
      </div>
    </motion.div>
  );
}
