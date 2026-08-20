import React from 'react';
import { motion } from 'framer-motion';
import { NAKSHATRA_NUM } from '@/lib/gunMilanCalc';
import { useLang } from '@/context/LanguageContext';

export default function VedhaRajjuSection({ calculatedData }) {
  const { lang } = useLang();
  const rawNak1 = calculatedData?.nakshatra1 || 'Ashwini';
  const rawNak2 = calculatedData?.nakshatra2 || 'Pushya';

  const cleanName = (str) => {
    if (!str) return 'Ashwini';
    const first = String(str).split(' ')[0].replace(/[^a-zA-Z]/g, '');
    return NAKSHATRA_NUM[first] ? first : (Object.keys(NAKSHATRA_NUM).find(k => str.includes(k)) || 'Ashwini');
  };

  const nak1 = cleanName(rawNak1);
  const nak2 = cleanName(rawNak2);

  const n1 = NAKSHATRA_NUM[nak1] || 1;
  const n2 = NAKSHATRA_NUM[nak2] || 1;

  // Rajju Grouping (Siro, Kantha, Nabhi, Kati, Pada)
  const getRajjuType = (num) => {
    const rem = num % 5;
    if (rem === 1) return 'Pada (Feet)';
    if (rem === 2) return 'Kati (Waist)';
    if (rem === 3) return 'Nabhi (Navel)';
    if (rem === 4) return 'Kantha (Neck)';
    return 'Siro (Head)';
  };

  const rajju1 = getRajjuType(n1);
  const rajju2 = getRajjuType(n2);
  const isRajjuDosha = rajju1 === rajju2;

  // Vedha check
  const isVedha = Math.abs(n1 - n2) === 14 || Math.abs(n1 - n2) === 9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div>
        <h3 className="font-display text-xl" style={{ color: 'var(--col-moonstone)' }}>
          {lang === 'hinglish' ? 'Anya Anukoolta Parikshan' : 'Additional Compatibility Checks'}
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          वेध और राज्जु परीक्षण
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Card 1: Rajju Check */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card flex flex-col justify-between"
          style={{
            padding: 24,
            border: !isRajjuDosha ? '1px solid rgba(42, 171, 168, 0.35)' : '1px solid rgba(245, 158, 11, 0.35)',
            background: !isRajjuDosha ? 'rgba(42, 171, 168, 0.05)' : 'rgba(245, 158, 11, 0.05)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                {lang === 'hinglish' ? 'Rajju Parikshan (Aayu & Swasthya)' : 'Rajju (Longevity & Health Check)'}
              </h4>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  background: !isRajjuDosha ? 'rgba(42, 171, 168, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: !isRajjuDosha ? 'var(--col-teal)' : '#F59E0B',
                  border: `1px solid ${!isRajjuDosha ? 'rgba(42, 171, 168, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                }}
              >
                {!isRajjuDosha ? (lang === 'hinglish' ? '✓ Shubh (Pass)' : '✓ Pass (शुभ)') : (lang === 'hinglish' ? '⚠ Savdhani (Caution)' : '⚠ Caution (मध्यम)')}
              </span>
            </div>
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: !isRajjuDosha ? 'var(--col-teal)' : '#F59E0B' }}
            >
              {!isRajjuDosha
                ? (lang === 'hinglish' ? '✓ Rajju Dosh Nahi Hai' : '✓ No Rajju Dosha')
                : (lang === 'hinglish' ? `⚠ Ek Hi Rajju Group (${rajju1})` : `⚠ Same Rajju Group (${rajju1})`)}
            </div>
            <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {!isRajjuDosha
                ? lang === 'hinglish'
                  ? `Dono ke janam nakshatra alag-alag Rajju shreni (${rajju1} aur ${rajju2}) me aate hain, jo lambi aayu aur sukhad vaivahik jeevan ke liye atyant shubh hai.`
                  : `Partners' birth stars fall in distinct Rajju bands (${rajju1} and ${rajju2}), which is highly auspicious for long marital happiness and mutual well-being.`
                : lang === 'hinglish'
                ? `Dono nakshatra ${rajju1} Rajju me aate hain. Vedic jyotish ke anusar uchh Guna aur Bhakoot ank iska uchit santulan bana dete hain.`
                : `Both nakshatras align with ${rajju1} Rajju. In Vedic astrology, strong Guna and Bhakoot points provide effective protective counter-balance.`}
            </p>
          </div>
        </motion.div>

        {/* Card 2: Vedha Check */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card flex flex-col justify-between"
          style={{
            padding: 24,
            border: !isVedha ? '1px solid rgba(42, 171, 168, 0.35)' : '1px solid rgba(245, 158, 11, 0.35)',
            background: !isVedha ? 'rgba(42, 171, 168, 0.05)' : 'rgba(245, 158, 11, 0.05)',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-base" style={{ color: 'var(--col-moonstone)' }}>
                {lang === 'hinglish' ? 'Vedha Parikshan (Grah Pratikoolta)' : 'Vedha (Planetary Resistance Check)'}
              </h4>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{
                  background: !isVedha ? 'rgba(42, 171, 168, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: !isVedha ? 'var(--col-teal)' : '#F59E0B',
                  border: `1px solid ${!isVedha ? 'rgba(42, 171, 168, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                }}
              >
                {!isVedha ? (lang === 'hinglish' ? '✓ Shubh (Pass)' : '✓ Pass (शुभ)') : (lang === 'hinglish' ? '⚠ Savdhani (Caution)' : '⚠ Caution (मध्यम)')}
              </span>
            </div>
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: !isVedha ? 'var(--col-teal)' : '#F59E0B' }}
            >
              {!isVedha
                ? (lang === 'hinglish' ? '✓ Vedha Dosh Mukt' : '✓ Vedha Dosha Free')
                : (lang === 'hinglish' ? '⚠ Nakshatra Vedha Sanyog' : '⚠ Nakshatra Vedha Present')}
            </div>
            <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {!isVedha
                ? lang === 'hinglish'
                  ? 'Dono nakshatron ke beech koi Vedha (rukawat) nahi hai. Yatra, jeevan shaili aur parivarik shanti me poora sahyog rahega.'
                  : 'No adverse magnetic star resistance (Vedha) between birth constellations. Promotes unhindered mutual understanding and life progress.'
                : lang === 'hinglish'
                ? 'Nakshatra Vedha ki sthiti me shant baat-cheet aur aapsi samman se har chunauti aasaani se hal ho sakti hai.'
                : 'Minor star friction detected. Open communication and mutual respect will easily harmonize day-to-day decisions.'}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
