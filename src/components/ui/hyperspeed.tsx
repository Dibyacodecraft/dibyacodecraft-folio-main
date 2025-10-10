import { useEffect, useRef } from 'react';

type Props = {
  color?: string; // expects 'h,s%,l%' (e.g. '195,100%,60%')
  count?: number;
  opacity?: number;
};

const HyperspeedBackground = ({ color = '195,100%,60%', count = 220, opacity = 0.9 }: Props) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      angle: number;
      dist: number;
      speed: number;
      length: number;
      thickness: number;
    };

    const maxSide = Math.max(window.innerWidth, window.innerHeight);
    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          dist: Math.random() * (maxSide * 0.02),
          speed: 0.6 + Math.random() * 3.5,
          length: 6 + Math.random() * 24,
          thickness: 0.4 + Math.random() * 2.2,
        });
      }
    }

    initParticles();

    let last = performance.now();
    let raf = 0;

    function loop(now: number) {
      const dt = Math.min(60, now - last) / 16; // normalized delta
      last = now;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const bound = Math.hypot(cx, cy) + 100;

      for (let p of particles) {
        // accelerate slightly as particle moves away
        p.dist += p.speed * dt * (1 + p.dist / 400);

        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist;
        const lx = cx + Math.cos(p.angle) * (p.dist - p.length);
        const ly = cy + Math.sin(p.angle) * (p.dist - p.length);

        // compute opacity ramp so near center it's dim, far away it's brighter
        const alpha = Math.max(0, Math.min(1, (p.dist / bound) * opacity));

        ctx.beginPath();
        ctx.lineWidth = p.thickness;
        ctx.strokeStyle = `hsla(${color}, ${alpha})`;
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (p.dist > bound) {
          // reset to near-center
          p.dist = Math.random() * 6;
          p.angle = Math.random() * Math.PI * 2;
          p.speed = 0.6 + Math.random() * 3.5;
          p.length = 6 + Math.random() * 24;
          p.thickness = 0.4 + Math.random() * 2.2;
        }
      }

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [count, opacity, color]);

  return (
    <canvas
      ref={ref}
      className="hyperspeed-canvas"
      aria-hidden
    />
  );
};

export default HyperspeedBackground;
