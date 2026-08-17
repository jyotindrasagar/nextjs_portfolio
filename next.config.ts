import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
