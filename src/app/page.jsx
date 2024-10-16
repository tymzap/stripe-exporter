"use client";

import { useState } from "react";
import { downloadFile } from "~/lib/downloadFile";

export default function Home() {
  const [date, setDate] = useState("");

  const handleExportPayments = async () => {
    const invoices = await fetch(`/api/payments?day=${date}`).then((response) =>
      response.json(),
    );

    console.log(invoices);
  };

  const handleDownloadInvoices = async () => {
    const invoices = await fetch(`/api/invoices?day=${date}`).then((response) =>
      response.blob(),
    );

    downloadFile(invoices, "invoices.zip");
  };

  const handleChangeDate = (event) => {
    const value = event.target.value;

    setDate(value);
  };

  return (
    <>
      <input type="date" onChange={handleChangeDate} value={date} />
      <button onClick={handleExportPayments} disabled={!Boolean(date)}>
        Export payments
      </button>
      <button onClick={handleDownloadInvoices} disabled={!Boolean(date)}>
        Download invoices
      </button>
    </>
  );
}
