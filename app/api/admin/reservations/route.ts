import { NextResponse } from "next/server";
import { getReservations } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const reservations = getReservations();
  return NextResponse.json(reservations);
}
