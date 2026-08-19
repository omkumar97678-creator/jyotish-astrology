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
import BirthPanchang from '@/components/kundli/BirthPanchang';
import SadeSati from '@/components/kundli/SadeSati';
import BhavaAnalysis from '@/components/kundli/BhavaAnalysis';
import DashaTimeline from '@/components/kundli/DashaTimeline';
import { useAuth } from '@/context/AuthContext';
import { getKundli } from '@/lib/kundliService';
import { calculateVedicChart } from '@/lib/vedicAstrology';

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
  if (raw.time && typeof raw.time === 'object') {
    time = {
      hour: String(raw.time.hour || '10'),
      minute: String(raw.time.minute || '30'),
      period: raw.time.period || 'AM',
    };
  } else if (raw.time_of_birth) {
    const parts = String(raw.time_of_birth).split(':');
    const h = parseInt(parts[0], 10) || 12;
    const m = parts[1] ? parts[1].slice(0, 2) : '00';
    time = {
      hour: String(h > 12 ? h - 12 : (h === 0 ? 12 : h)),
      minute: m,
      period: h >= 12 ? 'PM' : 'AM',
    };
  }

  const birthPlace = raw.birthPlace || raw.birth_place || 'New Delhi, India';
  const lat = raw.latitude || 28.6139;
  const lng = raw.longitude || 77.2090;

  // Calculate real Vedic sidereal astrological details
  const vedic = calculateVedicChart({ dob, time, birthPlace, lat, lng });

  return {
    ...vedic,
    ...raw,
    name: raw.name || 'Seeker',
    dob,
    time,
    date_of_birth: raw.date_of_birth || `${dob.year}-${dob.month}-${dob.day}`,
    time_of_birth: raw.time_of_birth || `${time.hour}:${time.minute}`,
    birthPlace,
    birth_place: birthPlace,
    unknownTime: Boolean(raw.unknownTime || raw.time_unknown),
    time_unknown: Boolean(raw.time_unknown || raw.unknownTime),
    lagna: raw.lagna || vedic.lagna,
    rashi: raw.rashi || vedic.rashi,
    nakshatra: raw.nakshatra || vedic.nakshatra,
    gana: raw.gana || vedic.gana,
    planets: raw.planets && raw.planets.length > 0 ? raw.planets : vedic.planets,
    houses: raw.houses && raw.houses.length > 0 ? raw.houses : vedic.houses,
    panchang: raw.panchang || vedic.panchang,
    mahadasha: raw.mahadasha || vedic.mahadasha,
    yogas: raw.yogas || vedic.yogas,
    sadeSati: raw.sadeSati || vedic.sadeSati,
    lucky: raw.lucky || vedic.lucky,
    life_path_number: raw.life_path_number || 7,
    destiny_number: raw.destiny_number || 3,
    soul_urge_number: raw.soul_urge_number || 9,
  };
}

export default function Kundli() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [aiReport, setAiReport] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // 1. Try Supabase via current_kundli_id if available
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

      // 2. Fallback to localStorage kundli_data or jyotish_onboarding
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
          <Mahadasha mahadasha={data.mahadasha} nakshatra={data.nakshatra} />
        </div>
        <div className="mt-6">
          <DashaTimeline mahadasha={data.mahadasha} />
        </div>
        <div className="mt-6">
          <Yogas yogas={data.yogas} />
        </div>
        <div className="mt-6">
          <AshtakvargaTable />
        </div>
        <div className="mt-6">
          <Lucky lucky={data.lucky} />
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