import { getDayTimestampRange } from "~/lib/getDayTimestampRange";
import { unixTimestampToDate } from "~/lib/unixTimestampToDate";
import { formatDateTime } from "~/lib/formatDateTime";
import { Stripe } from "~/lib/stripe";

export async function getPaymentsForDay(day) {
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
    const createdAt = formatDateTime(unixTimestampToDate(payment.created));
    const amount = payment.amount / 100;
    const currency = payment.currency.toUpperCase();

    return {
      createdAt,
      amount,
      currency,
      invoiceNumber: payment.invoice?.number,
      customerName: payment.invoice?.customer_name,
      customerCountry: payment.invoice?.customer_address?.country,
    };
  });
}
