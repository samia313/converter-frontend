# Google Tag Manager (GTM) Setup Guide

## آپ کے لیے کیا ہے

Google Tag Manager (GTM-T9N4TQVD) آپ کی ویب سائٹ میں لگایا جا چکا ہے اور مکمل طور پر فعال ہے۔

## GTM کا مطلب

**Google Tag Manager** ایک ٹول ہے جو:
- صارفین کی سرگرمی کو track کرتا ہے
- پیسے کی تبدیلی (conversions) کو monitor کرتا ہے
- صفحہ views شمار کرتا ہے
- کسی ایونٹ کو track کرتا ہے (مثلاً بٹن کلک)
- آپ کو بتاتا ہے کہ کون سا کام کام کر رہا ہے

## GTM Dashboard تک رسائی

1. https://tagmanager.google.com پر جائیں
2. اپنے Google اکاؤنٹ سے لاگ ان کریں
3. "PDFilio" کنٹیننر منتخب کریں
4. GTM-T9N4TQVD دیکھیں

## اگلے قدمات

### مرحلہ 1: Google Analytics 4 (GA4) کنکٹ کریں

1. Google Analytics 4 میں جائیں
2. "Admin" → "Property Settings" کھولیں
3. GTM Container ID شامل کریں
4. GTM میں GA4 ٹیگ بنائیں

### مرحلہ 2: Conversion Tracking سیٹ اپ کریں

**مثال: Premium Signup**

1. GTM میں "Triggers" میں جائیں
2. نیا Trigger بنائیں: "Premium Signup Click"
3. اگلا: "Tags" میں جائیں
4. نیا Tag بنائیں: "GA4 Conversion - Premium"
5. Tag Type: Google Analytics 4
6. Event Name: "premium_signup"
7. Trigger: "Premium Signup Click"

**مثال: PDF Tool Usage**

1. Tool Page پر Conversion Track کریں
2. Event: "tool_used"
3. Event Category: "compress_pdf" یا "merge_pdf"
4. Track: کتنے users نے tool استعمال کیا

### مرحلہ 3: E-commerce Tracking (Stripe Integration)

جب Stripe add کریں:

```javascript
// Purchase event
{
  "event": "purchase",
  "transaction_id": "T12345",
  "value": 9.99,
  "currency": "USD",
  "items": [{
    "item_name": "Premium Monthly",
    "price": 9.99,
    "quantity": 1
  }]
}
```

## اہم Tracking Events

### صفحہ Views (خودکار)
- ہر صفحہ view خودکار ہے
- GTM خود track کرتا ہے

### Tool Conversions (شامل کریں)

```
Event: "tool_conversion"
Parameters:
- tool_name: "compress_pdf"
- file_size: 5000000 (bytes)
- compression_ratio: 0.45
```

### Premium Signup (شامل کریں)

```
Event: "premium_signup"
Parameters:
- plan: "monthly" یا "annual"
- price: 9.99 یا 59.99
```

### File Upload (شامل کریں)

```
Event: "file_upload"
Parameters:
- file_type: "pdf"
- file_size: 5000000
- tool_used: "compress_pdf"
```

## Real-Time Monitoring

1. GTM Dashboard میں "Overview" کھولیں
2. "Real-Time" tab دیکھیں
3. لائیو صارفین track کریں
4. فوری Events دیکھیں

## Revenue Tracking

### Google Analytics 4 میں

1. Reports → Monetization
2. Revenue by event
3. Revenue by page
4. User revenue

### Expected Metrics

```
Monthly Tracking:
- Page Views: 250,000+
- Users: 10,000+
- Premium Conversions: 200+
- Revenue: $2,000+
```

## Debugging GTM

### Preview Mode

1. GTM میں "Preview" بٹن دبائیں
2. اپنی ویب سائٹ پر جائیں
3. تمام events real-time میں دیکھیں
4. Debug کریں

### GTM Debug Console

```
Ctrl + Shift + J (Chrome DevTools)
یا
Right click → Inspect → Console

GTM variables دیکھیں
```

## Common Issues & Solutions

### GTM Track نہیں ہو رہی

**مسئلہ**: GTM dashboard میں کوئی activity نہیں
**حل**: 
1. Preview mode چالو کریں
2. ویب سائٹ reload کریں
3. Console میں errors دیکھیں

### Events غلط data دے رہی ہیں

**مسئلہ**: Parameters غلط ہیں
**حل**:
1. GTM Tag کی settings check کریں
2. Parameter names verify کریں
3. Variable bindings check کریں

### GA4 میں Events نہیں دیکھ رہے

**مسئلہ**: GTM track کر رہی ہے لیکن GA4 نہیں
**حل**:
1. GA4 configuration ID check کریں
2. GTM में GA4 tag verify کریں
3. Measurement ID match کریں

## Advanced Setup

### Custom JavaScript Variables

```javascript
// User's tool usage count
function() {
  return localStorage.getItem('toolUsageCount') || 0;
}
```

### Form Submission Tracking

```javascript
// Track PDF tool form
Trigger: Form Submission
Event: "tool_submission"
```

### Scroll Depth Tracking

```javascript
// Track how far users scroll
Trigger: Custom Event
Event: "scroll_depth"
Value: 25%, 50%, 75%, 100%
```

## Best Practices

1. **Test First**: Preview mode میں ہمیشہ test کریں
2. **Document Events**: تمام events log کریں
3. **Regular Review**: ہفتہ وار metrics دیکھیں
4. **Clean Data**: Invalid events filter کریں
5. **Version Control**: GTM versions save کریں

## Resources

- GTM Help: https://support.google.com/tagmanager
- GA4 Setup: https://support.google.com/analytics/answer/10089681
- GTM Best Practices: https://developers.google.com/analytics/devguides/collection/gtagjs

## Summary

✓ GTM لگایا جا چکا ہے (GTM-T9N4TQVD)
✓ Website tracking فعال ہے
✓ اب GA4 سے کنکٹ کریں
✓ Conversions track کریں
✓ Revenue measure کریں

**آپ کی analytics journey شروع ہو چکی ہے!**
