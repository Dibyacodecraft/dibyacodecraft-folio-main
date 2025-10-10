import { useEffect, useRef } from 'react';

type Props = {
  hideDefaultCursor?: boolean;
  targetSelector?: string;
  color?: string; // rgb or hsl like '255,255,255' or '0 0% 100%'
  size?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CanvasCursor = ({ hideDefaultCursor = true, targetSelector = '.cursor-target', color = '255,255,255', size = 22 }: Props) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (hideDefaultCursor) document.body.style.cursor = 'none';

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

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursor = { x: mouse.x, y: mouse.y, r: size / 2 };

    const trail: { x: number; y: number }[] = [];
    const TRAIL_COUNT = 8;
    for (let i = 0; i < TRAIL_COUNT; i++) trail.push({ x: mouse.x, y: mouse.y });

    let hover = false;

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouse.x = t.clientX;
        mouse.y = t.clientY;
      }
    };

    const handleDown = () => {
      // quick smaller transient "pulse" by enlarging radius briefly
      cursor.r = size;
      setTimeout(() => (cursor.r = size / 2), 120);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleTouch, { passive: true });
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('touchstart', handleDown);

    // hover targets
    const targets = Array.from(document.querySelectorAll(targetSelector));
    const enter = () => (hover = true);
    const leave = () => (hover = false);
    targets.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    let raf = 0;
    let last = performance.now();

    function loop(now: number) {
      const dt = Math.min(60, now - last) / 16;
      last = now;

      // ease cursor towards mouse
      cursor.x = lerp(cursor.x, mouse.x, 0.18 * dt);
      cursor.y = lerp(cursor.y, mouse.y, 0.18 * dt);

      // update trail
      let prevX = cursor.x;
      let prevY = cursor.y;
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        t.x = lerp(t.x, prevX, 0.35 - i * 0.03);
        t.y = lerp(t.y, prevY, 0.35 - i * 0.03);
        prevX = t.x;
        prevY = t.y;
      }

      // draw
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // subtle trailing dots
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const t = i / trail.length;
        const rad = (size / 2) * (0.35 * (1 - t));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${0.12 * (1 - t)})`;
        ctx.arc(p.x, p.y, Math.max(0.5, rad), 0, Math.PI * 2);
        ctx.fill();
      }

      // main circle (scale on hover)
      const targetScale = hover ? 1.6 : 1.0;
      const displayedR = lerp(cursor.r, (size / 2) * targetScale, 0.2);
      cursor.r = displayedR;

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(${color}, 0.95)`;
      ctx.fillStyle = `rgba(${color}, 0.02)`;
      ctx.arc(cursor.x, cursor.y, displayedR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // small inner dot
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, 1)`;
      ctx.arc(cursor.x, cursor.y, Math.max(1, size * 0.06), 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleTouch);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('touchstart', handleDown);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      if (hideDefaultCursor) document.body.style.cursor = '';
    };
  }, [hideDefaultCursor, targetSelector, color, size]);

  return <canvas ref={ref} className="canvas-cursor" aria-hidden />;
};

export default CanvasCursor;
