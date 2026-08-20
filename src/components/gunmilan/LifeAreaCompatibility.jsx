import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function LifeAreaCompatibility({ calculatedData }) {
  const { lang } = useLang();
  const la = calculatedData?.lifeAreas || {
    love: 85,
    career: 80,
    health: 75,
    family: 82,
    physical: 78,
    spiritual: 80,
  };

  const getBadge = (pct) => {
    if (pct >= 80) return { label: lang === 'hinglish' ? 'Uttam (Best)' : 'Excellent', type: 'teal' };
    if (pct >= 60) return { label: lang === 'hinglish' ? 'Achha (Good)' : 'Good', type: 'copper' };
    if (pct >= 40) return { label: lang === 'hinglish' ? 'Madhyam' : 'Moderate', type: 'amber' };
    return { label: lang === 'hinglish' ? 'Dhyan Dein' : 'Attention', type: 'rose' };
  };

  const areas = [
    {
      icon: '♡',
      title: lang === 'hinglish' ? 'Prem & Aakarshan' : 'Love & Attraction',
      pct: la.love,
      badge: getBadge(la.love).label,
      badgeType: getBadge(la.love).type,
      desc:
        lang === 'hinglish'
          ? 'Bhavnatmak sneh, romantic anukoolta aur aapsi prem sambandh ka gehra bandhan.'
          : 'Emotional warmth, romantic resonance, and mutual psychological attraction.',
    },
    {
      icon: '₹',
      title: lang === 'hinglish' ? 'Career & Samridhi' : 'Career & Prosperity',
      pct: la.career,
      badge: getBadge(la.career).label,
      badgeType: getBadge(la.career).type,
      desc:
        lang === 'hinglish'
          ? 'Sajha aakankshayein, boudhik talmel aur aarthik vikas me ek doosre ka sahyog.'
          : 'Shared ambitions, intellectual synchronization, and vocational support.',
    },
    {
      icon: '⚕',
      title: lang === 'hinglish' ? 'Swasthya & Urja' : 'Health & Vitality',
      pct: la.health,
      badge: getBadge(la.health).label,
      badgeType: getBadge(la.health).type,
      desc:
        lang === 'hinglish'
          ? 'Nadi aur Tara ka shubh sanyog lambi aayu aur sharirik swasthya ko badhava deta hai.'
          : 'Nadi & Tara harmony promoting physiological wellness and longevity.',
    },
    {
      icon: '🏠',
      title: lang === 'hinglish' ? 'Parivar & Shanti' : 'Family & Harmony',
      pct: la.family,
      badge: getBadge(la.family).label,
      badgeType: getBadge(la.family).type,
      desc:
        lang === 'hinglish'
          ? 'Ghar-parivar ke sanskar, aapsi samman aur parivarik vikas me poori shanti.'
          : 'Domestic values, family prosperity, and constructive generational growth.',
    },
    {
      icon: '♂',
      title: lang === 'hinglish' ? 'Sharirik Anukoolta' : 'Physical Compatibility',
      pct: la.physical,
      badge: getBadge(la.physical).label,
      badgeType: getBadge(la.physical).type,
      desc:
        lang === 'hinglish'
          ? 'Yoni milan se aapsi aakarshan aur jeevan-urja ka anukool santulan bana rehta hai.'
          : 'Yoni attraction and temperamental vitality balance between partners.',
    },
    {
      icon: '✦',
      title: lang === 'hinglish' ? 'Adhyatmik Marg' : 'Spiritual Path',
      pct: la.spiritual,
      badge: getBadge(la.spiritual).label,
      badgeType: getBadge(la.spiritual).type,
      desc:
        lang === 'hinglish'
          ? 'Gana samanjasya, dharmik dharana aur naitik mulyon par sajha vishwas.'
          : 'Gana temperament alignment, ethical values, and shared dharmic philosophy.',
    },
  ];

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
          {lang === 'hinglish' ? 'Jeevan Kshetron Me Anukoolta' : 'Compatibility by Life Area'}
        </h3>
        <p className="text-xs" style={{ color: 'var(--col-copper)' }}>
          जीवन क्षेत्र अनुकूलता
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="glass-card flex flex-col justify-between"
            style={{ padding: 22 }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--col-copper)', fontSize: 16 }}>{a.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: 'var(--col-moonstone)' }}>
                    {a.title}
                  </span>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={
                    a.badgeType === 'teal'
                      ? { background: 'rgba(42,171,168,0.12)', color: 'var(--col-teal)', border: '1px solid rgba(42,171,168,0.3)' }
                      : a.badgeType === 'copper'
                      ? { background: 'rgba(200,130,42,0.12)', color: 'var(--col-copper)', border: '1px solid rgba(200,130,42,0.3)' }
                      : a.badgeType === 'amber'
                      ? { background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }
                      : { background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }
                  }
                >
                  {a.badge}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: 'var(--col-moonstone-dim)' }}>
                <span>{lang === 'hinglish' ? 'Anukoolta' : 'Score'}</span>
                <span className="font-mono-num font-bold" style={{ color: 'var(--col-copper)' }}>
                  {a.pct}%
                </span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${a.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: a.pct >= 80 ? 'var(--col-teal)' : a.pct >= 60 ? 'var(--col-copper)' : '#F59E0B',
                    borderRadius: 'var(--r-full)',
                  }}
                />
              </div>
            </div>

            <p className="mt-4 text-xs" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.6 }}>
              {a.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
