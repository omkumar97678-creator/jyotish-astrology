import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signs } from './horoData';
import ZodiacIcon from '@/components/ZodiacIcon';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function RashiSelector({ selected, onSelect }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-8 sm:mt-12"
    >
      <h2 className="text-center mb-5 sm:mb-7 font-display" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: 'var(--col-moonstone)' }}>
        {t.select_sign[lang]}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
        {signs.map((s, i) => {
          const isSel = i === selected;
          const isHov = hovered === i;
          const symbolColor = isSel ? '#C8822A' : isHov ? '#E09840' : 'rgba(232,228,220,0.6)';

          return (
            <motion.button
              key={s.en}
              type="button"
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={isSel ? { scale: 1.04 } : { scale: 1 }}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={`zodiac-sign-card flex flex-col items-center justify-center text-center transition-colors rounded-xl ${isSel ? 'selected' : ''}`}
              style={{
                padding: '14px 6px sm:16px 8px',
                cursor: 'pointer',
                background: isSel ? 'rgba(200,130,42,0.1)' : 'rgba(255,255,255,0.04)',
                border: isSel ? '1px solid rgba(200,130,42,0.5)' : isHov ? '1px solid rgba(200,130,42,0.3)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isSel ? '0 0 20px rgba(200,130,42,0.15)' : 'none',
                color: isSel ? '#C8822A' : 'rgba(232,228,220,0.6)',
              }}
            >
              <div className="flex items-center justify-center h-9 sm:h-10">
                <ZodiacIcon sign={s.en} size={30} style={{ color: symbolColor }} />
              </div>
              <span
                className="mt-1.5 font-medium text-xs sm:text-sm"
                style={{ color: isSel ? 'var(--col-copper)' : 'var(--col-moonstone)' }}
              >
                {s.en}
              </span>
              <span
                className="mt-0.5 text-[10px] sm:text-[11px]"
                style={{ color: 'var(--col-moonstone-dim)' }}
              >
                {s.hi}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}