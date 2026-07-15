"use client";

import { useState, type FormEvent } from "react";
import { User, Layers, FileText, Wallet, Clock } from "lucide-react";

const PROJECT_TYPES = [
  "Site vitrine",
  "Portfolio",
  "Application web",
  "Design / branding",
  "Autre",
];

// Dégradé jaune solaire -> or fumé chaud, cohérent avec la nouvelle identité Prospyto
// Du jaune solaire brillant à l'or fumé pour les étapes du formulaire
const STEP_COLORS = ["#FFB81C", "#F5A500", "#E6A500", "#CC8B00", "#B37A00"];

type Status = "idle" | "sending" | "success" | "error";

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      project_type: formData.get("project_type"),
      description: formData.get("description"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
    };

    try {
      const res = await fetch(`${apiBase}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Impossible d'envoyer la demande pour le moment. Le service est peut-être encore en cours de déploiement."
      );
    }
  }

  if (status === "success") {
    return (
      <section id="commander" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="section-eyebrow">C&apos;est parti</span>
        <h2 className="mt-3 font-heading font-semibold text-2xl md:text-3xl text-white">
          Demande envoyée
        </h2>
        <p className="mt-3 text-white/70 font-body">
          Merci. La demande est bien enregistrée, réponse à venir rapidement.
        </p>
      </section>
    );
  }

  const inputClass =
    "w-full rounded-lg px-4 py-2.5 text-sm text-[#1a0b2e] placeholder-[#8a7ba0] font-body border border-transparent focus:outline-none focus:border-[var(--primary-color)] bg-white";

  return (
    <section id="commander" className="mx-auto max-w-2xl px-6 py-20">
      <span className="section-eyebrow">Passons à l&apos;action</span>
      <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
        Commander un projet
      </h2>
      <p className="mt-3 text-white/70 font-body">
        Décris ton projet, réponse par WhatsApp ou email.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col">
        {/* Étape 1 : Contact */}
        <div className="flex items-stretch gap-0">
          <div
            className="flex-shrink-0 w-16 rounded-l-2xl flex items-center justify-center text-2xl font-heading font-bold text-white"
            style={{ background: STEP_COLORS[0] }}
          >
            1
          </div>
          <div
            className="flex-1 rounded-r-2xl px-5 py-4"
            style={{ background: "white" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <User size={18} color={STEP_COLORS[0]} />
              <span className="text-xs font-body font-semibold uppercase tracking-wide text-[#1a0b2e]/60">
                Tes coordonnées
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input name="name" required placeholder="Nom complet" className={inputClass} />
              <input name="email" type="email" required placeholder="Email" className={inputClass} />
              <input name="phone" required placeholder="Téléphone / WhatsApp" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex justify-center py-1">
          <div className="w-px h-4 border-l-2 border-dotted" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Étape 2 : Type de projet */}
        <div className="flex items-stretch gap-0">
          <div
            className="flex-shrink-0 w-16 rounded-l-2xl flex items-center justify-center text-2xl font-heading font-bold text-white"
            style={{ background: STEP_COLORS[1] }}
          >
            2
          </div>
          <div className="flex-1 rounded-r-2xl px-5 py-4" style={{ background: "white" }}>
            <div className="flex items-center gap-2 mb-3">
              <Layers size={18} color={STEP_COLORS[1]} />
              <span className="text-xs font-body font-semibold uppercase tracking-wide text-[#1a0b2e]/60">
                Type de projet
              </span>
            </div>
            <select name="project_type" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Choisis une catégorie
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center py-1">
          <div className="w-px h-4 border-l-2 border-dotted" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Étape 3 : Description */}
        <div className="flex items-stretch gap-0">
          <div
            className="flex-shrink-0 w-16 rounded-l-2xl flex items-center justify-center text-2xl font-heading font-bold text-white"
            style={{ background: STEP_COLORS[2] }}
          >
            3
          </div>
          <div className="flex-1 rounded-r-2xl px-5 py-4" style={{ background: "white" }}>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} color={STEP_COLORS[2]} />
              <span className="text-xs font-body font-semibold uppercase tracking-wide text-[#1a0b2e]/60">
                Décris ton projet
              </span>
            </div>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="De quoi as-tu besoin ?"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-center py-1">
          <div className="w-px h-4 border-l-2 border-dotted" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Étape 4 : Budget */}
        <div className="flex items-stretch gap-0">
          <div
            className="flex-shrink-0 w-16 rounded-l-2xl flex items-center justify-center text-2xl font-heading font-bold text-white"
            style={{ background: STEP_COLORS[3] }}
          >
            4
          </div>
          <div className="flex-1 rounded-r-2xl px-5 py-4" style={{ background: "white" }}>
            <div className="flex items-center gap-2 mb-3">
              <Wallet size={18} color={STEP_COLORS[3]} />
              <span className="text-xs font-body font-semibold uppercase tracking-wide text-[#1a0b2e]/60">
                Budget estimé (optionnel)
              </span>
            </div>
            <input name="budget" placeholder="Ex: 50 000 FCFA" className={inputClass} />
          </div>
        </div>

        <div className="flex justify-center py-1">
          <div className="w-px h-4 border-l-2 border-dotted" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Étape 5 : Délai */}
        <div className="flex items-stretch gap-0">
          <div
            className="flex-shrink-0 w-16 rounded-l-2xl flex items-center justify-center text-2xl font-heading font-bold text-white"
            style={{ background: STEP_COLORS[4] }}
          >
            5
          </div>
          <div className="flex-1 rounded-r-2xl px-5 py-4" style={{ background: "white" }}>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} color={STEP_COLORS[4]} />
              <span className="text-xs font-body font-semibold uppercase tracking-wide text-[#1a0b2e]/60">
                Délai souhaité (optionnel)
              </span>
            </div>
            <input name="timeline" placeholder="Ex: 2 semaines" className={inputClass} />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-8 btn-animate btn-border-scan btn-primary-fx btn-accent rounded-xl bg-accent hover:bg-accent-hover px-6 py-3 font-heading font-semibold text-sm text-white transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Envoi en cours" : "Envoyer la demande"}
        </button>

        {status === "error" && (
          <p className="mt-3 text-sm font-body" style={{ color: "#ef4444" }}>
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
