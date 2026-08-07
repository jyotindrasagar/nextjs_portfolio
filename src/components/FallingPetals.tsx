"use client";
import { useEffect, useState } from 'react';

export function FallingPetals() {
  // Render immediately (no timeout)
  // Hydration will happen on the client if dynamically imported.
  const [mounted, setMounted] = useState(false);
  const [petalCount, setPetalCount] = useState(20);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setPetalCount(window.innerWidth < 1024 ? 8 : 20); // 80% reduction for mobile (8), 50% reduction for PC (20)
    };
    handleResize(); // trigger on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Generate dynamic number of petals based on screen size */}
      {[...Array(petalCount)].map((_, i) => {
        const left = Math.random() * 100;
        
        // Some petals are caught in a "wind gust" (faster), some drift slowly
        const isGust = Math.random() > 0.7; 
        const animationDuration = isGust ? Math.random() * 5 + 5 : Math.random() * 10 + 12;
        const animationDelay = Math.random() * 14; // Spread across the 14s tree sway cycle
        
        const size = Math.random() * 12 + 4;
        const opacity = Math.random() * 0.5 + 0.2;
        
        // 15% of petals become "fireflies"
        const isFirefly = Math.random() > 0.85;
        
        // Slight color variations for regular petals
        const colors = ['bg-[#ea879c]', 'bg-[#ffb7c5]', 'bg-white', 'bg-[#ffc0cb]'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const glowDuration = Math.random() * 3 + 2;
        const glowDelay = Math.random() * 5;
        
        return (
          <div
            key={i}
            className={`absolute ${isFirefly ? 'bg-[#ffdc96] rounded-full' : randomColor}`}
            style={{
              left: `${left}%`,
              top: `-5vh`,
              width: `${size}px`,
              height: isFirefly ? `${size}px` : `${size * 1.5}px`,
              opacity: opacity,
              animation: `falling-petal ${animationDuration}s linear ${animationDelay}s infinite, ${isFirefly ? 'firefly-glow' : 'petal-glow'} ${glowDuration}s ease-in-out ${glowDelay}s infinite`,
              borderRadius: isFirefly ? '50%' : '100% 0 100% 0',
              willChange: 'transform, box-shadow',
            }}
          />
        );
      })}
    </div>
  );
}

