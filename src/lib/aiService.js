import OpenAI from 'openai';

// ── Config ───────────────────────────
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'openai';
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const CLAUDE_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const isKeyValid = (k) => Boolean(k && !k.startsWith('your_') && k.length > 10);

// ── Dynamic Personalized Fallback Generator ─────────
export function getDynamicVedicReport(kundliData = {}) {
  const lagna = kundliData.lagna || 'Scorpio (Vrishchik)';
  const rashi = kundliData.rashi || 'Gemini (Mithun)';
  const nakshatra = kundliData.nakshatra || 'Ardra';
  const name = kundliData.name || 'Seeker';
  const birthLord = kundliData.nakshatraLord || 'Rahu';

  return {
    personality: {
      overview: `With ${lagna} as your Ascendant and ${rashi} as your Chandra Rashi in ${nakshatra} nakshatra, your chart combines intense inner willpower with exceptional intellectual adaptability. You possess natural strategic discernment, deep emotional perception, and magnetic presence. People recognize your competence and intuitive insight.`,
      strengths: [
        `Strategic Mind — ${lagna} Lagna bestows depth, focus, and piercing insight.`,
        `Curious Intellect — ${rashi} Chandra Rashi provides quick learning and versatility.`,
        `Resilient Nature — Deep inner emotional stamina to overcome transformational hurdles.`,
        `Astute Discernment — Ability to understand hidden motives and underlying truth.`,
        `Inventive Drive — ${nakshatra} energy drives curiosity and breakthrough solutions.`,
        `Loyal Protection — Fiercely devoted to loved ones and core principles.`,
      ],
      challenges: [
        { title: 'Emotional Guardedness', desc: 'Tendency to keep inner feelings shielded. Cultivate trusted openness.' },
        { title: 'Restless Overthinking', desc: 'Dual-air sign influences can cause mental dispersion. Practice grounding breathwork.' },
        { title: 'Pacing Intensity', desc: 'Operating with high intensity requires balancing ambition with regular rest.' },
      ],
      lifePurpose: `“Your soul came to transform challenge into wisdom, illuminate hidden knowledge, and inspire others through communicative truth and unwavering spiritual courage.”`,
    },
    career: {
      overview: `Your planetary placements indicate strong aptitude for leadership, strategic analysis, research, technology, communication, and advisory roles. You thrive in vocations requiring problem-solving and specialized mastery.`,
      bestFields: [
        'Strategic Leadership & Management',
        'Information Technology, Data & Engineering',
        'Research, Analytics & Investigation',
        'Advisory, Consulting & Mentorship',
        'Media, Communication & Writing',
        'Holistic Health & Financial Strategy',
      ],
      currentPhase: `Currently moving through favorable planetary periods supporting intellectual expansion, career restructuring, and authoritative recognition.`,
      timeline: [
        { period: '2024–2025', prediction: 'Professional consolidation, skill enhancement, and key foundational achievements.' },
        { period: '2025–2026', prediction: 'Expansion of responsibilities, lucrative opportunities, and positive peer recognition.' },
        { period: '2026–2027', prediction: 'High-impact milestones, enhanced autonomy, and long-term vocational stability.' },
      ],
    },
    love: {
      overview: `In relationships, you seek genuine mental stimulation paired with deep emotional authenticity. Mutual respect, intelligent conversation, and unwavering loyalty form the bedrock of your partnerships.`,
      bestMatches: [
        { sign: 'Cancer (Kark)', reason: 'Profound emotional understanding, nurturing warmth, and deep loyalty.' },
        { sign: 'Pisces (Meen)', reason: 'Spiritual harmony, intuitive depth, and unconditional mutual support.' },
        { sign: 'Taurus (Vrishabh)', reason: 'Grounding stability, sensual warmth, and complementary opposite alignment.' },
      ],
      marriageTiming: 'Transiting Jupiter and favorable Dasha sub-periods create harmonious windows for commitment and lasting marital happiness.',
      relationshipLesson: 'Balance independence with open emotional vulnerability; allow your partner to see your tender inner core.',
    },
    health: {
      constitution: `Dynamic blend of Pitta (transformative solar fire) and Vata (mental mobility). Strong vitality supported by conscious nervous system care.`,
      watchAreas: [
        { area: 'Nervous System & Mind', advice: 'Avoid mental fatigue; practice daily meditation and digital detox.' },
        { area: 'Digestion & Metabolism', advice: 'Favor freshly cooked, warm sattvic food and mindful eating rhythms.' },
        { area: 'Reproductive & Pelvic Health', advice: 'Maintain adequate hydration and regular morning stretching exercises.' },
      ],
      recommendations: {
        diet: 'Wholesome grains, cooling herbs, almonds, fresh seasonal fruits, and warm herbal teas.',
        exercise: 'Surya Namaskar at dawn, brisk walking in greenery, and restorative yoga.',
        spiritual: 'Daily pranayama (Anulom Vilom) and silent reflection at twilight.',
      },
    },
    spiritual: {
      soulPurpose: 'To evolve from mental restlessness toward meditative stillness, utilizing your analytical mind in service of dharma.',
      pastLife: 'Cultivated scholarship, investigation, and intellectual pursuits, now evolving toward higher spiritual wisdom and emotional mastery.',
      practices: [
        'Pranayama (Alternate Nostril Breathing) for 10 minutes at sunrise',
        'Gayatri Mantra or Mahamrityunjaya Mantra chanting',
        'Offering water (Arghya) to the rising Sun on Sundays',
        'Feeding birds and practicing weekly charity (Daan)',
      ],
      remedies: [
        { planet: 'Sun ☉', remedy: 'Offer water to the morning sun and practice daily gratitude', day: 'Sunday' },
        { planet: `${birthLord} (Nakshatra Lord)`, remedy: 'Practice mindful silence and donate to spiritual causes', day: 'Wednesday' },
        { planet: 'Jupiter ♃', remedy: 'Respect teachers/mentors and donate yellow items/food', day: 'Thursday' },
      ],
    },
  };
}

// ── Core AI caller ───────────────────
async function callAI(prompt, maxTokens = 1000, fallbackData = null) {
  if (AI_PROVIDER === 'openai') {
    if (isKeyValid(OPENAI_KEY)) {
      try {
        console.log('✦ Calling OpenAI (gpt-4o-mini)...');
        return await callOpenAI(prompt, maxTokens);
      } catch (err) {
        console.warn('OpenAI call failed, trying Claude fallback:', err);
      }
    }
    if (isKeyValid(CLAUDE_KEY)) {
      try {
        console.log('✦ Calling Claude fallback...');
        return await callClaude(prompt, maxTokens);
      } catch (err) {
        console.warn('Claude fallback also failed:', err);
      }
    }
  } else {
    if (isKeyValid(CLAUDE_KEY)) {
      try {
        console.log('✦ Calling Claude...');
        return await callClaude(prompt, maxTokens);
      } catch (err) {
        console.warn('Claude call failed, trying OpenAI fallback:', err);
      }
    }
    if (isKeyValid(OPENAI_KEY)) {
      try {
        console.log('✦ Calling OpenAI fallback...');
        return await callOpenAI(prompt, maxTokens);
      } catch (err) {
        console.warn('OpenAI fallback also failed:', err);
      }
    }
  }

  // Graceful local fallback if both APIs unavailable
  return fallbackData || getDynamicVedicReport({});
}

// ── Call OpenAI (gpt-4o-mini) ─────────
async function callOpenAI(prompt, maxTokens = 1000) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an expert Vedic Astrologer (Jyotishi) with 30+ years of deep classical knowledge in Parashari astrology, Jaimini astrology, and Nakshatra analysis.
You provide accurate, deeply personalized, warm, and highly authentic astrological insights based on the exact user's Lagna, Rashi, Nakshatra, and real planetary positions.
Always return response in valid JSON format only. No markdown fences around JSON if possible, or standard json blocks.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  const text = response.choices[0].message.content;
  try {
    return JSON.parse(text);
  } catch {
    return JSON.parse(
      text.replace(/```json/g, '').replace(/```/g, '').trim()
    );
  }
}

// ── Call Claude (claude-3-haiku) ──────
async function callClaude(prompt, maxTokens = 1000) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_KEY,
      'anthropic-version': '2023-06-01',
      'dangerously-allow-browser': 'true',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: maxTokens,
      system: `You are an expert Vedic Astrologer with 30+ years experience. Return valid JSON only.`,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  try {
    return JSON.parse(text);
  } catch {
    return JSON.parse(
      text.replace(/```json/g, '').replace(/```/g, '').trim()
    );
  }
}

// ── KUNDLI REPORT ────────────────────
export async function generateKundliReport(kundliData) {
  const fallback = getDynamicVedicReport(kundliData);

  const prompt = `
Generate a detailed, authentic, and deeply personalized Vedic kundli report based on the user's real astronomical chart.

User Astronomical Data:
- Name: ${kundliData.name || 'Seeker'}
- Date of Birth: ${kundliData.date_of_birth}
- Lagna (Ascendant): ${kundliData.lagna} (Degree: ${kundliData.lagnaDegree || ''})
- Chandra Rashi (Moon Sign): ${kundliData.rashi} (Degree: ${kundliData.rashiDegree || ''})
- Nakshatra: ${kundliData.nakshatra} (Pada: ${kundliData.nakshatraPada || 1}, Lord: ${kundliData.nakshatraLord || 'Rahu'})
- Gana: ${kundliData.gana || 'Manushya'}
- Planetary Placements: ${JSON.stringify(
    (kundliData.planets || []).map((p) => `${p.name} in ${p.sign} (House ${p.house})`)
  )}
- Current Vimshottari Mahadasha: ${kundliData.mahadasha?.activeDasha?.planet || 'Active'} (${kundliData.mahadasha?.activeDasha?.range || ''})

Return this exact JSON structure:
{
  "personality": {
    "overview": "4-5 lines synthesizing exact ${kundliData.lagna} Lagna and ${kundliData.rashi} Moon",
    "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5", "strength6"],
    "challenges": [
      {"title": "challenge1 title", "desc": "actionable advice"},
      {"title": "challenge2 title", "desc": "actionable advice"},
      {"title": "challenge3 title", "desc": "actionable advice"}
    ],
    "lifePurpose": "inspiring poetic life statement"
  },
  "career": {
    "overview": "4-5 lines about career and 10th house/Lagna strengths",
    "bestFields": ["field1", "field2", "field3", "field4", "field5", "field6"],
    "currentPhase": "Current dasha career insight",
    "timeline": [
      {"period": "2024–2025", "prediction": "..."},
      {"period": "2025–2026", "prediction": "..."},
      {"period": "2026–2027", "prediction": "..."}
    ]
  },
  "love": {
    "overview": "4-5 lines about relationships and 7th house",
    "bestMatches": [
      {"sign": "Match Sign 1", "reason": "reason"},
      {"sign": "Match Sign 2", "reason": "reason"},
      {"sign": "Match Sign 3", "reason": "reason"}
    ],
    "marriageTiming": "2-3 lines about marriage timing",
    "relationshipLesson": "one key lesson"
  },
  "health": {
    "constitution": "Ayurvedic dosha analysis (Pitta/Vata/Kapha)",
    "watchAreas": [
      {"area": "area 1", "advice": "one line advice"},
      {"area": "area 2", "advice": "one line advice"},
      {"area": "area 3", "advice": "one line advice"}
    ],
    "recommendations": {
      "diet": "dietary advice",
      "exercise": "exercise advice",
      "spiritual": "spiritual health advice"
    }
  },
  "spiritual": {
    "soulPurpose": "3-4 lines about soul purpose",
    "pastLife": "past life karmic indicator",
    "practices": ["practice 1", "practice 2", "practice 3", "practice 4"],
    "remedies": [
      {"planet": "Primary Benefic", "remedy": "Vedic remedy", "day": "Day of week"},
      {"planet": "Lagna Lord", "remedy": "Vedic remedy", "day": "Day of week"},
      {"planet": "Dasha Lord", "remedy": "Vedic remedy", "day": "Day of week"}
    ]
  }
}

Use authentic Vedic Jyotish principles tailored specifically to this person's chart.
`;

  return await callAI(prompt, 2000, fallback);
}

// ── NUMEROLOGY REPORT ────────────────
export async function generateNumerologyReport(name, dob, numbers) {
  const prompt = `
Generate personalized numerology insights.

Name: ${name}
Date of Birth: ${dob}
Life Path Number: ${numbers.lifePathNumber}
Destiny Number: ${numbers.destinyNumber}
Soul Urge Number: ${numbers.soulUrgeNumber}

Return this exact JSON:
{
  "lifePathMeaning": "title like The Seeker",
  "lifePathDesc": "3-4 lines about life path",
  "destinyDesc": "2-3 lines about destiny",
  "soulUrgeDesc": "2-3 lines about soul urge",
  "traits": ["trait1", "trait2", "trait3", "trait4", "trait5", "trait6"],
  "insights": "3-4 lines overall reading"
}
`;
  return await callAI(prompt, 800);
}

// ── GUN MILAN ANALYSIS ───────────────
export async function generateGunMilanAnalysis(person1, person2, score, gunas) {
  const prompt = `
Generate Vedic marriage compatibility analysis.

Person 1: ${person1.name}, 
  Rashi: ${person1.rashi || 'Mesh'}, 
  Nakshatra: ${person1.nakshatra || 'Ashwini'},
  Manglik: ${Boolean(person1.isManglik)}

Person 2: ${person2.name}, 
  Rashi: ${person2.rashi || 'Karka'}, 
  Nakshatra: ${person2.nakshatra || 'Pushya'},
  Manglik: ${Boolean(person2.isManglik)}

Ashtakoota Score: ${score}/36
Guna Breakdown: ${JSON.stringify(gunas)}

Return this exact JSON:
{
  "verdict": "2-3 lines overall verdict",
  "strengths": "2-3 lines about strongest areas",
  "challenges": "2-3 lines about weak areas and how to handle them",
  "auspiciousTiming": "favorable period for marriage",
  "recommendation": "final astrologer recommendation"
}
`;
  return await callAI(prompt, 800);
}

// ── DAILY HOROSCOPE ──────────────────
export async function generateDailyHoroscope(rashi, date) {
  const prompt = `
Generate daily Vedic horoscope for ${rashi} for ${date}.

Return this exact JSON:
{
  "overall": "2-3 lines overview",
  "rating": 4.5,
  "energy": 85,
  "love": {
    "rating": "Good",
    "prediction": "2 lines",
    "tip": "one line tip"
  },
  "career": {
    "rating": "Excellent",
    "prediction": "2 lines",
    "tip": "one line tip"
  },
  "health": {
    "rating": "Good",
    "prediction": "2 lines",
    "tip": "one line tip"
  },
  "finance": {
    "rating": "Favorable",
    "prediction": "2 lines",
    "tip": "one line tip"
  },
  "lucky": {
    "number": 7,
    "color": "Golden Amber",
    "time": "5:00 PM – 7:00 PM",
    "direction": "North-East"
  },
  "advice": "one line key advice for the day",
  "morningPrediction": "morning energy 1-2 lines",
  "afternoonPrediction": "afternoon focus 1-2 lines",
  "eveningPrediction": "evening relaxation 1-2 lines"
}
`;
  return await callAI(prompt, 800);
}

// ── ASTRO CHAT (Kundli Guru) ─────────
export async function generateAstroChatResponse(messages, kundliData) {
  let systemPrompt = `You are a wise, compassionate Vedic Astrologer (Jyotishi) with 30+ years of deep experience.
You answer questions based on authentic Vedic astrology principles.
Speak with warmth, wisdom, and clarity. Use natural Hindi/Sanskrit terms (Lagna, Rashi, Dasha, Karma, Dharma, Kundli).
Keep answers concise, actionable, and spiritually uplifting.`;

  if (kundliData) {
    systemPrompt += `
User's Kundli Data:
- Name: ${kundliData.name}
- Lagna: ${kundliData.lagna}
- Chandra Rashi: ${kundliData.rashi}
- Nakshatra: ${kundliData.nakshatra}
- Current Mahadasha: ${kundliData.mahadasha?.activeDasha?.planet || 'Active'}
Use this specific chart data when answering the user.`;
  }

  const prompt = messages[messages.length - 1]?.content || 'What does my chart reveal?';
  const aiResult = await callAI(`${systemPrompt}\n\nUser Question: ${prompt}`, 600);
  return typeof aiResult === 'string' ? aiResult : (aiResult.answer || aiResult.insights || JSON.stringify(aiResult));
}

// ── VOICE RESPONSES ──────────────────
export async function generateVoiceResponse(transcript, kundliData = {}) {
  const name = kundliData.name || 'Seeker';
  const lagna = kundliData.lagna || 'Scorpio (Vrishchik)';
  const rashi = kundliData.rashi || 'Gemini (Mithun)';
  const nakshatra = kundliData.nakshatra || 'Ardra';
  const lifePath = kundliData.life_path_number || kundliData.numerology?.lifePathNumber || '5';
  const destiny = kundliData.destiny_number || kundliData.numerology?.destinyNumber || '11';
  const planetsInfo = Array.isArray(kundliData.planets)
    ? kundliData.planets.map(p => `${p.name}: ${p.sign}`).join(', ')
    : 'Sun: Leo, Moon: Gemini, Mars: Leo, Mercury: Virgo, Jupiter: Virgo, Venus: Cancer, Saturn: Cancer, Rahu: Aries, Ketu: Libra';

  const prompt = `
A seeker named "${name}" asked this astrological question:
"${transcript}"

Seeker's Real Vedic Astrology Chart Details:
- Name: ${name}
- Ascendant / Lagna: ${lagna}
- Chandra Rashi (Moon Sign): ${rashi}
- Nakshatra: ${nakshatra}
- Numerology Life Path Number: ${lifePath}
- Numerology Destiny Number: ${destiny}
- Planetary Sign Placements: ${planetsInfo}

Instructions:
1. Provide an authentic, deeply personalized, spoken Vedic astrology answer specifically addressing the user's question "${transcript}".
2. Directly reference their actual chart placements (Lagna, Rashi, Nakshatra, Life Path Number, or Planets) as relevant.
3. Keep it natural, warm, and spoken (2 to 4 sentences maximum).
4. Do NOT use markdown asterisks (* or **), bullet points, or lists because this will be spoken aloud to the user.
5. Return valid JSON only with the key "answer". Example: { "answer": "Your detailed personalized response here..." }
`;

  try {
    const res = await callAI(prompt, 350);
    const answer =
      typeof res === 'string'
        ? res
        : res?.answer ||
          res?.response ||
          res?.reply ||
          res?.message ||
          res?.text ||
          res?.insights ||
          (typeof res === 'object' ? Object.values(res).find(v => typeof v === 'string') : null);

    return {
      answer:
        answer ||
        `Based on your ${lagna} Lagna and ${rashi} Moon sign, your planetary positions indicate strong mental clarity and auspicious potential for your journey.`,
    };
  } catch (err) {
    console.error('generateVoiceResponse error:', err);
    return {
      answer: `According to your ${lagna} Lagna and ${rashi} Chandra Rashi in ${nakshatra}, your cosmic alignments highlight wisdom, transformative strength, and steady progress.`,
    };
  }
}

