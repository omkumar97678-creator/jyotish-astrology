import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import GmHeader from '@/components/gunmilan/GmHeader';
import PersonCard from '@/components/gunmilan/PersonCard';
import GmResults from '@/components/gunmilan/GmResults';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

const empty = {
  name: '',
  dob: { day: '', month: '', year: '' },
  time: { hour: '', minute: '', period: 'AM' },
  unknownTime: false,
  birthPlace: '',
};

export default function GunMilan() {
  const { lang } = useLang();
  const [p1, setP1] = useState(empty);
  const [p2, setP2] = useState(empty);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = React.useRef(null);

  const onMatch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
      requestAnimationFrame(() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }));
    }, 700);
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
                ♡
              </motion.span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="btn-primary w-full justify-center" style={{ padding: '16px 40px', fontSize: '1.05rem' }} onClick={onMatch} disabled={loading}>
              {loading ? (lang === 'hinglish' ? 'Analysis Ho Rahi Hai...' : 'Analyzing...') : t.check_btn[lang]}
            </button>
            <p className="mt-3 text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>
              {t.gunmilan_note[lang]}
            </p>
          </div>
        </div>

        {showResults && <GmResults tryAgain={tryAgain} p1={p1} p2={p2} />}
      </main>
    </div>
  );
}