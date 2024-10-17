import archiver from "archiver";
import { PassThrough } from "stream";

export async function createZipFile(content) {
  const passthrough = new PassThrough();

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(passthrough);

  content.forEach((item) => {
    archive.append(item.buffer, { name: item.name });
  });

  await archive.finalize();

  return passthrough;
}
