import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

const fields = [
  { key: 'day', max: 2, ph: 'DD' },
  { key: 'month', max: 2, ph: 'MM' },
  { key: 'year', max: 4, ph: 'YYYY' },
];

export default function PersonCard({ title, data, setData, glow, icon }) {
  const { lang } = useLang();
  const refs = [useRef(null), useRef(null), useRef(null)];
  const borderColor = glow === 'teal' ? 'rgba(42,171,168,0.4)' : 'rgba(200,130,42,0.4)';
  const boxShadow = glow === 'teal' ? '0 0 32px rgba(42,171,168,0.12)' : '0 0 32px rgba(200,130,42,0.12)';
  const accent = glow === 'teal' ? 'var(--col-teal)' : 'var(--col-copper)';

  const setTime = (key, value, max) =>
    setData((d) => ({ ...d, time: { ...d.time, [key]: value.replace(/\D/g, '').slice(0, max) } }));

  const setDob = (key, value, i, max) => {
    const clean = value.replace(/\D/g, '').slice(0, max);
    setData((d) => ({ ...d, dob: { ...d.dob, [key]: clean } }));
    if (clean.length === max && refs[i + 1]) refs[i + 1].current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: 24, border: `1px solid ${borderColor}`, boxShadow }}
    >
      <div className="flex items-center gap-2 mb-5">
        <span style={{ color: accent, fontSize: 18 }}>{icon}</span>
        <h3 className="font-semibold" style={{ color: 'var(--col-moonstone)' }}>{title}</h3>
      </div>

      <label className="block text-xs mb-2" style={{ color: 'var(--col-moonstone-dim)' }}>
        {lang === 'hinglish' ? 'Poora Naam' : 'Full Name'}
      </label>
      <input
        className="input-base"
        aria-label={`${title} name`}
        placeholder={lang === 'hinglish' ? 'Poora naam daalo' : 'Full name'}
        value={data.name}
        onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
      />

      <label className="block text-xs mb-2 mt-5" style={{ color: 'var(--col-moonstone-dim)' }}>
        {lang === 'hinglish' ? 'Janam Tithi (Date of Birth)' : 'Date of Birth'}
      </label>
      <div className="grid grid-cols-3 gap-3">
        {fields.map((f, i) => (
          <input
            key={f.key}
            ref={refs[i]}
            className="input-base font-mono-num text-center"
            aria-label={`Birth ${f.key}`}
            inputMode="numeric"
            placeholder={f.ph}
            value={data.dob[f.key]}
            onChange={(e) => setDob(f.key, e.target.value, i, f.max)}
          />
        ))}
      </div>

      <label className="block text-xs mb-2 mt-5" style={{ color: 'var(--col-moonstone-dim)' }}>
        {lang === 'hinglish' ? 'Janam Samay (Birth Time)' : 'Birth Time'}
      </label>
      <div className="flex items-center gap-2" style={{ opacity: data.unknownTime ? 0.4 : 1 }}>
        <input
          className="input-base font-mono-num text-center w-20"
          aria-label="Birth hour"
          placeholder="HH"
          disabled={data.unknownTime}
          value={data.time.hour}
          onChange={(e) => setTime('hour', e.target.value, 2)}
        />
        <span style={{ color: 'var(--col-moonstone-dim)' }}>:</span>
        <input
          className="input-base font-mono-num text-center w-20"
          aria-label="Birth minute"
          placeholder="MM"
          disabled={data.unknownTime}
          value={data.time.minute}
          onChange={(e) => setTime('minute', e.target.value, 2)}
        />
        <div className="flex gap-2">
          {['AM', 'PM'].map((p) => (
            <button
              key={p}
              disabled={data.unknownTime}
              onClick={() => setData((d) => ({ ...d, time: { ...d.time, period: p } }))}
              className="px-3 py-2 text-sm rounded-full"
              style={
                data.time.period === p
                  ? { background: accent, color: 'var(--col-midnight)', fontWeight: 600 }
                  : { background: 'var(--col-glass)', color: 'var(--col-moonstone-dim)', border: '1px solid var(--col-glass-border)' }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-3 flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--col-moonstone)' }}>
        <input
          type="checkbox"
          aria-label="Unknown birth time"
          checked={data.unknownTime}
          onChange={(e) => setData((d) => ({ ...d, unknownTime: e.target.checked }))}
          style={{ accentColor: accent, width: 14, height: 14 }}
        />
        {t.onboarding_unknown_time[lang]}
      </label>

      <label className="block text-xs mb-2 mt-5" style={{ color: 'var(--col-moonstone-dim)' }}>
        {lang === 'hinglish' ? 'Janam Sthan (Birth Place)' : 'Birth Place'}
      </label>
      <input
        className="input-base"
        aria-label={`${title} birth place`}
        placeholder={lang === 'hinglish' ? 'Shahar ya gaon ka naam' : 'City or town'}
        value={data.birthPlace}
        onChange={(e) => setData((d) => ({ ...d, birthPlace: e.target.value }))}
      />
    </motion.div>
  );
}