import { useState, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const SpotlightCard = ({ 
  children, 
  spotlightColor = 'rgba(255, 255, 255, 0.25)', 
  className,
  onMouseEnter: externalOnMouseEnter,
  onMouseLeave: externalOnMouseLeave
}: SpotlightCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    externalOnMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    externalOnMouseLeave?.();
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;