import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Heart, Shield, Award, Moon, Sun, Compass } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function CompleteAiAnalysis({ report, data }) {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('Personality');

  const lagna = data?.lagna || 'Scorpio (Vrishchik)';
  const rashi = data?.rashi || 'Gemini (Mithun)';
  const nakshatra = data?.nakshatra || 'Ardra';
  const name = data?.name || 'Seeker';

  // Dynamic fallback report builder in English
  const defaultReportEn = {
    personality: {
      overview: `With ${lagna} as your Ascendant and ${rashi} as your Chandra Rashi in ${nakshatra} nakshatra, your chart combines intense inner willpower with exceptional intellectual adaptability. You possess natural strategic discernment, deep emotional perception, and magnetic presence. People recognize your competence and intuitive insight.`,
      strengths: [
        `Strategic Mind — ${lagna} Lagna bestows depth, focus, and piercing insight.`,
        `Curious Intellect — ${rashi} Chandra Rashi provides quick learning and adaptability.`,
        `Resilient Nature — Deep emotional strength to overcome transformational obstacles.`,
        `Astute Discernment — Ability to understand hidden motives and underlying truth.`,
        `Inspiring Expression — ${nakshatra} energy drives curiosity and inventive breakthroughs.`,
        `Loyal Protection — Fiercely devoted to loved ones and core principles.`,
      ],
      challenges: [
        { title: 'Emotional Guardedness', desc: 'Tendency to keep inner emotions tightly shielded. Cultivate trusted openness.' },
        { title: 'Restless Overthinking', desc: 'Airy Moon in Gemini can cause mental dispersion. Practice grounding breathwork.' },
        { title: 'Pacing Intensity', desc: 'Scorpio energy operates with high intensity; balance ambition with regular rest.' },
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
        { planet: 'Mars ♂ (Lagna Lord)', remedy: 'Recite Hanuman Chalisa or practice physical discipline', day: 'Tuesday' },
        { planet: 'Jupiter ♃', remedy: 'Respect teachers/mentors and donate yellow items/food', day: 'Thursday' },
      ],
    },
  };

  // Dynamic fallback report builder in Hinglish
  const defaultReportHinglish = {
    personality: {
      overview: `${lagna} Lagna aur ${rashi} Chandra Rashi (${nakshatra} nakshatra) ke sath, aapki kundli me dridh aatmavishwas aur tezz boudhik anukoolan ka shreshtha sanyog hai. Aapme prakritik roop se ran-neetik samajh, gehri bhavnatmak drishti aur aakarshak vyaktitva hai. Log aapki kshamta aur antargyaan ka samman karte hain.`,
      strengths: [
        `Ran-neetik Soch — ${lagna} Lagna se gehra dhyan, focus aur spasht drishti milti hai.`,
        `Tezz Dimag — ${rashi} Chandra Rashi se jaldi seekhne aur naye vicharon ki kshamta milti hai.`,
        `Ladne Ka Jazba — Mushkilon aur chunautiyon ko paar karne ki ajeeb aatmik shakti.`,
        `Sahi Parakh — Asliyat aur chhupe huye uddeshya ko pehchanne ki kshamta.`,
        `Prernadayak Vaani — ${nakshatra} nakshatra ki urja se nayi khoj aur aakarshak abhivyakti.`,
        `Nishtha & Suraksha — Apne parivar aur aadarshon ke prati poori tarah samarpit.`,
      ],
      challenges: [
        { title: 'Bhavnaon Ko Chhupana', desc: 'Apni gehri feelings ko jaldi share na karna. Bharosemand logon se khulkar baat karein.' },
        { title: 'Zyaada Sochna (Overthinking)', desc: 'Chandra ke Mithun me hone se dimag zyaada daudta hai. Dhyan aur pranayam karein.' },
        { title: 'Tez Urja Ka Santulan', desc: 'Scorpio urja bahut intense hoti hai; aage badhne ke sath aaram ka bhi dhyan rakhein.' },
      ],
      lifePurpose: `“Aapki aatma chunautiyon ko gyaan me badalne, chhupe satya ko prakashit karne aur aatmik sahas ke sath dusron ko prerna dene aayi hai.”`,
    },
    career: {
      overview: `Aapki kundli me leadership, ran-neetik vishleshan, research, technology, communication aur advisory kshetron ke liye shreshth kshamta hai. Aap problem-solving aur specialized karyon me safal hote hain.`,
      bestFields: [
        'Leadership & Management (प्रबंधन)',
        'IT, Data & Engineering (तकनीक)',
        'Research & Analytics (शोध एवं विश्लेषण)',
        'Consulting & Mentorship (सलाहकार)',
        'Media & Communication (मीडिया एवं लेखन)',
        'Finance & Holistic Health (वित्त एवं स्वास्थ्य)',
      ],
      currentPhase: `Vartaman grah dasha boudhik vistar, career restructure aur sammanit sthiti ko poora samarthan de rahi hai.`,
      timeline: [
        { period: '2024–2025', prediction: 'Vyavsayik sthirta, skill enhancement aur mahatvapurna buniyaad ka nirmaan.' },
        { period: '2025–2026', prediction: 'Zimmedariyon me vriddhi, labhdayak avasar aur sahyogiyon se prashansa.' },
        { period: '2026–2027', prediction: 'Bade milestones, swantantrata aur lambi avadhi ki sthir sthiti.' },
      ],
    },
    love: {
      overview: `Rishton me aap mansik talmel aur sachi bhavnatmak nishtha chahte hain. Aapsi aadar, boudhik baatcheet aur wafadari aapke sambandhon ki neev hain.`,
      bestMatches: [
        { sign: 'Cancer (Kark)', reason: 'Gehri bhavnatmak samajh, sneh aur parivarik shanti.' },
        { sign: 'Pisces (Meen)', reason: 'Aatmik samanjasya, intuitive depth aur aapsi sahyog.' },
        { sign: 'Taurus (Vrishabh)', reason: 'Sthirta, dharatal par judav aur anukool vipreet aakarshan.' },
      ],
      marriageTiming: 'Guru (Brihaspati) ka gochar aur anukool dasha vivah aur sthir sambandhon ke liye shubh yog banate hain.',
      relationshipLesson: 'Swatantrata ke sath thoda emotional open-pan layein, partner ke sath mann ki baat baantein.',
    },
    health: {
      constitution: `Pitta (tej aur pachan urja) aur Vata (mansik gati) ka sanyog. Niyamit dhyan se uchh vitality bani rehti hai.`,
      watchAreas: [
        { area: 'Tantrika Tantra & Dimag', advice: 'Mansik thakan se bachein; dainik dhyan aur screen-time kam karein.' },
        { area: 'Pachan & Metabolism', advice: 'Garam, taaza sattvic bhojan aur samay par khana lein.' },
        { area: 'Stamina & Shareer', advice: 'Paryapt paani piyein aur subah halka yoga / stretch karein.' },
      ],
      recommendations: {
        diet: 'Paushtik anaaj, badam, taaze mausam ke fal aur gunguna paani.',
        exercise: 'Pratahkal Surya Namaskar, hariyali me tehalna aur restorative yoga.',
        spiritual: 'Dainik Anulom-Vilom pranayam aur sandhya samay shant baithna.',
      },
    },
    spiritual: {
      soulPurpose: 'Mansik chanchalta se dhyan aur aatm-shanti ki or badhna, apne boudhik gyaan ko dharma ki seva me lagana.',
      pastLife: 'Pichhle janmon me gyaan, adhyayan aur khoj ki sadhana ki, ab uchhatar aatmik mukti ki or pragati hai.',
      practices: [
        'Pranayam (Anulom-Vilom) roz subah 10 minute',
        'Gayatri Mantra ya Mahamrityunjaya Mantra jaap',
        'Ravivar ko ugte Surya ko taambe ke lote se jal arpit karein',
        'Pakshiyon ko daana aur niyamit daan-punya karein',
      ],
      remedies: [
        { planet: 'Sun ☉', remedy: 'Subah Surya ko arghya dein aur gratitude vyakt karein', day: 'Sunday (Ravivar)' },
        { planet: 'Mars ♂ (Lagna Lord)', remedy: 'Hanuman Chalisa ka path karein ya vyayam karein', day: 'Tuesday (Mangalvar)' },
        { planet: 'Jupiter ♃', remedy: 'Guruon ka samman karein aur peeli vastuon ka daan karein', day: 'Thursday (Guruvar)' },
      ],
    },
  };

  const defaultReport = lang === 'hinglish' ? defaultReportHinglish : defaultReportEn;

  let parsedReport = report;
  if (typeof report === 'string') {
    try {
      parsedReport = JSON.parse(report);
    } catch {
      parsedReport = null;
    }
  }

  const rep = {
    personality: { ...defaultReport.personality, ...(parsedReport?.personality || {}) },
    career: { ...defaultReport.career, ...(parsedReport?.career || {}) },
    love: { ...defaultReport.love, ...(parsedReport?.love || {}) },
    health: { ...defaultReport.health, ...(parsedReport?.health || {}) },
    spiritual: { ...defaultReport.spiritual, ...(parsedReport?.spiritual || {}) },
  };

  const tabs = [
    { id: 'Personality', label: t.tab_personality[lang] },
    { id: 'Career', label: t.tab_career[lang] },
    { id: 'Love & Relationships', label: t.tab_love[lang] },
    { id: 'Health', label: t.tab_health[lang] },
    { id: 'Spiritual Path', label: t.tab_spiritual[lang] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{ padding: '32px 24px', borderLeft: '4px solid var(--col-copper)' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <Sparkles size={22} style={{ color: 'var(--col-copper)' }} />
          <div>
            <h3 className="font-display text-2xl" style={{ color: 'var(--col-moonstone)' }}>
              {t.ai_insights_title[lang]}
            </h3>
            <span className="text-xs" style={{ color: 'var(--col-copper)' }}>
              {lang === 'hinglish' ? `वैदिक विश्लेषण — ${lagna} • ${rashi}` : `Vedic Analysis — ${lagna} • ${rashi}`}
            </span>
          </div>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-auto"
          style={{
            background: 'rgba(200, 130, 42, 0.12)',
            color: 'var(--col-copper)',
            border: '1px solid rgba(200, 130, 42, 0.35)',
          }}
        >
          {t.ai_insights_subtitle[lang]}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-8 no-scrollbar border-b border-[rgba(255,255,255,0.06)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={
                isActive
                  ? {
                      background: 'var(--col-copper)',
                      color: 'var(--col-midnight)',
                      boxShadow: '0 0 16px rgba(200, 130, 42, 0.35)',
                    }
                  : {
                      background: 'rgba(255, 255, 255, 0.03)',
                      color: 'var(--col-moonstone-dim)',
                      border: '1px solid var(--col-glass-border)',
                    }
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* ================= TAB 1: PERSONALITY ================= */}
          {activeTab === 'Personality' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-2" style={{ color: 'var(--col-moonstone)' }}>
                  {lang === 'hinglish' ? `${name} Ka Vyaktitva Profile` : `Personalized Personality Profile for ${name}`}
                </h4>
                <div className="text-xs uppercase font-semibold mt-4 mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Mukhya Pehchan & Vyaktitva' : 'Core Identity Synthesis'}
                </div>
                <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.personality?.overview}
                </p>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-teal)', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Shubh Taakat (Strengths) ✦' : 'Auspicious Strengths ✦'}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Array.isArray(rep.personality?.strengths) ? rep.personality.strengths : defaultReport.personality.strengths).map((s) => (
                    <div
                      key={s}
                      className="p-3 rounded-xl flex items-start gap-2.5"
                      style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}
                    >
                      <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--col-teal)' }} />
                      <span className="text-xs" style={{ color: 'var(--col-moonstone)', lineHeight: 1.5 }}>
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: '#F59E0B', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Dhyan Dene Yogya Kshetra' : 'Areas to Cultivate & Balance'}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Array.isArray(rep.personality?.challenges) ? rep.personality.challenges : defaultReport.personality.challenges).map((item, idx) => {
                    const title = typeof item === 'string' ? item : item.title || `Area ${idx + 1}`;
                    const desc = typeof item === 'string' ? '' : item.desc || '';
                    return (
                      <div
                        key={title}
                        className="p-3.5 rounded-xl"
                        style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}
                      >
                        <div className="text-xs font-semibold mb-1" style={{ color: '#F59E0B' }}>
                          {title}
                        </div>
                        {desc && (
                          <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                            {desc}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {rep.personality?.lifePurpose && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(200, 130, 42, 0.08)', border: '1px solid rgba(200, 130, 42, 0.35)' }}>
                  <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-copper)' }}>
                    {lang === 'hinglish' ? 'Jeevan Ka Mukhya Lakshya (Life Purpose)' : 'Core Life Purpose'}
                  </div>
                  <p className="text-xs italic" style={{ color: 'var(--col-moonstone)', lineHeight: 1.6 }}>
                    {rep.personality.lifePurpose}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: CAREER ================= */}
          {activeTab === 'Career' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-4" style={{ color: 'var(--col-moonstone)' }}>
                  {lang === 'hinglish' ? 'Career & Karya Kshetra' : 'Career & Vocational Destiny'}
                </h4>
                <p className="text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.career?.overview}
                </p>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Sarvashreshtha Karya Kshetra (Best Fields)' : 'Best Suited Fields & Callings'}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Array.isArray(rep.career?.bestFields) ? rep.career.bestFields : defaultReport.career.bestFields).map((f) => (
                    <div
                      key={f}
                      className="p-3 rounded-xl flex items-center gap-2.5"
                      style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}
                    >
                      <Award size={16} style={{ color: 'var(--col-teal)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--col-moonstone)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {rep.career?.currentPhase && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(200, 130, 42, 0.08)', border: '1px solid rgba(200, 130, 42, 0.35)' }}>
                  <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-copper)' }}>
                    {lang === 'hinglish' ? 'Vartaman Dasha & Career Prabhav' : 'Current Planetary Period Insight'}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                    {rep.career.currentPhase}
                  </p>
                </div>
              )}

              {rep.career?.timeline && Array.isArray(rep.career.timeline) && (
                <div>
                  <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                    {lang === 'hinglish' ? 'Aane Wale Varshon Ki Bhavishyavani' : 'Career Horizon Predictions'}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {rep.career.timeline.map((item) => (
                      <div
                        key={item.period}
                        className="p-3.5 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--col-glass-border)' }}
                      >
                        <div className="text-xs font-mono-num font-bold mb-1" style={{ color: 'var(--col-copper)' }}>
                          {item.period}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                          {item.prediction}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: LOVE ================= */}
          {activeTab === 'Love & Relationships' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-4" style={{ color: 'var(--col-moonstone)' }}>
                  {lang === 'hinglish' ? 'Prem & Vaivahik Sambandh' : 'Relationship & Marriage Dynamics'}
                </h4>
                <p className="text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.love?.overview}
                </p>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Shubh Rashi Anukoolta (Best Matches)' : 'Auspicious Compatibility Alignment'}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Array.isArray(rep.love?.bestMatches) ? rep.love.bestMatches : defaultReport.love.bestMatches).map((m) => (
                    <div
                      key={m.sign}
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.25)' }}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold mb-1" style={{ color: '#F87171' }}>
                        <Heart size={14} />
                        {m.sign}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                        {m.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {rep.love?.marriageTiming && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(200, 130, 42, 0.08)', border: '1px solid rgba(200, 130, 42, 0.35)' }}>
                  <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-copper)' }}>
                    {lang === 'hinglish' ? 'Vivah Ka Shubh Samay' : 'Marriage & Union Timing'}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone)', lineHeight: 1.6 }}>
                    {rep.love.marriageTiming}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: HEALTH ================= */}
          {activeTab === 'Health' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-4" style={{ color: 'var(--col-moonstone)' }}>
                  {lang === 'hinglish' ? 'Swasthya & Ayurvedic Urja' : 'Ayurvedic Health & Vitality Profile'}
                </h4>
                <p className="text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.health?.constitution}
                </p>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: '#F59E0B', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Dhyan Dene Yogya Kshetra' : 'Areas to Nurture'}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Array.isArray(rep.health?.watchAreas) ? rep.health.watchAreas : defaultReport.health.watchAreas).map((w) => (
                    <div
                      key={w.area}
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: '#F59E0B' }}>
                        {w.area}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                        {w.advice}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {rep.health?.recommendations && (
                <div>
                  <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-teal)', letterSpacing: '0.1em' }}>
                    {lang === 'hinglish' ? 'Dainik Jeevan Shaili Margdarshan' : 'Holistic Lifestyle Guidance'}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="p-3.5 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>{lang === 'hinglish' ? 'Sattvic Aahar' : 'Sattvic Diet'}</div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>{rep.health.recommendations.diet}</div>
                    </div>
                    <div className="p-3.5 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>{lang === 'hinglish' ? 'Vyayam & Yoga' : 'Physical Movement'}</div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>{rep.health.recommendations.exercise}</div>
                    </div>
                    <div className="p-3.5 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>{lang === 'hinglish' ? 'Dhyan & Chintan' : 'Mind & Spirit'}</div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>{rep.health.recommendations.spiritual}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: SPIRITUAL ================= */}
          {activeTab === 'Spiritual Path' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-4" style={{ color: 'var(--col-moonstone)' }}>
                  {lang === 'hinglish' ? 'Aatmik Yatra & Vedic Upay' : 'Soul Journey & Vedic Remedies'}
                </h4>
                <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(200, 130, 42, 0.08)', border: '1px solid rgba(200, 130, 42, 0.35)' }}>
                  <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-copper)' }}>
                    {lang === 'hinglish' ? 'Aatmik Lakshya & Dharma' : 'Soul Purpose & Dharma'}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone)', lineHeight: 1.7 }}>
                    {rep.spiritual?.soulPurpose}
                  </p>
                </div>

                {rep.spiritual?.pastLife && (
                  <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--col-glass-border)' }}>
                    <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-moonstone-dim)' }}>
                      {lang === 'hinglish' ? 'Purva Janam Ka Karmic Prabhav' : 'Past Life Karmic Trajectory'}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                      {rep.spiritual.pastLife}
                    </p>
                  </div>
                )}

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-teal)', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Dainik Shubh Sadhana' : 'Recommended Daily Practices'}
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2 mb-6">
                  {(Array.isArray(rep.spiritual?.practices) ? rep.spiritual.practices : defaultReport.spiritual.practices).map((p) => (
                    <div
                      key={p}
                      className="p-3 rounded-xl flex items-center gap-2.5"
                      style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}
                    >
                      <Sparkles size={16} style={{ color: 'var(--col-teal)' }} />
                      <span className="text-xs" style={{ color: 'var(--col-moonstone)' }}>{p}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  {lang === 'hinglish' ? 'Grah Shanti Upay (उपाए)' : 'Planetary Remedies (उपाए)'}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Array.isArray(rep.spiritual?.remedies) ? rep.spiritual.remedies : defaultReport.spiritual.remedies).map((r) => (
                    <div
                      key={r.planet}
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(200, 130, 42, 0.06)', border: '1px solid rgba(200, 130, 42, 0.35)' }}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1" style={{ color: 'var(--col-copper)' }}>
                        <span>{r.planet}</span>
                        <span className="text-[10px] font-normal px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,130,42,0.15)' }}>
                          {r.day}
                        </span>
                      </div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                        {r.remedy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
