"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { KeyRound, Mail, ArrowRight, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSendRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: false,
      },
    });

    if (otpError) {
      // If user doesn't exist or rate limited
      setError(otpError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ea879c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-md">
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

        <Link
          href="/login"
          className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors"
        >
          ← Return to Login
        </Link>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-md mx-auto px-6 py-12 flex flex-col items-center my-auto w-full">
        <div className="w-full bg-panels border border-foreground/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Top Neon Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

          <div className="flex flex-col gap-2 mb-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-2 border border-accent/20">
              <KeyRound size={22} />
            </div>
            <h1 className="font-display font-bold text-2xl uppercase tracking-wider text-foreground">
              Account <span className="text-accent">Recovery</span>
            </h1>
            <p className="font-mono text-[11px] tracking-wider text-foreground/50 uppercase">
              Send single-use authentication passcode
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-mono text-xs uppercase tracking-wider">
              {error}
            </div>
          )}

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-2"
            >
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-xl space-y-2">
                <CheckCircle2 size={24} className="text-accent mx-auto" />
                <span className="font-display font-bold text-xs uppercase text-foreground block">
                  Recovery Code Dispatched
                </span>
                <p className="font-sans text-xs text-foreground/75 leading-relaxed">
                  We have sent a single-use login code to <strong className="text-foreground">{email}</strong>. Check your inbox and spam folder.
                </p>
              </div>

              <Link
                href={`/login?email=${encodeURIComponent(email)}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg hover:brightness-110 transition-all shadow-md mt-2"
              >
                Proceed to Enter Code <ArrowRight size={14} />
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSendRecovery} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={12} className="text-accent" /> Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-foreground/15 rounded-lg p-3 font-mono text-xs text-foreground outline-none focus:border-accent transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-accent/20"
              >
                {loading ? 'Sending Code...' : 'Send Recovery Passcode'} <ArrowRight size={14} />
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="font-mono text-[10px] text-foreground/50 hover:text-foreground uppercase tracking-wider"
                >
                  Remember your details? Sign in instead
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-foreground/10 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
        <div>&copy; DIEABLOFX // ALL RIGHTS RESERVED</div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
        </div>
      </footer>
    </div>
  );
}
