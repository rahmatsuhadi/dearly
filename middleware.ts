import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // // Ambil token dari cookie (Edge-safe)
  // const token = req.cookies.get("token")?.value;
  // const isLoggedIn = !!token;

  // const protectedPaths = ["/dashboard"];
  // const isProtectedPath = protectedPaths.some((path) =>
  //   pathname.startsWith(path),
  // );

  // const authPaths = ["/auth/login", "/auth/register"];
  // const isAuthPath = authPaths.some((path) => pathname === path);

  // if (isProtectedPath && !isLoggedIn) {
  //   const loginUrl = new URL("/auth/login", req.url);
  //   loginUrl.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (isAuthPath && isLoggedIn) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
