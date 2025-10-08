import { useMemo } from 'react';

// Simple Dome Gallery-like layout using CSS transforms
const CertificatesGallery = () => {
  // 1) Try to auto-import any images from src/assets/certificates
  // Vite will convert them to URLs at build time
  const importedMap = import.meta.glob('/src/assets/certificates/*.{png,jpg,jpeg,webp}', { as: 'url', eager: true }) as Record<string, string>;
  const importedUrls = Object.values(importedMap);

  // 2) Fallback to public folder paths if none found in src assets
  const fallbackPublic = [
    '/certificates/internship-certificate.png',
    '/certificates/azure-student-ambassador.png',
    '/certificates/experience-letter.png',
  ];

  const images = useMemo(() => {
    if (importedUrls.length > 0) {
      return importedUrls;
    }
    return fallbackPublic;
  }, [importedUrls]);

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-gradient mb-4">Certificates</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">A selection of my certificates and recognitions.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1200px]">
          {images.map((src, i) => (
            <div key={src} className="group relative aspect-[16/10] rounded-xl overflow-hidden neon-border bg-card/60 backdrop-blur">
              <img src={src} alt={`Certificate ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesGallery;


