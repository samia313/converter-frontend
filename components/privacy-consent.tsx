'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

const CONSENT_KEY = 'pdfilio-consent-v1'

type ConsentChoice = 'accepted' | 'necessary' | null

export default function PrivacyConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY)
      if (saved === 'accepted' || saved === 'necessary') setChoice(saved)
    } catch {
      // If storage is unavailable, keep optional technologies disabled.
    }
  }, [])

  const saveChoice = (next: Exclude<ConsentChoice, null>) => {
    setChoice(next)
    try {
      window.localStorage.setItem(CONSENT_KEY, next)
    } catch {
      // Consent still applies for the current page even if persistence fails.
    }
  }

  if (!mounted) return null

  return (
    <>
      {choice === 'accepted' && (
        <>
          <Script
            id="pdfilio-ga4-src"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-BCT792X91Q"
          />
          <Script
            id="pdfilio-ga4"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BCT792X91Q',{anonymize_ip:true});`,
            }}
          />
          <Script
            id="pdfilio-gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T9N4TQVD');`,
            }}
          />
          <Script
            id="pdfilio-adsense"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3342033551482593"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </>
      )}

      {choice === null ? (
        <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white p-4 shadow-2xl" role="dialog" aria-label="Privacy choices">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-base font-bold text-gray-900">Privacy choices</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                PDFilio uses essential technologies for the site to work. With your permission, we can also load analytics and advertising technologies. Read our <a href="/privacy" className="font-semibold underline">Privacy Policy</a> and <a href="/cookies" className="font-semibold underline">Cookie Policy</a> for details.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button onClick={() => saveChoice('necessary')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">Necessary only</button>
              <button onClick={() => saveChoice('accepted')} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Accept analytics & ads</button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setChoice(null)}
          className="fixed bottom-3 left-3 z-[90] rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-md hover:bg-gray-50"
          aria-label="Open privacy settings"
        >
          Privacy settings
        </button>
      )}
    </>
  )
}
