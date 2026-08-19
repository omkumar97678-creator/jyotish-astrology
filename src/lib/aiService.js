const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_MODEL = 'claude-3-5-sonnet-20241022';

// ── Default Mock Fallbacks ───────────
const getFallbackKundliReport = (kundliData) => ({
  personality: {
    overview: `With ${kundliData.lagna || 'Leo rising'} and ${kundliData.rashi || 'Cancer Moon'}, you possess a radiant natural presence balanced with profound emotional wisdom. You approach life with integrity, leading and protecting those you care for deeply.`,
    strengths: [
      'Natural Leadership — commanding yet approachable presence',
      'High Emotional Intelligence — deep empathy and intuition',
      'Analytical Mind — sharp discernment in decision making',
      'Protective Guardian — steadfast loyalty toward loved ones',
      'Creative Expression — refined aesthetic and artistic tastes',
      'Resilient Spirit — learns and matures through life lessons',
    ],
    challenges: [
      'Ego Management — balancing personal pride with quiet humility',
      'Emotional Boundaries — avoiding absorbing external stress',
      'Over-Analysis — trusting spontaneous intuition more frequently',
    ],
    lifePurpose: 'Your soul came to lead, illuminate, and uplift others through selfless wisdom and compassionate strength.',
  },
  career: {
    overview: 'Your cosmic chart highlights exceptional ability in executive guidance, strategic planning, advisory, and creative entrepreneurship.',
    bestFields: [
      'Leadership & Strategic Management',
      'Mentorship, Teaching & Advisory',
      'Creative Arts & Media Direction',
      'Consulting & High-Level Strategy',
      'Health & Wellness Leadership',
    ],
    currentPhase: 'Favorable phase of career expansion, establishing long-term authority and valuable industry networks.',
    timeline: [
      { period: '2024–2025', prediction: 'Major professional milestones and recognition from senior peers.' },
      { period: '2025–2026', prediction: 'Strategic partnerships and lucrative collaborative ventures.' },
      { period: '2026–2027', prediction: 'Expansion into international networks and broader influence.' },
    ],
  },
  love: {
    overview: 'You love with passion, absolute loyalty, and generous devotion. Mutual respect and emotional transparency are essential for your heart.',
    bestMatches: [
      { sign: 'Aries (Mesh)', reason: 'Dynamic shared ambition, passion, and mutual respect.' },
      { sign: 'Sagittarius (Dhanu)', reason: 'Philosophical harmony and joyful shared expansion.' },
      { sign: 'Gemini (Mithun)', reason: 'Lively intellectual connection and constant inspiration.' },
    ],
    marriageTiming: '2025–2027 marks an auspicious planetary window for lasting harmony and sacred partnership.',
    relationshipLesson: 'Cultivate patience and celebrate reciprocal vulnerability with your partner.',
  },
  health: {
    constitution: 'Warm solar vitality with sensitive lunar digestive rhythms. Balance physical vigor with mindful nervous system rest.',
    watchAreas: [
      { area: 'Heart & Circulation', advice: 'Regular cardio activity and cooling hydration.' },
      { area: 'Digestive System', advice: 'Eat warm, fresh meals at consistent hours.' },
      { area: 'Spine & Posture', advice: 'Maintain ergonomic alignment and daily stretching.' },
    ],
    recommendations: {
      diet: 'Wholesome grains, fresh fruits, turmeric, saffron, and cooling herbal infusions.',
      exercise: 'Surya Namaskar at sunrise, swimming, and nature walks.',
      spiritual: 'Morning sun meditation and peaceful evening breathwork.',
    },
  },
  spiritual: {
    soulPurpose: 'To discover inner sovereignty, master your passions, and shine as a benevolent guide for your community.',
    pastLife: 'Strong communication and scholarly karma from previous cycles, evolving into universal spiritual wisdom.',
    practices: [
      'Surya Arghya at dawn with solar mantras',
      'Daily 20-minute quiet contemplative meditation',
      'Chandra and Shiva stotram on Monday evenings',
      'Selfless guidance and community mentoring',
      'Reading foundational Vedic and philosophical texts',
      'Cultivating peaceful silence (Mauna) during twilight',
    ],
    remedies: [
      { planet: 'Sun ☉', remedy: 'Offer Arghya water at sunrise and practice gratitude', day: 'Sunday' },
      { planet: 'Moon ☽', remedy: 'Wear Pearl / Moonstone in pure silver; meditate by water', day: 'Monday' },
      { planet: 'Saturn ♄', remedy: 'Light a sesame oil lamp and feed birds/animals', day: 'Saturday' },
    ],
  },
});

// ── Generate Kundli Report ───────────
export async function generateKundliReport(kundliData) {
  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'your_claude_key') {
    return getFallbackKundliReport(kundliData);
  }

  const prompt = `
You are an expert Vedic astrologer. Generate a detailed, personalized Vedic astrological report based on the following chart details:

User Data:
Name: ${kundliData.name}
Date of Birth: ${kundliData.date_of_birth}
Lagna: ${kundliData.lagna || 'Leo'}
Rashi (Moon Sign): ${kundliData.rashi || 'Cancer'}
Nakshatra: ${kundliData.nakshatra || 'Pushya'}
Life Path Number: ${kundliData.life_path_number || 7}
Destiny Number: ${kundliData.destiny_number || 3}
Planets: ${JSON.stringify(kundliData.planets || {})}

Generate a JSON response with this EXACT structure:
{
  "personality": {
    "overview": "4-5 lines about personality",
    "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5", "strength6"],
    "challenges": ["challenge1", "challenge2", "challenge3"],
    "lifePurpose": "inspiring statement about life purpose"
  },
  "career": {
    "overview": "4-5 lines about career",
    "bestFields": ["field1", "field2", "field3", "field4", "field5"],
    "currentPhase": "current dasha career insight",
    "timeline": [
      {"period": "2024-2025", "prediction": "..."},
      {"period": "2025-2026", "prediction": "..."},
      {"period": "2026-2027", "prediction": "..."}
    ]
  },
  "love": {
    "overview": "4-5 lines about relationships",
    "bestMatches": [
      {"sign": "Aries", "reason": "..."},
      {"sign": "Leo", "reason": "..."},
      {"sign": "Sagittarius", "reason": "..."}
    ],
    "marriageTiming": "2-3 lines about ideal marriage period",
    "relationshipLesson": "key lesson for relationships"
  },
  "health": {
    "constitution": "3-4 lines about health",
    "watchAreas": [
      {"area": "Heart", "advice": "..."},
      {"area": "Digestion", "advice": "..."},
      {"area": "Mental Health", "advice": "..."}
    ],
    "recommendations": {
      "diet": "dietary advice",
      "exercise": "exercise recommendations",
      "spiritual": "spiritual health practices"
    }
  },
  "spiritual": {
    "soulPurpose": "3-4 lines about soul mission",
    "pastLife": "past life indicator from chart",
    "practices": ["practice1", "practice2", "practice3", "practice4", "practice5", "practice6"],
    "remedies": [
      {"planet": "Sun", "remedy": "...", "day": "Sunday"},
      {"planet": "Moon", "remedy": "...", "day": "Monday"}
    ]
  }
}

Respond ONLY with valid JSON. No markdown, no preamble.
Make it personal, warm, and insightful.
Mix English with occasional Sanskrit terms naturally (Lagna, Rashi, Karma, Dharma).
`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-browser': 'true',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      console.warn('Claude API error response, falling back to local calculation');
      return getFallbackKundliReport(kundliData);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.warn('Claude API call failed, using high-quality local fallback:', err);
    return getFallbackKundliReport(kundliData);
  }
}

// ── Generate Numerology Report ───────
export async function generateNumerologyReport(name, dob, numbers) {
  const fallback = {
    lifePathMeaning: 'The Seeker of Truth',
    lifePathDesc: `As a Life Path ${numbers.lifePathNumber}, you are endowed with intellectual curiosity, philosophical depth, and natural analytical talent.`,
    destinyDesc: `Your Destiny Number ${numbers.destinyNumber} highlights natural expression, inspiration, and creative influence.`,
    soulUrgeDesc: `Your Soul Urge Number ${numbers.soulUrgeNumber} reveals an inner yearning for harmony, universal service, and higher understanding.`,
    traits: ['Analytical', 'Intuitive', 'Visionary', 'Independent', 'Philosophical', 'Creative'],
    insights: 'Your numbers align to create a path of intellectual leadership, spiritual discovery, and profound inner growth.',
  };

  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'your_claude_key') {
    return fallback;
  }

  const prompt = `
You are an expert Vedic numerologist. Generate personalized numerology insights for:
Name: ${name}
Date of Birth: ${dob}
Life Path Number: ${numbers.lifePathNumber}
Destiny Number: ${numbers.destinyNumber}
Soul Urge Number: ${numbers.soulUrgeNumber}

Respond with valid JSON only:
{
  "lifePathMeaning": "title like 'The Seeker'",
  "lifePathDesc": "3-4 lines about life path",
  "destinyDesc": "2-3 lines about destiny number",
  "soulUrgeDesc": "2-3 lines about soul urge",
  "traits": ["trait1", "trait2", "trait3", "trait4", "trait5", "trait6"],
  "insights": "3-4 lines overall numerology reading"
}
`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-browser': 'true',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) return fallback;
    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return fallback;
  }
}

// ── Generate Gun Milan Analysis ──────
export async function generateGunMilanAnalysis(person1, person2, score, gunas) {
  const fallback = {
    verdict: `With ${score} out of 36 gunas matched, this union exhibits strong compatibility and temperamental harmony according to Vedic Ashta Koota principles.`,
    strengths: 'Strong emotional synchronization, shared spiritual affinity, and enduring mutual respect.',
    challenges: 'Nadi and health areas benefit from mindful communication and mutual support during times of change.',
    auspiciousTiming: '2025–2027 offers auspicious astrological planetary periods for wedding rituals.',
    recommendation: 'A highly auspicious and mutually enriching partnership for marriage.',
  };

  if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'your_claude_key') {
    return fallback;
  }

  const prompt = `
You are a Vedic astrology expert in marriage compatibility (Gun Milan).
Person 1: ${person1.name}, Rashi: ${person1.rashi || 'Mesh'}, Nakshatra: ${person1.nakshatra || 'Ashwini'}, Manglik: ${Boolean(person1.isManglik)}
Person 2: ${person2.name}, Rashi: ${person2.rashi || 'Karka'}, Nakshatra: ${person2.nakshatra || 'Pushya'}, Manglik: ${Boolean(person2.isManglik)}
Gun Milan Score: ${score}/36
Guna Scores: ${JSON.stringify(gunas || {})}

Respond with JSON only:
{
  "verdict": "overall assessment 3-4 lines",
  "strengths": "relationship strengths 2-3 lines",
  "challenges": "areas needing attention 2-3 lines",
  "auspiciousTiming": "best marriage timing 1-2 lines",
  "recommendation": "final recommendation 1-2 lines"
}
`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-browser': 'true',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) return fallback;
    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return fallback;
  }
}

// ── Fallback Utility ─────────────────
export async function generateWithFallback(primaryFn, fallbackFn, ...args) {
  try {
    return await primaryFn(...args);
  } catch (err) {
    console.warn('Primary service failed, trying fallback:', err);
    try {
      return await fallbackFn(...args);
    } catch (fallbackErr) {
      console.error('All services failed:', fallbackErr);
      throw fallbackErr;
    }
  }
}
