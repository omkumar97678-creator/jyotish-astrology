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
import { calculateVedicChart } from '@/lib/ephemeris';

export default function StepReveal({ formData, goBack }) {
  const { lang } = useLang();
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState(0);
  const [calculatedData, setCalculatedData] = useState(null);
  const navigate = useNavigate();

  const messages = [
    lang === 'hinglish' ? 'Grah sthiti calculate kar rahe hain...' : 'Calculating planetary positions...',
    lang === 'hinglish' ? 'Aapka Nakshatra dekh rahe hain...' : 'Reading star positions...',
    lang === 'hinglish' ? 'Numerology analyze kar rahe hain...' : 'Analyzing numerology...',
    lang === 'hinglish' ? 'Kundli bas taiyaar hone wali hai...' : 'Your kundli is almost ready...',
  ];

  useEffect(() => {
    let isMounted = true;
    const msgInterval = setInterval(() => setMsg((m) => (m + 1) % messages.length), 800);

    const runCalculations = async () => {
      try {
        // 1. Coordinates from city name
        const coords = await getCityCoordinates(formData.birthPlace);

        // 2. Parse date and time
        const year = parseInt(formData.dob.year, 10) || 2000;
        const month = parseInt(formData.dob.month, 10) || 1;
        const day = parseInt(formData.dob.day, 10) || 1;

        let hour = 6;
        let minute = 0;
        if (!formData.unknownTime && formData.time) {
          hour = parseInt(formData.time.hour, 10) || 6;
          minute = parseInt(formData.time.minute, 10) || 0;
          if (formData.time.period === 'PM' && hour !== 12) hour += 12;
          if (formData.time.period === 'AM' && hour === 12) hour = 0;
        }

        const birthDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // 3. Astronomical Vedic Chart Calculations (Jean Meeus & Lahiri Ayanamsha)
        const chart = calculateVedicChart(
          year,
          month,
          day,
          hour,
          minute,
          coords.lat,
          coords.lng,
          birthDateStr
        );

        if (!chart.success) {
          throw new Error(chart.error || 'Chart calculation failed');
        }

        // 4. Calculate Numerology
        const numerology = calculateNumerology(formData.name, birthDateStr);

        // 5. Build complete kundli data
        const kundliData = {
          name: formData.name || 'Seeker',
          dob: formData.dob,
          time: formData.time,
          date_of_birth: birthDateStr,
          time_of_birth: formData.unknownTime
            ? null
            : `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          time_unknown: Boolean(formData.unknownTime),
          birth_place: formData.birthPlace || coords.displayName || 'New Delhi, India',
          birthPlace: formData.birthPlace || coords.displayName || 'New Delhi, India',
          latitude: coords.lat,
          longitude: coords.lng,

          // REAL astronomical calculations
          lagna: chart.lagna,
          lagnaLord: chart.lagnaLord,
          lagnaIndex: chart.lagnaIndex,
          lagnaLongitude: chart.lagnaLongitude,
          rashi: chart.rashi,
          rashiLord: chart.rashiLord,
          rashiIndex: chart.rashiIndex,
          nakshatra: chart.nakshatra,
          nakshatraLord: chart.nakshatraLord,
          nakshatraPada: chart.nakshatraPada,
          gana: chart.gana,
          ayanamsha: chart.ayanamsha,
          planets: chart.planets,
          houses: chart.houses,
          dashas: chart.dashas,
          current_dasha: chart.currentDasha,
          is_manglik: chart.isManglik,

          // Numerology
          life_path_number: numerology.lifePathNumber,
          destiny_number: numerology.destinyNumber,
          soul_urge_number: numerology.soulUrgeNumber,
          is_default: true,
        };

        // 6. Generate AI report with REAL data
        const aiReport = await generateKundliReport(kundliData);
        kundliData.ai_report = aiReport;

        // 7. Save to Supabase + localStorage
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
        console.warn('Calculation workflow error:', err);
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

  const lagnaVal = calculatedData?.lagna || 'Scorpio (Vrishchik)';
  const rashiVal = calculatedData?.rashi || 'Gemini (Mithun)';
  const lifePath = calculatedData?.life_path_number || 7;

  const revealCards = [
    {
      label: lang === 'hinglish' ? 'Aapka Lagna' : 'Your Lagna',
      value: lagnaVal,
      sub: lang === 'hinglish' ? 'Rising sign' : 'Rising sign',
      renderIcon: () => (
        <ZodiacIcon
          sign={calculatedData?.lagna?.split(' ')[0]?.toLowerCase() || 'scorpio'}
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
          sign={calculatedData?.rashi?.split(' ')[0]?.toLowerCase() || 'gemini'}
          size={28}
          style={{ color: 'var(--col-copper)' }}
        />
      ),
    },
    {
      label: 'Life Path',
      value: String(lifePath),
      sub: lang === 'hinglish' ? 'Life Path Number' : 'Life Path Number',
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
        <KundliChart
          planets={calculatedData?.planets}
          animate={!ready}
          size={ready ? 220 : 260}
          opacity={0.9}
        />
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
          <div className="mt-6 mb-2">
            <span className="text-xs uppercase" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
              ✦ {lang === 'hinglish' ? 'Aapka Janam Kundli Vivaran' : 'Your Vedic Birth Chart'} ✦
            </span>
            <h2 className="font-display text-2xl mt-1" style={{ color: 'var(--col-moonstone)' }}>
              {formData.name || 'Seeker'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
            {revealCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card flex flex-col items-center justify-center p-4 text-center"
                style={{ minHeight: 120 }}
              >
                <div className="mb-1.5">{card.renderIcon()}</div>
                <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
                  {card.label}
                </div>
                <div
                  className={`font-semibold text-sm mt-0.5 ${card.mono ? 'font-mono-num' : ''}`}
                  style={{ color: 'var(--col-moonstone)' }}
                >
                  {card.value}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--col-copper)' }}>
                  {card.sub}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button onClick={viewKundli} className="btn-copper text-sm font-bold tracking-wide cursor-pointer">
              {lang === 'hinglish' ? 'Sampoorna Kundli Dekhein →' : 'Explore Full Kundli →'}
            </button>
            <button onClick={goBack} className="btn-ghost text-sm cursor-pointer">
              {lang === 'hinglish' ? 'Details Badlein' : 'Edit Details'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}