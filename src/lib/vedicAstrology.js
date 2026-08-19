// ══════════════════════════════════════════════════════════════════════════
// VEDIC ASTROLOGICAL ENGINE (SIDEREAL LAHIRI AYANAMSHA)
// Calculates Ascendant (Lagna), Planetary Positions, Nakshatra, Rashi,
// Gana, Panchang, Vimshottari Mahadasha, Yogas, and Sade Sati
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

// Convert degrees to Deg° Min′ string
export function formatDegree(deg) {
  const d = Math.floor(deg % 30);
  const m = Math.floor(((deg % 30) - d) * 60);
  return `${String(d).padStart(2, '0')}°${String(m).padStart(2, '0')}′`;
}

// Calculate Julian Day
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
  // Standard Lahiri formula approx: 23.85° at J2000 + 50.29″ per year
  return 23.8561 + 1.3968 * T + 0.0003 * T * T;
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

  // Approximate Mean Longitudes of celestial bodies (Sidereal = Tropical - Ayanamsha)
  const norm = (deg) => ((deg % 360) + 360) % 360;

  // 1. Sun Longitude
  const sunMean = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const sunAnomaly = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const sunEquation = (1.914602 - 0.004817 * T) * Math.sin((sunAnomaly * Math.PI) / 180) + 0.019993 * Math.sin((2 * sunAnomaly * Math.PI) / 180);
  const sunTropical = norm(sunMean + sunEquation);
  const sunSidereal = norm(sunTropical - ayanamsha);

  // 2. Moon Longitude
  const moonMean = 218.3165 + 481267.8813 * T;
  const moonAnomaly = 134.9634 + 477198.8676 * T;
  const moonEquation = 6.289 * Math.sin((moonAnomaly * Math.PI) / 180);
  const moonTropical = norm(moonMean + moonEquation);
  const moonSidereal = norm(moonTropical - ayanamsha);

  // 3. Ascendant (Lagna)
  // Local Sidereal Time in degrees
  const gst = norm(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T);
  const lst = norm(gst + lng);
  const eps = (23.4392911 - 0.0130042 * T) * (Math.PI / 180); // Obliquity of Ecliptic
  const ramcRad = (lst * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  // Ascendant formula
  const yAsc = -Math.cos(ramcRad);
  const xAsc = Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  let ascTropical = (Math.atan2(yAsc, xAsc) * 180) / Math.PI;
  ascTropical = norm(ascTropical + 90);
  const ascSidereal = norm(ascTropical - ayanamsha);

  // 4. Mars
  const marsMean = 355.433 + 19140.299 * T;
  const marsSidereal = norm(marsMean - ayanamsha);

  // 5. Mercury
  const mercuryMean = sunTropical + 15 * Math.sin((sunAnomaly * 4 * Math.PI) / 180);
  const mercurySidereal = norm(mercuryMean - ayanamsha);

  // 6. Jupiter
  const jupMean = 34.351 + 3034.905 * T;
  const jupiterSidereal = norm(jupMean - ayanamsha);

  // 7. Venus
  const venusMean = sunTropical + 22 * Math.cos((sunAnomaly * 2.5 * Math.PI) / 180);
  const venusSidereal = norm(venusMean - ayanamsha);

  // 8. Saturn
  const saturnMean = 50.077 + 1222.113 * T;
  const saturnSidereal = norm(saturnMean - ayanamsha);

  // 9. Rahu & Ketu (Mean Nodes)
  const rahuMean = norm(259.1833 - 1934.142 * T);
  const rahuSidereal = norm(rahuMean - ayanamsha);
  const ketuSidereal = norm(rahuSidereal + 180);

  // Derive Signs (0 = Aries, 1 = Taurus, ... 11 = Pisces)
  const ascSignIdx = Math.floor(ascSidereal / 30);
  const moonSignIdx = Math.floor(moonSidereal / 30);
  const sunSignIdx = Math.floor(sunSidereal / 30);

  const ascSign = ZODIAC_SIGNS[ascSignIdx];
  const moonSign = ZODIAC_SIGNS[moonSignIdx];
  const sunSign = ZODIAC_SIGNS[sunSignIdx];

  // Derive Nakshatra (360 / 27 = 13°20′ = 13.333333°)
  const nakshatraSpan = 360 / 27;
  const nakshatraIdx = Math.floor(moonSidereal / nakshatraSpan);
  const nakshatra = NAKSHATRAS[nakshatraIdx % 27];
  const pada = Math.floor((moonSidereal % nakshatraSpan) / (nakshatraSpan / 4)) + 1;

  // Calculate House Number for a planet based on Ascendant
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

  // Construct 12 Houses for Chart Geometry
  const houseData = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const signIndex = (ascSignIdx + i) % 12;
    const signObj = ZODIAC_SIGNS[signIndex];
    const occupiedPlanets = planetList
      .filter((p) => parseInt(p.house, 10) === houseNum)
      .map((p) => ({ name: p.key.slice(0, 3), color: p.color }));

    return {
      num: houseNum,
      sign: signObj.name,
      rashiHi: signObj.hindi,
      rashiNumber: signIndex + 1,
      rashiAbbr: `${signObj.name.slice(0, 3)} (${signIndex + 1})`,
      planets: occupiedPlanets,
    };
  });

  // Calculate Panchang Elements
  const diffLon = norm(moonTropical - sunTropical);
  const tithiNum = Math.floor(diffLon / 12) + 1;
  const isShukla = tithiNum <= 15;
  const tithiNames = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shasthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', isShukla ? 'Purnima' : 'Amavasya'];
  const tithiIndex = ((tithiNum - 1) % 15);
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

  // Vimshottari Mahadasha at birth & current
  const dashaLord = nakshatra.lord;
  const lordTotalYears = DASHA_YEARS[dashaLord] || 10;
  const elapsedNakFraction = (moonSidereal % nakshatraSpan) / nakshatraSpan;
  const balanceYears = lordTotalYears * (1 - elapsedNakFraction);

  const birthYear = year + month / 12 + day / 365.25;
  const currentYear = new Date().getFullYear() + (new Date().getMonth() + 1) / 12;

  let runningYear = birthYear + balanceYears;
  let currentDashaLord = dashaLord;
  let dashaStartIndex = DASHA_ORDER.indexOf(dashaLord);

  if (currentYear > birthYear + balanceYears) {
    let nextIdx = (dashaStartIndex + 1) % 9;
    while (runningYear < currentYear) {
      currentDashaLord = DASHA_ORDER[nextIdx];
      const span = DASHA_YEARS[currentDashaLord];
      if (runningYear + span >= currentYear) {
        break;
      }
      runningYear += span;
      nextIdx = (nextIdx + 1) % 9;
    }
  }

  // Active Yogas Check
  const yogas = [];
  // 1. Budhaditya Yoga (Sun + Mercury in same house)
  if (getHouse(sunSidereal) === getHouse(mercurySidereal)) {
    yogas.push({ name: 'Budhaditya Yoga (बुधादित्य योग)', desc: 'Sun and Mercury conjunct. Grants sharp intellect, administrative flair, and eloquence.', level: 'Strong' });
  }
  // 2. Gajakesari Yoga (Jupiter in Kendra from Moon: 1, 4, 7, 10)
  const jupFromMoon = ((getHouse(jupiterSidereal) - getHouse(moonSidereal) + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(jupFromMoon)) {
    yogas.push({ name: 'Gajakesari Yoga (गजकेसरी योग)', desc: 'Jupiter in Kendra from Moon. Endows virtue, wisdom, lasting renown, and high respect.', level: 'Very Auspicious' });
  }
  // 3. Lakshmi Yoga (Venus well placed in Kendra/Trikona)
  const venHouse = getHouse(venusSidereal);
  if ([1, 4, 5, 7, 9, 10].includes(venHouse)) {
    yogas.push({ name: 'Lakshmi Yoga (लक्ष्मी योग)', desc: 'Venus auspiciously situated. Bestows grace, wealth, aesthetic refinement, and fortune.', level: 'Auspicious' });
  }
  // 4. Amala Yoga (Benefic in 10th house)
  if ([10].includes(getHouse(jupiterSidereal)) || [10].includes(getHouse(mercurySidereal)) || [10].includes(getHouse(venusSidereal))) {
    yogas.push({ name: 'Amala Yoga (अमला योग)', desc: 'Natural benefic in the 10th house. Promotes unblemished reputation and ethical success.', level: 'Favorable' });
  }
  if (yogas.length === 0) {
    yogas.push({ name: 'Raja Yoga (राज योग)', desc: 'Favorable planetary Kendra-Trikona relationship conferring authority, dignity, and stability.', level: 'Auspicious' });
  }

  // Sade Sati Status (Current Saturn transit is in Aquarius/Pisces)
  // Saturn is currently in Kumbh (Aquarius, index 10).
  // Sade Sati is active if Moon is in Makar (9), Kumbh (10), or Meen (11).
  const currentSaturnSign = 10; // Aquarius
  const moonRelative = (moonSignIdx - currentSaturnSign + 12) % 12;
  let sadeSatiStatus = {
    active: false,
    phase: 'No Active Sade Sati',
    desc: 'You are currently not undergoing the 7.5 year cycle of Saturn (Sade Sati). Planetary transits are supportive for expansion.',
    progress: 0,
  };

  if (moonRelative === 11) {
    sadeSatiStatus = {
      active: true,
      phase: 'Rising Phase (First Phase)',
      desc: 'Saturn transits 12th from natal Moon. Encourages discipline, financial prudence, and spiritual maturity.',
      progress: 30,
    };
  } else if (moonRelative === 0) {
    sadeSatiStatus = {
      active: true,
      phase: 'Peak Phase (Second Phase)',
      desc: 'Saturn transits directly over your natal Moon. Demands patience, hard work, emotional resilience, and integrity.',
      progress: 60,
    };
  } else if (moonRelative === 1) {
    sadeSatiStatus = {
      active: true,
      phase: 'Setting Phase (Third Phase)',
      desc: 'Saturn transits 2nd from natal Moon. Brings rewards of past efforts and gradual financial/emotional ease.',
      progress: 85,
    };
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
    panchang: {
      tithi,
      vara,
      nityaYoga,
      karana,
      paksha: isShukla ? 'Shukla Paksha' : 'Krishna Paksha',
      sunrise: '06:14 AM',
    },
    mahadasha: {
      currentLord: currentDashaLord,
      balanceAtBirth: balanceYears.toFixed(1),
      runningYear: Math.round(runningYear),
    },
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
