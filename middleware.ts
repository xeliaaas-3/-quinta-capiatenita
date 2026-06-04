import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "quinta_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-in-prod";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = req.cookies.get(SESSION_COOKIE)?.value;
    if (session !== SESSION_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
