import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide default cursor if requested
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    let mouseX = 0;
    let mouseY = 0;
    let isTargeting = false;

    // Set up spinning animation
    const spinTl = gsap.timeline({ repeat: -1 });
    spinTl.to(cursor, {
      rotation: 360,
      duration: spinDuration,
      ease: 'none'
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => {
      isTargeting = true;
      spinTl.pause();
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    const handleMouseLeave = () => {
      isTargeting = false;
      spinTl.resume();
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    const targetElements = document.querySelectorAll(targetSelector);
    targetElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMouseMove);
      targetElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      spinTl.kill();
    };
  }, [targetSelector, spinDuration, hideDefaultCursor]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50 mix-blend-difference"
      style={{
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Center dot */}
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Corner brackets */}
      <div
        ref={el => el && (cornersRef.current[0] = el)}
        className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"
      />
      <div
        ref={el => el && (cornersRef.current[1] = el)}
        className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"
      />
      <div
        ref={el => el && (cornersRef.current[2] = el)}
        className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"
      />
      <div
        ref={el => el && (cornersRef.current[3] = el)}
        className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"
      />
    </div>
  );
};

export default TargetCursor;