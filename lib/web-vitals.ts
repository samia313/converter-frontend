// Web Vitals monitoring for Core Web Vitals optimization
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', metric.name, metric.value);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Send to your analytics service
      const body = JSON.stringify(metric);
      // Use keepalive to ensure request completes
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/web-vitals', body);
      }
    }
  }
}

// CWV targets for good user experience
export const CWV_TARGETS = {
  LCP: 2500, // Largest Contentful Paint (2.5s)
  FID: 100, // First Input Delay (100ms)
  CLS: 0.1, // Cumulative Layout Shift (0.1)
  TTFB: 600, // Time to First Byte (600ms)
  INP: 200, // Interaction to Next Paint (200ms)
};

// Check if metrics meet targets
export function checkCWVMetrics(metric: any): boolean {
  const target = CWV_TARGETS[metric.name as keyof typeof CWV_TARGETS];
  if (!target) return true;
  return metric.value <= target;
}
