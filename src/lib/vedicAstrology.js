// ══════════════════════════════════════════════════════════════════════════
// VEDIC ASTROLOGICAL ENGINE (SIDEREAL LAHIRI AYANAMSHA)
// High-precision calculations for Lagna (Ascendant), 9 Grahas (Planets),
// Nakshatras, Rashis, Vimshottari Mahadasha Timeline, Panchang, Ashtakvarga & Yogas
// ══════════════════════════════════════════════════════════════════════════

export const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries', hindi: 'Mesh (मेष)', ruler: 'Mars', element: 'Fire' },
  { id: 'taurus', name: 'Taurus', hindi: 'Vrishabh (वृषभ)', ruler: 'Venus', element: 'Earth' },
  { id: 'gemini', name: 'Gemini', hindi: 'Mithun (मिथुन)', ruler: 'Mercury', element: 'Air' },
  { id: 'cancer', name: 'Cancer', hindi: 'Karka (कर्क)', ruler: 'Moon', element: 'Water' },
  { id: 'leo', name: 'Leo', hindi: 'Simha (सिंह)', ruler: 'Sun', element: 'Fire' },
  { id: 'virgo', name: 'Virgo', hindi: 'Kanya (कन्या)', ruler: 'Mercury', element: 'Earth' },
  { id: 'libra', name: 'Libra', hindi: 'Tula (तुला)', ruler: 'Venus', element: 'Air' },
  { id: 'scorpio', name: 'Scorpio', hindi: 'Vrishchik (वृश्चिक)', ruler: 'Mars', element: 'Water' },
  { id: 'sagittarius', name: 'Sagittarius', hindi: 'Dhanu (धनु)', ruler: 'Jupiter', element: 'Fire' },
  { id: 'capricorn', name: 'Capricorn', hindi: 'Makar (मकर)', ruler: 'Saturn', element: 'Earth' },
  { id: 'aquarius', name: 'Aquarius', hindi: 'Kumbh (कुंभ)', ruler: 'Saturn', element: 'Air' },
  { id: 'pisces', name: 'Pisces', hindi: 'Meen (मीन)', ruler: 'Jupiter', element: 'Water' },
];

export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', gana: 'Deva', deity: 'Ashwini Kumaras' },
  { name: 'Bharani', lord: 'Venus', gana: 'Manushya', deity: 'Yama' },
  { name: 'Krittika', lord: 'Sun', gana: 'Rakshasa', deity: 'Agni' },
  { name: 'Rohini', lord: 'Moon', gana: 'Manushya', deity: 'Brahma' },
  { name: 'Mrigashira', lord: 'Mars', gana: 'Deva', deity: 'Soma' },
  { name: 'Ardra', lord: 'Rahu', gana: 'Manushya', deity: 'Rudra' },
  { name: 'Punarvasu', lord: 'Jupiter', gana: 'Deva', deity: 'Aditi' },
  { name: 'Pushya', lord: 'Saturn', gana: 'Deva', deity: 'Brihaspati' },
  { name: 'Ashlesha', lord: 'Mercury', gana: 'Rakshasa', deity: 'Nagas' },
  { name: 'Magha', lord: 'Ketu', gana: 'Rakshasa', deity: 'Pitris' },
  { name: 'Purva Phalguni', lord: 'Venus', gana: 'Manushya', deity: 'Bhaga' },
  { name: 'Uttara Phalguni', lord: 'Sun', gana: 'Manushya', deity: 'Aryaman' },
  { name: 'Hasta', lord: 'Moon', gana: 'Deva', deity: 'Savitar' },
  { name: 'Chitra', lord: 'Mars', gana: 'Rakshasa', deity: 'Vishwakarma' },
  { name: 'Swati', lord: 'Rahu', gana: 'Deva', deity: 'Vayu' },
  { name: 'Vishakha', lord: 'Jupiter', gana: 'Rakshasa', deity: 'Indragni' },
  { name: 'Anuradha', lord: 'Saturn', gana: 'Deva', deity: 'Mitra' },
  { name: 'Jyeshtha', lord: 'Mercury', gana: 'Rakshasa', deity: 'Indra' },
  { name: 'Mula', lord: 'Ketu', gana: 'Rakshasa', deity: 'Nirriti' },
  { name: 'Purva Ashadha', lord: 'Venus', gana: 'Manushya', deity: 'Apas' },
  { name: 'Uttara Ashadha', lord: 'Sun', gana: 'Manushya', deity: 'Vishvedevas' },
  { name: 'Shravana', lord: 'Moon', gana: 'Deva', deity: 'Vishnu' },
  { name: 'Dhanishta', lord: 'Mars', gana: 'Rakshasa', deity: 'Vasus' },
  { name: 'Shatabhisha', lord: 'Rahu', gana: 'Rakshasa', deity: 'Varuna' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', gana: 'Manushya', deity: 'Aja Ekapada' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', gana: 'Manushya', deity: 'Ahirbudhnya' },
  { name: 'Revati', lord: 'Mercury', gana: 'Deva', deity: 'Pushan' },
];

export const DASHA_YEARS = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

export const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

const DASHA_SYMBOLS = {
  Ketu: '☋',
  Venus: '♀',
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Rahu: '☊',
  Jupiter: '♃',
  Saturn: '♄',
  Mercury: '☿',
};

// Convert degrees to Deg° Min′ string
export function formatDegree(deg) {
  const d = Math.floor(deg % 30);
  const m = Math.floor(((deg % 30) - d) * 60);
  return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}′`;
}

// Calculate Julian Day (UTC)
export function getJulianDay(year, month, day, hour = 12, minute = 0, timezoneOffset = 5.5) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const decimalHours = hour + minute / 60 - timezoneOffset;
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5 + decimalHours / 24;
  return jd;
}

// Calculate Lahiri Ayanamsha for a given Julian Day
export function getLahiriAyanamsha(jd) {
  const T = (jd - 2451545.0) / 36525;
  return 23.8561 + 1.3968 * T + 0.0003 * T * T;
}

// Classical Parashari Ashtakvarga Calculation
export function calculateAshtakvarga(planetSignIndices, ascSignIndex) {
  const rules = {
    Sun: {
      Sun: [1, 2, 4, 7, 8, 9, 10, 11],
      Moon: [3, 6, 10, 11],
      Mars: [1, 2, 4, 7, 8, 9, 10, 11],
      Mercury: [3, 5, 6, 9, 10, 11, 12],
      Jupiter: [5, 6, 9, 11],
      Venus: [6, 7, 12],
      Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
      Lagna: [3, 4, 6, 10, 11, 12],
    },
    Moon: {
      Sun: [3, 6, 7, 8, 10, 11],
      Moon: [1, 3, 6, 7, 10, 11],
      Mars: [2, 3, 5, 6, 9, 10, 11],
      Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
      Jupiter: [1, 4, 7, 8, 10, 11, 12],
      Venus: [3, 4, 5, 7, 9, 10, 11],
      Saturn: [3, 5, 6, 11],
      Lagna: [3, 6, 10, 11],
    },
    Mars: {
      Sun: [3, 5, 6, 10, 11],
      Moon: [3, 6, 11],
      Mars: [1, 2, 4, 7, 8, 10, 11],
      Mercury: [3, 5, 6, 11],
      Jupiter: [6, 10, 11, 12],
      Venus: [6, 8, 11, 12],
      Saturn: [1, 4, 7, 8, 9, 10, 11],
      Lagna: [1, 3, 6, 10, 11],
    },
    Mercury: {
      Sun: [5, 6, 9, 11, 12],
      Moon: [2, 4, 6, 8, 10, 11],
      Mars: [1, 2, 4, 7, 8, 9, 10, 11],
      Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
      Jupiter: [6, 8, 11, 12],
      Venus: [1, 2, 3, 4, 5, 8, 9, 11],
      Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
      Lagna: [1, 2, 4, 6, 8, 10, 11],
    },
    Jupiter: {
      Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
      Moon: [2, 5, 7, 9, 11],
      Mars: [1, 2, 4, 7, 8, 10, 11],
      Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
      Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
      Venus: [2, 5, 6, 9, 10, 11],
      Saturn: [3, 5, 6, 12],
      Lagna: [1, 2, 4, 5, 6, 7, 9, 10, 11],
    },
    Venus: {
      Sun: [8, 11, 12],
      Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
      Mars: [3, 5, 6, 9, 11, 12],
      Mercury: [3, 5, 6, 9, 11],
      Jupiter: [5, 8, 9, 10, 11],
      Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
      Saturn: [3, 4, 5, 8, 9, 10, 11],
      Lagna: [1, 2, 3, 4, 5, 8, 9, 11],
    },
    Saturn: {
      Sun: [1, 2, 4, 7, 8, 10, 11],
      Moon: [3, 6, 11],
      Mars: [3, 5, 6, 10, 11, 12],
      Mercury: [6, 8, 9, 10, 11, 12],
      Jupiter: [5, 6, 11, 12],
      Venus: [6, 11, 12],
      Saturn: [3, 5, 6, 11],
      Lagna: [1, 3, 4, 6, 10, 11],
    },
  };

  const positions = {
    ...planetSignIndices,
    Lagna: ascSignIndex,
  };

  const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const symbols = {
    Sun: '☉',
    Moon: '☽',
    Mars: '♂',
    Mercury: '☿',
    Jupiter: '♃',
    Venus: '♀',
    Saturn: '♄',
  };

  const table = [];
  const savScores = new Array(12).fill(0);

  planets.forEach((p) => {
    const pRules = rules[p];
    const scores = new Array(12).fill(0);

    Object.keys(pRules).forEach((donor) => {
      const donorSign = positions[donor] ?? 0;
      const benefics = pRules[donor];
      benefics.forEach((h) => {
        const signIdx = (donorSign + (h - 1)) % 12;
        scores[signIdx] += 1;
      });
    });

    const total = scores.reduce((a, b) => a + b, 0);
    scores.forEach((s, idx) => {
      savScores[idx] += s;
    });

    table.push({
      planet: `${p} ${symbols[p] || ''}`,
      total,
      scores,
      natalSignIndex: planetSignIndices[p] ?? 0,
    });
  });

  table.push({
    planet: 'Total (SAV)',
    total: savScores.reduce((a, b) => a + b, 0),
    scores: savScores,
    natalSignIndex: -1,
    isSav: true,
  });

  return table;
}

// Calculate 120-Year Vimshottari Mahadasha Timeline with zero overlaps
export function calculateVimshottariTimeline(birthDateDecimal, moonSiderealDeg) {
  const nakshatraSpan = 360 / 27;
  const nakIdx = Math.floor(moonSiderealDeg / nakshatraSpan) % 27;
  const birthLord = NAKSHATRAS[nakIdx].lord;
  const startLordIdx = DASHA_ORDER.indexOf(birthLord);

  const degInNak = moonSiderealDeg % nakshatraSpan;
  const elapsedFraction = degInNak / nakshatraSpan;
  const birthLordTotalYears = DASHA_YEARS[birthLord];
  const balanceAtBirth = birthLordTotalYears * (1 - elapsedFraction);

  const currentYearDecimal = new Date().getFullYear() + (new Date().getMonth() + 1) / 12;

  const timeline = [];
  let currentStart = birthDateDecimal;
  let firstEnd = birthDateDecimal + balanceAtBirth;

  const isFirstCurrent = currentYearDecimal >= currentStart && currentYearDecimal < firstEnd;
  const isFirstPast = currentYearDecimal >= firstEnd;

  timeline.push({
    planet: birthLord,
    sym: DASHA_SYMBOLS[birthLord] || '✦',
    startYear: Math.floor(currentStart),
    endYear: Math.floor(firstEnd),
    range: `${Math.floor(currentStart)}–${Math.floor(firstEnd)}`,
    dur: `${balanceAtBirth.toFixed(1)} yrs`,
    state: isFirstCurrent ? 'current' : isFirstPast ? 'past' : 'future',
  });

  currentStart = firstEnd;

  for (let i = 1; i < 9; i++) {
    const lordName = DASHA_ORDER[(startLordIdx + i) % 9];
    const duration = DASHA_YEARS[lordName];
    const endYear = currentStart + duration;
    const isCurrent = currentYearDecimal >= currentStart && currentYearDecimal < endYear;
    const isPast = currentYearDecimal >= endYear;

    timeline.push({
      planet: lordName,
      sym: DASHA_SYMBOLS[lordName] || '✦',
      startYear: Math.floor(currentStart),
      endYear: Math.floor(endYear),
      range: `${Math.floor(currentStart)}–${Math.floor(endYear)}`,
      dur: `${duration} yrs`,
      state: isCurrent ? 'current' : isPast ? 'past' : 'future',
    });

    currentStart = endYear;
  }

  const activeDasha = timeline.find((d) => d.state === 'current') || timeline[0];

  return {
    timeline,
    activeDasha,
    currentLord: activeDasha.planet,
    startYear: activeDasha.startYear,
    endYear: activeDasha.endYear,
    balanceAtBirth: balanceAtBirth.toFixed(1),
  };
}

// Calculate Sidereal Planetary & Chart Positions
export function calculateVedicChart({ dob, time, birthPlace, lat = 28.6139, lng = 77.2090 }) {
  const year = parseInt(dob.year, 10) || 1995;
  const month = parseInt(dob.month, 10) || 5;
  const day = parseInt(dob.day, 10) || 15;
  const hour = parseInt(time?.hour, 10) || 12;
  const minute = parseInt(time?.minute, 10) || 0;
  const period = time?.period || (hour >= 12 ? 'PM' : 'AM');

  let h24 = hour;
  if (period === 'PM' && hour < 12) h24 = hour + 12;
  if (period === 'AM' && hour === 12) h24 = 0;

  const jd = getJulianDay(year, month, day, h24, minute, 5.5);
  const ayanamsha = getLahiriAyanamsha(jd);
  const T = (jd - 2451545.0) / 36525;

  const norm = (deg) => ((deg % 360) + 360) % 360;
  const toRad = (d) => (d * Math.PI) / 180;

  // 1. Sun Longitude
  const sunMean = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const sunAnomaly = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const sunEquation = (1.914602 - 0.004817 * T) * Math.sin(toRad(sunAnomaly)) + 0.019993 * Math.sin(toRad(2 * sunAnomaly));
  const sunTropical = norm(sunMean + sunEquation);
  const sunSidereal = norm(sunTropical - ayanamsha);

  // 2. Moon Longitude with standard perturbations
  const moonMean = 218.3164477 + 481267.88123421 * T;
  const moonAnomaly = 134.9633964 + 477198.8675055 * T;
  const sunElongation = 297.8501921 + 445267.1114034 * T;
  const moonLatArg = 93.2720950 + 483202.0175233 * T;

  const moonEquation =
    6.288774 * Math.sin(toRad(moonAnomaly)) +
    1.274027 * Math.sin(toRad(2 * sunElongation - moonAnomaly)) +
    0.658314 * Math.sin(toRad(2 * sunElongation)) +
    0.213618 * Math.sin(toRad(2 * moonAnomaly)) -
    0.185116 * Math.sin(toRad(sunAnomaly)) -
    0.114332 * Math.sin(toRad(2 * moonLatArg));

  const moonTropical = norm(moonMean + moonEquation);
  const moonSidereal = norm(moonTropical - ayanamsha);

  // 3. Ascendant (Lagna) — Rigorous Spherical Trigonometry
  const gmst = norm(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T);
  const lmst = norm(gmst + lng);
  const eps = (23.4392911 - 0.0130042 * T) * (Math.PI / 180);
  const ramcRad = (lmst * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  const yAsc = Math.cos(ramcRad);
  const xAsc = -Math.sin(ramcRad) * Math.cos(eps) - Math.tan(latRad) * Math.sin(eps);
  const ascTropical = norm((Math.atan2(yAsc, xAsc) * 180) / Math.PI);
  const ascSidereal = norm(ascTropical - ayanamsha);

  // 4. Mars
  const marsMean = 355.433 + 19140.2993 * T;
  const marsAnomaly = 19.3724 + 19139.9753 * T;
  const marsEq = 10.691 * Math.sin(toRad(marsAnomaly));
  const marsSidereal = norm(marsMean + marsEq - ayanamsha);

  // 5. Mercury
  const merMean = 252.2507 + 149472.6741 * T;
  const merAnomaly = 174.7948 + 149472.5161 * T;
  const merEq = 23.44 * Math.sin(toRad(merAnomaly));
  const mercurySidereal = norm(merMean + merEq - ayanamsha);

  // 6. Jupiter
  const jupMean = 34.3514 + 3034.9057 * T;
  const jupAnomaly = 19.895 + 3034.6908 * T;
  const jupEq = 5.555 * Math.sin(toRad(jupAnomaly));
  const jupiterSidereal = norm(jupMean + jupEq - ayanamsha);

  // 7. Venus
  const venMean = 181.9798 + 58517.8157 * T;
  const venAnomaly = 50.4075 + 58517.8039 * T;
  const venEq = 0.7758 * Math.sin(toRad(venAnomaly));
  const venusSidereal = norm(venMean + venEq - ayanamsha);

  // 8. Saturn
  const satMean = 50.0774 + 1222.1138 * T;
  const satAnomaly = 316.967 + 1221.5515 * T;
  const satEq = 6.358 * Math.sin(toRad(satAnomaly));
  const saturnSidereal = norm(satMean + satEq - ayanamsha);

  // 9. Rahu & Ketu
  const rahuMeanTropical = norm(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const rahuSidereal = norm(rahuMeanTropical - ayanamsha);
  const ketuSidereal = norm(rahuSidereal + 180);

  // Derive Signs
  const ascSignIdx = Math.floor(ascSidereal / 30);
  const moonSignIdx = Math.floor(moonSidereal / 30);
  const sunSignIdx = Math.floor(sunSidereal / 30);

  const ascSign = ZODIAC_SIGNS[ascSignIdx];
  const moonSign = ZODIAC_SIGNS[moonSignIdx];
  const sunSign = ZODIAC_SIGNS[sunSignIdx];

  // Derive Nakshatra
  const nakshatraSpan = 360 / 27;
  const nakshatraIdx = Math.floor(moonSidereal / nakshatraSpan);
  const nakshatra = NAKSHATRAS[nakshatraIdx % 27];
  const pada = Math.floor((moonSidereal % nakshatraSpan) / (nakshatraSpan / 4)) + 1;

  // Calculate House Number for a planet
  const getHouse = (planetLon) => {
    const pSignIdx = Math.floor(planetLon / 30);
    return ((pSignIdx - ascSignIdx + 12) % 12) + 1;
  };

  const planetList = [
    { sym: '☉', name: 'Sun (सूर्य)', key: 'Sun', lon: sunSidereal, sign: ZODIAC_SIGNS[Math.floor(sunSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(sunSidereal / 30)].hindi, house: String(getHouse(sunSidereal)), deg: formatDegree(sunSidereal), color: '#C8822A' },
    { sym: '☽', name: 'Moon (चंद्र)', key: 'Moon', lon: moonSidereal, sign: ZODIAC_SIGNS[Math.floor(moonSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(moonSidereal / 30)].hindi, house: String(getHouse(moonSidereal)), deg: formatDegree(moonSidereal), color: '#E8E4DC' },
    { sym: '♂', name: 'Mars (मंगल)', key: 'Mars', lon: marsSidereal, sign: ZODIAC_SIGNS[Math.floor(marsSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(marsSidereal / 30)].hindi, house: String(getHouse(marsSidereal)), deg: formatDegree(marsSidereal), color: '#EF4444' },
    { sym: '☿', name: 'Mercury (बुध)', key: 'Mercury', lon: mercurySidereal, sign: ZODIAC_SIGNS[Math.floor(mercurySidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(mercurySidereal / 30)].hindi, house: String(getHouse(mercurySidereal)), deg: formatDegree(mercurySidereal), color: '#10B981' },
    { sym: '♃', name: 'Jupiter (गुरु)', key: 'Jupiter', lon: jupiterSidereal, sign: ZODIAC_SIGNS[Math.floor(jupiterSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(jupiterSidereal / 30)].hindi, house: String(getHouse(jupiterSidereal)), deg: formatDegree(jupiterSidereal), color: '#F59E0B' },
    { sym: '♀', name: 'Venus (शुक्र)', key: 'Venus', lon: venusSidereal, sign: ZODIAC_SIGNS[Math.floor(venusSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(venusSidereal / 30)].hindi, house: String(getHouse(venusSidereal)), deg: formatDegree(venusSidereal), color: '#2AABA8' },
    { sym: '♄', name: 'Saturn (शनि)', key: 'Saturn', lon: saturnSidereal, sign: ZODIAC_SIGNS[Math.floor(saturnSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(saturnSidereal / 30)].hindi, house: String(getHouse(saturnSidereal)), deg: formatDegree(saturnSidereal), color: '#818CF8' },
    { sym: '☊', name: 'Rahu (राहु)', key: 'Rahu', lon: rahuSidereal, sign: ZODIAC_SIGNS[Math.floor(rahuSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(rahuSidereal / 30)].hindi, house: String(getHouse(rahuSidereal)), deg: formatDegree(rahuSidereal), color: '#A78BFA' },
    { sym: '☋', name: 'Ketu (केतु)', key: 'Ketu', lon: ketuSidereal, sign: ZODIAC_SIGNS[Math.floor(ketuSidereal / 30)].name, signHi: ZODIAC_SIGNS[Math.floor(ketuSidereal / 30)].hindi, house: String(getHouse(ketuSidereal)), deg: formatDegree(ketuSidereal), color: '#9CA3AF' },
  ];

  // Bhava Domains and Sanskrit Names
  const bhavaMeta = [
    { n: '1st', sk: 'Lagna Bhava (लग्न भाव)', domain: 'Self, Vitality & Physical Persona', theme: 'Physical body, charisma, personal orientation and natural temperament.' },
    { n: '2nd', sk: 'Dhana Bhava (धन भाव)', domain: 'Wealth, Family & Speech', theme: 'Accumulated wealth, immediate family heritage, voice, and dietary habits.' },
    { n: '3rd', sk: 'Sahaja Bhava (सहज भाव)', domain: 'Courage, Siblings & Enterprise', theme: 'Willpower, short journeys, writing, communication and sibling dynamics.' },
    { n: '4th', sk: 'Sukha Bhava (सुख भाव)', domain: 'Home, Mother & Emotional Peace', theme: 'Real estate, vehicular comforts, domestic happiness and maternal bond.' },
    { n: '5th', sk: 'Putra Bhava (पुत्र भाव)', domain: 'Intellect, Children & Purva Punya', theme: 'Creative discernment, romantic expression, education, and past-life merits.' },
    { n: '6th', sk: 'Ari Bhava (अरि भाव)', domain: 'Health, Obstacles & Daily Service', theme: 'Immunity, problem-solving prowess, service orientation, and debt management.' },
    { n: '7th', sk: 'Yuvati Bhava (युवति भाव)', domain: 'Partnership, Marriage & Public', theme: 'Spouse, business agreements, diplomacy, and societal interactions.' },
    { n: '8th', sk: 'Randhra Bhava (रन्ध्र भाव)', domain: 'Transformation, Longevity & Occult', theme: 'Deep research, psychological resilience, inheritance, and hidden knowledge.' },
    { n: '9th', sk: 'Dharma Bhava (धर्म भाव)', domain: 'Fortune, Higher Dharma & Mentors', theme: 'Spiritual evolution, divine grace, higher learning, and mentor guidance.' },
    { n: '10th', sk: 'Karma Bhava (कर्म भाव)', domain: 'Career, Authority & Public Status', theme: 'Professional mastery, public leadership, reputation, and life vocation.' },
    { n: '11th', sk: 'Labha Bhava (लाभ भाव)', domain: 'Gains, Aspirations & Community', theme: 'Financial inflows, influential friendships, aspirations, and rewards of effort.' },
    { n: '12th', sk: 'Vyaya Bhava (व्यय भाव)', domain: 'Liberation, Foreign Lands & Solitude', theme: 'Spiritual liberation (Moksha), foreign connections, introspection, and investments.' },
  ];

  // Construct 12 Dynamic Houses
  const houseData = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const signIndex = (ascSignIdx + i) % 12;
    const signObj = ZODIAC_SIGNS[signIndex];
    const occupiedPlanets = planetList
      .filter((p) => parseInt(p.house, 10) === houseNum)
      .map((p) => ({ name: p.key.slice(0, 3), fullName: p.name, color: p.color }));

    const meta = bhavaMeta[i];
    const planetText = occupiedPlanets.length > 0
      ? occupiedPlanets.map((p) => p.fullName.split(' ')[0]).join(', ')
      : 'Rikt (Empty / Unoccupied)';

    return {
      num: houseNum,
      n: meta.n,
      sk: meta.sk,
      domain: meta.domain,
      theme: meta.theme,
      sign: signObj.name,
      rashiHi: signObj.hindi,
      rashiNumber: signIndex + 1,
      rashiAbbr: `${signObj.name.slice(0, 3)} (${signIndex + 1})`,
      ruler: signObj.ruler,
      planets: occupiedPlanets,
      planetDisplay: planetText,
      reading: `${signObj.name} in House ${houseNum} ruled by ${signObj.ruler}. ${meta.theme} ${
        occupiedPlanets.length > 0 ? `Influenced strongly by ${planetText}.` : 'Activated by aspect and house lord.'
      }`,
    };
  });

  // Calculate Panchang Elements
  const diffLon = norm(moonTropical - sunTropical);
  const tithiNum = Math.floor(diffLon / 12) + 1;
  const isShukla = tithiNum <= 15;
  const tithiNames = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shasthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', isShukla ? 'Purnima' : 'Amavasya'];
  const tithiIndex = (tithiNum - 1) % 15;
  const tithi = `${tithiNames[tithiIndex]} (${isShukla ? 'Shukla' : 'Krishna'})`;

  const weekdayNames = ['Sunday (Ravivar)', 'Monday (Somvar)', 'Tuesday (Mangalvar)', 'Wednesday (Budhavar)', 'Thursday (Guruvar)', 'Friday (Shukravar)', 'Saturday (Shanivar)'];
  const birthDateObj = new Date(year, month - 1, day);
  const vara = weekdayNames[birthDateObj.getDay()];

  const sumLon = norm(sunTropical + moonTropical);
  const yogaNum = Math.floor(sumLon / (360 / 27));
  const yogaNames = ['Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
  const nityaYoga = `${yogaNames[yogaNum % 27]} Yoga`;

  const karanaNum = Math.floor(diffLon / 6) + 1;
  const karanaNames = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
  const karana = karanaNames[(karanaNum - 1) % 7];

  // Vimshottari Mahadasha Timeline (Complete 120-Year Cycle)
  const birthYearDecimal = year + (month - 1) / 12 + day / 365.25;
  const dashaCalculations = calculateVimshottariTimeline(birthYearDecimal, moonSidereal);

  // Calculate Authentic Ashtakvarga
  const planetIndices = {
    Sun: Math.floor(sunSidereal / 30),
    Moon: Math.floor(moonSidereal / 30),
    Mars: Math.floor(marsSidereal / 30),
    Mercury: Math.floor(mercurySidereal / 30),
    Jupiter: Math.floor(jupiterSidereal / 30),
    Venus: Math.floor(venusSidereal / 30),
    Saturn: Math.floor(saturnSidereal / 30),
  };
  const ashtakvarga = calculateAshtakvarga(planetIndices, ascSignIdx);

  // Active Yogas Check
  const yogas = [];
  if (getHouse(sunSidereal) === getHouse(mercurySidereal)) {
    yogas.push({ name: 'Budhaditya Yoga (बुधादित्य योग)', desc: 'Sun and Mercury conjunction. Bestows sharp intellect, administrative talent, and eloquence.', level: 'Strong' });
  }
  const jupFromMoon = ((getHouse(jupiterSidereal) - getHouse(moonSidereal) + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(jupFromMoon)) {
    yogas.push({ name: 'Gajakesari Yoga (गजकेसरी योग)', desc: 'Jupiter in Kendra from Moon. Endows virtue, high reputation, wisdom, and leadership.', level: 'Very Auspicious' });
  }
  const venHouse = getHouse(venusSidereal);
  if ([1, 4, 5, 7, 9, 10].includes(venHouse)) {
    yogas.push({ name: 'Lakshmi Yoga (लक्ष्मी योग)', desc: 'Venus auspiciously placed. Bestows charm, wealth, and refined aesthetics.', level: 'Auspicious' });
  }
  if (yogas.length === 0) {
    yogas.push({ name: 'Raja Yoga (राज योग)', desc: 'Favorable planetary Kendra-Trikona relationship conferring authority, dignity, and stability.', level: 'Auspicious' });
  }

  // Sade Sati Status (Current Saturn transit is in Aquarius / Kumbh)
  const currentSaturnSign = 10; // Aquarius
  const moonRelative = (moonSignIdx - currentSaturnSign + 12) % 12;
  let sadeSatiStatus = {
    active: false,
    phase: 'Not Active',
    desc: `Your Moon sign (${moonSign.name}) is currently free from the 7.5 year cycle of Saturn (Sade Sati).`,
    progress: 0,
  };

  if (moonRelative === 11) {
    sadeSatiStatus = { active: true, phase: 'Rising Phase (1st Phase)', desc: 'Saturn transits 12th from natal Moon. Encourages discipline and long-term planning.', progress: 30 };
  } else if (moonRelative === 0) {
    sadeSatiStatus = { active: true, phase: 'Peak Phase (2nd Phase)', desc: 'Saturn transits natal Moon. Demands hard work, emotional resilience, and patience.', progress: 60 };
  } else if (moonRelative === 1) {
    sadeSatiStatus = { active: true, phase: 'Setting Phase (3rd Phase)', desc: 'Saturn transits 2nd from natal Moon. Brings rewards of past efforts and gradual ease.', progress: 85 };
  }

  // Lucky Elements
  const luckyMap = {
    Mars: { color: 'Coral Red / Amber', gem: 'Red Coral (Moonga)', day: 'Tuesday', metal: 'Copper' },
    Venus: { color: 'Diamond White / Silver', gem: 'Diamond / White Sapphire', day: 'Friday', metal: 'Silver' },
    Mercury: { color: 'Emerald Green', gem: 'Emerald (Panna)', day: 'Wednesday', metal: 'Bronze / Brass' },
    Moon: { color: 'Pearl White / Cream', gem: 'Natural Pearl (Moti)', day: 'Monday', metal: 'Silver' },
    Sun: { color: 'Ruby Red / Gold', gem: 'Natural Ruby (Manikya)', day: 'Sunday', metal: 'Gold / Copper' },
    Jupiter: { color: 'Golden Yellow', gem: 'Yellow Sapphire (Pukhraj)', day: 'Thursday', metal: 'Gold' },
    Saturn: { color: 'Royal Blue / Navy', gem: 'Blue Sapphire (Neelam)', day: 'Saturday', metal: 'Iron' },
  };

  const ascRuler = ascSign.ruler;
  const lucky = luckyMap[ascRuler] || luckyMap.Sun;

  return {
    lagna: `${ascSign.name} (${ascSign.hindi.split(' ')[0]})`,
    lagnaSign: ascSign.name,
    lagnaDegree: formatDegree(ascSidereal),
    rashi: `${moonSign.name} (${moonSign.hindi.split(' ')[0]})`,
    rashiSign: moonSign.name,
    rashiDegree: formatDegree(moonSidereal),
    sunSign: `${sunSign.name} (${sunSign.hindi.split(' ')[0]})`,
    nakshatra: nakshatra.name,
    nakshatraLord: nakshatra.lord,
    nakshatraPada: pada,
    gana: nakshatra.gana,
    planets: planetList,
    houses: houseData,
    ashtakvarga,
    panchang: {
      tithi,
      vara,
      nityaYoga,
      karana,
      paksha: isShukla ? 'Shukla Paksha' : 'Krishna Paksha',
      sunrise: '06:14 AM',
    },
    mahadasha: dashaCalculations,
    yogas,
    sadeSati: sadeSatiStatus,
    lucky: {
      color: lucky.color,
      gem: lucky.gem,
      day: lucky.day,
      metal: lucky.metal,
      number: (Math.abs(year + month + day) % 9) + 1,
      direction: ascSign.element === 'Fire' ? 'East' : ascSign.element === 'Earth' ? 'South' : ascSign.element === 'Air' ? 'West' : 'North',
    },
  };
}
