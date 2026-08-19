import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import GmHeader from '@/components/gunmilan/GmHeader';
import PersonCard from '@/components/gunmilan/PersonCard';
import GmResults from '@/components/gunmilan/GmResults';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { t } from '@/translations';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { generateGunMilanAnalysis } from '@/lib/aiService';
import { calculateAshtakoot } from '@/lib/vedicAstrology';

const empty = {
  name: '',
  dob: { day: '', month: '', year: '' },
  time: { hour: '', minute: '', period: 'AM' },
  unknownTime: false,
  birthPlace: '',
};

export default function GunMilan() {
  const { lang } = useLang();
  const { user } = useAuth();
  const [p1, setP1] = useState(empty);
  const [p2, setP2] = useState(empty);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [ashtakootResult, setAshtakootResult] = useState(null);

  const formRef = React.useRef(null);

  const onMatch = async () => {
    setLoading(true);

    try {
      // 1. Calculate Real Vedic Ashtakoot Guna Milan (36 Gunas)
      const ashtakoot = calculateAshtakoot(p1, p2);
      setAshtakootResult(ashtakoot);

      const score = ashtakoot.totalScore;
      const gunaScores = ashtakoot.gunas;

      // 2. Generate compatibility analysis via AI
      const analysis = await generateGunMilanAnalysis(
        { ...p1, rashi: ashtakoot.person1.rashi, nakshatra: ashtakoot.person1.nakshatra },
        { ...p2, rashi: ashtakoot.person2.rashi, nakshatra: ashtakoot.person2.nakshatra },
        score,
        gunaScores
      );
      setAnalysisResult(analysis);

      // 3. Save report to Supabase if user is logged in
      if (user && isSupabaseConfigured()) {
        const p1Dob = p1.dob?.year ? `${p1.dob.year}-${String(p1.dob.month || 1).padStart(2, '0')}-${String(p1.dob.day || 1).padStart(2, '0')}` : '1995-05-15';
        const p2Dob = p2.dob?.year ? `${p2.dob.year}-${String(p2.dob.month || 1).padStart(2, '0')}-${String(p2.dob.day || 1).padStart(2, '0')}` : '1996-08-20';

        await supabase.from('gun_milan_reports').insert({
          user_id: user.id,
          person1_name: p1.name || 'Person 1',
          person1_dob: p1Dob,
          person1_rashi: ashtakoot.person1.rashi,
          person2_name: p2.name || 'Person 2',
          person2_dob: p2Dob,
          person2_rashi: ashtakoot.person2.rashi,
          total_score: score,
          guna_scores: gunaScores,
          ai_analysis: analysis?.verdict || 'Vedic compatibility computed',
        });
      }
    } catch (e) {
      console.warn('Gun Milan calculation or DB save error:', e);
    } finally {
      setLoading(false);
      setShowResults(true);
      requestAnimationFrame(() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }));
    }
  };

  const tryAgain = () => {
    setShowResults(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--col-midnight)' }}>
      <StarField count={120} />
      <main className="relative z-10 max-w-5xl mx-auto px-5 pt-28 pb-20">
        <GmHeader />

        <div ref={formRef} className="mt-10 relative">
          <div className="grid gap-6 md:grid-cols-2 relative">
            <PersonCard title={t.person1_label[lang]} data={p1} setData={setP1} glow="copper" icon="♂" />
            <PersonCard title={t.person2_label[lang]} data={p2} setData={setP2} glow="teal" icon="♀" />
            <div
              className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ pointerEvents: 'none' }}
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 52,
                  height: 52,
                  background: 'rgba(10,12,18,0.92)',
                  border: '1px solid var(--col-copper)',
                  boxShadow: '0 0 24px rgba(200,130,42,0.4)',
                  color: 'var(--col-copper)',
                  fontSize: 22,
                }}
              >
                ♥
              </motion.span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              onClick={onMatch}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-copper px-10 py-3.5 text-base font-semibold"
              style={{
                borderRadius: 'var(--r-full)',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin text-sm">✦</span> {t.calculating[lang]}...
                </span>
              ) : (
                `✦ ${t.check_compatibility[lang]}`
              )}
            </motion.button>
          </div>
        </div>

        {showResults && (
          <GmResults
            tryAgain={tryAgain}
            p1={p1}
            p2={p2}
            ashtakoot={ashtakootResult}
            analysisResult={analysisResult}
          />
        )}
      </main>
    </div>
  );
}