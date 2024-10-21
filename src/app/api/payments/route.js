import { preparePdfFile } from "./preparePdfFile";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  if (!day) {
    return new Response("day param missing", { status: 404 });
  }

  const pdfBuffer = await preparePdfFile(day);

  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");

  return new Response(pdfBuffer, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
