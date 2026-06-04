import { NextResponse } from "next/server";
import { getReservations } from "@/lib/store";

// Returns all booked dates as "YYYY-MM-DD" strings.
// Dates with status "pendiente" or "confirmada" are considered occupied.
export async function GET() {
  const reservations = getReservations();
  const booked = reservations
    .filter(r => r.status !== "cancelada" && r.date.includes("-"))
    .map(r => r.date);
  return NextResponse.json(booked);
}
