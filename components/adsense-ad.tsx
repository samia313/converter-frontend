'use client'

import { useEffect, useState } from 'react'

interface AdSenseAdProps {
  slotId?: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

export default function AdSenseAd({ slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || '', format = 'auto', responsive = true, className = '' }: AdSenseAdProps) {
  const [tcStringReady, setTcStringReady] = useState(false)
  const hasValidSlotId = /^\d+$/.test(slotId) && slotId !== '1234567890'

  useEffect(() => {
    let cancelled = false
    let attempts = 0

    const checkTcf = () => {
      if (cancelled) return
      const tcf = window.__tcfapi
      if (typeof tcf === 'function') {
        tcf('addEventListener', 2, (tcData: { eventStatus?: string; tcString?: string }, success: boolean) => {
          if (!success || !tcData?.tcString) return
          if (!cancelled) setTcStringReady(true)
        })
        return
      }
      attempts += 1
      if (attempts < 40) window.setTimeout(checkTcf, 500)
    }

    checkTcf()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!tcStringReady || !hasValidSlotId) return
    let attempts = 0
    const pushAd = () => {
      if (window.adsbygoogle) {
        try { window.adsbygoogle.push({}); return } catch (err) { console.error('[PDFilio] AdSense error:', err) }
      }
      attempts += 1
      if (attempts < 20) window.setTimeout(pushAd, 500)
    }
    pushAd()
  }, [tcStringReady, hasValidSlotId])

  const getAdStyle = () => {
    switch (format) {
      case 'horizontal': return { width: '100%', height: '90px' }
      case 'vertical': return { width: '300px', height: '600px' }
      case 'rectangle': return { width: '300px', height: '250px' }
      default: return responsive ? { width: '100%', minHeight: '250px' } : {}
    }
  }

  if (!tcStringReady || !hasValidSlotId) return null

  return (
    <div className={`adsense-container flex justify-center my-6 ${className}`} data-ad-format={format} aria-label="Advertisement">
      <ins className="adsbygoogle" style={{ display: 'block', ...getAdStyle() }} data-ad-client="ca-pub-3342033551482593" data-ad-slot={slotId} data-ad-format={format} data-full-width-responsive={responsive} />
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle: any[]
    __tcfapi?: (command: string, version: number, callback: (data: any, success: boolean) => void, parameter?: any) => void
  }
}
