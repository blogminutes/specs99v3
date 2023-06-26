import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/sign-in*", "/sign-up*"];
const adminPaths = ["/admin*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

const isAdmin = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

const { status } = useSession();

export function middleware(request: NextRequest) {
  if (
    isPublic(request.nextUrl.pathname) &&
    !isAdmin(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.

  if (status !== "authenticated") {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }
  if (
    status === "authenticated" &&
    // user?.prefs?.role === "admin" &&
    isAdmin(request.nextUrl.pathname)
  ) {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
