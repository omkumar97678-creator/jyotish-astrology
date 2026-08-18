import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function BhavaAnalysis() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const houses = [
    { n: '1st', sk: 'Lagna Bhava', domain: lang === 'hinglish' ? 'Vyaktitva & Sharir' : 'Self & Personality', planet: lang === 'hinglish' ? 'Surya, Shukra' : 'Sun, Venus', reading: lang === 'hinglish' ? 'Mazboot netritva kshamata, aakarshak vyaktitva.' : 'Strong leadership presence, charismatic personality' },
    { n: '2nd', sk: 'Dhana Bhava', domain: lang === 'hinglish' ? 'Dhan & Kutumb' : 'Wealth & Family', planet: lang === 'hinglish' ? 'Rikt (Empty)' : 'Empty', reading: lang === 'hinglish' ? 'Lagaatar prayas se aarthik vriddhi.' : 'Financial growth through consistent effort' },
    { n: '3rd', sk: 'Sahaja Bhava', domain: lang === 'hinglish' ? 'Sahas & Bhai-behen' : 'Siblings & Courage', planet: lang === 'hinglish' ? 'Budh' : 'Mercury', reading: lang === 'hinglish' ? 'Teez communication skills aur gyaani sahakar.' : 'Sharp communication skills, intellectual siblings' },
    { n: '4th', sk: 'Sukha Bhava', domain: lang === 'hinglish' ? 'Ghar & Sukh' : 'Home & Happiness', planet: lang === 'hinglish' ? 'Rikt' : 'Empty', reading: lang === 'hinglish' ? 'Shant gharelu vatavaran, mata se ghanishth rishta.' : 'Peaceful home environment, strong maternal bond' },
    { n: '5th', sk: 'Putra Bhava', domain: lang === 'hinglish' ? 'Santan & Rachnatmakta' : 'Children & Creativity', planet: lang === 'hinglish' ? 'Rikt' : 'Empty', reading: lang === 'hinglish' ? 'Rachnatmak buddhi aur shrestha gyaan.' : 'Creative intelligence, good with children' },
    { n: '6th', sk: 'Ari Bhava', domain: lang === 'hinglish' ? 'Swasthya & Shatru' : 'Health & Enemies', planet: lang === 'hinglish' ? 'Rikt' : 'Empty', reading: lang === 'hinglish' ? 'Uttam immunity aur badhaon par vijay.' : 'Good immunity, ability to overcome obstacles' },
    { n: '7th', sk: 'Yuvati Bhava', domain: lang === 'hinglish' ? 'Vivah & Sajhedari' : 'Marriage & Partnership', planet: lang === 'hinglish' ? 'Shani' : 'Saturn', reading: lang === 'hinglish' ? 'Gambhira aur pratibadh sajhedari thode samay baad.' : 'Serious, committed partnerships after delay' },
    { n: '8th', sk: 'Randhra Bhava', domain: lang === 'hinglish' ? 'Aayu & Parivartan' : 'Transformation & Secrets', planet: lang === 'hinglish' ? 'Rikt' : 'Empty', reading: lang === 'hinglish' ? 'Guhya gyaan aur aadhyaatmik khoj mein ruchi.' : 'Interest in occult and hidden knowledge' },
    { n: '9th', sk: 'Dharma Bhava', domain: lang === 'hinglish' ? 'Bhagya & Dharma' : 'Luck & Spirituality', planet: lang === 'hinglish' ? 'Rahu' : 'Rahu', reading: lang === 'hinglish' ? 'Anokha dharmik drishtikon aur videshi sampark.' : 'Unconventional spiritual path, foreign connections' },
    { n: '10th', sk: 'Karma Bhava', domain: lang === 'hinglish' ? 'Career & Pratishtha' : 'Career & Status', planet: lang === 'hinglish' ? 'Brihaspati' : 'Jupiter', reading: lang === 'hinglish' ? 'Shikshan, salahkar ya prabandhan kshetron mein safalta.' : 'Career in teaching, consulting, or advisory roles' },
    { n: '11th', sk: 'Labha Bhava', domain: lang === 'hinglish' ? 'Aay & Labh' : 'Gains & Social Circle', planet: lang === 'hinglish' ? 'Mangal' : 'Mars', reading: lang === 'hinglish' ? 'Mazboot social network aur prayason se labh.' : 'Strong network, gains through siblings and efforts' },
    { n: '12th', sk: 'Vyaya Bhava', domain: lang === 'hinglish' ? 'Vyay & Moksha' : 'Loss & Liberation', planet: lang === 'hinglish' ? 'Chandra' : 'Moon', reading: lang === 'hinglish' ? 'Aatmik jhukav aur videshi sthano se labh.' : 'Spiritual inclinations, gains from foreign lands' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-xs uppercase mb-1" style={{ color: 'var(--col-copper)', letterSpacing: '0.14em' }}>
        {t.bhava_title[lang]}
      </div>
      <div className="font-display mb-5" style={{ color: 'var(--col-moonstone)', fontSize: '1.5rem' }}>
        भाव विश्लेषण
        <span className="font-body block mt-1" style={{ fontSize: '0.85rem', color: 'var(--col-moonstone-dim)', lineHeight: 1.5 }}>
          {t.bhava_subtitle[lang]}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {houses.slice(0, 4).map((h, i) => (
          <motion.div
            key={h.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
            whileHover={{ borderColor: 'rgba(200,130,42,0.45)', boxShadow: '0 0 24px rgba(200,130,42,0.12)' }}
            className="glass-card"
            style={{ padding: 18 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono-num" style={{ color: 'var(--col-copper)', fontWeight: 500 }}>{h.n} House</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{h.sk}</div>
            <div className="mt-1.5" style={{ color: 'var(--col-moonstone)', fontWeight: 500, fontSize: '0.95rem' }}>{h.domain}</div>
            <div className="mt-2 text-sm" style={{ color: 'var(--col-copper)' }}>{h.planet}</div>
            <p className="mt-2 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.55 }}>{h.reading}</p>
          </motion.div>
        ))}

        <AnimatePresence>
          {open && (
            <div className="contents">
              {houses.slice(4).map((h, i) => (
                <motion.div
                  key={h.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
                  whileHover={{ borderColor: 'rgba(200,130,42,0.45)', boxShadow: '0 0 24px rgba(200,130,42,0.12)' }}
                  className="glass-card"
                  style={{ padding: 18 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono-num" style={{ color: 'var(--col-copper)', fontWeight: 500 }}>{h.n} House</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--col-moonstone-dim)' }}>{h.sk}</div>
                  <div className="mt-1.5" style={{ color: 'var(--col-moonstone)', fontWeight: 500, fontSize: '0.95rem' }}>{h.domain}</div>
                  <div className="mt-2 text-sm" style={{ color: 'var(--col-copper)' }}>{h.planet}</div>
                  <p className="mt-2 text-sm" style={{ color: 'var(--col-moonstone-dim)', lineHeight: 1.55 }}>{h.reading}</p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="btn-ghost"
          style={{ color: 'var(--col-copper)', borderColor: 'rgba(200,130,42,0.35)' }}
        >
          {open
            ? (lang === 'hinglish' ? 'Pehle 4 ghar dikhao ↑' : 'Show first 4 houses ↑')
            : t.show_all_houses[lang]}
        </button>
      </div>
    </motion.div>
  );
}