import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarField from '@/components/StarField';
import HoroHeader from '@/components/horoscope/HoroHeader';
import RashiSelector from '@/components/horoscope/RashiSelector';
import TabSelector from '@/components/horoscope/TabSelector';
import HeroPrediction from '@/components/horoscope/content/HeroPrediction';
import AspectCards from '@/components/horoscope/content/AspectCards';
import LuckyStrip from '@/components/horoscope/content/LuckyStrip';
import PlanetaryInfluence from '@/components/horoscope/content/PlanetaryInfluence';
import AdviceOfDay from '@/components/horoscope/content/AdviceOfDay';
import HoroAiInsights from '@/components/horoscope/content/HoroAiInsights';
import WeeklyOverview from '@/components/horoscope/content/WeeklyOverview';
import MonthlyHighlights from '@/components/horoscope/content/MonthlyHighlights';
import PanchangToday from '@/components/horoscope/content/PanchangToday';
import CompatibilityToday from '@/components/horoscope/content/CompatibilityToday';
import NotablePersonalities from '@/components/horoscope/content/NotablePersonalities';
import ShareAndSave from '@/components/horoscope/content/ShareAndSave';
import HoroNav from '@/components/horoscope/HoroNav';

export default function Horoscope() {
  const [selected, setSelected] = useState(0); // Aries default
  const [tab, setTab] = useState('Today');
  const [revealed, setRevealed] = useState(true);

  const selectSign = (i) => {
    setSelected(i);
    setRevealed(true);
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20">
        <HoroHeader />
        <RashiSelector selected={selected} onSelect={selectSign} />

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="mt-12 space-y-6"
            >
              <TabSelector active={tab} onChange={setTab} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab + selected}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <HeroPrediction selected={selected} tab={tab} />

                  {tab === 'This Week' && <WeeklyOverview selected={selected} />}
                  {tab === 'This Month' && <MonthlyHighlights selected={selected} />}

                  {tab === 'Today' && (
                    <>
                      <AspectCards selected={selected} />
                      <LuckyStrip />
                    </>
                  )}

                  <PlanetaryInfluence />
                  <AdviceOfDay />
                  <HoroAiInsights />

                  {tab === 'Today' && <PanchangToday />}
                  <CompatibilityToday selected={selected} />
                  <NotablePersonalities selected={selected} />
                  <ShareAndSave selected={selected} />
                </motion.div>
              </AnimatePresence>

              <div className="pt-4">
                <HoroNav selected={selected} setSelected={setSelected} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}