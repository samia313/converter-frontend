# Sitemap Quick Reference - Copy & Paste URLs

## Master Sitemap (Add This Everywhere)

```
https://pdfilio.com/api/sitemap-index
```

---

## Google Search Console

### Step 1: Go to GSC
https://search.google.com/search-console

### Step 2: Add Sitemap
1. Left sidebar → **Sitemaps**
2. Click **"Add a new sitemap"**
3. Paste: `https://pdfilio.com/api/sitemap-index`
4. Click **Submit**

---

## Bing Webmaster Tools

### Step 1: Go to Bing Webmasters
https://www.bing.com/webmasters

### Step 2: Add Sitemap
1. Left sidebar → **Sitemaps**
2. Click **"Add Sitemap"**
3. Paste: `https://pdfilio.com/api/sitemap-index`
4. Click **Submit**

---

## Google Analytics 4

### Step 1: Link Search Console
1. Open **Google Analytics 4** for pdfilio.com
2. Go to **Admin** (gear icon) → **Search Console links**
3. Click **Link Search Console**
4. Select **pdfilio.com**
5. Click **Confirm**

### Step 2: Monitor Organic Traffic
- Reports → Acquisition → Organic Search

---

## Individual Sitemaps (For Monitoring Specific Categories)

If you want to monitor each category separately in GSC:

| Category | URL |
|----------|-----|
| Blog Posts (1200) | `https://pdfilio.com/api/sitemaps/blog` |
| Guides (150+) | `https://pdfilio.com/api/sitemaps/guides` |
| Comparisons (150+) | `https://pdfilio.com/api/sitemaps/comparisons` |
| Use Cases (500+) | `https://pdfilio.com/api/sitemaps/use-cases` |
| Static Pages (20+) | `https://pdfilio.com/api/sitemaps/pages` |

---

## Verify Sitemaps Are Working

### Test Master Index
```bash
curl https://pdfilio.com/api/sitemap-index
```

Should return XML with all 5 sitemaps.

### Test Blog Sitemap
```bash
curl https://pdfilio.com/api/sitemaps/blog
```

Should return XML with 1200 blog URLs.

### Check robots.txt
```bash
curl https://pdfilio.com/robots.txt
```

Should show all sitemaps listed.

---

## What Gets Submitted

- **2500+ URLs** total
  - 1200 blog posts
  - 150+ guides
  - 150+ comparisons
  - 500+ use cases
  - 20+ static pages

---

## Expected Timeline

| Timeline | Milestone |
|----------|-----------|
| **Day 1** | Sitemap submitted |
| **Week 1** | Google crawling pages |
| **Week 2-4** | First batch indexed (200-400 URLs) |
| **Month 2** | 30-50% indexed |
| **Month 3** | 40-60% indexed |
| **Month 6+** | 60-80% indexed (stable) |

---

## Troubleshooting

### Sitemap Not Found?
Check: `https://pdfilio.com/api/sitemap-index`

### Pages Not Indexing?
Check GSC → Coverage → Excluded

### Want to See All URLs?
```bash
# JSON format
curl -X POST https://pdfilio.com/api/sitemap-index
```

---

## Support

- GSC Help: https://support.google.com/webmasters
- Bing Help: https://help.bing.com/webmaster
- GA4 Help: https://support.google.com/analytics

---

**All sitemaps are live and ready to submit!**
