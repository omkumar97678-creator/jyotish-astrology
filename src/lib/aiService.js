import OpenAI from 'openai';

// ── Config ───────────────────────────
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'openai';
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const CLAUDE_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const isKeyValid = (k) => Boolean(k && !k.startsWith('your_'));

// ── Fallback Defaults ─────────────────
function getDefaultFallback(prompt) {
  if (prompt.includes('Vedic kundli report')) {
    return {
      personality: {
        overview: 'Endowed with natural charisma and profound emotional intelligence, your chart indicates a noble spirit with clear intuition and high ambition.',
        strengths: ['Inspiring Leadership', 'Emotional Wisdom', 'Analytical Discerning Mind', 'Steadfast Loyalty', 'Creative Vision', 'Inner Resilience'],
        challenges: ['Balancing Pride & Humility', 'Setting Healthy Emotional Boundaries', 'Pacing Work & Rest'],
        lifePurpose: 'To illuminate minds, lead with dharma, and elevate your community through compassionate wisdom.',
      },
      career: {
        overview: 'Exceptional capacity for guidance, strategic leadership, creative enterprise, and advisory roles.',
        bestFields: ['Leadership & Strategy', 'Consulting & Advisory', 'Creative Arts & Media', 'Finance & Analytics', 'Holistic Wellness'],
        currentPhase: 'Favorable planetary alignment supporting professional expansion and authoritative recognition.',
        timeline: [
          { period: '2024–2025', prediction: 'Significant professional milestone and recognition from senior leaders.' },
          { period: '2025–2026', prediction: 'Strategic collaborations and lucrative growth opportunities.' },
          { period: '2026–2027', prediction: 'Expanded authority and broader regional or international impact.' },
        ],
      },
      love: {
        overview: 'You love with deep sincerity, loyalty, and expressive warmth. Mutual respect is foundational for your heart.',
        bestMatches: [
          { sign: 'Aries (Mesh)', reason: 'Dynamic mutual passion and shared ambitious drive.' },
          { sign: 'Leo (Simha)', reason: 'Radiant harmony and profound mutual celebration.' },
          { sign: 'Sagittarius (Dhanu)', reason: 'Expansive philosophical alignment and joyful companionship.' },
        ],
        marriageTiming: '2025–2027 presents an auspicious planetary transit for enduring holy union.',
        relationshipLesson: 'Practice open vulnerability and celebrate shared growth.',
      },
      health: {
        constitution: 'Dynamic solar vitality paired with sensitive lunar digestive rhythm.',
        watchAreas: [
          { area: 'Heart & Circulation', advice: 'Engage in regular morning cardiovascular movement.' },
          { area: 'Digestion', advice: 'Favor warm, freshly prepared sattvic meals.' },
          { area: 'Spine & Posture', advice: 'Maintain ergonomic daily posture and stretching.' },
        ],
        recommendations: {
          diet: 'Seasonal fruits, wholesome grains, cooling herbal infusions, and turmeric.',
          exercise: 'Surya Namaskar at sunrise and brisk nature walking.',
          spiritual: 'Morning solar meditation and peaceful twilight breathwork.',
        },
      },
      spiritual: {
        soulPurpose: 'To master inner passions and shine as a conscious, benevolent guide.',
        pastLife: 'Scholarly wisdom and communication mastery evolving into spiritual sovereignty.',
        practices: ['Surya Arghya at dawn', 'Mindful breathwork (Pranayama)', 'Evening reflection and silence (Mauna)', 'Studying ancient Vedic wisdom'],
        remedies: [
          { planet: 'Sun ☉', remedy: 'Offer water to the rising sun and practice gratitude', day: 'Sunday' },
          { planet: 'Moon ☽', remedy: 'Wear natural Moonstone in silver; meditate near water', day: 'Monday' },
          { planet: 'Saturn ♄', remedy: 'Light a sesame oil lamp and feed birds/animals', day: 'Saturday' },
        ],
      },
    };
  }

  if (prompt.includes('numerology insights')) {
    return {
      lifePathMeaning: 'The Seeker of Higher Truth',
      lifePathDesc: 'Endowed with keen analytical intellect, intuitive curiosity, and deep philosophical discernment.',
      destinyDesc: 'Natural creative expression, leadership, and inspiring communication skills.',
      soulUrgeDesc: 'An inner longing for peace, sacred wisdom, and meaningful human connection.',
      traits: ['Analytical', 'Intuitive', 'Visionary', 'Independent', 'Philosophical', 'Creative'],
      insights: 'Your numbers reveal a sacred path of knowledge acquisition, mentorship, and profound spiritual maturity.',
    };
  }

  if (prompt.includes('Vedic marriage compatibility')) {
    return {
      verdict: 'A deeply harmonious and mutually enriching pairing with strong emotional and temperamental synchronization.',
      strengths: 'Emotional stability, intellectual alignment, and reciprocal respect between families.',
      challenges: 'Maintain open dialogue regarding health and financial planning during major transitions.',
      auspiciousTiming: '2025–2026 offers highly supportive astrological transits for wedding celebrations.',
      recommendation: 'An auspicious and promising union supporting lifelong growth.',
    };
  }

  if (prompt.includes('horoscope for')) {
    return {
      overall: 'The planetary energies bestow clarity, renewed enthusiasm, and favorable circumstances for both personal and professional endeavors.',
      rating: 4.5,
      energy: 82,
      love: { rating: 'Good', prediction: 'Warmth and mutual understanding enrich your close bonds.', tip: 'Express genuine appreciation.' },
      career: { rating: 'Excellent', prediction: 'Focused effort brings swift progress and positive acknowledgment.', tip: 'Take calculated initiative.' },
      health: { rating: 'Good', prediction: 'Balanced stamina and positive vital energy throughout the day.', tip: 'Stay well-hydrated.' },
      finance: { rating: 'Favorable', prediction: 'Stability in financial matters with potential for constructive gains.', tip: 'Avoid impulsive spending.' },
      lucky: { number: 7, color: 'Golden Amber', time: '5:00 PM – 7:00 PM', direction: 'North-East' },
      advice: 'Trust your prepared intuition and proceed with calm confidence.',
      morningPrediction: 'Fresh clarity and productive momentum define your morning.',
      afternoonPrediction: 'Constructive interactions and problem solving bring satisfaction.',
      eveningPrediction: 'Relaxing twilight hours ideal for family harmony and contemplation.',
    };
  }

  return {
    answer: 'According to your Vedic birth chart, planetary alignments highlight strong intuitive growth and steady progress in your endeavors.',
    followUp: 'Would you like to explore your Mahadasha timing or specific gemstone remedies?',
  };
}

// ── Core AI caller ───────────────────
// Tries primary provider first, falls back to other if it fails
async function callAI(prompt, maxTokens = 1000) {
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
        console.log('✦ Calling OpenAI fallback (gpt-4o-mini)...');
        return await callOpenAI(prompt, maxTokens);
      } catch (err) {
        console.warn('OpenAI fallback also failed:', err);
      }
    }
  }

  // Graceful fallback if neither API key is active
  return getDefaultFallback(prompt);
}

// ── OpenAI caller ────────────────────
async function callOpenAI(prompt, maxTokens) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // cheap + fast
    max_tokens: maxTokens,
    messages: [
      {
        role: 'system',
        content: 'You are an expert Vedic astrologer and numerologist. Always respond with valid JSON only. No markdown, no preamble.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
  });

  const text = response.choices[0].message.content;
  return JSON.parse(text);
}

// ── Claude caller ─────────────────────
async function callClaude(prompt, maxTokens) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_KEY,
      'anthropic-version': '2023-06-01',
      'dangerously-allow-browser': 'true',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

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
  const prompt = `
Generate a detailed personalized Vedic kundli report.

User Data:
Name: ${kundliData.name}
Date of Birth: ${kundliData.date_of_birth}
Lagna: ${kundliData.lagna}
Rashi: ${kundliData.rashi}
Nakshatra: ${kundliData.nakshatra}
Life Path Number: ${kundliData.life_path_number}
Destiny Number: ${kundliData.destiny_number}
Planets: ${JSON.stringify(kundliData.planets || {})}

Return this exact JSON structure:
{
  "personality": {
    "overview": "4-5 lines about personality",
    "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5", "strength6"],
    "challenges": ["challenge1", "challenge2", "challenge3"],
    "lifePurpose": "inspiring statement"
  },
  "career": {
    "overview": "4-5 lines about career",
    "bestFields": ["field1", "field2", "field3", "field4", "field5"],
    "currentPhase": "dasha career insight 2-3 lines",
    "timeline": [
      {"period": "2024-2025", "prediction": "..."},
      {"period": "2025-2026", "prediction": "..."},
      {"period": "2026-2027", "prediction": "..."}
    ]
  },
  "love": {
    "overview": "4-5 lines about relationships",
    "bestMatches": [
      {"sign": "Aries", "reason": "one line"},
      {"sign": "Leo", "reason": "one line"},
      {"sign": "Sagittarius", "reason": "one line"}
    ],
    "marriageTiming": "2-3 lines",
    "relationshipLesson": "one key lesson"
  },
  "health": {
    "constitution": "3-4 lines",
    "watchAreas": [
      {"area": "area name", "advice": "one line"},
      {"area": "area name", "advice": "one line"},
      {"area": "area name", "advice": "one line"}
    ],
    "recommendations": {
      "diet": "dietary advice",
      "exercise": "exercise advice",
      "spiritual": "spiritual health advice"
    }
  },
  "spiritual": {
    "soulPurpose": "3-4 lines",
    "pastLife": "past life indicator",
    "practices": ["practice1", "practice2", "practice3", "practice4", "practice5", "practice6"],
    "remedies": [
      {"planet": "Sun", "remedy": "...", "day": "Sunday"},
      {"planet": "Moon", "remedy": "...", "day": "Monday"},
      {"planet": "Saturn", "remedy": "...", "day": "Saturday"}
    ]
  }
}

Make it personal, warm, and insightful.
Use occasional Hindi/Sanskrit terms naturally (Lagna, Rashi, Karma, Dharma, Kundli).
`;
  return await callAI(prompt, 2000);
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

Gun Milan Score: ${score}/36
Guna Scores: ${JSON.stringify(gunas || {})}

Return this exact JSON:
{
  "verdict": "overall assessment 3-4 lines",
  "strengths": "strengths 2-3 lines",
  "challenges": "challenges 2-3 lines",
  "auspiciousTiming": "best timing 1-2 lines",
  "recommendation": "final advice 1-2 lines"
}

Be honest but sensitive and positive.
`;
  return await callAI(prompt, 600);
}

// ── DAILY HOROSCOPE ──────────────────
export async function generateHoroscope(rashi, period = 'today') {
  const today = new Date().toLocaleDateString('en-IN');

  const prompt = `
Generate a ${period} horoscope for ${rashi} Rashi.
Date: ${today}

Return this exact JSON:
{
  "overall": "3-4 line main prediction",
  "rating": 4,
  "energy": 75,
  "love": {
    "rating": "Good",
    "prediction": "2 lines",
    "tip": "one tip"
  },
  "career": {
    "rating": "Excellent", 
    "prediction": "2 lines",
    "tip": "one tip"
  },
  "health": {
    "rating": "Average",
    "prediction": "2 lines", 
    "tip": "one tip"
  },
  "finance": {
    "rating": "Good",
    "prediction": "2 lines",
    "tip": "one tip"
  },
  "lucky": {
    "number": 7,
    "color": "Gold",
    "time": "6-8 PM",
    "direction": "North"
  },
  "advice": "one inspiring advice line",
  "morningPrediction": "2 lines for morning",
  "afternoonPrediction": "2 lines for afternoon",
  "eveningPrediction": "2 lines for evening"
}

Make it specific, positive, and actionable.
`;
  return await callAI(prompt, 800);
}

// ── VOICE Q&A ────────────────────────
export async function generateVoiceResponse(question, kundliContext) {
  const prompt = `
You are a Vedic astrology expert.
Answer this question about the user's kundli.
Keep answer SHORT — max 3-4 sentences.
Conversational and warm tone.

User's Kundli:
${JSON.stringify(kundliContext || {})}

User's Question: "${question}"

Return JSON:
{
  "answer": "3-4 sentence answer",
  "followUp": "one optional follow-up question"
}
`;
  return await callAI(prompt, 400);
}

// ── Fallback Utility ─────────────────
export async function generateWithFallback(primaryFn, fallbackFn, ...args) {
  try {
    return await primaryFn(...args);
  } catch (err) {
    console.warn('Primary AI call failed, trying fallback:', err);
    try {
      return await fallbackFn(...args);
    } catch (fallbackErr) {
      console.error('Both AI callers failed:', fallbackErr);
      throw fallbackErr;
    }
  }
}
