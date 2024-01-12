import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (nextUrl.pathname === "/") {
    return Response.redirect(new URL("/start", nextUrl));
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
