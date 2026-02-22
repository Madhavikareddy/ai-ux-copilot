// MOCK MODE — Auth middleware bypassed for UI development
// TODO: Re-enable auth checks when switching to real OpenAI integration
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(_request: NextRequest) {
  // All routes are accessible during mock/dev mode
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/reports/:path*", "/settings/:path*", "/login", "/signup"],
};
