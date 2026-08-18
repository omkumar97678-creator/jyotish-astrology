import React from 'react';
import StepShell from './StepShell';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function StepName({ formData, setFormData, goNext }) {
  const { lang } = useLang();
  const valid = formData.name.trim() !== '';

  return (
    <StepShell question={t.onboarding_step1_title[lang]} subtext={t.onboarding_step1_sub[lang]}>
      <input
        className="input-base"
        style={{ fontSize: '1.15rem' }}
        aria-label="Full name"
        autoFocus
        placeholder={t.onboarding_step1_placeholder[lang]}
        value={formData.name}
        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
        onKeyDown={(e) => e.key === 'Enter' && valid && goNext()}
      />
      <p className="mt-4 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
        {t.onboarding_step1_note[lang]}
      </p>
      <div className="mt-8">
        <button className="btn-primary" disabled={!valid} onClick={goNext}>
          {t.continue_btn[lang]}
        </button>
      </div>
    </StepShell>
  );
}