"use client";
import { useEffect, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Calendar, Mail, Clock, ArrowUpRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

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

function TimezoneClock() {
  const [time, setTime] = useState('');

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

  return (
    <div className="flex items-center gap-2.5 text-foreground font-bold text-xs sm:text-sm tracking-[0.15em]">
      <Clock size={15} className="text-accent opacity-90 shrink-0" strokeWidth={1.75} />
      <span>LOCAL CLOCK // {time}</span>
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToast(label);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCalendly = () => {
    if (!document.getElementById('calendly-css')) {
      const link = document.createElement('link');
      link.id = 'calendly-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/dieablofx' });
    } else {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        if (window.Calendly) {
          window.Calendly.initPopupWidget({ url: 'https://calendly.com/dieablofx' });
        }
      };
      document.body.appendChild(script);
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
      <section id="contact" className="relative pt-12 md:pt-16 pb-5 xl:pb-12 bg-transparent border-t border-foreground/10 overflow-hidden">

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
                      className="flex items-center gap-6 px-6 py-4 bg-foreground text-background border border-foreground hover:bg-transparent hover:text-foreground transition-all duration-300 group rounded-[3px]"
                    >
                      <span className="text-[11px] font-mono font-bold tracking-widest uppercase">BOOK A CALL</span>
                      <Calendar size={14} className="opacity-90 group-hover:opacity-100" />
                    </button>
                    <div className="flex items-center gap-3 text-[11px] font-mono font-semibold tracking-widest uppercase text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full border border-foreground/70" />
                      <span>REPLY WITHIN 24H</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Info Grid: Quick Channels (ALL SCREENS) & Timezone Engine (DESKTOP XL ONLY) */}
                <div className="grid pt-8 xl:pt-10 border-t border-foreground/15 grid-cols-1 xl:grid-cols-2 gap-8 text-[11px] sm:text-[12px] uppercase text-foreground/85">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-accent font-mono font-bold text-[11px] md:text-[12px] tracking-[0.2em]">// QUICK CHANNELS</h4>
                    <div className="flex flex-col gap-1.5">
                      <button 
                        aria-label="Copy Email address" 
                        onClick={() => handleCopy('hello@dieablo.com', 'EMAIL')} 
                        className="hover:text-accent transition-colors font-display font-bold text-left text-xs sm:text-sm tracking-[0.15em] flex items-center gap-2.5 group cursor-pointer text-foreground"
                      >
                        <Mail size={15} className="text-accent opacity-90 group-hover:scale-110 transition-transform shrink-0" strokeWidth={1.75} />
                        <span>HELLO@DIEABLO.COM</span>
                        {copiedToast === 'EMAIL' && (
                          <span className="text-[10px] bg-accent text-black font-mono font-extrabold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(255,184,198,0.5)]">✓ COPIED</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="hidden xl:flex flex-col gap-3">
                    <h4 className="text-accent font-mono font-bold text-[11px] md:text-[12px] tracking-[0.2em]">// TIMEZONE ENGINE</h4>
                    <div className="flex flex-col gap-1 font-mono">
                      <TimezoneClock />
                      <span className="text-foreground/50 text-[10px] tracking-[0.2em] font-semibold pl-6">STABLE FEED</span>
                    </div>
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
                        className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-[3px]"
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
                        className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-[3px]"
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
                        className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-[3px]"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[12px] md:text-[13px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">PROJECT TYPE</label>
                      <div className="relative">
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full appearance-none bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono focus:border-accent focus:outline-none transition-colors text-foreground font-medium cursor-pointer rounded-[3px]"
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
                      className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 p-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-[3px] resize-none"
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
                          className="w-full appearance-none bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono focus:border-accent focus:outline-none transition-colors text-foreground font-medium cursor-pointer rounded-[3px]"
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
                          className="w-full appearance-none bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono focus:border-accent focus:outline-none transition-colors text-foreground font-medium cursor-pointer rounded-[3px]"
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
                      className="bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 px-4 py-4 text-sm md:text-base font-mono text-foreground font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/40 rounded-[3px]"
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
                      className="w-full sm:w-auto flex items-center justify-center gap-4 bg-accent border border-white text-white dark:bg-white dark:border-accent dark:text-black px-10 py-4.5 text-[12px] md:text-[13px] font-mono font-extrabold tracking-[0.25em] uppercase transition-colors duration-300 hover:bg-white hover:text-accent dark:hover:bg-accent dark:hover:text-white group disabled:opacity-50 disabled:cursor-not-allowed shadow-md rounded-[3px]"
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
      <Footer />
    </>
  );
}
