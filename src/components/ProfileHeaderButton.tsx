"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, LogIn } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProfileHeaderButton() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (data) setProfile(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [supabase]);

  const userAvatar = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-foreground/10 animate-pulse border border-foreground/10" />
    );
  }

  if (user) {
    return (
      <Link 
        href={`/profile?returnTo=${encodeURIComponent(pathname)}`}
        className="flex items-center gap-2 font-mono text-xs text-foreground/80 hover:text-accent transition-colors bg-panels border border-foreground/15 hover:border-accent/40 px-3 py-1.5 rounded-full shadow-sm group"
        title="Profile Settings"
      >
        {userAvatar ? (
          <img src={userAvatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-foreground/20" />
        ) : (
          <User size={16} className="text-accent" />
        )}
        <span className="font-bold tracking-wider uppercase text-[11px] max-w-[100px] truncate">
          {profile?.username || user?.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
        </span>
      </Link>
    );
  }

  return (
    <Link 
      href={`/login?next=${encodeURIComponent(pathname)}`}
      className="flex items-center gap-2 font-mono text-xs font-bold text-background bg-foreground hover:bg-accent hover:text-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-300 shadow-md"
    >
      <LogIn size={14} />
      <span>Sign In</span>
    </Link>
  );
}
