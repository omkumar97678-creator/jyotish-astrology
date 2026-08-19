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

export default function GmResults({ tryAgain, p1, p2, ashtakoot, analysisResult }) {
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
        <CoupleHeader p1={p1} p2={p2} ashtakoot={ashtakoot} />

        {/* Section 2: Expandable 8 Guna Breakdown */}
        <GunaTable gunaScores={ashtakoot?.gunas} />

        {/* Section 3: Nakshatra Compatibility */}
        <NakshatraAnalysis p1={p1} p2={p2} ashtakoot={ashtakoot} />

        {/* Section 4: Compatibility by Life Area */}
        <LifeAreaCompatibility ashtakoot={ashtakoot} />

        {/* Section 5: Manglik Analysis & Remedies */}
        <ManglikAnalysis p1={p1} p2={p2} ashtakoot={ashtakoot} />

        {/* Section 6: Vedha & Rajju Checks */}
        <VedhaRajjuSection ashtakoot={ashtakoot} />

        {/* Section 7: Detailed Astrological Analysis */}
        <AiAnalysisSection analysis={analysisResult} ashtakoot={ashtakoot} />

        {/* Section 8: Auspicious Wedding Elements */}
        <WeddingElements ashtakoot={ashtakoot} />

        {/* Bottom Actions & Share Row */}
        <GmActions tryAgain={tryAgain} p1={p1} p2={p2} ashtakoot={ashtakoot} />
      </motion.div>
    </AnimatePresence>
  );
}