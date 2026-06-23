// Pings the IndexNow API (Bing, Yandex, Naver, etc.) with every URL in the
// live sitemap, so non-Google search engines pick up new/changed blog posts
// without waiting for their next crawl.
//
// Usage: node scripts/submit-indexnow.js
// Run manually after a deploy, or wire into CI as a post-deploy step.

const HOST = 'www.mdtool.dev';
const KEY = '3e2fb53d3709235356deab8d9a7af781';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function getSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, urlList }),
  });
  console.log(`IndexNow responded ${res.status} for ${urlList.length} URLs`);
  if (!res.ok) console.log(await res.text());
}

getSitemapUrls()
  .then(submit)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
