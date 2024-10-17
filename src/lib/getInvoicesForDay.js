import { getDayTimestampRange } from "~/lib/getDayTimestampRange";
import { Stripe } from "~/lib/stripe";

export async function getInvoicesForDay(day) {
  const [startTimestamp, endTimestamp] = getDayTimestampRange(day);

  const query = `status:"succeeded" AND created>${startTimestamp} AND created<${endTimestamp}`;

  const { data: payments } = await Stripe.paymentIntents.search({
    query,
    expand: ["data.invoice"],
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
