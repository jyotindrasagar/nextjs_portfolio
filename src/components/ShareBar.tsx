"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Check, Share2 } from 'lucide-react';

interface ShareBarProps {
  title: string;
  url?: string;
  slug?: string;
}

export function ShareBar({ title, url, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = url || (slug ? `${window.location.origin}/breakdowns/${slug}` : window.location.href);
      setShareUrl(currentUrl);
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        setCanNativeShare(true);
      }
    }
  }, [url, slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title,
          text: `Check out "${title}" by @dieablofx`,
          url: shareUrl,
        });
      } catch {
        // User canceled or failed
      }
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`Check out "${title}" by @dieablofx`);

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditShareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-xl bg-panels/70 border border-foreground/10 backdrop-blur-md select-none">
      {/* Toast popup */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[9999] bg-accent text-black font-mono text-[11px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded shadow-[0_0_20px_rgba(255,184,198,0.6)] border border-white flex items-center gap-2 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>✓ LINK COPIED TO CLIPBOARD!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-extrabold text-foreground/50 flex items-center gap-1.5">
          <Share2 size={13} className="text-accent" /> Share Case Study:
        </span>
      </div>

      {/* Share Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          aria-label="Copy shareable link"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
            copied
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
              : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground border-foreground/10 hover:border-foreground/20'
          }`}
          title="Copy Link"
        >
          {copied ? <Check size={13} /> : <Link2 size={13} />}
          <span>{copied ? 'Copied' : 'Copy Link'}</span>
        </button>

        {/* Share to X (Twitter) */}
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-foreground/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-foreground/80 transition-all duration-300 border border-foreground/10 hover:border-foreground/30 group"
          title="Share to X"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
          </svg>
          <span className="hidden sm:inline">Post</span>
        </a>

        {/* Share to LinkedIn */}
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-foreground/5 hover:bg-[#0077b5] hover:text-white text-foreground/80 transition-all duration-300 border border-foreground/10 hover:border-[#0077b5]/40 group"
          title="Share to LinkedIn"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        {/* Share to Reddit */}
        <a
          href={redditShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Reddit"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-foreground/5 hover:bg-[#ff4500] hover:text-white text-foreground/80 transition-all duration-300 border border-foreground/10 hover:border-[#ff4500]/40 group"
          title="Share to Reddit"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-hover:scale-110">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.246a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.562 8 13.252c0 .69.56 1.252 1.25 1.252.69 0 1.25-.562 1.25-1.252 0-.69-.56-1.252-1.25-1.252zm5.5 0c-.69 0-1.25.562-1.25 1.252 0 .69.56 1.252 1.25 1.252.69 0 1.25-.562 1.25-1.252 0-.69-.56-1.252-1.25-1.252zm-5.464 3.99a.327.327 0 0 0-.231.096.345.345 0 0 0 0 .484c.797.798 2.012 1.18 3.018 1.18 1.005 0 2.222-.382 3.018-1.18a.345.345 0 0 0 0-.484.327.327 0 0 0-.464 0c-.655.655-1.637.954-2.554.954-.917 0-1.9-.299-2.555-.954a.327.327 0 0 0-.232-.096z"/>
          </svg>
          <span className="hidden sm:inline">Reddit</span>
        </a>

        {/* Native Mobile Share Sheet */}
        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            aria-label="Open share sheet"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-accent text-black hover:brightness-110 transition-all duration-300 cursor-pointer shadow-sm"
            title="More Share Options"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
}
