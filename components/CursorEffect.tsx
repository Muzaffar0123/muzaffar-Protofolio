'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  color: string;
};

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colors = ['#00d4ff', '#8a4dff', '#f027d7', '#00e8b5'];
    const particles: Particle[] = [];
    let mouseX = 0, mouseY = 0, frame = 0, lastSpark = 0;
    let visible = false;

    const resize = () => {
      const scale =
        finePointer.matches && !reducedMotion.matches
          ? Math.min(window.devicePixelRatio || 1, 1.5)
          : 1;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const clear = () => {
      visible = false;
      particles.length = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const draw = (time: number) => {
      if (!visible || !finePointer.matches || reducedMotion.matches) {
        clear();
        return;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.025;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        context.globalAlpha = particle.life;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 9;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowColor = '#00d4ff';
      context.shadowBlur = 14;
      context.strokeStyle = '#00d4ff';
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
      context.stroke();

      const angle = time / 500;
      context.fillStyle = '#00d4ff';
      context.beginPath();
      context.arc(mouseX + Math.cos(angle) * 8, mouseY + Math.sin(angle) * 8, 5, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    const move = (event: MouseEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      visible = true;
      const now = performance.now();
      if (now - lastSpark > 30) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 18,
            y: mouseY + (Math.random() - 0.5) * 18,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 1 + Math.random() * 1.7,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        if (particles.length > 80) particles.splice(0, particles.length - 80);
        lastSpark = now;
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const preferencesChanged = () => {
      resize();
      if (!finePointer.matches || reducedMotion.matches) clear();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('blur', clear);
    document.documentElement.addEventListener('mouseleave', clear);
    finePointer.addEventListener('change', preferencesChanged);
    reducedMotion.addEventListener('change', preferencesChanged);
    return () => {
      clear();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('blur', clear);
      document.documentElement.removeEventListener('mouseleave', clear);
      finePointer.removeEventListener('change', preferencesChanged);
      reducedMotion.removeEventListener('change', preferencesChanged);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}
    />
  );
}
