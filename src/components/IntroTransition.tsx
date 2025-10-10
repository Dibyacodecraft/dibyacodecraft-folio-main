import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// A richer intro: two-panel wipe + per-letter reveal + subtitle. Inspired by the reference.
const IntroTransition = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const macbookRef = useRef<HTMLDivElement | null>(null);
  const screenInnerRef = useRef<HTMLDivElement | null>(null);
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

  // ensure macbook elements are hidden initially
  if (macbookRef.current) gsap.set(macbookRef.current, { autoAlpha: 0, scale: 0.92 });
  if (screenInnerRef.current) gsap.set(screenInnerRef.current, { width: '0%' });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // ensure overlay visible
    gsap.set(overlay, { autoAlpha: 1, display: 'flex' });

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
  tl.to(overlay, { css: { filter: 'contrast(1.35) saturate(1.3) hue-rotate(6deg)' }, duration: 0.4, yoyo: true, repeat: 1 }, '+=0.12');

  // Then animate a MacBook mockup in with a screen reveal
  tl.to(macbookRef.current, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' }, '+=0.08');
  tl.to(screenInnerRef.current, { width: '100%', duration: 0.9, ease: 'power3.out' }, '-=0.18');

  // small hold then fade overlay completely
  tl.to(overlay, { delay: 0.5, duration: 0.6, opacity: 0, ease: 'power2.in', onComplete: () => setHidden(true) }, '+=0.2');

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden>
      <div className="intro-panel left" ref={leftPanelRef} />
      <div className="intro-panel right" ref={rightPanelRef} />

      {/* MacBook mockup (hidden initially) */}
      <div className="intro-macbook" ref={macbookRef} aria-hidden>
        <div className="macbook-shell">
          <div className="macbook-screen">
            <div className="macbook-screen-inner" ref={screenInnerRef} />
          </div>
        </div>
      </div>

      <div className="intro-inner text-center pointer-events-none">
        <h1 ref={titleRef} className="intro-title font-orbitron text-4xl sm:text-5xl lg:text-6xl text-white">
          {titleLetters.map((ch, i) => (
            <span key={i} className={`letter ${ch === ' ' ? 'space' : ''}`}>{ch}</span>
          ))}
        </h1>
        <p ref={subtitleRef} className="intro-subtitle mt-4 text-muted-foreground">Python Developer • AI/ML Enthusiast</p>
      </div>
    </div>
  );
};

export default IntroTransition;
