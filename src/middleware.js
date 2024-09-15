import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the routes that need authentication
const adminPath = ["/dashboard"];

export async function middleware(req) {
  // Check if the user is authenticated using next-auth's getToken
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // If trying to access /dashboard and not logged in, redirect to login
  if (adminPath.includes(pathname) && !session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in, prevent access to /login page
  if (pathname === "/login" && session) {
    const dashboard = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboard);
  }

  // Continue if no redirection is needed
  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/dashboard", "/login"],
};
