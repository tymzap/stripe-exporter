import { NextResponse } from "next/server";

import { getPaymentsForDay } from "~/lib/getPaymentsForDay";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  if (!day) {
    return new Response("day param missing", { status: 404 });
  }

  const paymentsForDay = await getPaymentsForDay(new Date(day));

  return NextResponse.json(paymentsForDay);
}
