import { prepareZipFile } from "./prepareZipFile";

export async function GET(request) {
  const startDate = request.nextUrl.searchParams.get("startDate");
  const endDate = request.nextUrl.searchParams.get("endDate");
  const invoiceFilename = request.nextUrl.searchParams.get("invoiceFilename");

  if (!startDate) {
    return new Response("startDate param missing", { status: 404 });
  }

  if (!endDate) {
    return new Response("endDate param missing", { status: 404 });
  }

  if (!invoiceFilename) {
    return new Response("invoiceFilename param missing", { status: 404 });
  }

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  const zipFileStream = await prepareZipFile(
    parsedStartDate,
    parsedEndDate,
    invoiceFilename,
  );

  const headers = new Headers();
  headers.set("Content-Type", "application/zip");

  return new Response(zipFileStream, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
