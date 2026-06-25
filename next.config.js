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
  // Silence Turbopack warning — html2pdf.js exclusion is handled via dynamic import (ssr:false)
  turbopack: {},
  // Allow browser-only conversion libs (dynamically imported with ssr:false) to work when using webpack build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'html2pdf.js', 'mammoth'];
    }
    return config;
  },
}
module.exports = nextConfig
