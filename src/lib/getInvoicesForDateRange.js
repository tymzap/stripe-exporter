import { getDateRangeBoundaryTimestamps } from "./getDateRangeBoundaryTimestamps";
import { Stripe } from "~/lib/stripe";

export async function getInvoicesForDateRange(startDate, endDate) {
  const [startTimestamp, endTimestamp] = getDateRangeBoundaryTimestamps(
    startDate,
    endDate,
  );

  const query = `status:"succeeded" AND created>${startTimestamp - 1} AND created<${endTimestamp + 1}`;

  // todo implement paginating over results when `has_more` from the response is `true`
  const { data: payments } = await Stripe.paymentIntents.search({
    query,
    expand: ["data.invoice"],
    limit: PAYMENTS_LIMIT,
  });

  return Promise.all(
    payments.map(async (payment) => await getInvoiceFromPayment(payment)),
  );
}

async function getInvoiceFromPayment(payment) {
  const url = payment.invoice.invoice_pdf;
  const number = payment.invoice.number;

  const arrayBuffer = await fetch(url).then((response) =>
    response.arrayBuffer(),
  );

  return {
    number,
    arrayBuffer,
  };
}

const PAYMENTS_LIMIT = 100;
