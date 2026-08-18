import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, X, Heart, Shield, Award, Moon, Sun } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function CompleteAiAnalysis() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('Personality');
  const [wellnessSubTab, setWellnessSubTab] = useState('Diet');

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
              {lang === 'hinglish' ? 'ज्योतिषीय विश्लेषण — सम्पूर्ण रिपोर्ट' : 'Astrological Analysis'}
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
              className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
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
                  Your Complete Personality Profile
                </h4>
                <div className="text-xs uppercase font-semibold mt-4 mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Core Identity
                </div>
                <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  With Leo rising (Lagna), you project confidence, warmth, and natural authority. Your Cancer Moon adds emotional depth beneath this bold exterior — you lead with heart, not just intellect. People are drawn to your magnetic presence, yet few see the sensitive, protective soul within. This combination creates a natural leader who deeply cares for those under their wing.
                </p>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-teal)', letterSpacing: '0.1em' }}>
                  Your Strengths ✦
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Natural Leader — Leo Lagna gives commanding presence',
                    'Emotionally Intelligent — Cancer Moon, deep empathy',
                    'Strategic Mind — Mercury in Virgo, analytical',
                    'Protective — Strong 4th house influences',
                    'Creative — Venus in Leo, artistic gifts',
                    'Resilient — Saturn in 7th, learns from challenges',
                  ].map((s) => (
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
                  Areas to Develop
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { title: 'Ego Management', desc: 'Leo energy can become prideful. Practice humility and active listening daily.' },
                    { title: 'Emotional Boundaries', desc: "Cancer Moon absorbs others' emotions easily. Shield your energy." },
                    { title: 'Perfectionism', desc: 'Mercury in Virgo can lead to over-analysis. Trust your spontaneous intuition.' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: '#F59E0B' }}>
                        {item.title}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                  “Your soul came to lead, protect, and illuminate. You are meant to be seen — not to hide. Your greatest growth comes through relationships that challenge your ego and expand your heart.”
                </p>
              </div>
            </div>
          )}

          {/* ================= TAB 2: CAREER ================= */}
          {activeTab === 'Career' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-4" style={{ color: 'var(--col-moonstone)' }}>
                  Career & Vocational Profile
                </h4>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Natural Career Paths
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-xl space-y-2" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                    <div className="text-xs font-bold uppercase mb-2" style={{ color: 'var(--col-teal)' }}>
                      Best Suited
                    </div>
                    {[
                      'Leadership & Executive Management',
                      'Teaching, Mentoring & Coaching',
                      'Entertainment & Performing Arts',
                      'Government, Policy & Politics',
                      'Consulting & Advisory Roles',
                      'Healthcare & Wellness (Cancer Moon)',
                    ].map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs" style={{ color: 'var(--col-moonstone)' }}>
                        <Check size={14} style={{ color: 'var(--col-teal)' }} />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl space-y-2" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                    <div className="text-xs font-bold uppercase mb-2" style={{ color: '#F59E0B' }}>
                      Less Suited
                    </div>
                    {[
                      'Isolated, repetitive desk work',
                      'Subordinate-only roles with no autonomy',
                      'Pure technical tasks without human element',
                    ].map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
                        <X size={14} style={{ color: '#F59E0B' }} />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Career Phase */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(200, 130, 42, 0.08)',
                  border: '1px solid rgba(200, 130, 42, 0.45)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--col-copper)' }}>
                    Current Career Phase
                  </div>
                  <span className="font-mono-num text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'var(--col-copper)', color: 'var(--col-midnight)' }}>
                    RAHU MAHADASHA (2010–2028)
                  </span>
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
                  You are in a period of rapid career expansion and unconventional growth. Rahu in the 9th house pushes you toward international connections, higher education, and breaking traditional career boundaries. This is your decade to take calculated risks.
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1 font-mono-num" style={{ color: 'var(--col-moonstone-dim)' }}>
                    <span>Period Progress</span>
                    <span className="font-semibold" style={{ color: 'var(--col-copper)' }}>60%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg, var(--col-copper), var(--col-copper-light))' }} />
                  </div>
                </div>
              </div>

              {/* Career Timeline */}
              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Career Timeline
                </div>
                <div className="space-y-2.5">
                  {[
                    { yrs: '2024–2025', desc: 'Jupiter 10th house transit — Major career recognition and leadership expansion incoming' },
                    { yrs: '2025–2026', desc: 'Saturn stabilizes partnerships — High-yield business collaborations favored' },
                    { yrs: '2026–2027', desc: 'Rahu peak phase — Global networks and international opportunities open' },
                    { yrs: '2028+', desc: 'Jupiter Mahadasha begins — Wisdom-based advisory and mentorship expansion' },
                  ].map((t) => (
                    <div key={t.yrs} className="p-3 rounded-xl flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 glass-card">
                      <span className="font-mono-num text-xs font-bold px-2 py-0.5 rounded w-fit" style={{ background: 'rgba(200,130,42,0.15)', color: 'var(--col-copper)' }}>
                        {t.yrs}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
                        {t.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Outlook */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="p-4 rounded-xl glass-card text-center">
                  <div className="text-xs font-semibold text-[var(--col-moonstone-dim)]">Short Term (1 yr)</div>
                  <div className="font-display text-base mt-1" style={{ color: 'var(--col-copper)' }}>Growth Phase ↑</div>
                </div>
                <div className="p-4 rounded-xl glass-card text-center">
                  <div className="text-xs font-semibold text-[var(--col-moonstone-dim)]">Medium Term (3 yr)</div>
                  <div className="font-display text-base mt-1" style={{ color: 'var(--col-teal)' }}>Peak Earning Period</div>
                </div>
                <div className="p-4 rounded-xl glass-card text-center">
                  <div className="text-xs font-semibold text-[var(--col-moonstone-dim)]">Long Term (10 yr)</div>
                  <div className="font-display text-base mt-1" style={{ color: 'var(--col-copper-light)' }}>Financial Stability ✦</div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: LOVE & RELATIONSHIPS ================= */}
          {activeTab === 'Love & Relationships' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-2" style={{ color: 'var(--col-moonstone)' }}>
                  Love & Relationship Forecast
                </h4>
                <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Relationship Nature
                </div>
                <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  Venus in Leo makes you a passionate, romantic partner who loves grand gestures and deep loyalty. You give 100% in relationships and expect the same. Saturn in the 7th house indicates that serious, lasting relationships come after age 28-30, but when they do, they are built for life.
                </p>
              </div>

              {/* Compatibility Guide */}
              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Compatibility Guide
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-xl space-y-2.5" style={{ background: 'rgba(42, 171, 168, 0.06)', border: '1px solid rgba(42, 171, 168, 0.25)' }}>
                    <div className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--col-teal)' }}>
                      Most Compatible
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[var(--col-moonstone)]">♈ Aries (Mesh)</span>
                      <p className="text-xs text-[var(--col-moonstone-dim)]">Instant spark, shared passion and mutual ambition.</p>
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[var(--col-moonstone)]">♐ Sagittarius (Dhanu)</span>
                      <p className="text-xs text-[var(--col-moonstone-dim)]">Adventure, mutual respect, and philosophical expansion.</p>
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[var(--col-moonstone)]">♊ Gemini (Mithun)</span>
                      <p className="text-xs text-[var(--col-moonstone-dim)]">Mental stimulation, lively energy, and endless humor.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl space-y-2.5" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                    <div className="text-xs font-bold uppercase mb-1" style={{ color: '#F59E0B' }}>
                      Challenging but Growthful
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[var(--col-moonstone)]">♑ Capricorn (Makar)</span>
                      <p className="text-xs text-[var(--col-moonstone-dim)]">Opposite polarities; teaches grounding and discipline.</p>
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[var(--col-moonstone)]">♏ Scorpio (Vrishchik)</span>
                      <p className="text-xs text-[var(--col-moonstone-dim)]">Intense, transformative bond requiring deep trust.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marriage Timing */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(200, 130, 42, 0.08)',
                  border: '1px solid rgba(200, 130, 42, 0.45)',
                  boxShadow: '0 0 24px rgba(200, 130, 42, 0.12)',
                }}
              >
                <div className="text-xs uppercase font-bold tracking-wider mb-2" style={{ color: 'var(--col-copper)' }}>
                  Auspicious Marriage Windows
                </div>
                <div className="space-y-1.5 text-xs font-medium" style={{ color: 'var(--col-moonstone)' }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--col-teal)' }}>✦</span>
                    <span><strong>2025–2026:</strong> Jupiter in 7th — Very Favorable & Harmonious</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--col-copper)' }}>✦</span>
                    <span><strong>2027–2028:</strong> Saturn stabilized — Ideal for permanent lifelong commitment</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[rgba(200,130,42,0.2)] text-[11px]" style={{ color: 'var(--col-moonstone-dim)' }}>
                  Best Muhurat Months: <strong>Nov–Feb, June–July</strong>
                </div>
              </div>

              {/* Relationship Lessons */}
              <div>
                <div className="text-xs uppercase font-semibold mb-1.5" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Relationship Lessons
                </div>
                <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.7 }}>
                  Saturn in the 7th house teaches: Choose a partner who respects your need for recognition while grounding your tendencies toward dramatic intensity. Your ideal partner is ambitious, emotionally mature, and deeply values reciprocal loyalty.
                </p>
              </div>
            </div>
          )}

          {/* ================= TAB 4: HEALTH ================= */}
          {activeTab === 'Health' && (
            <div className="space-y-7">
              <div>
                <h4 className="font-display text-lg mb-2" style={{ color: 'var(--col-moonstone)' }}>
                  Health & Vitality Constitution
                </h4>
                <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Physiological Constitution
                </div>
                <p className="text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.8 }}>
                  Leo Lagna governs the heart, spine, and upper back. Cancer Moon rules the stomach, chest, and lymphatic system. Maintaining emotional balance is directly linked to your physical wellbeing — stress manifests as digestive sensitivity and back tension.
                </p>
              </div>

              {/* Health Watch Areas 2x2 Grid */}
              <div className="grid gap-3.5 sm:grid-cols-2">
                {[
                  { title: 'Heart & Circulation', priority: 'Medium', desc: 'Sun rules Leo — keep heart healthy. Regular cardio, avoid excessive heat.', label: 'Attention needed', pct: 60, barColor: '#F59E0B' },
                  { title: 'Digestive System', priority: 'High', desc: 'Cancer Moon sensitizes stomach. Avoid emotional eating. Warm foods preferred.', label: 'Monitor closely', pct: 70, barColor: '#F59E0B' },
                  { title: 'Spine & Back', priority: 'Medium', desc: 'Leo rules spine. Long sitting hours risky. Regular stretching essential.', label: 'Good with care', pct: 50, barColor: 'var(--col-copper)' },
                  { title: 'Mental Health', priority: 'High', desc: 'Cancer-Leo combo needs emotional outlets. Creative expression prevents lethargy.', label: 'Active attention', pct: 75, barColor: 'var(--col-teal)' },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl glass-card flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-xs text-[var(--col-moonstone)]">{item.title}</span>
                        <span className="text-[10px] uppercase font-bold" style={{ color: item.barColor }}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--col-moonstone-dim)] mb-3">{item.desc}</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono-num mb-1" style={{ color: 'var(--col-moonstone-dim)' }}>
                        <span>{item.label}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.barColor }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wellness Recommendations Sub-tabs */}
              <div className="glass-card p-5">
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Wellness Recommendations
                </div>
                <div className="flex gap-2 mb-4">
                  {['Diet', 'Exercise', 'Spiritual'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setWellnessSubTab(st)}
                      className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                      style={
                        wellnessSubTab === st
                          ? { background: 'var(--col-copper)', color: 'var(--col-midnight)' }
                          : { background: 'rgba(255,255,255,0.05)', color: 'var(--col-moonstone-dim)' }
                      }
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {wellnessSubTab === 'Diet' && (
                  <p className="text-xs text-[var(--col-moonstone-dim)] leading-relaxed">
                    <strong className="text-[var(--col-moonstone)]">Favorable:</strong> Warm, cooked foods. Fresh dairy products (Moon alignment). Saffron, cardamom, turmeric (Sun herbs). <br />
                    <strong className="text-[var(--col-moonstone)]">Avoid:</strong> Ice-cold drinks, excessive pungent/spicy cuisine, and irregular meal timing.
                  </p>
                )}
                {wellnessSubTab === 'Exercise' && (
                  <p className="text-xs text-[var(--col-moonstone-dim)] leading-relaxed">
                    <strong className="text-[var(--col-moonstone)]">Best:</strong> Morning Surya Namaskar yoga (6:00–8:00 AM). Swimming (Cancer Moon affinity with water). <br />
                    <strong className="text-[var(--col-moonstone)]">Avoid:</strong> Extreme physical overexertion during midday Rahu Kaal.
                  </p>
                )}
                {wellnessSubTab === 'Spiritual' && (
                  <p className="text-xs text-[var(--col-moonstone-dim)] leading-relaxed">
                    <strong className="text-[var(--col-moonstone)]">Sunday:</strong> Surya Arghya (water offering to the rising Sun). <br />
                    <strong className="text-[var(--col-moonstone)]">Monday:</strong> Moon meditation and wearing soft white or pearl hues. <br />
                    <strong className="text-[var(--col-moonstone)]">Saturday:</strong> Shani prayers for Saturn stabilization.
                  </p>
                )}
              </div>

              {/* Health Timeline */}
              <div>
                <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Health Timeline
                </div>
                <div className="space-y-2 text-xs text-[var(--col-moonstone-dim)]">
                  <div><strong>2024–2025:</strong> Minor health fluctuations — proactive preventive care and hydration recommended.</div>
                  <div><strong>2026:</strong> Saturn transit — focus on joint health, stretching, and spine ergonomics.</div>
                  <div><strong>2028+:</strong> Jupiter Mahadasha — generally excellent, revitalized vitality and robust wellbeing.</div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 5: SPIRITUAL PATH ================= */}
          {activeTab === 'Spiritual Path' && (
            <div className="space-y-7">
              {/* Soul Purpose (Atma Karaka) */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(200, 130, 42, 0.08)',
                  border: '1px solid rgba(200, 130, 42, 0.45)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sun size={20} style={{ color: 'var(--col-copper)' }} />
                  <h4 className="font-display text-lg" style={{ color: 'var(--col-moonstone)' }}>
                    Your Atma Karaka: Sun ☉
                  </h4>
                </div>
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--col-copper)' }}>
                  आत्मकारक: सूर्य
                </div>
                <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
                  The Sun as your soul significator means your spiritual journey is about finding your authentic self, stepping into benevolent leadership without ego, and learning to shine for others — not just yourself.
                </p>
              </div>

              {/* Past Life Indicators */}
              <div>
                <div className="text-xs uppercase font-semibold mb-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Past Life Indicators
                </div>
                <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.75 }}>
                  Ketu in the 3rd house suggests: You were a skilled communicator, writer, or teacher in past incarnations. In this lifetime, you build upon that communicative foundation but must now develop philosophical wisdom (9th house Rahu) far beyond words alone.
                </p>
              </div>

              {/* Spiritual Practices 6 Cards */}
              <div>
                <div className="text-xs uppercase font-semibold mb-3" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Recommended Spiritual Practices
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: 'Surya Mantra', desc: 'Recite Om Suryaya Namaha daily at sunrise' },
                    { title: 'Om Namah Shivaya', desc: 'Saturn & Moon balancing remedy on Mondays/Saturdays' },
                    { title: 'Gayatri Mantra', desc: '108 repetitions on Sunday mornings' },
                    { title: 'Chandra Mantra', desc: 'Recite on Monday evenings for emotional calm' },
                    { title: 'Silent Meditation', desc: '20 minutes daily morning or twilight minimum' },
                    { title: 'Selfless Service', desc: 'Teaching and mentoring underprivileged seekers' },
                  ].map((p) => (
                    <div key={p.title} className="p-3.5 rounded-xl glass-card">
                      <div className="text-xs font-semibold" style={{ color: 'var(--col-copper)' }}>
                        ✦ {p.title}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
                        {p.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Remedies Table */}
              <div className="glass-card p-5">
                <div className="text-xs uppercase font-semibold mb-1" style={{ color: 'var(--col-copper)', letterSpacing: '0.1em' }}>
                  Personalized Remedies Summary
                </div>
                <div className="text-xs text-[var(--col-copper)] mb-3">व्यक्तिगत उपाय</div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs" style={{ borderCollapse: 'collapse', color: 'var(--col-moonstone)' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--col-glass-border)' }}>
                        <th className="text-left py-2 font-semibold" style={{ color: 'var(--col-copper)' }}>Planet</th>
                        <th className="text-left py-2 font-semibold" style={{ color: 'var(--col-copper)' }}>Remedy</th>
                        <th className="text-right py-2 font-semibold" style={{ color: 'var(--col-copper)' }}>Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { planet: 'Sun ☉', remedy: 'Offer Arghya water at sunrise', day: 'Sunday' },
                        { planet: 'Moon ☽', remedy: 'Wear Pearl / Moonstone in silver', day: 'Monday' },
                        { planet: 'Rahu ☊', remedy: 'Chant Rahu Stotram & feed birds', day: 'Saturday' },
                        { planet: 'Saturn ♄', remedy: 'Offer black sesame seeds & lamp', day: 'Saturday' },
                      ].map((r) => (
                        <tr key={r.planet} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td className="py-2.5 font-medium">{r.planet}</td>
                          <td className="py-2.5 text-[var(--col-moonstone-dim)]">{r.remedy}</td>
                          <td className="py-2.5 text-right font-mono-num text-[var(--col-copper)]">{r.day}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.05)] text-[11px] text-[var(--col-moonstone-dim)] italic">
                  Remedies are traditional Vedic suggestions. Consult a qualified Jyotishi for personalized guidance.
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
