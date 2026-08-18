import React, { useRef } from 'react';
import StepShell from './StepShell';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

const fields = [
  { key: 'day', label: 'Day', max: 2, ph: 'DD' },
  { key: 'month', label: 'Month', max: 2, ph: 'MM' },
  { key: 'year', label: 'Year', max: 4, ph: 'YYYY' },
];

export default function StepDob({ formData, setFormData, goNext, goBack }) {
  const { lang } = useLang();
  const refs = [useRef(null), useRef(null), useRef(null)];
  const { day, month, year } = formData.dob;

  const valid =
    +day >= 1 && +day <= 31 && +month >= 1 && +month <= 12 && +year >= 1900 && +year <= new Date().getFullYear();

  const update = (key, value, i, max) => {
    const clean = value.replace(/\D/g, '').slice(0, max);
    setFormData((d) => ({ ...d, dob: { ...d.dob, [key]: clean } }));
    if (clean.length === max && refs[i + 1]) refs[i + 1].current?.focus();
  };

  return (
    <StepShell question={t.onboarding_step2_title[lang]} subtext={t.onboarding_step2_sub[lang]}>
      <div className="grid grid-cols-3 gap-3">
        {fields.map((f, i) => (
          <div key={f.key}>
            <label className="block mb-2 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
              {f.label}
            </label>
            <input
              ref={refs[i]}
              className="input-base font-mono-num text-center"
              aria-label={`Birth ${f.label}`}
              inputMode="numeric"
              placeholder={f.ph}
              value={formData.dob[f.key]}
              onChange={(e) => update(f.key, e.target.value, i, f.max)}
              onKeyDown={(e) => e.key === 'Enter' && valid && goNext()}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button className="btn-ghost" onClick={goBack}>{t.back_btn[lang]}</button>
        <button className="btn-primary" disabled={!valid} onClick={goNext}>{t.continue_btn[lang]}</button>
      </div>
    </StepShell>
  );
}