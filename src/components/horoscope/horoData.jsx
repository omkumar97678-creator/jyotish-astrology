export const signs = [
  { sym: '♈︎', en: 'Aries', name: 'Aries', hi: 'Mesh', hindi: 'Mesh (मेष)', range: 'Mar 21 – Apr 19', element: 'Fire', elementBadge: '🔥 Fire', ruler: 'Mars' },
  { sym: '♉︎', en: 'Taurus', name: 'Taurus', hi: 'Vrishabh', hindi: 'Vrishabh (वृषभ)', range: 'Apr 20 – May 20', element: 'Earth', elementBadge: '🌍 Earth', ruler: 'Venus' },
  { sym: '♊︎', en: 'Gemini', name: 'Gemini', hi: 'Mithun', hindi: 'Mithun (मिथुन)', range: 'May 21 – Jun 20', element: 'Air', elementBadge: '💨 Air', ruler: 'Mercury' },
  { sym: '♋︎', en: 'Cancer', name: 'Cancer', hi: 'Kark', hindi: 'Karka (कर्क)', range: 'Jun 21 – Jul 22', element: 'Water', elementBadge: '💧 Water', ruler: 'Moon' },
  { sym: '♌︎', en: 'Leo', name: 'Leo', hi: 'Simha', hindi: 'Simha (सिंह)', range: 'Jul 23 – Aug 22', element: 'Fire', elementBadge: '🔥 Fire', ruler: 'Sun' },
  { sym: '♍︎', en: 'Virgo', name: 'Virgo', hi: 'Kanya', hindi: 'Kanya (कन्या)', range: 'Aug 23 – Sep 22', element: 'Earth', elementBadge: '🌍 Earth', ruler: 'Mercury' },
  { sym: '♎︎', en: 'Libra', name: 'Libra', hi: 'Tula', hindi: 'Tula (तुला)', range: 'Sep 23 – Oct 22', element: 'Air', elementBadge: '💨 Air', ruler: 'Venus' },
  { sym: '♏︎', en: 'Scorpio', name: 'Scorpio', hi: 'Vrishchik', hindi: 'Vrishchik (वृश्चिक)', range: 'Oct 23 – Nov 21', element: 'Water', elementBadge: '💧 Water', ruler: 'Mars' },
  { sym: '♐︎', en: 'Sagittarius', name: 'Sagittarius', hi: 'Dhanu', hindi: 'Dhanu (धनु)', range: 'Nov 22 – Dec 21', element: 'Fire', elementBadge: '🔥 Fire', ruler: 'Jupiter' },
  { sym: '♑︎', en: 'Capricorn', name: 'Capricorn', hi: 'Makar', hindi: 'Makar (मकर)', range: 'Dec 22 – Jan 19', element: 'Earth', elementBadge: '🌍 Earth', ruler: 'Saturn' },
  { sym: '♒︎', en: 'Aquarius', name: 'Aquarius', hi: 'Kumbh', hindi: 'Kumbh (कुंभ)', range: 'Jan 20 – Feb 18', element: 'Air', elementBadge: '💨 Air', ruler: 'Saturn' },
  { sym: '♓︎', en: 'Pisces', name: 'Pisces', hi: 'Meen', hindi: 'Meen (मीन)', range: 'Feb 19 – Mar 20', element: 'Water', elementBadge: '💧 Water', ruler: 'Jupiter' },
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