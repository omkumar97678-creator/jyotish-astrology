import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function Lucky({ lucky }) {
  const { lang } = useLang();

  const num = typeof lucky?.number === 'number' ? lucky.number : 7;
  const num1 = num;
  const num2 = (num + 3) % 9 || 9;
  const num3 = (num * 2) % 9 || 8;

  const color = lucky?.color || 'Sacred Saffron / Coral Red';
  const day = lucky?.day || 'Tuesday (Mangalvar)';
  const gem = lucky?.gem || lucky?.gemstone || 'Red Coral (Moonga)';

  const cards = [
    {
      title: lang === 'hinglish' ? 'Shubh Ank (Lucky Numbers)' : 'Lucky Numbers',
      type: 'numbers',
      values: [num1, num2, num3],
    },
    {
      title: lang === 'hinglish' ? 'Shubh Rang (Lucky Color)' : 'Lucky Color',
      type: 'color',
      value: color,
    },
    {
      title: lang === 'hinglish' ? 'Shubh Din (Lucky Day)' : 'Lucky Day',
      type: 'day',
      value: day,
      icon: '✦',
    },
    {
      title: lang === 'hinglish' ? 'Shubh Ratna (Gemstone)' : 'Lucky Gemstone',
      type: 'gem',
      value: gem,
      desc:
        lang === 'hinglish'
          ? 'Lagna Swami ko balwan karne aur bhagya badhane ke liye dharan karein.'
          : 'Worn to strengthen your Ascendant Lord and invite auspicious fortune.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
          {t.lucky_title[lang]}
        </div>
        <div className="font-display mt-1 mb-5" style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.95rem' }}>
          {lang === 'hinglish' ? 'शुभ तत्व — वैदिक गणना' : 'Auspicious Elements'}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card"
            style={{ padding: 22 }}
          >
            <div className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.12em', fontSize: '0.72rem' }}>
              {c.title}
            </div>

            {c.type === 'numbers' && (
              <div className="mt-3 flex gap-3">
                {(c.values || []).map((v) => (
                  <div
                    key={v}
                    className="font-mono-num flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      fontSize: '1.25rem',
                      background: 'rgba(200,130,42,0.1)',
                      border: '1px solid rgba(200,130,42,0.4)',
                      color: 'var(--col-copper)',
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            )}

            {c.type === 'color' && (
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full"
                  style={{ background: 'var(--col-copper)', border: '1px solid rgba(255,255,255,0.2)' }}
                />
                <span className="text-sm font-medium" style={{ color: 'var(--col-moonstone)' }}>
                  {c.value}
                </span>
              </div>
            )}

            {c.type === 'day' && (
              <div className="mt-3 flex items-center gap-2.5">
                <span style={{ color: 'var(--col-copper)', fontSize: 20 }}>{c.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--col-moonstone)' }}>
                  {c.value}
                </span>
              </div>
            )}

            {c.type === 'gem' && (
              <div className="mt-3">
                <div className="text-sm font-semibold" style={{ color: 'var(--col-copper)' }}>
                  {c.value}
                </div>
                {c.desc && (
                  <p className="mt-1.5 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                    {c.desc}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}