'use client'

import { useEffect, useState } from 'react'

interface AdSenseAdProps {
  slotId?: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

const CONSENT_KEY = 'pdfilio-consent-v1'

export default function AdSenseAd({ slotId = '1234567890', format = 'auto', responsive = true, className = '' }: AdSenseAdProps) {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    const sync = () => {
      try { setConsented(window.localStorage.getItem(CONSENT_KEY) === 'accepted') } catch { setConsented(false) }
    }
    sync()
    window.addEventListener('pdfilio-consent-changed', sync)
    return () => window.removeEventListener('pdfilio-consent-changed', sync)
  }, [])

  useEffect(() => {
    if (!consented) return
    let attempts = 0
    const pushAd = () => {
      if (window.adsbygoogle) {
        try { window.adsbygoogle.push({}); return } catch (err) { console.error('[PDFilio] AdSense error:', err) }
      }
      attempts += 1
      if (attempts < 20) window.setTimeout(pushAd, 500)
    }
    pushAd()
  }, [consented])

  const getAdStyle = () => {
    switch (format) {
      case 'horizontal': return { width: '100%', height: '90px' }
      case 'vertical': return { width: '300px', height: '600px' }
      case 'rectangle': return { width: '300px', height: '250px' }
      default: return responsive ? { width: '100%', minHeight: '250px' } : {}
    }
  }

  if (!consented) return null

  return (
    <div className={`adsense-container flex justify-center my-6 ${className}`} data-ad-format={format} aria-label="Advertisement">
      <ins className="adsbygoogle" style={{ display: 'block', ...getAdStyle() }} data-ad-client="ca-pub-3342033551482593" data-ad-slot={slotId} data-ad-format={format} data-full-width-responsive={responsive} />
    </div>
  )
}

declare global { interface Window { adsbygoogle: any[] } }
