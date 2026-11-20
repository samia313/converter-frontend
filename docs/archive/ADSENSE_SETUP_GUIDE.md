# Google AdSense Integration Guide

Your website has been configured with Google AdSense. Here's how to maximize your earnings and properly manage ads.

## Installation Status

✅ **Global Script**: Installed in `/app/layout.tsx`
- Loads on all pages automatically
- Your Publisher ID: `ca-pub-3342033551482593`
- Fully optimized for next.js

✅ **Ad Component**: Available at `/components/adsense-ad.tsx`
- Reusable component for flexible ad placement
- Multiple format options
- Production-ready

## How to Use AdSense Ads

### Method 1: Automatic Ads (Recommended for Easy Setup)

If you enabled "Auto ads" in your AdSense account, ads will automatically appear on your pages. No code changes needed!

### Method 2: Manual Ad Placement (Full Control)

Use the AdSenseAd component to place ads exactly where you want:

```tsx
import AdSenseAd from '@/components/adsense-ad'

export default function YourPage() {
  return (
    <div>
      <h1>My Page</h1>
      
      {/* Horizontal banner ad */}
      <AdSenseAd format="horizontal" />
      
      <p>Page content here...</p>
      
      {/* Vertical sidebar ad */}
      <AdSenseAd format="vertical" />
      
      <p>More content...</p>
      
      {/* Rectangle ad (best for conversions) */}
      <AdSenseAd format="rectangle" className="mx-auto" />
    </div>
  )
}
```

## Ad Format Options

| Format | Dimensions | Best Use Case |
|--------|-----------|--------------|
| `auto` | Responsive | Homepage, landing pages (recommended) |
| `horizontal` | 728x90 or similar | Top of page, between sections |
| `vertical` | 300x600, 120x600 | Sidebars, blog posts |
| `rectangle` | 300x250, 336x280 | Content sections, high conversion |

## Creating Ad Slots

You need to create ad slots in your AdSense account:

1. Go to [Google AdSense Dashboard](https://adsense.google.com)
2. Click "Ads" → "Ad units"
3. Click "New ad unit"
4. Choose your ad format
5. Copy the **Slot ID** (data-ad-slot value)
6. Use it in components:

```tsx
<AdSenseAd slotId="YOUR_SLOT_ID" format="rectangle" />
```

## Where to Place Ads for Maximum Earnings

### 1. **Homepage** (High Traffic)
- Top banner: `<AdSenseAd format="horizontal" />`
- Between tool cards: `<AdSenseAd format="rectangle" className="mx-auto my-8" />`
- Sidebar: `<AdSenseAd format="vertical" />`

### 2. **Tool Pages** (Medium-High Traffic)
```tsx
<main className="container mx-auto">
  <AdSenseAd format="horizontal" />
  
  {/* Tool content */}
  <ToolComponent />
  
  <AdSenseAd format="rectangle" />
</main>
```

### 3. **Blog/Documentation** (SEO Traffic)
```tsx
{/* After H1 */}
<AdSenseAd format="horizontal" />

{/* Between sections */}
<section>
  <h2>Section 1</h2>
  <p>Content...</p>
</section>

<AdSenseAd format="rectangle" />

<section>
  <h2>Section 2</h2>
  <p>More content...</p>
</section>
```

## Optimization Tips

### 1. **Placement Strategy**
- Above the fold (visible without scrolling): +30% CTR
- Between content sections: +25% CTR
- In natural reading flow: Best long-term performance

### 2. **Ad Density** (Important!)
- Recommended: 2-3 ads per page
- Maximum allowed: 3 ads per page for display
- Too many ads = Google penalties

### 3. **Size Optimization**
- Mobile: `auto` responsive format (covers all sizes)
- Desktop: 728x90 (leaderboard) + 300x250 (rectangle)
- Sidebar: 300x600 (half-page) or 120x600 (skyscraper)

### 4. **Ad Blocking Prevention**
AdSense automatically uses anti-ad-blocker techniques. Additional options:
- Show message to ad block users
- Update AdSense settings to use "Header bidding"

### 5. **Mobile Optimization**
- Auto format adapts to screen size
- Test on mobile before publishing
- Consider using `responsive={true}`

## Monitoring Your Performance

### Track Earnings
1. Go to [AdSense Dashboard](https://adsense.google.com)
2. View "Estimated earnings"
3. Check "Performance reports" for:
   - RPM (Revenue Per Mille - per 1000 views)
   - CTR (Click Through Rate)
   - CPC (Cost Per Click)

### Key Metrics to Monitor
- **RPM**: $1-50 depending on traffic source
- **CTR**: 0.5-2% is normal
- **CPC**: $0.10-5.00 depending on topic (PDF tools = high value)

## Best Practices

### ✅ DO:
- Use responsive `auto` format on homepage
- Place ads in natural content breaks
- Monitor performance with Google Analytics
- A/B test different placements
- Update ad slots regularly
- Use viewability targeting in AdSense

### ❌ DON'T:
- Place more than 3 display ads per page
- Use misleading labels (e.g., "Download" over ads)
- Encourage clicks artificially
- Place ads on empty pages
- Change ad placements excessively (let them optimize)
- Use auto-refresh

## Troubleshooting

### Ads Not Showing?
1. Check AdSense account approval status
2. Verify ad slot ID is correct
3. Wait 24-48 hours for new slots to activate
4. Check for policy violations
5. Ensure publisher ID matches your account

### Low Earnings?
1. Improve content quality (SEO)
2. Increase page speed
3. Get organic US/UK traffic (high RPM)
4. Add more relevant keywords
5. Test different ad placements
6. Ensure high viewability (mobile-friendly)

### Ads Blocked in Browser?
1. Disable ad blockers on your site (test)
2. Check console for JavaScript errors
3. Verify Google Analytics is working
4. Check CORS and CSP settings

## Revenue Expectations

For a PDF tools site with your publisher ID:

| Monthly Traffic | Estimated Monthly Earnings |
|---|---|
| 1,000 visits | $5-$25 |
| 10,000 visits | $50-$250 |
| 100,000 visits | $500-$2,500 |
| 1,000,000 visits | $5,000-$25,000 |

*Note: Higher for English-language sites, tech content, US/UK traffic*

## Important Policies

- ✅ Allowed: Tool sites, blogs, documentation
- ✅ Allowed: Auto ads with manual ads combined
- ❌ Banned: Prohibited content (adult, violence, copyright)
- ❌ Banned: Fake traffic, click fraud
- ❌ Banned: Ad stacking (overlapping ads)

[Full AdSense Policy](https://support.google.com/adsense/answer/48182)

## Next Steps

1. **Verify Setup**: Build and test locally
2. **Create Ad Slots**: Go to AdSense dashboard
3. **Update Slot IDs**: Update component usage
4. **Deploy**: Push to Vercel
5. **Monitor**: Check earnings in 24-48 hours
6. **Optimize**: Adjust placements based on CTR

## Support

- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Community](https://support.google.com/adsense/community)
- [AdSense Policy Issues](https://support.google.com/adsense/answer/10713)

---

**Last Updated**: 2024
**Publisher ID**: ca-pub-3342033551482593
