import { NextRequest, NextResponse } from "next/server";

// Code secret pour accéder à la page de login
const ADMIN_VERIFY_CODE = "8db242e403bbe210e9392a1259cc7024360af1f8e4375f529b9b3130620c004d";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bloquer tout accès à /admin* 
  if (pathname.startsWith("/admin")) {
    // Exception: autoriser l'URL secrète pour la page de login
    if (pathname === `/admin/verify-${ADMIN_VERIFY_CODE}`) {
      return NextResponse.next();
    }

    // Vérifier si l'utilisateur est authentifié via le cookie
    const adminToken = request.cookies.get("admin_authenticated")?.value;

    if (adminToken === "true") {
      // Authentifié: autoriser l'accès à /admin
      return NextResponse.next();
    }

    // Non authentifié et pas l'URL secrète: afficher 404
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
