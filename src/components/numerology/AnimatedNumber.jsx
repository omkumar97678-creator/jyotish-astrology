import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedNumber({ value, duration = 1500, className, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ticks = 50;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i >= ticks ? value : (value / ticks) * i);
      if (i >= ticks) clearInterval(id);
    }, duration / ticks);
    return () => clearInterval(id);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {inView ? Math.round(n) : 0}
    </span>
  );
}