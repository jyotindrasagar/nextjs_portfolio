"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hasBloomed, setHasBloomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasBloomedRef = useRef(false);

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
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Once bloomed, it stays bloomed forever.
      if (hasBloomedRef.current) return;

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // 2.5 seconds idle to bloom
      idleTimerRef.current = setTimeout(() => {
        setHasBloomed(true);
        hasBloomedRef.current = true;
      }, 2500);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (hasBloomed) {
      const style = document.createElement('style');
      style.innerHTML = `* { cursor: none !important; }`;
      document.head.appendChild(style);

      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
  }, [hasBloomed]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        animate={{
          x: hasBloomed ? 0 : 32, // 35px offset to bottom right before blooming
          y: hasBloomed ? 0 : 30,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
        className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {!hasBloomed ? (
            /* 1. Animated Dot Cursor */
            <motion.div
              key="cursor-dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-6 h-6 rounded-full border border-rose-400/50 dark:border-rose-300/50 bg-rose-400/20 dark:bg-rose-300/20 backdrop-blur-[1px] flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-rose-500 dark:bg-rose-300 shadow-[0_0_10px_#f43f5e]" />
              </motion.div>
            </motion.div>
          ) : (
            /* 2. Blooming Sakura Flower */
            <motion.div
              key="blooming-flower"
              initial={{ scale: 0, opacity: 0, rotate: -40 }}
              animate={{ scale: 0.3, opacity: 1, rotate: 0 }} // Stays very small as a cursor
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.svg
                width="60"
                height="60"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  rotate: scrollRotation,
                  filter: scrollGlow
                }}
              >
                {[0, 72, 144, 216, 288].map((angle, idx) => (
                  <g key={idx} transform={`rotate(${angle} 50 50)`}>
                    <motion.path
                      d="M50 50 C35 25, 20 10, 50 2 C80 10, 65 25, 50 50 Z"
                      fill="url(#sakura-petal-grad)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.95 }}
                      transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
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
                  fill="#f43f5e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.45, duration: 0.25 }}
                />
                <defs>
                  <linearGradient id="sakura-petal-grad" x1="50" y1="50" x2="50" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#fda4af" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
