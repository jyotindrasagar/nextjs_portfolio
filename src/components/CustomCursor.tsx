"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from 'next-themes';

type IdleState = 'active' | 'glowing' | 'white';

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [idleState, setIdleState] = useState<IdleState>('active');

  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const whiteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll velocity for rotating and glowing the flower
  const { scrollY } = useScroll();
  
  // Absolute position spring for continuous infinite rotation
  const smoothScrollY = useSpring(scrollY, {
    damping: 60,
    stiffness: 100,
    mass: 1.5
  });
  const scrollRotation = useTransform(smoothScrollY, (y) => y * 0.15); // Adjust multiplier for speed

  // Velocity spring for the glow intensity
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 100,
    mass: 1.5
  });

  const scrollGlow = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [
      'drop-shadow(0px 0px 25px rgba(244,63,94,1))',
      'drop-shadow(0px 0px 10px rgba(244,63,94,0.4))',
      'drop-shadow(0px 0px 25px rgba(244,63,94,1))'
    ]
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1025)) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      setIdleState('active');

      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
      if (whiteTimerRef.current) clearTimeout(whiteTimerRef.current);

      // Start glowing after 0.9s
      glowTimerRef.current = setTimeout(() => {
        setIdleState('glowing');
      }, 900);

      // Turn white after 3s total
      whiteTimerRef.current = setTimeout(() => {
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
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1025)) {
      return;
    }

    // Hide the default cursor completely
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
    ? 'drop-shadow(0px 0px 25px rgba(225,29,72,0.8))' // Pinkish dark
    : 'drop-shadow(0px 0px 25px rgba(186,230,253,0.8))'; // Bluish white

  return (
    <div className="hidden xl:block fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 0.3, // Keep the flower size as cursor size
            filter: isGlowing 
              ? ['drop-shadow(0px 0px 5px rgba(244,63,94,0.4))', 'drop-shadow(0px 0px 25px rgba(244,63,94,1))', 'drop-shadow(0px 0px 5px rgba(244,63,94,0.4))'] 
              : isWhite 
                ? finalGlow 
                : 'drop-shadow(0px 0px 0px rgba(244,63,94,0))'
          }}
          transition={{
            scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
            filter: isGlowing 
              ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              : { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              rotate: scrollRotation,
              filter: idleState === 'active' ? scrollGlow : undefined
            }}
          >
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 50 50)`}>
                {/* Sakura Petal */}
                <motion.path
                  d="M50 50 C35 25, 20 10, 50 2 C80 10, 65 25, 50 50 Z"
                  fill="url(#sakura-petal-grad)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isWhite ? 0 : 0.95 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, opacity: { duration: 0.8 } }}
                  style={{ transformOrigin: "50px 50px" }}
                />
                {/* White Petal (Fades in on idle) */}
                <motion.path
                  d="M50 50 C35 25, 20 10, 50 2 C80 10, 65 25, 50 50 Z"
                  fill="url(#white-petal-grad)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isWhite ? 0.95 : 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, opacity: { duration: 0.8 } }}
                  style={{ transformOrigin: "50px 50px" }}
                />
              </g>
            ))}
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="#ffffff"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.25 }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="4.5"
              initial={{ scale: 0, fill: "#f43f5e" }}
              animate={{ scale: 1, fill: isWhite ? "#cbd5e1" : "#f43f5e" }}
              transition={{ delay: 0.45, duration: 0.25, fill: { duration: 0.8 } }}
            />
            <defs>
              <linearGradient id="sakura-petal-grad" x1="50" y1="50" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fda4af" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="white-petal-grad" x1="50" y1="50" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#f8fafc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
