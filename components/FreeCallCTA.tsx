"use client";

import { useState } from "react";
import { Clock, Check, MessageCircle, Mail } from "lucide-react";
import Blob from "./Blob";

export default function FreeCallCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Ici tu peux intégrer un formulaire (Typeform, Calendly, etc.)
    console.log("Email:", email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
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
          Réserve un appel découverte gratuit de 30 minutes. On discutera de ton idée, 
          de tes besoins, et je te dirai exactement comment je peux t&apos;aider.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="email"
            placeholder="Ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-secondary focus:outline-none text-white placeholder-white/50 font-body transition-colors"
          />
          <button
            type="submit"
            className="btn-animate btn-primary-fx inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary-hover font-heading font-semibold text-white transition-colors whitespace-nowrap"
          >
            {submitted ? (
              <>
                <Check size={18} />
                Vérifie ton email!
              </>
            ) : (
              "Réserver l'appel"
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
            <p>Appel via WhatsApp/Zoom</p>
          </div>
        </div>

        {/* Alternative */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-white/60 font-body text-sm mb-3">Préfères un contact direct?</p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/22901906856"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animate inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary/50 hover:bg-secondary/10 text-secondary font-body transition-colors text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="mailto:prospereazonglahoun@gmail.com"
              className="btn-animate inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary/50 hover:bg-secondary/10 text-secondary font-body transition-colors text-sm"
            >
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
