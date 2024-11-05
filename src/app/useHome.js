import { useState } from "react";
import { downloadFile } from "~/lib/downloadFile";

export function useHome() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoiceFilename, setInvoiceFilename] = useState(
    INITIAL_INVOICE_FILENAME,
  );

  const handleChangeStartDate = (event) => {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);
  };
  const handleChangeEndDate = (event) => {
    const newEndDate = event.target.value;

    setEndDate(newEndDate);
  };
  const handleChangeInvoiceFilename = (event) => {
    const newInvoiceFilename = event.target.value;

    setInvoiceFilename(newInvoiceFilename);
  };

  const isPaymentExportDisabled = !Boolean(startDate) || !Boolean(endDate);
  const isInvoiceExportDisabled =
    !Boolean(startDate) || !Boolean(endDate) || !Boolean(invoiceFilename);

  const handleExportPayments = async () => {
    const payments = await getPayments(startDate, endDate);

    downloadFile(payments, "payments.zip");
  };

  const handleExportInvoices = async () => {
    const invoices = await getInvoices(startDate, endDate, invoiceFilename);

    downloadFile(invoices, "invoices.zip");
  };

  return {
    startDate,
    endDate,
    invoiceFilename,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeInvoiceFilename,
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

async function getInvoices(startDate, endDate, invoiceFilename) {
  return await fetch(
    `/api/invoices?startDate=${startDate}&endDate=${endDate}&invoiceFilename=${invoiceFilename}`,
  ).then((response) => response.blob());
}

const INITIAL_INVOICE_FILENAME = "Faktura {number}";
