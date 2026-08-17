"use client";

import { useEffect, useRef, useState } from 'react';

interface UseLazyVisibilityOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
}

/**
 * High-performance IntersectionObserver hook for lazy-loading individual
 * cards and assets in horizontally and vertically scrolling carousels.
 */
export function useLazyVisibility<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.01,
  rootMargin = '150px 300px 150px 300px',
  once = true,
  disabled = false,
}: UseLazyVisibilityOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      setHasBeenInView(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      setHasBeenInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          const intersecting = entry.isIntersecting;
          setIsVisible(intersecting);
          if (intersecting) {
            setHasBeenInView(true);
            if (once) {
              observer.disconnect();
            }
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, disabled]);

  return {
    ref: elementRef,
    isVisible: disabled ? true : isVisible,
    hasBeenInView: disabled ? true : hasBeenInView,
  };
}
