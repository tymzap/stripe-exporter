import { Stripe } from "~/lib/stripe";

export async function getBusinessProfile() {
  const account = await Stripe.accounts.retrieve();

  return {
    name: account.business_profile.name,
    address: {
      line1: account.business_profile.support_address.line1,
      postalCode: account.business_profile.support_address.postal_code,
    },
  };
}
