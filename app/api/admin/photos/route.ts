import { NextRequest, NextResponse } from "next/server";
import { getPhotos, savePhotos, PhotosConfig } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  return NextResponse.json(getPhotos());
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const config: PhotosConfig = await req.json();
  savePhotos(config);
  return NextResponse.json({ ok: true });
}
