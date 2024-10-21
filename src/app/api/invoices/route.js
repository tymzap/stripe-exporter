import { prepareZipFile } from "./prepareZipFile";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  if (!day) {
    return new Response("day param missing", { status: 404 });
  }

  const zipFileStream = await prepareZipFile(day);

  const headers = new Headers();
  headers.set("Content-Type", "application/zip");

  return new Response(zipFileStream, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
