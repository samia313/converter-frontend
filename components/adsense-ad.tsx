'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  slotId?: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

/**
 * Reusable AdSense Ad Component
 * 
 * Usage examples:
 * <AdSenseAd slotId="1234567890" format="horizontal" />
 * <AdSenseAd format="vertical" className="w-full" />
 * <AdSenseAd format="rectangle" className="mx-auto" />
 */
export default function AdSenseAd({
  slotId = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseAdProps) {
  useEffect(() => {
    // Push the ad using the window.adsbygoogle object
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('[v0] AdSense error:', err)
    }
  }, [])

  const getAdStyle = () => {
    switch (format) {
      case 'horizontal':
        return { width: '100%', height: '90px' }
      case 'vertical':
        return { width: '300px', height: '600px' }
      case 'rectangle':
        return { width: '300px', height: '250px' }
      case 'auto':
      default:
        return responsive ? { width: '100%', minHeight: '250px' } : {}
    }
  }

  return (
    <div
      className={`adsense-container flex justify-center my-6 ${className}`}
      data-ad-format={format}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...getAdStyle(),
        }}
        data-ad-client="ca-pub-3342033551482593"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}

// Type declaration for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}
