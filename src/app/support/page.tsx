"use client";

import { useState } from 'react';
import Link from 'next/link';
import { LifeBuoy, Mail, MessageSquare, Send, CheckCircle2, ChevronDown, Clock, HelpCircle, ArrowLeft, Copy, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/Footer';

const faqs = [
  {
    q: "What is your typical project turnaround time?",
    a: "Standard turnaround depends on scope: fast-turnaround commercial edits & social motion pieces typically take 3–5 business days. Full-scale 3D CGI sequences, visual effects compositing, and comprehensive brand identity packages typically range from 1 to 3 weeks with scheduled milestone checkpoints."
  },
  {
    q: "What tools and software stack do you use for production?",
    a: "Our core production pipeline leverages Adobe After Effects, Premiere Pro, Maxon Cinema 4D / Blender, Unreal Engine 5 for real-time visualization, DaVinci Resolve for color grading, and custom GLSL shaders/TypeScript tools for interactive web graphics."
  },
  {
    q: "How do client project milestones and payments work?",
    a: "For custom commissions, we provide a detailed proposal and Statement of Work (SOW). Projects usually follow a 50% initiation deposit / 50% final release structure, or multi-stage milestone releases for long-term campaigns."
  },
  {
    q: "Can I license your 3D assets, project files, or breakdown presets?",
    a: "Select project breakdown source files, procedural project setups, and presets are released for educational and commercial licensing. Reach out via the inquiry form below detailing the asset you are interested in."
  },
  {
    q: "How do I report a technical issue or broken asset on the website?",
    a: "If you encounter any broken video streams, CDN latency issues, or user portal bugs, send a ticket through the form below with the subject category 'Technical Bug' or email hello@dieablo.com directly."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('project');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToast(label);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Construct mailto link as fallback / direct dispatch
    const subject = encodeURIComponent(`[Support - ${category.toUpperCase()}] Inquiry from ${name}`);
    const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\nCategory: ${category}\n\nMessage:\n${message}`);
    
    // Open mail client or record submission
    window.location.href = `mailto:hello@dieablo.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[9999] bg-accent text-black font-mono text-[11px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded shadow-2xl border border-white flex items-center gap-2 pointer-events-none"
          >
            <span>✓ {copiedToast} COPIED TO CLIPBOARD</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ea879c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-md sticky top-0">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/dieablofx.svg"
            alt="DieabloFX"
            className="h-5 w-auto logo-image invert dark:invert-0 group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-xs uppercase tracking-[0.2em]">
            Dieablo<span className="text-accent">FX</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors"
          >
            <ArrowLeft size={12} /> Return Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 flex-1">
        {/* Header Title */}
        <div className="mb-12 border-b border-foreground/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
              <LifeBuoy size={14} /> Help Desk & Inquiries
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-foreground">
              Support <span className="text-accent">&</span> Contact
            </h1>
            <p className="font-mono text-xs text-foreground/50 tracking-wider uppercase mt-2">
              Direct assistance, project commissions, licensing & technical support
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] bg-foreground/5 border border-foreground/10 px-4 py-2 rounded-full text-foreground/70 shrink-0">
            <Clock size={13} className="text-accent animate-pulse" />
            <span>Avg. Response: &lt; 24 Hours</span>
          </div>
        </div>

        {/* Quick Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {/* Card 1: Email */}
          <div className="bg-panels border border-foreground/10 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-accent/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Mail size={18} />
                </div>
                <button
                  onClick={() => handleCopy('hello@dieablo.com', 'EMAIL')}
                  className="text-foreground/40 hover:text-foreground p-1 transition-colors"
                  title="Copy Email"
                >
                  <Copy size={14} />
                </button>
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground block mb-1">
                Direct Email
              </span>
              <p className="font-sans text-xs text-foreground/60">
                Official inbox for quotes, commissions & support inquiries.
              </p>
            </div>
            <a
              href="mailto:hello@dieablo.com"
              className="font-mono text-xs text-accent font-bold mt-4 inline-flex items-center gap-1 hover:underline"
            >
              hello@dieablo.com →
            </a>
          </div>

          {/* Card 2: Discord */}
          <div className="bg-panels border border-foreground/10 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-accent/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <MessageSquare size={18} />
                </div>
                <button
                  onClick={() => handleCopy('dieablo', 'DISCORD ID')}
                  className="text-foreground/40 hover:text-foreground p-1 transition-colors"
                  title="Copy Discord"
                >
                  <Copy size={14} />
                </button>
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground block mb-1">
                Discord Chat
              </span>
              <p className="font-sans text-xs text-foreground/60">
                Real-time rapid communication for ongoing active client projects.
              </p>
            </div>
            <button
              onClick={() => handleCopy('dieablo', 'DISCORD ID')}
              className="font-mono text-xs text-accent font-bold mt-4 inline-flex items-center gap-1 text-left"
            >
              @dieablo (Copy ID) →
            </button>
          </div>

          {/* Card 3: Twitter / X */}
          <div className="bg-panels border border-foreground/10 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-accent/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground block mb-1">
                X / Twitter DMs
              </span>
              <p className="font-sans text-xs text-foreground/60">
                Follow updates, breakdown teasers & open direct messages.
              </p>
            </div>
            <a
              href="https://x.com/dieablofx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent font-bold mt-4 inline-flex items-center gap-1 hover:underline"
            >
              @dieablofx ↗
            </a>
          </div>

          {/* Card 4: Instagram */}
          <div className="bg-panels border border-foreground/10 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:border-accent/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Sparkles size={18} />
                </div>
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground block mb-1">
                Instagram Creative
              </span>
              <p className="font-sans text-xs text-foreground/60">
                Behind-the-scenes visual experiments and video reels.
              </p>
            </div>
            <a
              href="https://instagram.com/dieablofx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent font-bold mt-4 inline-flex items-center gap-1 hover:underline"
            >
              @dieablofx ↗
            </a>
          </div>
        </div>

        {/* 2 Columns: Support Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Support Form (7 cols) */}
          <div className="lg:col-span-7 bg-panels border border-foreground/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-display font-bold text-xl uppercase tracking-wider text-foreground mb-2">
              Dispatch Support Ticket
            </h2>
            <p className="font-sans text-xs text-foreground/60 mb-6">
              Fill out the details below to route your inquiry directly to <strong className="text-foreground">hello@dieablo.com</strong>.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl bg-accent/10 border border-accent/30 text-center space-y-3"
              >
                <CheckCircle2 size={32} className="text-accent mx-auto" />
                <h3 className="font-display font-bold text-base uppercase text-foreground">
                  Inquiry Dispatched
                </h3>
                <p className="font-sans text-xs text-foreground/80 max-w-sm mx-auto">
                  Thank you! Your message has been prepared for dispatch to hello@dieablo.com. We will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-[10px] uppercase font-bold text-accent underline mt-2"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-foreground/15 rounded-lg p-3 font-sans text-xs text-foreground outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-foreground/15 rounded-lg p-3 font-sans text-xs text-foreground outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">Inquiry Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-background border border-foreground/15 rounded-lg p-3 font-sans text-xs text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="project">Project Commission / Motion Design Quote</option>
                    <option value="licensing">Asset & Preset Licensing</option>
                    <option value="breakdown">Breakdown Tutorial / Technique Question</option>
                    <option value="technical">Technical Bug / Website Feedback</option>
                    <option value="other">General Inquiries & Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">Message Details *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, timeline, deliverables, or technical question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background border border-foreground/15 rounded-lg p-3 font-sans text-xs text-foreground outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 cursor-pointer"
                >
                  <Send size={14} /> Dispatch Ticket to hello@dieablo.com
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={18} className="text-accent" />
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-panels border border-foreground/10 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 font-display font-bold text-xs uppercase tracking-wide text-foreground hover:text-accent transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={15}
                        className={`text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 text-xs font-sans text-foreground/70 leading-relaxed border-t border-foreground/5">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
