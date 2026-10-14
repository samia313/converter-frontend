import { db } from '@/lib/db';
import { subscription } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(secretKey);
}

function getPlanForPrice(priceId?: string): string | null {
  if (!priceId) return null;
  const configuredPrices: Array<[string | undefined, string]> = [
    [process.env.STRIPE_PRICE_ID_PRO_MONTHLY, 'pro_monthly'],
    [process.env.STRIPE_PRICE_ID_PRO_YEARLY, 'pro_yearly'],
    [process.env.STRIPE_PRICE_ID_AI_PRO_MONTHLY, 'ai_pro_monthly'],
    [process.env.STRIPE_PRICE_ID_TEAM_MONTHLY, 'team_monthly'],
  ];
  return configuredPrices.find(([configuredId]) => configuredId && configuredId === priceId)?.[1] ?? null;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
    }
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const stripeSub = event.data.object as Stripe.Subscription;
        const customerId = typeof stripeSub.customer === 'string' ? stripeSub.customer : stripeSub.customer.id;
        const priceId = stripeSub.items.data[0]?.price.id;
        const mappedPlan = getPlanForPrice(priceId);
        const sub = stripeSub as unknown as {
          id: string;
          status: string;
          current_period_start: number;
          current_period_end: number;
        };

        // Unknown prices must never inherit paid access. Mark them explicitly for investigation.
        const plan = mappedPlan ?? 'free';
        const status = mappedPlan ? sub.status : 'unmapped_price';
        if (!mappedPlan) {
          console.error('Stripe subscription has an unrecognized price; paid access disabled.', {
            subscriptionId: sub.id,
            priceId: priceId ?? null,
          });
        }

        await db.update(subscription).set({
          stripeSubscriptionId: sub.id,
          plan,
          status,
          currentPeriodStart: Number.isFinite(sub.current_period_start)
            ? new Date(sub.current_period_start * 1000)
            : null,
          currentPeriodEnd: Number.isFinite(sub.current_period_end)
            ? new Date(sub.current_period_end * 1000)
            : null,
          updatedAt: new Date(),
        }).where(eq(subscription.stripeCustomerId, customerId));
        break;
      }

      case 'customer.subscription.deleted': {
        const stripeSub = event.data.object as Stripe.Subscription;
        const customerId = typeof stripeSub.customer === 'string' ? stripeSub.customer : stripeSub.customer.id;

        // Stripe sends this when the subscription has actually ended, so remove paid plan access.
        await db.update(subscription).set({
          plan: 'free',
          status: 'canceled',
          canceledAt: new Date(),
          updatedAt: new Date(),
        }).where(eq(subscription.stripeCustomerId, customerId));
        break;
      }

      default:
        // Subscription lifecycle events are the source of truth for entitlement status.
        // Avoid stale invoice events accidentally reactivating a canceled subscription.
        console.log(`Ignoring unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Stripe webhook:', error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  }
}
