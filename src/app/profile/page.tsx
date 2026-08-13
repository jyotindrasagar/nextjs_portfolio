"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, LogOut, Camera, Save } from 'lucide-react';
import Link from 'next/link';

function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }

        setUser(user);

        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Supabase Error:', error.message || error);
        }

        if (data) {
          setUsername(data.username || user.user_metadata?.full_name || '');
          setAvatarUrl(data.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || '');
        } else {
          setUsername(user.user_metadata?.full_name || user.email?.split('@')[0] || '');
          setAvatarUrl(user.user_metadata?.avatar_url || user.user_metadata?.picture || '');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (returnTo) {
      router.push(returnTo);
    } else {
      router.push('/');
    }
    router.refresh();
  };

  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const MAX_SIZE = 240;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const webpBase64 = canvas.toDataURL('image/webp', 0.8);
          setAvatarUrl(webpBase64);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setMessage(null);

      const updates = {
        id: user.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      if (returnTo) {
        setTimeout(() => {
          router.push(returnTo);
        }, 1000);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto pt-8 flex flex-col gap-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
          <h1 className="font-display font-bold text-3xl uppercase tracking-wider flex items-center gap-3">
            <User className="text-accent" /> Profile Settings
          </h1>
          <div className="flex gap-4">
            <Link href="/" className="font-mono text-xs text-foreground/60 hover:text-foreground uppercase tracking-widest transition-colors py-2">
              Home
            </Link>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 font-mono text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-widest bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded transition-colors"
            >
              Sign Out <LogOut size={14} />
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 border rounded font-mono text-xs uppercase tracking-wider ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-panels border border-foreground/10 rounded-xl p-8 shadow-xl flex flex-col md:flex-row gap-12 items-start">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-foreground/20 bg-background relative group">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/20">
                  <User size={48} />
                </div>
              )}
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
              >
                <Camera size={24} className="text-white mb-1" />
                <span className="font-mono text-[9px] text-white uppercase tracking-widest">Change</span>
              </div>
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={uploadAvatar}
              disabled={saving}
            />
            
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest text-center max-w-[120px]">
              Click image to upload new avatar
            </span>
          </div>

          {/* Form Section */}
          <form onSubmit={updateProfile} className="flex-1 flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-foreground/70 tracking-widest uppercase">
                Email Address (Read Only)
              </label>
              <input
                type="text"
                value={user?.email || ''}
                disabled
                className="bg-background/50 border border-foreground/10 rounded px-4 py-3 font-mono text-sm text-foreground/50 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] text-foreground/70 tracking-widest uppercase">
                  Username <span className="text-accent">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setUsername(user?.email?.split('@')[0] || '')}
                  className="font-mono text-[9px] text-accent/70 hover:text-accent uppercase tracking-widest transition-colors"
                >
                  Auto-generate
                </button>
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="display_name"
                className="bg-background border border-foreground/20 rounded px-4 py-3 font-mono text-sm outline-none focus:border-accent transition-colors text-foreground"
              />
            </div>

            <div className="pt-4 border-t border-foreground/10">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-accent text-black hover:brightness-110 font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 rounded transition-colors disabled:opacity-50"
              >
                <Save size={14} /> {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse">
          Loading profile...
        </div>
      </div>
    }>
      <ProfileForm />
    </Suspense>
  );
}
