import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  lang: 'en',
  toggle: () => {},
  setLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('jyotish_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (newLang) => {
    if (newLang === lang) return;
    document.body.classList.add('lang-switching');
    setTimeout(() => {
      setLangState(newLang);
      try {
        localStorage.setItem('jyotish_lang', newLang);
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        document.body.classList.remove('lang-switching');
      }, 50);
    }, 150);
  };

  const toggle = () => {
    const next = lang === 'en' ? 'hinglish' : 'en';
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
