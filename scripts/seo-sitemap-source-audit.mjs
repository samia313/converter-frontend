#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITEMAP_SOURCE = path.join(ROOT, 'lib/seo/sitemap-categories.ts');
const source = fs.readFileSync(SITEMAP_SOURCE, 'utf8');

const groups = ['corePages', 'pdfTools', 'converters', 'securityEditing', 'ocrExtraction', 'aiTools'];
const entries = new Map();
const issues = [];

function parseArray(name) {
  const match = source.match(new RegExp(`const ${name} = \\[(.*?)\\]`, 's'));
  if (!match) throw new Error(`Cannot find sitemap group: ${name}`);
  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

for (const group of groups) {
  for (const slug of parseArray(group)) {
    const key = slug === '/' ? '/' : `/${slug}`;
    if (entries.has(key)) issues.push(`Duplicate sitemap path: ${key} in ${entries.get(key)} and ${group}`);
    entries.set(key, group);
  }
}

for (const [route, group] of entries) {
  if (route === '/') {
    if (!fs.existsSync(path.join(ROOT, 'app/page.tsx'))) issues.push('Missing app/page.tsx for sitemap root');
    continue;
  }

  const pageFile = path.join(ROOT, 'app', route.slice(1), 'page.tsx');
  if (!fs.existsSync(pageFile)) {
    issues.push(`Sitemap route has no matching static page file: ${route} (${group})`);
    continue;
  }

  const pageSource = fs.readFileSync(pageFile, 'utf8');
  if (/noindex/i.test(pageSource) || /index\\s*:\\s*false/i.test(pageSource)) {
    issues.push(`Sitemap route appears non-indexable in source: ${route} (${group})`);
  }
}

const guideRoute = path.join(ROOT, 'app/guides/[slug]/page.tsx');
const blogRoute = path.join(ROOT, 'app/blog/[slug]/page.tsx');
if (!fs.existsSync(guideRoute)) issues.push('Missing dynamic guide route used by guides sitemap');
if (!fs.existsSync(blogRoute)) issues.push('Missing dynamic blog route used by blog sitemap');

console.log(`PDFilio sitemap source audit: ${entries.size} static sitemap paths checked`);
console.log('Guides/blog dynamic route files checked: 2');

if (issues.length) {
  console.error(`Source sitemap issues: ${issues.length}`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log('PASS: every static sitemap URL maps to a page file, sitemap paths are unique, and no sitemap page is marked noindex in source.');
