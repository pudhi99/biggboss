import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminPath = ["/dashboard"];

export async function middleware(req) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  });

  const { pathname } = req.nextUrl;

  if (adminPath.includes(pathname) && !session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && session) {
    const dashboard = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboard);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
