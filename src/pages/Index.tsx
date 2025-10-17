import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LightRays from '@/components/ui/light-rays';
import CanvasCursor from '@/components/ui/canvas-cursor';
// Hyperspeed background removed
import CertificatesGallery from '@/components/CertificatesGallery';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden relative">
  {/* Hyperspeed background removed */}
      <LightRays 
        raysColor="270" 
        raysOrigin="top-center"
        raysSpeed={1.5}
        lightSpread={0.3}
        rayLength={2}
        fadeDistance={0.8}
        saturation={0.8}
        mouseInfluence={0.2}
      />
      <CanvasCursor
        targetSelector=".cursor-target"
        hideDefaultCursor={true}
        color={'255,255,255'}
        size={22}
      />
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="certificates">
        <CertificatesGallery />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
