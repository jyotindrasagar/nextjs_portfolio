"use client";
import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, type Project } from '../data/projects';
import { CustomYouTubePlayer } from './CustomYouTubePlayer';
import { AnimatedSection } from './AnimatedSection';
import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';

const categoryInfo: Record<string, { title: string; desc: string }> = {
  'SHOWREEL': { title: '2025 SHOWREEL', desc: 'A COMPILATION OF MY BEST DESIGIN, VISUAL EFFECTS AND EDITING WORK.' },
  'ALL': { title: 'ALL WORK', desc: 'A COMPLETE SHOWCASE OF VISUAL STORIES & ANIMATIONS.' },
  'COMMERCIAL': { title: 'COMMERCIAL', desc: 'BRAND CAMPAIGNS & PRODUCT VISUALIZATION.' },
  'DOCUMENTARY': { title: 'DOCUMENTARY', desc: 'RAW NARRATIVES AND REAL-WORLD STORIES.' },
  'SOCIAL': { title: 'SOCIAL STORIES', desc: 'SHORT-FORM STORIES made for social media.' },
  'DEMOS': { title: 'TRIALS & DEMOS', desc: 'EXPERIMENTAL CUTS AND TECHNICAL SHOWCASES.' },
  'TEASERS': { title: 'TEASERS & PROMOS', desc: 'SHORT TRAILERS, TEASERS AND PROMOTIONAL CUTS.' },
};

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'top' | 'bottom';
}

// Reusable Pagination controls component with clickable dots
const PaginationControls = memo(function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'top'
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;
  return (
    <div className={`flex items-center gap-2 sm:gap-3 font-mono text-[11px] select-none ${
      variant === 'bottom' ? 'py-2' : ''
    }`}>
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] border border-foreground/15 bg-panels/60 hover:bg-panels/90 hover:border-accent hover:text-accent text-foreground/80 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        title="Previous Page"
      >
        <ChevronLeft size={13} />
        <span className="tracking-widest font-bold">PREV</span>
      </button>

      {/* Clickable Page Indicator Dots */}
      <div className="flex items-center gap-1.5 px-1.5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onPageChange(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentPage
                ? 'bg-accent scale-125 shadow-[0_0_8px_rgba(234,135,156,0.8)]'
                : 'bg-foreground/25 hover:bg-foreground/60'
            }`}
            title={`Go to Page ${i + 1}`}
          />
        ))}
      </div>

      {/* Page Fraction Text */}
      <span className="text-foreground/50 font-mono text-[10px] tracking-widest px-1">
        {currentPage + 1} / {totalPages}
      </span>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] border border-foreground/15 bg-panels/60 hover:bg-panels/90 hover:border-accent hover:text-accent text-foreground/80 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
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
  const [currentPage, setCurrentPage] = useState(0);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const categories = ['SHOWREEL', 'ALL', 'COMMERCIAL', 'DOCUMENTARY', 'SOCIAL', 'DEMOS', 'TEASERS'];

  // Responsive Items Per Page: Max 2 rows across all screens (6 max on desktop 3 cols x 2 rows, 4 on tablet 2x2, 3 on phone 1x3)
  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      if (activeCategory === 'SOCIAL') {
        if (width < 640) {
          setItemsPerPage(4); // 2 cols x 2 rows
        } else if (width < 1024) {
          setItemsPerPage(6); // 3 cols x 2 rows
        } else {
          setItemsPerPage(8); // 4 cols x 2 rows max
        }
      } else {
        if (width < 768) {
          setItemsPerPage(3); // 1 col x 3 rows on mobile phone
        } else if (width < 1280) {
          setItemsPerPage(4); // 2 cols x 2 rows on tablet / iPad
        } else {
          setItemsPerPage(6); // 3 cols x 2 rows (MAX 2 rows on all desktop / 1440p / 2K / 4K)
        }
      }
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);
    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, [activeCategory]);

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

  // Reset page and active player when category changes
  useEffect(() => {
    setCurrentPage(0);
    setActiveSubCategory('ALL');
    setActivePlayingId(null);
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

  // Pagination calculation
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    return sortedProjects.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [sortedProjects, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setActivePlayingId(null);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  // Touch Swipe Left / Right to paginate
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50 && currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    } else if (diff < -50 && currentPage > 0) {
      goToPage(currentPage - 1);
    }
    setTouchStartX(null);
  };

  const getThumbnailUrl = (project: Project) => {
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
      className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 md:pt-16 pb-8 md:pb-12 border-t border-foreground/10"
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
      <div className="w-full">
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
                          type="button"
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
                        type="button"
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

              {/* Prev / Next Pagination Menu Placed Cleanly in the Header (Desktop, Tablet, Mobile) */}
              {totalPages > 1 && activeCategory !== 'SHOWREEL' && (
                <div className="shrink-0 flex items-center self-start lg:self-end pb-1">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    variant="top"
                  />
                </div>
              )}
            </div>

            {/* Main 2-column layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12 relative">
              {/* Left Sidebar */}
              <div className="lg:w-52 xl:w-60 lg:shrink-0 lg:sticky lg:top-32 h-fit flex flex-col gap-8 z-40 items-start text-left">
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
                          type="button"
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
                    className="w-full max-w-4xl mx-auto mt-4"
                  >
                    <CustomYouTubePlayer
                      videoId="xeoAIGh7EK8"
                      title="2025 Showreel — Visual Effects & Editing"
                      autoPlay={false}
                      aspectRatio="video"
                    />
                  </motion.div>
                ) : (
                  <div 
                    className="relative w-full flex flex-col gap-6"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* Grid: 3 cols x 2 rows max on Desktop, 2 cols x 2 rows on Tablet, 1 col on Mobile */}
                    <div className={`grid items-stretch gap-4 md:gap-5 lg:gap-6 w-full ${
                      activeCategory === 'SOCIAL'
                        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4'
                        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    }`}>
                      <AnimatePresence mode="popLayout">
                        {paginatedProjects.map((project, idx) => {
                          const isHOF = project.title.toUpperCase().includes('HOF');
                          const isPlayingThis = activePlayingId === project.id;
                          const aspectClass = activeCategory === 'SOCIAL' 
                            ? 'social' 
                            : (isHOF ? 'hof' : 'video');
                          
                          return (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 }}
                            key={project.id}
                            aria-label={`View project: ${project.title}`}
                            className={`w-full h-full flex flex-col ${
                              isHOF && !isPlayingThis ? 'justify-center my-auto' : 'justify-start'
                            }`}
                          >
                            <CustomYouTubePlayer
                              url={project.videoUrl}
                              thumbnailUrl={getThumbnailUrl(project)}
                              title={project.title}
                              category={project.category}
                              subCategory={project.subCategory}
                              trackUrl={project.trackUrl}
                              lazyMount={true}
                              isActive={isPlayingThis}
                              aspectRatio={aspectClass}
                              onActivate={() => setActivePlayingId(project.id)}
                              onDeactivate={() => {
                                if (activePlayingId === project.id) {
                                  setActivePlayingId(null);
                                }
                              }}
                            />
                          </motion.div>
                        );
                      })}

                        {/* Translucent Placeholder Card if count < 3 */}
                        {sortedProjects.length < 3 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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

                    {/* Mobile & Tablet Bottom Pagination Controls (Hidden on Desktop, No Divider Line) */}
                    {totalPages > 1 && (
                      <div className="block lg:hidden flex items-center justify-center pt-2">
                        <PaginationControls
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={goToPage}
                          variant="bottom"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
  );
}
