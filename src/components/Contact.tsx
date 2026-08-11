"use client";
import { useEffect, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Calendar, Mail, Clock, ArrowUpRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

declare global {
  interface Window {
    Calendly: any;
  }
}

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  overview: string;
  budget: string;
  timeline: string;
  references: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  overview: '',
  budget: '',
  timeline: '',
  references: '',
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [time, setTime] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToast(label);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/dieablofx' });
    } else {
      window.open('https://calendly.com/dieablofx', '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.projectType || !formData.overview.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, project type, and overview.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyq0A_gRSh2jJZZf5bdr9hAi7XetP_DFFEAOmMGNa9gNzwdv8lcHP8tE1uiKDV7o-N2/exec';

      const formBody = new FormData();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('company', formData.company);
      formBody.append('projectType', formData.projectType);
      formBody.append('overview', formData.overview);
      formBody.append('budget', formData.budget);
      formBody.append('timeline', formData.timeline);
      formBody.append('references', formData.references);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors'
      });

      setStatus('success');
      setFormData(initialFormData);
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <>
      <section id="contact" className="relative pt-12 md:pt-16 pb-5 xl:pb-12 bg-transparent overflow-hidden">
        {/* Top Border constrained by padding */}
        <div className="absolute top-0 left-4 md:left-8 lg:left-12 xl:left-16 right-4 md:right-8 lg:right-12 xl:right-16 h-[1px] bg-foreground/10"></div>

        <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full">
            {/* CAD reference label */}
            <div className="flex items-center gap-2.5 text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-foreground/90 mb-4 md:mb-6 uppercase">
              <span className="text-accent">❖</span>
              <span>SYS.CONTACT // REGISTRATION</span>
            </div>

            {/* MAIN GRID: 2-Column on Desktop (xl:), Clean Single-Column Stacked on iPad & Mobile */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">

              {/* LEFT COLUMN */}
              <div className="xl:col-span-6 flex flex-col">
                <div>
                  <div className="flex items-center gap-3 text-accent text-[11px] font-mono font-bold tracking-widest uppercase mb-4 md:mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>01. GET IN TOUCH</span>
                  </div>

                  <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tight text-foreground uppercase mb-6 md:mb-8">
                    LET'S CREATE<br />SOMETHING IMPACTFUL<span className="text-accent">.</span>
                  </h2>

                  <p className="text-foreground/85 text-sm md:text-base font-normal max-w-md leading-relaxed mb-8 md:mb-12">
                    I'm currently open to commissions, projects, and creative collaborations. Get in touch to discuss Collaborations.
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8 xl:mb-16">
                    <button
                      onClick={openCalendly}
                      className="flex items-center gap-6 px-6 py-4 border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 group"
                    >
                      <span className="text-[11px] font-mono font-bold tracking-widest uppercase">BOOK A CALL</span>
                      <Calendar size={14} className="opacity-70 group-hover:opacity-100" />
                    </button>
                    <div className="flex items-center gap-3 text-[11px] font-mono font-semibold tracking-widest uppercase text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full border border-foreground/70" />
                      <span>REPLY WITHIN 24H</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Info Grid: Quick Channels (ALL SCREENS) & Timezone Engine (DESKTOP XL ONLY) */}
                <div className="grid pt-8 xl:pt-10 border-t border-foreground/15 grid-cols-1 xl:grid-cols-2 gap-8 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-foreground/85">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-accent font-bold tracking-widest">// QUICK CHANNELS</h4>
                    <div className="flex flex-col gap-1.5">
                      <button aria-label="Copy Email address" onClick={() => handleCopy('hello@dieablo.com', 'EMAIL')} className="hover:text-accent transition-colors font-bold text-left text-[11px] sm:text-[12px] flex items-center gap-2 group">
                        <span>HELLO@DIEABLO.COM</span>
                        {copiedToast === 'EMAIL' && (
                          <span className="text-[10px] bg-accent text-black font-extrabold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(255,184,198,0.5)]">✓ COPIED</span>
                        )}
                      </button>
                    </div>
                    <Mail size={15} className="opacity-70 mt-1" strokeWidth={1.5} />
                  </div>

                  <div className="hidden xl:flex flex-col gap-4">
                    <h4 className="text-accent font-bold tracking-widest">// TIMEZONE ENGINE</h4>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-[11px] sm:text-[12px]">LOCAL CLOCK // {time}</span>
                      <span className="text-foreground/60 font-semibold">STABLE FEED</span>
                    </div>
                    <Clock size={15} className="opacity-70 mt-1" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (PROJECT INQUIRY FORM) */}
              <div className="xl:col-span-6">
                <div className="flex items-center gap-3 text-accent text-[12px] font-mono font-bold tracking-[0.2em] uppercase mb-8 md:mb-10">
                  <span>02. PROJECT INQUIRY</span>
                </div>

                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">YOUR NAME</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@dieablo.com"
                        required
                        className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">COMPANY / BRAND (OPTIONAL)</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your brand or company"
                        className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">PROJECT TYPE</label>
                      <div className="relative">
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full appearance-none bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono focus:border-accent focus:outline-none transition-colors text-foreground font-medium cursor-pointer rounded-lg"
                        >
                          <option value="" disabled className="bg-background text-foreground">Select project type</option>
                          <option value="Visual Effects / Compositing" className="bg-background text-foreground">Visual Effects / Compositing</option>
                          <option value="Video Editing & Pacing" className="bg-background text-foreground">Video Editing & Pacing</option>
                          <option value="Motion Graphics & 3D" className="bg-background text-foreground">Motion Graphics & 3D</option>
                          <option value="Commercial Campaign" className="bg-background text-foreground">Commercial Campaign</option>
                          <option value="Other Creative Work" className="bg-background text-foreground">Other Creative Work</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 font-mono text-xs">▼</div>
                      </div>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">PROJECT OVERVIEW</label>
                    <textarea
                      name="overview"
                      value={formData.overview}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell me about your project, goals, and vision..."
                      required
                      className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 p-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-lg resize-none"
                    />
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">BUDGET RANGE</label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full appearance-none bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono focus:border-accent focus:outline-none transition-colors text-foreground font-medium cursor-pointer rounded-lg"
                        >
                          <option value="" disabled className="bg-background text-foreground">Select budget range</option>
                          <option value="< $1,000" className="bg-background text-foreground">&lt; $1,000</option>
                          <option value="$1,000 - $3,000" className="bg-background text-foreground">$1,000 - $3,000</option>
                          <option value="$3,000 - $5,000" className="bg-background text-foreground">$3,000 - $5,000</option>
                          <option value="$5,000+" className="bg-background text-foreground">$5,000+</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 font-mono text-xs">▼</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">TIMELINE</label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full appearance-none bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono focus:border-accent focus:outline-none transition-colors text-foreground font-medium cursor-pointer rounded-lg"
                        >
                          <option value="" disabled className="bg-background text-foreground">Select timeline</option>
                          <option value="ASAP (< 1 Week)" className="bg-background text-foreground">ASAP (&lt; 1 Week)</option>
                          <option value="1 - 2 Weeks" className="bg-background text-foreground">1 - 2 Weeks</option>
                          <option value="1 Month" className="bg-background text-foreground">1 Month</option>
                          <option value="Flexible" className="bg-background text-foreground">Flexible</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 font-mono text-xs">▼</div>
                      </div>
                    </div>
                  </div>

                  {/* References */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">PROJECT ASSETS (WE TRANSFER, DROPBOX, ETC.)</label>
                    <input
                      type="url"
                      name="references"
                      value={formData.references}
                      onChange={handleChange}
                      placeholder="Paste link to your files here..."
                      className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-lg"
                    />
                  </div>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <div className="flex items-center gap-3 px-4 py-3 border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-mono rounded">
                      <CheckCircle size={16} />
                      <span>Inquiry sent successfully! I'll get back to you within 24 hours.</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-3 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono rounded">
                      <AlertCircle size={16} />
                      <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  {/* Submit Row */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto flex items-center justify-center gap-4 bg-accent border border-white text-white dark:bg-white dark:border-accent dark:text-black px-10 py-4.5 text-[12px] md:text-[13px] font-mono font-extrabold tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-white hover:text-accent dark:hover:bg-accent dark:hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed shadow-md rounded-lg"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND INQUIRY</span>
                          <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform font-bold" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Floating Seamless Toast Notification Banner */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[9999] bg-accent text-black font-mono text-[11px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded shadow-[0_0_20px_rgba(255,184,198,0.6)] border border-white flex items-center gap-2 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>✓ {copiedToast} COPIED TO CLIPBOARD!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer copyright and social links */}
      <footer className="mt-6 xl:mt-16 border-t border-foreground/10 px-4 md:px-8 lg:px-12 xl:px-16 pt-4 xl:pt-8 pb-4 xl:pb-12 flex flex-row items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50 select-none">
        <div className="shrink-0">
          <span>&copy; SINCE 2021 // ALL RIGHTS RESERVED</span>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-end gap-3.5 sm:gap-5 md:gap-6">
          <a aria-label="Instagram profile" href="https://instagram.com/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="hidden xl:inline">INSTAGRAM</span>
          </a>

          <a aria-label="Twitter profile" href="https://x.com/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
            <span className="hidden xl:inline">TWITTER</span>
          </a>

          <a aria-label="LinkedIn profile" href="https://www.linkedin.com/in/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="hidden xl:inline">LINKEDIN</span>
          </a>

          <a aria-label="YouTube channel" href="https://youtube.com/@dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
            <span className="hidden xl:inline">YOUTUBE</span>
          </a>

          <a aria-label="Behance profile" href="https://behance.net/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3 4.412-3h-7.996v3zm0 5.988h3.816c2.508 0 2.906-3 4.412-3h-8.228v3z" />
            </svg>
            <span className="hidden xl:inline">BEHANCE</span>
          </a>

          <button aria-label="Copy Discord ID" onClick={() => handleCopy('dieablo', 'DISCORD ID')} className="hover:text-foreground transition-colors flex items-center gap-2 relative">
            <svg width="14" height="14" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.08 0A72.37 72.37 0 0 0 45.67 0a105.14 105.14 0 0 0-26.22 8.09C2.79 32.65-1.73 56.6 .37 80.05a105.73 105.73 0 0 0 32.17 16.31 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.31c2.26-26.4-3.32-50-19.13-71.98zM42.49 65.16c-5.36 0-9.8-4.93-9.8-11s4.38-11 9.8-11 9.88 4.93 9.8 11-4.43 11-9.8 11zm42.16 0c-5.36 0-9.8-4.93-9.8-11s4.38-11 9.8-11 9.88 4.93 9.8 11-4.43 11-9.8 11z" />
            </svg>
            <span className="hidden xl:inline">DISCORD</span>
          </button>

          <button aria-label="Copy Email address" onClick={() => handleCopy('hello@dieablo.com', 'EMAIL')} className="hover:text-foreground transition-colors flex items-center gap-2 relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="hidden xl:inline">EMAIL</span>
          </button>
        </div>
      </footer>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload" 
      />
    </>
  );
}
