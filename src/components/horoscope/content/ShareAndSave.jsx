import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signs } from '../horoData';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function ShareAndSave({ selected }) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const s = signs[selected] || signs[0];

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out today's horoscope for ${s.en} (${s.hi}) on Jyotish App: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2"
    >
      <span className="text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>
        {t.share_horoscope[lang]}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={handleShareWhatsApp}
          className="btn-ghost text-xs inline-flex items-center gap-1.5"
          style={{ padding: '8px 18px', color: 'var(--col-copper)', borderColor: 'rgba(200, 130, 42, 0.35)' }}
        >
          <span>📱</span> {t.share_whatsapp_btn[lang]}
        </button>
        <button
          onClick={handleCopyLink}
          className="btn-ghost text-xs inline-flex items-center gap-1.5"
          style={{ padding: '8px 18px', color: 'var(--col-copper)', borderColor: 'rgba(200, 130, 42, 0.35)' }}
        >
          <span>🔗</span> {copied ? (lang === 'hinglish' ? 'Link Copy Ho Gaya!' : 'Link Copied!') : t.copy_link[lang]}
        </button>
      </div>
    </motion.div>
  );
}
