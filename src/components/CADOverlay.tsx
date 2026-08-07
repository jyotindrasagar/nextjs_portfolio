"use client";
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// â”€â”€â”€ CONFIGURE RESPONSIVE VALUES INSIDE THE COMPONENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function CADOverlay({ loading = false, targetRef }: { loading?: boolean, targetRef?: React.RefObject<HTMLDivElement | null> }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // â”€â”€â”€ TWEAK THESE VALUES FOR DIFFERENT SCREEN SIZES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  let TREE_ROTATION_DEG = 15;
  let TREE_TRANSLATE_X = 100;
  let TREE_TRANSLATE_Y = -120;

  if (windowWidth < 640) {
    // Mobile screens (< 640px)
    TREE_ROTATION_DEG = 15;
    TREE_TRANSLATE_X = 260;
    TREE_TRANSLATE_Y = -190;
  } else if (windowWidth < 768) {
    // Small screens / Tablets (640px - 767px)
    TREE_ROTATION_DEG = 15;
    TREE_TRANSLATE_X = 140;
    TREE_TRANSLATE_Y = -110;
  } else if (windowWidth < 1024) {
    // Medium screens / Small Laptops (768px - 1023px)
    TREE_ROTATION_DEG = 15;
    TREE_TRANSLATE_X = 140;
    TREE_TRANSLATE_Y = -100;
  } else {
    // Large screens / Desktops (>= 1024px)
    TREE_ROTATION_DEG = 15;
    TREE_TRANSLATE_X = 190;
    TREE_TRANSLATE_Y = -200;
  }
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // "start end" = top of Feedback hits bottom of screen (starts fading)
    // "end end" = bottom of Contact hits bottom of screen (fully faded out)
    offset: ["start end", "end end"]
  });

  // LAYER 1 â€” Parallax: pure screen-space vertical movement.
  // This wrapper has NO rotation, so Y always means "straight up on screen".
  const parallaxY = useTransform(scrollY, [0, 6000], [0, -540]);

  // Fallback if ref isn't ready, otherwise use scrollYProgress (1 at start end, 0 at center center)
  const fallbackOpacityTree = useTransform(scrollY, [300, 1500], [1, 0]);
  const targetOpacityTree = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacityTree = targetRef ? targetOpacityTree : fallbackOpacityTree;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/* LAYER 1: Parallax scroll (screen-space, no rotation) */}
      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.div
        style={{
          y: parallaxY,
          opacity: opacityTree,
          willChange: "transform, opacity",
        }}
        className="absolute inset-0 w-full h-full"
      >
        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {/* LAYER 2: Position + Rotation (static transforms)   */}
        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          className="absolute top-0 right-0 w-[280vw] sm:w-[140vw] md:w-[110vw] lg:w-[90vw] max-w-[1800px] aspect-[552/500] origin-top-right select-none pointer-events-none"
          style={{
            transform: `translateX(${TREE_TRANSLATE_X}px) translateY(${TREE_TRANSLATE_Y}px) rotate(${TREE_ROTATION_DEG}deg)`,
          }}
        >
          {/* LAYER 3: Intro fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The Tree Image â€” static, no continuous animation */}
            <img
              className="absolute top-0 right-0 w-full h-full object-contain object-right-top opacity-[0.85] dark:opacity-[0.75] transition-opacity duration-500 origin-top-right"
              src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/tree.svg"
              alt="Sakura Tree"
              loading="lazy"
              style={{ animation: 'tree-sway 14s ease-in-out infinite', willChange: 'transform' }}
            />
            {/* Gradient overlay for fade out (replaces expensive mask-image) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 80%, var(--background) 100%)' }} />

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

