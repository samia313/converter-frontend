import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { subscription } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const PAID_PLANS = new Set(['pro_monthly', 'pro_yearly', 'ai_pro_monthly'])
const ACCESS_STATUSES = new Set(['active', 'trialing'])

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user?.id) {
    return NextResponse.json({ authenticated: false, accessGranted: false, plan: 'free', status: 'unauthenticated' }, { status: 401 })
  }

  try {
    const rows = await db
      .select({
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodEnd: subscription.currentPeriodEnd,
      })
      .from(subscription)
      .where(eq(subscription.userId, session.user.id))
      .limit(1)

    const current = rows[0]
    const plan = current?.plan ?? 'free'
    const status = current?.status ?? 'inactive'
    const accessGranted = PAID_PLANS.has(plan) && ACCESS_STATUSES.has(status)

    return NextResponse.json({
      authenticated: true,
      accessGranted,
      plan: accessGranted ? plan : 'free',
      status,
      currentPeriodEnd: current?.currentPeriodEnd?.toISOString() ?? null,
    }, {
      headers: { 'Cache-Control': 'private, no-store, max-age=0' },
    })
  } catch (error) {
    console.error('Failed to read billing status:', error)
    return NextResponse.json({ error: 'Billing status is temporarily unavailable.' }, { status: 503 })
  }
}
