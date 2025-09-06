import { useEffect, useRef } from 'react';

interface LightRaysProps {
  raysColor?: string;
  raysOrigin?: 'top-center' | 'right' | 'left' | 'bottom-center';
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  fadeDistance?: number;
  saturation?: number;
  mouseInfluence?: number;
}

const LightRays = ({
  raysColor = '#8b5cf6',
  raysOrigin = 'top-center',
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 3,
  fadeDistance = 1,
  saturation = 1,
  mouseInfluence = 0.1
}: LightRaysProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rays = 20;
      const centerX = raysOrigin === 'left' ? 0 : raysOrigin === 'right' ? canvas.width : canvas.width / 2;
      const centerY = raysOrigin === 'bottom-center' ? canvas.height : 0;

      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2;
        const mouseInfluenceFactor = mouseInfluence * 
          Math.sin((mousePos.current.x / canvas.width + mousePos.current.y / canvas.height) * Math.PI);
        
        const rayAngle = angle + time * raysSpeed * 0.01 + mouseInfluenceFactor;
        
        const gradient = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + Math.cos(rayAngle) * canvas.width * rayLength,
          centerY + Math.sin(rayAngle) * canvas.height * rayLength
        );

        gradient.addColorStop(0, `hsla(${raysColor}, ${saturation * 100}%, 70%, 0.1)`);
        gradient.addColorStop(lightSpread, `hsla(${raysColor}, ${saturation * 100}%, 60%, 0.05)`);
        gradient.addColorStop(fadeDistance, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(rayAngle) * canvas.width * rayLength,
          centerY + Math.sin(rayAngle) * canvas.height * rayLength
        );
        ctx.stroke();
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [raysColor, raysOrigin, raysSpeed, lightSpread, rayLength, fadeDistance, saturation, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default LightRays;