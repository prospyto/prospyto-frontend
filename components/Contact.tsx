"use client";

import { useState } from "react";

const EMAIL = "prospereazonglahoun@gmail.com";
const PHONE_DISPLAY = "+229 01 90 68 56 84";
const WHATSAPP_NUMBER = PHONE_DISPLAY.replace(/[^0-9]/g, "");

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencieux
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Contact
      </h2>
      <p className="mt-3 text-white/70 font-body">
        Parle-moi de ton prochain projet.
      </p>

      {/* Badge Contact Compact */}
      <div className="mt-8">
        <div
          className="inline-block rounded-full border border-primary/30 bg-primary/10 px-6 py-4 cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="font-heading font-semibold text-white text-sm">
                Disponible pour discuter
              </span>
            </div>
            <span className="text-secondary text-xs">
              {expanded ? "↑" : "↓"}
            </span>
          </div>

          {/* Détails au clic */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-primary/20 space-y-3">
              {/* Email */}
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary font-body mb-1">
                  Email
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyEmail();
                  }}
                  className="text-white font-body text-sm hover:text-primary transition-colors block"
                >
                  {copied ? "Email copié ✓" : EMAIL}
                </button>
              </div>

              {/* WhatsApp */}
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary font-body mb-1">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-body text-sm hover:text-primary transition-colors"
                >
                  {PHONE_DISPLAY} →
                </a>
              </div>

              {/* Réseaux */}
              <div>
                <p className="text-xs uppercase tracking-wide text-secondary font-body mb-2">
                  Réseaux
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/prospere-azonglahoun-279232307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-primary transition-colors text-xs font-body"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.facebook.com/prospere.azonglahoun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-primary transition-colors text-xs font-body"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
