import { type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabaseMiddlewareClient";

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(request);
  const { pathname } = request.nextUrl;

  if (pathname === "/admin") {
    return Response.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/admin/dashboard")) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return Response.redirect(new URL("/admin/login", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
