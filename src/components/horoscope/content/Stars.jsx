import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Stars({ filled = 4, total = 5 }) {
  const [done] = useState(true);
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={done ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 + i * 0.15 }}
          style={{
            fontSize: 22,
            color: i < filled ? 'var(--col-copper)' : 'rgba(255,255,255,0.15)',
            textShadow: i < filled ? '0 0 10px rgba(200,130,42,0.4)' : 'none',
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}