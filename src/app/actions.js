"use server";

import { Stripe } from "~/lib/stripe";
import { getDayTimestampRange } from "~/lib/getDayTimestampRange";

export async function exportPayments() {
  const day = new Date("2024-10-16");
  const [startTimestamp, endTimestamp] = getDayTimestampRange(day);

  const query = `status:"succeeded" AND created>${startTimestamp} AND created<${endTimestamp}`;

  const { data: payments } = await Stripe.paymentIntents.search({
    query,
    expand: ["data.invoice"],
  });

  return transformPayments(payments);
}

function transformPayments(payments) {
  return payments.map((payment) => {
    return {
      createdAt: new Date(payment.created * 1000).toLocaleDateString("pl-PL"),
      amount: payment.amount / 100,
      currency: payment.currency.toUpperCase(),
      invoiceNumber: payment.invoice?.number,
      customerName: payment.invoice?.customer_name,
      customerCountry: payment.invoice?.customer_address?.country,
    };
  });
}
