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

  const arrayBuffer = await fetch(url).then((response) =>
    response.arrayBuffer(),
  );

  const product = await getProductFromInvoice(payment.invoice);
  const productName = product?.name;
  const number = payment.invoice.number;

  const filename = prepareFilename(invoiceFilename, { number, productName });

  return {
    filename,
    arrayBuffer,
  };
}

async function getProductFromInvoice(invoice) {
  const productId = invoice?.lines?.data?.[0]?.plan?.product;

  if (!productId) {
    return null;
  }

  return await stripe.products.retrieve(productId);
}

function prepareFilename(initialFilename, { number, productName }) {
  let filename = initialFilename.replace("{number}", number);

  if (productName) {
    filename = filename.replace("{product}", productName);
  }

  return `${filename}.pdf`;
}

const PAYMENTS_LIMIT = 100;
