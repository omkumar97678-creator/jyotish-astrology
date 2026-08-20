// ══════════════════════════════════════════════════════════════════════════
// VEDIC HOROSCOPE ENGINE (REAL-TIME ASTRONOMICAL TRANSITS)
// Computes live daily, weekly, and monthly Vedic horoscopes for all 12 Rashis
// using actual planetary transits (Gochar), Bhava placements & Panchang.
// ══════════════════════════════════════════════════════════════════════════

import {
  ZODIAC_SIGNS,
  NAKSHATRAS,
  getJulianDay,
  getLahiriAyanamsha,
  formatDegree,
} from './vedicAstrology';

// Real-time planetary transits for any date
export function getCurrentTransits(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const jd = getJulianDay(year, month, day, hour, minute, 5.5);
  const ayanamsha = getLahiriAyanamsha(jd);
  const T = (jd - 2451545.0) / 36525;
  const norm = (d) => ((d % 360) + 360) % 360;
  const toRad = (d) => (d * Math.PI) / 180;

  // 1. Sun
  const sunMean = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const sunAnomaly = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const sunEq = (1.914602 - 0.004817 * T) * Math.sin(toRad(sunAnomaly)) + 0.019993 * Math.sin(toRad(2 * sunAnomaly));
  const sunTropical = norm(sunMean + sunEq);
  const sunSidereal = norm(sunTropical - ayanamsha);

  // 2. Moon
  const moonMean = 218.3164477 + 481267.88123421 * T;
  const moonAnomaly = 134.9633964 + 477198.8675055 * T;
  const sunElongation = 297.8501921 + 445267.1114034 * T;
  const moonLatArg = 93.2720950 + 483202.0175233 * T;
  const moonEq =
    6.288774 * Math.sin(toRad(moonAnomaly)) +
    1.274027 * Math.sin(toRad(2 * sunElongation - moonAnomaly)) +
    0.658314 * Math.sin(toRad(2 * sunElongation)) +
    0.213618 * Math.sin(toRad(2 * moonAnomaly)) -
    0.185116 * Math.sin(toRad(sunAnomaly)) -
    0.114332 * Math.sin(toRad(2 * moonLatArg));
  const moonTropical = norm(moonMean + moonEq);
  const moonSidereal = norm(moonTropical - ayanamsha);

  // 3. Mars
  const marsMean = 355.433 + 19140.2993 * T;
  const marsAnomaly = 19.3724 + 19139.9753 * T;
  const marsEq = 10.691 * Math.sin(toRad(marsAnomaly));
  const marsSidereal = norm(marsMean + marsEq - ayanamsha);

  // 4. Mercury
  const merMean = 252.2507 + 149472.6741 * T;
  const merAnomaly = 174.7948 + 149472.5161 * T;
  const merEq = 23.44 * Math.sin(toRad(merAnomaly));
  const mercurySidereal = norm(merMean + merEq - ayanamsha);

  // 5. Jupiter
  const jupMean = 34.3514 + 3034.9057 * T;
  const jupAnomaly = 19.895 + 3034.6908 * T;
  const jupEq = 5.555 * Math.sin(toRad(jupAnomaly));
  const jupiterSidereal = norm(jupMean + jupEq - ayanamsha);

  // 6. Venus
  const venMean = 181.9798 + 58517.8157 * T;
  const venAnomaly = 50.4075 + 58517.8039 * T;
  const venEq = 0.7758 * Math.sin(toRad(venAnomaly));
  const venusSidereal = norm(venMean + venEq - ayanamsha);

  // 7. Saturn
  const satMean = 50.0774 + 1222.1138 * T;
  const satAnomaly = 316.967 + 1221.5515 * T;
  const satEq = 6.358 * Math.sin(toRad(satAnomaly));
  const saturnSidereal = norm(satMean + satEq - ayanamsha);

  // 8. Rahu & Ketu
  const rahuTropical = norm(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const rahuSidereal = norm(rahuTropical - ayanamsha);
  const ketuSidereal = norm(rahuSidereal + 180);

  // Panchang calculations for today
  const diffLon = norm(moonTropical - sunTropical);
  const tithiNum = Math.floor(diffLon / 12) + 1;
  const isShukla = tithiNum <= 15;
  const tithiNames = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shasthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', isShukla ? 'Purnima' : 'Amavasya'];
  const tithiIndex = (tithiNum - 1) % 15;
  const tithi = `${tithiNames[tithiIndex]} (${isShukla ? 'Shukla' : 'Krishna'})`;

  const nakSpan = 360 / 27;
  const nakIdx = Math.floor(moonSidereal / nakSpan);
  const nakshatra = NAKSHATRAS[nakIdx % 27].name;

  const sumLon = norm(sunTropical + moonTropical);
  const yogaNum = Math.floor(sumLon / nakSpan);
  const yogaNames = ['Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
  const yoga = `${yogaNames[yogaNum % 27]} Yoga ✦`;

  const karanaNum = Math.floor(diffLon / 6) + 1;
  const karanaNames = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
  const karana = karanaNames[(karanaNum - 1) % 7];

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const rahuKaalMap = {
    Monday: '07:30 – 09:00 AM',
    Tuesday: '03:00 – 04:30 PM',
    Wednesday: '12:00 – 01:30 PM',
    Thursday: '01:30 – 03:00 PM',
    Friday: '10:30 – 12:00 PM',
    Saturday: '09:00 – 10:30 AM',
    Sunday: '04:30 – 06:00 PM',
  };

  return {
    sun: { name: 'Sun', sym: '☉', lon: sunSidereal, signIdx: Math.floor(sunSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(sunSidereal / 30)].name, deg: formatDegree(sunSidereal) },
    moon: { name: 'Moon', sym: '☽', lon: moonSidereal, signIdx: Math.floor(moonSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(moonSidereal / 30)].name, deg: formatDegree(moonSidereal) },
    mars: { name: 'Mars', sym: '♂', lon: marsSidereal, signIdx: Math.floor(marsSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(marsSidereal / 30)].name, deg: formatDegree(marsSidereal) },
    mercury: { name: 'Mercury', sym: '☿', lon: mercurySidereal, signIdx: Math.floor(mercurySidereal / 30), sign: ZODIAC_SIGNS[Math.floor(mercurySidereal / 30)].name, deg: formatDegree(mercurySidereal) },
    jupiter: { name: 'Jupiter', sym: '♃', lon: jupiterSidereal, signIdx: Math.floor(jupiterSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(jupiterSidereal / 30)].name, deg: formatDegree(jupiterSidereal) },
    venus: { name: 'Venus', sym: '♀', lon: venusSidereal, signIdx: Math.floor(venusSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(venusSidereal / 30)].name, deg: formatDegree(venusSidereal) },
    saturn: { name: 'Saturn', sym: '♄', lon: saturnSidereal, signIdx: Math.floor(saturnSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(saturnSidereal / 30)].name, deg: formatDegree(saturnSidereal) },
    rahu: { name: 'Rahu', sym: '☊', lon: rahuSidereal, signIdx: Math.floor(rahuSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(rahuSidereal / 30)].name, deg: formatDegree(rahuSidereal) },
    ketu: { name: 'Ketu', sym: '☋', lon: ketuSidereal, signIdx: Math.floor(ketuSidereal / 30), sign: ZODIAC_SIGNS[Math.floor(ketuSidereal / 30)].name, deg: formatDegree(ketuSidereal) },
    panchang: {
      tithi,
      nakshatra,
      yoga,
      karana,
      rahuKaal: rahuKaalMap[weekday] || '04:30 – 06:00 PM',
      weekday,
    },
  };
}

// Full Dynamic Horoscope Builder for Any Sign
export function getHoroscopeForSign(signIndex = 0, period = 'Today', lang = 'en') {
  const safeSignIdx = (signIndex + 12) % 12;
  const signObj = ZODIAC_SIGNS[safeSignIdx];
  const transits = getCurrentTransits(new Date());

  const getHouseFromSign = (planetSignIdx) => {
    return ((planetSignIdx - safeSignIdx + 12) % 12) + 1;
  };

  const sunHouse = getHouseFromSign(transits.sun.signIdx);
  const moonHouse = getHouseFromSign(transits.moon.signIdx);
  const marsHouse = getHouseFromSign(transits.mars.signIdx);
  const merHouse = getHouseFromSign(transits.mercury.signIdx);
  const jupHouse = getHouseFromSign(transits.jupiter.signIdx);
  const venHouse = getHouseFromSign(transits.venus.signIdx);
  const satHouse = getHouseFromSign(transits.saturn.signIdx);

  // Dynamic aspect scoring based on actual planetary houses
  const calcScore = (base, benefics, malefics) => {
    let score = base;
    benefics.forEach((h) => {
      if ([1, 4, 5, 7, 9, 10, 11].includes(h)) score += 4;
      if ([6, 8, 12].includes(h)) score -= 3;
    });
    malefics.forEach((h) => {
      if ([3, 6, 11].includes(h)) score += 3;
      if ([1, 4, 7, 8, 12].includes(h)) score -= 3;
    });
    return Math.min(96, Math.max(62, score));
  };

  const loveScore = calcScore(76, [venHouse, jupHouse], [satHouse, marsHouse]);
  const careerScore = calcScore(82, [sunHouse, jupHouse, marsHouse], [satHouse]);
  const healthScore = calcScore(70, [sunHouse, moonHouse], [satHouse, marsHouse]);
  const financeScore = calcScore(75, [jupHouse, merHouse, venHouse], [satHouse]);
  const energyLevel = Math.round((loveScore + careerScore + healthScore + financeScore) / 4);

  const getLabel = (s) => (s >= 85 ? (lang === 'hinglish' ? 'Uttam' : 'Excellent') : s >= 72 ? (lang === 'hinglish' ? 'Shreshtha' : 'Good') : (lang === 'hinglish' ? 'Madhyam' : 'Average'));

  const aspectList = [
    {
      icon: '♡',
      title: lang === 'hinglish' ? 'Prem & Rishte' : 'Love & Relations',
      value: loveScore,
      label: getLabel(loveScore),
      text: lang === 'hinglish'
        ? `Venus aapke ${venHouse}ve ghar mein hai aur Moon ${moonHouse}ve ghar mein gochar kar raha hai. Rishton mein samvaad aur aatmik sneh badhega.`
        : `Venus transiting your ${venHouse}th house and Moon in your ${moonHouse}th house enhances mutual emotional rapport and honest conversation.`,
      tip: lang === 'hinglish' ? 'Shubh: Khulkar baat karein aur sneh vyakt karein.' : 'Lucky for: Honest expression and quality connection.',
    },
    {
      icon: '★',
      title: lang === 'hinglish' ? 'Career & Karya' : 'Career & Status',
      value: careerScore,
      label: getLabel(careerScore),
      text: lang === 'hinglish'
        ? `Sun aapke ${sunHouse}ve ghar mein aur Jupiter ${jupHouse}ve ghar mein sakriya hain. Karm kshetra mein prabhavshali nirnay lene ka samay hai.`
        : `Sun in your ${sunHouse}th house and Jupiter in ${jupHouse}th house favor decisive initiatives and professional recognition.`,
      tip: lang === 'hinglish' ? 'Shubh samay: Subah ke ghante. Parishram par dhyan dein.' : 'Best time: Morning hours for strategic proposals.',
    },
    {
      icon: '✦',
      title: lang === 'hinglish' ? 'Swasthya & Urja' : 'Health & Vitality',
      value: healthScore,
      label: getLabel(healthScore),
      text: lang === 'hinglish'
        ? `Urja ka star achha hai. Shani ke ${satHouse}ve sthan par dhyan dete hue santulit aahar aur dhyan par dhyan dein.`
        : `Vitality is buoyant. Maintain steady hydration, ergonomic posture, and light evening stretching.`,
      tip: lang === 'hinglish' ? 'Sattvic bhojan aur jal grahan par dhyan dein.' : 'Focus on: Mindful rest and fresh hydration.',
    },
    {
      icon: '₹',
      title: lang === 'hinglish' ? 'Vitta & Dhan' : 'Finance & Wealth',
      value: financeScore,
      label: getLabel(financeScore),
      text: lang === 'hinglish'
        ? `Mercury ${merHouse}ve ghar mein hai. Aarthik yojanaon ko vyavasthit karne aur lambi avadhi ke labh par focus karein.`
        : `Mercury in your ${merHouse}th house supports financial planning and prudent long-term investments.`,
      tip: lang === 'hinglish' ? 'Bina soche samjhe kharch se bachen.' : 'Avoid: Impulsive purchases; favor budgeting.',
    },
  ];

  // 3 Primary Planetary Influences for this Rashi
  const rulerPlanetName = signObj.ruler;
  const rulerTransit = transits[rulerPlanetName.toLowerCase()] || transits.sun;
  const rulerHouse = getHouseFromSign(rulerTransit.signIdx);

  const planetaryInfluences = [
    {
      sym: rulerTransit.sym,
      name: lang === 'hinglish' ? `${rulerPlanetName} (Ruler Grah)` : `${rulerPlanetName} (Ruler)`,
      pos: `${rulerTransit.sign} ${rulerTransit.deg}`,
      house: lang === 'hinglish' ? `${rulerHouse}va Ghar` : `House ${rulerHouse}`,
      influence:
        lang === 'hinglish'
          ? `Swami grah ${rulerHouse}ve ghar me hone se aatmavishwas aur karya kshamta badhti hai.`
          : `Ruling planet in H${rulerHouse} gives core vitality & focused momentum.`,
    },
    {
      sym: transits.moon.sym,
      name: lang === 'hinglish' ? 'Chandra Gochar' : 'Moon Transit',
      pos: `${transits.moon.sign} ${transits.moon.deg}`,
      house: lang === 'hinglish' ? `${moonHouse}va Ghar` : `House ${moonHouse}`,
      influence:
        lang === 'hinglish'
          ? `Chandra ${moonHouse}ve sthan me dainik manosthiti aur prernadayak soch ko sakriya karta hai.`
          : `Chandra in H${moonHouse} activates daily emotions & intuitive flow.`,
    },
    {
      sym: transits.jupiter.sym,
      name: lang === 'hinglish' ? 'Guru Gochar' : 'Jupiter Transit',
      pos: `${transits.jupiter.sign} ${transits.jupiter.deg}`,
      house: lang === 'hinglish' ? `${jupHouse}va Ghar` : `House ${jupHouse}`,
      influence:
        lang === 'hinglish'
          ? `Brihaspati ${jupHouse}ve ghar me gyaan, bhagya aur naye shubh avasaron ka vistar karta hai.`
          : `Guru in H${jupHouse} expands wisdom, dharma & auspicious opportunities.`,
    },
  ];

  // Lucky elements
  const luckyNumbersMap = {
    Aries: [9, 18, 27],
    Taurus: [6, 15, 24],
    Gemini: [5, 14, 23],
    Cancer: [2, 11, 20],
    Leo: [1, 10, 19],
    Virgo: [5, 14, 23],
    Libra: [6, 15, 24],
    Scorpio: [9, 18, 27],
    Sagittarius: [3, 12, 21],
    Capricorn: [8, 17, 26],
    Aquarius: [8, 17, 26],
    Pisces: [3, 12, 21],
  };

  const luckyColorsMap = {
    Aries: lang === 'hinglish' ? 'Munga Laal / Kesariya' : 'Coral Red / Amber',
    Taurus: lang === 'hinglish' ? 'Gulabi / Shwet' : 'Pastel Pink / White',
    Gemini: lang === 'hinglish' ? 'Emerald Green (Panna Hara)' : 'Emerald Green',
    Cancer: lang === 'hinglish' ? 'Moti Shwet / Chandi' : 'Pearl White / Silver',
    Leo: lang === 'hinglish' ? 'Swarnim Peela / Manikya' : 'Golden Yellow / Ruby',
    Virgo: lang === 'hinglish' ? 'Gadha Hara (Forest Green)' : 'Forest Green',
    Libra: lang === 'hinglish' ? 'Heera Shwet / Gulabi' : 'Diamond White / Rose',
    Scorpio: lang === 'hinglish' ? 'Gehra Laal / Maroon' : 'Crimson / Maroon',
    Sagittarius: lang === 'hinglish' ? 'Kesar / Peela' : 'Bright Yellow / Saffron',
    Capricorn: lang === 'hinglish' ? 'Navy Blue / Charcoal' : 'Royal Navy / Charcoal',
    Aquarius: lang === 'hinglish' ? 'Electric Blue / Jamuni' : 'Electric Blue / Violet',
    Pisces: lang === 'hinglish' ? 'Kesar Peela / Sea Green' : 'Golden Yellow / Sea Green',
  };

  const luckyTimeMap = {
    Aries: '6:00 – 8:00 AM',
    Taurus: '10:00 – 12:00 PM',
    Gemini: '2:00 – 4:00 PM',
    Cancer: '7:00 – 9:00 PM',
    Leo: '9:00 – 11:00 AM',
    Virgo: '3:00 – 5:00 PM',
    Libra: '11:00 – 1:00 PM',
    Scorpio: '8:00 – 10:00 AM',
    Sagittarius: '1:00 – 3:00 PM',
    Capricorn: '5:00 – 7:00 PM',
    Aquarius: '4:00 – 6:00 PM',
    Pisces: '6:00 – 8:00 PM',
  };

  const luckyDirectionMap = {
    Aries: lang === 'hinglish' ? 'Purva (East)' : 'East',
    Taurus: lang === 'hinglish' ? 'Dakshin (South)' : 'South',
    Gemini: lang === 'hinglish' ? 'Pashchim (West)' : 'West',
    Cancer: lang === 'hinglish' ? 'Uttar (North)' : 'North',
    Leo: lang === 'hinglish' ? 'Purva (East)' : 'East',
    Virgo: lang === 'hinglish' ? 'Dakshin (South)' : 'South',
    Libra: lang === 'hinglish' ? 'Pashchim (West)' : 'West',
    Scorpio: lang === 'hinglish' ? 'Uttar (North)' : 'North',
    Sagittarius: lang === 'hinglish' ? 'Purva (East)' : 'East',
    Capricorn: lang === 'hinglish' ? 'Dakshin (South)' : 'South',
    Aquarius: lang === 'hinglish' ? 'Pashchim (West)' : 'West',
    Pisces: lang === 'hinglish' ? 'Uttar (North)' : 'North',
  };

  const lucky = {
    number: (luckyNumbersMap[signObj.name] || [7, 16, 25])[0],
    numbers: luckyNumbersMap[signObj.name] || [7, 16, 25],
    color: luckyColorsMap[signObj.name] || 'Gold',
    time: luckyTimeMap[signObj.name] || '6 – 8 PM',
    direction: luckyDirectionMap[signObj.name] || 'East',
  };

  // Sign descriptions
  const heroDescriptions = {
    Aries:
      lang === 'hinglish'
        ? `Aaj Mesh (Aries) rashi ke liye tez urja aur sahas ka din hai. Swami grah Mangal aur Surya aapke ${sunHouse}ve ghar ko urja de rahe hain, jisse naitrutva aur karyon me safalta milegi.`
        : `Today brings high vitality and proactive drive for ${signObj.name}. With ruling planet Mars in ${transits.mars.sign} and Sun energizing your ${sunHouse}th house, your natural leadership and strategic execution will unlock rewarding breakthroughs.`,
    Taurus:
      lang === 'hinglish'
        ? `Dhairya aur sthirta aaj Vrishabh (Taurus) ke liye margdarshak rahenge. Shukra ${venHouse}ve ghar me hone se vyaktigat aur aarthik maamlon me anukoolta aayegi.`
        : `Steady perseverance and practical elegance guide ${signObj.name} today. Venus transiting your ${venHouse}th house fosters harmonious interactions in personal and financial matters.`,
    Gemini:
      lang === 'hinglish'
        ? `Boudhik chusthi aur prabhavi samvaad aaj Mithun (Gemini) ki pehchan hain. Budh ${merHouse}ve ghar me sakriya hai, jisse baat-cheet aasan hogi aur naye vishleshnatmak vichaar labh denge.`
        : `Mental agility and witty communication define ${signObj.name} today. With Mercury active in your ${merHouse}th house, conversations flow smoothly and creative problem-solving yields quick gains.`,
    Cancer:
      lang === 'hinglish'
        ? `Antargyaan aur bhavnatmak sneh aaj Kark (Cancer) rashi ko samriddh banata hai. Chandra ${moonHouse}ve sthan me hone se vyaktigat lakshyon aur gharelu shanti me spasht-ta aayegi.`
        : `Intuitive depth and emotional warmth enrich ${signObj.name} today. The Moon transiting your ${moonHouse}th house brings clarity to personal goals and domestic peace.`,
    Leo:
      lang === 'hinglish'
        ? `Aatmavishwas aur aakarshan aaj Simha (Leo) ko chamkayenge. Surya ${sunHouse}ve ghar me hone se aapki aawaz aur rachnatmak karyon ko majbooti milegi.`
        : `Radiant confidence and magnetic charisma illuminate ${signObj.name} today. The Sun transiting your ${sunHouse}th house strengthens your authoritative voice and creative endeavors.`,
    Virgo:
      lang === 'hinglish'
        ? `Kanya (Virgo) ke liye aaj ka din baareekiyon par dhyan aur karyon ko vyavasthit karne ka hai. Budh ${merHouse}ve sthan me har kaam ko samay par pura karwayega.`
        : `Analytical precision and systematic mastery empower ${signObj.name} today. Mercury in your ${merHouse}th house ensures smooth organization and efficient task completion.`,
    Libra:
      lang === 'hinglish'
        ? `Samanjasya aur aakarshan aaj Tula (Libra) ko aashirvaad dete hain. Shukra ${venHouse}ve sthan me aapsi samajh aur rachnatmak baatcheet ko badhava dega.`
        : `Diplomatic grace, aesthetic charm, and harmonious balance bless ${signObj.name} today. Venus in your ${venHouse}th house enhances mutual understanding and creative negotiations.`,
    Scorpio:
      lang === 'hinglish'
        ? `Gehri samajh aur transformational drishti aaj Vrishchik (Scorpio) ki taakat hai. Mangal ${marsHouse}ve ghar me chunautiyon ko jeet me badalne ka bal pradan karega.`
        : `Deep discernment and transformative focus empower ${signObj.name} today. Mars in your ${marsHouse}th house gives you the stamina to see through surface situations and achieve victory.`,
    Sagittarius:
      lang === 'hinglish'
        ? `Aashavadi soch aur naya seekhne ki lalak aaj Dhanu (Sagittarius) ko aage badhayegi. Guru ${jupHouse}ve ghar me gyaan aur naye shubh avasar lekar aayega.`
        : `Expansive optimism and visionary learning inspire ${signObj.name} today. Guru in your ${jupHouse}th house broadens your philosophical horizons and invites fortunate opportunities.`,
    Capricorn:
      lang === 'hinglish'
        ? `Anushasan aur samajhdari aaj Makar (Capricorn) ko uchit puraskar degi. Shani ${satHouse}ve ghar me lambi avadhi ke lakshyon ko majboot buniyaad dega.`
        : `Disciplined execution and strategic maturity reward ${signObj.name} today. Saturn in your ${satHouse}th house reinforces long-term milestones and solid foundational growth.`,
    Aquarius:
      lang === 'hinglish'
        ? `Naye vichaar aur manavtavadi drishtikon aaj Kumbh (Aquarius) ka margdarshan karenge. Aapki anokhi soch mushkil samasyaon ka aasan hal nikalegi.`
        : `Innovative thinking and progressive humanitarian insight guide ${signObj.name} today. Your original perspective solves lingering puzzles and earns genuine respect.`,
    Pisces:
      lang === 'hinglish'
        ? `Kalaatmak bahaav aur aatmik shanti aaj Meen (Pisces) ke sath hai. Guru ${jupHouse}ve sthan me aapki kalpana aur aatmik gyaan ko unchayi par le jayega.`
        : `Intuitive empathy, artistic flow, and spiritual serenity accompany ${signObj.name} today. Jupiter in your ${jupHouse}th house elevates your creative vision and brings inner peace.`,
  };

  const adviceText =
    lang === 'hinglish'
      ? `Grah gochar ki prakritik gati par bharosa rakhein. Spasht samvaad aur niyamit parishram se dharmanukool safalta milegi.`
      : `Trust the natural pacing of planetary transits today. For ${signObj.name}, focusing on clear communication and steady action ensures maximum dharmic success.`;

  const mantras = {
    Aries: lang === 'hinglish' ? '“Om Kram Kreem Kroum Sah Bhaumaya Namah — Sahas aur spashtata ke sath aage badhein.”' : '“Om Kram Kreem Kroum Sah Bhaumaya Namah — I act with righteous courage and purposeful clarity.”',
    Taurus: lang === 'hinglish' ? '“Om Dram Dreem Droum Sah Shukraya Namah — Shanti aur dhairya se samriddhi aati hai.”' : '“Om Dram Dreem Droum Sah Shukraya Namah — I embrace serenity, beauty, and abundant patience.”',
    Gemini: lang === 'hinglish' ? '“Om Bram Breem Broum Sah Budhaya Namah — Meri boudhik kshamta aur vaani shubh hai.”' : '“Om Bram Breem Broum Sah Budhaya Namah — My intellect is sharp, adaptable, and aligned with truth.”',
    Cancer: lang === 'hinglish' ? '“Om Shram Shreem Shroum Sah Chandraya Namah — Antarmukh shanti aur pavitra manosthiti.”' : '“Om Shram Shreem Shroum Sah Chandraya Namah — My intuition is clear, peaceful, and profoundly grounded.”',
    Leo: lang === 'hinglish' ? '“Om Hram Hreem Hroum Sah Suryaya Namah — Tej, aatmavishwas aur naitrutva ka vikas ho.”' : '“Om Hram Hreem Hroum Sah Suryaya Namah — I shine with dharmic warmth, courage, and benevolence.”',
    Virgo: lang === 'hinglish' ? '“Om Bram Breem Broum Sah Budhaya Namah — Karya me nipunata aur kushal vyavastha.”' : '“Om Bram Breem Broum Sah Budhaya Namah — I bring order, precision, and conscious healing to my work.”',
    Libra: lang === 'hinglish' ? '“Om Dram Dreem Droum Sah Shukraya Namah — Samanjasya aur saundarya se jeevan sajta hai.”' : '“Om Dram Dreem Droum Sah Shukraya Namah — I cultivate harmony, justice, and graceful connection.”',
    Scorpio: lang === 'hinglish' ? '“Om Kram Kreem Kroum Sah Bhaumaya Namah — Dridh ichhashakti se har baadha paar hoti hai.”' : '“Om Kram Kreem Kroum Sah Bhaumaya Namah — My inner willpower transforms every obstacle into victory.”',
    Sagittarius: lang === 'hinglish' ? '“Om Gram Greem Groum Sah Gurave Namah — Gyaan, satya aur aashawadi soch ka vistar.”' : '“Om Gram Greem Groum Sah Gurave Namah — I expand in wisdom, truth, and boundless optimism.”',
    Capricorn: lang === 'hinglish' ? '“Om Pram Preem Proum Sah Shanaishcharaya Namah — Parishram aur nishtha se sthir vikas hota hai.”' : '“Om Pram Preem Proum Sah Shanaishcharaya Namah — My discipline, patience, and integrity build lasting legacy.”',
    Aquarius: lang === 'hinglish' ? '“Om Sham Shanaishcharaya Namah — Naye vichar aur manavseva se aashirvaad milta hai.”' : '“Om Sham Shanaishcharaya Namah — I innovate with humanitarian vision and authentic truth.”',
    Pisces: lang === 'hinglish' ? '“Om Brim Brihaspataye Namah — Daya, aatmik vishwas aur shanti mera margdarshan karti hai.”' : '“Om Brim Brihaspataye Namah — My compassion, creative intuition, and spiritual faith guide me.”',
  };

  const timeBreakdown = {
    morning:
      lang === 'hinglish'
        ? 'Subah ka samay nayi urja aur mansik spasht-ta se bhara hai, dainik karyon ko organize karne ke liye uttam.'
        : 'Fresh mental clarity and proactive energy help organize your day efficiently.',
    afternoon:
      lang === 'hinglish'
        ? 'Dopehar me karyakshetra me sahyog, mahatvapurna baatcheet aur samasyaon ke safal samadhan ka samay hai.'
        : 'Productive interactions, collaborative agreements, and strategic problem-solving.',
    evening:
      lang === 'hinglish'
        ? 'Sandhya ka samay parivar ke sath samay bitane, shant dhyan aur aatm-chintan ke liye atyant shubh hai.'
        : 'Peaceful twilight hours ideal for family warmth, restful reflection, and recharge.',
  };

  return {
    sign: {
      ...signObj,
      en: signObj.name,
      hi: signObj.hindi ? signObj.hindi.split(' ')[0] : signObj.name,
    },
    prediction: heroDescriptions[signObj.name] || heroDescriptions.Aries,
    energyLevel,
    aspects: aspectList,
    lucky,
    planetaryInfluences,
    advice: adviceText,
    mantra: mantras[signObj.name] || mantras.Aries,
    panchang: transits.panchang,
    planetaryTransitSummary: `Sun in ${transits.sun.sign} (${transits.sun.deg}), Moon in ${transits.moon.sign} (${transits.moon.deg}), Mars in ${transits.mars.sign} (${transits.mars.deg}), Jupiter in ${transits.jupiter.sign} (${transits.jupiter.deg}), Saturn in ${transits.saturn.sign} (${transits.saturn.deg}).`,
    timeBreakdown,
  };
}

// ── Supabase Cached Horoscope Fetcher ─────────────
import { supabase, isSupabaseConfigured } from './supabase';

export async function getOrGenerateHoroscope(signIndex = 0, period = 'today', lang = 'en') {
  const safeIdx = (signIndex + 12) % 12;
  const rashiName = ZODIAC_SIGNS[safeIdx]?.name || 'Aries';
  const today = new Date().toISOString().split('T')[0];
  const normalizedPeriod = String(period || 'today').toLowerCase().replace('this ', '');
  const cacheKey = `${rashiName}_${lang}`;

  // 1. Check Supabase cache first
  if (isSupabaseConfigured()) {
    try {
      const { data: cached, error } = await supabase
        .from('horoscope_cache')
        .select('content')
        .eq('rashi', cacheKey)
        .eq('date', today)
        .eq('period', normalizedPeriod)
        .maybeSingle();

      if (!error && cached?.content) {
        console.log('Horoscope from cache ✅');
        return cached.content;
      }
    } catch {
      /* Cache miss or network fallback */
    }
  }

  // 2. Not in cache — calculate dynamically from Gochar engine
  const generated = getHoroscopeForSign(signIndex, period, lang);

  // 3. Save to Supabase cache
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('horoscope_cache')
        .upsert(
          {
            rashi: cacheKey,
            date: today,
            period: normalizedPeriod,
            content: generated,
          },
          { onConflict: 'rashi,date,period' }
        );

      if (error) {
        // Fallback to plain insert if unique constraint is missing
        const { error: insertErr } = await supabase.from('horoscope_cache').insert({
          rashi: cacheKey,
          date: today,
          period: normalizedPeriod,
          content: generated,
        });
        if (insertErr) {
          console.warn('Horoscope cache save notice:', insertErr);
        } else {
          console.log('Horoscope generated + cached (insert) ✅');
        }
      } else {
        console.log('Horoscope generated + cached ✅');
      }
    } catch (err) {
      console.warn('Horoscope cache save notice:', err);
    }
  }

  return generated;
}
