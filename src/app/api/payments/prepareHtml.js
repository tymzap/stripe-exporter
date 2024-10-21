import { createHtmlTable } from "~/lib/createHtmlTable";
import { formatDate } from "~/lib/formatDate";

export function prepareHtml({
  day,
  paymentsForDay,
  businessProfile,
  nipNumber,
  stripeAccountId,
}) {
  const summaryRow = prepareSummaryRow(paymentsForDay);
  const table = createHtmlTable(paymentsForDay, COLUMN_NAMES, summaryRow);
  const companyInfoText = prepareCompanyInfoText(businessProfile, nipNumber);
  const documentInfoText = prepareDocumentInfoText(stripeAccountId);
  const heading = prepareHeading(day);

  return `${heading}${companyInfoText}<br />${table}${documentInfoText}`;
}

function prepareCompanyInfoText(businessProfile, nipNumber) {
  const {
    name,
    address: { line1, postalCode },
  } = businessProfile;

  return `<div><p>${name}</p><p>${line1}, ${postalCode}</p><p>NIP ${nipNumber}</p></div>`;
}

function prepareDocumentInfoText(stripeAccountId) {
  const formattedDay = formatDate(new Date());

  return `<p>Dokument PDF wygenerowano dnia ${formattedDay} poprzez Stripe API (identyfikator konta: ${stripeAccountId})</p>`;
}

function prepareHeading(day) {
  const formattedDay = formatDate(new Date(day));

  return `<h1>Podsumowanie transakcji Stripe z dnia ${formattedDay}</h1>`;
}

function prepareSummaryRow(paymentsForDay) {
  const sum = paymentsForDay.reduce(
    (accumulator, value) => accumulator + value.amount,
    0,
  );
  const currency = paymentsForDay[0].currency;

  const text = `Suma: ${sum} ${currency}`;
  const columnsCount = Object.keys(paymentsForDay[0]).length;

  return `<tr><td colspan="${columnsCount}"><strong>${text}</strong></td></tr>`;
}

const COLUMN_NAMES = {
  createdAt: "Data transakcji",
  amount: "Kwota",
  currency: "Waluta",
  invoiceNumber: "Numer faktury",
  customerName: "Klient",
  customerCountry: "Kraj",
};
