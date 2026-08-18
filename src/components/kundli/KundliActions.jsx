import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Share2, Home } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { t } from '@/translations';

export default function KundliActions() {
  const { lang } = useLang();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
      <button className="btn-primary w-full sm:w-auto justify-center" style={{ padding: '14px 32px' }}>
        <Download size={18} /> {t.download_pdf[lang]}
      </button>
      <button className="btn-ghost w-full sm:w-auto justify-center" style={{ padding: '12px 24px' }}>
        <Share2 size={18} /> {t.share_whatsapp[lang]}
      </button>
      <Link to="/" className="btn-ghost w-full sm:w-auto justify-center" style={{ padding: '12px 24px' }}>
        <Home size={18} /> {t.home_btn[lang]}
      </Link>
    </div>
  );
}