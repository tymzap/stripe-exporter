import { getDateRangeBoundaryTimestamps } from "./getDateRangeBoundaryTimestamps";
import { stripe } from "~/lib/stripe";

export async function getInvoicesForDateRange(
  startDate,
  endDate,
  invoiceFilename,
) {
  const [startTimestamp, endTimestamp] = getDateRangeBoundaryTimestamps(
    startDate,
    endDate,
  );

  const query = `status:"succeeded" AND created>${startTimestamp} AND created<${endTimestamp}`;

  // todo implement paginating over results until `has_more` from the response is `true`
  const { data: payments } = await stripe.paymentIntents.search({
    query,
    expand: ["data.invoice"],
    limit: PAYMENTS_LIMIT,
  });

  return Promise.all(
    payments.map(
      async (payment) => await getInvoiceFromPayment(payment, invoiceFilename),
    ),
  );
}

async function getInvoiceFromPayment(payment, invoiceFilename) {
  const url = payment.invoice.invoice_pdf;
  const number = payment.invoice.number;

  const arrayBuffer = await fetch(url).then((response) =>
    response.arrayBuffer(),
  );
  const filename = `${invoiceFilename.replace("{number}", number)}.pdf`;

  return {
    filename,
    arrayBuffer,
  };
}

const PAYMENTS_LIMIT = 100;
