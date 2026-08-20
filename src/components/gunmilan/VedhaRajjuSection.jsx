import React from 'react';
import { motion } from 'framer-motion';
import { NAKSHATRA_NUM } from '@/lib/gunMilanCalc';

export default function VedhaRajjuSection({ calculatedData }) {
  const nak1 = calculatedData?.nakshatra1 || 'Ashwini';
  const nak2 = calculatedData?.nakshatra2 || 'Pushya';

  const n1 = NAKSHATRA_NUM[nak1] || 1;
  const n2 = NAKSHATRA_NUM[nak2] || 1;

  // Rajju Grouping (Siro, Kantha, Nabhi, Kati, Pada)
  const getRajjuType = (num) => {
    const rem = num % 5;
    if (rem === 1) return 'Pada (Feet)';
    if (rem === 2) return 'Kati (Waist)';
    if (rem === 3) return 'Nabhi (Navel)';
    if (rem === 4) return 'Kantha (Neck)';
    return 'Siro (Head)';
  };

  const rajju1 = getRajjuType(n1);
  const rajju2 = getRajjuType(n2);
  const isRajjuDosha = rajju1 === rajju2;

  // Vedha check
  const isVedha = Math.abs(n1 - n2) === 14 || Math.abs(n1 - n2) === 9;

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
          Additional Compatibility Checks
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          वेध और राज्जु परीक्षण
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Card 1: Rajju Check */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card flex flex-col justify-between"
          style={{
            padding: 24,
            border: !isRajjuDosha ? '1px solid rgba(42, 171, 168, 0.35)' : '1px solid rgba(245, 158, 11, 0.35)',
            background: !isRajjuDosha ? 'rgba(42, 171, 168, 0.05)' : 'rgba(245, 158, 11, 0.05)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                Rajju (Longevity & Health Check)
              </h4>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  background: !isRajjuDosha ? 'rgba(42, 171, 168, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: !isRajjuDosha ? 'var(--col-teal)' : '#F59E0B',
                  border: `1px solid ${!isRajjuDosha ? 'rgba(42, 171, 168, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                }}
              >
                {!isRajjuDosha ? '✓ Pass (शुभ)' : '⚠ Caution (मध्यम)'}
              </span>
            </div>
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: !isRajjuDosha ? 'var(--col-teal)' : '#F59E0B' }}
            >
              {!isRajjuDosha ? '✓ No Rajju Dosha' : `⚠ Same Rajju Group (${rajju1})`}
            </div>
            <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {!isRajjuDosha
                ? `Partners' birth stars fall in distinct Rajju bands (${rajju1} and ${rajju2}), which is highly auspicious for long marital happiness and mutual well-being.`
                : `Both nakshatras align with ${rajju1} Rajju. In Vedic astrology, strong Guna and Bhakoot points provide effective protective counter-balance.`}
            </p>
          </div>
        </motion.div>

        {/* Card 2: Vedha Check */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card flex flex-col justify-between"
          style={{
            padding: 24,
            border: !isVedha ? '1px solid rgba(42, 171, 168, 0.35)' : '1px solid rgba(245, 158, 11, 0.35)',
            background: !isVedha ? 'rgba(42, 171, 168, 0.05)' : 'rgba(245, 158, 11, 0.05)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                Vedha (Cosmic Affliction Check)
              </h4>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  background: !isVedha ? 'rgba(42, 171, 168, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: !isVedha ? 'var(--col-teal)' : '#F59E0B',
                  border: `1px solid ${!isVedha ? 'rgba(42, 171, 168, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                }}
              >
                {!isVedha ? '✓ Pass (दोष मुक्त)' : '⚠ Vedha Present'}
              </span>
            </div>
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: !isVedha ? 'var(--col-teal)' : '#F59E0B' }}
            >
              {!isVedha ? '✓ No Vedha Dosha' : '⚠ Vedha Star Resistance'}
            </div>
            <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {!isVedha
                ? 'No adverse magnetic star resistance (Vedha) is present between the two nakshatras, ensuring peaceful domestic relations and smooth life decisions.'
                : 'Mild star resistance observed. Respecting personal boundaries and transparent mutual communication dissolves any minor friction.'}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
