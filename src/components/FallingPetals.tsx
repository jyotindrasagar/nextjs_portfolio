"use client";
import { useEffect, useState } from 'react';

export function FallingPetals() {
  // Render immediately (no timeout)
  // Hydration will happen on the client if dynamically imported.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {[...Array(25)].map((_, i) => {
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 10;
        
        // Increased size variation (4px to 16px)
        const size = Math.random() * 12 + 4;
        const opacity = Math.random() * 0.4 + 0.2;
        
        // Glow variation
        const glowDuration = Math.random() * 3 + 2;
        const glowDelay = Math.random() * 5;
        
        return (
          <div
            key={i}
            className="absolute bg-accent dark:bg-accent"
            style={{
              left: `${left}%`,
              top: `-5vh`, // Start slightly above screen
              width: `${size}px`,
              height: `${size * 1.5}px`,
              opacity: opacity,
              animation: `falling-petal ${animationDuration}s linear ${animationDelay}s infinite, petal-glow ${glowDuration}s ease-in-out ${glowDelay}s infinite`,
              borderRadius: '100% 0 100% 0', // Petal-like shape
              willChange: 'transform, box-shadow',
            }}
          />
        );
      })}
    </div>
  );
}

