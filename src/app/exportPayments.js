"use server";

import { getPaymentsForDay } from "~/lib/getPaymentsForDay";

export async function exportPayments() {
  return await getPaymentsForDay(new Date("2024-10-15"));
}
