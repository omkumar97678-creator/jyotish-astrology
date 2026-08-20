import React, { useState, useEffect } from 'react';
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
import { getHoroscopeForSign, getOrGenerateHoroscope } from '@/lib/horoscopeEngine';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { signs } from '@/components/horoscope/horoData';

export default function Horoscope() {
  const [selected, setSelected] = useState(0); // 0 = Aries
  const [tab, setTab] = useState('Today');
  const [revealed, setRevealed] = useState(true);
  const [horoData, setHoroData] = useState(() => getHoroscopeForSign(0, 'Today', 'en'));
  const { lang } = useLang();
  const { user } = useAuth();

  // Load user's saved preference or natal rashi on mount
  useEffect(() => {
    const loadUserPreference = async () => {
      if (user && isSupabaseConfigured()) {
        try {
          const { data } = await supabase
            .from('horoscope_preferences')
            .select('rashi')
            .eq('user_id', user.id)
            .single();

          if (data?.rashi) {
            const idx = signs.findIndex(
              (s) => s.en.toLowerCase() === data.rashi.toLowerCase() || s.name.toLowerCase() === data.rashi.toLowerCase()
            );
            if (idx >= 0) setSelected(idx);
            return;
          }
        } catch {
          /* ignore */
        }
      }

      // Fallback to localStorage kundli rashi
      try {
        const stored = localStorage.getItem('kundli_data');
        if (stored) {
          const parsed = JSON.parse(stored);
          const rashiStr = String(parsed.rashi || parsed.rashiSign || '').split(' ')[0];
          const idx = signs.findIndex((s) => s.en.toLowerCase() === rashiStr.toLowerCase() || s.hi.toLowerCase() === rashiStr.toLowerCase());
          if (idx >= 0) setSelected(idx);
        }
      } catch {
        /* ignore */
      }
    };

    loadUserPreference();
  }, [user]);

  // Fetch or retrieve cached horoscope data
  useEffect(() => {
    let isMounted = true;

    const fetchHoroscope = async () => {
      const data = await getOrGenerateHoroscope(selected, tab, lang);
      if (isMounted) {
        setHoroData(data);
      }
    };

    fetchHoroscope();
    return () => {
      isMounted = false;
    };
  }, [selected, tab, lang]);

  // Save rashi preference to Supabase
  const saveHoroscopePreference = async (rashiName) => {
    if (!isSupabaseConfigured()) return;
    try {
      const isUUID = (str) =>
        typeof str === 'string' &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

      const validUserId = isUUID(user?.id) ? user.id : null;

      if (validUserId) {
        // Check if user already has a preference row
        const { data: existing } = await supabase
          .from('horoscope_preferences')
          .select('id')
          .eq('user_id', validUserId)
          .maybeSingle();

        if (existing?.id) {
          const { error } = await supabase
            .from('horoscope_preferences')
            .update({ rashi: rashiName, notification_enabled: false })
            .eq('id', existing.id);
          if (error) console.error('Preference update error:', error);
          else console.log('Horoscope preference updated ✅');
        } else {
          const { error } = await supabase
            .from('horoscope_preferences')
            .insert({ user_id: validUserId, rashi: rashiName, notification_enabled: false });
          if (error) console.error('Preference insert error:', error);
          else console.log('Horoscope preference saved ✅');
        }
      } else {
        // Guest session: insert preference
        const { error } = await supabase
          .from('horoscope_preferences')
          .insert({ rashi: rashiName, notification_enabled: false });
        if (error) console.error('Guest preference insert error:', error);
        else console.log('Horoscope preference saved (guest) ✅');
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };


  const selectSign = (i) => {
    setSelected(i);
    setRevealed(true);
    const rashiName = signs[i]?.en || 'Aries';
    saveHoroscopePreference(rashiName);
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
                  <HeroPrediction selected={selected} tab={tab} data={horoData} />

                  {tab === 'This Week' && <WeeklyOverview selected={selected} />}
                  {tab === 'This Month' && <MonthlyHighlights selected={selected} />}

                  {tab === 'Today' && (
                    <>
                      <AspectCards aspects={horoData?.aspects} />
                      <LuckyStrip lucky={horoData?.lucky} />
                    </>
                  )}

                  <PlanetaryInfluence influences={horoData?.planetaryInfluences} />
                  <AdviceOfDay advice={horoData?.advice} />
                  <HoroAiInsights data={horoData} />

                  {tab === 'Today' && <PanchangToday panchang={horoData?.panchang} />}
                  <CompatibilityToday selected={selected} />
                  <NotablePersonalities selected={selected} />
                  <ShareAndSave selected={selected} />
                </motion.div>
              </AnimatePresence>

              <div className="pt-4">
                <HoroNav selected={selected} setSelected={selectSign} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}