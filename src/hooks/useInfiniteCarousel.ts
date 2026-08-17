"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { useMotionValue, useAnimationFrame } from 'framer-motion';

interface UseInfiniteCarouselOptions {
  speed?: number; // Base speed in pixels per frame (~60fps)
  direction?: 1 | -1; // -1 for left, 1 for right
  isPaused?: boolean;
  isInView?: boolean;
}

function wrap(val: number, min: number, max: number): number {
  const span = max - min;
  if (span <= 0) return val;
  const offset = ((val - min) % span + span) % span;
  return min + offset;
}

export function useInfiniteCarousel({
  speed = 0.6,
  direction = -1,
  isPaused = false,
  isInView = true,
}: UseInfiniteCarouselOptions = {}) {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const set0Ref = useRef<HTMLDivElement | null>(null);
  const set1Ref = useRef<HTMLDivElement | null>(null);

  const setWidthRef = useRef(0);
  const accumulatedXRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const hasMovedRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const initializedRef = useRef(false);

  // Sync isHovered ref
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Measure the width of one complete set
  const measure = useCallback(() => {
    if (set0Ref.current && set1Ref.current) {
      const w = set1Ref.current.offsetLeft - set0Ref.current.offsetLeft;
      if (w > 0) {
        setWidthRef.current = w;
        if (!initializedRef.current) {
          accumulatedXRef.current = -w;
          x.set(-w);
          initializedRef.current = true;
        } else {
          const wrapped = wrap(accumulatedXRef.current, -w, 0);
          x.set(wrapped);
        }
      }
    }
  }, [x]);

  useEffect(() => {
    measure();
    const timer = setTimeout(measure, 60);
    const timer2 = setTimeout(measure, 300);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        measure();
      });
      resizeObserver.observe(containerRef.current);
      if (set0Ref.current) resizeObserver.observe(set0Ref.current);
      if (set1Ref.current) resizeObserver.observe(set1Ref.current);
    }

    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
      clearTimeout(timer2);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [measure]);

  // Continuous animation frame loop
  useAnimationFrame((_, delta) => {
    const w = setWidthRef.current;
    if (w <= 0 || !isInView || isPaused) return;

    if (isDraggingRef.current) {
      // Actively dragged by touch/pointer, physics handled in pointermove
      return;
    }

    // Apply inertia / momentum decay with smooth friction
    if (Math.abs(velocityRef.current) > 0.05) {
      accumulatedXRef.current += velocityRef.current;
      velocityRef.current *= 0.94;
      if (Math.abs(velocityRef.current) <= 0.05) {
        velocityRef.current = 0;
      }
    } else if (!isHoveredRef.current) {
      // Auto marquee scrolling
      const clampedDelta = Math.min(delta, 32);
      const moveBy = speed * (clampedDelta / 16);
      accumulatedXRef.current += moveBy * direction;
    }

    // Infinite wrapping into [-w, 0)
    const wrapped = wrap(accumulatedXRef.current, -w, 0);
    x.set(wrapped);
  });

  // Pointer event handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return; // Primary button only

    const target = e.currentTarget as HTMLElement;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {}

    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;

    if (Math.abs(currentX - startXRef.current) > 4) {
      hasMovedRef.current = true;
    }

    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 8);
    const instantVel = (deltaX / dt) * 16;
    velocityRef.current = velocityRef.current * 0.3 + instantVel * 0.7;

    lastXRef.current = currentX;
    lastTimeRef.current = now;

    accumulatedXRef.current += deltaX;

    const w = setWidthRef.current;
    if (w > 0) {
      const wrapped = wrap(accumulatedXRef.current, -w, 0);
      x.set(wrapped);
    }
  }, [x]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    const target = e.currentTarget as HTMLElement;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handlePointerCancel = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    const target = e.currentTarget as HTMLElement;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const shift = useCallback((deltaPx: number) => {
    velocityRef.current = deltaPx / 10;
  }, []);

  return {
    x,
    isDragging,
    isHovered,
    hasMovedRef,
    containerRef,
    set0Ref,
    set1Ref,
    measure,
    shift,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
