import React from 'react';
import StarField from '@/components/StarField';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Stats from '@/components/landing/Stats';
import FinalCta from '@/components/landing/FinalCta';
import Footer from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField />
      <main className="relative">
        <Hero />

        {/* Decorative divider between hero and features */}
        <div
          className="relative w-full max-w-4xl mx-auto px-5 py-4 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,130,42,0.3))' }} />
          <span
            className="px-5 text-sm tracking-[0.28em] font-medium"
            style={{ color: '#C8822A', opacity: 0.3 }}
          >
            ✦ ✦ ✦
          </span>
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(200,130,42,0.3), transparent)' }} />
        </div>

        <Features />
        <HowItWorks />
        <Stats />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}