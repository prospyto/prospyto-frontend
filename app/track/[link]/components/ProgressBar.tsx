export default function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-body uppercase tracking-wider text-white/50">
          Progression
        </span>
        <span className="text-sm font-heading font-semibold text-secondary">
          {clamped}%
        </span>
      </div>
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${clamped}%`,
            background:
              "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
          }}
        />
      </div>
    </div>
  );
}
