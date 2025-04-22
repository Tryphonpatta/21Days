import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  console.log("pathname", pathname);
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/main/:path*", "/"],
};
