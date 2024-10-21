import { getPaymentsForDay } from "~/lib/getPaymentsForDay";
import { getBusinessProfile } from "~/lib/getBusinessProfile";
import { getNipNumber } from "~/lib/getNipNumber";
import { getStripeAccountId } from "~/lib/getStripeAccountId";
import { htmlToPdf } from "~/lib/htmlToPdf";
import { prepareHtml } from "./prepareHtml";

export async function preparePdfFile(day) {
  const paymentsForDay = await getPaymentsForDay(new Date(day));
  const businessProfile = await getBusinessProfile();
  const nipNumber = await getNipNumber();
  const stripeAccountId = await getStripeAccountId();

  const html = prepareHtml({
    day,
    paymentsForDay,
    businessProfile,
    nipNumber,
    stripeAccountId,
  });

  const pdfBuffer = await htmlToPdf(html);

  return pdfBuffer;
}
