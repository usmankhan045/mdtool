// Pings the IndexNow API (Bing, Yandex, Naver, Seznam, etc.) with the URLs from
// the live sitemap that changed recently, so non-Google search engines pick up
// new/changed pages without waiting for their next crawl.
//
// Usage:
//   node scripts/submit-indexnow.js         # URLs whose <lastmod> is within the last 7 days
//   node scripts/submit-indexnow.js --all   # every URL in the sitemap
//
// Runs from .github/workflows/indexnow.yml after each successful Vercel
// Production deployment. Resubmitting unchanged URLs on every deploy wastes
// crawl budget and can get the key throttled, hence the 7-day window.

const HOST = 'www.mdtool.dev';
const KEY = '3e2fb53d3709235356deab8d9a7af781';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const RECENT_DAYS = 7;
const MAX_URLS_PER_REQUEST = 10000; // IndexNow protocol limit

const submitAll = process.argv.includes('--all');

async function getSitemapEntries() {
  // Bypass any edge cache so we read the sitemap of the deployment that just went live.
  const res = await fetch(`${SITEMAP_URL}?t=${Date.now()}`, { headers: { 'Cache-Control': 'no-cache' } });
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => {
    const loc = block.match(/<loc>\s*(.*?)\s*<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>\s*(.*?)\s*<\/lastmod>/)?.[1];
    return { loc, lastmod: lastmod ? new Date(lastmod) : null };
  }).filter((e) => e.loc);
}

function selectUrls(entries) {
  if (submitAll) return entries.map((e) => e.loc);
  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
  return entries
    .filter((e) => e.lastmod && !Number.isNaN(e.lastmod.getTime()) && e.lastmod.getTime() >= cutoff)
    .map((e) => e.loc);
}

async function submit(urlList) {
  for (let i = 0; i < urlList.length; i += MAX_URLS_PER_REQUEST) {
    const batch = urlList.slice(i, i + MAX_URLS_PER_REQUEST);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: batch }),
    });
    console.log(`IndexNow responded ${res.status} for ${batch.length} URLs`);
    if (!res.ok) {
      console.log(await res.text());
      process.exitCode = 1;
    }
  }
}

async function main() {
  const entries = await getSitemapEntries();
  const urls = selectUrls(entries);
  console.log(
    submitAll
      ? `Submitting all ${urls.length} sitemap URLs`
      : `${urls.length} of ${entries.length} sitemap URLs changed in the last ${RECENT_DAYS} days`,
  );
  urls.forEach((u) => console.log(`  ${u}`));
  if (urls.length === 0) return;
  await submit(urls);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
