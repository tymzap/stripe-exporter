"use client";

import { useHome } from "./useHome";

export default function Home() {
  const {
    startDate,
    endDate,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeInvoiceFilename,
    handleExportInvoices,
    handleExportPayments,
    isInvoiceExportDisabled,
    isPaymentExportDisabled,
    invoiceFilename,
  } = useHome();

  return (
    <>
      <div>
        <label>
          Start date
          <br />
          <input
            type="date"
            onChange={handleChangeStartDate}
            value={startDate}
          />
        </label>
      </div>
      <div>
        <label>
          End date:
          <br />
          <input type="date" onChange={handleChangeEndDate} value={endDate} />
        </label>
      </div>
      <div>Invoice file name:</div>
      <input value={invoiceFilename} onChange={handleChangeInvoiceFilename} />
      <hr />
      <button onClick={handleExportPayments} disabled={isPaymentExportDisabled}>
        Export payments
      </button>{" "}
      <button onClick={handleExportInvoices} disabled={isInvoiceExportDisabled}>
        Export invoices
      </button>
    </>
  );
}
