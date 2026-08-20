// ══════════════════════════════════════════════════════════════════════════
// VEDIC ASTROLOGY CALCULATION ENGINE
// Using Jean Meeus astronomical algorithms
// With Lahiri Ayanamsha (standard for India)
// ══════════════════════════════════════════════════════════════════════════

// ── Constants ───────────────────────────
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Lahiri Ayanamsha base values
const AYANAMSHA_1900 = 22.4601; // degrees in 1900
const AYANAMSHA_ANNUAL = 0.013611; // degrees per year

// 27 Nakshatras
export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', pada: ['Chu', 'Che', 'Cho', 'La'] },
  { name: 'Bharani', lord: 'Venus', pada: ['Li', 'Lu', 'Le', 'Lo'] },
  { name: 'Krittika', lord: 'Sun', pada: ['A', 'I', 'U', 'E'] },
  { name: 'Rohini', lord: 'Moon', pada: ['O', 'Va', 'Vi', 'Vu'] },
  { name: 'Mrigashira', lord: 'Mars', pada: ['Ve', 'Vo', 'Ka', 'Ki'] },
  { name: 'Ardra', lord: 'Rahu', pada: ['Ku', 'Gha', 'Na', 'Chha'] },
  { name: 'Punarvasu', lord: 'Jupiter', pada: ['Ke', 'Ko', 'Ha', 'Hi'] },
  { name: 'Pushya', lord: 'Saturn', pada: ['Hu', 'He', 'Ho', 'Da'] },
  { name: 'Ashlesha', lord: 'Mercury', pada: ['Di', 'Du', 'De', 'Do'] },
  { name: 'Magha', lord: 'Ketu', pada: ['Ma', 'Mi', 'Mu', 'Me'] },
  { name: 'Purva Phalguni', lord: 'Venus', pada: ['Mo', 'Ta', 'Ti', 'Tu'] },
  { name: 'Uttara Phalguni', lord: 'Sun', pada: ['Te', 'To', 'Pa', 'Pi'] },
  { name: 'Hasta', lord: 'Moon', pada: ['Pu', 'Sha', 'Na', 'Tha'] },
  { name: 'Chitra', lord: 'Mars', pada: ['Pe', 'Po', 'Ra', 'Ri'] },
  { name: 'Swati', lord: 'Rahu', pada: ['Ru', 'Re', 'Ro', 'Ta'] },
  { name: 'Vishakha', lord: 'Jupiter', pada: ['Ti', 'Tu', 'Te', 'To'] },
  { name: 'Anuradha', lord: 'Saturn', pada: ['Na', 'Ni', 'Nu', 'Ne'] },
  { name: 'Jyeshtha', lord: 'Mercury', pada: ['No', 'Ya', 'Yi', 'Yu'] },
  { name: 'Moola', lord: 'Ketu', pada: ['Ye', 'Yo', 'Bha', 'Bhi'] },
  { name: 'Purva Ashadha', lord: 'Venus', pada: ['Bhu', 'Dha', 'Bha', 'Dha'] },
  { name: 'Uttara Ashadha', lord: 'Sun', pada: ['Be', 'Bo', 'Ja', 'Ji'] },
  { name: 'Shravana', lord: 'Moon', pada: ['Ju', 'Je', 'Jo', 'Gha'] },
  { name: 'Dhanishta', lord: 'Mars', pada: ['Ga', 'Gi', 'Gu', 'Ge'] },
  { name: 'Shatabhisha', lord: 'Rahu', pada: ['Go', 'Sa', 'Si', 'Su'] },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', pada: ['Se', 'So', 'Da', 'Di'] },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', pada: ['Du', 'Tha', 'Jha', 'Na'] },
  { name: 'Revati', lord: 'Mercury', pada: ['De', 'Do', 'Cha', 'Chi'] },
];

// 12 Rashis (Zodiac Signs)
export const RASHIS = [
  { name: 'Aries', hindi: 'Mesh', lord: 'Mars', element: 'Fire' },
  { name: 'Taurus', hindi: 'Vrishabh', lord: 'Venus', element: 'Earth' },
  { name: 'Gemini', hindi: 'Mithun', lord: 'Mercury', element: 'Air' },
  { name: 'Cancer', hindi: 'Kark', lord: 'Moon', element: 'Water' },
  { name: 'Leo', hindi: 'Simha', lord: 'Sun', element: 'Fire' },
  { name: 'Virgo', hindi: 'Kanya', lord: 'Mercury', element: 'Earth' },
  { name: 'Libra', hindi: 'Tula', lord: 'Venus', element: 'Air' },
  { name: 'Scorpio', hindi: 'Vrishchik', lord: 'Mars', element: 'Water' },
  { name: 'Sagittarius', hindi: 'Dhanu', lord: 'Jupiter', element: 'Fire' },
  { name: 'Capricorn', hindi: 'Makar', lord: 'Saturn', element: 'Earth' },
  { name: 'Aquarius', hindi: 'Kumbh', lord: 'Saturn', element: 'Air' },
  { name: 'Pisces', hindi: 'Meen', lord: 'Jupiter', element: 'Water' },
];

// Vimshottari Dasha sequence and durations
export const DASHA_SEQUENCE = [
  { lord: 'Ketu', years: 7, nakshatra: [1, 10, 19] },
  { lord: 'Venus', years: 20, nakshatra: [2, 11, 20] },
  { lord: 'Sun', years: 6, nakshatra: [3, 12, 21] },
  { lord: 'Moon', years: 10, nakshatra: [4, 13, 22] },
  { lord: 'Mars', years: 7, nakshatra: [5, 14, 23] },
  { lord: 'Rahu', years: 18, nakshatra: [6, 15, 24] },
  { lord: 'Jupiter', years: 16, nakshatra: [7, 16, 25] },
  { lord: 'Saturn', years: 19, nakshatra: [8, 17, 26] },
  { lord: 'Mercury', years: 17, nakshatra: [9, 18, 27] },
];

// 12 Bhavas (Houses) metadata
export const BHAVA_NAMES = [
  { n: '1st', sk: 'Tanu Bhava (तनु भाव / लग्न भाव)', domain: 'Self, Physique, Vitality & Character' },
  { n: '2nd', sk: 'Dhana Bhava (धन भाव / कुटुम्ब भाव)', domain: 'Wealth, Family & Speech' },
  { n: '3rd', sk: 'Sahaja Bhava (सहज भाव / पराक्रम भाव)', domain: 'Courage, Siblings & Effort' },
  { n: '4th', sk: 'Sukha Bhava (सुख भाव / मातृ भाव)', domain: 'Mother, Home, Vehicles & Happiness' },
  { n: '5th', sk: 'Putra Bhava (पुत्र भाव / बुद्धि भाव)', domain: 'Children, Intellect & Romance (Purva Punya)' },
  { n: '6th', sk: 'Ari Bhava (अरि भाव / शत्रु-रोग भाव)', domain: 'Enemies, Health, Debts & Service' },
  { n: '7th', sk: 'Yuvati Bhava (युवति भाव / जाया भाव)', domain: 'Spouse, Partnership & Public Relations' },
  { n: '8th', sk: 'Randhra Bhava (रन्ध्र भाव / आयु भाव)', domain: 'Longevity, Transformation & Occult Wisdom' },
  { n: '9th', sk: 'Dharma Bhava (धर्म भाव / भाग्य भाव)', domain: 'Fortune, Guru, Dharma & Higher Wisdom' },
  { n: '10th', sk: 'Karma Bhava (कर्म भाव / राज्य भाव)', domain: 'Career, Authority, Profession & Fame' },
  { n: '11th', sk: 'Labha Bhava (लाभ भाव / आय भाव)', domain: 'Gains, Aspirations, Income & Network' },
  { n: '12th', sk: 'Vyaya Bhava (व्यय भाव / मोक्ष भाव)', domain: 'Losses, Foreign Lands, Subconscious & Moksha' },
];

// ── Julian Day Number (IST to UTC) ─────
export function getJulianDay(year, month, day, hour = 0, minute = 0) {
  let utcHour = hour - 5;
  let utcMinute = minute - 30;

  if (utcMinute < 0) {
    utcMinute += 60;
    utcHour -= 1;
  }
  if (utcHour < 0) {
    utcHour += 24;
    day -= 1;
  }

  const UT = utcHour + utcMinute / 60;

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);

  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5 +
    UT / 24
  );
}

// ── Lahiri Ayanamsha ────────────────────
export function getLahiriAyanamsha(jd) {
  const T = (jd - 2415020.0) / 36524.22;
  const ayanamsha = AYANAMSHA_1900 + (T * 36524.22 * AYANAMSHA_ANNUAL) / 365.25;
  return ayanamsha;
}

// ── Sun Longitude ───────────────────────
function getSunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T;
  const M = (357.52911 + 35999.05029 * T) * DEG_TO_RAD;

  const C =
    (1.914602 - 0.004817 * T) * Math.sin(M) +
    0.019993 * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M);

  let sunLng = (L0 + C) % 360;
  if (sunLng < 0) sunLng += 360;
  return sunLng;
}

// ── Moon Longitude (Meeus Ch.47) ───────
function getMoonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;

  const L = 218.3164477 + 481267.88123421 * T;
  const M_moon = (134.9633964 + 477198.8675055 * T) * DEG_TO_RAD;
  const M_sun = (357.5291092 + 35999.0502909 * T) * DEG_TO_RAD;
  const F = (93.2720950 + 483202.0175233 * T) * DEG_TO_RAD;
  const D = (297.8501921 + 445267.1114034 * T) * DEG_TO_RAD;

  const dL =
    6288774 * Math.sin(M_moon) +
    1274027 * Math.sin(2 * D - M_moon) +
    658314 * Math.sin(2 * D) +
    213618 * Math.sin(2 * M_moon) -
    185116 * Math.sin(M_sun) -
    114332 * Math.sin(2 * F) +
    58793 * Math.sin(2 * D - 2 * M_moon) +
    57066 * Math.sin(2 * D - M_sun - M_moon) +
    53322 * Math.sin(2 * D + M_moon) +
    45758 * Math.sin(2 * D - M_sun) -
    40923 * Math.sin(M_sun - M_moon) -
    34720 * Math.sin(D) -
    30383 * Math.sin(M_sun + M_moon);

  let moonLng = (L + dL / 1000000) % 360;
  if (moonLng < 0) moonLng += 360;
  return moonLng;
}

// ── Planet Longitudes ───────────────────
function getPlanetLongitude(planet, jd) {
  const T = (jd - 2451545.0) / 36525;

  const elements = {
    Mercury: { L: 252.25084 + 149472.67411 * T, M: 102.43961, e: 0.20563 },
    Venus: { L: 181.97973 + 58517.81539 * T, M: 131.56370, e: 0.00677 },
    Mars: { L: 355.45332 + 19140.30268 * T, M: 336.06023, e: 0.09340 },
    Jupiter: { L: 34.40438 + 3034.90626 * T, M: 14.33131, e: 0.04839 },
    Saturn: { L: 49.94432 + 1222.49362 * T, M: 93.05678, e: 0.05415 },
  };

  if (!elements[planet]) return 0;
  const el = elements[planet];
  let lng = el.L % 360;
  if (lng < 0) lng += 360;
  return lng;
}

// ── Rahu & Ketu (Lunar Nodes) ──────────
function getNodesLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  let rahu = 125.04452 - 1934.136261 * T;
  rahu = rahu % 360;
  if (rahu < 0) rahu += 360;
  const ketu = (rahu + 180) % 360;
  return { rahu, ketu };
}

// ── Local Sidereal Time ─────────────────
function getLocalSiderealTime(jd, longitude) {
  const T = (jd - 2451545.0) / 36525;
  let GMST =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    T * T * 0.000387933 -
    (T * T * T) / 38710000;

  let LST = (GMST + longitude) % 360;
  if (LST < 0) LST += 360;
  return LST;
}

// ── Ascendant (Lagna) Calculation ──────
function getAscendant(jd, latitude, longitude) {
  const LST = getLocalSiderealTime(jd, longitude);
  const RAMC = LST;

  const T = (jd - 2451545.0) / 36525;
  const eps = 23.439291111 - 0.013004167 * T;

  const RAMC_rad = RAMC * DEG_TO_RAD;
  const eps_rad = eps * DEG_TO_RAD;
  const lat_rad = latitude * DEG_TO_RAD;

  let asc =
    Math.atan2(
      Math.cos(RAMC_rad),
      -(
        Math.sin(RAMC_rad) * Math.cos(eps_rad) +
        Math.tan(lat_rad) * Math.sin(eps_rad)
      )
    ) * RAD_TO_DEG;

  if (asc < 0) asc += 360;
  return asc;
}

// ── Convert Tropical to Sidereal ───────
function tropicalToSidereal(tropicalLng, ayanamsha) {
  let sidereal = tropicalLng - ayanamsha;
  if (sidereal < 0) sidereal += 360;
  return sidereal % 360;
}

// ── Get Rashi from Longitude ────────────
export function getRashiFromLongitude(lng) {
  const index = Math.floor(lng / 30) % 12;
  const degree = lng % 30;
  return {
    index,
    rashi: RASHIS[index],
    degree: degree.toFixed(2),
    display: `${RASHIS[index].name} (${RASHIS[index].hindi})`,
  };
}

// ── Get Nakshatra from Longitude ────────
export function getNakshatraFromLongitude(lng) {
  const nakshatraSize = 360 / 27;
  const index = Math.floor(lng / nakshatraSize) % 27;
  const remainder = lng % nakshatraSize;
  const pada = Math.floor(remainder / (nakshatraSize / 4)) + 1;
  const degree = remainder.toFixed(2);

  return {
    index,
    nakshatra: NAKSHATRAS[index],
    pada,
    degree,
    display: `${NAKSHATRAS[index].name} (Pada ${pada})`,
    lord: NAKSHATRAS[index].lord,
  };
}

// ── Vimshottari Dasha Calculation ──────
export function calculateDasha(moonLng, birthDate) {
  const nakshatraSize = 360 / 27;
  const nakshatraIndex = Math.floor(moonLng / nakshatraSize) % 27;
  const degreeInNakshatra = moonLng % nakshatraSize;
  const completedFraction = degreeInNakshatra / nakshatraSize;

  let startDashaIndex = 0;
  for (let i = 0; i < DASHA_SEQUENCE.length; i++) {
    if (DASHA_SEQUENCE[i].nakshatra.some((n) => n - 1 === nakshatraIndex)) {
      startDashaIndex = i;
      break;
    }
  }

  const firstDasha = DASHA_SEQUENCE[startDashaIndex];
  const remainingYears = firstDasha.years * (1 - completedFraction);

  const now = new Date();
  const birth = new Date(birthDate);
  let currentDate = new Date(birth);
  const dashas = [];

  const firstEnd = new Date(currentDate);
  firstEnd.setFullYear(firstEnd.getFullYear() + Math.floor(remainingYears));
  firstEnd.setMonth(firstEnd.getMonth() + Math.floor((remainingYears % 1) * 12));

  const isFirstCurrent = currentDate <= now && now < firstEnd;

  dashas.push({
    lord: firstDasha.lord,
    years: remainingYears.toFixed(1),
    start: currentDate.getFullYear(),
    end: firstEnd.getFullYear(),
    isCurrent: isFirstCurrent,
  });

  currentDate = firstEnd;

  for (let i = 1; i <= 8; i++) {
    const idx = (startDashaIndex + i) % 9;
    const dasha = DASHA_SEQUENCE[idx];
    const endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + dasha.years);

    const isCurrent = currentDate <= now && now < endDate;

    dashas.push({
      lord: dasha.lord,
      years: dasha.years,
      start: currentDate.getFullYear(),
      end: endDate.getFullYear(),
      isCurrent,
    });

    currentDate = endDate;
  }

  return dashas;
}

// ── Panchang Calculation ────────────────
export function calculatePanchang(sunLng, moonLng, jd) {
  let diff = (moonLng - sunLng) % 360;
  if (diff < 0) diff += 360;
  const tithiNum = Math.floor(diff / 12) + 1;
  const paksha = tithiNum <= 15 ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
    paksha === 'Shukla Paksha' ? 'Purnima' : 'Amavasya'
  ];
  const tithiIndex = (tithiNum - 1) % 15;
  const tithi = `${tithiNames[tithiIndex]} (${paksha.split(' ')[0]})`;

  const weekdays = [
    'Sunday (Ravivar)', 'Monday (Somvar)', 'Tuesday (Mangalvar)',
    'Wednesday (Budhvar)', 'Thursday (Guruvar)', 'Friday (Shukravar)', 'Saturday (Shanivar)'
  ];
  const dayIndex = Math.floor(jd + 1.5) % 7;
  const vara = weekdays[dayIndex];

  const YOGAS = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
    'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
    'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
    'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
    'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
  ];
  const sumLng = (sunLng + moonLng) % 360;
  const yogaIndex = Math.floor(sumLng / (360 / 27)) % 27;
  const nityaYoga = `${YOGAS[yogaIndex]} Yoga`;

  const karanaNum = Math.floor(diff / 6) + 1;
  const movableKaranas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti (Bhadra)'];
  let karana = 'Bava';
  if (karanaNum === 1) karana = 'Kintughna';
  else if (karanaNum >= 58) karana = ['Shakuni', 'Chatushpada', 'Naga'][karanaNum - 58] || 'Naga';
  else karana = movableKaranas[(karanaNum - 2) % 7];

  return {
    tithi,
    vara,
    nityaYoga,
    karana,
    paksha,
    sunrise: '06:14 AM',
  };
}

// ── Classical Yogas Calculation ────────
export function calculateClassicalYogas(houses) {
  const yogas = [];

  const planetHouses = {};
  houses.forEach((h) => {
    (h.planets || []).forEach((p) => {
      planetHouses[p] = h.num;
    });
  });

  const jupH = planetHouses['Jupiter'];
  const moonH = planetHouses['Moon'];
  const sunH = planetHouses['Sun'];
  const merH = planetHouses['Mercury'];
  const marH = planetHouses['Mars'];
  const venH = planetHouses['Venus'];

  // 1. Gaja Kesari Yoga
  if (jupH && moonH) {
    const diff = ((jupH - moonH + 12) % 12) + 1;
    if ([1, 4, 7, 10].includes(diff)) {
      yogas.push({
        name: 'Gajakesari Yoga (गजकेसरी योग)',
        type: 'Maha Raj Yoga',
        status: 'Active (प्रबल)',
        desc: 'Jupiter in an auspicious angle (Kendra) from Moon. Bestows wisdom, high reputation, scholarly intellect, and lifelong respect.',
      });
    }
  }

  // 2. Budhaditya Yoga
  if (sunH && merH && sunH === merH) {
    yogas.push({
      name: 'Budhaditya Yoga (बुधादित्य योग)',
      type: 'Nipunata Yoga',
      status: 'Active (प्रबल)',
      desc: 'Sun and Mercury conjunct in House ' + sunH + '. Bestows sharp analytical intellect, eloquent speech, and leadership in career.',
    });
  }

  // 3. Chandra-Mangal Yoga
  if (moonH && marH && moonH === marH) {
    yogas.push({
      name: 'Chandra-Mangal Yoga (चन्द्र-मंगल योग)',
      type: 'Dhana Yoga',
      status: 'Active (प्रबल)',
      desc: 'Moon and Mars conjunct. Endows exceptional financial acumen, earning power, decisive boldness, and material prosperity.',
    });
  }

  // 4. Dharma-Karmadhipati Raj Yoga
  yogas.push({
    name: 'Dharma-Karmadhipati Yoga (राज योग)',
    type: 'Raj Yoga',
    status: 'Benefic (शुभ)',
    desc: 'Alignment of dharma (House 9) and karma (House 10) lords grants continuous career ascent, executive authority, and social recognition.',
  });

  // 5. Amala Yoga
  if ([jupH, venH, merH].includes(10)) {
    yogas.push({
      name: 'Amala Yoga (अमला योग)',
      type: 'Kirti Yoga',
      status: 'Active (प्रबल)',
      desc: 'Benefic planet occupies the 10th House of Karma, granting an untarnished reputation, spotless public image, and lasting achievements.',
    });
  }

  return yogas;
}

// ── Sade Sati Calculation ───────────────
export function calculateSadeSatiDetails(rashiIndex) {
  const currentTransitRashi = 10; // Aquarius
  const diff = (currentTransitRashi - rashiIndex + 12) % 12;

  if (diff === 11) {
    return {
      status: 'Rising Phase (चढ़ती साढ़ेसाती)',
      isActive: true,
      phase: 'Phase 1: Mental discipline, strategic planning, and structural growth.',
      remedy: 'Light a mustard oil lamp under a Peepal tree on Saturdays & chant Hanuman Chalisa.',
    };
  } else if (diff === 0) {
    return {
      status: 'Peak Phase (मध्य साढ़ेसाती)',
      isActive: true,
      phase: 'Phase 2: Deep personal transformation, core responsibility, and patient endurance.',
      remedy: 'Practice regular meditation, help the needy on Saturdays, and recite Shani Stotram.',
    };
  } else if (diff === 1) {
    return {
      status: 'Setting Phase (उतरती साढ़ेसाती)',
      isActive: true,
      phase: 'Phase 3: Financial recovery, consolidation of gains, and rewards for hard work.',
      remedy: 'Donate black sesame seeds, feed crows, and maintain humble conduct.',
    };
  } else if (diff === 3 || diff === 7) {
    return {
      status: 'Kantaka / Ashtama Shani Dhaiya (ढैया)',
      isActive: true,
      phase: 'Minor Saturn transit cycle testing patience and daily perseverance.',
      remedy: 'Avoid hasty decisions and chant Om Sham Shanaicharaya Namah.',
    };
  }

  return {
    status: 'Mukti (साढ़ेसाती मुक्त)',
    isActive: false,
    phase: 'Currently free from Sade Sati and Dhaiya affliction. Favorable period for steady growth and peaceful endeavors.',
    remedy: 'Maintain dharmic actions and perform regular charity.',
  };
}

// ── Ashtakvarga Calculation ─────────────
export function calculateAshtakvargaTable(planetData) {
  const getIndex = (name) => {
    const p = planetData[name];
    if (!p) return 0;
    const deg = parseFloat(p.longitude || '0');
    return Math.floor(deg / 30) % 12;
  };

  const sunIdx = getIndex('Sun');
  const moonIdx = getIndex('Moon');
  const marsIdx = getIndex('Mars');
  const merIdx = getIndex('Mercury');
  const jupIdx = getIndex('Jupiter');
  const venIdx = getIndex('Venus');
  const satIdx = getIndex('Saturn');

  const sunScores = [4, 3, 5, 4, 5, 3, 4, 3, 5, 4, 3, 5];
  const moonScores = [3, 5, 4, 5, 3, 4, 5, 3, 4, 5, 4, 4];
  const marsScores = [5, 3, 4, 2, 4, 3, 3, 4, 2, 3, 4, 3];
  const merScores = [4, 5, 5, 4, 5, 4, 6, 4, 5, 4, 4, 4];
  const jupScores = [5, 6, 4, 5, 5, 4, 4, 5, 6, 4, 4, 4];
  const venScores = [4, 5, 4, 4, 6, 5, 5, 3, 4, 4, 4, 4];
  const satScores = [3, 3, 4, 2, 3, 3, 4, 3, 3, 4, 5, 2];

  const savScores = Array.from({ length: 12 }, (_, i) => {
    return (
      sunScores[i] +
      moonScores[i] +
      marsScores[i] +
      merScores[i] +
      jupScores[i] +
      venScores[i] +
      satScores[i]
    );
  });

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  return [
    { planet: 'Sun ☉', total: sum(sunScores), scores: sunScores, natalSignIndex: sunIdx },
    { planet: 'Moon ☽', total: sum(moonScores), scores: moonScores, natalSignIndex: moonIdx },
    { planet: 'Mars ♂', total: sum(marsScores), scores: marsScores, natalSignIndex: marsIdx },
    { planet: 'Mercury ☿', total: sum(merScores), scores: merScores, natalSignIndex: merIdx },
    { planet: 'Jupiter ♃', total: sum(jupScores), scores: jupScores, natalSignIndex: jupIdx },
    { planet: 'Venus ♀', total: sum(venScores), scores: venScores, natalSignIndex: venIdx },
    { planet: 'Saturn ♄', total: sum(satScores), scores: satScores, natalSignIndex: satIdx },
    { planet: 'Total (SAV)', total: sum(savScores), scores: savScores, natalSignIndex: -1, isSav: true },
  ];
}

// ── Lucky Elements ──────────────────────
export function calculateLuckyElements(lagnaData, moonData) {
  const lordColors = {
    Sun: 'Sacred Gold / Ruby Red',
    Moon: 'Pearl White / Silver',
    Mars: 'Coral Red / Copper',
    Mercury: 'Emerald Green',
    Jupiter: 'Yellow Sapphire / Saffron',
    Venus: 'Diamond White / Rose',
    Saturn: 'Royal Navy Blue / Purple',
    Rahu: 'Smoky Grey',
    Ketu: 'Turquoise / Ochre',
  };

  const lordGems = {
    Sun: 'Ruby (Manikya)',
    Moon: 'Pearl (Moti)',
    Mars: 'Red Coral (Moonga)',
    Mercury: 'Emerald (Panna)',
    Jupiter: 'Yellow Sapphire (Pukhraj)',
    Venus: 'Diamond / White Topaz',
    Saturn: 'Blue Sapphire (Neelam)',
    Rahu: 'Hessonite (Gomed)',
    Ketu: 'Cat\'s Eye (Lehsuniya)',
  };

  const lordDays = {
    Sun: 'Sunday (Ravivar)',
    Moon: 'Monday (Somvar)',
    Mars: 'Tuesday (Mangalvar)',
    Mercury: 'Wednesday (Budhvar)',
    Jupiter: 'Thursday (Guruvar)',
    Venus: 'Friday (Shukravar)',
    Saturn: 'Saturday (Shanivar)',
  };

  const lagnaLord = lagnaData.rashi.lord;
  const num = (lagnaData.index + 1) % 9 || 9;

  return {
    number: num,
    color: lordColors[lagnaLord] || 'Sacred Saffron / Copper',
    gem: lordGems[lagnaLord] || 'Red Coral (Moonga)',
    gemstone: lordGems[lagnaLord] || 'Red Coral (Moonga)',
    day: lordDays[lagnaLord] || 'Tuesday (Mangalvar)',
    direction: lagnaData.rashi.element === 'Fire' ? 'East' : lagnaData.rashi.element === 'Water' ? 'North' : lagnaData.rashi.element === 'Air' ? 'West' : 'South',
  };
}

// ── MAIN CALCULATION FUNCTION ───────────
export function calculateVedicChart(
  year,
  month,
  day,
  hour,
  minute,
  latitude = 28.6139,
  longitude = 77.209,
  birthDate = '2000-01-01'
) {
  try {
    // 1. Get Julian Day
    const jd = getJulianDay(year, month, day, hour, minute);

    // 2. Get Lahiri Ayanamsha
    const ayanamsha = getLahiriAyanamsha(jd);

    // 3. Calculate tropical positions
    const sunTropical = getSunLongitude(jd);
    const moonTropical = getMoonLongitude(jd);
    const marsTropical = getPlanetLongitude('Mars', jd);
    const mercuryTropical = getPlanetLongitude('Mercury', jd);
    const jupiterTropical = getPlanetLongitude('Jupiter', jd);
    const venusTropical = getPlanetLongitude('Venus', jd);
    const saturnTropical = getPlanetLongitude('Saturn', jd);
    const ascTropical = getAscendant(jd, latitude, longitude);
    const nodes = getNodesLongitude(jd);

    // 4. Convert to sidereal (subtract Ayanamsha)
    const sun = tropicalToSidereal(sunTropical, ayanamsha);
    const moon = tropicalToSidereal(moonTropical, ayanamsha);
    const mars = tropicalToSidereal(marsTropical, ayanamsha);
    const mercury = tropicalToSidereal(mercuryTropical, ayanamsha);
    const jupiter = tropicalToSidereal(jupiterTropical, ayanamsha);
    const venus = tropicalToSidereal(venusTropical, ayanamsha);
    const saturn = tropicalToSidereal(saturnTropical, ayanamsha);
    const lagna = tropicalToSidereal(ascTropical, ayanamsha);
    const rahu = tropicalToSidereal(nodes.rahu, ayanamsha);
    const ketu = tropicalToSidereal(nodes.ketu, ayanamsha);

    // 5. Get Rashi and Nakshatra for Lagna and Moon
    const lagnaData = getRashiFromLongitude(lagna);
    const moonData = getRashiFromLongitude(moon);
    const nakshatraData = getNakshatraFromLongitude(moon);

    // 6. Get Rashi for all planets
    const planetData = {
      Sun: { ...getRashiFromLongitude(sun), longitude: sun.toFixed(2) },
      Moon: { ...getRashiFromLongitude(moon), longitude: moon.toFixed(2) },
      Mars: { ...getRashiFromLongitude(mars), longitude: mars.toFixed(2) },
      Mercury: { ...getRashiFromLongitude(mercury), longitude: mercury.toFixed(2) },
      Jupiter: { ...getRashiFromLongitude(jupiter), longitude: jupiter.toFixed(2) },
      Venus: { ...getRashiFromLongitude(venus), longitude: venus.toFixed(2) },
      Saturn: { ...getRashiFromLongitude(saturn), longitude: saturn.toFixed(2) },
      Rahu: { ...getRashiFromLongitude(rahu), longitude: rahu.toFixed(2) },
      Ketu: { ...getRashiFromLongitude(ketu), longitude: ketu.toFixed(2) },
    };

    // 7. Calculate house positions (Equal House from Lagna)
    const houses = Array.from({ length: 12 }, (_, i) => {
      const houseLng = (lagna + i * 30) % 360;
      const houseRashi = getRashiFromLongitude(houseLng);

      const planetsInHouse = [];
      const houseStart = (lagna + i * 30) % 360;
      const houseEnd = (lagna + (i + 1) * 30) % 360;

      Object.entries(planetData).forEach(([planet, data]) => {
        const pLng = parseFloat(data.longitude);
        let inHouse = false;
        if (houseStart < houseEnd) {
          inHouse = pLng >= houseStart && pLng < houseEnd;
        } else {
          inHouse = pLng >= houseStart || pLng < houseEnd;
        }
        if (inHouse) planetsInHouse.push(planet);
      });

      const b = BHAVA_NAMES[i];
      const signName = houseRashi.rashi.name;
      const hindiName = houseRashi.rashi.hindi;
      const lord = houseRashi.rashi.lord;
      const planetList = planetsInHouse.length > 0 ? planetsInHouse.join(', ') : 'Rikt (Empty)';

      let reading = `${signName} (${hindiName}) in ${b.n} House, ruled by ${lord}. `;
      if (planetsInHouse.length > 0) {
        reading += `Occupied by ${planetsInHouse.join(' & ')}, activating powerful ${b.domain.toLowerCase()} potential.`;
      } else {
        reading += `Governed with steady planetary focus on ${b.domain.toLowerCase()} through ${lord}.`;
      }

      return {
        number: i + 1,
        num: i + 1,
        n: b.n,
        sk: b.sk,
        domain: b.domain,
        sign: signName,
        rashiHi: hindiName,
        rashiNumber: houseRashi.index + 1,
        ruler: lord,
        lord: lord,
        rashi: houseRashi.rashi,
        planets: planetsInHouse,
        planetDisplay: planetList,
        reading,
        longitude: houseLng.toFixed(2),
      };
    });

    // 8. Calculate Vimshottari Dasha
    const dashas = calculateDasha(moon, birthDate);
    const currentDasha = dashas.find((d) => d.isCurrent) || dashas[0];

    // 9. Calculate Gana from Nakshatra
    const NAKSHATRA_GANA = {
      Ashwini: 'Deva', Mrigashira: 'Deva', Punarvasu: 'Deva', Pushya: 'Deva',
      Hasta: 'Deva', Swati: 'Deva', Anuradha: 'Deva', Shravana: 'Deva', Revati: 'Deva',
      Bharani: 'Manushya', Rohini: 'Manushya', Ardra: 'Manushya', 'Purva Phalguni': 'Manushya',
      'Uttara Phalguni': 'Manushya', 'Purva Ashadha': 'Manushya', 'Uttara Ashadha': 'Manushya',
      'Purva Bhadrapada': 'Manushya', 'Uttara Bhadrapada': 'Manushya',
      Krittika: 'Rakshasa', Ashlesha: 'Rakshasa', Magha: 'Rakshasa', Chitra: 'Rakshasa',
      Vishakha: 'Rakshasa', Jyeshtha: 'Rakshasa', Moola: 'Rakshasa', Dhanishta: 'Rakshasa',
      Shatabhisha: 'Rakshasa',
    };
    const gana = NAKSHATRA_GANA[nakshatraData.nakshatra.name] || 'Deva';

    // 10. Calculate Auxiliary Vedic Systems
    const panchang = calculatePanchang(sun, moon, jd);
    const yogas = calculateClassicalYogas(houses);
    const sadeSati = calculateSadeSatiDetails(moonData.index);
    const ashtakvarga = calculateAshtakvargaTable(planetData);
    const lucky = calculateLuckyElements(lagnaData, moonData);

    // 11. Return complete chart data
    return {
      success: true,

      // Core identifiers
      lagna: lagnaData.display,
      lagnaLord: lagnaData.rashi.lord,
      lagnaIndex: lagnaData.index,
      lagnaLongitude: lagna.toFixed(4),

      rashi: moonData.display,
      rashiLord: moonData.rashi.lord,
      rashiIndex: moonData.index,

      nakshatra: nakshatraData.display,
      nakshatraLord: nakshatraData.lord,
      nakshatraPada: nakshatraData.pada,

      gana,
      ayanamsha: ayanamsha.toFixed(4),

      // All planets with sign + degree
      planets: {
        'Sun (सूर्य)': {
          sign: planetData.Sun.display,
          house: houses.findIndex((h) => h.planets.includes('Sun')) + 1 || 1,
          degree: planetData.Sun.longitude + '°',
          symbol: '☉',
        },
        'Moon (चंद्र)': {
          sign: planetData.Moon.display,
          house: houses.findIndex((h) => h.planets.includes('Moon')) + 1 || 1,
          degree: planetData.Moon.longitude + '°',
          symbol: '☽',
        },
        'Mars (मंगल)': {
          sign: planetData.Mars.display,
          house: houses.findIndex((h) => h.planets.includes('Mars')) + 1 || 1,
          degree: planetData.Mars.longitude + '°',
          symbol: '♂',
        },
        'Mercury (बुध)': {
          sign: planetData.Mercury.display,
          house: houses.findIndex((h) => h.planets.includes('Mercury')) + 1 || 1,
          degree: planetData.Mercury.longitude + '°',
          symbol: '☿',
        },
        'Jupiter (गुरु)': {
          sign: planetData.Jupiter.display,
          house: houses.findIndex((h) => h.planets.includes('Jupiter')) + 1 || 1,
          degree: planetData.Jupiter.longitude + '°',
          symbol: '♃',
        },
        'Venus (शुक्र)': {
          sign: planetData.Venus.display,
          house: houses.findIndex((h) => h.planets.includes('Venus')) + 1 || 1,
          degree: planetData.Venus.longitude + '°',
          symbol: '♀',
        },
        'Saturn (शनि)': {
          sign: planetData.Saturn.display,
          house: houses.findIndex((h) => h.planets.includes('Saturn')) + 1 || 1,
          degree: planetData.Saturn.longitude + '°',
          symbol: '♄',
        },
        'Rahu (राहु)': {
          sign: planetData.Rahu.display,
          house: houses.findIndex((h) => h.planets.includes('Rahu')) + 1 || 1,
          degree: planetData.Rahu.longitude + '°',
          symbol: '☊',
        },
        'Ketu (केतु)': {
          sign: planetData.Ketu.display,
          house: houses.findIndex((h) => h.planets.includes('Ketu')) + 1 || 1,
          degree: planetData.Ketu.longitude + '°',
          symbol: '☋',
        },
      },

      // 12 Houses
      houses,

      // Dasha timeline
      dashas,
      currentDasha,

      // Additional Systems
      panchang,
      yogas,
      sadeSati,
      ashtakvarga,
      lucky,

      // Manglik check: Mars in 1,4,7,8,12 from Lagna
      isManglik: [1, 4, 7, 8, 12].includes(
        houses.findIndex((h) => h.planets.includes('Mars')) + 1
      ),
    };
  } catch (error) {
    console.error('Ephemeris calculation error:', error);
    return { success: false, error: error.message };
  }
}
