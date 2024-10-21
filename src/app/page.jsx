"use client";

import { useHome } from "./useHome";

export default function Home() {
  const {
    handleChangeDate,
    handleExportInvoices,
    handleExportPayments,
    isInvoiceExportDisabled,
    isPaymentExportDisabled,
    date,
  } = useHome();

  return (
    <>
      <label>
        Date:
        <br />
        <input type="date" onChange={handleChangeDate} value={date} />
      </label>
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
