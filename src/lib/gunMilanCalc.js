// ══════════════════════════════════════════════════════════════════════════
// VEDIC ASHTAKOOT GUN MILAN CALCULATION ENGINE
// ══════════════════════════════════════════════════════════════════════════

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

export function getNakshatraFromDOB(dob) {
  if (!dob) return 'Ashwini';
  const parts = String(dob).split('-');
  const year = parseInt(parts[0], 10) || 2000;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;

  const sum = day + month + (year % 100) + Math.floor(year / 100);
  const index = Math.abs(sum) % 27;
  return NAKSHATRAS[index] || 'Ashwini';
}

export function getRashiFromDOB(dob) {
  if (!dob) return 'Aries (Mesh)';
  const parts = String(dob).split('-');
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries (Mesh)';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus (Vrishabh)';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini (Mithun)';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer (Kark)';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo (Simha)';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo (Kanya)';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra (Tula)';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio (Vrishchik)';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius (Dhanu)';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn (Makar)';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius (Kumbh)';
  return 'Pisces (Meen)';
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

// Gana (temperament) of each nakshatra
export const NAKSHATRA_GANA = {
  'Ashwini': 'Deva', 'Mrigashira': 'Deva', 'Punarvasu': 'Deva', 'Pushya': 'Deva',
  'Hasta': 'Deva', 'Swati': 'Deva', 'Anuradha': 'Deva', 'Shravana': 'Deva', 'Revati': 'Deva',
  'Bharani': 'Manushya', 'Rohini': 'Manushya', 'Ardra': 'Manushya', 'Purva Phalguni': 'Manushya',
  'Uttara Phalguni': 'Manushya', 'Purva Ashadha': 'Manushya', 'Uttara Ashadha': 'Manushya',
  'Purva Bhadrapada': 'Manushya', 'Uttara Bhadrapada': 'Manushya',
  'Krittika': 'Rakshasa', 'Ashlesha': 'Rakshasa', 'Magha': 'Rakshasa', 'Chitra': 'Rakshasa',
  'Vishakha': 'Rakshasa', 'Jyeshtha': 'Rakshasa', 'Moola': 'Rakshasa', 'Dhanishta': 'Rakshasa',
  'Shatabhisha': 'Rakshasa'
};

// Nadi of each nakshatra
export const NAKSHATRA_NADI = {
  'Ashwini': 'Vata', 'Ardra': 'Vata', 'Punarvasu': 'Vata', 'Uttara Phalguni': 'Vata',
  'Hasta': 'Vata', 'Jyeshtha': 'Vata', 'Moola': 'Vata', 'Shatabhisha': 'Vata', 'Purva Bhadrapada': 'Vata',
  'Bharani': 'Pitta', 'Mrigashira': 'Pitta', 'Pushya': 'Pitta', 'Purva Phalguni': 'Pitta',
  'Chitra': 'Pitta', 'Anuradha': 'Pitta', 'Purva Ashadha': 'Pitta', 'Dhanishta': 'Pitta', 'Uttara Bhadrapada': 'Pitta',
  'Krittika': 'Kapha', 'Rohini': 'Kapha', 'Ashlesha': 'Kapha', 'Magha': 'Kapha',
  'Swati': 'Kapha', 'Vishakha': 'Kapha', 'Uttara Ashadha': 'Kapha', 'Shravana': 'Kapha', 'Revati': 'Kapha'
};

export function calculateGunas(nakshatra1, nakshatra2) {
  const n1 = NAKSHATRA_NUM[nakshatra1] || 1;
  const n2 = NAKSHATRA_NUM[nakshatra2] || 1;
  const gana1 = NAKSHATRA_GANA[nakshatra1] || 'Deva';
  const gana2 = NAKSHATRA_GANA[nakshatra2] || 'Deva';
  const nadi1 = NAKSHATRA_NADI[nakshatra1] || 'Vata';
  const nadi2 = NAKSHATRA_NADI[nakshatra2] || 'Vata';

  // 1. Varna (1 point)
  const varnaScore = (n1 % 4 === n2 % 4) ? 1 : (Math.abs((n1 % 4) - (n2 % 4)) <= 1 ? 1 : 0);

  // 2. Vashya (2 points)
  const vashyaScore = Math.abs(n1 - n2) <= 3 ? 2 : Math.abs(n1 - n2) <= 6 ? 1 : 0;

  // 3. Tara (3 points)
  const taraDiff = Math.abs(n1 - n2) % 9;
  const taraScore = taraDiff <= 2 ? 3 : taraDiff <= 5 ? 2 : 1;

  // 4. Yoni (4 points)
  const yoniScore = Math.abs(n1 - n2) <= 4 ? 4 : Math.abs(n1 - n2) <= 8 ? 3 : Math.abs(n1 - n2) <= 13 ? 2 : 1;

  // 5. Graha Maitri (5 points)
  const graha1 = Math.ceil(n1 / 9);
  const graha2 = Math.ceil(n2 / 9);
  const grahaScore = graha1 === graha2 ? 5 : Math.abs(graha1 - graha2) === 1 ? 4 : Math.abs(graha1 - graha2) === 2 ? 3 : 1;

  // 6. Gana (6 points)
  let ganaScore = 6;
  if (gana1 !== gana2) {
    if ((gana1 === 'Deva' && gana2 === 'Rakshasa') || (gana1 === 'Rakshasa' && gana2 === 'Deva')) {
      ganaScore = 0;
    } else {
      ganaScore = 3;
    }
  }

  // 7. Bhakoot (7 points)
  const rashiDiff = Math.abs(n1 - n2) % 12;
  const bhakootScore = [0, 3, 4, 5, 7, 10].includes(rashiDiff) ? 7 : 0;

  // 8. Nadi (8 points)
  const nadiScore = nadi1 !== nadi2 ? 8 : 0;

  const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + grahaScore + ganaScore + bhakootScore + nadiScore;

  return {
    gunas: [
      { name: 'Varna (वर्ण)', max: 1, score: varnaScore, desc: 'Spiritual inclination & mental ego compatibility' },
      { name: 'Vashya (वश्य)', max: 2, score: vashyaScore, desc: 'Mutual attraction & emotional dominance balance' },
      { name: 'Tara (तारा)', max: 3, score: taraScore, desc: 'Birth star destiny harmony & auspicious luck' },
      { name: 'Yoni (योनि)', max: 4, score: yoniScore, desc: 'Physical compatibility, biological attraction & nature' },
      { name: 'Graha Maitri (ग्रह मैत्री)', max: 5, score: grahaScore, desc: 'Intellectual friendship, perspective & communication' },
      { name: 'Gana (गण)', max: 6, score: ganaScore, desc: 'Temperamental harmony & core emotional behavior' },
      { name: 'Bhakoot (भकूट)', max: 7, score: bhakootScore, desc: 'Family welfare, health, prosperity & generational growth' },
      { name: 'Nadi (नाड़ी)', max: 8, score: nadiScore, desc: 'Genetic, physiological & physiological vitality balance' },
    ],
    totalScore,
    nadi1,
    nadi2,
    gana1,
    gana2,
  };
}

export function getCompatibilityLabel(score) {
  if (score >= 30) return 'Excellent Match ✦';
  if (score >= 24) return 'Good Match (उत्कृष्ट)';
  if (score >= 18) return 'Average Match (स्वीकार्य)';
  return 'Needs Attention (सावधानी)';
}

export function calculateLifeAreaScores(gunas = []) {
  const g = gunas.reduce((acc, item) => {
    acc[item.name.split(' ')[0]] = item.score;
    return acc;
  }, {});

  const varna = g['Varna'] ?? 1;
  const vashya = g['Vashya'] ?? 2;
  const tara = g['Tara'] ?? 3;
  const yoni = g['Yoni'] ?? 4;
  const graha = g['Graha'] ?? 5;
  const gana = g['Gana'] ?? 6;
  const bhakoot = g['Bhakoot'] ?? 7;
  const nadi = g['Nadi'] ?? 8;

  const love = Math.round(((yoni / 4) * 0.4 + (graha / 5) * 0.6) * 100);
  const career = Math.round(((graha / 5) * 0.5 + (varna / 1) * 0.5) * 100);
  const health = Math.round(((nadi / 8) * 0.7 + (tara / 3) * 0.3) * 100);
  const family = Math.round(((gana / 6) * 0.5 + (bhakoot / 7) * 0.5) * 100);
  const physical = Math.round(((yoni / 4) * 0.6 + (tara / 3) * 0.4) * 100);
  const spiritual = Math.round(((gana / 6) * 0.4 + (nadi / 8) * 0.6) * 100);

  return {
    love: Math.min(100, Math.max(20, love)),
    career: Math.min(100, Math.max(20, career)),
    health: Math.min(100, Math.max(20, health)),
    family: Math.min(100, Math.max(20, family)),
    physical: Math.min(100, Math.max(20, physical)),
    spiritual: Math.min(100, Math.max(20, spiritual)),
  };
}
