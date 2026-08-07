'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomVideoPlayerProps {
  url: string;
  loop?: boolean;
}

// Extract YouTube video ID from various URL formats
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?\s]+)/,
    /(?:youtube\.com\/embed\/)([^?\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Declare the YT types for TypeScript
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

// Shared promise so the API script is loaded only once
let ytApiPromise: Promise<void> | null = null;
function loadYTApi(): Promise<void> {
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  });
  return ytApiPromise;
}

export default function CustomVideoPlayer({ url, loop = false }: CustomVideoPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);

  // UI visibility state
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ytPlayerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const videoId = extractVideoId(url);

  // Initialize YouTube player
  useEffect(() => {
    if (!videoId || !playerDivRef.current) return;

    let destroyed = false;

    loadYTApi().then(() => {
      if (destroyed || !playerDivRef.current) return;

      ytPlayerRef.current = new window.YT.Player(playerDivRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          playsinline: 1,
          loop: loop ? 1 : 0,
          playlist: loop ? videoId : undefined,
          iv_load_policy: 3,
          fs: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            if (destroyed) return;
            setReady(true);
            setDuration(event.target.getDuration());
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (destroyed) return;
            // YT.PlayerState: PLAYING=1, PAUSED=2, ENDED=0, BUFFERING=3
            if (event.data === 1) {
              setPlaying(true);
              setEnded(false);
            } else if (event.data === 2) {
              setPlaying(false);
            } else if (event.data === 0) {
              setPlaying(false);
              setEnded(true);
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (ytPlayerRef.current?.destroy) {
        try { ytPlayerRef.current.destroy(); } catch { }
      }
    };
  }, [videoId, loop]);

  // Progress tracking interval
  useEffect(() => {
    if (!ready) return;

    progressIntervalRef.current = setInterval(() => {
      const player = ytPlayerRef.current;
      if (!player?.getCurrentTime || !player?.getDuration) return;

      const currentTime = player.getCurrentTime();
      const totalDuration = player.getDuration();
      const loadedFraction = player.getVideoLoadedFraction?.() ?? 0;

      if (totalDuration > 0) {
        setPlayed(currentTime / totalDuration);
        setDuration(totalDuration);
      }
      setLoaded(loadedFraction);
    }, 250);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [ready]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Rapid fade out on inactivity (1.5 seconds)
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1500);
  }, []);

  const handleMouseLeave = () => {
    setShowControls(false);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
  };

  useEffect(() => {
    handleMouseMove();
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  // Player control handlers
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const player = ytPlayerRef.current;
    if (!player) return;

    if (ended) {
      player.seekTo(0, true);
      player.playVideo();
      setEnded(false);
    } else if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const player = ytPlayerRef.current;
    if (!player) return;

    if (muted) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const player = ytPlayerRef.current;
    if (!player?.seekTo) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const seekTime = percent * duration;
    player.seekTo(seekTime, true);
    setPlayed(percent);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const total = Math.floor(seconds);
    const mm = Math.floor(total / 60);
    const ss = (total % 60).toString().padStart(2, '0');
    const hh = Math.floor(mm / 60);
    if (hh) {
      return `${hh}:${(mm % 60).toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlayPause}
    >
      {/* YouTube Player Container */}
      <div
        ref={playerDivRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Clickable overlay to catch clicks above the iframe */}
      <div className="absolute inset-0 z-10" />

      {/* Custom Replay Button (non-loop only) */}
      {!loop && (
        <AnimatePresence>
          {ended && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
              onClick={handlePlayPause}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Play size={28} fill="white" className="text-white ml-1" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {loop ? (
        /* LOOP MODE: Minimal UI — just a mute button top-right */
        <AnimatePresence>
          {showControls && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors cursor-pointer"
              onClick={handleMute}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>
          )}
        </AnimatePresence>
      ) : (
        /* NORMAL MODE: Full controls — scrubber, play/pause, volume, fullscreen */
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 z-50 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrubber Bar */}
              <div
                className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/scrubber"
                onClick={handleSeek}
              >
                {/* Loaded Buffer */}
                <div
                  className="absolute top-0 left-0 h-full bg-white/40"
                  style={{ width: `${loaded * 100}%` }}
                />
                {/* Played Progress */}
                <div
                  className="absolute top-0 left-0 h-full bg-accent transition-all duration-75"
                  style={{ width: `${played * 100}%` }}
                />
                {/* Hover effect for scrubber */}
                <div className="absolute top-0 left-0 w-full h-full bg-white/0 group-hover/scrubber:bg-white/10 transition-colors" />
              </div>

              {/* Bottom Controls Row */}
              <div className="flex items-center justify-between mt-1 text-white">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="hover:text-accent transition-colors p-1"
                  >
                    {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  </button>
                  <button
                    onClick={handleMute}
                    className="hover:text-accent transition-colors p-1"
                  >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <div className="text-xs font-mono opacity-80 select-none">
                    {formatTime(played * duration)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="hover:text-accent transition-colors p-1"
                  >
                    {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
