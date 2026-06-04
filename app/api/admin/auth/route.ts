import { NextRequest, NextResponse } from "next/server";
import { createSession, destroySession, getAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
