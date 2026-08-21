import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/blogs',
          '/login',
          '/profile',
          '/auth/',
          '/api/',
          '/access-denied',
          '/maintenance',
          '/reset-password',
        ],
      },
    ],
    sitemap: 'https://dieablo.com/sitemap.xml',
  };
}
