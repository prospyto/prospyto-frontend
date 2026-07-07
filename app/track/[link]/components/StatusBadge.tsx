export type TrackStatus = "discussion" | "en_cours" | "complete";

const STATUS_LABEL: Record<TrackStatus, string> = {
  discussion: "Discussion",
  en_cours: "En cours",
  complete: "Complété",
};

const STATUS_COLOR: Record<TrackStatus, string> = {
  discussion: "#f59e0b",
  en_cours: "#5a189a",
  complete: "#10b981",
};

export default function StatusBadge({ status }: { status: TrackStatus }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-medium"
      style={{
        background: `${STATUS_COLOR[status]}22`,
        color: STATUS_COLOR[status],
        border: `1px solid ${STATUS_COLOR[status]}55`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: STATUS_COLOR[status] }}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
