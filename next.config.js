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
      // Common short-form URLs people type or link to
      { source: '/md-to-pdf', destination: '/markdown-to-pdf', permanent: true },
      { source: '/md-to-html', destination: '/markdown-to-html', permanent: true },
      { source: '/md-to-word', destination: '/markdown-to-word', permanent: true },
    ];
  },
}
module.exports = nextConfig
