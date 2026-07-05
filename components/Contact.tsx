"use client";

import { useState } from "react";

const EMAIL = "prospereazonglahoun@gmail.com";
const PHONE_DISPLAY = "+229 01 90 68 56 84";
const WHATSAPP_NUMBER = PHONE_DISPLAY.replace(/[^0-9]/g, "");

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencieux : navigateur sans support clipboard
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

      <button
        onClick={copyEmail}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover px-5 py-3 text-sm font-heading font-semibold text-white transition-colors"
      >
        {copied ? "Email copié" : "Copier l'email"}
      </button>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xs uppercase tracking-wide text-secondary font-body">Email</h3>
          <p className="mt-1 text-white font-body">{EMAIL}</p>

          <h3 className="mt-6 text-xs uppercase tracking-wide text-secondary font-body">
            Téléphone / WhatsApp
          </h3>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-white font-body hover:text-secondary transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wide text-secondary font-body">Réseaux</h3>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href="https://www.linkedin.com/in/prospere-azonglahoun-279232307"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-secondary transition-colors font-body"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/prospere.azonglahoun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-secondary transition-colors font-body"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
