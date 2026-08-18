import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoiceHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-start justify-between gap-4"
    >
      <div>
        <Link to="/kundli" className="inline-flex items-center gap-2 text-sm mb-5" style={{ color: 'var(--col-moonstone-dim)' }}>
          <ArrowLeft size={16} /> Back to Kundli
        </Link>
        <h1 className="font-display" style={{ fontSize: 'clamp(30px, 5vw, 46px)', color: 'var(--col-moonstone)' }}>
          Voice Astrology
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--col-moonstone-dim)' }}>
          Ask anything about your kundli
        </p>
      </div>
      <div
        className="text-xs px-3 py-1.5 whitespace-nowrap"
        style={{
          color: 'var(--col-teal)',
          background: 'var(--col-glass)',
          border: '1px solid rgba(42,171,168,0.35)',
          borderRadius: 'var(--r-full)',
        }}
      >
        ✦ Powered by Gemini 3.1
      </div>
    </motion.div>
  );
}