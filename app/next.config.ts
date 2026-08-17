import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static site to ./out,
  // ready to drop on S3/CloudFront. No Node server at runtime.
  output: 'export',
  images: {
    // The default image optimizer needs a server, which an export doesn't have.
    unoptimized: true,
  },
};

export default nextConfig;
