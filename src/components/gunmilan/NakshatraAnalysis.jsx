import React from 'react';
import { motion } from 'framer-motion';

export default function NakshatraAnalysis() {
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
          Nakshatra Analysis
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          नक्षत्र विश्लेषण
        </p>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <div className="grid gap-6 md:grid-cols-2 pb-6 border-b border-[var(--col-glass-border)]">
          {/* Left: Boy's Nakshatra */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--col-copper)' }}>
              Boy's Nakshatra
            </span>
            <div className="font-display text-2xl" style={{ color: 'var(--col-copper)' }}>
              Jyeshtha
            </div>
            <div className="space-y-1.5 text-xs pt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
              <div className="flex justify-between max-w-xs">
                <span>Ruler:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Mercury (Budh)</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Pada:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>3rd Pada</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Quality:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Fierce (Tikshna)</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Symbol:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Umbrella / Earring</span>
              </div>
            </div>
          </div>

          {/* Right: Girl's Nakshatra */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--col-teal)' }}>
              Girl's Nakshatra
            </span>
            <div className="font-display text-2xl" style={{ color: 'var(--col-copper)' }}>
              Hasta
            </div>
            <div className="space-y-1.5 text-xs pt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
              <div className="flex justify-between max-w-xs">
                <span>Ruler:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Moon (Chandra)</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Pada:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>2nd Pada</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Quality:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Light (Laghu)</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Symbol:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>Hand / Fist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Verdict Card */}
        <div
          className="mt-5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{
            background: 'rgba(42, 171, 168, 0.08)',
            border: '1px solid rgba(42, 171, 168, 0.35)',
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
                Jyeshtha + Hasta = Friendly Stars ✦
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: 'rgba(42, 171, 168, 0.2)', color: 'var(--col-teal)', border: '1px solid rgba(42, 171, 168, 0.4)' }}
              >
                Compatible
              </span>
            </div>
            <p className="mt-1.5 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              These nakshatras share a friendly relationship, supporting emotional harmony and mutual understanding.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
