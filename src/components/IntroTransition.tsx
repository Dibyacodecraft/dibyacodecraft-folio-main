import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// A richer intro: two-panel wipe + per-letter reveal + subtitle. Inspired by the reference.
const IntroTransition = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  // custom loader refs
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);

  // Break title into spans for per-letter animation
  const title = 'Dibyaranjan Jena';
  const titleLetters = title.split('');

  useEffect(() => {
    const overlay = overlayRef.current;
    const left = leftPanelRef.current;
    const right = rightPanelRef.current;
    const titleEl = titleRef.current;
    const subEl = subtitleRef.current;
    if (!overlay || !left || !right || !titleEl || !subEl) return;

  // Prepare letter spans
    const letters = Array.from(titleEl.querySelectorAll('.letter')) as HTMLElement[];

  // ensure loader hidden initially
  if (loaderRef.current) gsap.set(loaderRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // ensure overlay visible
    gsap.set(overlay, { autoAlpha: 1, display: 'flex' });

  // add a body class to hide any blinking cursors/animations during the intro
  document.body.classList.add('intro-active');

    // slight delay then animate panels as a curtain wipe
    tl.to(left, { xPercent: -110, duration: 0.9, ease: 'power3.inOut' }, 0.2);
    tl.to(right, { xPercent: 110, duration: 0.9, ease: 'power3.inOut' }, 0.2);

    // text reveal: staggered letters popping
    tl.fromTo(
      letters,
      { y: 30, opacity: 0, transformOrigin: '50% 50%' },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: 'back.out(1.6)' },
      0.45
    );

    // subtitle fades in slightly later
    tl.fromTo(subEl, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.75);

  // Cartoon filter pulse (quick color/contrast pop) applied to overlay
  tl.to(overlay, { css: { filter: 'contrast(1.25) saturate(1.15) hue-rotate(4deg)' }, duration: 0.35, yoyo: true, repeat: 1 }, '+=0.12');

  // Show custom loader (three dots) and animate the dots
  tl.to(loaderRef.current, { autoAlpha: 1, duration: 0.18 }, '+=0.06');
  tl.fromTo(
    loaderRef.current?.querySelectorAll('.dot'),
    { y: 0, opacity: 0.5, scale: 0.8 },
    { y: -8, opacity: 1, scale: 1, stagger: 0.12, repeat: 2, yoyo: true, duration: 0.35, ease: 'power1.inOut' },
    '+=0.08'
  );

  // small hold then fade overlay completely
  tl.to(overlay, { delay: 0.45, duration: 0.45, opacity: 0, ease: 'power2.in', onComplete: () => setHidden(true) }, '+=0.16');

    return () => {
      if (tl) tl.kill();
      document.body.classList.remove('intro-active');
    };
  }, []);

  if (hidden) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden>
      <div className="intro-panel left" ref={leftPanelRef} />
      <div className="intro-panel right" ref={rightPanelRef} />

      <div className="intro-inner text-center pointer-events-none">
        <h1 ref={titleRef} className="intro-title font-orbitron text-4xl sm:text-5xl lg:text-6xl text-white">
          {titleLetters.map((ch, i) => (
            <span key={i} className={`letter ${ch === ' ' ? 'space' : ''}`}>{ch}</span>
          ))}
        </h1>
        <p ref={subtitleRef} className="intro-subtitle mt-4 text-muted-foreground">Python Developer • AI/ML Enthusiast</p>
      </div>
      {/* Custom loader (three dots) */}
      <div className="intro-loader absolute bottom-12 left-1/2 transform -translate-x-1/2" ref={loaderRef} aria-hidden>
        <div className="flex items-center space-x-2">
          <span className="dot w-3 h-3 bg-neon-purple rounded-full inline-block opacity-70" />
          <span className="dot w-3 h-3 bg-neon-blue rounded-full inline-block opacity-70" />
          <span className="dot w-3 h-3 bg-neon-green rounded-full inline-block opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default IntroTransition;
