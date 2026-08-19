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

  // Dynamic fallback report builder personalized to user's real chart
  const defaultReport = {
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

  const rep = report && report.personality ? report : defaultReport;

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
                      background: 'rgba(255,255,255,0.04)',
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

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* ================= TAB 1: PERSONALITY ================= */}
          {activeTab === 'Personality' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-1" style={{ color: 'var(--col-moonstone)' }}>
                  Personalized Personality Profile for {name}
                </h4>
                <div className="text-xs uppercase font-semibold mt-4 mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Core Identity Synthesis
                </div>
                <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.personality?.overview}
                </p>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-teal)', letterSpacing: '0.1em' }}>
                  Auspicious Strengths ✦
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(rep.personality?.strengths || []).map((s) => (
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
                  Areas to Cultivate & Balance
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Array.isArray(rep.personality?.challenges) ? rep.personality.challenges : []).map((item, idx) => {
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
                <div
                  className="p-5 rounded-2xl relative"
                  style={{
                    background: 'rgba(200, 130, 42, 0.06)',
                    border: '1px solid rgba(200, 130, 42, 0.4)',
                  }}
                >
                  <div className="text-xs uppercase font-semibold mb-1.5" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                    Life Purpose Statement
                  </div>
                  <p className="text-sm italic" style={{ color: 'var(--col-moonstone)', lineHeight: 1.75 }}>
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
                  Career & Vocational Destiny
                </h4>
                <p className="text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.career?.overview}
                </p>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Best Suited Fields & Callings
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(rep.career?.bestFields || []).map((f) => (
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
                    Current Planetary Period Insight
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                    {rep.career.currentPhase}
                  </p>
                </div>
              )}

              {rep.career?.timeline && (
                <div>
                  <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                    Career Horizon Predictions
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
                  Relationship & Marriage Dynamics
                </h4>
                <p className="text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.love?.overview}
                </p>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Auspicious Compatibility Alignment
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(rep.love?.bestMatches || []).map((m) => (
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
                    Marriage & Union Timing
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone)', lineHeight: 1.6 }}>
                    {rep.love.marriageTiming}
                  </p>
                </div>
              )}

              {rep.love?.relationshipLesson && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                  <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>
                    Karmic Relationship Lesson
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                    {rep.love.relationshipLesson}
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
                  Ayurvedic Health & Vitality Profile
                </h4>
                <p className="text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  {rep.health?.constitution}
                </p>

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: '#F59E0B', letterSpacing: '0.1em' }}>
                  Areas to Nurture
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(rep.health?.watchAreas || []).map((w) => (
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
                    Holistic Lifestyle Guidance
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="p-3.5 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>Sattvic Diet</div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>{rep.health.recommendations.diet}</div>
                    </div>
                    <div className="p-3.5 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>Physical Movement</div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>{rep.health.recommendations.exercise}</div>
                    </div>
                    <div className="p-3.5 rounded-xl" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--col-teal)' }}>Mind & Spirit</div>
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
                  Soul Journey & Vedic Remedies
                </h4>
                <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(200, 130, 42, 0.08)', border: '1px solid rgba(200, 130, 42, 0.35)' }}>
                  <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-copper)' }}>
                    Soul Purpose & Dharma
                  </div>
                  <p className="text-xs" style={{ color: 'var(--col-moonstone)', lineHeight: 1.7 }}>
                    {rep.spiritual?.soulPurpose}
                  </p>
                </div>

                {rep.spiritual?.pastLife && (
                  <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--col-glass-border)' }}>
                    <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-moonstone-dim)' }}>
                      Past Life Karmic Trajectory
                    </div>
                    <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
                      {rep.spiritual.pastLife}
                    </p>
                  </div>
                )}

                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-teal)', letterSpacing: '0.1em' }}>
                  Recommended Daily Practices
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2 mb-6">
                  {(rep.spiritual?.practices || []).map((p) => (
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
                  Planetary Remedies (उपाए)
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(rep.spiritual?.remedies || []).map((r) => (
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
