import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const h = req.headers.get("cookie");
  if (h) {
    const cookieParts = h.split(";");

    // Create an object to store cookies
    const cookies: any = {};

    // Iterate over each part of the cookie string
    cookieParts.forEach((part) => {
      // Split each part by equal sign
      const [name, value] = part.trim().split("=");
      // Store the cookie name and value in the cookies object
      cookies[name] = value;
    });
    if (!cookies["isFirst"] && req.nextUrl.pathname === "/") {
      return Response.redirect(new URL("/start", nextUrl));
    }

    if (cookies["isFirst"] && req.nextUrl.pathname === "/start") {
      return Response.redirect(new URL("/", nextUrl));
    }
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
