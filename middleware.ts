import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const cookie = req.cookies?.get("isFirst");
  if (!cookie && req.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/start", nextUrl));
  }

  if (cookie && req.nextUrl.pathname === "/start") {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (nextUrl.pathname === "/login") {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return null;
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
