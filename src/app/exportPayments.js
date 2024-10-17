"use server";

import { getPaymentsForDay } from "~/lib/getPaymentsForDay";

export async function exportPayments(date) {
  return await getPaymentsForDay(new Date(date));
}
