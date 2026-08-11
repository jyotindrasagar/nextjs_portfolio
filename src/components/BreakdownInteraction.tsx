"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, Mail, User, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

function formatCommentTimestamp(rawDate?: string | Date, isMounted?: boolean): string {
  if (!rawDate) return 'Just now';
  const date = new Date(rawDate);
  if (isNaN(date.getTime())) return typeof rawDate === 'string' ? rawDate : 'Just now';

  // During SSR (server rendering), use deterministic hours/minutes to avoid locale hydration mismatch
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const timeString = `${formattedHours}:${minutes} ${ampm}`;

  if (!isMounted) return timeString;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);

  // If less than 1 min
  if (diffSecs < 60) return 'Just now';
  
  // If same calendar day
  const isSameDay = date.toDateString() === now.toDateString();
  if (isSameDay) {
    return timeString;
  }

  // Calculate year difference
  const diffYears = now.getFullYear() - date.getFullYear();
  if (diffYears < 1) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // Older than a year
  const years = Math.max(1, diffYears);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

interface Comment {
  id: string;
  userId?: string;
  author: string;
  avatarUrl?: string;
  text: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
}

export function BreakdownInteraction({ breakdownId }: { breakdownId?: string }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function getUserAndComments() {
      try {
        let currentUser: any = null;
        let currentProfile: any = null;

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          currentUser = user;
          setUser(user);
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (data) {
            currentProfile = data;
            setProfile(data);
          }
        }

        // Fetch persisted comments for this breakdown if breakdownId exists
        if (breakdownId) {
          const { data: dbComments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('breakdown_id', breakdownId)
            .order('created_at', { ascending: false });

          if (!error && dbComments && dbComments.length > 0) {
            // Get unique user IDs from comments to fetch their latest profiles
            const userIds = Array.from(new Set(dbComments.map((c: any) => c.user_id).filter(Boolean)));
            let profileMap: Record<string, any> = {};

            if (userIds.length > 0) {
              const { data: profilesData } = await supabase
                .from('profiles')
                .select('id, username, avatar_url')
                .in('id', userIds);

              if (profilesData) {
                profilesData.forEach((p: any) => {
                  profileMap[p.id] = p;
                });
              }
            }

            setComments(dbComments.map((c: any) => {
              const authorProfile = profileMap[c.user_id];
              return {
                id: c.id,
                userId: c.user_id,
                author: authorProfile?.username || c.author,
                avatarUrl: authorProfile?.avatar_url || c.avatar_url,
                text: c.text,
                createdAt: c.created_at,
                likes: c.likes_count || 0,
                liked: false
              };
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoadingComments(false);
      }
    }
    getUserAndComments();
  }, [supabase, breakdownId]);

  // Determine avatar to display: Custom avatar -> Google OAuth picture -> null
  const userAvatar = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const username = profile?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleLike = async () => {
    const isLiked = !liked;
    setLiked(isLiked);
    setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        const isLiked = !c.liked;
        return {
          ...c,
          liked: isLiked,
          likes: isLiked ? c.likes + 1 : c.likes - 1
        };
      }
      return c;
    }));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    setSubmittingComment(true);

    const nowIso = new Date().toISOString();
    const tempComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      author: username,
      avatarUrl: userAvatar,
      text: newComment,
      createdAt: nowIso,
      likes: 0,
      liked: false
    };

    // Optimistically update UI (most recent at top)
    setComments([tempComment, ...comments]);
    const submittedText = newComment;
    setNewComment('');

    try {
      // Save comment to Supabase database
      if (breakdownId) {
        const { error } = await supabase.from('comments').insert({
          breakdown_id: breakdownId,
          user_id: user.id,
          author: username,
          avatar_url: userAvatar,
          text: submittedText
        });

        if (error) {
          console.error('Failed to save comment to database:', error.message);
        }
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingId(null);
    // Optimistically remove from state
    setComments(comments.filter(c => c.id !== commentId));

    try {
      if (breakdownId && !commentId.startsWith('demo-')) {
        const { error } = await supabase
          .from('comments')
          .delete()
          .eq('id', commentId);

        if (error) {
          console.error('Failed to delete comment from database:', error.message);
        }
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  // Sort comments by created_at descending (most recent first)
  const sortedComments = [...comments].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime() || 0;
    const timeB = new Date(b.createdAt).getTime() || 0;
    return timeB - timeA;
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 pt-16 border-t border-foreground/10 flex flex-col gap-16">
      
      {/* Top Section: Like & Newsletter */}
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        
        {/* Breakdown Page Like Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              liked 
                ? 'bg-accent/20 border-accent/50 text-accent shadow-[0_0_15px_rgba(255,184,198,0.3)]' 
                : 'bg-foreground/5 border-foreground/20 text-foreground/80 hover:bg-foreground/10 hover:border-foreground/40'
            }`}
          >
            <Heart size={16} className={liked ? 'fill-accent text-accent' : ''} />
            {liked ? 'Liked' : 'Like Breakdown'}
            <span className="opacity-60 ml-2 border-l border-current pl-2">
              {likesCount}
            </span>
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="w-full md:w-auto bg-panels border border-foreground/15 rounded-lg p-5 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-foreground font-display font-bold uppercase tracking-wide">
              <Mail size={16} className="text-accent" />
              <span>Join the Newsletter</span>
            </div>
            <p className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">
              Get breakdowns & tutorials straight to your inbox.
            </p>
            
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-xs text-accent font-bold tracking-widest uppercase py-2 bg-accent/10 border border-accent/20 rounded px-4 text-center"
                >
                  ✓ Subscribed successfully
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe} 
                  className="flex items-center gap-2 mt-1"
                >
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border border-foreground/20 text-foreground font-mono text-xs px-3 py-2.5 rounded outline-none focus:border-accent w-full md:w-56 transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-foreground text-background hover:bg-accent font-mono text-xs font-bold uppercase px-4 py-2.5 rounded transition-colors"
                  >
                    Subscribe
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="flex flex-col gap-8">
        <h3 className="font-display font-bold text-2xl uppercase tracking-wide flex items-center gap-3">
          <MessageSquare size={20} className="text-accent" />
          Discussion ({comments.length})
        </h3>

        {/* Comment Input */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
            <div className="flex items-start gap-4">
              {userAvatar ? (
                <img src={userAvatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-foreground/20 shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center border border-foreground/20 shrink-0">
                  <User size={20} className="text-foreground/50" />
                </div>
              )}
              <div className="w-full">
                <textarea 
                  placeholder={`Share your thoughts as ${username}...`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/15 rounded-lg p-4 font-sans text-sm text-foreground outline-none focus:border-accent min-h-[100px] resize-y transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={!newComment.trim() || submittingComment}
                className="flex items-center gap-2 bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-md transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'} <Send size={14} />
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-foreground/5 border border-foreground/15 rounded-lg p-8 flex flex-col items-center justify-center gap-4 text-center">
            <MessageSquare size={32} className="text-foreground/30" />
            <h4 className="font-display font-bold text-lg uppercase tracking-wide">Join the conversation</h4>
            <p className="font-mono text-xs text-foreground/60 max-w-md">
              Sign in via Google to leave a comment, like this breakdown, and customize your profile.
            </p>
            <Link 
              href="/login"
              className="mt-2 bg-foreground text-background hover:bg-accent font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 rounded transition-colors"
            >
              Sign In with Google
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {sortedComments.map((comment) => {
              // Dynamically display latest avatar and username for the logged-in user or fetched profile
              const displayAvatar = (comment.userId && user && comment.userId === user.id)
                ? (userAvatar || comment.avatarUrl)
                : comment.avatarUrl;

              const displayAuthor = (comment.userId && user && comment.userId === user.id)
                ? (username || comment.author)
                : comment.author;

              const formattedTime = formatCommentTimestamp(comment.createdAt, mounted);

              return (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-panels border border-foreground/10 rounded-lg p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {displayAvatar ? (
                        <img src={displayAvatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-foreground/20 shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center border border-foreground/20 shrink-0">
                          <User size={16} className="text-foreground/50" />
                        </div>
                      )}
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                        {displayAuthor}
                      </span>
                    </div>
                    <span suppressHydrationWarning className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
                      {formattedTime}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed pl-11">
                    {comment.text}
                  </p>

                  {/* Comment Actions Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-foreground/5">
                    {/* Delete Confirmation or Button */}
                    {user && comment.userId === user.id ? (
                      deletingId === comment.id ? (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded">
                          <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider">Delete comment?</span>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="font-mono text-[10px] font-bold text-red-400 hover:text-white uppercase tracking-wider bg-red-500 px-2 py-0.5 rounded transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="font-mono text-[10px] text-foreground/60 hover:text-foreground uppercase tracking-wider px-1 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(comment.id)}
                          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-red-400/70 hover:text-red-400 hover:bg-red-500/10 px-2.5 py-1 rounded transition-colors"
                          title="Delete your comment"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      )
                    ) : <div />}

                    {/* Comment Like Button */}
                    <button 
                      onClick={() => handleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded transition-colors ${
                        comment.liked 
                          ? 'text-accent bg-accent/10 font-bold' 
                          : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      <Heart size={13} className={comment.liked ? 'fill-accent text-accent' : ''} />
                      <span>{comment.likes > 0 ? comment.likes : ''} {comment.liked ? 'Liked' : 'Like'}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
