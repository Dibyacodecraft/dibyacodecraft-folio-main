import { useMemo, useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Certificates gallery with fullscreen preview and entry animations.
const CertificatesGallery = () => {
  // 1) Try to auto-import any images from src/assets/certificates
  // Vite will convert them to URLs at build time
  const importedMap = import.meta.glob('/src/assets/certificates/*.{png,jpg,jpeg,webp}', { as: 'url', eager: true }) as Record<string, string>;
  const importedUrls = Object.values(importedMap);

  // 2) Public folder fallback (explicit filenames found in public/certificates)
  const fallbackPublic = [
    '/certificates/Screenshot 2025-10-08 163745.png',
    '/certificates/Screenshot 2025-10-08 163821.png',
    '/certificates/Screenshot 2025-10-08 163859.png',
  ];

  const images = useMemo(() => (importedUrls.length > 0 ? importedUrls : fallbackPublic), [importedUrls]);

  // Lightbox state
  const [active, setActive] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Animate grid items on mount using GSAP stagger (fade + slide)
  useEffect(() => {
    if (!gridRef.current) return;
    const items = Array.from(gridRef.current.querySelectorAll('.cert-item')) as HTMLElement[];
    gsap.fromTo(
      items,
      { y: 16, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
    );
  }, [images]);

  // Animate lightbox open/close
  useEffect(() => {
    const overlay = overlayRef.current;
    const img = imageRef.current;
    if (!overlay || !img) return;

    if (active) {
      // open animation
      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(img, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.2)' });
    } else {
      // close animation
      gsap.to(overlay, { opacity: 0, duration: 0.28, ease: 'power2.in', onComplete: () => gsap.set(overlay, { display: 'none' }) });
    }
  }, [active]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Keep aria-hidden attribute updated on the overlay element (avoid inline expression lint)
  useEffect(() => {
    if (!overlayRef.current) return;
    overlayRef.current.setAttribute('aria-hidden', active ? 'false' : 'true');
  }, [active]);

  const openPreview = (src: string) => setActive(src);
  const closePreview = (e?: React.MouseEvent) => {
    // allow clicking overlay to close
    if (!e) return setActive(null);
    if (e.target === overlayRef.current) setActive(null);
  };

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">Certificates</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            A selection of my certificates and recognitions. Proudly earned — each one represents a milestone in learning and growth.
          </p>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1200px]">
          {images.map((src, i) => (
            <div key={src} className="cert-item group relative aspect-[16/10] rounded-xl overflow-hidden neon-border bg-card/60 backdrop-blur cursor-pointer" onClick={() => openPreview(src)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openPreview(src)}>
              <img src={src} alt={`Certificate ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute left-4 bottom-4 px-3 py-1 rounded-full bg-black/40 text-sm text-white/90 backdrop-blur">View</div>
            </div>
          ))}
        </div>

        {/* Fullscreen preview overlay */}
  <div ref={overlayRef} className="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 p-6" onClick={(e) => closePreview(e)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <img ref={imageRef} src={active ?? ''} alt="Certificate preview" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain" />

            <button aria-label="Close preview" onClick={() => setActive(null)} className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform">
              ×
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesGallery;


