import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
    const session = request.cookies.get("mhs_admin_session");

    if (!session?.value) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  if (pathname === "/dashboard/login") {
    const session = request.cookies.get("mhs_admin_session");
    if (session?.value) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
