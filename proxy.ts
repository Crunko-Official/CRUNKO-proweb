import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
