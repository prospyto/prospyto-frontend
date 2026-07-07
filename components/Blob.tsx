export default function Blob({
  color = "var(--primary-color)",
  className = "",
  size = 420,
}: {
  color?: string;
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`blob-shape ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
    />
  );
}
