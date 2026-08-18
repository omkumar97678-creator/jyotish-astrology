import React from 'react';
import StepShell from './StepShell';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function StepTime({ formData, setFormData, goNext, goBack }) {
  const { lang } = useLang();
  const { hour, minute, period } = formData.time;
  const unknown = formData.unknownTime;
  const valid = unknown || (+hour >= 1 && +hour <= 12 && minute !== '' && +minute >= 0 && +minute <= 59);

  const setTime = (key, value, max) =>
    setFormData((d) => ({ ...d, time: { ...d.time, [key]: value.replace(/\D/g, '').slice(0, max) } }));

  return (
    <StepShell question={t.onboarding_step3_title[lang]} subtext={t.onboarding_step3_sub[lang]}>
      <div className="flex flex-wrap items-end gap-2 sm:gap-3">
        <div className="flex-1 min-w-[70px]">
          <label className="block mb-2 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            {lang === 'hinglish' ? 'Ghanta' : 'Hour'}
          </label>
          <input
            className="input-base font-mono-num text-center"
            aria-label="Birth hour"
            inputMode="numeric"
            placeholder="HH"
            disabled={unknown}
            value={hour}
            onChange={(e) => setTime('hour', e.target.value, 2)}
          />
        </div>
        <span className="pb-3 text-lg font-bold" style={{ color: 'var(--col-moonstone-dim)' }}>:</span>
        <div className="flex-1 min-w-[70px]">
          <label className="block mb-2 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
            {lang === 'hinglish' ? 'Minute' : 'Minute'}
          </label>
          <input
            className="input-base font-mono-num text-center"
            aria-label="Birth minute"
            inputMode="numeric"
            placeholder="MM"
            disabled={unknown}
            value={minute}
            onChange={(e) => setTime('minute', e.target.value, 2)}
          />
        </div>
        <div className="flex gap-1.5 pb-0.5">
          {['AM', 'PM'].map((p) => (
            <button
              key={p}
              type="button"
              disabled={unknown}
              onClick={() => setFormData((d) => ({ ...d, time: { ...d.time, period: p } }))}
              className="glass-card px-3.5 sm:px-4 py-3 text-xs sm:text-sm"
              style={
                period === p
                  ? { background: 'var(--col-copper)', color: 'var(--col-midnight)', fontWeight: 600, borderRadius: 'var(--r-full)' }
                  : { color: 'var(--col-moonstone-dim)', borderRadius: 'var(--r-full)', opacity: unknown ? 0.4 : 1 }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-7 flex items-center gap-3 text-sm cursor-pointer" style={{ color: 'var(--col-moonstone)' }}>
        <input
          type="checkbox"
          aria-label="I don't know my exact birth time"
          checked={unknown}
          onChange={(e) => setFormData((d) => ({ ...d, unknownTime: e.target.checked }))}
          style={{ accentColor: 'var(--col-copper)', width: 16, height: 16 }}
        />
        {t.onboarding_unknown_time[lang]}
      </label>

      {unknown && (
        <div
          className="mt-4 text-xs sm:text-sm"
          style={{
            border: '1px solid rgba(42,171,168,0.35)',
            background: 'rgba(42,171,168,0.08)',
            color: 'var(--col-moonstone-dim)',
            borderRadius: 'var(--r-md)',
            padding: '14px 16px',
            lineHeight: 1.6,
          }}
        >
          {t.onboarding_sunrise_note[lang]}
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <button className="btn-ghost flex-1 sm:flex-none justify-center" onClick={goBack}>{t.back_btn[lang]}</button>
        <button className="btn-primary flex-1 sm:flex-none justify-center" disabled={!valid} onClick={goNext}>{t.continue_btn[lang]}</button>
      </div>
    </StepShell>
  );
}