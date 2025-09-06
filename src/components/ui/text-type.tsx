import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TextTypeProps {
  text: string;
  className?: string;
  speed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  cursorBlinkDuration?: number;
  showCursor?: boolean;
  variableSpeed?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  cursorChar?: string;
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  className,
  speed = 75,
  pauseDuration = 1500,
  deletingSpeed = 50,
  cursorBlinkDuration = 0.5,
  showCursor = true,
  variableSpeed = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorChar = '_'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentIndex < text.length) {
      const currentSpeed = variableSpeed 
        ? Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin
        : speed;
      
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === text.length) {
      setIsPaused(true);
    } else if (isDeleting && displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, text, displayText, isDeleting, isPaused, speed, pauseDuration, deletingSpeed, variableSpeed, variableSpeedMin, variableSpeedMax]);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      {showCursor && (
        <span 
          className="animate-pulse"
          style={{ animationDuration: `${cursorBlinkDuration}s` }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TextType;