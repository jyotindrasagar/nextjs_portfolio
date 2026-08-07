"use client";
import { useState, useRef, useEffect, memo } from 'react';

interface HoverVideoPlayerProps {
  imageUrl?: string;
  videoUrl?: string;
  altText: string;
  baseOpacity?: string;
  baseGrayscale?: string;
  alwaysPlay?: boolean;
  loadDelay?: number;
  children?: React.ReactNode;
}

export const HoverVideoPlayer = memo(function HoverVideoPlayer({
  imageUrl,
  videoUrl,
  altText,
  baseOpacity = "opacity-50",
  baseGrayscale = "grayscale",
  alwaysPlay = false,
  loadDelay = 0,
  children
}: HoverVideoPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDelayPassed, setIsDelayPassed] = useState(false);


  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      const handleLoad = () => setIsPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isPageLoaded) {
      if (loadDelay > 0) {
        const timer = setTimeout(() => setIsDelayPassed(true), loadDelay);
        return () => clearTimeout(timer);
      } else {
        setIsDelayPassed(true);
      }
    }
  }, [isPageLoaded, loadDelay]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy load intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
        } else {
          setIsHovered(false);
        }
      },
      { rootMargin: '50px' } // Load slightly before it comes into view, but pause quickly when out
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.4;
    }
  }, [hasBeenInView]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  useEffect(() => {
    if (!videoRef.current || !hasBeenInView) return;

    // Force pause if user manually paused OR if the component scrolled out of view
    if (isUserPaused || !isInView) {
      videoRef.current.pause();
      return;
    }

    if (alwaysPlay) {
      if (isPageLoaded) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented by browser:', e));
      }
    } else {
      if (isHovered) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented by browser:', e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [alwaysPlay, hasBeenInView, isPageLoaded, isHovered, isUserPaused, isInView, isDelayPassed]);


  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsUserPaused(!isUserPaused)}
    >
      {/* Video Element (Behind Image) */}
      {hasBeenInView && videoUrl && !videoUrl.includes('youtu') && (
        <video
          ref={videoRef}
          src={((alwaysPlay && isDelayPassed) || isHovered) ? videoUrl : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out z-0 ${(isVideoPlaying || isUserPaused) ? 'opacity-100 grayscale-0' : 'opacity-0 grayscale'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
          muted={true}
          playsInline
          loop
          preload="none"
          onPlaying={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        />
      )}

      {/* Thumbnail Image (Fades out if video is playing, otherwise scales/brightens) */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={altText}
          loading="lazy"
          fetchPriority="low"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out z-10 ${(isVideoPlaying || isUserPaused)
            ? 'opacity-0'
            : alwaysPlay || isHovered
              ? 'opacity-100 grayscale-0'
              : `${baseOpacity} ${baseGrayscale}`
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      )}

      {/* Children Overlay */}
      {children && (
        <div className="relative z-20 w-full h-full pointer-events-none">
          {/* pointer-events-none ensures it doesn't block hover, but we need to re-enable pointer events for buttons inside children */}
          <div className="w-full h-full pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
});

