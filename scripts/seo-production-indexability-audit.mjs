#!/usr/bin/env node

const SITE = 'https://pdfilio.com';
const INDEX = `${SITE}/sitemap-index.xml`;
const MAX_CONCURRENCY = 12;
const TIMEOUT_MS = 20000;

function fail(message) {
  throw new Error(message);
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'PDFilio-SEO-Audit/1.0 (+https://pdfilio.com)',
        Accept: 'text/html,application/xml,text/plain,*/*',
      },
      ...options,
    });
    const body = await response.text();
    return { response, body };
  } finally {
    clearTimeout(timer);
  }
}

function absoluteUrl(value) {
  return new URL(value, SITE).href;
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = '';
  return url.href.replace(/\/$/, '') || SITE;
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

function extractTag(html, tag) {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1].trim() : null;
}

function extractCanonical(html) {
  const match = html.match(/<link\\b[^>]*rel=["']canonical["'][^>]*>/i);
  if (!match) return null;
  const href = match[0].match(/href=["']([^"']+)["']/i);
  return href ? absoluteUrl(href[1]) : null;
}

function hasNoindex(html) {
  return /<meta\\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

function assertPublicUrl(url) {
  const parsed = new URL(url);
  if (parsed.origin !== new URL(SITE).origin) fail(`Non-canonical host in sitemap: ${url}`);
  if (parsed.search || parsed.hash) fail(`Query/hash URL in sitemap: ${url}`);
}

async function main() {
  const indexResult = await fetchText(INDEX);
  if (indexResult.response.status !== 200) fail(`Sitemap index returned HTTP ${indexResult.response.status}`);
  const sitemapUrls = extractLocs(indexResult.body);
  if (!sitemapUrls.length) fail('Sitemap index contains no child sitemaps.');

  const allUrls = [];
  const sitemapIssues = [];

  for (const sitemapUrl of sitemapUrls) {
    assertPublicUrl(sitemapUrl);
    const result = await fetchText(sitemapUrl);
    if (result.response.status !== 200) {
      sitemapIssues.push(`${sitemapUrl} -> HTTP ${result.response.status}`);
      continue;
    }
    const locs = extractLocs(result.body);
    if (!locs.length) sitemapIssues.push(`${sitemapUrl} -> no <loc> entries`);
    for (const loc of locs) {
      const url = absoluteUrl(loc);
      assertPublicUrl(url);
      allUrls.push({ url, sitemap: sitemapUrl });
    }
  }

  const seen = new Map();
  for (const entry of allUrls) {
    const key = normalizeUrl(entry.url);
    if (seen.has(key)) {
      sitemapIssues.push(`Duplicate sitemap URL: ${entry.url} (also in ${seen.get(key)})`);
    } else {
      seen.set(key, entry.sitemap);
    }
  }

  const queue = [...seen.keys()];
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < queue.length) {
      const url = queue[cursor++];
      try {
        const { response, body } = await fetchText(url);
        const location = response.headers.get('location');
        const canonical = extractCanonical(body);
        const title = extractTag(body, 'title');
        const status = response.status;
        const finalUrl = location ? absoluteUrl(location) : url;
        const issues = [];

        if (status !== 200) issues.push(`HTTP ${status}`);
        if (status >= 300 && status < 400) issues.push(`redirect -> ${finalUrl}`);
        if (normalizeUrl(finalUrl) !== normalizeUrl(url)) issues.push(`final URL differs -> ${finalUrl}`);
        if (hasNoindex(body)) issues.push('meta robots contains noindex');
        if (!canonical) issues.push('missing canonical');
        else if (normalizeUrl(canonical) !== normalizeUrl(url)) issues.push(`canonical -> ${canonical}`);
        if (!title) issues.push('missing title');

        results.push({ url, status, canonical, title, issues });
      } catch (error) {
        results.push({ url, status: 0, canonical: null, title: null, issues: [String(error?.message || error)] });
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(MAX_CONCURRENCY, queue.length) }, worker));

  const failures = results.filter((r) => r.issues.length);
  console.log(`PDFilio production indexability audit: ${results.length} URLs checked`);
  console.log(`Sitemap index: ${INDEX}`);
  console.log(`Child sitemaps: ${sitemapUrls.length}`);
  console.log(`Sitemap entries: ${allUrls.length}`);
  console.log(`URL failures: ${failures.length}`);

  if (sitemapIssues.length) {
    console.error('\nSITEMAP ISSUES');
    for (const issue of sitemapIssues) console.error(`- ${issue}`);
  }

  if (failures.length) {
    console.error('\nINDEXABILITY ISSUES');
    for (const result of failures) {
      console.error(`- ${result.url}: ${result.issues.join('; ')}`);
    }
  }

  if (sitemapIssues.length || failures.length) process.exit(1);
  console.log('PASS: sitemap membership, HTTP 200, redirect-free URLs, indexable robots meta, and self-canonical URLs are clean.');
}

main().catch((error) => {
  console.error(`SEO audit failed: ${error.message}`);
  process.exit(1);
});
