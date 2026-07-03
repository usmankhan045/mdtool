/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {},
  // Allow browser-only conversion libs (dynamically imported with ssr:false) to work when using webpack build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'mammoth'];
    }
    return config;
  },
  async redirects() {
    return [
      // Cheat sheet promoted from blog post to permanent top-level reference hub
      { source: '/blog/markdown-cheatsheet', destination: '/markdown-cheat-sheet', permanent: true },
    ];
  },
}
module.exports = nextConfig
