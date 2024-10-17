import { createZipFile } from "~/lib/createZipFile";

import { getInvoicesForDay } from "~/lib/getInvoicesForDay";

export async function GET() {
  const invoices = await getInvoicesForDay(new Date("2024-10-15"));

  const zipFileContent = invoices.map((invoice) => ({
    buffer: Buffer.from(invoice.arrayBuffer),
    name: `${invoice.number}.pdf`,
  }));

  const zipFile = await createZipFile(zipFileContent);

  const headers = new Headers();
  headers.set("Content-Type", "application/zip");
  headers.set("Content-Disposition", 'attachment; filename="invoices.zip"');

  return new Response(zipFile, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
