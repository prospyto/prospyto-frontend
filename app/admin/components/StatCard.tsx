export default function StatCard({
  label,
  value,
  trend,
  trendUp = true,
}: {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex-1 min-w-[180px]"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
        {label}
      </p>
      <p className="mt-2 font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
        {value}
      </p>
      {trend && (
        <p
          className="mt-1 text-xs font-body"
          style={{ color: trendUp ? "#10b981" : "#ef4444" }}
        >
          {trendUp ? "↗" : "↘"} {trend}
        </p>
      )}
    </div>
  );
}
