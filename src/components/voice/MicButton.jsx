import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader2 } from 'lucide-react';

export default function MicButton({ state, onClick }) {
  const listening = state === 'listening';
  const speaking = state === 'speaking';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      {listening && (
        <>
          {[0, 0.5, 1].map((delay) => (
            <motion.span
              key={delay}
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay }}
              style={{
                position: 'absolute',
                width: 80,
                height: 80,
                borderRadius: '9999px',
                border: '2px solid var(--col-copper)',
              }}
            />
          ))}
        </>
      )}

      <motion.button
        onClick={onClick}
        disabled={speaking}
        whileHover={!speaking ? { scale: 1.05 } : {}}
        whileTap={!speaking ? { scale: 0.95 } : {}}
        animate={listening ? { boxShadow: '0 0 50px rgba(200,130,42,0.5)' } : {}}
        style={{
          position: 'relative',
          width: 80,
          height: 80,
          borderRadius: '9999px',
          border: 'none',
          cursor: speaking ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          background: speaking
            ? 'var(--col-teal)'
            : 'linear-gradient(135deg, var(--col-copper) 0%, var(--col-copper-light) 100%)',
          color: '#0D0F2B',
        }}
      >
        {speaking ? (
          <Loader2 size={28} className="animate-spin" style={{ color: 'var(--col-midnight)' }} />
        ) : (
          <Mic size={30} color={speaking ? 'var(--col-midnight)' : '#fff8ee'} fill={listening ? '#fff8ee' : 'none'} />
        )}
      </motion.button>
    </div>
  );
}