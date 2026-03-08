/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://devmark.tools',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  // Tool pages get highest priority
  transform: async (config, path) => {
    if (path === '/markdown-to-pdf') {
      return { loc: path, changefreq: 'monthly', priority: 1.0 }
    }
    if (path.startsWith('/blog/')) {
      return { loc: path, changefreq: 'monthly', priority: 0.8 }
    }
    return { loc: path, changefreq: 'weekly', priority: 0.7 }
  },
}
