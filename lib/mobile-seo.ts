// Mobile SEO & Responsive Design Optimizations

export const VIEWPORT_CONFIG = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover' as const,
};

// Responsive breakpoints for mobile-first design
export const BREAKPOINTS = {
  xs: 0, // Mobile
  sm: 640, // Small
  md: 768, // Tablet
  lg: 1024, // Large
  xl: 1280, // Extra Large
  '2xl': 1536, // 2X Large
};

// Mobile performance optimization tips
export const MOBILE_OPTIMIZATION = {
  // 1. Touch-friendly elements: min 48px x 48px
  MIN_TOUCH_SIZE: 48,

  // 2. Font sizes readable on mobile
  MOBILE_FONT_SIZES: {
    h1: '24px',
    h2: '20px',
    h3: '18px',
    body: '16px',
  },

  // 3. Viewport margins for mobile
  MOBILE_PADDING: '16px',

  // 4. Mobile-specific CSS
  styles: `
    /* Touch-friendly buttons */
    button, a {
      min-height: 48px;
      min-width: 48px;
      padding: 12px 16px;
    }

    /* Readable font sizes */
    body {
      font-size: 16px; /* Prevents zoom on input focus */
    }

    /* Proper viewport */
    html {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    /* Mobile images */
    img {
      max-width: 100%;
      height: auto;
    }

    /* Tap highlight color */
    * {
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.1);
    }
  `,
};

// Mobile-first media queries helper
export const mobileFirstMediaQuery = {
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)',
  '2xl': '@media (min-width: 1536px)',
};
