# Google AdSense - Quick Start Guide

Your website is now configured with Google AdSense monetization!

## Installation Summary

✅ **Global Script**: Installed in `/app/layout.tsx`
- Automatically loads on every page
- Publisher ID: `ca-pub-3342033551482593`
- Ready to go!

✅ **Ad Component**: Available at `/components/adsense-ad.tsx`
- Use anywhere for custom ad placements
- No additional configuration needed

## Quick Setup (Next 24 Hours)

### Step 1: Create Ad Slots in AdSense
1. Go to https://adsense.google.com
2. Login with your account
3. Click "Ads" → "Ad units" 
4. Click "New ad unit"
5. Create slots for: Horizontal, Vertical, Rectangle
6. Copy each **Slot ID**

### Step 2: Add Ads to Your Pages

**Homepage Example** (`app/page.tsx`):
```tsx
import AdSenseAd from '@/components/adsense-ad'

export default function Home() {
  return (
    <div>
      {/* Top banner ad */}
      <AdSenseAd format="horizontal" />
      
      <h1>Your content here</h1>
      
      {/* Rectangle ad in the middle */}
      <AdSenseAd format="rectangle" className="mx-auto my-8" />
      
      {/* Bottom ad */}
      <AdSenseAd format="vertical" />
    </div>
  )
}
```

**Tool Page Example** (`app/pdf-to-word/page.tsx`):
```tsx
import AdSenseAd from '@/components/adsense-ad'

export default function PdfToWordPage() {
  return (
    <main className="container mx-auto">
      {/* Header ad */}
      <AdSenseAd format="horizontal" />
      
      {/* Your tool component */}
      <PdfToWordTool />
      
      {/* Sidebar ad */}
      <aside className="mt-8">
        <AdSenseAd format="vertical" />
      </aside>
    </main>
  )
}
```

### Step 3: Deploy to Production
```bash
git add .
git commit -m "Add AdSense ad placements"
git push origin main
```

## Ad Formats Reference

### Horizontal Ad
```tsx
<AdSenseAd format="horizontal" />
// Size: 728x90px (leaderboard)
// Best for: Header, between sections
```

### Vertical Ad
```tsx
<AdSenseAd format="vertical" />
// Size: 300x600px (half-page)
// Best for: Sidebar, right column
```

### Rectangle Ad
```tsx
<AdSenseAd format="rectangle" className="mx-auto" />
// Size: 300x250px (most popular)
// Best for: Content areas, inline, highest CTR
```

### Responsive Auto Ad
```tsx
<AdSenseAd format="auto" />
// Auto-adjusts to any screen size
// Best for: Mobile, responsive design
```

## Custom Slot IDs

If you want to use specific ad slot IDs you created:

```tsx
<AdSenseAd 
  slotId="1234567890" 
  format="rectangle"
/>
```

Where `1234567890` is your actual slot ID from AdSense.

## Styling & Positioning

Center an ad:
```tsx
<div className="flex justify-center my-8">
  <AdSenseAd format="rectangle" />
</div>
```

Full width ad:
```tsx
<AdSenseAd format="horizontal" className="w-full" />
```

Ad with custom margin:
```tsx
<AdSenseAd 
  format="vertical" 
  className="mx-auto my-12"
/>
```

## Testing Locally

1. Build locally:
```bash
npm run build
npm run start
```

2. Open http://localhost:3000
3. Check browser console for AdSense loading
4. Ads may show "Page is offline" or test ads initially

**Note**: Live ads won't show in development. Deploy to production first.

## After Deployment

**Timeline for Ad Activation:**
- ✅ 0-2 hours: Script loads
- ✅ 24 hours: Ads start showing
- ✅ 48 hours: Earnings appear in dashboard

**Monitor Your Earnings:**
1. Go to https://adsense.google.com/dashboard
2. Check "Estimated earnings"
3. View performance in "Performance reports"

## Recommended Placements for PDF Tools Site

### Homepage
- Top banner: Horizontal ad
- Between tool cards: Rectangles (every 3-4 cards)
- Footer area: Horizontal or vertical

### Tool Pages (PDF-to-Word, Merge, etc.)
- Top: Horizontal banner
- Right sidebar: Vertical ad (300x600)
- Below file uploader: Rectangle (300x250)

### Blog/Help Pages
- After heading: Horizontal
- Between sections: Rectangles
- Sidebar: Vertical

## Troubleshooting

### Ads Not Showing?

Check 1: Publisher ID correct?
```
ca-pub-3342033551482593 ✅
```

Check 2: AdSense approved your site?
- Go to https://adsense.google.com
- Check "Sites" tab

Check 3: Wait 24-48 hours?
- New placements need time to activate

Check 4: Check console for errors
```bash
# Open browser DevTools
# Check Console tab for JavaScript errors
```

### Low Earnings?

- Need more traffic (quality traffic from US/UK gets higher RPM)
- Optimize content for SEO
- Better ad placement (rectangles usually perform best)
- Ensure mobile-friendly design
- Check AdSense policy violations

## Revenue Expectations

**For 100,000 monthly visitors:**
- RPM (cost per 1000 views): $5-$50
- Expected monthly earnings: $500-$5,000

**For 1,000,000 monthly visitors:**
- RPM: $5-$50
- Expected monthly earnings: $5,000-$50,000

*Note: PDF tools content has high RPM (good CPC)*

## Next Steps

1. ✅ Script installed - Done!
2. ⏳ Create ad slots in AdSense (24 hours)
3. ⏳ Add components to pages (1 hour)
4. ⏳ Deploy changes (30 minutes)
5. ⏳ Wait for ads to activate (24-48 hours)
6. ⏳ Start earning!

## Important Rules

✅ DO:
- Place 2-3 ads per page max
- Use responsive `auto` format
- Let ads load naturally
- Monitor for low-performing ads

❌ DON'T:
- More than 3 display ads per page
- Encourage clicks artificially
- Place on empty pages
- Use misleading ad labels
- Refresh ads automatically

## Support

- **AdSense Help**: https://support.google.com/adsense
- **Policy Issues**: https://support.google.com/adsense/answer/10713
- **Performance Reports**: https://support.google.com/adsense/answer/160314

---

**Your Publisher ID**: ca-pub-3342033551482593
**Component Location**: `/components/adsense-ad.tsx`
**Setup Date**: 2024
