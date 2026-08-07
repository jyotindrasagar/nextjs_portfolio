"use client";
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── CONFIGURE RESPONSIVE VALUES INSIDE THE COMPONENT ────────────

export function CADOverlay({ loading = false, targetRef }: { loading?: boolean, targetRef?: React.RefObject<HTMLDivElement | null> }) {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize(); // trigger on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const windowWidth = windowSize.width;
  const windowHeight = windowSize.height;

  // ─── TWEAK THESE VALUES FOR DIFFERENT SCREEN SIZES ────────────
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
  // ──────────────────────────────────────────────────────────────

  const { scrollY } = useScroll();

  // LAYER 1 — Parallax: pure screen-space vertical movement.
  const parallaxY = useTransform(scrollY, [0, 6000], [0, -540]);

  // Bulletproof Fade Out:
  // The first 3 sections (Hero, Work, About) are exactly 100vh each.
  // Feedback starts at 300vh, Contact ends at 400vh.
  const fadeStart = windowHeight * 3;
  const fadeEnd = windowHeight * 4;
  const opacityTree = useTransform(scrollY, [fadeStart, fadeEnd], [1, 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ────────────────────────────────────────────────────────────── */}
      {/* LAYER 1: Parallax scroll (screen-space, no rotation) */}
      {/* ────────────────────────────────────────────────────────────── */}
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

