import { supabase, isSupabaseConfigured } from './supabase';

const isUUID = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

// ── Complete Dynamic Vedic Numerology Engine ─────────────
export function getCompleteNumerology(name = 'Seeker', dob = '1995-05-15', lang = 'en') {
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

  // Vedic Number Profiles in English & Hinglish
  const numberProfiles = {
    1: {
      title: 'The Leader & Pioneer (सूर्य - Sun)',
      planet: 'Sun (सूर्य)',
      archetype: 'The Pioneer',
      desc:
        lang === 'hinglish'
          ? 'Aapme prakritik roop se naitrutva, dridh ichhashakti aur naye karyon ko shuru karne ka sahas hai. Aap naye marg banane aur aage badhne ke liye bane hain.'
          : 'You possess natural executive presence, commanding willpower, and innovative ambition. You are built to forge new paths and lead with vision.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka jeevan lakshya aatmanirbhar naitrutva, naye prayas aur dusron ko inspire karne me safal hota hai.'
          : 'Your life purpose unfolds through pioneering leadership, self-reliance, and inspiring innovation.',
      soulDesc:
        lang === 'hinglish'
          ? 'Aapke dil ki ichha hai ki aap aatmanirbhar rahein, swatantra nirnay lein aur ek lasting asar chhoden.'
          : 'Deep within, you yearn for creative sovereignty, independence, and to leave a lasting impact.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh saal nayi shuruat karne, naye projects launch karne aur agle 9-saal ke chakra ki mazboot neev rakhne ka hai.'
          : 'A powerful year for fresh beginnings, starting ambitious ventures, taking bold initiatives, and planting seeds for the next 9-year cycle.',
      traits: lang === 'hinglish' ? ['Aatmanirbhar', 'Naitrutva', 'Sahas', 'Tej', 'Dridh', 'Pioneer'] : ['Ambitious', 'Visionary', 'Independent', 'Pioneering', 'Courageous', 'Decisive'],
      luckyNumbers: [1, 10, 19, 28],
      luckyColors: [{ name: lang === 'hinglish' ? 'Sunehra (Gold)' : 'Gold / Yellow', hex: '#D4AF37' }, { name: lang === 'hinglish' ? 'Tamra / Kesari' : 'Copper / Orange', hex: '#C8822A' }, { name: lang === 'hinglish' ? 'Manikya Laal' : 'Ruby Red', hex: '#E11D48' }],
      insight:
        lang === 'hinglish'
          ? 'Surya dwara shasit Life Path 1 ke roop me, aapka tej aur naitrutva aapki sabse badi shakti hai. Apne raste par bina kisi darr ke aage badhein.'
          : 'As a Life Path 1 ruled by the Sun, you are here to initiate and shine. Your strength lies in decisive clarity and bold courage. Trust your individual path without seeking external validation.',
    },
    2: {
      title: 'The Peacemaker & Diplomat (चंद्र - Moon)',
      planet: 'Moon (चंद्र)',
      archetype: 'The Harmonizer',
      desc:
        lang === 'hinglish'
          ? 'Aapme gehri sahanubhuti, aapsi samajh aur shaanti sthapit karne ki adbhut kshamta hai. Aap sabhi ko sath lekar chalte hain.'
          : 'Endowed with profound empathy, intuitive sensitivity, and diplomatic grace. You bring harmony, collaboration, and emotional healing to those around you.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya sahyog, bhavnatmak samajhdari aur aapsi madhur sambandh sthapit karne me pura hota hai.'
          : 'Your purpose is achieved through cooperation, emotional intelligence, peacemaking, and supportive partnerships.',
      soulDesc:
        lang === 'hinglish'
          ? 'Aapki aatma shant vatavaran, sacha prem aur aatmik gehraai chahti hai.'
          : 'Your soul longs for serene peace, unconditional love, mutual respect, and emotional depth.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh saal sahyog, dhairya, purane sambandhon ko mazboot karne aur shant pragati ka hai.'
          : 'A year of cooperation, patience, cultivating deep relationships, and trusting behind-the-scenes progress.',
      traits: lang === 'hinglish' ? ['Sahanubhooti', 'Antargyaan', 'Shanti', 'Sahyog', 'Komal', 'Madhur'] : ['Empathetic', 'Intuitive', 'Diplomatic', 'Gentle', 'Cooperative', 'Peaceful'],
      luckyNumbers: [2, 11, 20, 29],
      luckyColors: [{ name: lang === 'hinglish' ? 'Shwet / Chandi' : 'Silver / Pearl', hex: '#E8E4DC' }, { name: lang === 'hinglish' ? 'Panna Hara' : 'Emerald Green', hex: '#10B981' }, { name: lang === 'hinglish' ? 'Kheer Shwet' : 'Cream White', hex: '#FDFBF7' }],
      insight:
        lang === 'hinglish'
          ? 'Chandra dwara shasit Life Path 2 ke roop me, aapki intuitive empathy aapki shakti hai. Apni bhavnaon ka dhyan rakhein aur aapas me shanti banaye rakhein.'
          : 'As a Life Path 2 ruled by the Moon, your intuitive empathy is your greatest superpower. Guard your emotional boundaries while continuing to build bridges of peace and understanding.',
    },
    3: {
      title: 'The Creative Visionary (गुरु - Jupiter)',
      planet: 'Jupiter (गुरु)',
      archetype: 'The Expressive Creator',
      desc:
        lang === 'hinglish'
          ? 'Aasha, rachnatmakta aur prabhavshali vaani se yukta. Aapke andar ek aisi chamak hai jo sabhi ko inspire karti hai.'
          : 'Radiating optimism, artistic brilliance, and eloquent communication. You possess a joyful spark that elevates, inspires, and uplifts human consciousness.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya naye vichaar vyakt karna, kalaatmak saundarya failana aur gyaan se dusron ka margdarshan karna hai.'
          : 'Your purpose is to communicate inspiring truths, express creative beauty, and spread joy through words, art, and philosophy.',
      soulDesc:
        lang === 'hinglish'
          ? 'Khulkar apne vicharon ko prakat karna aur rachnatmak kshamta se jeevan ko sundar banana.'
          : 'An inner longing to freely express authentic emotion, inspire minds, and celebrate creative beauty.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh saal aatm-abhivyakti, rachnatmak vistar, naye doston aur safal yatraon ka hai.'
          : 'A year of self-expression, creative expansion, social connections, joyful travel, and creative breakthroughs.',
      traits: lang === 'hinglish' ? ['Rachnatmak', 'Aashawadi', 'Vaani-Nipun', 'Prernadayak', 'Aakarshak', 'Gyaani'] : ['Creative', 'Optimistic', 'Articulate', 'Inspiring', 'Charming', 'Expansive'],
      luckyNumbers: [3, 12, 21, 30],
      luckyColors: [{ name: lang === 'hinglish' ? 'Peela / Kesar' : 'Golden Yellow', hex: '#F59E0B' }, { name: lang === 'hinglish' ? 'Baingani' : 'Royal Purple', hex: '#8B5CF6' }, { name: lang === 'hinglish' ? 'Amber Kesari' : 'Warm Amber', hex: '#D97706' }],
      insight:
        lang === 'hinglish'
          ? 'Guru (Brihaspati) dwara shasit Life Path 3 ke roop me, aapki rachnatmakta pavitra hai. Apne vicharon ko kendrit karke bade lakshya hasil karein.'
          : 'As a Life Path 3 ruled by Brihaspati (Jupiter), your gift of creative expression is sacred. Channel your enthusiasm into focused creative projects to transform raw ideas into timeless wisdom.',
    },
    4: {
      title: 'The Master Builder (राहु - Rahu)',
      planet: 'Rahu / Uranus',
      archetype: 'The Foundation Builder',
      desc:
        lang === 'hinglish'
          ? 'Anushasit, krambaddh aur sthir. Aap parishram aur tezz buddhi se lambi chalne wali mazboot vyavastha banate hain.'
          : 'Disciplined, methodical, and profoundly grounded. You construct enduring structures, systems, and legacies through patient perseverance and sharp intellect.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya sthirta sthapit karna, kathin karyon ko vyavasthit karna aur mazboot neev banana hai.'
          : 'Your destiny is to establish stability, organize complex systems, and build lasting, reliable foundations.',
      soulDesc:
        lang === 'hinglish'
          ? 'Suraksha, imaandari aur sarthak parishram se thos safalta paana.'
          : 'Your heart seeks order, security, honesty, and the satisfaction of meaningful, tangible achievement.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh saal kadi mehnat, aarthik anushasan aur bhavishya ke liye mazboot buniyaad rakhne ka hai.'
          : 'A year of dedicated effort, building security, financial discipline, and laying rock-solid foundations for future growth.',
      traits: lang === 'hinglish' ? ['Anushasit', 'Vyavasthit', 'Vishwaasneey', 'Vyavaharik', 'Nishthawan', 'Ran-neetik'] : ['Disciplined', 'Methodical', 'Reliable', 'Practical', 'Loyal', 'Strategic'],
      luckyNumbers: [4, 13, 22, 31],
      luckyColors: [{ name: lang === 'hinglish' ? 'Electric Neela' : 'Electric Blue', hex: '#3B82F6' }, { name: lang === 'hinglish' ? 'Bhura' : 'Earthy Brown', hex: '#78350F' }, { name: lang === 'hinglish' ? 'Steel Grey' : 'Steel Gray', hex: '#64748B' }],
      insight:
        lang === 'hinglish'
          ? 'Life Path 4 ke roop me aapka niyamit parishram samrajya khada karta hai. Sthirta ke sath lachilapan bhi rakhein.'
          : 'As a Life Path 4, your steadfast discipline builds empires from scratch. Embrace flexibility alongside your structure, knowing that true security flows from adaptable strength.',
    },
    5: {
      title: 'The Dynamic Free Spirit (बुध - Mercury)',
      planet: 'Mercury (बुध)',
      archetype: 'The Explorer',
      desc:
        lang === 'hinglish'
          ? 'Aap azaad khayal, tezz dimaag aur naye vicharon se bharpoor vyakti hain. Vividhta aur nayi cheezein seekhna aapki taakat hai.'
          : 'Versatile, sharp-witted, and freedom-loving. You thrive on variety, intellectual agility, travel, and progressive evolution across multiple disciplines.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka jeevan lakshya anukoolan, nayi dishaon ki khoj aur sakaratmak parivartan ka naitrutva karna hai.'
          : 'Your life purpose unfolds through adaptable communication, exploring uncharted territories, and championing positive change.',
      soulDesc:
        lang === 'hinglish'
          ? 'Azaadi, naya seekhna, yatraayein aur boudhik roop se hamesha aage badhte rehna.'
          : 'An inner thirst for freedom, dynamic learning, adventure, and sensory/intellectual discovery.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh parivartan, nayi azaadi, yatra ke avasaron aur puraani bandishon se mukti ka saal hai.'
          : 'A transformative year filled with change, unexpected freedom, travel opportunities, dynamic shifts, and release of old restrictions.',
      traits: lang === 'hinglish' ? ['Anukoolan', 'Romanchak', 'Jigyasu', 'Tezz Dimaag', 'Aakarshak', 'Dynamic'] : ['Versatile', 'Adventurous', 'Curious', 'Quick-witted', 'Charismatic', 'Dynamic'],
      luckyNumbers: [5, 14, 23, 32],
      luckyColors: [{ name: lang === 'hinglish' ? 'Panna Hara' : 'Emerald Green', hex: '#10B981' }, { name: lang === 'hinglish' ? 'Teal' : 'Teal', hex: '#2AABA8' }, { name: lang === 'hinglish' ? 'Chandi / Platinum' : 'Silver / Platinum', hex: '#94A3B8' }],
      insight:
        lang === 'hinglish'
          ? 'Mercury (Budh) dwara shasit Life Path 5 ke roop me, aapki anukoolan kshamta aapko har paristhiti me safal banati hai. Apni urja ko sahi lakshya par kendrit karein aur naye vicharon se aage badhein.'
          : 'As a Life Path 5 ruled by Mercury, your adaptability lets you thrive anywhere. Anchor your versatile curiosity with clear goals to turn boundless energy into lasting success.',
    },
    6: {
      title: 'The Nurturer & Harmonizer (शुक्र - Venus)',
      planet: 'Venus (शुक्र)',
      archetype: 'The Guardian of Beauty',
      desc:
        lang === 'hinglish'
          ? 'Dayalu, zimmedar aur shanti priye. Aap parivar aur samaj ke liye prem, saundarya aur suraksha ka vatavaran banate hain.'
          : 'Compassionate, responsible, and devoted to harmony. You create sanctuaries of love, beauty, and emotional security for family and community.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya rishton ko samriddh karna, saundarya ka vikas karna aur snehpurna salahkar banna hai.'
          : 'Your purpose is to nurture relationships, cultivate aesthetic elegance, and provide compassionate counsel and protection.',
      soulDesc:
        lang === 'hinglish'
          ? 'Parivarik shanti, niswarth prem aur sabhi ke jeevan me sahara banna.'
          : 'Your soul longs for domestic harmony, unconditional love, beauty in all forms, and being a pillar of warmth.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh saal parivar, ghar ke sudhar, rishton me majbooti aur samaj seva par kendrit hai.'
          : 'A year centering on family, home improvements, deepened relationship commitments, service to community, and personal healing.',
      traits: lang === 'hinglish' ? ['Snehsheel', 'Shantipriye', 'Zimmedaar', 'Kalaatmak', 'Dayalu', 'Rakshak'] : ['Nurturing', 'Harmonious', 'Responsible', 'Artistic', 'Compassionate', 'Protective'],
      luckyNumbers: [6, 15, 24, 33],
      luckyColors: [{ name: lang === 'hinglish' ? 'Gulaabi' : 'Rose Pink', hex: '#EC4899' }, { name: lang === 'hinglish' ? 'Shwet Heera' : 'Diamond White', hex: '#F8FAFC' }, { name: lang === 'hinglish' ? 'Aakaashi Neela' : 'Sky Blue', hex: '#38BDF8' }],
      insight:
        lang === 'hinglish'
          ? 'Shukra dwara shasit Life Path 6 ke roop me, aapka sneh aur seva sabhi ko aashirvaad dete hain. Apne swasthya ka bhi pura dhyan rakhein.'
          : 'As a Life Path 6 ruled by Shukra (Venus), your unconditional warmth heals those around you. Remember to extend the same loving care and boundaries to yourself that you give to others.',
    },
    7: {
      title: 'The Seeker of Truth (केतु - Ketu)',
      planet: 'Ketu / Neptune',
      archetype: 'The Mystic Scholar',
      desc:
        lang === 'hinglish'
          ? 'Vishleshnatmak, chintansheel aur adhyatmik. Aap jeevan ke gahan satya, shodh aur aatm-chintan se mukhya gyaan khojte hain.'
          : 'Analytical, contemplative, and spiritually attuned. You delve into life’s deepest mysteries, seeking underlying scientific and metaphysical truths through research and reflection.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya gehra gyaan hasil karna, specialized vidya me maharat paana aur satya ko prakashit karna hai.'
          : 'Your purpose is to acquire profound wisdom, master specialized knowledge, and illuminate deeper truths for humanity.',
      soulDesc:
        lang === 'hinglish'
          ? 'Ekant dhyan, pavitra gyaan, aatm-sakshatkar aur boudhik uchayi paana.'
          : 'An inner yearning for meditative solitude, sacred knowledge, spiritual enlightenment, and intellectual mastery.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh gahan adhyayan, aatmik chintan, dhyan aur aatm-khoj ke liye atyant shubh saal hai.'
          : 'A sacred introspective year ideal for deep study, spiritual retreat, mental refinement, writing, and profound self-realization.',
      traits: lang === 'hinglish' ? ['Vishleshak', 'Antardrishti', 'Aatmanirbhar', 'Adhyatmik', 'Gyaani', 'Darshnik'] : ['Analytical', 'Intuitive', 'Independent', 'Spiritual', 'Scholarly', 'Philosophical'],
      luckyNumbers: [7, 16, 25, 34],
      luckyColors: [{ name: lang === 'hinglish' ? 'Rahasymayi Baingani' : 'Mystic Purple', hex: '#7C3AED' }, { name: lang === 'hinglish' ? 'Chandi' : 'Sterling Silver', hex: '#C0C8D0' }, { name: lang === 'hinglish' ? 'Seafoam Hara' : 'Seafoam Green', hex: '#3FA86A' }],
      insight:
        lang === 'hinglish'
          ? 'Life Path 7 ke roop me aap gyaan aur satya ke khoji hain. Aapka analytical dimag aur intuition aapko shreshth nirdeshak banate hain.'
          : 'As a Life Path 7, you are a seeker of truth and wisdom. Your analytical mind pairs with a deep intuitive gift, drawing you toward philosophy, research, and spiritual exploration. You value solitude as a space to recharge and reflect, yet your insights often guide others more than you realize.',
    },
    8: {
      title: 'The Powerhouse & Sovereign (शनि - Saturn)',
      planet: 'Saturn (शनि)',
      archetype: 'The Manifestor of Abundance',
      desc:
        lang === 'hinglish'
          ? 'Prabhavshali, ran-neetik aur aarthik v vyavsayik kshetron me bade lakshya hasil karne me nipun.'
          : 'Authoritative, strategic, and profoundly capable of handling large-scale material, financial, and organizational mastery with integrity and karmic balance.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya bhautik v vyavsayik unchayi paana aur dharmik roop se samriddhi ka nirmaan karna hai.'
          : 'Your purpose is to master the material realm, achieve high executive authority, and steward abundance with dharmic integrity.',
      soulDesc:
        lang === 'hinglish'
          ? 'Uchha uplabdhi, aarthik swatantrata, samman aur shaktishali prabhav sthapit karna.'
          : 'Your heart seeks high achievement, financial sovereignty, respect, and the power to create lasting benevolent influence.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh aarthik vistar, career promotion aur pichhle parishram ke shreshth fal milne ka saal hai.'
          : 'A powerful karmic year of material expansion, career promotion, major financial developments, and reaping the rewards of past discipline.',
      traits: lang === 'hinglish' ? ['Prabhavi', 'Ran-neetik', 'Sahan-shakti', 'Samriddh', 'Karya-kushal', 'Anushasit'] : ['Authoritative', 'Strategic', 'Resilient', 'Prosperous', 'Executive', 'Disciplined'],
      luckyNumbers: [8, 17, 26, 35],
      luckyColors: [{ name: lang === 'hinglish' ? 'Midnight Neela' : 'Midnight Navy', hex: '#1E3A8A' }, { name: lang === 'hinglish' ? 'Sunehra Peela' : 'Royal Gold', hex: '#CA8A04' }, { name: lang === 'hinglish' ? 'Charcoal Kaala' : 'Charcoal Black', hex: '#334155' }],
      insight:
        lang === 'hinglish'
          ? 'Shani dwara shasit Life Path 8 ke roop me, bade lakshyon ko pura karne ki kshamta aapme hai. Dharma aur imaandari se aage badhein.'
          : 'As a Life Path 8 ruled by Saturn, your ability to manifest large-scale vision is immense. Align your ambition with ethical purpose, knowing that dharmic power creates eternal legacy.',
    },
    9: {
      title: 'The Compassionate Humanitarian (मंगल - Mars)',
      planet: 'Mars (मंगल)',
      archetype: 'The Universal Soul',
      desc:
        lang === 'hinglish'
          ? 'Niswarth, durdarshi aur samvedansheel. Aapme manav kalyan, kalaatmak urja aur aatmik sahas ka shreshth sanyog hai.'
          : 'Selfless, visionary, and universally conscious. You possess deep global empathy, artistic passion, and the spiritual warrior courage to fight for the upliftment of all beings.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Aapka lakshya manavta ki seva, prernadayak margdarshan aur karuna se samaj ko uncha uthana hai.'
          : 'Your purpose is universal service, creative inspiration, releasing the outmoded, and elevating humanity through compassion.',
      soulDesc:
        lang === 'hinglish'
          ? 'Duniya me kalyan lana, nyay ka samarthan karna aur vishva prem failana.'
          : 'An inner longing to heal the world, champion justice, express universal love, and attain spiritual completion.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh puraane chakra ko samapt karne, beete ko maaf karne aur naye daur ke nirmaan ka saal hai.'
          : 'A major completion year of letting go of outgrown ties, finishing long-standing cycles, forgiving the past, and preparing for total rebirth.',
      traits: lang === 'hinglish' ? ['Manav-Premi', 'Dayalu', 'Durdarshi', 'Udaar', 'Kalaatmak', 'Niswarth'] : ['Humanitarian', 'Compassionate', 'Visionary', 'Generous', 'Artistic', 'Selfless'],
      luckyNumbers: [9, 18, 27, 36],
      luckyColors: [{ name: lang === 'hinglish' ? 'Laal (Crimson)' : 'Crimson Red', hex: '#DC2626' }, { name: lang === 'hinglish' ? 'Tamra Kesari' : 'Coral Amber', hex: '#C8822A' }, { name: lang === 'hinglish' ? 'Pavitra Shwet' : 'Pure White', hex: '#FFFFFF' }],
      insight:
        lang === 'hinglish'
          ? 'Mangal dwara shasit Life Path 9 ke roop me, aapme sabhi ankon ka anubhav aur gyaan hai. Prem aur karuna se margdarshan karein.'
          : 'As a Life Path 9 ruled by Mars, you possess the wisdom of all prior numbers. Release attachments gracefully and let your universal love lead the way toward collective enlightenment.',
    },
    11: {
      title: 'The Master Intuitive Illuminator (Master 11)',
      planet: 'Moon / Neptune',
      archetype: 'The Spiritual Catalyst',
      desc:
        lang === 'hinglish'
          ? 'Uchha intuitive gyaan, aatmik prerna aur adhyatmik kshetron ko bhautik jeevan se jodne ki kshamta.'
          : 'Operating with heightened visionary intuition, electric inspiration, and bridge-building between spiritual planes and physical reality.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Dusron ko inspire karna aur adhyatmik gyaan se margdarshan karna aapka mukhy lakshya hai.'
          : 'To inspire, channel spiritual insights, and guide humanity as an intuitive beacon.',
      soulDesc:
        lang === 'hinglish'
          ? 'Aatmik chetna ko jagrut karna aur sachhai par dridh rehna.'
          : 'An intense inner urge to illuminate consciousness and embody spiritual integrity.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Yeh aatmik anubhuti aur rachnatmak kshamta me badhotari ka parivartankari saal hai.'
          : 'A transformative spiritual catalyst year with intense epiphanies and high creative flow.',
      traits: lang === 'hinglish' ? ['Durdarshi', 'Intuitive', 'Prernadayak', 'Aadarshwadi', 'Adhyatmik', 'Aakarshak'] : ['Visionary', 'Highly Intuitive', 'Inspiring', 'Idealistic', 'Spiritual', 'Charismatic'],
      luckyNumbers: [11, 2, 7, 29],
      luckyColors: [{ name: 'Platinum Silver', hex: '#E2E8F0' }, { name: 'Electric Violet', hex: '#8B5CF6' }, { name: 'Sun Gold', hex: '#EAB308' }],
      insight:
        lang === 'hinglish'
          ? 'Master Number 11 ke roop me aapka intuition ek divya antena hai. Apne gyaan ko sabhi ke sath sajha karein.'
          : 'As a Master Number 11, your sensitivity is an antenna for divine truth. Ground your high-voltage intuition in physical routines and share your light generously.',
    },
    22: {
      title: 'The Master Builder of Destiny (Master 22)',
      planet: 'Rahu / Sun',
      archetype: 'The Cosmic Architect',
      desc:
        lang === 'hinglish'
          ? 'Bade aayojano, sansthaon aur manav kalyan ke vishal networks ko thos roop dene ki adbhut kshamta.'
          : 'Possessing the extraordinary ability to manifest monumental global visions, infrastructure, and world-changing humanitarian systems.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Pidhiyon tak chalne wali mazboot sansthaon aur sarthak yojanaon ka nirmaan karna.'
          : 'To construct global institutions, revolutionary frameworks, and lasting legacies for generations.',
      soulDesc:
        lang === 'hinglish'
          ? 'Sapno ko thos bhautik safalta me badalna manavta ke labh ke liye.'
          : 'An inner drive to manifest dreams into large-scale reality for the benefit of humanity.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Bade nirmaan, vishal yojanaon aur mahatvakankshi lakshyon ko hasil karne ka saal.'
          : 'A momentous year for major construction, global enterprise, and realizing monumental goals.',
      traits: lang === 'hinglish' ? ['Master Builder', 'Vyavaharik Durdarshi', 'Shaktishali', 'Global Soch', 'Anushasit', 'Vishwa-Premi'] : ['Master Builder', 'Practical Visionary', 'Powerful', 'Global Thinker', 'Disciplined', 'Universal'],
      luckyNumbers: [22, 4, 8, 31],
      luckyColors: [{ name: 'Imperial Gold', hex: '#CA8A04' }, { name: 'Cobalt Blue', hex: '#1D4ED8' }, { name: 'Pure Coral', hex: '#EA580C' }],
      insight:
        lang === 'hinglish'
          ? 'Master Number 22 ke roop me aapke paas badi safaltaon ka blueprint hai. Kadam-dar-kadam karke nirmaan karein.'
          : 'As a Master Number 22, you hold the blueprints for grand achievements. Ground your towering vision with step-by-step master execution.',
    },
    33: {
      title: 'The Master Spiritual Teacher (Master 33)',
      planet: 'Jupiter / Venus',
      archetype: 'The Avatar of Compassion',
      desc:
        lang === 'hinglish'
          ? 'Aatmik margdarshan, niswarth prem aur aatmik upchaar ki sarvochha urja.'
          : 'The highest vibration of spiritual mentorship, boundless unconditional love, universal healing, and devotional upliftment.',
      destinyDesc:
        lang === 'hinglish'
          ? 'Prem aur karuna se sabhi ko upchaar aur margdarshan dena.'
          : 'To heal, uplift, and selflessly guide collective spiritual awakening through profound love.',
      soulDesc:
        lang === 'hinglish'
          ? 'Satya ke prati poora samarpan aur aatmik roop se jagruk rehna.'
          : 'Universal compassion, devotional surrender to truth, and serving as a spiritual beacon.',
      personalYearDesc:
        lang === 'hinglish'
          ? 'Aatmik shikshan, karunapoorna seva aur bhavnatmak mukti ka pavitra saal.'
          : 'A sacred year of spiritual mentorship, compassionate service, and emotional transcendence.',
      traits: lang === 'hinglish' ? ['Master Guru', 'Niswarth Prem', 'Upcharak', 'Samarpit', 'Divya', 'Bhakti-yukt'] : ['Master Teacher', 'Unconditional Love', 'Healer', 'Selfless', 'Illuminated', 'Devotional'],
      luckyNumbers: [33, 6, 9, 24],
      luckyColors: [{ name: 'Pure Golden Light', hex: '#FBBF24' }, { name: 'Celestial White', hex: '#F8FAFC' }, { name: 'Emerald', hex: '#059669' }],
      insight:
        lang === 'hinglish'
          ? 'Master Number 33 ke roop me aapki upasthiti sabhi ke liye kalyankari hai. Karuna ke sath santulan banaye rakhein.'
          : 'As a Master Number 33, your presence is a healing balm. Lead with devotional compassion while maintaining energetic equilibrium.',
    },
  };

  const profile = numberProfiles[lifePathNumber] || numberProfiles[reduceToSingle(lifePathNumber, false)] || numberProfiles[7];
  const destinyProfile = numberProfiles[destinyNumber] || numberProfiles[reduceToSingle(destinyNumber, false)] || numberProfiles[3];
  const soulProfile = numberProfiles[soulUrgeNumber] || numberProfiles[reduceToSingle(soulUrgeNumber, false)] || numberProfiles[9];
  const personalYearProfile = numberProfiles[personalYearNumber] || numberProfiles[5];

  let insight = '';
  if (lang === 'hinglish') {
    insight = `${profile.insight} Aapka Namank (Destiny Number ${destinyNumber}) aapke career me ${destinyProfile.destinyDesc} Is Varshik Ank (${personalYearNumber}) me ${personalYearProfile.personalYearDesc}`;
  } else {
    insight = `${profile.insight} Your Destiny Number (${destinyNumber}) guides your professional calling toward ${destinyProfile.destinyDesc.toLowerCase()} In this Personal Year (${personalYearNumber}), ${personalYearProfile.personalYearDesc.toLowerCase()}`;
  }

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
    insight,
    destinyDesc: destinyProfile.destinyDesc,
    soulUrgeDesc: soulProfile.soulDesc,
    personalYearDesc: personalYearProfile.personalYearDesc,
    howDestiny: lang === 'hinglish' ? 'Aapke naam ke sabhi aksharon se calculate kiya gaya' : 'Calculated from all letters in your name',
    howSoul: lang === 'hinglish' ? 'Aapke naam ke swaron (vowels) se calculate kiya gaya' : 'Calculated from vowels in your name',
    howPersonalYear: lang === 'hinglish' ? 'Janam tithi + Mahina + Current Year se calculate kiya gaya' : 'Calculated from Birth day + Month + Current year',
  };
}

// ── Legacy helper functions ──────────────────────
export function calculateLifePathNumber(dateStr) {
  const num = getCompleteNumerology('Seeker', dateStr).lifePathNumber;
  return num;
}

export function calculateNumerology(name, dob) {
  const complete = getCompleteNumerology(name, dob);
  return {
    lifePathNumber: complete.lifePathNumber,
    destinyNumber: complete.destinyNumber,
    soulUrgeNumber: complete.soulUrgeNumber,
    traits: complete.traits,
    luckyNumbers: complete.luckyNumbers,
    luckyColors: complete.luckyColors,
  };
}

// ── Supabase Kundli Operations ───────────────────
export async function saveKundli(kundliData) {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, saving to localStorage only.');
    return { id: 'local_' + Date.now(), ...kundliData };
  }

  try {
    const isLocalUser = !isUUID(kundliData.user_id);
    const userId = isLocalUser ? null : kundliData.user_id;

    const payload = {
      user_id: userId,
      name: kundliData.name,
      date_of_birth: kundliData.date_of_birth,
      time_of_birth: kundliData.time_of_birth,
      birth_place: kundliData.birth_place,
      latitude: kundliData.latitude,
      longitude: kundliData.longitude,
      lagna: kundliData.lagna,
      rashi: kundliData.rashi,
      nakshatra: kundliData.nakshatra,
      nakshatra_pada: kundliData.nakshatra_pada,
      nakshatra_lord: kundliData.nakshatra_lord,
      gana: kundliData.gana,
      life_path_number: kundliData.life_path_number,
      destiny_number: kundliData.destiny_number,
      soul_urge_number: kundliData.soul_urge_number,
      planets_data: kundliData.planets,
      ayanamsha: kundliData.ayanamsha,
      houses: kundliData.houses,
      dashas: kundliData.dashas,
      current_dasha: kundliData.current_dasha,
      is_manglik: kundliData.is_manglik,
      ai_report: kundliData.ai_report,
      pdf_url: kundliData.pdf_url,
    };

    const { data, error } = await supabase.from('kundlis').insert([payload]).select().single();

    if (error) {
      console.error('Supabase save error:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('saveKundli failed:', err);
    throw err;
  }
}

export async function getKundli(id) {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase.from('kundlis').select('*').eq('id', id).single();

    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('getKundli failed:', err);
    return null;
  }
}

export async function getUserKundlis(userId) {
  if (!isSupabaseConfigured() || !userId) return [];

  try {
    const { data, error } = await supabase
      .from('kundlis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch list error:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('getUserKundlis failed:', err);
    return [];
  }
}
