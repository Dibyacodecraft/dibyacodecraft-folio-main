import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface ProfileCardProps {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  showBehindGradient?: boolean;
  onContactClick?: () => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  miniAvatarUrl,
  name = "Dibyaranjan Jena",
  title = "Python Developer",
  handle = "dibyaranjan",
  status = "Online",
  contactText = "Contact Me",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  showBehindGradient = true,
  onContactClick,
  className
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || (!enableTilt && !enableMobileTilt)) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = (e.clientY - centerY) * -0.1;
      const rotateY = (e.clientX - centerX) * 0.1;

      setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
      cardRef.current.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
        cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [enableTilt, enableMobileTilt]);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      // Default Gmail action
      window.open('mailto:dibya4096@gmail.com', '_blank');
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Background gradient glow */}
      {showBehindGradient && (
        <div className="absolute -inset-4 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity duration-300 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green animate-glow" />
      )}

      {/* Main card */}
      <div
        ref={cardRef}
        className={cn(
          "relative w-96 h-[28rem] rounded-3xl overflow-hidden transition-all duration-300 ease-out",
          "bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl",
          "border border-white/10 shadow-2xl",
          "transform-gpu",
          enableTilt && "hover:scale-105"
        )}
        style={{
          transform: enableTilt
            ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(${isHovered ? 1.05 : 1})`
            : undefined,
        }}
      >
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-noise" />

        {/* Icon pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-neon-purple/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header with mini avatar and info */}
          {showUserInfo && (
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-3">
                {miniAvatarUrl && (
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-neon-purple/50">
                    <img
                      src={miniAvatarUrl}
                      alt={`${name} mini avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground text-sm">@{handle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs text-muted-foreground">{status}</span>
              </div>
            </div>
          )}

          {/* Main avatar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Avatar glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue opacity-50 blur-lg" />
              
              {/* Avatar container */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
                <img
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Contact button */}
          <div className="p-6">
            <Button
              onClick={handleContactClick}
              className="w-full gradient-primary hover-lift font-inter font-semibold group transition-all duration-300"
              size="lg"
            >
              <Mail className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              {contactText}
            </Button>
          </div>

          {/* Name and title */}
          <div className="p-6 pt-0 text-center">
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-1">
              {name}
            </h3>
            <p className="text-muted-foreground font-inter text-sm">
              {title}
            </p>
          </div>
        </div>

        {/* Inner gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default ProfileCard;