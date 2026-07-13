"use client";

import { useState } from "react";
import { Clock, Check, MessageCircle } from "lucide-react";
import Blob from "./Blob";

// Même numéro que Contact.tsx, pour éviter d'avoir deux numéros
// WhatsApp différents sur le site.
const PHONE_DISPLAY = "+229 01 90 68 56 84";
const WHATSAPP_NUMBER = PHONE_DISPLAY.replace(/[^0-9]/g, "");

export default function FreeCallCTA() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Bonjour Prospère, je m'appelle ${name}. ${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setMessage("");
    }, 3000);
  }

  return (
    <section
      id="appel-gratuit"
      className="relative mx-auto max-w-4xl px-6 py-24 md:py-32 overflow-hidden"
    >
      <Blob color="var(--secondary-color)" className="-top-20 -right-20" size={300} />
      <Blob color="var(--primary-color)" className="-bottom-32 -left-32" size={350} />

      <div className="relative z-10 rounded-3xl border border-white/20 p-8 md:p-12 backdrop-blur-sm"
        style={{ background: "linear-gradient(135deg, rgba(45,10,82,0.8), rgba(26,10,46,0.8))" }}>
        
        {/* Urgence Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-secondary/50 bg-secondary/10">
          <Clock size={16} className="text-secondary" />
          <p className="text-sm font-heading font-semibold text-secondary">
            3 spots disponibles ce mois, agis vite!
          </p>
        </div>

        {/* Titre */}
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4 leading-tight">
          Parlons de ton projet
        </h2>

        {/* Description */}
        <p className="text-lg text-white/80 font-body mb-8 max-w-2xl leading-relaxed">
          Décris ton projet en quelques mots. Le message s&apos;ouvre directement dans 
          WhatsApp, prêt à envoyer, pour qu&apos;on en discute tout de suite.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Ton nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-secondary focus:outline-none text-white placeholder-white/50 font-body transition-colors"
          />
          <textarea
            placeholder="Ton projet en quelques mots"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-secondary focus:outline-none text-white placeholder-white/50 font-body transition-colors resize-none"
          />
          <button
            type="submit"
            className="btn-animate btn-border-scan btn-primary-fx btn-accent inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-accent hover:bg-accent-hover font-heading font-semibold text-white transition-colors whitespace-nowrap"
          >
            {sent ? (
              <>
                <Check size={18} />
                Ouvert dans WhatsApp
              </>
            ) : (
              <>
                <MessageCircle size={18} />
                Envoyer sur WhatsApp
              </>
            )}
          </button>
        </form>

        {/* Infos supplémentaires */}
        <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/70 font-body">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-secondary" />
            <p>Pas d&apos;engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-secondary" />
            <p>Réponse en moins de 24h</p>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-secondary" />
            <p>Discussion directe sur WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
}
