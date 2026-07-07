export default function DashboardPreview() {
  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0" aria-hidden>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #2d0a52 0%, #1c0538 100%)",
          border: "1px solid rgba(224, 170, 255, 0.16)",
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
          transform: "rotate(-2deg)",
        }}
      >
        {/* Barre de titre façon fenêtre */}
        <div
          className="flex items-center gap-1.5 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10b981" }} />
          <span className="ml-3 text-[10px] font-body text-white/40">
            prospyto.dev/track/abc123xyz
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-body uppercase tracking-wider text-white/40">
                Suivi de projet
              </p>
              <p className="mt-1 font-heading font-semibold text-white text-sm">
                Site vitrine — Ferme Agro-Espoir
              </p>
            </div>
            <span
              className="text-[10px] font-body font-medium px-2 py-1 rounded-full flex-shrink-0"
              style={{ background: "#5a189a33", color: "#e0aaff", border: "1px solid #5a189a55" }}
            >
              En cours
            </span>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-body text-white/40 uppercase tracking-wider">
                Progression
              </span>
              <span className="text-xs font-heading font-semibold text-secondary">68%</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: "68%", background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))" }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              className="rounded-lg py-2 text-[11px] font-body font-medium"
              style={{ background: "#10b981", color: "#fff" }}
              disabled
            >
              Discuter WhatsApp
            </button>
            <button
              className="rounded-lg py-2 text-[11px] font-body font-medium"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
              disabled
            >
              Voir le portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Petite carte flottante en arrière-plan pour l'effet de profondeur */}
      <div
        className="absolute -bottom-6 -left-6 w-32 rounded-xl p-3 hidden sm:block"
        style={{
          background: "linear-gradient(155deg, #33095e 0%, #1c0538 100%)",
          border: "1px solid rgba(224, 170, 255, 0.14)",
          boxShadow: "0 18px 40px -10px rgba(90, 24, 154, 0.55)",
          transform: "rotate(4deg)",
        }}
      >
        <p className="text-[9px] font-body text-white/40 uppercase tracking-wider">Notification</p>
        <p className="mt-1 text-[11px] font-body text-white">Progression 68% ✓</p>
      </div>
    </div>
  );
}
