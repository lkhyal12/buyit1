"use server";

import { stripe } from "@/lib/stripe";

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return {
    payment_status: session.payment_status,
  };
}
