"use client";

import { useState } from "react";
import { Mail, Phone, Check } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

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
    <section id="contact" className="mx-auto max-w-md px-6 py-16 text-center">
      <h2 className="font-heading font-semibold text-xl text-secondary">Contact</h2>

      <div
        className="mt-5 rounded-2xl p-5 border border-white/10 flex flex-col gap-3"
        style={{ background: "#2d0a52" }}
      >
        <button
          onClick={copyEmail}
          className="flex items-center gap-3 text-sm text-white/80 hover:text-secondary transition-colors font-body"
        >
          {copied ? <Check size={16} /> : <Mail size={16} />}
          {copied ? "Email copié" : EMAIL}
        </button>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-white/80 hover:text-secondary transition-colors font-body"
        >
          <Phone size={16} />
          {PHONE_DISPLAY}
        </a>

        <a
          href="https://www.linkedin.com/in/prospere-azonglahoun-279232307"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-white/80 hover:text-secondary transition-colors font-body"
        >
          <FaLinkedin size={16} />
          LinkedIn
        </a>

        <a
          href="https://www.facebook.com/prospere.azonglahoun"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-white/80 hover:text-secondary transition-colors font-body"
        >
          <SiFacebook size={16} />
          Facebook
        </a>
      </div>
    </section>
  );
}
