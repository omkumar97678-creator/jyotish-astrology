import React from 'react';
import { Search } from 'lucide-react';
import StepShell from './StepShell';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Patna'];

export default function StepPlace({ formData, setFormData, goNext, goBack }) {
  const { lang } = useLang();
  const valid = formData.birthPlace.trim().length >= 3;

  return (
    <StepShell question={t.onboarding_step4_title[lang]} subtext={t.onboarding_step4_sub[lang]}>
      <div className="relative">
        <Search
          size={18}
          style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--col-moonstone-dim)' }}
        />
        <input
          className="input-base"
          style={{ paddingLeft: 46 }}
          aria-label="Birth city"
          autoFocus
          placeholder={t.onboarding_step4_placeholder[lang]}
          value={formData.birthPlace}
          onChange={(e) => setFormData((d) => ({ ...d, birthPlace: e.target.value }))}
          onKeyDown={(e) => e.key === 'Enter' && valid && goNext()}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {cities.map((c) => (
          <button
            key={c}
            onClick={() => setFormData((d) => ({ ...d, birthPlace: c }))}
            className="glass-card px-4 py-2 text-sm"
            style={{ borderRadius: 'var(--r-full)', color: 'var(--col-moonstone-dim)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(200,130,42,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--col-glass-border)')}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
        {lang === 'hinglish' ? 'International cities bhi supported hain.' : 'International cities are supported too.'}
      </p>

      <div className="mt-8 flex gap-3">
        <button className="btn-ghost" onClick={goBack}>{t.back_btn[lang]}</button>
        <button className="btn-primary" disabled={!valid} onClick={goNext}>{t.continue_btn[lang]}</button>
      </div>
    </StepShell>
  );
}