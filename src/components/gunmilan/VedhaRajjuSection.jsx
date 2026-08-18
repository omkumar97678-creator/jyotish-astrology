import React from 'react';
import { motion } from 'framer-motion';

export default function VedhaRajjuSection() {
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
            border: '1px solid rgba(42, 171, 168, 0.35)',
            background: 'rgba(42, 171, 168, 0.05)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                Rajju (Longevity Check)
              </h4>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(42, 171, 168, 0.2)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.4)' }}
              >
                ✓ Pass
              </span>
            </div>
            <div className="text-sm font-semibold mb-2" style={{ color: 'var(--col-teal)' }}>
              ✓ No Rajju Dosha
            </div>
            <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              Both partners' nakshatras fall in different Rajju groups, which is auspicious for longevity and long marital life.
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
            border: '1px solid rgba(42, 171, 168, 0.35)',
            background: 'rgba(42, 171, 168, 0.05)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                Vedha (Affliction Check)
              </h4>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(42, 171, 168, 0.2)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.4)' }}
              >
                ✓ Pass
              </span>
            </div>
            <div className="text-sm font-semibold mb-2" style={{ color: 'var(--col-teal)' }}>
              ✓ No Vedha Dosha
            </div>
            <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              Nakshatras are not in Vedha (opposition), supporting a harmonious relationship free of deep astrological conflict.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
