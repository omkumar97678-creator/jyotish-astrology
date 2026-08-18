import React, { useEffect, useRef } from 'react';

export default function StarField({ count = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.025,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.phase += s.speed;
        const alpha = ((Math.sin(s.phase) + 1) / 2) * 0.8 + 0.1;
        const x = s.x * canvas.width;
        const y = s.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 228, 220, ${alpha})`;
        ctx.fill();

        if (s.r > 1.3 && alpha > 0.7) {
          const len = s.r * 5;
          ctx.strokeStyle = `rgba(200, 130, 42, ${alpha * 0.25})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(x - len, y);
          ctx.lineTo(x + len, y);
          ctx.moveTo(x, y - len);
          ctx.lineTo(x, y + len);
          ctx.stroke();
        }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', willChange: 'transform' }}
    />
  );
}