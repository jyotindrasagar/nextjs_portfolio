import { MetadataRoute } from 'next';
import { createPublicClient } from '@/utils/supabase/public';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dieablo.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    const supabase = createPublicClient();
    const { data: blogs } = await supabase
      .from('blogs')
      .select('id, slug, updated_at, created_at')
      .order('created_at', { ascending: false });

    if (blogs && Array.isArray(blogs)) {
      const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${baseUrl}/breakdowns/${blog.slug || blog.id}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : (blog.created_at ? new Date(blog.created_at) : new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));

      return [...staticPages, ...blogEntries];
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  return staticPages;
}
