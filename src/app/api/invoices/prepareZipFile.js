import { getInvoicesForDateRange } from "~/lib/getInvoicesForDateRange";
import { createZipFile } from "~/lib/createZipFile";

export async function prepareZipFile(startDate, endDate) {
  const invoices = await getInvoicesForDateRange(startDate, endDate);

  const content = invoices.map((invoice) => ({
    buffer: Buffer.from(invoice.arrayBuffer),
    name: `${invoice.number}.pdf`,
  }));

  const zipFileStream = await createZipFile(content);

  return zipFileStream;
}
