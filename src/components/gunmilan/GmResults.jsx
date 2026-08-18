import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CoupleHeader from './CoupleHeader';
import GunaTable from './GunaTable';
import NakshatraAnalysis from './NakshatraAnalysis';
import LifeAreaCompatibility from './LifeAreaCompatibility';
import ManglikAnalysis from './ManglikAnalysis';
import VedhaRajjuSection from './VedhaRajjuSection';
import AiAnalysisSection from './AiAnalysisSection';
import WeddingElements from './WeddingElements';
import GmActions from './GmActions';

export default function GmResults({ tryAgain, p1, p2 }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 space-y-8"
      >
        {/* Section 1: Couple Header */}
        <CoupleHeader p1={p1} p2={p2} />

        {/* Section 2: Expandable 8 Guna Breakdown */}
        <GunaTable />

        {/* Section 3: Nakshatra Compatibility */}
        <NakshatraAnalysis />

        {/* Section 4: Compatibility by Life Area */}
        <LifeAreaCompatibility />

        {/* Section 5: Manglik Analysis & Remedies */}
        <ManglikAnalysis p1={p1} p2={p2} />

        {/* Section 6: Vedha & Rajju Checks */}
        <VedhaRajjuSection />

        {/* Section 7: Detailed AI Analysis */}
        <AiAnalysisSection />

        {/* Section 8: Auspicious Wedding Elements */}
        <WeddingElements />

        {/* Bottom Actions & Share Row */}
        <GmActions tryAgain={tryAgain} p1={p1} p2={p2} />
      </motion.div>
    </AnimatePresence>
  );
}