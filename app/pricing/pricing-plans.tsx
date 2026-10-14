'use client'

import { useState } from 'react'

type Plan = 'pro_monthly' | 'pro_yearly'

const plans: { id: Plan; name: string; price: string; cadence: string; note: string; features: string[]; featured?: boolean }[] = [
  {
    id: 'pro_monthly',
    name: 'Pro Monthly',
    price: '$2.49',
    cadence: '/ month',
    note: 'Flexible monthly billing',
    features: ['Expanded access to supported PDF tools', 'Everyday conversion and editing workflows', 'Cancel according to the terms shown at checkout'],
  },
  {
    id: 'pro_yearly',
    name: 'Pro Yearly',
    price: '$23.88',
    cadence: '/ year',
    note: 'Equivalent to $1.99/month, billed annually',
    features: ['Pro access for a full year', 'Lower effective price than monthly billing', 'Renewal and cancellation terms shown before payment'],
    featured: true,
  },
]

export default function PricingPlans() {
  const [loading, setLoading] = useState<Plan | null>(null)
  const [message, setMessage] = useState('')

  async function startCheckout(plan: Plan) {
    setLoading(plan)
    setMessage('')
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await response.json()
      if (response.status === 401) {
        setMessage('Please sign in to your PDFilio account before purchasing a plan.')
        return
      }
      if (!response.ok || !data.url) {
        setMessage(data.error || 'Checkout is not available yet. Please try again later.')
        return
      }
      window.location.assign(data.url)
    } catch {
      setMessage('We could not start checkout. Please check your connection and try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.id} className={`rounded-2xl border p-6 shadow-sm ${plan.featured ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'}`}>
            {plan.featured && <p className="text-xs font-bold uppercase tracking-wide text-red-700">Best value</p>}
            <h2 className="mt-2 text-xl font-bold">{plan.name}</h2>
            <p className="mt-4 text-3xl font-black">{plan.price}<span className="ml-1 text-sm font-medium text-gray-500">{plan.cadence}</span></p>
            <p className="mt-2 min-h-12 text-sm text-gray-600">{plan.note}</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
              {plan.features.map((feature) => <li key={feature} className="flex gap-2"><span aria-hidden="true" className="font-bold text-green-700">✓</span><span>{feature}</span></li>)}
            </ul>
            <button
              type="button"
              onClick={() => startCheckout(plan.id)}
              disabled={loading !== null}
              className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading === plan.id ? 'Connecting to checkout…' : 'Choose plan'}
            </button>
          </article>
        ))}
        <article className="rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Coming soon</p>
          <h2 className="mt-2 text-xl font-bold">AI Pro</h2>
          <p className="mt-4 text-2xl font-black">Not available yet</p>
          <p className="mt-2 min-h-12 text-sm text-gray-600">AI subscriptions will open after chat, summaries and translation are configured and tested end to end.</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
            <li>• AI document chat</li>
            <li>• Document summaries</li>
            <li>• Document translation</li>
          </ul>
          <button type="button" disabled className="mt-6 w-full cursor-not-allowed rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-500">Coming soon</button>
        </article>
      </div>
      {message && <p role="status" aria-live="polite" className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{message}</p>}
      <p className="mt-5 text-sm leading-6 text-gray-500">
        Prices are in USD, before any applicable taxes. The displayed rates are proposed introductory prices. Plan access depends on successful payment and configured features. Review the exact amount, billing interval, renewal and cancellation terms in Stripe Checkout before confirming payment.
      </p>
    </div>
  )
}
