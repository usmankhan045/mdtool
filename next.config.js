/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  // Silence Turbopack warning — html2pdf.js exclusion is handled via dynamic import (ssr:false)
  turbopack: {},
  // Allow html2pdf.js to work when using webpack build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'html2pdf.js'];
    }
    return config;
  },
}
module.exports = nextConfig
