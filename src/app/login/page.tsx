"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Suspense } from 'react';

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  // OTP Auth States
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [token, setToken] = useState('');

  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');
  const router = useRouter();
  
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    const callbackUrl = new URL(`${window.location.origin}/auth/callback`);
    if (nextParam) {
      callbackUrl.searchParams.set('next', nextParam);
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setOtpSent(true);
      setMessage('Passcode sent! Check your email.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: token.trim(),
      type: 'email',
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const { data: userData } = await supabase.auth.getUser();
      if (data.session || userData.user) {
        // Check if user has completed profile (username exists)
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', userData.user!.id)
          .single();
          
        if (profile && profile.username) {
          router.push(nextParam || '/');
        } else {
          router.push(`/profile?returnTo=${encodeURIComponent(nextParam || '/')}`);
        }
        router.refresh();
      } else {
        setError('Verification failed. Request a new code.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-panels border border-foreground/10 p-8 rounded-xl shadow-2xl relative overflow-hidden">
      {/* Neon accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
      
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="font-display font-bold text-3xl uppercase tracking-wider text-foreground">
          Access <span className="text-accent">Portal</span>
        </h1>
        <p className="font-mono text-xs tracking-widest text-foreground/50 uppercase">
          Sign in via Google or 6-Digit Passcode
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 font-mono text-xs uppercase tracking-wider">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 p-3 bg-accent/10 border border-accent/30 rounded text-accent font-mono text-xs uppercase tracking-wider">
          {message}
        </div>
      )}

      {/* Google Login Option */}
      {!otpSent && (
        <>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded transition-colors disabled:opacity-50 mb-6"
          >
            {loading ? (
              'Connecting...'
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-foreground/10"></div>
            <span className="flex-shrink mx-4 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">OR VIA EMAIL OTP</span>
            <div className="flex-grow border-t border-foreground/10"></div>
          </div>
        </>
      )}

      {/* OTP Login Form */}
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
              <Mail size={12} className="text-accent" />
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border border-foreground/15 rounded p-3 font-mono text-xs text-foreground outline-none focus:border-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full flex items-center justify-center gap-2 bg-foreground/10 hover:bg-accent hover:text-black text-foreground font-mono text-xs font-bold uppercase tracking-widest py-3 rounded border border-foreground/15 transition-all disabled:opacity-50 mt-1"
          >
            {loading ? 'Sending Code...' : 'Send 6-Digit Passcode'} <ArrowRight size={14} />
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound size={12} className="text-accent" />
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="123456"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-background border border-foreground/15 rounded p-3 font-mono text-center text-lg tracking-[0.4em] font-bold text-foreground outline-none focus:border-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || token.length < 6}
            className="w-full flex items-center justify-center gap-2 bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest py-3 rounded transition-all hover:brightness-110 disabled:opacity-50 mt-1"
          >
            {loading ? 'Verifying...' : 'Verify & Sign In'} <CheckCircle2 size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setToken('');
              setError(null);
              setMessage(null);
            }}
            className="font-mono text-[10px] text-foreground/50 hover:text-foreground uppercase tracking-wider text-center mt-2 border border-foreground/10 px-4 py-2 rounded transition-colors"
          >
            ← Try a different email
          </button>
        </form>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Suspense fallback={<div className="font-mono text-xs text-accent uppercase tracking-widest">Loading portal...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
