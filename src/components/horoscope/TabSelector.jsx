import React from 'react';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function TabSelector({ active, onChange }) {
  const { lang } = useLang();

  const tabs = [
    { id: 'Today', label: t.tab_today[lang] },
    { id: 'This Week', label: t.tab_week[lang] },
    { id: 'This Month', label: t.tab_month[lang] },
  ];

  return (
    <div className="flex justify-center gap-2 mt-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="px-5 py-2.5 text-sm rounded-full transition-all"
          style={
            active === tab.id
              ? { background: 'var(--col-copper)', color: 'var(--col-midnight)', fontWeight: 600 }
              : { background: 'var(--col-glass)', color: 'var(--col-moonstone-dim)', border: '1px solid var(--col-glass-border)' }
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}