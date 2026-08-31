'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function AdSenseScript() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let attempts = 0
    const waitForTcf = () => {
      if (cancelled) return
      if (typeof window.__tcfapi === 'function') {
        setReady(true)
        return
      }
      attempts += 1
      if (attempts < 40) window.setTimeout(waitForTcf, 500)
    }
    waitForTcf()
    return () => { cancelled = true }
  }, [])

  if (!ready) return null

  return (
    <Script
      id="pdfilio-adsense"
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3342033551482593"
      crossOrigin="anonymous"
    />
  )
}

declare global {
  interface Window {
    __tcfapi?: (command: string, version: number, callback: (data: any, success: boolean) => void, parameter?: any) => void
  }
}
