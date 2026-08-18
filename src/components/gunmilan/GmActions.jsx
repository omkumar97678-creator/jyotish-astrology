import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function GmActions({ tryAgain, p1, p2 }) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const boyName = p1?.name?.trim() || 'Harsh';
  const girlName = p2?.name?.trim() || 'Mahika';

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Gun Milan Compatibility Report for ${boyName} & ${girlName} (28/36 Gunas Matched): ${window.location.href}`);
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
      className="space-y-6 pt-4"
    >
      {/* Share Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="text-xs font-medium" style={{ color: 'var(--col-moonstone-dim)' }}>
          {lang === 'hinglish' ? 'Yeh report share karein:' : 'Share this report:'}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShareWhatsApp}
            className="btn-ghost text-xs inline-flex items-center gap-1.5"
            style={{ padding: '8px 18px', color: 'var(--col-copper)', borderColor: 'rgba(200, 130, 42, 0.35)' }}
          >
            <span>📱</span> WhatsApp
          </button>
          <button
            onClick={handleCopyLink}
            className="btn-ghost text-xs inline-flex items-center gap-1.5"
            style={{ padding: '8px 18px', color: 'var(--col-copper)', borderColor: 'rgba(200, 130, 42, 0.35)' }}
          >
            <span>🔗</span> {copied ? (lang === 'hinglish' ? 'Link Copy Ho Gaya!' : 'Link Copied!') : t.copy_link[lang]}
          </button>
        </div>
      </div>

      {/* Main Bottom Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          className="btn-primary"
          style={{ padding: '16px 40px' }}
          onClick={() => window.print()}
        >
          <Download size={18} /> {t.download_report[lang]}
        </button>
        <button className="btn-ghost" onClick={tryAgain}>
          {t.try_again[lang]}
        </button>
        <a
          href="#consultation"
          className="btn-ghost"
          style={{ borderColor: 'rgba(42,171,168,0.4)', color: 'var(--col-teal)' }}
        >
          {t.book_consult[lang]}
        </a>
      </div>
    </motion.div>
  );
}
