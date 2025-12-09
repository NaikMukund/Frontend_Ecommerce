import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;

  const path = req.nextUrl.pathname;

  const protectedRoutes = ["/admin", "/dashboard"];

  if (protectedRoutes.some((r) => path.startsWith(r)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
