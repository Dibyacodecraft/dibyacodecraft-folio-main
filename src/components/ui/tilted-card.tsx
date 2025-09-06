import { useState, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface TiltedCardProps {
  children: React.ReactNode;
  imageSrc?: string;
  altText?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showTooltip?: boolean;
  showOverlayContent?: boolean;
  className?: string;
}

const TiltedCard = ({
  children,
  imageSrc,
  altText = 'Tilted card image',
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showTooltip = true,
  showOverlayContent = true,
  className
}: TiltedCardProps) => {
  const [transform, setTransform] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * rotateAmplitude;
    const rotateY = -(mouseX / rect.width) * rotateAmplitude;
    
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`
    );
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative cursor-pointer transition-transform duration-200 ease-out",
        className
      )}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-lg bg-card border border-white/10 backdrop-blur-sm">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover"
          />
        )}
        
        {showOverlayContent && (
          <div className={cn(
            "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300",
            isHovering ? "opacity-100" : "opacity-0"
          )}>
            <div className="text-center text-white p-4">
              {children}
            </div>
          </div>
        )}

        {!showOverlayContent && (
          <div className="p-4">
            {children}
          </div>
        )}
      </div>
      
      {showTooltip && isHovering && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          {typeof children === 'string' ? children : 'Hover for details'}
        </div>
      )}
    </div>
  );
};

export default TiltedCard;