import { db } from '@/lib/db';
import { subscription } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const stripeSubscription = event.data.object as Stripe.Subscription;
        const customerId = stripeSubscription.customer as string;

        // Find user by stripe customer id
        const subs = await db
          .select()
          .from(subscription)
          .where(eq(subscription.stripeCustomerId, customerId));

        if (subs.length > 0) {
          const priceId = stripeSubscription.items.data[0]?.price.id;
          let plan = 'basic';

          // Map Stripe price IDs to plans
          if (priceId?.includes('professional')) plan = 'professional';
          if (priceId?.includes('enterprise')) plan = 'enterprise';

          await db
            .update(subscription)
            .set({
              stripeSubscriptionId: stripeSubscription.id,
              plan,
              status: stripeSubscription.status as any,
              currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
              currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
              updatedAt: new Date(),
            })
            .where(eq(subscription.stripeCustomerId, customerId));
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const stripeSubscription = event.data.object as Stripe.Subscription;
        const customerId = stripeSubscription.customer as string;

        await db
          .update(subscription)
          .set({
            status: 'canceled',
            canceledAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(subscription.stripeCustomerId, customerId));
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Update subscription status to active
        await db
          .update(subscription)
          .set({
            status: 'active',
            updatedAt: new Date(),
          })
          .where(eq(subscription.stripeCustomerId, customerId));
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Update subscription status to past_due
        await db
          .update(subscription)
          .set({
            status: 'past_due',
            updatedAt: new Date(),
          })
          .where(eq(subscription.stripeCustomerId, customerId));
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  }
}
