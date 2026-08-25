import type { NextConfig } from 'next';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
} satisfies NextConfig;

export default nextConfig;
