export const signs = [
  { sym: '\u2648\uFE0E', en: 'Aries', hi: 'Mesh', range: 'Mar 21 – Apr 19', element: 'Fire', elementBadge: '🔥 Fire', ruler: 'Mars' },
  { sym: '\u2649\uFE0E', en: 'Taurus', hi: 'Vrishabh', range: 'Apr 20 – May 20', element: 'Earth', elementBadge: '🌍 Earth', ruler: 'Venus' },
  { sym: '\u264A\uFE0E', en: 'Gemini', hi: 'Mithun', range: 'May 21 – Jun 20', element: 'Air', elementBadge: '💨 Air', ruler: 'Mercury' },
  { sym: '\u264B\uFE0E', en: 'Cancer', hi: 'Kark', range: 'Jun 21 – Jul 22', element: 'Water', elementBadge: '💧 Water', ruler: 'Moon' },
  { sym: '\u264C\uFE0E', en: 'Leo', hi: 'Simha', range: 'Jul 23 – Aug 22', element: 'Fire', elementBadge: '🔥 Fire', ruler: 'Sun' },
  { sym: '\u264D\uFE0E', en: 'Virgo', hi: 'Kanya', range: 'Aug 23 – Sep 22', element: 'Earth', elementBadge: '🌍 Earth', ruler: 'Mercury' },
  { sym: '\u264E\uFE0E', en: 'Libra', hi: 'Tula', range: 'Sep 23 – Oct 22', element: 'Air', elementBadge: '💨 Air', ruler: 'Venus' },
  { sym: '\u264F\uFE0E', en: 'Scorpio', hi: 'Vrishchik', range: 'Oct 23 – Nov 21', element: 'Water', elementBadge: '💧 Water', ruler: 'Mars' },
  { sym: '\u2650\uFE0E', en: 'Sagittarius', hi: 'Dhanu', range: 'Nov 22 – Dec 21', element: 'Fire', elementBadge: '🔥 Fire', ruler: 'Jupiter' },
  { sym: '\u2651\uFE0E', en: 'Capricorn', hi: 'Makar', range: 'Dec 22 – Jan 19', element: 'Earth', elementBadge: '🌍 Earth', ruler: 'Saturn' },
  { sym: '\u2652\uFE0E', en: 'Aquarius', hi: 'Kumbh', range: 'Jan 20 – Feb 18', element: 'Air', elementBadge: '💨 Air', ruler: 'Saturn' },
  { sym: '\u2653\uFE0E', en: 'Pisces', hi: 'Meen', range: 'Feb 19 – Mar 20', element: 'Water', elementBadge: '💧 Water', ruler: 'Jupiter' },
];

export const predictions = {
  Aries: 'A surge of confidence pushes you forward today. Channel this energy into a goal you have been postponing. A brief conversation in the afternoon may open an unexpected door — speak your mind clearly.',
  Taurus: 'Steady progress is your theme. Small consistent steps in your work or finances will compound. In the evening, a moment of comfort reminds you why patience always pays off.',
  Gemini: 'Conversations flow easily and ideas connect quickly today. Avoid spreading yourself too thin. One focused conversation this morning can shape the rest of your week.',
  Cancer: 'Emotions run close to the surface. Trust your intuition about a person or situation. Home and family bring warmth, so make time for a calm evening.',
  Leo: 'Recognition for a recent effort is closer than you think. Stay generous with your attention and others will mirror it. A creative spark in the afternoon is worth noting.',
  Virgo: 'Details matter today. A careful review prevents a small mistake from growing. Your sense of order brings calm to a chaotic room. Reward yourself tonight.',
  Libra: 'Balance returns after a restless morning. A decision you have been weighing becomes clearer. A close relationship benefits from honest, gentle words.',
  Scorpio: 'Intensity and insight go hand in hand. You see through a surface situation clearly. Use this clarity wisely and keep some thoughts private for now.',
  Sagittarius: 'Adventure calls, even in small ways. A new route, book, or person expands your view. Optimism is your superpower today — share it generously.',
  Capricorn: 'Discipline brings steady results. Your long-term plan takes a quiet step forward. Acknowledge progress, even the kind no one else notices.',
  Aquarius: 'Original thinking solves a lingering problem. A friend values your perspective more than they admit. Stay open to an unusual suggestion this evening.',
  Pisces: 'Imagination and empathy guide you. A creative or spiritual moment brings clarity. Protect your energy from a demanding task and rest tonight.',
};

export const aspects = {
  Aries: [
    { icon: '♡', title: 'Love', value: 78, label: 'Good', text: 'An honest conversation deepens a bond today.' },
    { icon: '★', title: 'Career', value: 85, label: 'Excellent', text: 'Recognition for recent work is on its way.' },
    { icon: '✦', title: 'Health', value: 64, label: 'Average', text: 'Pace yourself — rest is as important as action.' },
    { icon: '₹', title: 'Finance', value: 72, label: 'Good', text: 'Steady gains; avoid impulsive spending tonight.' },
  ],
};

export const lucky = { number: 7, color: 'Gold', time: '6 – 8 PM', direction: 'North' };

export const advice = 'Trust the natural pacing of events today. When in doubt, let clarity catch up with action.';

export const planets = [
  { sym: '☉', name: 'Sun', pos: 'Leo 14°', influence: 'Vitality & Core Will' },
  { sym: '☽', name: 'Moon', pos: 'Cancer 02°', influence: 'Intuition & Emotions' },
  { sym: '♃', name: 'Jupiter', pos: 'Taurus 27°', influence: 'Wisdom & Growth' },
];

export const personalities = {
  Aries: ['Leonardo da Vinci', 'Lady Gaga', 'Robert Downey Jr.', 'Emma Watson'],
  Taurus: ['William Shakespeare', 'Adele', 'David Beckham', 'Queen Elizabeth II'],
  Gemini: ['Angelina Jolie', 'Kanye West', 'Johnny Depp', 'Marilyn Monroe'],
  Cancer: ['Elon Musk', 'Princess Diana', 'Tom Hanks', 'Selena Gomez'],
  Leo: ['Barack Obama', 'Madonna', 'Kobe Bryant', 'Jennifer Lopez'],
  Virgo: ['Beyoncé', 'Keanu Reeves', 'Warren Buffett', 'Zendaya'],
  Libra: ['Will Smith', 'Kim Kardashian', 'John Lennon', 'Bruno Mars'],
  Scorpio: ['Bill Gates', 'Kendall Jenner', 'Drake', 'Leonardo DiCaprio'],
  Sagittarius: ['Taylor Swift', 'Brad Pitt', 'Walt Disney', 'Bruce Lee'],
  Capricorn: ['Stephen Hawking', 'Michelle Obama', 'Denzel Washington', 'Timothée Chalamet'],
  Aquarius: ['Cristiano Ronaldo', 'Oprah Winfrey', 'Michael Jordan', 'Harry Styles'],
  Pisces: ['Albert Einstein', 'Rihanna', 'Steve Jobs', 'Justin Bieber'],
};

export const compatibility = {
  Aries: { most: ['Leo (Simha)', 'Sagittarius (Dhanu)', 'Gemini (Mithun)'], caution: ['Cancer (Kark)', 'Capricorn (Makar)'] },
  Taurus: { most: ['Virgo (Kanya)', 'Capricorn (Makar)', 'Cancer (Kark)'], caution: ['Leo (Simha)', 'Aquarius (Kumbh)'] },
  Gemini: { most: ['Libra (Tula)', 'Aquarius (Kumbh)', 'Aries (Mesh)'], caution: ['Virgo (Kanya)', 'Pisces (Meen)'] },
  Cancer: { most: ['Scorpio (Vrishchik)', 'Pisces (Meen)', 'Taurus (Vrishabh)'], caution: ['Aries (Mesh)', 'Libra (Tula)'] },
  Leo: { most: ['Aries (Mesh)', 'Sagittarius (Dhanu)', 'Libra (Tula)'], caution: ['Taurus (Vrishabh)', 'Scorpio (Vrishchik)'] },
  Virgo: { most: ['Taurus (Vrishabh)', 'Capricorn (Makar)', 'Cancer (Kark)'], caution: ['Gemini (Mithun)', 'Sagittarius (Dhanu)'] },
  Libra: { most: ['Gemini (Mithun)', 'Aquarius (Kumbh)', 'Leo (Simha)'], caution: ['Cancer (Kark)', 'Capricorn (Makar)'] },
  Scorpio: { most: ['Cancer (Kark)', 'Pisces (Meen)', 'Virgo (Kanya)'], caution: ['Leo (Simha)', 'Aquarius (Kumbh)'] },
  Sagittarius: { most: ['Aries (Mesh)', 'Leo (Simha)', 'Aquarius (Kumbh)'], caution: ['Virgo (Kanya)', 'Pisces (Meen)'] },
  Capricorn: { most: ['Taurus (Vrishabh)', 'Virgo (Kanya)', 'Scorpio (Vrishchik)'], caution: ['Aries (Mesh)', 'Libra (Tula)'] },
  Aquarius: { most: ['Gemini (Mithun)', 'Libra (Tula)', 'Sagittarius (Dhanu)'], caution: ['Taurus (Vrishabh)', 'Scorpio (Vrishchik)'] },
  Pisces: { most: ['Cancer (Kark)', 'Scorpio (Vrishchik)', 'Capricorn (Makar)'], caution: ['Gemini (Mithun)', 'Sagittarius (Dhanu)'] },
};

export const compatibilityData = compatibility;
export const famousPersonalities = personalities;