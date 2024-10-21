import { useState } from "react";
import { downloadFile } from "~/lib/downloadFile";

export function useHome() {
  const [date, setDate] = useState("");

  const handleExportPayments = async () => {
    const payments = await fetch(`/api/payments?day=${date}`).then((response) =>
      response.blob(),
    );

    downloadFile(payments, "payments.pdf");
  };

  const handleExportInvoices = async () => {
    const invoices = await fetch(`/api/invoices?day=${date}`).then((response) =>
      response.blob(),
    );

    downloadFile(invoices, "invoices.zip");
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const isPaymentExportDisabled = !Boolean(date);
  const isInvoiceExportDisabled = !Boolean(date);

  return {
    date,
    handleExportPayments,
    handleExportInvoices,
    handleChangeDate,
    isPaymentExportDisabled,
    isInvoiceExportDisabled,
  };
}
