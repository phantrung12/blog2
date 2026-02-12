import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/posts/new", "/profile"];

// Routes only accessible when NOT logged in
const guestOnlyRoutes = ["/login", "/register"];

function isProtectedRoute(pathname: string): boolean {
  // Check exact matches
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    return true;
  }

  // Check /posts/[slug]/edit pattern
  if (/^\/posts\/[^/]+\/edit$/.test(pathname)) {
    return true;
  }

  return false;
}

function isGuestOnlyRoute(pathname: string): boolean {
  return guestOnlyRoutes.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // Protected routes: redirect to login if no token
  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Guest-only routes: redirect to home if already logged in
  if (isGuestOnlyRoute(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
