"use client";

import { useState, type FormEvent } from "react";

const PROJECT_TYPES = [
  "Site vitrine",
  "Portfolio",
  "Application web",
  "Design / branding",
  "Autre",
];

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
        <span className="section-eyebrow">C'est parti</span>
        <h2 className="mt-3 font-heading font-semibold text-2xl md:text-3xl text-white">
          Demande envoyée
        </h2>
        <p className="mt-3 text-white/70 font-body">
          Merci. La demande est bien enregistrée — réponse à venir rapidement.
        </p>
      </section>
    );
  }

  return (
    <section id="commander" className="mx-auto max-w-3xl px-6 py-20">
      <span className="section-eyebrow">Passons à l'action</span>
      <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
        Commander un projet
      </h2>
      <p className="mt-3 text-white/70 font-body">
        Décris ton projet, réponse par WhatsApp ou email.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder="Nom complet"
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        />
        <input
          name="phone"
          required
          placeholder="Téléphone / WhatsApp"
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        />
        <select
          name="project_type"
          required
          defaultValue=""
          className="rounded-lg px-4 py-3 text-sm text-white font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        >
          <option value="" disabled>
            Type de projet
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          name="budget"
          placeholder="Budget estimé (optionnel)"
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        />
        <input
          name="timeline"
          placeholder="Délai souhaité (optionnel)"
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        />
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Décris ton projet"
          className="md:col-span-2 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 font-body border border-white/10 focus:outline-none focus:border-secondary"
          style={{ background: "#2d0a52" }}
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="md:col-span-2 rounded-xl bg-primary hover:bg-primary-hover px-6 py-3 font-heading font-semibold text-sm text-white transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Envoi en cours" : "Envoyer la demande"}
        </button>

        {status === "error" && (
          <p className="md:col-span-2 text-sm font-body" style={{ color: "#ef4444" }}>
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
