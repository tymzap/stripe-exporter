"use client";

import { downloadFile } from "~/lib/downloadFile";
import { exportPayments } from "./exportPayments";

export default function Home() {
  const handleExportPayments = async () => {
    const payments = await exportPayments();

    console.log(payments);
  };

  const handleDownloadInvoices = async () => {
    const invoices = await fetch("/api/invoices").then((response) =>
      response.blob(),
    );

    downloadFile(invoices, "invoices.zip");
  };

  return (
    <>
      <button onClick={handleExportPayments}>Export payments</button>
      <button onClick={handleDownloadInvoices}>Download invoices</button>
    </>
  );
}
