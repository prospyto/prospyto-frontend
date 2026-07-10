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

    // Gate UX seulement : présence d'un token posé après un login réussi
    // contre le backend. Ce cookie n'est PAS la sécurité — la vraie
    // protection est le JWT vérifié par le backend sur chaque requête
    // /api/projects et /api/inquiries. Un cookie falsifié ne donne accès
    // à aucune donnée, juste à un écran vide qui échouera à charger.
    const hasSession = request.cookies.get("prospyto_admin_present")?.value === "1";

    if (hasSession) {
      return NextResponse.next();
    }

    // Pas de session et pas l'URL secrète: afficher 404
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
