import { stripe } from "~/lib/stripe";

export async function getStripeAccountId() {
  const account = await stripe.accounts.retrieve();

  return account.id;
}
