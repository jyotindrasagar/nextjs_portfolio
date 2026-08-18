"use client";
import React, { useState, useEffect, useRef, useCallback, useId, memo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Maximize, 
  Minimize, 
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Subtitles, 
  Loader2, 
  Clapperboard 
} from 'lucide-react';

interface CustomYouTubePlayerProps {
  url?: string;
  videoId?: string;
  thumbnailUrl?: string;
  title?: string;
  category?: string;
  subCategory?: string;
  trackUrl?: string;
  autoPlay?: boolean;
  lazyMount?: boolean;
  loop?: boolean;
  aspectRatio?: 'video' | 'social' | 'hof' | 'auto';
  className?: string;
  isActive?: boolean;
  onClose?: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
}

// Extract YouTube ID from any YouTube URL format
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;
  const match = urlOrId.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : '';
}

// Format seconds into MM:SS or HH:MM:SS
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Load YouTube Iframe API once
let isApiScriptLoading = false;
let apiScriptPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).YT && (window as any).YT.Player) {
    return Promise.resolve();
  }
  if (apiScriptPromise) {
    return apiScriptPromise;
  }

  apiScriptPromise = new Promise((resolve) => {
    const existingCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (existingCallback) existingCallback();
      resolve();
    };

    if (!isApiScriptLoading) {
      isApiScriptLoading = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  });

  return apiScriptPromise;
}

export const CustomYouTubePlayer = memo(function CustomYouTubePlayer({
  url = '',
  videoId: propVideoId,
  thumbnailUrl,
  title = '',
  category,
  subCategory,
  trackUrl,
  autoPlay = false,
  lazyMount = true,
  loop = false,
  aspectRatio = 'video',
  className = '',
  isActive,
  onClose,
  onActivate,
  onDeactivate,
}: CustomYouTubePlayerProps) {
  const videoId = propVideoId || extractYouTubeId(url);
  const uniqueDomId = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const iframeContainerId = `yt-player-${uniqueDomId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Lazy activation state: false until user clicks to play
  const [hasActivated, setHasActivated] = useState(!lazyMount || autoPlay);

  // When parent signals that another card became active, stop this player
  useEffect(() => {
    if (isActive === false && hasActivated) {
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch {}
      }
      setIsPlaying(false);
      setHasActivated(false);
    }
  }, [isActive, hasActivated]);

  // Playback states
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isCCActive, setIsCCActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);

  const isLoopingRef = useRef(isLooping);
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  // Scrubber drag state & hover preview
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState(0);
  const [showCenterIcon, setShowCenterIcon] = useState(false);

  // Derive poster thumbnail image if none provided
  const effectiveThumbnail = thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');

  // Initialize YouTube player only after user has clicked/activated
  useEffect(() => {
    if (!hasActivated || !videoId) return;
    let isCancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (isCancelled || !document.getElementById(iframeContainerId)) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch {}
      }

      playerRef.current = new (window as any).YT.Player(iframeContainerId, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
          fs: 0,
          disablekb: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
        events: {
          onReady: (e: any) => {
            if (isCancelled) return;
            setIsReady(true);
            const totalDur = e.target.getDuration() || 0;
            setDuration(totalDur);
            e.target.setVolume(volume);
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            if (isCancelled) return;
            const state = e.data;
            if (state === 1) {
              setIsPlaying(true);
              try {
                window.dispatchEvent(new CustomEvent('global-audio-play', { detail: { source: 'youtube' } }));
              } catch {}
            } else if (state === 2) {
              setIsPlaying(false);
            } else if (state === 0) {
              setIsPlaying(false);
              if (isLoopingRef.current) {
                e.target.seekTo(0, true);
                e.target.playVideo();
              }
            }
          },
        },
      });
    });

    return () => {
      isCancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch {}
      }
    };
  }, [hasActivated, videoId, iframeContainerId]);

  // Sync current time and buffered progress while playing
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        if (!isScrubbing) {
          const cur = playerRef.current.getCurrentTime() || 0;
          setCurrentTime(cur);
        }
        const total = playerRef.current.getDuration() || 0;
        if (total > 0 && total !== duration) {
          setDuration(total);
        }
        if (typeof playerRef.current.getVideoLoadedFraction === 'function') {
          setBuffered((playerRef.current.getVideoLoadedFraction() || 0) * 100);
        }
      }
    }, 250);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isScrubbing, duration]);

  // Start Playback on click
  const handleStartPlay = useCallback(() => {
    if (!hasActivated) {
      setHasActivated(true);
      if (onActivate) onActivate();
      return;
    }
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 700);
  }, [hasActivated, isPlaying, onActivate]);

  // Stop / Close playback
  const handleStop = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.stopVideo();
      } catch {}
    }
    setIsPlaying(false);
    setHasActivated(false);
    if (onDeactivate) onDeactivate();
    if (onClose) onClose();
  }, [onClose, onDeactivate]);

  // Seek to timestamp
  const seekTo = useCallback((seconds: number) => {
    if (!playerRef.current) return;
    const clamped = Math.max(0, Math.min(duration, seconds));
    setCurrentTime(clamped);
    playerRef.current.seekTo(clamped, true);
  }, [duration]);

  // Volume & Mute control
  const handleVolumeChange = useCallback((val: number) => {
    setVolume(val);
    if (!playerRef.current) return;
    playerRef.current.setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      playerRef.current.mute();
    } else if (isMuted) {
      setIsMuted(false);
      playerRef.current.unMute();
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (isMuted) {
      setIsMuted(false);
      playerRef.current.unMute();
      playerRef.current.setVolume(volume || 50);
    } else {
      setIsMuted(true);
      playerRef.current.mute();
    }
  }, [isMuted, volume]);

  // CC Captions Toggle
  const toggleCC = useCallback(() => {
    if (!playerRef.current) return;
    const nextState = !isCCActive;
    setIsCCActive(nextState);
    try {
      if (typeof playerRef.current.loadModule === 'function') {
        playerRef.current.loadModule("captions");
      }
      if (typeof playerRef.current.setOption === 'function') {
        playerRef.current.setOption("captions", "track", nextState ? { languageCode: 'en' } : {});
      }
    } catch {}
  }, [isCCActive]);

  // True Native Fullscreen Toggle with full cross-browser vendor prefix support
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current as any;
    const isDocFull = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement);

    if (!isDocFull) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => setIsFullscreen(true));
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => setIsFullscreen(false));
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      } else {
        setIsFullscreen(false);
      }
    }
  }, []);

  // Listen for native Fullscreen state change events across all browsers
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement);
      setIsFullscreen(isFull);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      handleStartPlay();
    } else if (e.key === 'ArrowLeft' || e.key === 'j') {
      e.preventDefault();
      seekTo(currentTime - 5);
    } else if (e.key === 'ArrowRight' || e.key === 'l') {
      e.preventDefault();
      seekTo(currentTime + 5);
    } else if (e.key === 'm') {
      e.preventDefault();
      toggleMute();
    } else if (e.key === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape' && isFullscreen) {
      e.preventDefault();
      if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      } else {
        setIsFullscreen(false);
      }
    }
  };

  // Scrubber calculation helpers
  const getScrubPercentage = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!scrubberRef.current) return 0;
    const rect = scrubberRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    return pos / rect.width;
  };

  const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasActivated) {
      handleStartPlay();
      return;
    }
    setIsScrubbing(true);
    const percent = getScrubPercentage(e);
    const time = percent * duration;
    setScrubTime(time);
    setCurrentTime(time);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const p = getScrubPercentage(moveEvent);
      const t = p * duration;
      setScrubTime(t);
      setCurrentTime(t);
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsScrubbing(false);
      const p = getScrubPercentage(upEvent);
      seekTo(p * duration);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || duration <= 0) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    setHoverPosition(x);
    setHoverTime(percent * duration);
  };

  const handleScrubberMouseLeave = () => {
    setHoverPosition(null);
  };

  const activeTime = isScrubbing ? scrubTime : currentTime;
  const progressPercent = duration > 0 ? (activeTime / duration) * 100 : 0;

  // Aspect ratio styling & Shorts check
  const isSocial = aspectRatio === 'social' || category?.toUpperCase() === 'SOCIAL';
  const aspectClass = aspectRatio === 'social' 
    ? 'aspect-[9/16]' 
    : (aspectRatio === 'hof' ? 'aspect-[2/1]' : 'aspect-video');

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`group/player relative flex flex-col w-full rounded-[3px] overflow-hidden border transition-colors duration-300 focus:outline-none ${
        isFullscreen
          ? 'fixed inset-0 z-[9999] h-screen w-screen !transform-none !scale-100 bg-black rounded-none border-0'
          : hasActivated
          ? 'border-accent/50 shadow-[0_8px_30px_rgba(234,135,156,0.2)] bg-panels/60 dark:bg-[#0F0F10]/60 backdrop-blur-xl z-30'
          : 'border-foreground/10 hover:border-accent/40 hover:shadow-[0_8px_24px_rgba(234,135,156,0.12)] bg-panels/40 dark:bg-[#0F0F10]/40 backdrop-blur-md hover:-translate-y-0.5'
      } ${className}`}
    >
      {/* 1. Video Frame / Poster Canvas */}
      <div 
        onClick={handleStartPlay}
        className={`relative w-full bg-black cursor-pointer overflow-hidden ${
          isFullscreen ? 'flex-1 h-full flex items-center justify-center' : `rounded-t-[3px] ${aspectClass}`
        }`}
      >
        {/* On-demand YouTube Iframe: Mounted ONLY when activated */}
        {hasActivated && (
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
            <div 
              id={iframeContainerId} 
              className="w-full h-full"
            />
          </div>
        )}

        {/* High-resolution fast poster overlay with buttery smooth 500ms cross-fade */}
        <div className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-500 ease-in-out ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}>
          {effectiveThumbnail && (
            <img
              src={effectiveThumbnail}
              alt={title || "Video Preview"}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isFullscreen ? '!transform-none' : 'group-hover/player:scale-105'
              }`}
            />
          )}

          {/* Custom Overlay badges before playback */}
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between z-20 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30">
            {/* Top Row: SubCategory */}
            <div className="flex justify-between items-start gap-2">
              {subCategory ? (
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-[3px]">
                  <Clapperboard size={10} className="text-accent" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white font-extrabold">
                    {subCategory}
                  </span>
                </div>
              ) : <div />}
            </div>

            {/* Bottom Row: Title & Category */}
            <div className="flex flex-col items-start gap-0.5 sm:gap-1 text-left">
              {title && (
                <h3 className="font-display font-bold text-xs sm:text-sm md:text-base tracking-tight text-white uppercase drop-shadow-md line-clamp-2 leading-tight">
                  {title}
                </h3>
              )}
              {category && (
                <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-accent font-extrabold drop-shadow-md">
                  {category}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Subtle Accent Spinner while buffering */}
        {isReady && !isPlaying && hasActivated && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <Loader2 className="w-7 h-7 text-accent animate-spin opacity-70" />
          </div>
        )}
      </div>

      {/* 2. Separated Bottom Controls Dock: Rendered dynamically ONLY when activated */}
      {hasActivated && (
        <div className={`shrink-0 select-none z-50 transition-all duration-300 ${
          isFullscreen 
            ? 'absolute bottom-0 inset-x-0 w-full bg-gradient-to-t from-black via-black/95 to-black/50 border-t border-white/15 px-4 sm:px-8 md:px-12 py-3 sm:py-4 backdrop-blur-2xl' 
            : 'relative w-full max-w-full bg-panels/85 dark:bg-[#0F0F10]/85 border-t border-foreground/10 p-2 sm:p-2.5 sm:px-3 rounded-b-[3px] backdrop-blur-xl'
        } flex flex-col gap-1.5`}>
          
          <div className={`w-full flex flex-col gap-1.5 ${isFullscreen ? 'max-w-7xl mx-auto' : ''}`}>
            {/* Row 1: Timeline Scrubber Bar with Time Labels */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 w-full font-mono text-[9px] sm:text-[10px] text-foreground/80 font-semibold min-w-0">
              {/* Current Elapsed Time */}
              <span className="shrink-0 w-8 sm:w-10 text-left tabular-nums tracking-wider text-foreground/90">
                {formatTime(activeTime)}
              </span>

              {/* Progress Bar Container */}
              <div 
                ref={scrubberRef}
                onMouseDown={handleScrubberMouseDown}
                onMouseMove={handleScrubberMouseMove}
                onMouseLeave={handleScrubberMouseLeave}
                className="group/timeline relative flex-1 h-3.5 sm:h-4 flex items-center cursor-pointer min-w-0"
              >
                {/* Track Background */}
                <div className="w-full h-1 sm:h-1.5 group-hover/timeline:h-2 rounded-[2px] bg-foreground/15 transition-all relative overflow-hidden">
                  {/* Buffered Progress */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-foreground/20 rounded-[2px] transition-all duration-300"
                    style={{ width: `${buffered}%` }}
                  />
                  {/* Played Progress Bar */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-accent rounded-[2px] shadow-[0_0_8px_rgba(234,135,156,0.6)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Scrubber Knob Thumb */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent border border-background shadow-[0_0_6px_rgba(234,135,156,0.9)] transition-transform duration-100 group-hover/timeline:scale-125"
                  style={{ left: `${progressPercent}%` }}
                />

                {/* Hover Time Tooltip */}
                {hoverPosition !== null && duration > 0 && (
                  <div 
                    className="absolute -top-5 -translate-x-1/2 px-1 py-0.5 rounded-[2px] bg-foreground text-background text-[8px] sm:text-[9px] font-mono font-bold pointer-events-none shadow-md backdrop-blur-md z-40"
                    style={{ left: `${hoverPosition}px` }}
                  >
                    {formatTime(hoverTime)}
                  </div>
                )}
              </div>

              {/* Total Duration */}
              <span className="shrink-0 w-8 sm:w-10 text-right tabular-nums tracking-wider text-foreground/50">
                {duration > 0 ? formatTime(duration) : '--:--'}
              </span>
            </div>

            {/* Row 2: Playback Action Bar (Dynamically expands in Fullscreen!) */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0 pt-0.5">
              {/* Left Action Cluster */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Play / Pause Button */}
                <button
                  type="button"
                  onClick={handleStartPlay}
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[3px] bg-foreground/5 hover:bg-accent hover:text-white text-foreground/80 transition-all duration-200 cursor-pointer flex items-center justify-center border border-foreground/10 hover:border-accent shrink-0"
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current translate-x-0.5" />
                  )}
                </button>

                {/* Fullscreen Extra Powers: Skip Backward, Skip Forward, Loop Toggle */}
                {isFullscreen && (
                  <>
                    <button
                      type="button"
                      onClick={() => seekTo(currentTime - 5)}
                      aria-label="Skip Back 5 seconds"
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[3px] bg-foreground/5 hover:bg-accent hover:text-white text-foreground/80 transition-all duration-200 cursor-pointer flex items-center justify-center border border-foreground/10 hover:border-accent shrink-0"
                      title="Skip Back 5s (←)"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => seekTo(currentTime + 5)}
                      aria-label="Skip Forward 5 seconds"
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[3px] bg-foreground/5 hover:bg-accent hover:text-white text-foreground/80 transition-all duration-200 cursor-pointer flex items-center justify-center border border-foreground/10 hover:border-accent shrink-0"
                      title="Skip Forward 5s (→)"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsLooping(!isLooping)}
                      aria-label="Loop Video"
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[3px] transition-all duration-200 cursor-pointer flex items-center justify-center border shrink-0 ${
                        isLooping 
                          ? 'bg-accent border-accent text-white shadow-[0_0_8px_rgba(234,135,156,0.5)]' 
                          : 'bg-foreground/5 border-foreground/10 hover:bg-accent hover:border-accent hover:text-white text-foreground/80'
                      }`}
                      title={isLooping ? "Loop Enabled" : "Loop"}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

                {/* Volume Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-[3px] hover:text-accent text-foreground/75 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  title={isMuted ? "Unmute (M)" : "Mute (M)"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  ) : volume < 50 ? (
                    <Volume1 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  ) : (
                    <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  )}
                </button>

                {/* Sleek Custom Fill-Bar Volume Slider (No circle thumb) */}
                <div
                  role="slider"
                  aria-label="Volume Slider"
                  aria-valuenow={isMuted ? 0 : volume}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                    const newVol = Math.round((pos / rect.width) * 100);
                    handleVolumeChange(newVol);
                  }}
                  onMouseDown={(e) => {
                    const target = e.currentTarget;
                    const updateVol = (moveEvent: MouseEvent) => {
                      const rect = target.getBoundingClientRect();
                      const pos = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
                      const newVol = Math.round((pos / rect.width) * 100);
                      handleVolumeChange(newVol);
                    };
                    const onMouseUp = () => {
                      window.removeEventListener('mousemove', updateVol);
                      window.removeEventListener('mouseup', onMouseUp);
                    };
                    window.addEventListener('mousemove', updateVol);
                    window.addEventListener('mouseup', onMouseUp);
                  }}
                  className={`hidden lg:flex items-center h-5 group/volume shrink-0 cursor-pointer select-none ${
                    isFullscreen ? 'w-24 sm:w-32' : 'w-16 md:w-20'
                  }`}
                  title={`Volume: ${isMuted ? 0 : Math.round(volume)}%`}
                >
                  <div className="w-full h-1.5 group-hover/volume:h-2 rounded-[2px] bg-foreground/15 transition-all overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-accent/90 to-accent rounded-[2px] transition-all"
                      style={{ width: `${isMuted ? 0 : volume}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Action Cluster: (CC Subtitles & Fullscreen everywhere) */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {/* CC Subtitles Button (Available everywhere on all formats) */}
                <button
                  type="button"
                  onClick={toggleCC}
                  aria-label="Toggle Closed Captions"
                  className={`flex items-center gap-0.5 px-1 sm:px-1.5 py-1 rounded-[3px] font-display text-[8.5px] sm:text-[9.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer border shrink-0 ${
                    isCCActive 
                      ? 'border-accent bg-accent text-white shadow-[0_0_8px_rgba(234,135,156,0.4)]' 
                      : 'border-foreground/15 bg-foreground/5 text-foreground/75 hover:border-accent hover:text-accent'
                  }`}
                  title="Closed Captions"
                >
                  <Subtitles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>{isCCActive ? 'ON' : 'OFF'}</span>
                </button>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[3px] bg-foreground/5 hover:bg-accent hover:text-white text-foreground/80 transition-all duration-200 cursor-pointer flex items-center justify-center border border-foreground/10 hover:border-accent shrink-0"
                  title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                >
                  {isFullscreen ? (
                    <Minimize className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  ) : (
                    <Maximize className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
});
