import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    // Club crests from football-data.org; any other host gets 400.
    remotePatterns: [new URL('https://crests.football-data.org/**')],
    // Crests almost never change: a month of cache means fewer re-optimizations.
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
