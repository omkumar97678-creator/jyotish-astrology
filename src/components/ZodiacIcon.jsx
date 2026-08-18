import React from 'react';

const glyphs = {
  // Aries (♈)
  aries: (
    <path
      d="M6 18C6 14 8 10 12 10C16 10 18 14 18 18M18 18C18 14 20 10 24 10C28 10 30 14 30 18M18 18V28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  // Taurus (♉)
  taurus: (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 9C9 14 14 16 18 16C22 16 27 14 29 9" />
      <circle cx="18" cy="22" r="6.5" />
    </g>
  ),
  // Gemini (♊)
  gemini: (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8C14 11 22 11 29 8" />
      <path d="M7 28C14 25 22 25 29 28" />
      <line x1="13" y1="9.5" x2="13" y2="26.5" />
      <line x1="23" y1="9.5" x2="23" y2="26.5" />
    </g>
  ),
  // Cancer (♋)
  cancer: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="3.5" />
      <path d="M12 9.5C18 9.5 25 13 25 18" />
      <circle cx="24" cy="23" r="3.5" />
      <path d="M24 26.5C18 26.5 11 23 11 18" />
    </g>
  ),
  // Leo (♌)
  leo: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="21" r="3.5" />
      <path d="M14.5 21C14.5 13 19 9 23 12C26 14 26 19 23 23C21 26 22 28 25 28" />
    </g>
  ),
  // Virgo (♍)
  virgo: (
    <g fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V24M6 13C6 10 9 8 11.5 8C14 8 15.5 10 15.5 13V24M15.5 13C15.5 10 18.5 8 21 8C23.5 8 25 10 25 13V24C25 28 29 28 29 23V20" />
      <path d="M22 23L29 27" />
    </g>
  ),
  // Libra (♎)
  libra: (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="26" x2="30" y2="26" />
      <line x1="6" y1="20" x2="12" y2="20" />
      <line x1="24" y1="20" x2="30" y2="20" />
      <path d="M12 20C12 15 14 11 18 11C22 11 24 15 24 20" />
    </g>
  ),
  // Scorpio (♏)
  scorpio: (
    <g fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V24M6 13C6 10 9 8 11.5 8C14 8 15.5 10 15.5 13V24M15.5 13C15.5 10 18.5 8 21 8C23.5 8 25 10 25 13V26C25 28 27 28 29 26" />
      <path d="M26 23L30 26L28 30" />
    </g>
  ),
  // Sagittarius (♐)
  sagittarius: (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="28" x2="28" y2="8" />
      <path d="M18 8H28V18" />
      <line x1="12" y1="24" x2="19" y2="17" />
    </g>
  ),
  // Capricorn (♑)
  capricorn: (
    <g fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10V24M7 13C7 10 10 8 12.5 8C15 8 16.5 10 16.5 13V26C16.5 28 19 28 21 26C23 23 27 21 27 25C27 28 24 30 21 28" />
    </g>
  ),
  // Aquarius (♒)
  aquarius: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14L10 10L14 14L18 10L22 14L26 10L30 14" />
      <path d="M6 22L10 18L14 22L18 18L22 22L26 18L30 22" />
    </g>
  ),
  // Pisces (♓)
  pisces: (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 8C14 14 14 22 10 28" />
      <path d="M26 8C22 14 22 22 26 28" />
      <line x1="7" y1="18" x2="29" y2="18" />
    </g>
  ),
};

const mapName = (s) => {
  if (!s) return 'aries';
  const str = String(s).toLowerCase();
  if (str.includes('leo') || str.includes('simha') || str === '♌') return 'leo';
  if (str.includes('can') || str.includes('kark') || str === '♋') return 'cancer';
  if (str.includes('ari') || str.includes('mesh') || str === '♈') return 'aries';
  if (str.includes('tau') || str.includes('vrish') || str === '♉') return 'taurus';
  if (str.includes('gem') || str.includes('mith') || str === '♊') return 'gemini';
  if (str.includes('vir') || str.includes('kan') || str === '♍') return 'virgo';
  if (str.includes('lib') || str.includes('tul') || str === '♎') return 'libra';
  if (str.includes('sco') || str.includes('vrishch') || str === '♏') return 'scorpio';
  if (str.includes('sag') || str.includes('dhan') || str === '♐') return 'sagittarius';
  if (str.includes('cap') || str.includes('mak') || str === '♑') return 'capricorn';
  if (str.includes('aqu') || str.includes('kumb') || str === '♒') return 'aquarius';
  if (str.includes('pis') || str.includes('meen') || str === '♓') return 'pisces';
  return 'aries';
};

export default function ZodiacIcon({ sign, size = 32, className = '', style = {} }) {
  const key = mapName(sign);
  const glyph = glyphs[key] || glyphs.aries;

  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      className={`inline-block select-none ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color: 'inherit',
        ...style,
      }}
    >
      {glyph}
    </svg>
  );
}
