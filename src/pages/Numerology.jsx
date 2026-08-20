import React, { useEffect, useState } from 'react';
import StarField from '@/components/StarField';
import NumHeader from '@/components/numerology/NumHeader';
import LifePathHero from '@/components/numerology/LifePathHero';
import NumCards from '@/components/numerology/NumCards';
import Traits from '@/components/numerology/Traits';
import Lucky from '@/components/numerology/Lucky';
import NumInsights from '@/components/numerology/NumInsights';
import NumActions from '@/components/numerology/NumActions';
import { getCompleteNumerology } from '@/lib/kundliService';
import { useLang } from '@/context/LanguageContext';

export default function Numerology() {
  const { lang } = useLang();
  const [numData, setNumData] = useState(null);

  useEffect(() => {
    let name = 'Seeker';
    let dob = '1995-05-15';

    try {
      const storedKundli = localStorage.getItem('kundli_data');
      if (storedKundli) {
        const parsed = JSON.parse(storedKundli);
        name = parsed.name || name;
        dob = parsed.date_of_birth || parsed.dob || dob;
      } else {
        const raw = localStorage.getItem('jyotish_onboarding');
        if (raw) {
          const parsed = JSON.parse(raw);
          name = parsed.name || name;
          dob = parsed.dob || dob;
        }
      }
    } catch {
      /* fallback */
    }

    const calculated = getCompleteNumerology(name, dob, lang);
    setNumData(calculated);
  }, [lang]);

  if (!numData) return null;

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20">
        <NumHeader name={numData.name} />
        <LifePathHero numData={numData} />
        <NumCards numData={numData} />
        <Traits traits={numData.traits} />
        <Lucky luckyNumbers={numData.luckyNumbers} luckyColors={numData.luckyColors} />
        <NumInsights numData={numData} />
        <NumActions numData={numData} />
      </main>
    </div>
  );
}