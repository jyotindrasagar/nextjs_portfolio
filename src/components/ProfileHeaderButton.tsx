"use client";

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, LogIn, LogOut, Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function ProfileHeaderButton() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (data) setProfile(data);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadUser();

    // Listen for auth state changes in real time
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setProfile(data);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setMenuOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.refresh();
  };

  const userAvatar = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const displayName = profile?.username || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 font-mono text-xs text-foreground/90 hover:text-accent transition-colors bg-panels border border-foreground/15 hover:border-accent/40 px-3 py-1.5 rounded-full shadow-sm group select-none cursor-pointer"
          title="Account Menu"
          aria-expanded={menuOpen}
        >
          {userAvatar ? (
            <img src={userAvatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-foreground/20" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <User size={12} />
            </div>
          )}
          <span className="font-bold tracking-wider uppercase text-[10px] sm:text-[11px] max-w-[90px] sm:max-w-[120px] truncate text-foreground">
            {displayName}
          </span>
          <ChevronDown size={12} className={`text-foreground/50 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-background border border-foreground/15 rounded-xl shadow-2xl py-2 z-[999] font-mono text-xs overflow-hidden backdrop-blur-xl"
            >
              <div className="px-3 py-2 border-b border-foreground/10">
                <span className="text-[10px] text-foreground/50 uppercase tracking-wider block">Logged in as</span>
                <span className="font-bold text-foreground truncate block text-[11px]">{user.email}</span>
              </div>

              <Link
                href={`/profile?returnTo=${encodeURIComponent(pathname)}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-foreground/80 hover:text-accent hover:bg-foreground/5 transition-colors uppercase tracking-wider text-[10px] font-bold"
              >
                <Settings size={13} />
                <span>Profile Settings</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors uppercase tracking-wider text-[10px] font-bold text-left cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Not logged in: Crisp, highly-visible login button with no skeleton lag
  return (
    <Link 
      href={`/login?next=${encodeURIComponent(pathname)}`}
      className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 shadow-md bg-foreground text-background hover:bg-accent hover:text-black hover:scale-105 border border-foreground/10 shrink-0"
      title="Login or Sign Up to DieabloFX"
    >
      <LogIn size={13} className="shrink-0" />
      <span>Sign In</span>
    </Link>
  );
}
