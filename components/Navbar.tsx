"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#about", label: "Pourquoi moi" },
  { href: "#projects", label: "Projets" },
  { href: "#skills", label: "Compétences" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{ background: "rgba(28, 5, 56, 0.75)", borderBottom: "1px solid rgba(224,170,255,0.12)" }}
    >
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-white text-lg">
          Prosp<span className="text-secondary">ère</span>
        </a>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-body text-white/75 hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#appel-gratuit"
            className="btn-animate btn-primary-fx rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-heading font-semibold text-white transition-colors"
          >
            Démarrer
          </a>
        </div>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(224,170,255,0.12)" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-body text-white/80 hover:text-secondary transition-colors pt-4"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#appel-gratuit"
            onClick={() => setOpen(false)}
            className="btn-animate btn-primary-fx text-center rounded-lg bg-primary hover:bg-primary-hover px-4 py-2.5 text-sm font-heading font-semibold text-white transition-colors mt-1"
          >
            Démarrer
          </a>
        </div>
      )}
    </header>
  );
}
