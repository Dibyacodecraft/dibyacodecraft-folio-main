import React, { useEffect, useRef, useState } from 'react';

type Item = {
  name: string;
  logo: string;
};

const DomeGallery: React.FC<{ items: Item[]; radius?: number; autoRotate?: boolean }> = ({
  items,
  radius = 220,
  autoRotate = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<Item | null>(null);

  // compute positions responsively
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const r = Math.min(radius, rect.width / 2 - 48);

      items.forEach((_, i) => {
        const theta = (360 / items.length) * i; // degrees
        const rad = (theta * Math.PI) / 180;
        // dome squish on vertical
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r * 0.45;
        const z = -Math.abs(y) * 0.7;

        const btn = itemRefs.current[i];
        if (btn) {
          btn.style.left = `${cx}px`;
          btn.style.top = `${cy}px`;
          btn.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${theta}deg)`;
        }
      });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [items, radius]);

  // auto-rotate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let velocity = 0; // degrees per frame (approx)
    let lastPointer: { x: number; y: number } | null = null;
    let isDragging = false;

    const tick = () => {
      if (autoRotate && !paused && !isDragging) {
        // auto rotation when enabled and not paused/dragging
        angleRef.current += 0.35; // degrees
      }

      // apply velocity (from drag fling) even if paused is false
      if (Math.abs(velocity) > 0.001) {
        angleRef.current += velocity;
        // apply friction
        velocity *= 0.95;
      }

      el.style.transform = `rotateX(18deg) rotateZ(${angleRef.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // pointer drag handlers
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setPaused(true);
      lastPointer = { x: e.clientX, y: e.clientY };
      // capture pointer to the element
      (e.target as Element).setPointerCapture?.(e.pointerId);
      velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !lastPointer) return;
      const dx = e.clientX - lastPointer.x;
      // Map horizontal drag to rotation change. Scale down for smoother control.
      const deltaDeg = dx * 0.35;
      angleRef.current += deltaDeg;
      // estimate velocity for inertia
      velocity = deltaDeg;
      lastPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      setPaused(false);
      lastPointer = null;
      try {
        (e.target as Element).releasePointerCapture?.(e.pointerId);
      } catch (err) {
        /* ignore */
      }
    };

    // attach listeners to the container so dragging anywhere in the gallery works
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [paused]);

  const open = (item: Item) => setActive(item);
  const close = () => setActive(null);

  return (
    <div className="dome-gallery-wrapper">
      <div
        ref={containerRef}
        className="dome-gallery relative mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((it, i) => (
          <button
            key={it.name}
            ref={(el) => (itemRefs.current[i] = el)}
            className="dome-item absolute w-28 h-28 rounded-full bg-card/70 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
            onClick={() => open(it)}
            title={it.name}
            aria-label={it.name}
          >
            <img src={it.logo} alt={it.name} className="h-12 w-auto" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={close}>
          <div className="bg-card/80 rounded-lg p-6 backdrop-blur max-w-md w-full text-center">
            <img src={active.logo} alt={active.name} className="mx-auto h-20 mb-4" />
            <h4 className="font-orbitron text-xl mb-2">{active.name}</h4>
            <button onClick={close} className="mt-4 px-4 py-2 rounded-full bg-muted">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomeGallery;
