"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';

type IdleState = 'active' | 'glowing' | 'white';

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [idleState, setIdleState] = useState<IdleState>('active');

  const idleStateRef = useRef<IdleState>('active');
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const whiteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // RAF for scroll rotation & velocity glow
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Simple rotation based on absolute scroll position
        const rotation = currentScrollY * 0.15;
        
        // Simple velocity approximation for glow
        const velocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        if (svgRef.current) {
          // Apply rotation
          svgRef.current.style.transform = `rotate(${rotation}deg)`;
          
          // Apply velocity glow if active
          if (idleStateRef.current === 'active') {
            const glowIntensity = Math.min(1, velocity / 100);
            if (glowIntensity > 0.1) {
              svgRef.current.style.filter = `drop-shadow(0px 0px ${25 * glowIntensity}px rgba(244,63,94,${glowIntensity}))`;
            } else {
              svgRef.current.style.filter = 'none';
            }
          }
        }
        
        ticking = false;
      });
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1025)) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      if (idleStateRef.current !== 'active') {
        idleStateRef.current = 'active';
        setIdleState('active');
        if (svgRef.current) svgRef.current.style.filter = 'none';
      }

      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
      if (whiteTimerRef.current) clearTimeout(whiteTimerRef.current);

      glowTimerRef.current = setTimeout(() => {
        idleStateRef.current = 'glowing';
        setIdleState('glowing');
      }, 900);

      whiteTimerRef.current = setTimeout(() => {
        idleStateRef.current = 'white';
        setIdleState('white');
      }, 3000);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
      if (whiteTimerRef.current) clearTimeout(whiteTimerRef.current);
    };
  }, [isVisible, mouseX, mouseY]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1025)) {
      return;
    }

    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (!isVisible) return null;

  const isWhite = idleState === 'white';
  const isGlowing = idleState === 'glowing';
  const finalGlow = resolvedTheme === 'light' 
    ? 'drop-shadow(0px 0px 25px rgba(225,29,72,0.8))' 
    : 'drop-shadow(0px 0px 25px rgba(186,230,253,0.8))';

  return (
    <div className="hidden xl:block fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <div
          className={`transition-all duration-700 ${
            isGlowing 
              ? 'animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]' 
              : ''
          }`}
          style={{
            filter: isWhite ? finalGlow : 'none',
            transform: 'scale(0.3)'
          }}
        >
          <svg
            ref={svgRef}
            width="60"
            height="60"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="will-change-transform transition-all duration-100 ease-out"
          >
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 50 50)`}>
                {/* Sakura Petal */}
                <path
                  d="M50 50 C35 25, 20 10, 50 2 C80 10, 65 25, 50 50 Z"
                  fill="url(#sakura-petal-grad)"
                  className={`transition-opacity duration-700 ${isWhite ? 'opacity-0' : 'opacity-95'}`}
                />
                {/* White Petal (Fades in on idle) */}
                <path
                  d="M50 50 C35 25, 20 10, 50 2 C80 10, 65 25, 50 50 Z"
                  fill="url(#white-petal-grad)"
                  className={`transition-opacity duration-700 ${isWhite ? 'opacity-95' : 'opacity-0'}`}
                />
              </g>
            ))}
            <circle cx="50" cy="50" r="8" fill="#FAF9FC" />
            <circle
              cx="50"
              cy="50"
              r="4.5"
              className={`transition-colors duration-700 ${isWhite ? 'fill-slate-300' : 'fill-rose-500'}`}
            />
            <defs>
              <linearGradient id="sakura-petal-grad" x1="50" y1="50" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fda4af" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="white-petal-grad" x1="50" y1="50" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FAF9FC" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#f8fafc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
