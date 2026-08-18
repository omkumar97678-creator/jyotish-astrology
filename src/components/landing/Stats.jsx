import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

function Counter({ value, suffix, start }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    const ticks = 50;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i >= ticks ? value : (value / ticks) * i);
      if (i >= ticks) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [start, value]);

  const display = Number.isInteger(value) ? Math.round(n).toLocaleString('en-US') : n.toFixed(1);
  return (
    <span className="font-mono-num text-copper-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const stats = [
    { value: 50000, suffix: '+', label: t.stats1_label[lang] },
    { value: 99.8, suffix: '%', label: t.stats2_label[lang] },
    { value: 7, suffix: '', label: t.stats3_label[lang] },
    { value: 100, suffix: '%', label: t.stats4_label[lang] },
  ];

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6" style={{ zIndex: 10 }}>
      <div
        ref={ref}
        className="max-w-5xl mx-auto glass-card grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-5 sm:p-9"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center flex flex-col justify-center">
            <Counter value={s.value} suffix={s.suffix} start={inView} />
            <div className="mt-2 text-xs sm:text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}