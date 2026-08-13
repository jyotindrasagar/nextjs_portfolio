-- Run this in your Supabase SQL Editor

CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  tags text[] DEFAULT '{}'::text[],
  thumbnail_url text, -- CDN image URL
  category text, -- 'my-work' or 'inspiration'
  is_highlight boolean DEFAULT false,
  read_time text,
  content jsonb DEFAULT '[]'::jsonb
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public blogs are viewable by everyone." ON public.blogs FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert/update/delete
CREATE POLICY "Admins can insert blogs." ON public.blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update blogs." ON public.blogs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete blogs." ON public.blogs FOR DELETE USING (auth.role() = 'authenticated');
