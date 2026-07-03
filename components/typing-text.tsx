'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
  delay?: number;
}

export default function TypingText({ 
  text, 
  className = '', 
  speed = 40,
  cursor = true,
  delay = 0
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Start animation after initial delay
  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setHasStarted(true);
    }
  }, [delay]);

  // Type out the text
  useEffect(() => {
    if (!hasStarted) return;
    
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed, hasStarted]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && !isComplete && hasStarted && (
        <span className="inline-block w-0.5 h-[1.2em] bg-current ml-1 animate-pulse" />
      )}
    </span>
  );
}
