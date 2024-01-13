import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (nextUrl.pathname === "/login") {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return null;
  }

  return null;
});

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("isFirst");
  if (!cookie && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/start", request.url));
  }

  if (cookie && request.nextUrl.pathname === "/start") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
