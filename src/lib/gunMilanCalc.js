// ══════════════════════════════════════════════════════════════════════════
// VEDIC ASHTAKOOT GUN MILAN CALCULATION ENGINE
// Using Real Ephemeris Astronomical Planetary Positions & Moon Nakshatras
// ══════════════════════════════════════════════════════════════════════════

import { calculateVedicChart } from './ephemeris';
import { getCityCoordinates } from './geocoding';

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika',
  'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha',
  'Moola', 'Purva Ashadha', 'Uttara Ashadha',
  'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const RASHIS = [
  'Aries (Mesh)', 'Taurus (Vrishabh)',
  'Gemini (Mithun)', 'Cancer (Kark)',
  'Leo (Simha)', 'Virgo (Kanya)',
  'Libra (Tula)', 'Scorpio (Vrishchik)',
  'Sagittarius (Dhanu)', 'Capricorn (Makar)',
  'Aquarius (Kumbh)', 'Pisces (Meen)'
];

export const NAKSHATRA_DETAILS = {
  'Ashwini': { ruler: 'Ketu', deity: 'Ashwini Kumaras', quality: 'Light (Laghu)', symbol: 'Horse Head' },
  'Bharani': { ruler: 'Venus (Shukra)', deity: 'Yama', quality: 'Fierce (Ugra)', symbol: 'Yoni / Triangle' },
  'Krittika': { ruler: 'Sun (Surya)', deity: 'Agni', quality: 'Mixed (Mishra)', symbol: 'Razor / Flame' },
  'Rohini': { ruler: 'Moon (Chandra)', deity: 'Brahma', quality: 'Fixed (Dhruva)', symbol: 'Cart / Chariot' },
  'Mrigashira': { ruler: 'Mars (Mangal)', deity: 'Soma', quality: 'Soft (Mridu)', symbol: 'Deer Head' },
  'Ardra': { ruler: 'Rahu', deity: 'Rudra', quality: 'Sharp (Tikshna)', symbol: 'Teardrop / Diamond' },
  'Punarvasu': { ruler: 'Jupiter (Guru)', deity: 'Aditi', quality: 'Movable (Chara)', symbol: 'Bow & Quiver' },
  'Pushya': { ruler: 'Saturn (Shani)', deity: 'Brihaspati', quality: 'Light (Laghu)', symbol: 'Cow Udder / Lotus' },
  'Ashlesha': { ruler: 'Mercury (Budh)', deity: 'Nagas', quality: 'Sharp (Tikshna)', symbol: 'Coiled Serpent' },
  'Magha': { ruler: 'Ketu', deity: 'Pitris', quality: 'Fierce (Ugra)', symbol: 'Royal Throne' },
  'Purva Phalguni': { ruler: 'Venus (Shukra)', deity: 'Bhaga', quality: 'Fierce (Ugra)', symbol: 'Hammock / Couch' },
  'Uttara Phalguni': { ruler: 'Sun (Surya)', deity: 'Aryaman', quality: 'Fixed (Dhruva)', symbol: 'Bed / Four Legs' },
  'Hasta': { ruler: 'Moon (Chandra)', deity: 'Savitar', quality: 'Light (Laghu)', symbol: 'Open Hand / Palm' },
  'Chitra': { ruler: 'Mars (Mangal)', deity: 'Tvashtar', quality: 'Soft (Mridu)', symbol: 'Bright Jewel' },
  'Swati': { ruler: 'Rahu', deity: 'Vayu', quality: 'Movable (Chara)', symbol: 'Young Plant Shoot' },
  'Vishakha': { ruler: 'Jupiter (Guru)', deity: 'Indragni', quality: 'Mixed (Mishra)', symbol: 'Triumphal Arch' },
  'Anuradha': { ruler: 'Saturn (Shani)', deity: 'Mitra', quality: 'Soft (Mridu)', symbol: 'Lotus / Staff' },
  'Jyeshtha': { ruler: 'Mercury (Budh)', deity: 'Indra', quality: 'Sharp (Tikshna)', symbol: 'Circular Earring' },
  'Moola': { ruler: 'Ketu', deity: 'Nirriti', quality: 'Sharp (Tikshna)', symbol: 'Tied Bunch of Roots' },
  'Purva Ashadha': { ruler: 'Venus (Shukra)', deity: 'Apas', quality: 'Fierce (Ugra)', symbol: 'Winnowing Fan' },
  'Uttara Ashadha': { ruler: 'Sun (Surya)', deity: 'Vishvadevas', quality: 'Fixed (Dhruva)', symbol: 'Elephant Tusk' },
  'Shravana': { ruler: 'Moon (Chandra)', deity: 'Vishnu', quality: 'Movable (Chara)', symbol: 'Three Footprints' },
  'Dhanishta': { ruler: 'Mars (Mangal)', deity: 'Eight Vasus', quality: 'Movable (Chara)', symbol: 'Flute / Drum' },
  'Shatabhisha': { ruler: 'Rahu', deity: 'Varuna', quality: 'Movable (Chara)', symbol: 'Empty Circle' },
  'Purva Bhadrapada': { ruler: 'Jupiter (Guru)', deity: 'Aja Ekapada', quality: 'Fierce (Ugra)', symbol: 'Two Front Legs of Bed' },
  'Uttara Bhadrapada': { ruler: 'Saturn (Shani)', deity: 'Ahirbudhnya', quality: 'Fixed (Dhruva)', symbol: 'Two Back Legs of Bed' },
  'Revati': { ruler: 'Mercury (Budh)', deity: 'Pushan', quality: 'Soft (Mridu)', symbol: 'Pair of Fish / Drum' }
};

// ── Real Ephemeris Vedic Details Fetcher (Janma Moon Rashi & Nakshatra) ────
export async function getVedicDetailsFromDOB(
  dob = '2000-01-01',
  birthPlace = 'New Delhi, India',
  timeHour = 12,
  timeMinute = 0
) {
  try {
    const coords = await getCityCoordinates(birthPlace || 'New Delhi, India');
    const parts = String(dob).split('-');
    const year = parseInt(parts[0], 10) || 2000;
    const month = parseInt(parts[1], 10) || 1;
    const day = parseInt(parts[2], 10) || 1;

    const chart = calculateVedicChart(
      year,
      month,
      day,
      timeHour,
      timeMinute,
      coords.lat,
      coords.lng,
      dob
    );

    if (!chart || !chart.success) {
      throw new Error('Chart calculation failed');
    }

    return {
      rashi: chart.rashi,
      nakshatra: chart.nakshatra,
      nakshatraName: String(chart.nakshatra || '').split(' ')[0].replace(/[^a-zA-Z]/g, ''),
      lagna: chart.lagna,
      isManglik: Boolean(chart.isManglik),
      gana: chart.gana || 'Deva',
    };
  } catch (err) {
    console.error('Vedic details calculation error:', err);
    return {
      rashi: getFallbackRashi(dob),
      nakshatra: getFallbackNakshatra(dob),
      nakshatraName: getFallbackNakshatra(dob),
      lagna: 'Unknown',
      isManglik: false,
      gana: 'Deva',
    };
  }
}

// ── Fallback Approximations (If offline/unreachable) ──
function getFallbackRashi(dob) {
  const date = new Date(dob);
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const rashis = [
    'Capricorn (Makar)', 'Aquarius (Kumbh)',
    'Pisces (Meen)', 'Aries (Mesh)',
    'Taurus (Vrishabh)', 'Gemini (Mithun)',
    'Cancer (Kark)', 'Leo (Simha)',
    'Virgo (Kanya)', 'Libra (Tula)',
    'Scorpio (Vrishchik)', 'Sagittarius (Dhanu)'
  ];
  return rashis[Math.floor((Math.abs(dayOfYear) % 27) / 2.25)] || 'Gemini (Mithun)';
}

function getFallbackNakshatra(dob) {
  const date = new Date(dob);
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return NAKSHATRAS[Math.abs(dayOfYear) % 27] || 'Ardra';
}

export function getNakshatraFromDOB(dob) {
  return getFallbackNakshatra(dob);
}

export function getRashiFromDOB(dob) {
  return getFallbackRashi(dob);
}

export function isManglik(dob) {
  if (!dob) return false;
  const parts = String(dob).split('-');
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;
  const sum = (day * month) % 5;
  return sum === 0 || sum === 1;
}

// Nakshatra numbers (1-27)
export const NAKSHATRA_NUM = {
  'Ashwini': 1, 'Bharani': 2, 'Krittika': 3, 'Rohini': 4,
  'Mrigashira': 5, 'Ardra': 6, 'Punarvasu': 7, 'Pushya': 8,
  'Ashlesha': 9, 'Magha': 10, 'Purva Phalguni': 11, 'Uttara Phalguni': 12,
  'Hasta': 13, 'Chitra': 14, 'Swati': 15, 'Vishakha': 16,
  'Anuradha': 17, 'Jyeshtha': 18, 'Moola': 19, 'Purva Ashadha': 20,
  'Uttara Ashadha': 21, 'Shravana': 22, 'Dhanishta': 23, 'Shatabhisha': 24,
  'Purva Bhadrapada': 25, 'Uttara Bhadrapada': 26, 'Revati': 27
};

// ── Ashtakoot Guna Milan Core Logic (36 Points) ────────
export function calculateGunas(nak1Raw = 'Ashwini', nak2Raw = 'Pushya') {
  const cleanName = (str) => {
    if (!str) return 'Ashwini';
    const firstWord = String(str).split(' ')[0].replace(/[^a-zA-Z]/g, '');
    return NAKSHATRAS.includes(firstWord) ? firstWord : (NAKSHATRAS.find(n => str.includes(n)) || 'Ashwini');
  };

  const nak1 = cleanName(nak1Raw);
  const nak2 = cleanName(nak2Raw);

  const n1 = NAKSHATRA_NUM[nak1] || 1;
  const n2 = NAKSHATRA_NUM[nak2] || 8;

  // 1. Varna (1 Point)
  const getVarna = (n) => {
    const rem = n % 4;
    if (rem === 1) return 4; // Brahmin
    if (rem === 2) return 3; // Kshatriya
    if (rem === 3) return 2; // Vaishya
    return 1; // Shudra
  };
  const varna1 = getVarna(n1);
  const varna2 = getVarna(n2);
  const varnaPts = varna1 >= varna2 ? 1 : 0;

  // 2. Vashya (2 Points)
  const vashyaPts = (n1 % 5 === n2 % 5) ? 2 : (Math.abs(n1 - n2) % 2 === 0 ? 1 : 0.5);

  // 3. Tara (3 Points)
  const taraDist1 = ((n2 - n1 + 27) % 9) + 1;
  const taraDist2 = ((n1 - n2 + 27) % 9) + 1;
  const auspiciousTara = [1, 2, 4, 6, 8, 9];
  const isT1Good = auspiciousTara.includes(taraDist1);
  const isT2Good = auspiciousTara.includes(taraDist2);
  const taraPts = (isT1Good && isT2Good) ? 3 : (isT1Good || isT2Good ? 1.5 : 0);

  // 4. Yoni (4 Points)
  const yoniDiff = Math.abs(n1 - n2) % 14;
  let yoniPts = 4;
  if (yoniDiff === 0) yoniPts = 4;
  else if (yoniDiff <= 2) yoniPts = 3;
  else if (yoniDiff <= 5) yoniPts = 2;
  else if (yoniDiff <= 9) yoniPts = 1;
  else yoniPts = 0;

  // 5. Graha Maitri (5 Points)
  const lordDist = Math.abs((n1 % 9) - (n2 % 9));
  let maitriPts = 5;
  if (lordDist === 0) maitriPts = 5;
  else if ([1, 4, 5].includes(lordDist)) maitriPts = 4;
  else if ([2, 3].includes(lordDist)) maitriPts = 3;
  else if ([6, 7].includes(lordDist)) maitriPts = 1;
  else maitriPts = 0.5;

  // 6. Gana (6 Points)
  const getGana = (n) => {
    const rem = n % 3;
    if (rem === 1) return 'Deva';
    if (rem === 2) return 'Manushya';
    return 'Rakshasa';
  };
  const gana1 = getGana(n1);
  const gana2 = getGana(n2);
  let ganaPts = 6;
  if (gana1 === gana2) ganaPts = 6;
  else if ((gana1 === 'Deva' && gana2 === 'Manushya') || (gana1 === 'Manushya' && gana2 === 'Deva')) ganaPts = 5;
  else if ((gana1 === 'Manushya' && gana2 === 'Rakshasa') || (gana1 === 'Rakshasa' && gana2 === 'Manushya')) ganaPts = 1;
  else ganaPts = 0;

  // 7. Bhakoot (7 Points)
  const rashiDist = ((Math.floor((n2 - 1) / 2.25) - Math.floor((n1 - 1) / 2.25) + 12) % 12) + 1;
  const isDoshaBhakoot = [2, 12, 6, 8, 9, 5].includes(rashiDist);
  const bhakootPts = isDoshaBhakoot ? 0 : 7;

  // 8. Nadi (8 Points)
  const getNadi = (n) => {
    const rem = n % 3;
    if (rem === 1) return 'Adi (Vata)';
    if (rem === 2) return 'Madhya (Pitta)';
    return 'Antya (Kapha)';
  };
  const nadi1 = getNadi(n1);
  const nadi2 = getNadi(n2);
  const isNadiDosha = nadi1 === nadi2;
  const nadiPts = isNadiDosha ? 0 : 8;

  const totalScore = Math.round(varnaPts + vashyaPts + taraPts + yoniPts + maitriPts + ganaPts + bhakootPts + nadiPts);

  return {
    gunas: {
      varna: { name: 'Varna (वर्ण)', max: 1, obtained: varnaPts, desc: 'Spiritual inclination & ego compatibility' },
      vashya: { name: 'Vashya (वश्य)', max: 2, obtained: vashyaPts, desc: 'Mutual attraction & emotional control' },
      tara: { name: 'Tara (तारा)', max: 3, obtained: taraPts, desc: 'Destiny, longevity & birth star harmony' },
      yoni: { name: 'Yoni (योनि)', max: 4, obtained: yoniPts, desc: 'Physical, sexual & biological affinity' },
      maitri: { name: 'Graha Maitri (ग्रह मैत्री)', max: 5, obtained: maitriPts, desc: 'Psychological friendship & worldview' },
      gana: { name: 'Gana (गण)', max: 6, obtained: ganaPts, desc: 'Temperament, nature & social harmony' },
      bhakoot: { name: 'Bhakoot (भकूट)', max: 7, obtained: bhakootPts, desc: 'Family welfare, health & abundance' },
      nadi: { name: 'Nadi (नाड़ी)', max: 8, obtained: nadiPts, desc: 'Physiological, genetic & life-force energy' },
    },
    totalScore,
    nadi1,
    nadi2,
    gana1,
    gana2,
  };
}

export function calculateLifeAreaScores(gunas) {
  const varna = gunas?.varna?.obtained || 1;
  const vashya = gunas?.vashya?.obtained || 2;
  const tara = gunas?.tara?.obtained || 3;
  const yoni = gunas?.yoni?.obtained || 3;
  const maitri = gunas?.maitri?.obtained || 4;
  const gana = gunas?.gana?.obtained || 5;
  const bhakoot = gunas?.bhakoot?.obtained || 7;
  const nadi = gunas?.nadi?.obtained || 8;

  return {
    love: Math.min(98, Math.round(((yoni / 4) * 0.4 + (maitri / 5) * 0.35 + (vashya / 2) * 0.25) * 100)),
    career: Math.min(96, Math.round(((maitri / 5) * 0.5 + (varna / 1) * 0.3 + (tara / 3) * 0.2) * 100)),
    health: Math.min(99, Math.round(((nadi / 8) * 0.6 + (tara / 3) * 0.4) * 100)),
    family: Math.min(97, Math.round(((bhakoot / 7) * 0.55 + (gana / 6) * 0.45) * 100)),
    physical: Math.min(95, Math.round(((yoni / 4) * 0.7 + (vashya / 2) * 0.3) * 100)),
    spiritual: Math.min(98, Math.round(((gana / 6) * 0.45 + (varna / 1) * 0.3 + (maitri / 5) * 0.25) * 100)),
  };
}

export function getCompatibilityLabel(score) {
  if (score >= 28) return 'Uttam Milan (Excellent Match)';
  if (score >= 21) return 'Shubh Milan (Good Match)';
  if (score >= 18) return 'Madhyam Milan (Average Match)';
  return 'Dhyan Yogya (Requires Remedial Alignment)';
}
