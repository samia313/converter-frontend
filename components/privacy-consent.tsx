'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'

const CONSENT_KEY = 'pdfilio-consent-v2'
type ConsentChoice = 'necessary' | null

export default function PrivacyConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      if (window.localStorage.getItem(CONSENT_KEY) === 'necessary') setChoice('necessary')
    } catch {}
  }, [])

  const saveNecessary = () => {
    setChoice('necessary')
    try { window.localStorage.setItem(CONSENT_KEY, 'necessary') } catch {}
    window.dispatchEvent(new Event('pdfilio-consent-changed'))
  }

  if (!mounted) return null

  return (
    <>
      {process.env.NODE_ENV === 'production' && <Analytics />}
      {choice === null ? (
        <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white p-4 shadow-2xl" role="dialog" aria-label="Privacy information">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-base font-bold text-gray-900">Privacy information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">PDFilio uses essential technologies to operate the site. Advertising and analytics consent, where required, is handled by the applicable consent mechanism. Read our <a href="/privacy" className="font-semibold underline">Privacy Policy</a> and <a href="/cookies" className="font-semibold underline">Cookie Policy</a>.</p>
            </div>
            <button onClick={saveNecessary} className="shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">Continue</button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setChoice(null)} className="fixed bottom-3 left-3 z-[90] rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-md hover:bg-gray-50" aria-label="Open privacy information">Privacy information</button>
      )}
    </>
  )
}
