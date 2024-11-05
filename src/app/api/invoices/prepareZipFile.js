import { getInvoicesForDateRange } from "~/lib/getInvoicesForDateRange";
import { createZipFile } from "~/lib/createZipFile";

export async function prepareZipFile(startDate, endDate, invoiceFilename) {
  const invoices = await getInvoicesForDateRange(
    startDate,
    endDate,
    invoiceFilename,
  );

  const content = invoices.map((invoice) => ({
    buffer: Buffer.from(invoice.arrayBuffer),
    name: invoice.filename,
  }));

  const zipFileStream = await createZipFile(content);

  return zipFileStream;
}
