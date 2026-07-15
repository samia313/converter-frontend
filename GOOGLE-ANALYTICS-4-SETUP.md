# Google Analytics 4 Setup - 2500 Page Tracking

## خلاصہ (Summary)

یہ گائیڈ Google Analytics 4 (GA4) setup کرتا ہے تاکہ آپ اپنے 2500 صفحات کی analytics track کر سکیں۔

---

## Step 1: Google Analytics Account بنائیں

### 1.1 GA4 Account
1. جاؤ: https://analytics.google.com
2. Sign in کریں Google account سے
3. "Create an account" کریں (اگر نہیں ہے)
4. Account name: "PDFilio"
5. Next کریں

### 1.2 Create Property
1. Property name: "pdfilio.com"
2. Time zone: Asia/Karachi (یا اپنا)
3. Currency: USD
4. Create کریں

### 1.3 Create Web Stream
1. Platform: Web
2. Website URL: https://pdfilio.com
3. Stream name: "PDFilio Website"
4. Create stream

### 1.4 Get Measurement ID
1. Stream details میں جائیں
2. Measurement ID copy کریں (شکل: G-XXXXXXXXXX)
3. یہ ہے آپ کا GA4 ID

---

## Step 2: Add GA4 Script to Website

### 2.1 Add gtag Script to Layout

اپنے `app/layout.tsx` میں یہ شامل کریں:

```tsx
// In the <head> section, after Google Tag Manager
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID" />
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YOUR_MEASUREMENT_ID', {
        page_path: window.location.pathname,
        page_title: document.title,
      });
    `,
  }}
/>
```

### 2.2 Replace YOUR Measurement ID
1. اپنا Measurement ID لیں
2. G-XXXXXXXXXX کو replace کریں
3. Deploy کریں

---

## Step 3: Verify Tracking is Working

### 3.1 Check Real-Time Data
1. GA4 account میں جائیں
2. "Reports" → "Real-time" میں جائیں
3. اپنی website visit کریں
4. 1-2 سیکنڈوں میں "Users in the last 30 minutes" میں 1 دیکھنا چاہیے

### 3.2 Check Page Views
1. "Reports" میں جائیں
2. "Engagement" → "Pages and screens"
3. اپنے صفحات کے page views دیکھیں

---

## Step 4: Setup Custom Events

### 4.1 PDF Upload Event
اپنی upload button code میں:
```tsx
const handleUpload = () => {
  gtag('event', 'file_uploaded', {
    file_type: 'pdf',
    file_size: file.size,
  })
}
```

### 4.2 Conversion Event
جب conversion ہو:
```tsx
const handleConversion = () => {
  gtag('event', 'conversion', {
    conversion_type: 'premium_signup',
    value: 9.99,
    currency: 'USD',
  })
}
```

### 4.3 Tool Usage Event
جب tool use ہو:
```tsx
const handleToolUsage = (toolName) => {
  gtag('event', 'tool_used', {
    tool_name: toolName,
    timestamp: new Date(),
  })
}
```

---

## Step 5: Setup Goals/Conversions

### 5.1 Create Conversion Events
1. Admin → Conversions میں جائیں
2. "New conversion event" بنائیں
3. Event names:
   - file_uploaded
   - conversion
   - tool_used
   - download_completed

### 5.2 Track Important Actions
1. Sign-up conversions
2. Download conversions
3. Tool usage
4. Feature adoption

---

## Step 6: Create Custom Reports

### 6.1 Pages Report
1. Reports میں جائیں
2. "Pages and screens" دیکھیں
3. کون سے pages traffic دے رہے ہیں

### 6.2 Traffic Source Report
1. Reports میں جائیں
2. "Traffic acquisition"
3. Organic سے کتنا traffic آ رہا ہے

### 6.3 User Report
1. Reports میں جائیں
2. "User overview"
3. Unique users، sessions، engagement rate

### 6.4 Conversion Report
1. Reports میں جائیں
2. "Conversions"
3. Conversion rate اور value

---

## Step 7: Link with Google Search Console

### 7.1 Link GSC with GA4
1. GA4 میں Admin جائیں
2. "Data streams" → اپنا web stream
3. "Google Search Console link" ملے گا
4. GSC data GA4 میں integrate ہوگی

### 7.2 Monitor Search Queries
1. Reports میں جائیں
2. "Traffic acquisition" → "Google Organic Search"
3. کون سے queries traffic لا رہے ہیں

---

## Step 8: Setup Dashboards

### 8.1 Create Custom Dashboard
1. Dashboards میں جائیں
2. "Create dashboard"
3. Add cards:
   - Users (real-time)
   - Sessions
   - Page views
   - Bounce rate
   - Conversion rate

### 8.2 Monitor Daily
1. Dashboard check کریں روزانہ
2. Trends دیکھیں
3. Performance track کریں

---

## Step 9: Email Reports

### 9.1 Setup Email Reports
1. Admin → Email reports میں جائیں
2. "Create email report" بنائیں
3. Frequency: Weekly
4. Include:
   - Users
   - Sessions
   - Page views
   - Conversions

### 9.2 Email Settings
1. Frequency: ہر اتوار کو
2. Metrics: Top 5 pages, top 5 sources
3. Recipients: آپ کی email

---

## Step 10: Expected Analytics Timeline

### Month 1
- Real-time users: 1-10
- Daily page views: 50-200
- Bounce rate: 50-70%

### Month 3
- Daily users: 100-500
- Daily page views: 1,000-5,000
- Bounce rate: 40-50%

### Month 6
- Daily users: 1,000-2,000
- Daily page views: 5,000-20,000
- Bounce rate: 30-40%

### Month 12
- Daily users: 1,500-3,000
- Daily page views: 20,000-50,000
- Bounce rate: 25-35%

---

## Key Metrics to Track

| Metric | Target | Why Important |
|--------|--------|---------------|
| Users | 50,000+/month | Growth indicator |
| Sessions | 75,000+/month | Engagement |
| Page views | 200,000+/month | Content reach |
| Avg session duration | 3-5 minutes | Engagement quality |
| Bounce rate | <40% | Content quality |
| Conversion rate | 2-5% | Revenue driver |

---

## Useful Reports

| Report | Purpose |
|--------|---------|
| Real-time | Current user activity |
| Acquisition | Where users come from |
| Engagement | How users interact |
| Monetization | Revenue tracking |
| Retention | User loyalty |
| Conversions | Goal completion |

---

## Best Practices

1. **Track Important Events** - Upload, download, conversion
2. **Use Custom Dimensions** - User type, device type
3. **Setup Goals** - Track key actions
4. **Monitor Regularly** - Check analytics daily
5. **Optimize Based on Data** - Use insights for improvement

---

## Common Issues & Solutions

### مسئلہ: GA4 data نہیں آ رہی
**حل:**
1. Measurement ID صحیح ہے یا نہیں check کریں
2. Script deploy ہو گیا یا نہیں check کریں
3. 24 گھنٹے کا انتظار کریں
4. Real-time report میں دیکھیں

### مسئلہ: Google Search Console data نہیں دکھ رہی
**حل:**
1. Both linked ہیں یا نہیں check کریں
2. 24 گھنٹے کا انتظار کریں
3. GSC میں impressions ہیں یا نہیں check کریں

### مسئلہ: Conversion tracking کام نہیں کر رہا
**حل:**
1. Event name درست ہے یا نہیں
2. Conversion event setup ہے یا نہیں
3. Code correctly implement ہے یا نہیں

---

## Implementation Checklist

- [ ] GA4 Property created
- [ ] Measurement ID obtained
- [ ] GA script added to layout.tsx
- [ ] Deployed to production
- [ ] Real-time data verified
- [ ] Custom events setup
- [ ] Conversions tracked
- [ ] GSC linked
- [ ] Dashboard created
- [ ] Email reports configured

---

یہ guide complete ہے! Analytics اب چل رہی ہے۔

