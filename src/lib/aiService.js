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

  // Build specific planet positions string
  let planetStr = 'Standard positions';
  if (kundliData.planets) {
    if (Array.isArray(kundliData.planets)) {
      planetStr = kundliData.planets
        .map(
          (p) =>
            `${p.name}: ${p.sign}, House ${p.house || '1'}, ${p.longitude ? `${p.longitude}°` : ''}`
        )
        .join('\n');
    } else if (typeof kundliData.planets === 'object') {
      planetStr = Object.entries(kundliData.planets)
        .map(
          ([name, data]) =>
            `${name}: ${data.sign || data.rashi?.name || 'Aries'}, House ${data.house || '1'}, ${data.degree || data.longitude || '0°'}`
        )
        .join('\n');
    }
  }

  // Current dasha info
  const dashaInfo = kundliData.current_dasha
    ? `${kundliData.current_dasha.lord || kundliData.current_dasha.planet || 'Jupiter'} Mahadasha (${kundliData.current_dasha.start || 'Current'}–${kundliData.current_dasha.end || 'Next'})`
    : kundliData.mahadasha?.activeDasha
    ? `${kundliData.mahadasha.activeDasha.planet} Mahadasha (${kundliData.mahadasha.activeDasha.range})`
    : 'Active Planetary Period';

  const prompt = `
You are an expert Vedic astrologer generating a 
COMPLETELY UNIQUE and PERSONALIZED report.

STRICT RULE: Every sentence must reference THIS 
person's specific chart data below. 
Do NOT give generic readings.
Do NOT repeat the same career fields or health 
areas for different people.

=== THIS PERSON'S UNIQUE CHART ===
Name: ${kundliData.name || 'Seeker'}
Date of Birth: ${kundliData.date_of_birth || kundliData.dob || '2000-01-01'}
Birth Time: ${kundliData.time_of_birth || 'Sunrise'}
Birth Place: ${kundliData.birth_place || kundliData.birthPlace || 'India'}

LAGNA (Ascendant): ${kundliData.lagna || 'Aries'}
This means: The rising sign's qualities dominate the physical appearance and first impressions.

RASHI (Moon Sign): ${kundliData.rashi || 'Aries'}
This means: The emotional nature and instincts.

NAKSHATRA: ${kundliData.nakshatra || 'Ashwini'}
This is the star constellation at birth.

GANA: ${kundliData.gana || 'Deva'}
MANGLIK: ${kundliData.is_manglik ? 'Yes - Mars dosha present' : 'No Manglik dosha'}

PLANETARY POSITIONS (use these SPECIFICALLY):
${planetStr}

CURRENT MAHADASHA: ${dashaInfo}
This planetary period STRONGLY influences career, relationships right now.

NUMEROLOGY:
Life Path: ${kundliData.life_path_number || kundliData.numerology?.lifePathNumber || 1}
Destiny: ${kundliData.destiny_number || kundliData.numerology?.destinyNumber || 1}
Soul Urge: ${kundliData.soul_urge_number || kundliData.numerology?.soulUrgeNumber || 1}

=== GENERATE PERSONALIZED REPORT ===

Using ONLY the specific chart data above, generate this JSON. Each section MUST:
1. Mention specific planets by name (Sun, Moon, Mars etc.)
2. Reference the actual Lagna lord's qualities
3. Reference the Moon sign emotional nature
4. Reference the CURRENT Mahadasha lord's effects
5. Give career fields based on 10th house planets
6. Give health areas based on Lagna sign's body rulership
7. Give relationship compatibility based on 7th house
8. Be COMPLETELY DIFFERENT from any other person's report

{
  "personality": {
    "overview": "Write 4-5 sentences mentioning ${kundliData.lagna} Lagna qualities AND ${kundliData.rashi} Moon emotional nature AND ${kundliData.nakshatra} nakshatra traits",
    "strengths": [
      "Specific strength from Lagna planet placement",
      "Specific strength from Moon sign",
      "Specific strength from nakshatra lord",
      "Specific strength from strongest planet",
      "Specific strength from Life Path ${kundliData.life_path_number || 1}",
      "Specific strength from Destiny ${kundliData.destiny_number || 1}"
    ],
    "challenges": [
      {"title": "Challenge from weakest planet", "desc": "Actionable advice for this placement"},
      {"title": "Challenge from current dasha ${dashaInfo}", "desc": "Actionable remedy or practice"},
      {"title": "Challenge from Lagna/Moon combination", "desc": "Mindset balance technique"}
    ],
    "lifePurpose": "Soul purpose based on Life Path ${kundliData.life_path_number || 1} combined with ${kundliData.nakshatra} nakshatra"
  },
  "career": {
    "overview": "Career overview based on 10th house planets AND current ${dashaInfo} AND Life Path ${kundliData.life_path_number || 1}",
    "bestFields": [
      "Field 1 — based on 10th house planets",
      "Field 2 — based on Lagna lord",
      "Field 3 — based on Mercury placement",
      "Field 4 — based on Jupiter placement",
      "Field 5 — based on Life Path number"
    ],
    "currentPhase": "What ${dashaInfo} means for career RIGHT NOW in 2025-2026",
    "timeline": [
      {
        "period": "2024–2025",
        "prediction": "Specific to ${dashaInfo} and current transits"
      },
      {
        "period": "2025–2026",
        "prediction": "Based on upcoming planetary transits for ${kundliData.rashi}"
      },
      {
        "period": "2026–2027",
        "prediction": "Based on dasha progression"
      }
    ]
  },
  "love": {
    "overview": "Relationship style based on 7th house lord AND Venus placement AND ${kundliData.rashi} emotional nature",
    "bestMatches": [
      {
        "sign": "Most compatible Rashi 1",
        "reason": "Why based on chart elements"
      },
      {
        "sign": "Most compatible Rashi 2",
        "reason": "Why based on chart elements"
      },
      {
        "sign": "Most compatible Rashi 3",
        "reason": "Why based on chart elements"
      }
    ],
    "marriageTiming": "Marriage timing based on Jupiter transit AND 7th lord AND ${dashaInfo}",
    "relationshipLesson": "Key lesson from 7th house and Venus position"
  },
  "health": {
    "constitution": "Ayurvedic constitution based on LAGNA SIGN — ${kundliData.lagna} rules specific body parts. Describe those specific areas.",
    "watchAreas": [
      {
        "area": "Body part ruled by ${kundliData.lagna}",
        "advice": "Specific advice"
      },
      {
        "area": "Body part ruled by Moon sign ${kundliData.rashi}",
        "advice": "Specific advice"
      },
      {
        "area": "Health area from 6th house planets",
        "advice": "Specific advice"
      }
    ],
    "recommendations": {
      "diet": "Diet for ${kundliData.lagna} constitution",
      "exercise": "Exercise for this Lagna type",
      "spiritual": "Practices for ${kundliData.nakshatra}"
    }
  },
  "spiritual": {
    "soulPurpose": "Soul purpose from Life Path ${kundliData.life_path_number || 1} AND ${kundliData.nakshatra} nakshatra's spiritual significance",
    "pastLife": "Past life based on 12th house and Ketu position",
    "practices": [
      "Mantra for Lagna lord",
      "Mantra for Moon sign ${kundliData.rashi}",
      "Practice for current ${dashaInfo}",
      "Practice for ${kundliData.nakshatra}",
      "Practice for Life Path ${kundliData.life_path_number || 1}",
      "Seva (service) based on chart"
    ],
    "remedies": [
      {
        "planet": "Lagna lord planet name",
        "remedy": "Specific remedy for this person",
        "day": "Correct day for this planet"
      },
      {
        "planet": "Moon sign lord",
        "remedy": "Specific remedy",
        "day": "Correct day"
      },
      {
        "planet": "${dashaInfo.split(' ')[0]}",
        "remedy": "Current dasha remedy",
        "day": "Correct day"
      }
    ]
  }
}

CRITICAL: The output for ${kundliData.name || 'Seeker'} with ${kundliData.lagna} Lagna MUST be completely different from someone with same Lagna but different planets, nakshatra, and dasha.

Return ONLY valid JSON. No markdown.
`;

  return await callAI(prompt, 2500, fallback);
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
  let systemPrompt = `You are a wise, compassionate female Vedic Astrologer (विदुषी ज्योतिषाचार्या) with 30+ years of deep experience.
You answer questions based on authentic Vedic astrology principles.
Speak with warmth, maternal wisdom, and clarity. Use natural Hindi/Sanskrit terms (Lagna, Rashi, Dasha, Karma, Dharma, Kundli).
GENDER & GRAMMAR RULE: You are a female astrologer. Always use first-person FEMININE Hindi verbs (use "main karti hoon", "main batati hoon", "main dekh rahi hoon" — NEVER "karta hoon", "batata hoon", "dekh raha hoon").
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
  const dob = kundliData.date_of_birth || kundliData.dob || '2004-09-08';
  const birthPlace = kundliData.birth_place || kundliData.place || 'Delhi, India';

  // Get ALL numerology numbers from the computed numerology object
  const mulank = kundliData.mulank || kundliData.numerology?.mulank || 8;
  const lifePath = kundliData.life_path_number || kundliData.numerology?.lifePathNumber || 5;
  const destiny = kundliData.destiny_number || kundliData.numerology?.destinyNumber || 11;
  const soulUrge = kundliData.soul_urge_number || kundliData.numerology?.soulUrgeNumber || 9;
  const luckyNumbers = kundliData.numerology?.luckyNumbers?.join(', ') || '5, 3, 6';
  const luckyColors = kundliData.numerology?.luckyColors?.join(', ') || 'Golden Yellow, Emerald Green';
  const dasha = kundliData.current_dasha?.lord || kundliData.mahadasha?.activeDasha?.planet || '';

  const planetsInfo = Array.isArray(kundliData.planets)
    ? kundliData.planets.map(p => `${p.name}: ${p.sign}`).join(', ')
    : 'Sun: Leo, Moon: Gemini, Mars: Leo, Mercury: Virgo, Jupiter: Virgo, Venus: Cancer, Saturn: Cancer, Rahu: Aries, Ketu: Libra';

  const prompt = `
You are a warm, wise female Vedic Astrologer (विदुषी ज्योतिषाचार्या).
STRICT GENDER RULE: Always speak in FIRST-PERSON FEMININE Hindi / Hinglish (use "main batati hoon", "main dekh rahi hoon", "main karti hoon", "meri salah hai" — NEVER masculine forms like "batata hoon", "dekh raha hoon", "karta hoon").

A seeker named "${name}" asked this astrological question:
"${transcript}"

SEEKER'S COMPLETE VEDIC CHART & NUMEROLOGY DATA (ALREADY KNOWN — DO NOT ASK AGAIN):
- Name: ${name}
- Date of Birth: ${typeof dob === 'object' ? `${dob.year}-${dob.month}-${dob.day}` : dob}
- Birth Place: ${birthPlace}
- Ascendant / Lagna: ${lagna}
- Chandra Rashi (Moon Sign): ${rashi}
- Janma Nakshatra: ${nakshatra}
${dasha ? `- Active Mahadasha: ${dasha}` : ''}
- Mulank (Birth Day Number): ${mulank}
- Bhagyank / Life Path Number: ${lifePath}
- Namank / Destiny Number: ${destiny}
- Soul Urge Number: ${soulUrge}
- Lucky Numbers: ${luckyNumbers}
- Lucky Colors: ${luckyColors}
- Planetary Sign Placements: ${planetsInfo}

STRICT RULES:
1. GENDER: Speak as a female astrologer using feminine verb forms (e.g. "Main aapki kundli me dekh rahi hoon...").
2. NEVER ask the user for their birth details, name, DOB, or any information — you ALREADY have everything above.
3. If user asks "Mera Mulank kya hai?" → Answer IMMEDIATELY: "Aapka Mulank ${mulank} hai" (Birth Day Number).
4. If user asks "Mera Life Path Number kya hai?" → Answer: "Aapka Life Path Number / Bhagyank ${lifePath} hai."
5. If user asks "Mera Destiny Number kya hai?" → Answer: "Aapka Destiny Number / Namank ${destiny} hai."
6. Mulank (${mulank}) and Life Path (${lifePath}) are DIFFERENT numbers. Do NOT confuse them.
7. Directly reference their actual chart placements (Lagna, Rashi, Nakshatra, specific numbers, Planets) when relevant.
8. Keep response natural, warm, and spoken (2 to 4 sentences maximum).
9. Do NOT use markdown formatting (no *, **, #, bullet points). This is for spoken/displayed conversational output.
10. Return valid JSON only with the key "answer". Example: { "answer": "Your detailed personalized response here..." }
`;

  try {
    const res = await callAI(prompt, 400);
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
        `Based on your ${lagna} Lagna and ${rashi} Moon sign, your Mulank is ${mulank} and Life Path Number is ${lifePath}. Your planetary positions indicate strong clarity and auspicious potential.`,
    };
  } catch (err) {
    console.error('generateVoiceResponse error:', err);
    return {
      answer: `According to your ${lagna} Lagna and ${rashi} Chandra Rashi in ${nakshatra}, your Mulank is ${mulank} and Life Path Number is ${lifePath}. Your cosmic alignments highlight transformative strength and steady progress.`,
    };
  }
}

