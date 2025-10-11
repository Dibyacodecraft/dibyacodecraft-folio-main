import { useState, useEffect, useRef } from 'react';
import { Download, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileCard from '@/components/ui/profile-card';
import TextType from '@/components/ui/text-type';
import { toast } from "sonner";
import profileImage from '@/assets/profile-image.png';
import heroBg from '@/assets/hero-bg.png';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Python Developer | AI/ML Enthusiast | Tech Innovator';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Dibyaranjan Jena_Resume.pdf';
    link.download = 'Dibyaranjan Jena_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("Thank you for your interest!", {
      description: "Please leave a comment in the Contact Section.",
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // set smaller parallax values
      el.style.setProperty('--mx', `${x * 0.02}px`);
      el.style.setProperty('--my', `${y * 0.02}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section id="home" ref={containerRef} className="min-h-screen relative flex items-center overflow-hidden hero-parallax">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated Background Lines (parallax depth) */}
      <div className="absolute inset-0 parallax-layer" data-depth="0.2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="hyperspeed-line parallax-layer"
            data-depth={0.4 + i * 0.05}
            style={{
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content (staggered) */}
          <div className="space-y-8 stagger">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-orbitron font-bold stagger-item [--delay:0.05s]">
                <TextType 
                  text="Dibyaranjan Jena"
                  className="text-gradient"
                  speed={100}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorChar="|"
                />
              </h1>
              
              <div className="h-16">
                <p className="text-xl lg:text-2xl font-inter text-muted-foreground stagger-item [--delay:0.15s]">
                  {displayText}
                  <span className="animate-pulse text-neon-purple">|</span>
                </p>
              </div>
            </div>

            <p className="text-lg font-inter text-muted-foreground max-w-2xl stagger-item [--delay:0.25s]">
              I’m a Python Developer passionate about AI, Machine Learning, and intelligent automation. I love creating systems that blend data, design, and logic to solve real-world problems. My goal is to turn complex technology into simple, meaningful, and impactful solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 stagger-item [--delay:0.35s]">
              <Button 
                size="lg" 
                className="gradient-primary hover-lift font-inter font-semibold group cursor-target"
                onClick={handleDownloadCV}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download CV
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="neon-border hover-lift font-inter group cursor-target"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 pt-4 stagger-item [--delay:0.45s]">
              <a 
                href="https://github.com/Dibyacodecraft" 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub"
                className="text-muted-foreground hover:text-neon-purple transition-all duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/dibyaranjan-jena-184659316" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-muted-foreground hover:text-neon-blue transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:dibya4096@gmail.com"
                title="Email"
                className="text-muted-foreground hover:text-neon-green transition-all duration-300 hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* React Bits Profile Card (parallax layer) */}
          <div className="flex justify-center lg:justify-end parallax-layer" data-depth="0.6">
            <ProfileCard
              avatarUrl={profileImage}
              miniAvatarUrl={profileImage}
              name="Dibyaranjan Jena"
              title="Python Developer"
              handle="dibyaranjan"
              status="Online"
              contactText="Contact Me"
              onContactClick={() => window.open('mailto:dibya4096@gmail.com', '_blank')}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neon-purple rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-purple rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;