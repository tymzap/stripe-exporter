import setupStripe from "stripe";

export const Stripe = setupStripe(process.env.STRIPE_PRIVATE_KEY);
