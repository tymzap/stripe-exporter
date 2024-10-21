import { Stripe } from "~/lib/stripe";

export async function getStripeAccountId() {
  const account = await Stripe.accounts.retrieve();

  return account.id;
}
