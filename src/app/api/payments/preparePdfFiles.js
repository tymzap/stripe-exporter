import { getPaymentsForDateRange } from "~/lib/petPaymentsForDateRange";
import { formatDateTime } from "~/lib/formatDateTime";
import { getBusinessProfile } from "~/lib/getBusinessProfile";
import { getNipNumber } from "~/lib/getNipNumber";
import { getStripeAccountId } from "~/lib/getStripeAccountId";
import { prepareHtml } from "./prepareHtml";
import { htmlToPdf } from "~/lib/htmlToPdf";
import { formatDate } from "~/lib/formatDate";

export async function preparePdfFiles(startDate, endDate) {
  const payments = await getPaymentsForDateRange(startDate, endDate);
  const businessProfile = await getBusinessProfile();
  const nipNumber = await getNipNumber();
  const stripeAccountId = await getStripeAccountId();

  const paymentsGroupedByDay = groupPaymentsByDay(payments);

  const pdfFiles = await Promise.all(
    Object.entries(paymentsGroupedByDay).map(async ([day, payments]) => {
      const formattedPayments = payments.map(formatPayment);

      const html = prepareHtml({
        day,
        paymentsForDay: formattedPayments,
        businessProfile,
        nipNumber,
        stripeAccountId,
      });

      const buffer = await htmlToPdf(html);

      return {
        buffer,
        name: getPdfName(day),
      };
    }),
  );

  return pdfFiles;
}

function groupPaymentsByDay(payments) {
  return payments.reduce((accumulator, payment) => {
    const day = new Date(payment.createdAt).toISOString().split("T")[0];

    if (!accumulator[day]) {
      accumulator[day] = [];
    }

    accumulator[day].push(payment);

    return accumulator;
  }, {});
}

// todo handle case when client data is not stored in email and customer name
function formatPayment(payment) {
  const createdAt = formatDateTime(payment.createdAt);
  const amount = payment.amount / 100;
  const currency = payment.currency.toUpperCase();

  return {
    ...payment,
    createdAt,
    amount,
    currency,
  };
}

function getPdfName(day) {
  const formattedDate = formatDate(new Date(day));

  return `Podsumowanie transakcji Stripe z dnia ${formattedDate}.pdf`;
}
