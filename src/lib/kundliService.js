import { supabase, isSupabaseConfigured } from './supabase';

const isUUID = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

// ── Complete Dynamic Vedic Numerology Engine ─────────────
export function getCompleteNumerology(name = 'Seeker', dob = '1995-05-15') {
  let day = 15, month = 5, year = 1995;
  if (typeof dob === 'object') {
    day = parseInt(dob.day, 10) || 15;
    month = parseInt(dob.month, 10) || 5;
    year = parseInt(dob.year, 10) || 1995;
  } else if (typeof dob === 'string' && dob.includes('-')) {
    const parts = dob.split('-');
    year = parseInt(parts[0], 10) || 1995;
    month = parseInt(parts[1], 10) || 5;
    day = parseInt(parts[2], 10) || 15;
  }

  const reduceToSingle = (num, keepMasters = true) => {
    let sum = num;
    while (sum > 9 && (!keepMasters || ![11, 22, 33].includes(sum))) {
      sum = String(sum).split('').reduce((s, d) => s + (parseInt(d, 10) || 0), 0);
    }
    return sum;
  };

  // 1. Mulank (Birth Day Number): Day reduced to single digit
  const mulank = reduceToSingle(day, false);

  // 2. Bhagyank / Life Path Number: Full DOB digits sum
  const dobDigits = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`.replace(/[^0-9]/g, '');
  const rawDobSum = dobDigits.split('').reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);
  const lifePathNumber = reduceToSingle(rawDobSum, true);

  // 3. Destiny Number (Namank): Full Name Chaldean/Pythagorean sum
  const letterValues = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  const cleanName = String(name || 'Seeker').toLowerCase().replace(/[^a-z]/g, '');
  const rawDestinySum = cleanName.split('').reduce((sum, l) => sum + (letterValues[l] || 0), 0);
  const destinyNumber = reduceToSingle(rawDestinySum || 3, true);

  // 4. Soul Urge Number: Vowels in name
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const rawSoulSum = cleanName.split('').filter((l) => vowels.includes(l)).reduce((sum, l) => sum + (letterValues[l] || 0), 0);
  const soulUrgeNumber = reduceToSingle(rawSoulSum || 9, true);

  // 5. Personal Year Number: Day + Month + Current Year
  const currentYear = new Date().getFullYear();
  const rawPersonalYear = day + month + currentYear;
  const personalYearNumber = reduceToSingle(rawPersonalYear, false);

  // Vedic Number Profiles & Archetypes
  const numberProfiles = {
    1: {
      title: 'The Leader & Pioneer (सूर्य - Sun)',
      planet: 'Sun (सूर्य)',
      archetype: 'The Pioneer',
      desc: 'You possess natural executive presence, commanding willpower, and innovative ambition. You are built to forge new paths and lead with vision.',
      destinyDesc: 'Your life purpose unfolds through pioneering leadership, self-reliance, and inspiring innovation.',
      soulDesc: 'Deep within, you yearn for creative sovereignty, independence, and to leave a lasting impact.',
      personalYearDesc: 'A powerful year for fresh beginnings, starting ambitious ventures, taking bold initiatives, and planting seeds for the next 9-year cycle.',
      traits: ['Ambitious', 'Visionary', 'Independent', 'Pioneering', 'Courageous', 'Decisive'],
      luckyNumbers: [1, 10, 19, 28],
      luckyColors: [{ name: 'Gold / Yellow', hex: '#D4AF37' }, { name: 'Copper / Orange', hex: '#C8822A' }, { name: 'Ruby Red', hex: '#E11D48' }],
      insight: 'As a Life Path 1 ruled by the Sun, you are here to initiate and shine. Your strength lies in decisive clarity and bold courage. Trust your individual path without seeking external validation.',
    },
    2: {
      title: 'The Peacemaker & Diplomat (चंद्र - Moon)',
      planet: 'Moon (चंद्र)',
      archetype: 'The Harmonizer',
      desc: 'Endowed with profound empathy, intuitive sensitivity, and diplomatic grace. You bring harmony, collaboration, and emotional healing to those around you.',
      destinyDesc: 'Your purpose is achieved through cooperation, emotional intelligence, peacemaking, and supportive partnerships.',
      soulDesc: 'Your soul longs for serene peace, unconditional love, mutual respect, and emotional depth.',
      personalYearDesc: 'A year of cooperation, patience, cultivating deep relationships, and trusting behind-the-scenes progress.',
      traits: ['Empathetic', 'Intuitive', 'Diplomatic', 'Gentle', 'Cooperative', 'Peaceful'],
      luckyNumbers: [2, 11, 20, 29],
      luckyColors: [{ name: 'Silver / Pearl', hex: '#E8E4DC' }, { name: 'Emerald Green', hex: '#10B981' }, { name: 'Cream White', hex: '#FDFBF7' }],
      insight: 'As a Life Path 2 ruled by the Moon, your intuitive empathy is your greatest superpower. Guard your emotional boundaries while continuing to build bridges of peace and understanding.',
    },
    3: {
      title: 'The Creative Visionary (गुरु - Jupiter)',
      planet: 'Jupiter (गुरु)',
      archetype: 'The Expressive Creator',
      desc: 'Radiating optimism, artistic brilliance, and eloquent communication. You possess a joyful spark that elevates, inspires, and uplifts human consciousness.',
      destinyDesc: 'Your purpose is to communicate inspiring truths, express creative beauty, and spread joy through words, art, and philosophy.',
      soulDesc: 'An inner longing to freely express authentic emotion, inspire minds, and celebrate creative beauty.',
      personalYearDesc: 'A year of self-expression, creative expansion, social connections, joyful travel, and creative breakthroughs.',
      traits: ['Creative', 'Optimistic', 'Articulate', 'Inspiring', 'Charming', 'Expansive'],
      luckyNumbers: [3, 12, 21, 30],
      luckyColors: [{ name: 'Golden Yellow', hex: '#F59E0B' }, { name: 'Royal Purple', hex: '#8B5CF6' }, { name: 'Warm Amber', hex: '#D97706' }],
      insight: 'As a Life Path 3 ruled by Brihaspati (Jupiter), your gift of creative expression is sacred. Channel your enthusiasm into focused creative projects to transform raw ideas into timeless wisdom.',
    },
    4: {
      title: 'The Master Builder (राहु - Rahu)',
      planet: 'Rahu / Uranus',
      archetype: 'The Foundation Builder',
      desc: 'Disciplined, methodical, and profoundly grounded. You construct enduring structures, systems, and legacies through patient perseverance and sharp intellect.',
      destinyDesc: 'Your destiny is to establish stability, organize complex systems, and build lasting, reliable foundations.',
      soulDesc: 'Your heart seeks order, security, honesty, and the satisfaction of meaningful, tangible achievement.',
      personalYearDesc: 'A year of dedicated effort, building security, financial discipline, and laying rock-solid foundations for future growth.',
      traits: ['Disciplined', 'Methodical', 'Reliable', 'Practical', 'Loyal', 'Strategic'],
      luckyNumbers: [4, 13, 22, 31],
      luckyColors: [{ name: 'Electric Blue', hex: '#3B82F6' }, { name: 'Earthy Brown', hex: '#78350F' }, { name: 'Steel Gray', hex: '#64748B' }],
      insight: 'As a Life Path 4, your steadfast discipline builds empires from scratch. Embrace flexibility alongside your structure, knowing that true security flows from adaptable strength.',
    },
    5: {
      title: 'The Dynamic Free Spirit (बुध - Mercury)',
      planet: 'Mercury (बुध)',
      archetype: 'The Explorer',
      desc: 'Versatile, sharp-witted, and freedom-loving. You thrive on variety, intellectual agility, travel, and progressive evolution across multiple disciplines.',
      destinyDesc: 'Your life purpose unfolds through adaptable communication, exploring uncharted territories, and championing positive change.',
      soulDesc: 'An inner thirst for freedom, dynamic learning, adventure, and sensory/intellectual discovery.',
      personalYearDesc: 'A transformative year filled with change, unexpected freedom, travel opportunities, dynamic shifts, and release of old restrictions.',
      traits: ['Versatile', 'Adventurous', 'Curious', 'Quick-witted', 'Charismatic', 'Dynamic'],
      luckyNumbers: [5, 14, 23, 32],
      luckyColors: [{ name: 'Emerald Green', hex: '#10B981' }, { name: 'Teal', hex: '#2AABA8' }, { name: 'Silver / Platinum', hex: '#94A3B8' }],
      insight: 'As a Life Path 5 ruled by Mercury, your adaptability lets you thrive anywhere. Anchor your versatile curiosity with clear goals to turn boundless energy into lasting success.',
    },
    6: {
      title: 'The Nurturer & Harmonizer (शुक्र - Venus)',
      planet: 'Venus (शुक्र)',
      archetype: 'The Guardian of Beauty',
      desc: 'Compassionate, responsible, and devoted to harmony. You create sanctuaries of love, beauty, and emotional security for family and community.',
      destinyDesc: 'Your purpose is to nurture relationships, cultivate aesthetic elegance, and provide compassionate counsel and protection.',
      soulDesc: 'Your soul longs for domestic harmony, unconditional love, beauty in all forms, and being a pillar of warmth.',
      personalYearDesc: 'A year centering on family, home improvements, deepened relationship commitments, service to community, and personal healing.',
      traits: ['Nurturing', 'Harmonious', 'Responsible', 'Artistic', 'Compassionate', 'Protective'],
      luckyNumbers: [6, 15, 24, 33],
      luckyColors: [{ name: 'Rose Pink', hex: '#EC4899' }, { name: 'Diamond White', hex: '#F8FAFC' }, { name: 'Sky Blue', hex: '#38BDF8' }],
      insight: 'As a Life Path 6 ruled by Shukra (Venus), your unconditional warmth heals those around you. Remember to extend the same loving care and boundaries to yourself that you give to others.',
    },
    7: {
      title: 'The Seeker of Truth (केतु - Ketu)',
      planet: 'Ketu / Neptune',
      archetype: 'The Mystic Scholar',
      desc: 'Analytical, contemplative, and spiritually attuned. You delve into life’s deepest mysteries, seeking underlying scientific and metaphysical truths through research and reflection.',
      destinyDesc: 'Your purpose is to acquire profound wisdom, master specialized knowledge, and illuminate deeper truths for humanity.',
      soulDesc: 'An inner yearning for meditative solitude, sacred knowledge, spiritual enlightenment, and intellectual mastery.',
      personalYearDesc: 'A sacred introspective year ideal for deep study, spiritual retreat, mental refinement, writing, and profound self-realization.',
      traits: ['Analytical', 'Intuitive', 'Independent', 'Spiritual', 'Scholarly', 'Philosophical'],
      luckyNumbers: [7, 16, 25, 34],
      luckyColors: [{ name: 'Mystic Purple', hex: '#7C3AED' }, { name: 'Sterling Silver', hex: '#C0C8D0' }, { name: 'Seafoam Green', hex: '#3FA86A' }],
      insight: 'As a Life Path 7, you are a seeker of truth and wisdom. Your analytical mind pairs with a deep intuitive gift, drawing you toward philosophy, research, and spiritual exploration. You value solitude as a space to recharge and reflect, yet your insights often guide others more than you realize.',
    },
    8: {
      title: 'The Powerhouse & Sovereign (शनि - Saturn)',
      planet: 'Saturn (शनि)',
      archetype: 'The Manifestor of Abundance',
      desc: 'Authoritative, strategic, and profoundly capable of handling large-scale material, financial, and organizational mastery with integrity and karmic balance.',
      destinyDesc: 'Your purpose is to master the material realm, achieve high executive authority, and steward abundance with dharmic integrity.',
      soulDesc: 'Your heart seeks high achievement, financial sovereignty, respect, and the power to create lasting benevolent influence.',
      personalYearDesc: 'A powerful karmic year of material expansion, career promotion, major financial developments, and reaping the rewards of past discipline.',
      traits: ['Authoritative', 'Strategic', 'Resilient', 'Prosperous', 'Executive', 'Disciplined'],
      luckyNumbers: [8, 17, 26, 35],
      luckyColors: [{ name: 'Midnight Navy', hex: '#1E3A8A' }, { name: 'Royal Gold', hex: '#CA8A04' }, { name: 'Charcoal Black', hex: '#334155' }],
      insight: 'As a Life Path 8 ruled by Saturn, your ability to manifest large-scale vision is immense. Align your ambition with ethical purpose, knowing that dharmic power creates eternal legacy.',
    },
    9: {
      title: 'The Compassionate Humanitarian (मंगल - Mars)',
      planet: 'Mars (मंगल)',
      archetype: 'The Universal Soul',
      desc: 'Selfless, visionary, and universally conscious. You possess deep global empathy, artistic passion, and the spiritual warrior courage to fight for the upliftment of all beings.',
      destinyDesc: 'Your purpose is universal service, creative inspiration, releasing the outmoded, and elevating humanity through compassion.',
      soulDesc: 'An inner longing to heal the world, champion justice, express universal love, and attain spiritual completion.',
      personalYearDesc: 'A major completion year of letting go of outgrown ties, finishing long-standing cycles, forgiving the past, and preparing for total rebirth.',
      traits: ['Humanitarian', 'Compassionate', 'Visionary', 'Generous', 'Artistic', 'Selfless'],
      luckyNumbers: [9, 18, 27, 36],
      luckyColors: [{ name: 'Crimson Red', hex: '#DC2626' }, { name: 'Coral Amber', hex: '#C8822A' }, { name: 'Pure White', hex: '#FFFFFF' }],
      insight: 'As a Life Path 9 ruled by Mars, you possess the wisdom of all prior numbers. Release attachments gracefully and let your universal love lead the way toward collective enlightenment.',
    },
    11: {
      title: 'The Master Intuitive Illuminator (Master 11)',
      planet: 'Moon / Neptune',
      archetype: 'The Spiritual Catalyst',
      desc: 'Operating with heightened visionary intuition, electric inspiration, and bridge-building between spiritual planes and physical reality.',
      destinyDesc: 'To inspire, channel spiritual insights, and guide humanity as an intuitive beacon.',
      soulDesc: 'An intense inner urge to illuminate consciousness and embody spiritual integrity.',
      personalYearDesc: 'A transformative spiritual catalyst year with intense epiphanies and high creative flow.',
      traits: ['Visionary', 'Highly Intuitive', 'Inspiring', 'Idealistic', 'Spiritual', 'Charismatic'],
      luckyNumbers: [11, 2, 7, 29],
      luckyColors: [{ name: 'Platinum Silver', hex: '#E2E8F0' }, { name: 'Electric Violet', hex: '#8B5CF6' }, { name: 'Sun Gold', hex: '#EAB308' }],
      insight: 'As a Master Number 11, your sensitivity is an antenna for divine truth. Ground your high-voltage intuition in physical routines and share your light generously.',
    },
    22: {
      title: 'The Master Builder of Destiny (Master 22)',
      planet: 'Rahu / Sun',
      archetype: 'The Cosmic Architect',
      desc: 'Possessing the extraordinary ability to manifest monumental global visions, infrastructure, and world-changing humanitarian systems.',
      destinyDesc: 'To construct global institutions, revolutionary frameworks, and lasting legacies for generations.',
      soulDesc: 'An inner drive to manifest dreams into large-scale reality for the benefit of humanity.',
      personalYearDesc: 'A momentous year for major construction, global enterprise, and realizing monumental goals.',
      traits: ['Master Builder', 'Practical Visionary', 'Powerful', 'Global Thinker', 'Disciplined', 'Universal'],
      luckyNumbers: [22, 4, 8, 31],
      luckyColors: [{ name: 'Imperial Gold', hex: '#CA8A04' }, { name: 'Cobalt Blue', hex: '#1D4ED8' }, { name: 'Pure Coral', hex: '#EA580C' }],
      insight: 'As a Master Number 22, you hold the blueprints for grand achievements. Ground your towering vision with step-by-step master execution.',
    },
    33: {
      title: 'The Master Spiritual Teacher (Master 33)',
      planet: 'Jupiter / Venus',
      archetype: 'The Avatar of Compassion',
      desc: 'The highest vibration of spiritual mentorship, boundless unconditional love, universal healing, and devotional upliftment.',
      destinyDesc: 'To heal, uplift, and selflessly guide collective spiritual awakening through profound love.',
      soulDesc: 'Universal compassion, devotional surrender to truth, and serving as a spiritual beacon.',
      personalYearDesc: 'A sacred year of spiritual mentorship, compassionate service, and emotional transcendence.',
      traits: ['Master Teacher', 'Unconditional Love', 'Healer', 'Selfless', 'Illuminated', 'Devotional'],
      luckyNumbers: [33, 6, 9, 24],
      luckyColors: [{ name: 'Pure Golden Light', hex: '#FBBF24' }, { name: 'Celestial White', hex: '#F8FAFC' }, { name: 'Emerald', hex: '#059669' }],
      insight: 'As a Master Number 33, your presence is a healing balm. Lead with devotional compassion while maintaining energetic equilibrium.',
    },
  };

  const profile = numberProfiles[lifePathNumber] || numberProfiles[reduceToSingle(lifePathNumber, false)] || numberProfiles[7];
  const destinyProfile = numberProfiles[destinyNumber] || numberProfiles[reduceToSingle(destinyNumber, false)] || numberProfiles[3];
  const soulProfile = numberProfiles[soulUrgeNumber] || numberProfiles[reduceToSingle(soulUrgeNumber, false)] || numberProfiles[9];
  const personalYearProfile = numberProfiles[personalYearNumber] || numberProfiles[5];

  return {
    name,
    dob: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    mulank,
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalYearNumber,
    title: profile.title,
    archetype: profile.archetype,
    planet: profile.planet,
    desc: profile.desc,
    traits: profile.traits,
    luckyNumbers: profile.luckyNumbers,
    luckyColors: profile.luckyColors,
    insight: `${profile.insight} Your Destiny Number (${destinyNumber}) guides your professional calling toward ${destinyProfile.destinyDesc.toLowerCase()} In this Personal Year (${personalYearNumber}), ${personalYearProfile.personalYearDesc.toLowerCase()}`,
    destinyDesc: destinyProfile.destinyDesc,
    soulUrgeDesc: soulProfile.soulDesc,
    personalYearDesc: personalYearProfile.personalYearDesc,
  };
}

export function calculateNumerology(name, dob) {
  const data = getCompleteNumerology(name, dob);
  return {
    lifePathNumber: data.lifePathNumber,
    destinyNumber: data.destinyNumber,
    soulUrgeNumber: data.soulUrgeNumber,
    personalYearNumber: data.personalYearNumber,
    mulank: data.mulank,
  };
}

// ── Save Kundli to Supabase ──────────
export async function saveKundli(userId, kundliData) {
  const localId = kundliData.id || 'kundli_' + Date.now();
  const localRecord = {
    id: localId,
    user_id: isUUID(userId) ? userId : null,
    ...kundliData,
    created_at: new Date().toISOString(),
  };
  localStorage.setItem('kundli_data', JSON.stringify(localRecord));
  localStorage.setItem('current_kundli_id', localId);

  if (!isSupabaseConfigured()) {
    return localRecord;
  }

  try {
    let effectiveUserId = isUUID(userId) ? userId : null;
    if (!effectiveUserId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id && isUUID(user.id)) {
          effectiveUserId = user.id;
        }
      } catch {
        effectiveUserId = null;
      }
    }

    let formattedTime = null;
    if (!kundliData.time_unknown && kundliData.time_of_birth) {
      const parts = String(kundliData.time_of_birth).split(':');
      if (parts.length >= 2) {
        const h = String(parseInt(parts[0], 10) || 0).padStart(2, '0');
        const m = String(parseInt(parts[1], 10) || 0).padStart(2, '0');
        formattedTime = `${h}:${m}:00`;
      }
    }

    let formattedDate = '1995-05-15';
    if (kundliData.date_of_birth && String(kundliData.date_of_birth).includes('-')) {
      formattedDate = kundliData.date_of_birth;
    } else if (kundliData.dob?.year) {
      formattedDate = `${kundliData.dob.year}-${String(kundliData.dob.month || 1).padStart(2, '0')}-${String(kundliData.dob.day || 1).padStart(2, '0')}`;
    }

    const payload = {
      user_id: effectiveUserId,
      name: String(kundliData.name || 'Seeker').trim(),
      date_of_birth: formattedDate,
      time_of_birth: formattedTime,
      time_unknown: Boolean(kundliData.time_unknown),
      birth_place: String(kundliData.birth_place || kundliData.birthPlace || 'New Delhi').trim(),
      latitude: parseFloat(kundliData.latitude) || 28.6139,
      longitude: parseFloat(kundliData.longitude) || 77.2090,
      timezone: kundliData.timezone || 'Asia/Kolkata',
      lagna: kundliData.lagna || 'Leo (Simha)',
      rashi: kundliData.rashi || 'Cancer (Karka)',
      nakshatra: kundliData.nakshatra || 'Pushya',
      gana: kundliData.gana || 'Manushya',
      planets: Array.isArray(kundliData.planets) ? kundliData.planets : [],
      houses: Array.isArray(kundliData.houses) ? kundliData.houses : [],
      panchang: kundliData.panchang || {},
      life_path_number: parseInt(kundliData.life_path_number, 10) || 7,
      destiny_number: parseInt(kundliData.destiny_number, 10) || 3,
      soul_urge_number: parseInt(kundliData.soul_urge_number, 10) || 9,
      ai_report: kundliData.ai_report || {},
      is_default: Boolean(kundliData.is_default ?? true),
    };

    let query;
    if (isUUID(kundliData.id)) {
      payload.id = kundliData.id;
      query = supabase.from('kundlis').upsert(payload).select().single();
    } else {
      query = supabase.from('kundlis').insert(payload).select().single();
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase saveKundli error:', error);
      return localRecord;
    }

    if (data?.id) {
      localStorage.setItem('current_kundli_id', data.id);
      localStorage.setItem('kundli_data', JSON.stringify({ ...localRecord, ...data }));
    }
    return data;
  } catch (err) {
    console.warn('Supabase saveKundli exception:', err);
    return localRecord;
  }
}

// ── Get User's Kundlis ───────────────
export async function getUserKundlis(userId) {
  if (!isSupabaseConfigured() || !userId || !isUUID(userId)) {
    const local = localStorage.getItem('kundli_data');
    return local ? [JSON.parse(local)] : [];
  }

  try {
    const { data, error } = await supabase
      .from('kundlis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('getUserKundlis error, using local fallback:', err);
    const local = localStorage.getItem('kundli_data');
    return local ? [JSON.parse(local)] : [];
  }
}

// ── Get Single Kundli ────────────────
export async function getKundli(kundliId) {
  if (!isSupabaseConfigured() || !kundliId || !isUUID(kundliId)) {
    const local = localStorage.getItem('kundli_data');
    return local ? JSON.parse(local) : null;
  }

  try {
    const { data, error } = await supabase
      .from('kundlis')
      .select('*')
      .eq('id', kundliId)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('getKundli error, using local fallback:', err);
    const local = localStorage.getItem('kundli_data');
    return local ? JSON.parse(local) : null;
  }
}

// ── Delete Kundli ────────────────────
export async function deleteKundli(kundliId) {
  if (!isSupabaseConfigured() || !isUUID(kundliId)) {
    localStorage.removeItem('kundli_data');
    localStorage.removeItem('current_kundli_id');
    return;
  }

  const { error } = await supabase
    .from('kundlis')
    .delete()
    .eq('id', kundliId);

  if (error) throw error;
}
