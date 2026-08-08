"use client";
import { useState, memo } from 'react';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/dieablofx',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: 'Twitter (X)',
    url: 'https://x.com/dieablofx',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dieablofx',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    name: 'Behance',
    url: 'https://behance.net/dieablofx',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3 4.412-3h-7.996v3zm0 5.988h3.816c2.508 0 2.906-3 4.412-3h-8.228v3z"/>
      </svg>
    )
  },
  {
    name: 'Discord',
    url: 'dieablo', // username to copy
    isCopy: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="currentColor">
        <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.08 0A72.37 72.37 0 0 0 45.67 0a105.14 105.14 0 0 0-26.22 8.09C2.79 32.65-1.73 56.6 .37 80.05a105.73 105.73 0 0 0 32.17 16.31 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.31c2.26-26.4-3.32-50-19.13-71.98zM42.49 65.16c-5.36 0-9.8-4.93-9.8-11s4.38-11 9.8-11 9.88 4.93 9.8 11-4.43 11-9.8 11zm42.16 0c-5.36 0-9.8-4.93-9.8-11s4.38-11 9.8-11 9.88 4.93 9.8 11-4.43 11-9.8 11z" />
      </svg>
    )
  },

  {
    name: 'Email',
    url: 'hello@dieablo.com', // fallback
    isCopy: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
];

export const SocialSidebar = memo(function SocialSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (username: string) => {
    navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="absolute left-0 lg:left-1 xl:left-4 top-[-112px] bottom-[-16px] z-50 hidden lg:flex flex-col items-center select-none w-10"
    >
      {/* Continuous background line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-foreground/10 -z-10" />

      {/* Animated moving dot */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(234,135,156,0.8)] -z-10"
        animate={{ 
          top: ["0%", "100%", "0%"]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Top spacer removed to bring social bay upwards */}      
      {/* Social Title removed */}

      {/* Social Icons Container */}
      <div className="flex flex-col items-center gap-7 py-8 px-3 mt-4 z-10 w-full">
        {SOCIAL_LINKS.map((social) => (
          social.isCopy ? (
            <button
              key={social.name}
              onClick={() => handleCopy(social.url)}
              className="relative text-foreground/80 hover:text-foreground transition-colors group cursor-pointer py-1"
              title={`Copy ${social.name}`}
            >
              {social.icon}
              {/* Tooltip */}
              <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-background text-foreground shadow-md border border-foreground/20 rounded text-[10px] uppercase tracking-wider opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {copied ? 'Copied!' : `Copy ${social.name}`}
              </div>
            </button>
          ) : (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-foreground/80 hover:text-foreground transition-colors group py-1"
            >
              {social.icon}
              {/* Tooltip */}
              <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-background text-foreground shadow-md border border-foreground/20 rounded text-[10px] uppercase tracking-wider opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {social.name}
              </div>
            </a>
          )
        ))}
      </div>
    </motion.div>
  );
});

