import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Server, RefreshCw, Mail, ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Privacy Policy | DieabloFX",
  description: "Official Privacy Policy for DieabloFX — details on how data, authentication, cookies, and analytics are handled.",
  alternates: {
    canonical: "https://dieablo.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | DieabloFX",
    description: "Official Privacy Policy for DieabloFX — details on how data, authentication, cookies, and analytics are handled.",
    url: "https://dieablo.com/privacy",
    siteName: "DieabloFX",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | DieabloFX",
    description: "Official Privacy Policy for DieabloFX — details on how data, authentication, cookies, and analytics are handled.",
    creator: "@dieablofx",
    site: "@dieablofx",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 22, 2026";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-10 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" />
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
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20 flex-1">
        {/* Title Header */}
        <div className="mb-12 border-b border-foreground/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            <Shield size={14} /> Legal & Data Protection
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            Privacy <span className="text-accent">Policy</span>
          </h1>
          <p className="font-mono text-xs text-foreground/50 tracking-wider uppercase mt-2">
            Last Updated: {lastUpdated} // Effective Worldwide
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Quick Table of Contents (Sticky on Desktop) */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28 space-y-2 font-mono text-xs">
              <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block mb-3">
                Index Navigation
              </span>
              <a href="#overview" className="block text-foreground/70 hover:text-accent transition-colors py-1">1. Overview</a>
              <a href="#collection" className="block text-foreground/70 hover:text-accent transition-colors py-1">2. Data We Collect</a>
              <a href="#usage" className="block text-foreground/70 hover:text-accent transition-colors py-1">3. How We Use Data</a>
              <a href="#cookies" className="block text-foreground/70 hover:text-accent transition-colors py-1">4. Cookies & Analytics</a>
              <a href="#third-parties" className="block text-foreground/70 hover:text-accent transition-colors py-1">5. Third-Party Services</a>
              <a href="#security" className="block text-foreground/70 hover:text-accent transition-colors py-1">6. Security & Storage</a>
              <a href="#rights" className="block text-foreground/70 hover:text-accent transition-colors py-1">7. Your Rights (GDPR/CCPA)</a>
              <a href="#contact" className="block text-foreground/70 hover:text-accent transition-colors py-1">8. Contact Us</a>
            </div>
          </aside>

          {/* Legal Text */}
          <article className="lg:col-span-3 space-y-12 text-foreground/80 font-sans text-sm md:text-base leading-relaxed">
            
            <section id="overview" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">01.</span> Overview
              </h2>
              <p>
                Welcome to <strong>DieabloFX</strong> (<a href="https://dieablo.com" className="text-accent underline">dieablo.com</a>), operated by Jyotindra Narayan Kalyani ("Dieablo", "we", "us", or "our"). We respect your personal privacy and are committed to transparently protecting your personal information.
              </p>
              <p>
                This Privacy Policy explains what information we collect when you visit our website, submit inquiries through our contact forms, interact with our project blogs or breakdowns, authenticate through our user portal, and how that information is handled securely.
              </p>
            </section>

            <section id="collection" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">02.</span> Data We Collect
              </h2>
              <p>
                We only collect data that is strictly necessary to provide our motion design portfolio, communication channels, and interactive features:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-foreground/75 font-sans">
                <li>
                  <strong>Contact & Project Inquiries:</strong> When you submit a project request or support message, we collect your name, email address, company name, project brief, budget range, and timeline.
                </li>
                <li>
                  <strong>Authentication & Profile Data:</strong> If you sign in (via Google OAuth or Email OTP passcodes), we securely store your email, user ID, display name, avatar, and optional bio via Supabase Authentication.
                </li>
                <li>
                  <strong>Feedback & Community Interactions:</strong> When you post comments, reviews, or feedback on breakdown articles, your comment content and associated username are recorded.
                </li>
                <li>
                  <strong>Technical & Usage Data:</strong> Anonymized telemetry including browser type, operating system, page load metrics, screen resolution, and country of origin.
                </li>
              </ul>
            </section>

            <section id="usage" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">03.</span> How We Use Data
              </h2>
              <p>
                Your data is never sold, rented, or monetized. We use collected information exclusively for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                  <span className="font-mono text-xs font-bold uppercase text-accent block mb-1">Direct Client Service</span>
                  <span className="text-xs text-foreground/70">Reviewing and answering project inquiries, scheduling meetings, and delivering custom VFX assets.</span>
                </div>
                <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                  <span className="font-mono text-xs font-bold uppercase text-accent block mb-1">Performance Tuning</span>
                  <span className="text-xs text-foreground/70">Diagnosing video rendering speeds, CDN asset delivery latency, and improving UI responsiveness.</span>
                </div>
                <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                  <span className="font-mono text-xs font-bold uppercase text-accent block mb-1">User Verification</span>
                  <span className="text-xs text-foreground/70">Preventing spam and ensuring authentic feedback on breakdown case studies.</span>
                </div>
                <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                  <span className="font-mono text-xs font-bold uppercase text-accent block mb-1">Security & Safeguarding</span>
                  <span className="text-xs text-foreground/70">Mitigating brute force attempts, rate limiting API endpoints, and protecting server resources.</span>
                </div>
              </div>
            </section>

            <section id="cookies" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">04.</span> Cookies & Analytics
              </h2>
              <p>
                We use cookies and local storage tokens to remember your preferences (such as Dark/Light theme mode, background music mute state, and authentication sessions).
              </p>
              <p>
                We use privacy-friendly analytics tools including <strong>Vercel Analytics</strong> and <strong>Vercel Speed Insights</strong> to collect aggregated, cookieless metrics that do not track you across other websites. You can customize your cookie choices at any time on our <Link href="/cookies" className="text-accent underline font-mono text-xs">Cookie Preferences</Link> page.
              </p>
            </section>

            <section id="third-parties" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">05.</span> Third-Party Services
              </h2>
              <p>
                Our web applications and cloud pipelines integrate trusted infrastructure providers:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-foreground/75">
                <li><strong>Vercel Inc.:</strong> Hosting, edge functions, and telemetry.</li>
                <li><strong>Supabase Inc.:</strong> PostgreSQL database and authentication engine.</li>
                <li><strong>Cloudflare R2:</strong> Content delivery network hosting high-resolution video reels and assets.</li>
                <li><strong>Google Cloud / OAuth:</strong> Secure single sign-on authentication.</li>
                <li><strong>Resend / Email Services:</strong> Transactional dispatch of OTP codes and inquiry routing.</li>
              </ul>
            </section>

            <section id="security" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">06.</span> Security & Storage
              </h2>
              <p>
                We enforce strict SSL/TLS encryption across all endpoints. Authentication secrets and API keys are stored securely using environment isolation, and database records are safeguarded using Row Level Security (RLS) policies in PostgreSQL.
              </p>
            </section>

            <section id="rights" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">07.</span> Your Rights (GDPR & CCPA)
              </h2>
              <p>
                Regardless of your geographic location, you have full ownership of your data. You may request to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-foreground/75">
                <li>Access a copy of any personal data we hold associated with your email.</li>
                <li>Rectify or update incomplete or inaccurate information.</li>
                <li>Request immediate and permanent deletion of your profile and associated comments.</li>
                <li>Withdraw consent for optional analytics or communications.</li>
              </ul>
            </section>

            <section id="contact" className="space-y-4 pt-6 border-t border-foreground/10">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">08.</span> Contact & Data Requests
              </h2>
              <p>
                For any privacy inquiries, data deletion requests, or questions regarding our data practices, please contact us directly:
              </p>
              <div className="p-4 rounded-xl bg-panels border border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-foreground/50 block text-[10px] uppercase tracking-wider">Direct Data Controller</span>
                  <span className="font-bold text-foreground">Jyotindra Narayan Kalyani (DieabloFX)</span>
                </div>
                <a
                  href="mailto:hello@dieablo.com"
                  className="bg-accent text-black font-bold px-4 py-2 rounded uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <Mail size={13} /> hello@dieablo.com
                </a>
              </div>
            </section>

          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
