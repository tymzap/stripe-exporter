import { getDateRangeBoundaryTimestamps } from "./getDateRangeBoundaryTimestamps";
import { stripe } from "~/lib/stripe";
import { unixTimestampToDate } from "~/lib/unixTimestampToDate";

export async function getPaymentsForDateRange(startDate, endDate) {
  const [startTimestamp, endTimestamp] = getDateRangeBoundaryTimestamps(
    startDate,
    endDate,
  );

  const query = `status:"succeeded" AND created>${startTimestamp} AND created<${endTimestamp}`;

  // todo implement paginating over results until `has_more` from the response is `false`
  const { data: payments } = await stripe.paymentIntents.search({
    query,
    expand: ["data.invoice"],
    limit: PAYMENTS_LIMIT,
  });

  return payments.map(normalizePayment);
}

function normalizePayment(payment) {
  return {
    createdAt: unixTimestampToDate(payment.created),
    amount: payment.amount,
    currency: payment.currency,
    invoiceNumber: payment.invoice?.number,
    customerName: payment.invoice?.customer_name,
    customerCountry: payment.invoice?.customer_address?.country,
  };
}

const PAYMENTS_LIMIT = 100;
