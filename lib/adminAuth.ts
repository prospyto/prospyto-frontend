// Gestion du token JWT admin + wrapper fetch qui attache le header Authorization.
//
// Le token est stocké en localStorage (lu uniquement côté client) et une trace
// de sa présence est mise dans un cookie non-httpOnly juste pour que le
// middleware Next.js puisse faire un gate UX rapide (éviter d'afficher la page
// admin une fraction de seconde avant redirection). La vraie protection des
// données reste côté backend : sans JWT valide, aucune route /api/projects ou
// /api/inquiries ne répond.

const TOKEN_KEY = "prospyto_admin_token";

export function getApiBase() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  // Cookie non-sensible (juste "présence"), lu par middleware.ts pour le gate UX.
  document.cookie = `prospyto_admin_present=1; path=/; max-age=${12 * 60 * 60}`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = "prospyto_admin_present=; path=/; max-age=0";
}

/**
 * Wrapper fetch pour les routes admin : attache le Bearer token, et si le
 * backend renvoie 401 (token manquant/expiré/invalide), nettoie la session
 * et renvoie vers le login.
 */
export async function adminFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${getApiBase()}${path}`, { ...options, headers });

  if (res.status === 401 && typeof window !== "undefined") {
    clearToken();
    window.location.href = "/admin/verify-8db242e403bbe210e9392a1259cc7024360af1f8e4375f529b9b3130620c004d";
  }

  return res;
}
