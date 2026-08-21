"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Trash, Save, Edit, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('my-work');
  const [isHighlight, setIsHighlight] = useState(false);
  const [readTime, setReadTime] = useState('');
  
  // Content sections
  const [sections, setSections] = useState<any[]>([]);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  async function checkAuthAndLoad() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (adminEmail && user.email !== adminEmail) {
      router.push('/access-denied');
      return;
    }
    
    setUser(user);
    await loadBlogs();
  }

  async function loadBlogs() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setBlogs(data);
    setLoading(false);
  }

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setTags('');
    setThumbnailUrl('');
    setVideoUrl('');
    setCategory('my-work');
    setIsHighlight(false);
    setReadTime('');
    setSections([]);
  }

  function editBlog(b: any) {
    setEditingId(b.id);
    setTitle(b.title || '');
    setSlug(b.slug || '');
    setExcerpt(b.excerpt || '');
    setTags(b.tags ? b.tags.join(', ') : '');
    setThumbnailUrl(b.thumbnail_url || '');
    setVideoUrl(b.video_url || '');
    setCategory(b.category || 'my-work');
    setIsHighlight(b.is_highlight || false);
    setReadTime(b.read_time || '');
    setSections(b.content || []);
  }

  async function saveBlog() {
    if (!title || !slug) return alert("Title and Slug are required!");
    
    const blogData = {
      title,
      slug,
      excerpt,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      thumbnail_url: thumbnailUrl,
      video_url: videoUrl,
      category,
      is_highlight: isHighlight,
      read_time: readTime,
      content: sections
    };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase.from('blogs').update(blogData).eq('id', editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('blogs').insert([blogData]);
      error = insertError;
    }
    
    if (error) {
      console.error(error);
      alert("Error saving blog: " + error.message);
      return;
    }

    alert("Blog saved successfully!");
    
    resetForm();
    await loadBlogs();
  }

  async function deleteBlog(id: string) {
    if (confirm("Are you sure?")) {
      await supabase.from('blogs').delete().eq('id', id);
      await loadBlogs();
    }
  }

  function addSection(type: string) {
    setSections([...sections, { type, content: '', url: '' }]);
  }

  function updateSection(index: number, field: string, value: string) {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  }

  function removeSection(index: number) {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  }

  if (loading) return <div className="p-12 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0F0F10] text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Form */}
        <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-display uppercase tracking-widest text-accent">
              {editingId ? 'Edit Blog' : 'New Blog'}
            </h1>
            {editingId && (
              <button onClick={resetForm} className="text-white/50 hover:text-white flex items-center gap-2 text-sm">
                <X size={16} /> Cancel
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input className="flex-1 bg-black/30 border border-white/10 p-3 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
              <input className="flex-1 bg-black/30 border border-white/10 p-3 rounded" placeholder="Slug (e.g. my-cool-post)" value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
            
            <textarea className="bg-black/30 border border-white/10 p-3 rounded min-h-[100px]" placeholder="Excerpt..." value={excerpt} onChange={e => setExcerpt(e.target.value)} />
            
            <div className="flex gap-4">
              <input className="flex-1 bg-black/30 border border-white/10 p-3 rounded" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
              <select className="bg-black/30 border border-white/10 p-3 rounded text-white" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="my-work">My Work</option>
                <option value="inspiration">Inspiration</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <input className="flex-1 bg-black/30 border border-white/10 p-3 rounded" placeholder="Thumbnail Image CDN URL" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} />
              <input className="flex-1 bg-black/30 border border-white/10 p-3 rounded" placeholder="Top Header Video URL (Optional)" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
            </div>
            
            <div className="flex gap-4 items-center">
              <input className="bg-black/30 border border-white/10 p-3 rounded w-48" placeholder="Read Time (e.g. 5 MIN)" value={readTime} onChange={e => setReadTime(e.target.value)} />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isHighlight} onChange={e => setIsHighlight(e.target.checked)} className="w-5 h-5 accent-accent" />
                Highlight Project
              </label>
            </div>

            {/* Dynamic Sections */}
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-lg font-bold mb-4">Blog Content (Sections)</h3>
              
              <div className="flex flex-col gap-6 mb-6">
                {sections.map((sec, i) => (
                  <div key={i} className="bg-black/20 p-4 rounded border border-white/5 relative group">
                    <button onClick={() => removeSection(i)} className="absolute top-2 right-2 text-white/30 hover:text-red-500">
                      <Trash size={16} />
                    </button>
                    
                    <div className="font-mono text-xs text-accent uppercase mb-2">{sec.type} Block</div>
                    
                    {sec.type === 'text' && (
                      <textarea 
                        className="w-full bg-black/30 border border-white/10 p-3 rounded min-h-[100px]" 
                        placeholder="Text content (HTML allowed)..." 
                        value={sec.content} 
                        onChange={e => updateSection(i, 'content', e.target.value)} 
                      />
                    )}
                    
                    {sec.type === 'image' && (
                      <input 
                        className="w-full bg-black/30 border border-white/10 p-3 rounded" 
                        placeholder="Image CDN URL..." 
                        value={sec.url} 
                        onChange={e => updateSection(i, 'url', e.target.value)} 
                      />
                    )}
                    
                    {sec.type === 'youtube' && (
                      <input 
                        className="w-full bg-black/30 border border-white/10 p-3 rounded" 
                        placeholder="YouTube Embed URL (e.g. https://www.youtube.com/embed/...)" 
                        value={sec.url} 
                        onChange={e => updateSection(i, 'url', e.target.value)} 
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => addSection('text')} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-sm flex items-center gap-1">+ Text</button>
                <button onClick={() => addSection('image')} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-sm flex items-center gap-1">+ Image</button>
                <button onClick={() => addSection('youtube')} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-sm flex items-center gap-1">+ YouTube Embed</button>
              </div>
            </div>

            <button onClick={saveBlog} className="mt-8 bg-accent hover:bg-accent/80 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2">
              <Save size={18} /> Save Blog Post
            </button>
          </div>
        </div>
        
        {/* Right Side: List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold font-display uppercase">Published Blogs</h2>
            <Link href="/blogs" className="text-accent hover:underline text-sm font-mono">View Live →</Link>
          </div>
          
          {blogs.length === 0 ? (
            <div className="text-white/40 text-sm italic">No blogs yet. Add one!</div>
          ) : (
            blogs.map(b => (
              <div key={b.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-2">
                <div className="font-bold truncate">{b.title}</div>
                <div className="text-xs text-white/50 font-mono">/{b.slug}</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => editBlog(b)} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded flex items-center gap-1"><Edit size={12}/> Edit</button>
                  <button onClick={() => deleteBlog(b.id)} className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/40 px-3 py-1 rounded flex items-center gap-1"><Trash size={12}/> Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
