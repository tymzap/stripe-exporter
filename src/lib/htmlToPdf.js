import { generatePdf } from "html-pdf-node";

export async function htmlToPdf(html) {
  const pdfBuffer = await generatePdf({ content: html }, {});

  return pdfBuffer;
}
