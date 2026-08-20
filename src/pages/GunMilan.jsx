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
import {
  getNakshatraFromDOB,
  getRashiFromDOB,
  isManglik as checkManglik,
  calculateGunas,
  getCompatibilityLabel,
  calculateLifeAreaScores,
} from '@/lib/gunMilanCalc';

const isUUID = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

const formatDob = (dob) => {
  if (!dob) return null;
  const y = parseInt(dob.year, 10);
  const m = parseInt(dob.month, 10);
  const d = parseInt(dob.day, 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};

const formatTime = (time, unknown) => {
  if (unknown || !time) return null;
  let h = parseInt(time.hour, 10);
  const m = parseInt(time.minute || '0', 10);
  if (isNaN(h)) return null;
  if (time.period === 'PM' && h < 12) h += 12;
  if (time.period === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${String(isNaN(m) ? 0 : m).padStart(2, '0')}:00`;
};

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
  const [calculatedData, setCalculatedData] = useState(null);

  const formRef = React.useRef(null);

  const saveGunMilanReport = async (calc, analysis) => {
    if (!isSupabaseConfigured()) {
      return;
    }

    try {
      const dob1 = formatDob(p1.dob) || '2004-09-08';
      const dob2 = formatDob(p2.dob) || '2000-09-15';

      const insertPayload = {
        user_id: isUUID(user?.id) ? user.id : null,
        person1_name: p1.name || 'Person 1',
        person1_dob: dob1,
        person1_time: formatTime(p1.time, p1.unknownTime),
        person1_place: p1.birthPlace || '',
        person1_rashi: calc?.rashi1 || 'Scorpio (Vrishchik)',
        person1_nakshatra: calc?.nakshatra1 || 'Jyeshtha',
        person1_is_manglik: Boolean(calc?.manglik1),
        person2_name: p2.name || 'Person 2',
        person2_dob: dob2,
        person2_time: formatTime(p2.time, p2.unknownTime),
        person2_place: p2.birthPlace || '',
        person2_rashi: calc?.rashi2 || 'Virgo (Kanya)',
        person2_nakshatra: calc?.nakshatra2 || 'Hasta',
        person2_is_manglik: Boolean(calc?.manglik2),
        total_score: calc?.totalScore || 28,
        guna_scores: calc?.gunas || {},
        compatibility_areas: calc?.lifeAreas || {},
        ai_analysis: typeof analysis === 'string' ? analysis : (analysis?.verdict || 'Vedic compatibility computed'),
      };

      const { data, error } = await supabase
        .from('gun_milan_reports')
        .insert(insertPayload)
        .select();

      if (error) {
        console.error('Supabase gun_milan_reports save error:', error);
      } else {
        console.log('Gun Milan report saved ✅', data);
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const onMatch = async () => {
    setLoading(true);

    try {
      // 1. Calculate Real Values From Input DOBs
      const dob1 = formatDob(p1.dob) || '2004-09-08';
      const dob2 = formatDob(p2.dob) || '2000-09-15';

      const nakshatra1 = getNakshatraFromDOB(dob1);
      const nakshatra2 = getNakshatraFromDOB(dob2);
      const rashi1 = getRashiFromDOB(dob1);
      const rashi2 = getRashiFromDOB(dob2);
      const manglik1 = checkManglik(dob1);
      const manglik2 = checkManglik(dob2);

      // 2. Calculate Ashtakoot Gunas (36 Gunas)
      const gunaResult = calculateGunas(nakshatra1, nakshatra2);
      const lifeAreaScores = calculateLifeAreaScores(gunaResult.gunas);
      const label = getCompatibilityLabel(gunaResult.totalScore);

      const computed = {
        nakshatra1,
        nakshatra2,
        rashi1,
        rashi2,
        manglik1,
        manglik2,
        gunas: gunaResult.gunas,
        totalScore: gunaResult.totalScore,
        nadi1: gunaResult.nadi1,
        nadi2: gunaResult.nadi2,
        gana1: gunaResult.gana1,
        gana2: gunaResult.gana2,
        label,
        lifeAreas: lifeAreaScores,
      };

      setCalculatedData(computed);

      // 3. Generate AI analysis with REAL data
      const analysis = await generateGunMilanAnalysis(
        {
          name: p1.name || 'Person 1',
          rashi: rashi1,
          nakshatra: nakshatra1,
          isManglik: manglik1,
        },
        {
          name: p2.name || 'Person 2',
          rashi: rashi2,
          nakshatra: nakshatra2,
          isManglik: manglik2,
        },
        gunaResult.totalScore,
        gunaResult.gunas
      );
      setAnalysisResult(analysis);

      // 4. Save report to Supabase
      await saveGunMilanReport(computed, analysis);
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

          <div className="mt-10 text-center flex justify-center">
            <motion.button
              onClick={onMatch}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-copper text-base font-bold tracking-wide cursor-pointer"
              style={{
                opacity: loading ? 0.75 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2.5">
                  <span className="animate-spin text-lg">✦</span> {t.calculating[lang]}...
                </span>
              ) : (
                <span className="flex items-center gap-2.5">
                  <span className="text-lg">✦</span> {t.check_compatibility[lang]}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {showResults && (
          <GmResults
            tryAgain={tryAgain}
            p1={p1}
            p2={p2}
            calculatedData={calculatedData}
            aiAnalysis={analysisResult}
          />
        )}
      </main>
    </div>
  );
}