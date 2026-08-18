import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function HoroNav({ selected, setSelected }) {
  const { lang } = useLang();
  const prev = () => setSelected((selected + 11) % 12);
  const next = () => setSelected((selected + 1) % 12);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
        <button onClick={prev}>{t.prev_sign[lang]}</button>
        <span style={{ color: 'rgba(232,228,220,0.25)' }}>|</span>
        <button onClick={next}>{t.next_sign[lang]}</button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/onboarding" className="btn-primary" style={{ padding: '16px 40px' }}>
          {t.get_personal[lang]}
        </Link>
        <Link to="/kundli" className="btn-ghost">{t.view_kundli[lang]}</Link>
      </div>
    </div>
  );
}