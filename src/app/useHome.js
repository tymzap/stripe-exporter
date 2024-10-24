import { useState } from "react";
import { downloadFile } from "~/lib/downloadFile";

export function useHome() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangeStartDate = (event) => {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);
  };
  const handleChangeEndDate = (event) => {
    const newEndDate = event.target.value;

    setEndDate(newEndDate);
  };

  const isPaymentExportDisabled = !Boolean(startDate) || !Boolean(endDate);
  const isInvoiceExportDisabled = !Boolean(startDate) || !Boolean(endDate);

  const handleExportPayments = async () => {
    const payments = await getPayments(startDate, endDate);

    downloadFile(payments, "payments.zip");
  };

  const handleExportInvoices = async () => {
    const invoices = await getInvoices(startDate, endDate);

    downloadFile(invoices, "invoices.zip");
  };

  return {
    startDate,
    endDate,
    handleChangeStartDate,
    handleChangeEndDate,
    handleExportPayments,
    handleExportInvoices,
    isPaymentExportDisabled,
    isInvoiceExportDisabled,
  };
}

async function getPayments(startDate, endDate) {
  return await fetch(
    `/api/payments?startDate=${startDate}&endDate=${endDate}`,
  ).then((response) => response.blob());
}

async function getInvoices(startDate, endDate) {
  return await fetch(
    `/api/invoices?startDate=${startDate}&endDate=${endDate}`,
  ).then((response) => response.blob());
}
