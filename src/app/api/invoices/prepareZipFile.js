import { getInvoicesForDay } from "~/lib/getInvoicesForDay";
import { createZipFile } from "~/lib/createZipFile";

export async function prepareZipFile(day) {
  const invoices = await getInvoicesForDay(new Date(day));

  const content = invoices.map((invoice) => ({
    buffer: Buffer.from(invoice.arrayBuffer),
    name: `${invoice.number}.pdf`,
  }));

  const zipFileStream = await createZipFile(content);

  return zipFileStream;
}
