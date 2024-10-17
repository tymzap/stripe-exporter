import { createZipFile } from "~/lib/createZipFile";

import { getInvoicesForDay } from "~/lib/getInvoicesForDay";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  if (!day) {
    return new Response("day param missing", { status: 404 });
  }

  const invoices = await getInvoicesForDay(new Date(day));

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
