import archiver from "archiver";
import { PassThrough } from "stream";

export async function createZipFile(content) {
  const stream = new PassThrough();

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(stream);

  content.forEach((item) => {
    archive.append(item.buffer, { name: item.name });
  });

  await archive.finalize();

  return stream;
}
