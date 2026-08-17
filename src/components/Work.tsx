"use client";
import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { AnimatedSection } from './AnimatedSection';
import { Clapperboard, ChevronLeft, ChevronRight, ExternalLink, Music, Wrench } from 'lucide-react';

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

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Pagination controls component (placed above in uncollapsed area)
const PaginationControls = memo(function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-foreground/15 bg-panels/60 hover:bg-panels/90 hover:border-accent hover:text-accent text-foreground/80 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        title="Previous Page"
      >
        <ChevronLeft size={13} />
        <span className="tracking-widest font-bold">PREV</span>
      </button>

      <div className="flex items-center gap-1.5 px-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentPage
                ? 'bg-accent scale-125 shadow-[0_0_8px_rgba(234,135,156,0.8)]'
                : 'bg-foreground/25 hover:bg-foreground/50'
            }`}
            title={`Page ${i + 1}`}
          />
        ))}
      </div>

      <span className="text-foreground/40 font-mono text-[10px] tracking-widest px-1">
        {currentPage + 1} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-foreground/15 bg-panels/60 hover:bg-panels/90 hover:border-accent hover:text-accent text-foreground/80 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        title="Next Page"
      >
        <span className="tracking-widest font-bold">NEXT</span>
        <ChevronRight size={13} />
      </button>
    </div>
  );
});

export function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('ALL');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const categories = ['SHOWREEL', 'ALL', 'COMMERCIAL', 'DOCUMENTARY', 'SOCIAL', 'DEMOS', 'TEASERS'];

  const sortedProjects = useMemo(() => {
    const filtered = activeCategory === 'ALL'
      ? projectsData.filter(p => p.category.toUpperCase() !== 'SOCIAL')
      : projectsData.filter(p => {
          if (p.category.toUpperCase() !== activeCategory) return false;
          if (activeCategory === 'COMMERCIAL' && activeSubCategory !== 'ALL') {
            return p.subCategory?.toUpperCase() === activeSubCategory;
          }
          return true;
        });

    return [...filtered].sort((a, b) => {
      if (a.pinPosition !== undefined && b.pinPosition !== undefined) {
        return a.pinPosition - b.pinPosition;
      }
      if (a.pinPosition !== undefined) return -1;
      if (b.pinPosition !== undefined) return 1;
      return 0;
    });
  }, [activeCategory, activeSubCategory]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
    setPlayingVideoId(null);
    setActiveSubCategory('ALL');
  }, [activeCategory]);

  // Listen for navigation button click
  useEffect(() => {
    const handleOpenShowreel = () => {
      setActiveCategory('SHOWREEL');
    };

    window.addEventListener('openShowreel', handleOpenShowreel);
    return () => {
      window.removeEventListener('openShowreel', handleOpenShowreel);
    };
  }, []);

  // Pagination
  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    return sortedProjects.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    );
  }, [sortedProjects, currentPage]);

  const goToPage = (page: number) => {
    setPlayingVideoId(null);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const getEmbedUrl = (project: any) => {
    if (!project.videoUrl) return '';

    if (project.videoUrl.includes('youtu')) {
      const match = project.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      const id = match ? match[1] : '';
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    }

    return project.videoUrl;
  };

  const getThumbnailUrl = (project: any) => {
    if (project.thumbnailUrl) return project.thumbnailUrl;

    if (project.videoUrl && project.videoUrl.includes('youtu')) {
      const match = project.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      const id = match ? match[1] : '';
      if (id) {
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
    }

    return undefined;
  };

  return (
    <section 
      id="work" 
      className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden border-t border-foreground/10"
    >
      {/* Header Area */}
      <div className="mb-8 select-none">
        <AnimatedSection className="flex flex-col items-start text-left">
          {/* CAD reference label */}
          <div className="flex items-center gap-2 text-[9px] min-[360px]:text-[11px] sm:text-[12px] md:text-[14px] tracking-[0.2em] sm:tracking-[0.25em] font-mono font-extrabold text-accent mb-3 sm:mb-4 md:mb-6 uppercase text-left truncate max-w-full">
            <span>❖</span>
            <span className="truncate">INDEX // MY_WORKS</span>
          </div>

          {/* Title */}
          <h2 className="font-display font-bold text-[24px] min-[360px]:text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase leading-none text-left">
            My <span className="text-accent">Works</span>
          </h2>
        </AnimatedSection>
      </div>

      {/* Main Work Content */}
      <div className="overflow-hidden">
        {/* Subtitle, Category Filters & Top Pagination Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-foreground/10 pb-6 mb-8 pt-2 gap-6">
              <div className="flex flex-col items-start text-left flex-1 min-w-0">
                <p className="sr-only">
                  Motion Designer and Video Editor specializing in high-end product advertisements, 3D animation, motion graphics, CGI, VFX compositing, documentaries, commercial videos, UI animation, camera tracking, and cinematic visual storytelling using Blender, After Effects, DaVinci Resolve, Premiere Pro, Unreal Engine, Substance 3D, SynthEyes, and Boris FX.
                </p>
                <p className="text-foreground/60 text-[12px] md:text-[14px] font-mono uppercase tracking-widest mb-4 text-left">
                  Selected projects &amp; visual stories
                </p>

                {/* Filter Categories with safe padding so glow never clips */}
                <div className="flex flex-wrap gap-2 md:gap-3 font-mono text-[10px] md:text-[11px] tracking-[0.15em] justify-start p-1.5 -m-1.5">
                  {categories.map((cat) => {
                    if (cat === 'SHOWREEL') {
                      return (
                        <button
                          key={cat}
                          aria-label={`Filter by ${cat} category`}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 cursor-pointer text-[9px] md:text-[10px] font-display font-bold uppercase tracking-[0.15em] rounded-[3px] ${
                            activeCategory === cat
                              ? 'border border-transparent text-white bg-accent scale-105 shadow-[0_0_15px_rgba(234,135,156,0.5)]'
                              : 'border border-accent/60 text-accent bg-transparent animate-showreel-glow hover:border-accent hover:text-white hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(234,135,156,0.2)]'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={cat}
                        aria-label={`Filter by ${cat} category`}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3.5 py-2 md:px-4 md:py-2.5 transition-all duration-300 cursor-pointer text-[9px] md:text-[10px] font-display font-bold uppercase tracking-[0.15em] rounded-[3px] ${
                          activeCategory === cat
                            ? 'border border-transparent text-white bg-accent shadow-[0_4px_14px_rgba(234,135,156,0.3)] scale-105'
                            : 'border border-foreground/20 text-foreground/80 bg-transparent hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(234,135,156,0.2)]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next Pagination Menu Placed Cleanly Above in the Uncollapsed Area */}
              {totalPages > 1 && activeCategory !== 'SHOWREEL' && (
                <div className="shrink-0 flex items-center self-start lg:self-end pb-1">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </div>
              )}
            </div>

            {/* Main 2-column layout */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
              {/* Left Sidebar */}
              <div className="lg:w-64 lg:shrink-0 lg:sticky lg:top-32 h-fit flex flex-col gap-8 z-40 items-start text-left">
                <AnimatedSection className="flex flex-col items-start text-left w-full">
                  <div className="flex flex-col gap-2 items-start text-left">
                    <h3 className="text-accent font-mono uppercase tracking-[0.2em] text-sm font-extrabold text-left">{activeCategory}</h3>
                    <h2 className="text-foreground font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-left">{categoryInfo[activeCategory]?.title || activeCategory}</h2>
                  </div>

                  <div className="w-[1px] h-12 bg-foreground/30 my-3 hidden lg:block"></div>

                  <p className="text-foreground/90 font-mono text-[11px] md:text-[12px] font-semibold uppercase tracking-widest leading-relaxed max-w-[260px] text-left">
                    {categoryInfo[activeCategory]?.desc || 'SELECTED PROJECTS & VISUAL STORIES.'}
                  </p>

                  {activeCategory === 'COMMERCIAL' && (
                    <div className="flex flex-col gap-2.5 mt-4 w-full">
                      {['ALL', 'ADS', 'LOGO ANIMATIONS'].map((subCat) => (
                        <button
                          key={subCat}
                          onClick={() => setActiveSubCategory(subCat)}
                          className={`text-left px-4 py-2.5 transition-all duration-300 cursor-pointer text-[10px] md:text-[11px] font-display font-bold uppercase tracking-[0.15em] rounded-[3px] w-full ${
                            activeSubCategory === subCat
                              ? 'border border-transparent text-white bg-accent shadow-[0_4px_14px_rgba(234,135,156,0.3)]'
                              : 'border border-foreground/20 text-foreground/80 bg-transparent hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-0.5'
                          }`}
                        >
                          {subCat}
                        </button>
                      ))}
                    </div>
                  )}
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
                      src="https://www.youtube.com/embed/xeoAIGh7EK8?si=YZQL2AmeEVfunRfa&autoplay=0&controls=1&modestbranding=1&rel=0&cc_load_policy=0&iv_load_policy=3"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0 bg-black"
                    />
                  </motion.div>
                ) : (
                  <div className="relative w-full">
                    {/* Grid with smooth progressive lazy staggered card entrance */}
                    <div className={`grid items-center gap-3 md:gap-4 w-full ${activeCategory === 'SOCIAL'
                        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                      }`}>
                      <AnimatePresence mode="popLayout">
                        {paginatedProjects.map((project, idx) => {
                          const isHOF = project.title.toUpperCase().includes('HOF');
                          const aspectClass = activeCategory === 'SOCIAL' 
                            ? 'aspect-[9/16]' 
                            : (isHOF ? 'aspect-[2/1]' : 'aspect-video');
                          
                          return (
                          <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                            key={project.id}
                            aria-label={`View project: ${project.title}`}
                            className={`group relative flex flex-col border border-foreground/10 overflow-hidden w-full bg-background ${aspectClass}`}
                          >
                            {playingVideoId === project.id ? (
                              <div className="w-full h-full relative z-50 bg-black">
                                {project.videoUrl?.includes('youtu') ? (
                                  <iframe
                                    src={getEmbedUrl(project)}
                                    allow="autoplay; fullscreen; encrypted-media"
                                    allowFullScreen
                                    className="w-full h-full border-0 absolute inset-0"
                                  />
                                ) : (
                                  <video
                                    src={project.videoUrl}
                                    controls
                                    autoPlay
                                    loop={project.loop}
                                    className="w-full h-full object-contain absolute inset-0"
                                  />
                                )}
                              </div>
                            ) : (
                              <div 
                                onClick={() => setPlayingVideoId(project.id)}
                                className="w-full h-full relative cursor-pointer"
                              >
                                <HoverVideoPlayer
                                  imageUrl={getThumbnailUrl(project)}
                                  videoUrl={project.videoUrl}
                                  altText={project.title}
                                >
                                  {/* Custom Overlay Inside Video Player */}
                                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between z-20 pointer-events-none">
                                    {/* Top Row: SubCategory and Track Links */}
                                    <div className="flex justify-between items-start gap-2">
                                      {project.subCategory ? (
                                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/10 rounded-[2px]">
                                          <Clapperboard size={9} className="text-accent" />
                                          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white">
                                            {project.subCategory}
                                          </span>
                                        </div>
                                      ) : <div />}

                                      {project.trackUrl && (
                                        <a
                                          href={project.trackUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="pointer-events-auto flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/10 rounded-[2px] font-mono text-[8px] sm:text-[9px] text-foreground/80 hover:text-accent hover:border-accent transition-colors"
                                          title="Listen on Spotify / Apple Music"
                                        >
                                          <Music size={9} className="text-accent" />
                                          <span>Listen / Track</span>
                                          <ExternalLink size={9} />
                                        </a>
                                      )}
                                    </div>

                                    {/* Bottom Row: Title and Subtitle */}
                                    <div className="flex flex-col items-start justify-end gap-0.5 sm:gap-1 text-left">
                                      <h3 className="font-display font-bold text-xs sm:text-sm md:text-[13px] lg:text-sm xl:text-base tracking-tight text-white group-hover:text-accent transition-colors uppercase drop-shadow-md line-clamp-2 leading-tight text-left">
                                        {project.title}
                                      </h3>
                                      <p className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-accent drop-shadow-md text-left">
                                        {project.category}
                                      </p>
                                    </div>
                                  </div>
                                </HoverVideoPlayer>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}

                        {/* Translucent Placeholder Card if count < 4 */}
                        {sortedProjects.length < 4 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`group relative flex flex-col items-center justify-center border border-dashed border-foreground/20 bg-foreground/[0.03] backdrop-blur-md rounded-lg p-6 text-center w-full ${activeCategory === 'SOCIAL' ? 'aspect-[9/16]' : 'aspect-video'} pointer-events-none select-none overflow-hidden`}
                          >
                            <div className="flex flex-col items-center justify-center gap-3 p-4">
                              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent animate-pulse">
                                <Wrench size={18} />
                              </div>
                              <h4 className="font-display font-bold text-xs md:text-sm uppercase tracking-wider text-foreground/80 leading-snug max-w-[240px]">
                                HOLD ON TRYNNA LOAD MORE STUFF UP IN HERE
                              </h4>
                              <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-bold">
                                GIVE ME THE WRENCH 🔧
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
  );
}
