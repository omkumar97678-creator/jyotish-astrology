import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import KundliChart from '@/components/KundliChart';
import ZodiacIcon from '@/components/ZodiacIcon';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { t } from '@/translations';
import { saveKundli, calculateNumerology } from '@/lib/kundliService';
import { generateKundliReport } from '@/lib/aiService';
import { getCityCoordinates } from '@/lib/geocoding';
import { calculateVedicChart } from '@/lib/vedicAstrology';

export default function StepReveal({ formData, goBack }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState(0);
  const [calculatedData, setCalculatedData] = useState(null);
  const navigate = useNavigate();

  const messages = [
    lang === 'hinglish' ? 'Grah sthiti calculate kar rahe hain...' : 'Calculating planetary positions...',
    lang === 'hinglish' ? 'Aapka Nakshatra dekh rahe hain...' : 'Reading your Nakshatra...',
    lang === 'hinglish' ? 'Numerology analyze kar rahe hain...' : 'Analyzing numerology...',
    lang === 'hinglish' ? 'Kundli bas taiyaar hone wali hai...' : 'Your kundli is almost ready...',
  ];

  useEffect(() => {
    let isMounted = true;
    const msgInterval = setInterval(() => setMsg((m) => (m + 1) % messages.length), 800);

    const runCalculations = async () => {
      try {
        const dobStr = `${formData.dob.year}-${String(formData.dob.month).padStart(2, '0')}-${String(formData.dob.day).padStart(2, '0')}`;
        
        // 1. Geocoding
        const coords = await getCityCoordinates(formData.birthPlace);
        
        // 2. Numerology
        const numbers = calculateNumerology(formData.name, dobStr);

        // 3. Astronomical Vedic Chart Calculations
        const vedic = calculateVedicChart({
          dob: formData.dob,
          time: formData.time,
          birthPlace: formData.birthPlace,
          lat: coords.lat,
          lng: coords.lng,
        });

        // 4. Build comprehensive kundli data object
        const kundliData = {
          name: formData.name || 'Seeker',
          dob: formData.dob,
          time: formData.time,
          unknownTime: Boolean(formData.unknownTime),
          birthPlace: formData.birthPlace || 'New Delhi, India',
          date_of_birth: dobStr,
          time_of_birth: formData.unknownTime
            ? null
            : `${String(formData.time.hour).padStart(2, '0')}:${String(formData.time.minute).padStart(2, '0')}`,
          time_unknown: Boolean(formData.unknownTime),
          birth_place: formData.birthPlace || 'New Delhi, India',
          latitude: coords.lat,
          longitude: coords.lng,
          life_path_number: numbers.lifePathNumber,
          destiny_number: numbers.destinyNumber,
          soul_urge_number: numbers.soulUrgeNumber,
          lagna: vedic.lagna,
          lagnaSign: vedic.lagnaSign,
          lagnaDegree: vedic.lagnaDegree,
          rashi: vedic.rashi,
          rashiSign: vedic.rashiSign,
          rashiDegree: vedic.rashiDegree,
          sunSign: vedic.sunSign,
          nakshatra: vedic.nakshatra,
          nakshatraLord: vedic.nakshatraLord,
          nakshatraPada: vedic.nakshatraPada,
          gana: vedic.gana,
          planets: vedic.planets,
          houses: vedic.houses,
          panchang: vedic.panchang,
          mahadasha: vedic.mahadasha,
          yogas: vedic.yogas,
          sadeSati: vedic.sadeSati,
          lucky: vedic.lucky,
          is_default: true,
        };

        // 5. Generate Vedic AI analysis based on the REAL calculated chart
        const aiReport = await generateKundliReport(kundliData);
        kundliData.ai_report = aiReport;

        // 6. Save to Supabase (and localStorage)
        const saved = await saveKundli(user?.id, kundliData);
        if (saved?.id) {
          localStorage.setItem('current_kundli_id', saved.id);
        }
        localStorage.setItem('kundli_data', JSON.stringify({ ...kundliData, id: saved?.id }));
        localStorage.setItem('jyotish_onboarding', JSON.stringify(formData));

        if (isMounted) {
          setCalculatedData(kundliData);
          setReady(true);
        }
      } catch (err) {
        console.warn('Calculation workflow error, using fallback:', err);
        if (isMounted) {
          setReady(true);
        }
      }
    };

    runCalculations();

    return () => {
      isMounted = false;
      clearInterval(msgInterval);
    };
  }, []);

  const lagnaVal = calculatedData?.lagna || 'Leo (Simha)';
  const rashiVal = calculatedData?.rashi || 'Cancer (Karka)';
  const lifePath = calculatedData?.life_path_number || 7;

  const revealCards = [
    {
      label: lang === 'hinglish' ? 'Aapka Lagna' : 'Your Lagna',
      value: lagnaVal,
      sub: lang === 'hinglish' ? 'Rising sign' : 'Rising sign',
      renderIcon: () => (
        <ZodiacIcon
          sign={calculatedData?.lagnaSign?.toLowerCase() || 'leo'}
          size={28}
          style={{ color: 'var(--col-copper)' }}
        />
      ),
    },
    {
      label: lang === 'hinglish' ? 'Aapki Rashi' : 'Your Rashi',
      value: rashiVal,
      sub: lang === 'hinglish' ? 'Moon sign' : 'Moon sign',
      renderIcon: () => (
        <ZodiacIcon
          sign={calculatedData?.rashiSign?.toLowerCase() || 'cancer'}
          size={28}
          style={{ color: 'var(--col-copper)' }}
        />
      ),
    },
    {
      label: 'Life Path',
      value: String(lifePath),
      sub: lang === 'hinglish' ? 'The Seeker' : 'The Seeker',
      renderIcon: () => <span style={{ fontSize: 26, color: 'var(--col-copper)' }}>✦</span>,
      mono: true,
    },
  ];

  const viewKundli = () => {
    localStorage.setItem('jyotish_onboarding', JSON.stringify(formData));
    navigate('/kundli');
  };

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <KundliChart animate={!ready} size={ready ? 220 : 260} opacity={0.85} />
      </div>

      {!ready ? (
        <div className="mt-8 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
          {messages[msg]}
          <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }}>
            {' '}●●●
          </motion.span>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="mt-6"
            style={{ fontSize: 40, color: 'var(--col-copper)' }}
          >
            ✦
          </motion.div>
          <h1 className="font-display mt-3" style={{ fontSize: 'clamp(26px, 6vw, 38px)', color: 'var(--col-moonstone)' }}>
            {t.onboarding_step5_ready[lang]}
          </h1>
          <div className="font-display mt-2" style={{ fontSize: '1rem', color: 'var(--col-copper)', opacity: 0.8 }}>
            {lang === 'hinglish' ? 'आपकी कुंडली तैयार है' : 'Vedic Kundli Generated'}
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3 max-w-xl mx-auto">
            {revealCards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 + i * 0.12 }}
                className="glass-card text-center"
                style={{ padding: 20, border: '1px solid rgba(200,130,42,0.35)' }}
              >
                <div className="flex items-center justify-center h-8">
                  {c.renderIcon()}
                </div>
                <div className="mt-2 text-xs uppercase" style={{ color: 'var(--col-moonstone-dim)', letterSpacing: '0.12em' }}>
                  {c.label}
                </div>
                <div
                  className={`mt-2 ${c.mono ? 'font-mono-num' : 'font-display'}`}
                  style={{ color: 'var(--col-copper)', fontSize: '1.4rem' }}
                >
                  {c.value}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{c.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card mt-7 text-center" style={{ padding: '9px 22px', display: 'inline-block' }}>
            <span style={{ color: 'var(--col-moonstone-dim)', fontSize: '0.85rem' }}>
              {formData.name} &nbsp;•&nbsp; {formData.dob.day}/{formData.dob.month}/{formData.dob.year} &nbsp;•&nbsp; {formData.birthPlace}
            </span>
          </div>

          <div className="mt-8 px-4">
            <button
              className="btn-primary animate-glow-pulse w-full sm:w-auto justify-center cursor-pointer"
              style={{ padding: '16px 44px', fontSize: '1.05rem' }}
              onClick={viewKundli}
            >
              {t.onboarding_view_btn[lang]}
            </button>
          </div>

          <div className="mt-5">
            <button onClick={goBack} className="text-sm cursor-pointer" style={{ color: 'var(--col-moonstone-dim)' }}>
              {t.onboarding_back[lang]}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}