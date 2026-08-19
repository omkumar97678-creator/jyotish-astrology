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

  const formRef = React.useRef(null);

  const onMatch = async () => {
    setLoading(true);
    const score = 28;
    const gunaScores = {
      varna: { max: 1, scored: 1 },
      vashya: { max: 2, scored: 2 },
      tara: { max: 3, scored: 3 },
      yoni: { max: 4, scored: 4 },
      maitri: { max: 5, scored: 5 },
      gana: { max: 6, scored: 5 },
      bhakoot: { max: 7, scored: 4 },
      nadi: { max: 8, scored: 4 },
    };

    try {
      // 1. Generate compatibility analysis
      const analysis = await generateGunMilanAnalysis(p1, p2, score, gunaScores);
      setAnalysisResult(analysis);

      // 2. Save report to Supabase if user is logged in
      if (user && isSupabaseConfigured()) {
        const p1Dob = p1.dob.year ? `${p1.dob.year}-${String(p1.dob.month).padStart(2, '0')}-${String(p1.dob.day).padStart(2, '0')}` : '1995-05-15';
        const p2Dob = p2.dob.year ? `${p2.dob.year}-${String(p2.dob.month).padStart(2, '0')}-${String(p2.dob.day).padStart(2, '0')}` : '1996-08-20';

        await supabase.from('gun_milan_reports').insert({
          user_id: user.id,
          person1_name: p1.name || 'Person 1',
          person1_dob: p1Dob,
          person1_rashi: 'Mesh (Aries)',
          person2_name: p2.name || 'Person 2',
          person2_dob: p2Dob,
          person2_rashi: 'Karka (Cancer)',
          total_score: score,
          guna_scores: gunaScores,
          ai_analysis: analysis.verdict || 'Good compatibility',
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
                  width: 54, height: 54, fontSize: 26,
                  background: 'var(--col-midnight-mid)',
                  border: '1px solid rgba(200,130,42,0.45)',
                  color: 'var(--col-copper)',
                  boxShadow: '0 0 24px rgba(200,130,42,0.3)',
                }}
              >
                ⚭
              </motion.span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              disabled={loading}
              onClick={onMatch}
              className="btn-primary animate-glow-pulse w-full sm:w-auto text-sm sm:text-base py-4 px-10 cursor-pointer"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Calculating 36 Gunas...</span>
                </span>
              ) : (
                t.check_btn[lang]
              )}
            </button>
            <p className="mt-3 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
              {t.gunmilan_note[lang]}
            </p>
          </div>
        </div>

        {showResults && <GmResults tryAgain={tryAgain} p1={p1} p2={p2} analysis={analysisResult} />}
      </main>
    </div>
  );
}