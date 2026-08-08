"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { AnimatedSection } from './AnimatedSection';
import { Clapperboard, ChevronLeft, ChevronRight, ExternalLink, Music } from 'lucide-react';

const categoryInfo: Record<string, { title: string; desc: string }> = {
  'SHOWREEL': { title: '2025 SHOWREEL', desc: 'A COMPILATION OF MY BEST DESIGIN, VISUAL EFFECTS AND EDITING WORK.' },
  'ALL': { title: 'ALL WORK', desc: 'A COMPLETE SHOWCASE OF VISUAL STORIES & ANIMATIONS.' },
  'COMMERCIAL': { title: 'COMMERCIAL', desc: 'BRAND CAMPAIGNS & PRODUCT VISUALIZATION.' },
  'DOCUMENTARY': { title: 'DOCUMENTARY', desc: 'RAW NARRATIVES AND REAL-WORLD STORIES.' },
  'SOCIAL': { title: 'SOCIAL STORIES', desc: 'SHORT-FORM STORIES made for social media.' },
  'DEMOS': { title: 'TRIALS & DEMOS', desc: 'EXPERIMENTAL CUTS AND TECHNICAL SHOWCASES.' },
  'TEASERS': { title: 'TEASERS & PROMOS', desc: 'SHORT TRAILERS, TEASERS AND PROMOTIONAL CUTS.' },
};

// Items per page: 6 = 2 rows × 3 cols on desktop, fits nicely on all screens
const ITEMS_PER_PAGE = 6;

export function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const categories = ['SHOWREEL', 'ALL', 'COMMERCIAL', 'DOCUMENTARY', 'SOCIAL', 'DEMOS', 'TEASERS'];

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData.filter(p => p.category.toUpperCase() !== 'SOCIAL')
    : projectsData.filter(p => p.category.toUpperCase() === activeCategory);

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.pinPosition !== undefined && b.pinPosition !== undefined) {
      return a.pinPosition - b.pinPosition;
    }
    if (a.pinPosition !== undefined) return -1;
    if (b.pinPosition !== undefined) return 1;
    return 0;
  });

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
    setPlayingVideoId(null);
  }, [activeCategory]);

  // Listen for navigation button click
  useEffect(() => {
    const handleOpenShowreel = () => setActiveCategory('SHOWREEL');
    window.addEventListener('openShowreel', handleOpenShowreel);
    return () => window.removeEventListener('openShowreel', handleOpenShowreel);
  }, []);

  // Pagination
  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = sortedProjects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setPlayingVideoId(null);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const getEmbedUrl = (project: any) => {
    const url = project?.videoUrl;
    if (!url) return '';

    let embedUrl = '';
    let videoId = '';

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else {
      return url;
    }

    if (project.loop && videoId) {
      embedUrl += `&loop=1&playlist=${videoId}`;
    }

    return embedUrl;
  };

  const getThumbnailUrl = (project: any) => {
    if (project.videoUrl) {
      if (project.videoUrl.includes('youtube.com/watch?v=')) {
        const id = project.videoUrl.split('v=')[1].split('&')[0];
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
      if (project.videoUrl.includes('youtu.be/')) {
        const id = project.videoUrl.split('youtu.be/')[1].split('?')[0];
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
      if (project.videoUrl.includes('youtube.com/embed/')) {
        const id = project.videoUrl.split('embed/')[1].split('?')[0];
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
    }

    return undefined;
  };

  // Pagination controls component (reused top and bottom)
  const PaginationControls = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex items-center justify-center gap-4 font-mono text-xs">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex items-center gap-1 px-4 py-1.5 bg-black/50 backdrop-blur-md border border-foreground/30 text-foreground/80 hover:text-white hover:bg-black/70 hover:border-foreground/60 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer rounded-sm"
        >
          <ChevronLeft size={14} />
          <span className="tracking-widest">PREV</span>
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentPage
                  ? 'bg-accent scale-125'
                  : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
            />
          ))}
        </div>
        <span className="text-foreground/40 tracking-widest">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-1 px-4 py-1.5 bg-black/50 backdrop-blur-md border border-foreground/30 text-foreground/80 hover:text-white hover:bg-black/70 hover:border-foreground/60 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer rounded-sm"
        >
          <span className="tracking-widest">NEXT</span>
          <ChevronRight size={14} />
        </button>
      </div>
    );
  };

  return (
    <section className="relative pt-0 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* CAD reference label */}
      <div className="flex items-center gap-2.5 text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-foreground/90 mb-4 md:mb-6 uppercase relative z-10">
        <span className="text-accent">❖</span>
        <span>INDEX // SELECTED_WORK</span>
      </div>

      <AnimatedSection>
        <div className="flex flex-col border-b border-foreground/10 pb-8 mb-16 gap-6 relative min-h-[80px]">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase">
              Selected Work
            </h2>
            <p className="sr-only">
              Motion Designer and Video Editor specializing in high-end product advertisements, 3D animation, motion graphics, CGI, VFX compositing, documentaries, commercial videos, UI animation, camera tracking, and cinematic visual storytelling using Blender, After Effects, DaVinci Resolve, Premiere Pro, Unreal Engine, Substance 3D, SynthEyes, and Boris FX.
            </p>
            <p className="text-foreground/50 text-[11px] font-mono uppercase tracking-widest mt-2">
              Selected projects & visual stories
            </p>
          </div>

          {/* Filter categories */}
          <div className="flex flex-wrap gap-3 md:gap-4 font-mono text-[11px] md:text-[12px] tracking-[0.2em] mt-4">
            {categories.map((cat) => {
              if (cat === 'SHOWREEL') {
                return (
                  <motion.button
                    key={cat}
                    aria-label={`Filter by ${cat} category`}
                    onClick={() => setActiveCategory(cat)}
                    animate={
                      activeCategory !== cat
                        ? { boxShadow: ["0px 0px 4px rgba(255,184,198,0.2)", "0px 0px 16px rgba(255,184,198,0.6)", "0px 0px 4px rgba(255,184,198,0.2)"] }
                        : { boxShadow: "0px 0px 20px rgba(255,184,198,0.6)" }
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`px-8 py-3 border transition-all duration-300 cursor-pointer tracking-[0.25em] font-extrabold uppercase rounded-[2px] ${activeCategory === cat
                      ? 'border-accent text-white bg-accent scale-105'
                      : 'border-accent/60 text-accent bg-transparent hover:border-accent hover:text-white hover:bg-accent/20 hover:scale-105'
                      }`}
                  >
                    {cat}
                  </motion.button>
                );
              }

              return (
                <button
                  key={cat}
                  aria-label={`Filter by ${cat} category`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 border transition-all duration-300 cursor-pointer font-bold tracking-[0.2em] uppercase rounded-[2px] ${activeCategory === cat
                    ? 'border-white text-white bg-accent font-extrabold shadow-[0_0_12px_rgba(255,255,255,0.35)] scale-105 dark:bg-accent dark:border-white dark:text-white'
                    : 'border-white/60 text-white/90 bg-accent/90 hover:border-white hover:text-white hover:scale-105 dark:bg-accent/60 dark:border-white/50 dark:text-white/90 dark:hover:bg-accent dark:hover:border-white'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        {/* Left Sidebar */}
        <div className="lg:w-64 lg:shrink-0 lg:sticky lg:top-32 h-fit flex flex-col gap-8 z-40">
          <AnimatedSection>
            <div className="flex flex-col gap-2">
              <h3 className="text-accent font-mono uppercase tracking-[0.2em] text-sm font-extrabold">{activeCategory}</h3>
              <h2 className="text-foreground font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">{categoryInfo[activeCategory]?.title || activeCategory}</h2>
            </div>

            <div className="w-[1px] h-12 bg-foreground/30 my-3 hidden lg:block"></div>

            <p className="text-foreground/90 font-mono text-[11px] md:text-[12px] font-semibold uppercase tracking-widest leading-relaxed max-w-[260px]">
              {categoryInfo[activeCategory]?.desc || 'SELECTED PROJECTS & VISUAL STORIES.'}
            </p>


          </AnimatedSection>
        </div>

        {/* Projects Grid / Showreel */}
        <div className="flex-1 w-full relative z-30">
          {activeCategory === 'SHOWREEL' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] border-2 border-foreground mx-auto mt-4"
            >
              <iframe
                src="https://www.youtube.com/embed/xeoAIGh7EK8?si=YZQL2AmeEVfunRfa&autoplay=1&controls=1&modestbranding=1&rel=0&cc_load_policy=0&iv_load_policy=3"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0 bg-black"
              />
            </motion.div>
          ) : (
            <div className="relative w-full">
              {/* Top pagination - responsive positioning to avoid mobile overlap */}
              <div className="flex justify-center lg:justify-end lg:absolute lg:-top-14 lg:right-0 z-50 mb-6 lg:mb-0 w-full">
                <PaginationControls />
              </div>

              {/* Grid — 2 rows × 3 cols desktop, 2 cols tablet, 1 col mobile */}
              <div className={`grid items-center gap-3 md:gap-4 w-full ${activeCategory === 'SOCIAL'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                <AnimatePresence mode="popLayout">
                  {paginatedProjects.map((project) => {
                    const isHOF = project.title.toUpperCase().includes('HOF');
                    const aspectClass = activeCategory === 'SOCIAL' 
                      ? 'aspect-[9/16]' 
                      : (isHOF ? 'aspect-[2/1]' : 'aspect-video');
                    
                    return (
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{ willChange: "transform, opacity" }}
                      key={project.id}
                      aria-label={`View project: ${project.title}`}
                      role="button"
                      className={`group relative flex flex-col border border-foreground/10 overflow-hidden w-full cursor-pointer bg-background ${aspectClass}`}
                      onClick={() => {
                        if (playingVideoId === project.id) return;
                        setPlayingVideoId(project.id);
                      }}
                    >
                      {playingVideoId === project.id ? (
                        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
                          {project.videoUrl?.includes('youtu') ? (
                            <iframe
                              src={getEmbedUrl(project)}
                              allow="autoplay; fullscreen; encrypted-media"
                              allowFullScreen
                              className="w-full h-full border-0"
                            />
                          ) : (
                            <video
                              src={project.videoUrl}
                              controls
                              autoPlay
                              loop={project.loop}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      ) : (
                        <>
                          {project.videoUrl && (
                            <script type="application/ld+json" dangerouslySetInnerHTML={{
                              __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "VideoObject",
                                "name": project.title,
                                "description": project.description,
                                "thumbnailUrl": getThumbnailUrl(project) || "https://dieablo.com/og-image.png",
                                "uploadDate": "2023-01-01T08:00:00+08:00",
                                "contentUrl": project.videoUrl,
                                "embedUrl": getEmbedUrl(project)
                              })
                            }} />
                          )}
                          <HoverVideoPlayer
                            imageUrl={getThumbnailUrl(project)}
                            videoUrl={project.videoUrl}
                            altText={project.title}
                            baseOpacity="opacity-100"
                            baseGrayscale="grayscale"
                          >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                            {/* Card Content */}
                            <div className="relative h-full flex flex-col justify-between p-3 z-10">
                              {/* Top Row: Icon & Optional Track/Artist Link */}
                              <div className="flex items-center justify-between text-white/90 drop-shadow-md">
                                <Clapperboard size={14} strokeWidth={2} />
                                {(project.trackUrl || project.externalUrl || project.postUrl) && (
                                  <a
                                    href={project.trackUrl || project.externalUrl || project.postUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider bg-black/75 hover:bg-accent text-white px-2 py-1 rounded-sm border border-white/20 transition-all duration-300 pointer-events-auto"
                                    title="Listen to track / artist"
                                  >
                                    <Music size={10} />
                                    <span>Listen / Track</span>
                                    <ExternalLink size={9} />
                                  </a>
                                )}
                              </div>

                              {/* Bottom Row: Title and Subtitle */}
                              <div className="flex flex-col items-start justify-end gap-1">
                                <h3 className="font-display font-bold text-sm md:text-base tracking-tight text-white group-hover:text-accent transition-colors uppercase drop-shadow-md">
                                  {project.title}
                                </h3>
                                <p className="font-mono text-[8px] uppercase tracking-widest text-accent drop-shadow-md">
                                  {project.category}
                                </p>
                              </div>
                            </div>
                          </HoverVideoPlayer>
                        </>
                      )}
                    </motion.div>
                  );
                })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
