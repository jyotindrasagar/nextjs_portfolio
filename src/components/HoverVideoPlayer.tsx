"use client";
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface HoverVideoPlayerProps {
  imageUrl?: string;
  videoUrl?: string;
  altText: string;
  baseOpacity?: string;
  baseGrayscale?: string;
  alwaysPlay?: boolean;
  loadDelay?: number;
  volume?: number;
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
  volume = 0.4,
  children
}: HoverVideoPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDelayPassed, setIsDelayPassed] = useState(loadDelay === 0);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Global audio listener to mute this video if something else plays audio
  useEffect(() => {
    const handleGlobalAudio = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.source !== videoUrl) {
        setIsMuted(true);
      }
    };
    window.addEventListener('global-audio-play', handleGlobalAudio);
    return () => window.removeEventListener('global-audio-play', handleGlobalAudio);
  }, [videoUrl]);

  // Global video listener to pause this video if another video plays (specifically for mobile/tablet)
  useEffect(() => {
    const handleGlobalVideo = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.source !== videoUrl) {
        if (!alwaysPlay) {
          setIsHovered(false);
          setIsUserPaused(false);
        }
      }
    };
    window.addEventListener('global-video-play', handleGlobalVideo);
    return () => window.removeEventListener('global-video-play', handleGlobalVideo);
  }, [videoUrl, alwaysPlay]);

  // Instant hydration timer (replaces slow window.load gate)
  useEffect(() => {
    if (loadDelay > 0) {
      const timer = setTimeout(() => setIsDelayPassed(true), loadDelay);
      return () => clearTimeout(timer);
    } else {
      setIsDelayPassed(true);
    }
  }, [loadDelay]);

  // Lazy load intersection observer with generous viewport margin
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
      { rootMargin: '300px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [shouldMountVideo, volume]);

  // Determine when to mount the video element in the DOM
  useEffect(() => {
    if (!videoUrl || videoUrl.includes('youtu')) return;
    
    if (alwaysPlay && hasBeenInView && isDelayPassed) {
      setShouldMountVideo(true);
    } else if (!alwaysPlay && isHovered && hasBeenInView) {
      setShouldMountVideo(true);
    }
  }, [alwaysPlay, hasBeenInView, isDelayPassed, isHovered, videoUrl]);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (!videoRef.current || !shouldMountVideo) return;

    if (isUserPaused || !isInView) {
      videoRef.current.pause();
      return;
    }

    if (alwaysPlay) {
      if (isDelayPassed) {
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
  }, [alwaysPlay, shouldMountVideo, isHovered, isUserPaused, isInView, isDelayPassed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (videoRef.current && (videoRef.current.paused || !isVideoPlaying)) {
          setIsUserPaused(false);
          setIsHovered(true);
          window.dispatchEvent(new CustomEvent('global-video-play', { detail: { source: videoUrl } }));
        } else {
          setIsUserPaused(true);
        }
      }}
    >
      {/* Video Element — Preload metadata for instant start when alwaysPlay is active */}
      {shouldMountVideo && videoUrl && !videoUrl.includes('youtu') && (
        <video
          ref={videoRef}
          src={((alwaysPlay && isDelayPassed) || isHovered) ? videoUrl : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out z-0 transform-gpu ${(isVideoPlaying || isUserPaused) ? 'opacity-100 grayscale-0' : 'opacity-0 grayscale'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
          muted={isMuted}
          playsInline
          loop
          preload={alwaysPlay ? "metadata" : "none"}
          onPlaying={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        />
      )}

      {/* Thumbnail Image (High priority on hero cards for instant paint, lazy on other cards) */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={altText}
          loading={alwaysPlay ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={alwaysPlay ? "high" : "auto"}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out z-10 ${(isVideoPlaying || isUserPaused)
            ? 'opacity-0'
            : alwaysPlay || isHovered
              ? 'opacity-100 grayscale-0'
              : `${baseOpacity} ${baseGrayscale}`
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      )}

      {/* Mute/Unmute Button (Visible on hover) */}
      {videoUrl && !videoUrl.includes('youtu') && isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isMuted) {
              setIsMuted(false);
              window.dispatchEvent(new CustomEvent('global-audio-play', { detail: { source: videoUrl } }));
            } else {
              setIsMuted(true);
            }
          }}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground/80 hover:bg-background/80 hover:text-foreground transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* Children Overlay */}
      {children && (
        <div className="relative z-20 w-full h-full pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
});
