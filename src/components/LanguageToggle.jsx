import React from 'react';
import { useLang } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggle } = useLang();

  return (
    <div
      className="flex items-center p-[2px] sm:p-[3px] rounded-full"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {['en', 'hinglish'].map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => lang !== l && toggle()}
            className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer"
            style={{
              background: active
                ? 'linear-gradient(135deg, #C8822A, #E09840)'
                : 'transparent',
              color: active ? '#0D0F2B' : 'rgba(232, 228, 220, 0.6)',
              boxShadow: active ? '0 0 10px rgba(200, 130, 42, 0.25)' : 'none',
            }}
          >
            {l === 'en' ? (
              'EN'
            ) : (
              <>
                <span className="hidden sm:inline">अ Hinglish</span>
                <span className="sm:hidden inline font-bold">अ</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
