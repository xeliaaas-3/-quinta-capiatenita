import { cookies } from "next/headers";

const SESSION_COOKIE = "quinta_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-in-prod";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin1234";
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_SECRET;
}
