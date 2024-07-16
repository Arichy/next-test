import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
