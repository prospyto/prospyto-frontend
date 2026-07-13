import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({ breaks: true, gfm: true });

/**
 * Convertit du markdown en HTML sécurisé (sanitizé via DOMPurify).
 * Utilisé à la fois pour l'aperçu admin et le rendu public des articles.
 * Ne fonctionne que côté client (DOMPurify a besoin du DOM du navigateur).
 */
export function renderMarkdown(markdown: string): string {
  if (typeof window === "undefined") return "";
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml);
}
