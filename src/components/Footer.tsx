import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Dibyacodecraft",
      label: "GitHub",
      color: "hover:text-neon-purple"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/dibyaranjan-jena-184659316",
      label: "LinkedIn",
      color: "hover:text-neon-blue"
    },
    {
      icon: Mail,
      href: "mailto:dibya4096@gmail.com",
      label: "Email",
      color: "hover:text-neon-green"
    }
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-orbitron font-bold text-2xl text-gradient mb-4">
              DIBYA.DEV
            </div>
            <p className="text-muted-foreground font-inter leading-relaxed mb-6 max-w-md">
              Python Developer & AI/ML Enthusiast crafting innovative solutions 
              through code. Passionate about technology and creating meaningful digital experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-card/50 text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:bg-card`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground font-inter hover:text-neon-purple transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:dibya4096@gmail.com"
                className="block text-muted-foreground font-inter hover:text-neon-green transition-colors duration-300"
              >
                dibya4096@gmail.com
              </a>
              <p className="text-muted-foreground font-inter text-sm">
                Available for freelance projects
              </p>
              <p className="text-muted-foreground font-inter text-sm">
                Response within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground font-inter text-sm">
              <span>© {currentYear} Dibyaranjan Jena. Made with</span>
              <Heart size={16} className="text-neon-purple animate-pulse" />
              <span>and lots of ☕</span>
            </div>
            
            <div className="flex items-center space-x-6 text-muted-foreground font-inter text-sm">
              <button 
                onClick={() => scrollToSection('#home')}
                className="hover:text-neon-purple transition-colors duration-300"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;