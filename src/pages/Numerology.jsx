import React from 'react';
import StarField from '@/components/StarField';
import NumHeader from '@/components/numerology/NumHeader';
import LifePathHero from '@/components/numerology/LifePathHero';
import NumCards from '@/components/numerology/NumCards';
import Traits from '@/components/numerology/Traits';
import Lucky from '@/components/numerology/Lucky';
import NumInsights from '@/components/numerology/NumInsights';
import NumActions from '@/components/numerology/NumActions';

export default function Numerology() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20">
        <NumHeader />
        <LifePathHero />
        <NumCards />
        <Traits />
        <Lucky />
        <NumInsights />
        <NumActions />
      </main>
    </div>
  );
}