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

export default function Kundli() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('jyotish_onboarding');
      if (raw) setData(JSON.parse(raw));
    } catch (e) {
      /* ignore */
    }
  }, []);

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
          <PlanetsTable />
          <NumerologyPanel data={data} />
        </div>
        <div className="mt-6">
          <BirthPanchang />
        </div>
        <div className="mt-6">
          <SadeSati />
        </div>
        <div className="mt-6">
          <BhavaAnalysis />
        </div>
        <div className="mt-6">
          <Mahadasha />
        </div>
        <div className="mt-6">
          <DashaTimeline />
        </div>
        <div className="mt-6">
          <Yogas />
        </div>
        <div className="mt-6">
          <AshtakvargaTable />
        </div>
        <div className="mt-6">
          <Lucky />
        </div>
        <div className="mt-6">
          <CompleteAiAnalysis />
        </div>
        <div className="mt-8">
          <KundliActions />
        </div>
      </main>
    </div>
  );
}