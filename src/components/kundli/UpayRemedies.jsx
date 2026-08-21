import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Gem, Calendar, Sparkles, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function UpayRemedies({ data }) {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('doshas'); // 'doshas' | 'gemstones' | 'daily'

  const lagna = data?.lagna || 'Scorpio (Vrishchik)';
  const rashi = data?.rashi || 'Gemini (Mithun)';
  const isManglik = Boolean(data?.is_manglik ?? data?.isManglik ?? (data?.chart?.isManglik));
  const isSadeSatiActive = Boolean(data?.sadeSati?.active ?? data?.sade_sati?.active);
  const currentDashaLord = data?.current_dasha?.lord || data?.mahadasha?.activeDasha?.planet || 'Jupiter';

  // ── Determine Current Day & Quick Remedy ─────────
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  const todayName = daysOfWeek[todayIndex];

  const dailyQuickGuide = {
    Sunday: {
      planet: 'Sun (Surya)',
      wear: 'Orange / Red / Gold',
      mantra: 'Om Hram Hreem Hraum Sah Suryaya Namah',
      avoid: 'Ego & disrespecting father figures',
      color: '#E09840',
    },
    Monday: {
      planet: 'Moon (Chandra)',
      wear: 'White / Cream / Silver',
      mantra: 'Om Som Somaya Namah',
      avoid: 'Overthinking & emotional conflict',
      color: '#B0C4DE',
    },
    Tuesday: {
      planet: 'Mars (Mangal)',
      wear: 'Red / Saffron / Copper',
      mantra: 'Om Ang Angarakaya Namah',
      avoid: 'Anger & impulsive decisions',
      color: '#E05252',
    },
    Wednesday: {
      planet: 'Mercury (Budh)',
      wear: 'Green / Emerald',
      mantra: 'Om Bum Budhaya Namah',
      avoid: 'Gossip & deceitful speech',
      color: '#2AABA8',
    },
    Thursday: {
      planet: 'Jupiter (Guru)',
      wear: 'Yellow / Gold / Saffron',
      mantra: 'Om Brim Brihaspataye Namah',
      avoid: 'Disrespecting teachers & elders',
      color: '#E6B800',
    },
    Friday: {
      planet: 'Venus (Shukra)',
      wear: 'White / Soft Pink / Silver',
      mantra: 'Om Shum Shukraya Namah',
      avoid: 'Arguments & relationship clutter',
      color: '#E07A9E',
    },
    Saturday: {
      planet: 'Saturn (Shani)',
      wear: 'Black / Dark Blue / Charcoal',
      mantra: 'Om Sham Shanaischaraya Namah',
      avoid: 'Laziness & unethical actions',
      color: '#7B68EE',
    },
  };

  const todayRemedy = dailyQuickGuide[todayName];
  const isTodayImportant =
    todayRemedy.planet.toLowerCase().includes(currentDashaLord.toLowerCase()) ||
    (todayName === 'Tuesday' && isManglik);

  // ── Primary Gemstone by Lagna ────────────────────
  const getPrimaryGemstone = (lagnaStr) => {
    const l = String(lagnaStr).toLowerCase();
    if (l.includes('aries') || l.includes('mesh') || l.includes('scorpio') || l.includes('vrishchik')) {
      return {
        name: 'Red Coral (Moonga) ♦',
        planet: 'Mars (Mangal)',
        benefits: 'Courage, vitality, physical health, leadership authority, and neutralization of Manglik afflictions.',
        day: 'Tuesday (Sunrise)',
        finger: 'Ring finger (Right hand)',
        metal: 'Gold or Copper',
        weight: '5–7 carats minimum',
        time: 'Sunrise, after chanting Mangal Mantra 108 times',
        price: '₹500 - ₹5,000 per carat',
      };
    }
    if (l.includes('taurus') || l.includes('vrishabha') || l.includes('libra') || l.includes('tula')) {
      return {
        name: 'White Sapphire / Diamond (Heera) 💎',
        planet: 'Venus (Shukra)',
        benefits: 'Artistic magnetism, luxury, marital bliss, financial prosperity, and charisma.',
        day: 'Friday (Morning)',
        finger: 'Middle or Ring finger',
        metal: 'Silver, Platinum or White Gold',
        weight: '3–5 carats',
        time: 'Friday sunrise after Shukra Mantra',
        price: '₹2,000 - ₹15,000 per carat',
      };
    }
    if (l.includes('gemini') || l.includes('mithun') || l.includes('virgo') || l.includes('kanya')) {
      return {
        name: 'Emerald (Panna) ❇️',
        planet: 'Mercury (Budh)',
        benefits: 'Intellectual brilliance, business acumen, persuasive communication, and nervous system health.',
        day: 'Wednesday (Sunrise)',
        finger: 'Little finger (Kanishtha)',
        metal: 'Gold or Bronze',
        weight: '4–6 carats',
        time: 'Wednesday morning during Shukla Paksha',
        price: '₹1,500 - ₹10,000 per carat',
      };
    }
    if (l.includes('cancer') || l.includes('kark')) {
      return {
        name: 'Natural Pearl (Moti) ⚪',
        planet: 'Moon (Chandra)',
        benefits: 'Deep emotional serenity, intuitive clarity, psychological balance, and peaceful sleep.',
        day: 'Monday (Evening/Morning)',
        finger: 'Little finger (Right hand)',
        metal: 'Pure Silver',
        weight: '4–6 carats',
        time: 'Monday evening during waxing Moon',
        price: '₹800 - ₹4,500 per carat',
      };
    }
    if (l.includes('leo') || l.includes('singh')) {
      return {
        name: 'Ruby (Manik) ☀️',
        planet: 'Sun (Surya)',
        benefits: 'Executive power, royal dignity, strong willpower, paternal blessings, and elevated career reputation.',
        day: 'Sunday (Sunrise)',
        finger: 'Ring finger (Right hand)',
        metal: 'Gold or Copper',
        weight: '3–5 carats',
        time: 'Sunday sunrise after Aditya Hridaya Stotra',
        price: '₹2,500 - ₹20,000 per carat',
      };
    }
    // Default Sagittarius / Pisces / Capricorn / Aquarius
    return {
      name: 'Yellow Sapphire (Pukhraj) 🟡',
      planet: 'Jupiter (Guru)',
      benefits: 'Divine wisdom, wealth expansion, auspicious marital timing, and higher spiritual evolution.',
      day: 'Thursday (Sunrise)',
      finger: 'Index finger (Tarjani)',
      metal: 'Pure Yellow Gold',
      weight: '4–6 carats',
      time: 'Thursday sunrise during auspicious Hora',
      price: '₹3,000 - ₹25,000 per carat',
    };
  };

  const primaryGem = getPrimaryGemstone(lagna);

  // ── Dasha Analysis Data ──────────────────────────
  const getDashaRemedy = (lord) => {
    const l = String(lord).toLowerCase();
    if (l.includes('jup') || l.includes('guru') || l.includes('brihaspati')) {
      return {
        status: 'positive',
        title: 'Jupiter (Guru) Mahadasha — Highly Auspicious Phase',
        desc: 'Jupiter Mahadasha brings expansive knowledge, financial growth, social respect, and spiritual elevation. Your intellect and goodwill are magnified.',
        practices: [
          'Perform Guru / Vishnu Puja on Thursdays',
          'Wear yellow or saffron clothes on Thursdays',
          'Donate yellow lentils, bananas, or books to teachers and needy students',
          'Chant Guru Mantra: "Om Brim Brihaspataye Namah" 108 times daily',
        ],
      };
    }
    if (l.includes('sat') || l.includes('shani')) {
      return {
        status: 'caution',
        title: 'Saturn (Shani) Mahadasha — Karma & Discipline',
        desc: 'Saturn tests patience, humility, and persistence. It demands structured discipline and rewards honest effort with lasting stability and deep maturity.',
        practices: [
          'Chant Shani Mantra: "Om Sham Shanaischaraya Namah" 108 times on Saturdays',
          'Light a mustard oil lamp under a Peepal tree on Saturday evenings',
          'Feed black dogs, crows, and provide footwear or warm blankets to workers',
          'Recite Hanuman Chalisa daily to neutralize Saturnian intensity',
        ],
      };
    }
    if (l.includes('rah') || l.includes('rahu')) {
      return {
        status: 'mixed',
        title: 'Rahu Mahadasha — Transformation & Ambition',
        desc: 'Rahu catalyzes sudden opportunities, global expansion, technological innovation, and unconventional ambition. Keep ego and speculative greed grounded.',
        practices: [
          'Chant Rahu Mantra: "Om Bhram Bhreem Bhroum Sah Rahave Namah" after sunset',
          'Donate dry coconuts, blue cloth, or radish on Saturdays',
          'Keep a square piece of pure silver in your pocket or wallet',
          'Maintain clean living quarters and avoid intoxicating substances',
        ],
      };
    }
    return {
      status: 'positive',
      title: `${lord} Mahadasha Operating`,
      desc: `Currently undergoing ${lord} planetary period, energizing key sectors of your natal chart with purpose and growth.`,
      practices: [
        `Offer daily prayers aligned with ${lord} deity`,
        'Engage in selfless charity (Daan) to amplify auspicious vibrations',
        'Observe clean vegetarian eating on corresponding planetary days',
      ],
    };
  };

  const dashaData = getDashaRemedy(currentDashaLord);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
      style={{
        padding: '28px 24px',
        border: '1px solid rgba(200, 130, 42, 0.25)',
        background: 'radial-gradient(ellipse at top, rgba(200, 130, 42, 0.05) 0%, rgba(13, 15, 43, 0.7) 100%)',
      }}
    >
      {/* ── Section Title ── */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <div>
          <div className="text-xs uppercase flex items-center gap-2" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
            <Sparkles size={14} />
            ✦ Personalized Remedies
          </div>
          <h2 className="font-display mt-1" style={{ color: '#E8E4DC', fontSize: '1.25rem' }}>
            व्यक्तिगत उपाय — Solutions for your chart
          </h2>
        </div>
      </div>

      {/* ── Quick Remedy Bar (Top Strip) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: isTodayImportant ? 'rgba(200,130,42,0.12)' : 'rgba(255,255,255,0.03)',
          border: isTodayImportant ? '1px solid rgba(200,130,42,0.4)' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: todayRemedy.color + '22',
              border: `1px solid ${todayRemedy.color}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: todayRemedy.color,
              fontSize: '16px',
              flexShrink: 0,
            }}
          >
            ☀️
          </div>
          <div>
            <div style={{ color: '#E8E4DC', fontSize: '0.9rem', fontWeight: '600' }}>
              Today is <strong>{todayName}</strong> — {todayRemedy.planet} day
              {isTodayImportant && (
                <span
                  style={{
                    marginLeft: '8px',
                    background: '#C8822A',
                    color: '#0D0F2B',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  Key Planetary Day
                </span>
              )}
            </div>
            <div style={{ color: 'rgba(232,228,220,0.65)', fontSize: '0.8rem', marginTop: '2px' }}>
              <strong>Wear:</strong> {todayRemedy.wear} &nbsp;|&nbsp; <strong>Mantra:</strong>{' '}
              <em>"{todayRemedy.mantra}"</em> &nbsp;|&nbsp; <strong>Avoid:</strong> {todayRemedy.avoid}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Tab Switcher ── */}
      <div
        style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '100px',
          padding: '4px',
          gap: '4px',
          width: 'fit-content',
          marginBottom: '24px',
        }}
      >
        {[
          { id: 'doshas', label: '⚠️ Doshas & Fixes', icon: ShieldAlert },
          { id: 'gemstones', label: '💎 Gemstone Guide', icon: Gem },
          { id: 'daily', label: '🗓️ Daily Practices', icon: Calendar },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              padding: '8px 18px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.84rem',
              fontWeight: '600',
              transition: 'all 0.25s ease',
              background:
                activeTab === id ? 'linear-gradient(135deg, #C8822A, #E09840)' : 'transparent',
              color: activeTab === id ? '#0D0F2B' : 'rgba(232,228,220,0.6)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: DOSHAS & FIXES ── */}
      {activeTab === 'doshas' && (
        <motion.div
          key="doshas"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-5 md:grid-cols-2"
        >
          {/* Card 1: Manglik Check */}
          <div
            style={{
              background: isManglik ? 'rgba(224, 152, 64, 0.06)' : 'rgba(42, 171, 168, 0.06)',
              border: isManglik ? '1px solid rgba(224, 152, 64, 0.35)' : '1px solid rgba(42, 171, 168, 0.35)',
              borderRadius: '16px',
              padding: '20px',
              position: 'relative',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isManglik ? <AlertTriangle size={18} color="#E09840" /> : <CheckCircle2 size={18} color="#2AABA8" />}
                <h3 style={{ color: '#E8E4DC', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  Manglik Status (मांगलिक विश्लेषण)
                </h3>
              </div>
              <span
                style={{
                  background: isManglik ? 'rgba(224,152,64,0.2)' : 'rgba(42,171,168,0.2)',
                  color: isManglik ? '#E09840' : '#2AABA8',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                }}
              >
                {isManglik ? 'Moderate Intensity' : 'Dosha Free'}
              </span>
            </div>

            {isManglik ? (
              <>
                <p style={{ color: 'rgba(232,228,220,0.7)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                  Mars occupies a potent placement in your birth chart. While it bestows high drive and courage, traditional Vedic astrology recommends simple grounding remedies for marital harmony.
                </p>
                <div style={{ color: '#C8822A', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.08em' }}>
                  Recommended Vedic Remedies:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(232,228,220,0.85)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                  <li>Chant Mangal Mantra (<em>"Om Ang Angarakaya Namah"</em>) 108 times on Tuesdays</li>
                  <li>Observe an optional light fast or fruit diet on Tuesdays</li>
                  <li>Perform Kumbh Vivah or Mangal Shanti ritual before marriage</li>
                  <li>Wear certified Red Coral (Moonga) in gold or copper on your ring finger</li>
                  <li>Donate red lentils (masoor dal) and jaggery to the needy on Tuesdays</li>
                </ul>
              </>
            ) : (
              <div>
                <p style={{ color: 'rgba(232,228,220,0.75)', fontSize: '0.88rem', lineHeight: '1.6', margin: '8px 0' }}>
                  No Manglik Dosha detected in your birth chart ✅. Mars is favorably aligned, promoting natural cooperation, peaceful temperament, and marital auspiciousness.
                </p>
              </div>
            )}
          </div>

          {/* Card 2: Sade Sati Status */}
          <div
            style={{
              background: isSadeSatiActive ? 'rgba(224, 152, 64, 0.06)' : 'rgba(42, 171, 168, 0.06)',
              border: isSadeSatiActive ? '1px solid rgba(224, 152, 64, 0.35)' : '1px solid rgba(42, 171, 168, 0.35)',
              borderRadius: '16px',
              padding: '20px',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isSadeSatiActive ? <AlertTriangle size={18} color="#E09840" /> : <CheckCircle2 size={18} color="#2AABA8" />}
                <h3 style={{ color: '#E8E4DC', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  Shani Sade Sati Status
                </h3>
              </div>
              <span
                style={{
                  background: isSadeSatiActive ? 'rgba(224,152,64,0.2)' : 'rgba(42,171,168,0.2)',
                  color: isSadeSatiActive ? '#E09840' : '#2AABA8',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                }}
              >
                {isSadeSatiActive ? 'Active Transit' : 'Grace Period'}
              </span>
            </div>

            {isSadeSatiActive ? (
              <>
                <p style={{ color: 'rgba(232,228,220,0.7)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                  Saturn is currently transiting through your natal Moon quadrant. This is a period of karmic maturity, endurance, and deep foundational growth.
                </p>
                <div style={{ color: '#C8822A', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.08em' }}>
                  Recommended Saturn Upay:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(232,228,220,0.85)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                  <li>Light a mustard oil deepak under a Peepal tree on Saturday evenings</li>
                  <li>Recite the Hanuman Chalisa or Dasharatha Shani Stotram daily</li>
                  <li>Donate black sesame seeds, mustard oil, or dark clothing on Saturdays</li>
                  <li>Practice humble patience and maintain disciplined integrity at work</li>
                </ul>
              </>
            ) : (
              <div>
                <p style={{ color: 'rgba(232,228,220,0.75)', fontSize: '0.88rem', lineHeight: '1.6', margin: '8px 0' }}>
                  Shani's auspicious grace is with you ✅. Saturn is not creating any severe affliction on your Moon sign ({rashi}), allowing smooth professional advancement.
                </p>
              </div>
            )}
          </div>

          {/* Card 3: Current Dasha Remedies */}
          <div
            className="md:col-span-2"
            style={{
              background:
                dashaData.status === 'positive'
                  ? 'rgba(42, 171, 168, 0.06)'
                  : dashaData.status === 'caution'
                  ? 'rgba(224, 152, 64, 0.06)'
                  : 'rgba(200, 130, 42, 0.06)',
              border:
                dashaData.status === 'positive'
                  ? '1px solid rgba(42, 171, 168, 0.35)'
                  : dashaData.status === 'caution'
                  ? '1px solid rgba(224, 152, 64, 0.35)'
                  : '1px solid rgba(200, 130, 42, 0.35)',
              borderRadius: '16px',
              padding: '20px',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} color="#C8822A" />
                <h3 style={{ color: '#E8E4DC', fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  {dashaData.title}
                </h3>
              </div>
              <span
                style={{
                  background: 'rgba(200,130,42,0.18)',
                  color: '#C8822A',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}
              >
                Active Mahadasha
              </span>
            </div>

            <p style={{ color: 'rgba(232,228,220,0.75)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '14px' }}>
              {dashaData.desc}
            </p>

            <div style={{ color: '#C8822A', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.08em' }}>
              Daily Alignment Practices for this Period:
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {dashaData.practices.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: '#E8E4DC',
                  }}
                >
                  ✦ {p}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── TAB 2: GEMSTONE GUIDE ── */}
      {activeTab === 'gemstones' && (
        <motion.div
          key="gemstones"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Primary Gemstone (Large Card) */}
          <div
            style={{
              background: 'radial-gradient(circle at top left, rgba(200,130,42,0.12) 0%, rgba(13,15,43,0.6) 100%)',
              border: '2px solid rgba(200,130,42,0.5)',
              boxShadow: '0 0 24px rgba(200,130,42,0.15)',
              borderRadius: '20px',
              padding: '24px',
            }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div>
                <span
                  style={{
                    background: '#C8822A',
                    color: '#0D0F2B',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Primary Lagna Gemstone
                </span>
                <h3 className="font-display mt-2" style={{ color: '#E8E4DC', fontSize: '1.4rem' }}>
                  {primaryGem.name}
                </h3>
                <div style={{ color: '#C8822A', fontSize: '0.85rem' }}>
                  Governing Planet: <strong>{primaryGem.planet}</strong> · Lagna Lord for {lagna}
                </div>
              </div>
            </div>

            <p style={{ color: 'rgba(232,228,220,0.85)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px' }}>
              <strong>Benefits:</strong> {primaryGem.benefits}
            </p>

            {/* Wearing Instructions Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
                <div style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Auspicious Day</div>
                <div style={{ color: '#E8E4DC', fontSize: '0.85rem', fontWeight: '600', marginTop: '2px' }}>{primaryGem.day}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
                <div style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Finger & Hand</div>
                <div style={{ color: '#E8E4DC', fontSize: '0.85rem', fontWeight: '600', marginTop: '2px' }}>{primaryGem.finger}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
                <div style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Metal Choice</div>
                <div style={{ color: '#E8E4DC', fontSize: '0.85rem', fontWeight: '600', marginTop: '2px' }}>{primaryGem.metal}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
                <div style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Ideal Weight</div>
                <div style={{ color: '#E8E4DC', fontSize: '0.85rem', fontWeight: '600', marginTop: '2px' }}>{primaryGem.weight}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
                <div style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Energization Time</div>
                <div style={{ color: '#E8E4DC', fontSize: '0.85rem', fontWeight: '600', marginTop: '2px' }}>{primaryGem.time}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 14px' }}>
                <div style={{ color: 'rgba(232,228,220,0.45)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Est. Price Range</div>
                <div style={{ color: '#E8E4DC', fontSize: '0.85rem', fontWeight: '600', marginTop: '2px' }}>{primaryGem.price}</div>
              </div>
            </div>
          </div>

          {/* Secondary Gemstones Grid */}
          <div>
            <div style={{ color: 'rgba(232,228,220,0.6)', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.08em' }}>
              Secondary Beneficial Gemstones:
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>⚪</div>
                <h4 style={{ color: '#E8E4DC', fontSize: '0.95rem', fontWeight: '600', margin: '0 0 4px 0' }}>Natural Pearl (Moti)</h4>
                <div style={{ color: '#2AABA8', fontSize: '0.75rem', marginBottom: '8px' }}>Chandra Rashi Stone</div>
                <p style={{ color: 'rgba(232,228,220,0.65)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                  Soothes mental overthinking, enhances intuitive clarity, and deepens emotional peace.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>🟡</div>
                <h4 style={{ color: '#E8E4DC', fontSize: '0.95rem', fontWeight: '600', margin: '0 0 4px 0' }}>Yellow Sapphire (Pukhraj)</h4>
                <div style={{ color: '#E09840', fontSize: '0.75rem', marginBottom: '8px' }}>Wisdom & Luck Stone</div>
                <p style={{ color: 'rgba(232,228,220,0.65)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                  Expands academic success, financial abundance, and virtuous fortune in career.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>🟤</div>
                <h4 style={{ color: '#E8E4DC', fontSize: '0.95rem', fontWeight: '600', margin: '0 0 4px 0' }}>Hessonite (Gomed)</h4>
                <div style={{ color: '#C8822A', fontSize: '0.75rem', marginBottom: '8px' }}>Rahu Shield Stone</div>
                <p style={{ color: 'rgba(232,228,220,0.65)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                  Removes illusions and speculative confusion during high-stakes career moves.
                </p>
              </div>
            </div>
          </div>

          {/* Stones to Avoid Card */}
          <div
            style={{
              background: 'rgba(220, 80, 80, 0.05)',
              border: '1px solid rgba(220, 80, 80, 0.3)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div style={{ fontSize: '24px', color: '#E05252' }}>🚫</div>
            <div>
              <div style={{ color: '#E8E4DC', fontSize: '0.9rem', fontWeight: '600' }}>
                Gemstones to Strictly Avoid:
              </div>
              <p style={{ color: 'rgba(232,228,220,0.7)', fontSize: '0.82rem', margin: '2px 0 0 0', lineHeight: '1.4' }}>
                Based on conflicting enemy planetary houses for your {lagna} Lagna, avoid <strong>Diamond (Venus)</strong> and <strong>Emerald (Mercury)</strong> without individual horoscope verification by a trusted Jyotishi.
              </p>
            </div>
          </div>

          {/* Gemstone Disclaimer */}
          <div
            style={{
              background: 'rgba(42, 171, 168, 0.05)',
              borderLeft: '3px solid #2AABA8',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '0.8rem',
              color: 'rgba(232,228,220,0.7)',
            }}
          >
            <Info size={14} className="inline mr-1 text-teal-400" />
            Gemstone recommendations are traditional Vedic suggestions. Please consult a certified Jyotishi before purchasing. Quality and proper energization (Pran Pratishtha) matters far more than carat size.
          </div>
        </motion.div>
      )}

      {/* ── TAB 3: DAILY PRACTICES (WEEKLY SADHANA) ── */}
      {activeTab === 'daily' && (
        <motion.div
          key="daily"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p style={{ color: 'rgba(232,228,220,0.6)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Follow these simple daily Vedic rituals to balance your 7 planetary energy centers throughout the week:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Monday */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #B0C4DE', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>Monday (Chandra)</div>
                <span style={{ fontSize: '18px' }}>🌙</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Som Somaya Namah"
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> White / Silver</div>
                <div>🍲 <strong>Charity:</strong> Rice, milk, white sweets</div>
                <div>🛕 <strong>Puja:</strong> Chandra Puja, Shiva Abhishek</div>
              </div>
            </div>

            {/* Tuesday */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #E05252', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>Tuesday (Mangal)</div>
                <span style={{ fontSize: '18px' }}>🔥</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Ang Angarakaya Namah"
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> Red / Copper</div>
                <div>🍲 <strong>Charity:</strong> Red lentils, copper, jaggery</div>
                <div>🛕 <strong>Puja:</strong> Hanuman Chalisa, Mangal Puja</div>
              </div>
            </div>

            {/* Wednesday */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #2AABA8', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>Wednesday (Budh)</div>
                <span style={{ fontSize: '18px' }}>🌿</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Bum Budhaya Namah"
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> Emerald Green</div>
                <div>🍲 <strong>Charity:</strong> Green vegetables, books, fodder</div>
                <div>🛕 <strong>Puja:</strong> Lord Ganesha Atharvashirsha</div>
              </div>
            </div>

            {/* Thursday */}
            <div
              style={{
                background: currentDashaLord.toLowerCase().includes('jup') ? 'rgba(230,184,0,0.08)' : 'rgba(255,255,255,0.03)',
                borderLeft: '4px solid #E6B800',
                border: currentDashaLord.toLowerCase().includes('jup') ? '1px solid rgba(230,184,0,0.4)' : undefined,
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>
                  Thursday (Guru)
                  {currentDashaLord.toLowerCase().includes('jup') && (
                    <span style={{ fontSize: '0.65rem', background: '#E6B800', color: '#0D0F2B', padding: '2px 6px', borderRadius: '6px', marginLeft: '6px', fontWeight: '700' }}>
                      KEY DAY
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '18px' }}>🟡</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Brim Brihaspataye Namah"
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> Yellow / Saffron</div>
                <div>🍲 <strong>Charity:</strong> Yellow cloth, bananas, turmeric</div>
                <div>🛕 <strong>Puja:</strong> Vishnu Puja, Guru Vandana</div>
              </div>
            </div>

            {/* Friday */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #E07A9E', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>Friday (Shukra)</div>
                <span style={{ fontSize: '18px' }}>🌸</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Shum Shukraya Namah"
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> White / Soft Pink</div>
                <div>🍲 <strong>Charity:</strong> White flowers, sugar, kheer</div>
                <div>🛕 <strong>Puja:</strong> Mahalakshmi Puja, Shree Suktam</div>
              </div>
            </div>

            {/* Saturday */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #7B68EE', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>Saturday (Shani)</div>
                <span style={{ fontSize: '18px' }}>🪐</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Sham Shanaischaraya Namah"
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> Black / Dark Blue / Charcoal</div>
                <div>🍲 <strong>Charity:</strong> Black sesame, mustard oil, shoes</div>
                <div>🛕 <strong>Puja:</strong> Shani Puja, Hanuman Chalisa</div>
              </div>
            </div>

            {/* Sunday */}
            <div className="sm:col-span-2 lg:col-span-3" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #E09840', borderRadius: '12px', padding: '16px' }}>
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: '#E8E4DC', fontWeight: '600', fontSize: '0.92rem' }}>Sunday (Surya)</div>
                <span style={{ fontSize: '18px' }}>☀️</span>
              </div>
              <div style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '10px' }}>
                "Om Hram Hreem Hraum Sah Suryaya Namah"
              </div>
              <div className="grid gap-2 sm:grid-cols-3 text-xs text-stone-300">
                <div>🎨 <strong>Color:</strong> Orange / Red / Gold</div>
                <div>🍲 <strong>Charity:</strong> Wheat, jaggery, copper vessel</div>
                <div>🛕 <strong>Practice:</strong> Surya Namaskar at sunrise, Gayatri Mantra</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Section Disclaimer ── */}
      <div
        style={{
          marginTop: '28px',
          background: 'rgba(42, 171, 168, 0.04)',
          borderLeft: '3px solid #2AABA8',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '0.78rem',
          color: 'rgba(232,228,220,0.6)',
          lineHeight: '1.5',
        }}
      >
        Upay (remedies) are traditional Vedic suggestions passed down through generations. Results vary by individual. For serious life decisions, consult a qualified Jyotishi. This app provides guidance, not guarantees.
      </div>
    </motion.section>
  );
}
