import React from 'react';
import { motion } from 'framer-motion';
import { NAKSHATRA_DETAILS } from '@/lib/gunMilanCalc';

export default function NakshatraAnalysis({ p1, p2, calculatedData }) {
  const boyName = p1?.name?.trim() || 'Person 1';
  const girlName = p2?.name?.trim() || 'Person 2';

  const nak1 = calculatedData?.nakshatra1 || 'Ashwini';
  const nak2 = calculatedData?.nakshatra2 || 'Pushya';

  const details1 = NAKSHATRA_DETAILS[nak1] || { ruler: 'Mercury', quality: 'Sharp', symbol: 'Star' };
  const details2 = NAKSHATRA_DETAILS[nak2] || { ruler: 'Moon', quality: 'Soft', symbol: 'Hand' };

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
              {boyName}'s Nakshatra
            </span>
            <div className="font-display text-2xl" style={{ color: 'var(--col-copper)' }}>
              {nak1}
            </div>
            <div className="space-y-1.5 text-xs pt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
              <div className="flex justify-between max-w-xs">
                <span>Ruler Planet:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details1.ruler}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Gana Temperament:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.gana1 || 'Deva'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Nadi Energy:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.nadi1 || 'Vata'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Quality & Symbol:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details1.quality} • {details1.symbol}</span>
              </div>
            </div>
          </div>

          {/* Right: Girl's Nakshatra */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--col-teal)' }}>
              {girlName}'s Nakshatra
            </span>
            <div className="font-display text-2xl" style={{ color: 'var(--col-copper)' }}>
              {nak2}
            </div>
            <div className="space-y-1.5 text-xs pt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
              <div className="flex justify-between max-w-xs">
                <span>Ruler Planet:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details2.ruler}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Gana Temperament:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.gana2 || 'Deva'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Nadi Energy:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.nadi2 || 'Vata'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Quality & Symbol:</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details2.quality} • {details2.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility verdict description */}
        <div className="pt-5">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ color: 'var(--col-copper)', fontSize: 16 }}>✦</span>
            <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
              Nakshatra Interplay: {nak1} & {nak2}
            </h4>
          </div>
          <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.65 }}>
            {calculatedData?.nadi1 === calculatedData?.nadi2
              ? `Both birth stars belong to the ${calculatedData?.nadi1} Nadi family. Chanting spiritual mantras or practicing mutual wellness mindfulness helps maintain vital balance.`
              : `Different Nadi energies (${calculatedData?.nadi1} and ${calculatedData?.nadi2}) indicate excellent physiological and genetic compatibility, bringing strong health vitality and harmony to the relationship.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
