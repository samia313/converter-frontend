import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { subscription } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

type PaidPlan = 'pro_monthly' | 'pro_yearly' | 'ai_pro_monthly'

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) throw new Error('Stripe billing is not configured')
  return new Stripe(secretKey)
}

function getPriceId(plan: PaidPlan) {
  const priceIds: Record<PaidPlan, string | undefined> = {
    pro_monthly: process.env.STRIPE_PRICE_ID_PRO_MONTHLY,
    pro_yearly: process.env.STRIPE_PRICE_ID_PRO_YEARLY,
    ai_pro_monthly: process.env.STRIPE_PRICE_ID_AI_PRO_MONTHLY,
  }
  return priceIds[plan]
}

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL || 'https://pdfilio.com'
  return new URL(configuredUrl).origin
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Please sign in before starting checkout.' }, { status: 401 })
  }

  let plan: PaidPlan
  try {
    const body = await request.json()
    if (!['pro_monthly', 'pro_yearly', 'ai_pro_monthly', 'team_monthly'].includes(body?.plan)) {
      return NextResponse.json({ error: 'Choose a valid paid plan.' }, { status: 400 })
    }
    plan = body.plan
  } catch {
    return NextResponse.json({ error: 'Invalid checkout request.' }, { status: 400 })
  }

  const priceId = getPriceId(plan)
  if (!priceId) {
    return NextResponse.json(
      { error: 'This plan is not available yet. Please try again later.' },
      { status: 503 },
    )
  }

  try {
    const stripe = getStripe()
    const existingRows = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, session.user.id))
      .limit(1)

    let customerId = existingRows[0]?.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: { userId: session.user.id },
      })
      customerId = customer.id

      await db.insert(subscription).values({
        userId: session.user.id,
        stripeCustomerId: customerId,
        plan: 'free',
        status: 'inactive',
      })
    }

    const siteUrl = getSiteUrl()
    const checkout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
      client_reference_id: session.user.id,
      metadata: { userId: session.user.id, plan },
      subscription_data: { metadata: { userId: session.user.id, plan } },
      allow_promotion_codes: true,
    })

    if (!checkout.url) {
      return NextResponse.json({ error: 'Checkout could not be started. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error('Stripe checkout creation failed:', error)
    return NextResponse.json({ error: 'Checkout could not be started. Please try again.' }, { status: 500 })
  }
}
