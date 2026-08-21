import React, { useEffect, useState } from 'react';
import StarField from '@/components/StarField';
import KundliHeader from '@/components/kundli/KundliHeader';
import SummaryCards from '@/components/kundli/SummaryCards';
import ChartPanel from '@/components/kundli/ChartPanel';
import PlanetsTable from '@/components/kundli/PlanetsTable';
import NumerologyPanel from '@/components/kundli/NumerologyPanel';
import CompleteAiAnalysis from '@/components/kundli/CompleteAiAnalysis';
import KundliActions from '@/components/kundli/KundliActions';
import Mahadasha from '@/components/kundli/Mahadasha';
import Yogas from '@/components/kundli/Yogas';
import AshtakvargaTable from '@/components/kundli/AshtakvargaTable';
import Lucky from '@/components/kundli/Lucky';
import UpayRemedies from '@/components/kundli/UpayRemedies';
import BirthPanchang from '@/components/kundli/BirthPanchang';
import SadeSati from '@/components/kundli/SadeSati';
import BhavaAnalysis from '@/components/kundli/BhavaAnalysis';
import DashaTimeline from '@/components/kundli/DashaTimeline';
import { useAuth } from '@/context/AuthContext';
import { getKundli, calculateNumerology } from '@/lib/kundliService';
import { calculateVedicChart } from '@/lib/ephemeris';

function normalizeKundliData(raw) {
  if (!raw) return null;

  let dob = { day: '15', month: '05', year: '1995' };
  if (raw.dob && typeof raw.dob === 'object') {
    dob = {
      day: String(raw.dob.day || '15'),
      month: String(raw.dob.month || '05'),
      year: String(raw.dob.year || '1995'),
    };
  } else if (raw.date_of_birth) {
    const parts = String(raw.date_of_birth).split('-');
    if (parts.length === 3) {
      dob = { year: parts[0], month: parts[1], day: parts[2] };
    }
  }

  let time = { hour: '10', minute: '30', period: 'AM' };
  let hour24 = 10;
  let minute24 = 30;

  if (raw.time && typeof raw.time === 'object') {
    time = {
      hour: String(raw.time.hour || '10'),
      minute: String(raw.time.minute || '30'),
      period: raw.time.period || 'AM',
    };
    let h = parseInt(time.hour, 10) || 10;
    minute24 = parseInt(time.minute, 10) || 0;
    if (time.period === 'PM' && h !== 12) h += 12;
    if (time.period === 'AM' && h === 12) h = 0;
    hour24 = h;
  } else if (raw.time_of_birth) {
    const parts = String(raw.time_of_birth).split(':');
    const h = parseInt(parts[0], 10) || 12;
    minute24 = parseInt(parts[1] || '0', 10) || 0;
    hour24 = h;
    time = {
      hour: String(h > 12 ? h - 12 : (h === 0 ? 12 : h)),
      minute: String(minute24).padStart(2, '0'),
      period: h >= 12 ? 'PM' : 'AM',
    };
  }

  const birthPlace = raw.birthPlace || raw.birth_place || 'New Delhi, India';
  const lat = parseFloat(raw.latitude) || 28.6139;
  const lng = parseFloat(raw.longitude) || 77.209;
  const birthDateStr = `${dob.year}-${String(dob.month).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}`;

  // Always compute authentic real-time astronomical positions using Ephemeris
  const chart = calculateVedicChart(
    parseInt(dob.year, 10) || 2000,
    parseInt(dob.month, 10) || 1,
    parseInt(dob.day, 10) || 1,
    hour24,
    minute24,
    lat,
    lng,
    birthDateStr
  );

  const numerology = calculateNumerology(raw.name || 'Seeker', birthDateStr);

  return {
    ...raw,
    name: raw.name || 'Seeker',
    dob,
    time,
    date_of_birth: birthDateStr,
    time_of_birth: raw.time_of_birth || `${String(hour24).padStart(2, '0')}:${String(minute24).padStart(2, '0')}`,
    birthPlace,
    birth_place: birthPlace,
    latitude: lat,
    longitude: lng,
    unknownTime: Boolean(raw.unknownTime || raw.time_unknown),
    time_unknown: Boolean(raw.time_unknown || raw.unknownTime),

    // Real Ephemeris values
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

    // Auxiliary Systems
    panchang: chart.panchang,
    yogas: chart.yogas,
    sadeSati: chart.sadeSati,
    ashtakvarga: chart.ashtakvarga,
    lucky: chart.lucky,

    // Numerology
    life_path_number: raw.life_path_number || numerology.lifePathNumber,
    destiny_number: raw.destiny_number || numerology.destinyNumber,
    soul_urge_number: raw.soul_urge_number || numerology.soulUrgeNumber,
  };
}

export default function Kundli() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [aiReport, setAiReport] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const kundliId = localStorage.getItem('current_kundli_id');
      if (kundliId) {
        try {
          const dbKundli = await getKundli(kundliId);
          if (dbKundli) {
            const normalized = normalizeKundliData(dbKundli);
            setData(normalized);
            if (dbKundli.ai_report) setAiReport(dbKundli.ai_report);
            return;
          }
        } catch (e) {
          console.warn('Could not fetch from Supabase, checking local cache:', e);
        }
      }

      try {
        const storedKundli = localStorage.getItem('kundli_data');
        if (storedKundli) {
          const parsed = JSON.parse(storedKundli);
          const normalized = normalizeKundliData(parsed);
          setData(normalized);
          if (parsed.ai_report) setAiReport(parsed.ai_report);
          return;
        }

        const raw = localStorage.getItem('jyotish_onboarding');
        if (raw) {
          const parsed = JSON.parse(raw);
          const normalized = normalizeKundliData(parsed);
          setData(normalized);
        }
      } catch (e) {
        /* ignore */
      }
    };

    loadData();
  }, [user]);

  if (!data) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--col-midnight)' }}>
        <StarField count={80} />
        <div className="relative z-10 text-center">
          <p style={{ color: 'var(--col-moonstone-dim)' }}>No kundli data found. Please complete the onboarding first.</p>
          <a href="/onboarding" className="btn-primary mt-6 inline-flex">Start Onboarding</a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-5xl mx-auto px-5 pt-28 pb-20">
        <KundliHeader data={data} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChartPanel data={data} />
          <SummaryCards data={data} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <PlanetsTable planets={data.planets} />
          <NumerologyPanel data={data} />
        </div>
        <div className="mt-6">
          <BirthPanchang panchang={data.panchang} />
        </div>
        <div className="mt-6">
          <SadeSati sadeSati={data.sadeSati} rashi={data.rashi} />
        </div>
        <div className="mt-6">
          <BhavaAnalysis houses={data.houses} />
        </div>
        <div className="mt-6">
          <Mahadasha currentDasha={data.current_dasha} dashas={data.dashas} mahadasha={data.mahadasha} nakshatra={data.nakshatra} />
        </div>
        <div className="mt-6">
          <DashaTimeline dashas={data.dashas} mahadasha={data.mahadasha} />
        </div>
        <div className="mt-6">
          <Yogas yogas={data.yogas} />
        </div>
        <div className="mt-6">
          <AshtakvargaTable ashtakvarga={data.ashtakvarga} />
        </div>
        <div className="mt-6">
          <Lucky lucky={data.lucky} />
        </div>
        <div className="mt-6">
          <UpayRemedies data={data} />
        </div>
        <div className="mt-6">
          <CompleteAiAnalysis report={aiReport} data={data} />
        </div>
        <div className="mt-8">
          <KundliActions data={data} />
        </div>
      </main>
    </div>
  );
}