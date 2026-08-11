"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// ─── CONFIGURE RESPONSIVE VALUES INSIDE THE COMPONENT ────────────

export function CADOverlay({ loading = false, targetRef }: { loading?: boolean, targetRef?: React.RefObject<HTMLDivElement | null> }) {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize(); // trigger on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pure RAF-based parallax — no Framer Motion, no React re-renders on scroll
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Parallax: maps [0, 6000] → [0, -540]
        const parallaxY = -(scrollY * 540 / 6000);
        // Fade: maps [fadeStart, fadeEnd] → [1, 0]
        const fadeStart = windowSize.height * 3;
        const fadeEnd = windowSize.height * 4;
        let opacity = 1;
        if (scrollY > fadeStart) {
          opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
        }
        el.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
        el.style.opacity = String(opacity);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener('scroll', onScroll);
  }, [windowSize.height]);

  const windowWidth = windowSize.width;

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

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ────────────────────────────────────────────────────────────── */}
      {/* LAYER 1: Parallax scroll (RAF-driven, zero React re-renders) */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full"
      >
        {/* ─────────────────────────────────────────────────────── */}
        {/* LAYER 2: Position + Rotation (static transforms)   */}
        {/* ─────────────────────────────────────────────────────── */}
        <div
          className="absolute top-0 right-0 w-[280vw] sm:w-[140vw] md:w-[110vw] lg:w-[90vw] max-w-[1800px] aspect-[552/500] origin-top-right select-none pointer-events-none"
          style={{
            transform: `translateX(${TREE_TRANSLATE_X}px) translateY(${TREE_TRANSLATE_Y}px) rotate(${TREE_ROTATION_DEG}deg)`,
          }}
        >
          {/* LAYER 3: Intro fade-in — CSS transition instead of Framer Motion */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-[3000ms] ease-out"
            style={{ opacity: loading ? 0 : 1 }}
          >
            {/* The Tree Image — static, no continuous animation */}
            <Image
              className={`absolute top-0 right-0 w-full h-full object-contain object-right-top transition-opacity duration-[1500ms] ease-in-out origin-top-right ${imageLoaded ? 'opacity-[0.85] dark:opacity-[0.75]' : 'opacity-0'}`}
              src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/tree.svg"
              alt="Sakura Tree"
              priority
              onLoad={() => setImageLoaded(true)}
              fill
              style={{ animation: 'tree-sway 14s ease-in-out infinite' }}
            />
            {/* Gradient overlay for fade out (replaces expensive mask-image) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 80%, var(--background) 100%)' }} />

          </div>
        </div>
      </div>
    </div>
  );
}

