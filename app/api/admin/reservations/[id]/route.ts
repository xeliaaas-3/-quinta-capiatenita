import { NextRequest, NextResponse } from "next/server";
import { updateReservation, deleteReservation } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await params;
  const updates = await req.json();
  const updated = updateReservation(id, updates);
  if (!updated) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { id } = await params;
  const ok = deleteReservation(id);
  if (!ok) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
