// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const { pathname } = req.nextUrl;

//   // ─────────────────────────────
//   // 1. Block unauthenticated users
//   // ─────────────────────────────
//   if (!token && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // ─────────────────────────────
//   // 2. Logged in but missing role
//   // ─────────────────────────────
//   if (token && !token.role && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // ─────────────────────────────
//   // 3. Role-based access control
//   // ─────────────────────────────
//   if (token && pathname.startsWith("/dashboard")) {
//     const role = (token.role as string).toLowerCase();

//     // Admin trying to access other dashboards
//     if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }

//     // Organizer trying to access other dashboards
//     if (pathname.startsWith("/dashboard/organizer") && role !== "organizer") {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }

//     // User trying to access other dashboards
//     if (pathname.startsWith("/dashboard/user") && role !== "user") {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }
//   }

//   // ─────────────────────────────
//   // 4. Allow request to continue
//   // ─────────────────────────────
//   return NextResponse.next();
// }

// // ─────────────────────────────
// // Middleware applies ONLY here
// // ─────────────────────────────
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const { pathname } = req.nextUrl;

//   // 1. Block unauthenticated users
//   if (!token && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // 2. Logged in but missing role
//   if (token && !token.role && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // 3. Role-based access control
//   if (token && token.role && pathname.startsWith("/dashboard")) {
//     const role = (token.role as string).toLowerCase();

//     if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }

//     if (pathname.startsWith("/dashboard/organizer") && role !== "organizer") {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }

//     if (pathname.startsWith("/dashboard/user") && role !== "user") {
//       return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Not logged in → login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const role = token.role as "ADMIN" | "ORGANIZER" | "USER" | undefined;

  if (!role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Role-based access
  if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  if (pathname.startsWith("/dashboard/organizer") && role !== "ORGANIZER") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  if (pathname.startsWith("/dashboard/user") && role !== "USER") {
    return NextResponse.redirect(
      new URL(`/dashboard/${role.toLowerCase()}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
