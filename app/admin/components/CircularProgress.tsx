export default function CircularProgress({
  percent,
  label,
}: {
  percent: number;
  label: string;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="rounded-2xl p-6 flex flex-col items-center justify-center"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--admin-border)" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="var(--admin-accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="76"
          textAnchor="middle"
          fontSize="22"
          fontWeight="600"
          fill="var(--admin-text)"
        >
          {percent}%
        </text>
      </svg>
      <p className="mt-3 text-xs text-center font-body" style={{ color: "var(--admin-text-muted)" }}>
        {label}
      </p>
    </div>
  );
}
