import { NextRequest, NextResponse } from "next/server";
import { addReservation } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, time, name, phone, email, eventType, guests, message } = body;

    if (!date || !time || !name || !phone) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const reservation = addReservation({ date, time, name, phone, email, eventType, guests, message });
    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al guardar la reserva" }, { status: 500 });
  }
}
