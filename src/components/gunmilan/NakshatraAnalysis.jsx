import React from 'react';
import { motion } from 'framer-motion';
import { NAKSHATRA_DETAILS } from '@/lib/gunMilanCalc';
import { useLang } from '@/context/LanguageContext';

export default function NakshatraAnalysis({ p1, p2, calculatedData }) {
  const { lang } = useLang();
  const boyName = p1?.name?.trim() || 'Person 1';
  const girlName = p2?.name?.trim() || 'Person 2';

  const rawNak1 = calculatedData?.nakshatra1 || 'Ashwini';
  const rawNak2 = calculatedData?.nakshatra2 || 'Pushya';

  const cleanName = (str) => {
    if (!str) return 'Ashwini';
    const first = String(str).split(' ')[0].replace(/[^a-zA-Z]/g, '');
    return NAKSHATRA_DETAILS[first] ? first : (Object.keys(NAKSHATRA_DETAILS).find(k => str.includes(k)) || 'Ashwini');
  };

  const nak1 = cleanName(rawNak1);
  const nak2 = cleanName(rawNak2);

  const details1 = NAKSHATRA_DETAILS[nak1] || { ruler: 'Mercury', quality: 'Sharp', symbol: 'Star' };
  const details2 = NAKSHATRA_DETAILS[nak2] || { ruler: 'Moon', quality: 'Soft', symbol: 'Hand' };

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
          {lang === 'hinglish' ? 'Nakshatra Milan Vishleshan' : 'Nakshatra Analysis'}
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          नक्षत्र विश्लेषण
        </p>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <div className="grid gap-6 md:grid-cols-2 pb-6 border-b border-[var(--col-glass-border)]">
          {/* Left: Boy's Nakshatra */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--col-copper)' }}>
              {boyName} ka Nakshatra
            </span>
            <div className="font-display text-2xl" style={{ color: 'var(--col-copper)' }}>
              {nak1}
            </div>
            <div className="space-y-1.5 text-xs pt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Swami Grah (Ruler):' : 'Ruler Planet:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details1.ruler}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Gan (Gana):' : 'Gana Temperament:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.gana1 || 'Deva'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Naadi Urja:' : 'Nadi Energy:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.nadi1 || 'Vata'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Gun & Prateek:' : 'Quality & Symbol:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details1.quality} • {details1.symbol}</span>
              </div>
            </div>
          </div>

          {/* Right: Girl's Nakshatra */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--col-teal)' }}>
              {girlName} ka Nakshatra
            </span>
            <div className="font-display text-2xl" style={{ color: 'var(--col-copper)' }}>
              {nak2}
            </div>
            <div className="space-y-1.5 text-xs pt-1" style={{ color: 'var(--col-moonstone-dim)' }}>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Swami Grah (Ruler):' : 'Ruler Planet:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details2.ruler}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Gan (Gana):' : 'Gana Temperament:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.gana2 || 'Deva'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Naadi Urja:' : 'Nadi Energy:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{calculatedData?.nadi2 || 'Vata'}</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>{lang === 'hinglish' ? 'Gun & Prateek:' : 'Quality & Symbol:'}</span>
                <span className="font-medium" style={{ color: 'var(--col-moonstone)' }}>{details2.quality} • {details2.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility verdict description */}
        <div className="pt-5">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ color: 'var(--col-copper)', fontSize: 16 }}>✦</span>
            <h4 className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
              {lang === 'hinglish' ? `Nakshatra Sanyog: ${nak1} aur ${nak2}` : `Nakshatra Interplay: ${nak1} & ${nak2}`}
            </h4>
          </div>
          <p className="text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.65 }}>
            {lang === 'hinglish'
              ? calculatedData?.nadi1 === calculatedData?.nadi2
                ? `Dono ke janam nakshatra ek hi ${calculatedData?.nadi1} Naadi se aate hain. Spiritual sadhana aur aapas me swasthya ka dhyan rakhne se uttam santulan bana rehta hai.`
                : `Alag-alag Naadi (${calculatedData?.nadi1} aur ${calculatedData?.nadi2}) hone se anukool sharirik va anugatik santulan milta hai, jo swasthya aur vaivahik sukh ke liye bahut shubh hai.`
              : calculatedData?.nadi1 === calculatedData?.nadi2
              ? `Both birth stars belong to the ${calculatedData?.nadi1} Nadi family. Chanting spiritual mantras or practicing mutual wellness mindfulness helps maintain vital balance.`
              : `Different Nadi energies (${calculatedData?.nadi1} and ${calculatedData?.nadi2}) indicate excellent physiological and genetic compatibility, bringing strong health vitality and harmony to the relationship.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
