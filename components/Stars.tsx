const STAR_POSITIONS = [
  { top: "8%", left: "12%", size: 3, delay: "0s" },
  { top: "15%", left: "80%", size: 2, delay: "0.6s" },
  { top: "22%", left: "45%", size: 2, delay: "1.2s" },
  { top: "30%", left: "68%", size: 3, delay: "0.3s" },
  { top: "12%", left: "30%", size: 2, delay: "1.8s" },
  { top: "40%", left: "8%", size: 2, delay: "0.9s" },
  { top: "48%", left: "88%", size: 3, delay: "1.5s" },
  { top: "5%", left: "58%", size: 2, delay: "2.1s" },
  { top: "35%", left: "20%", size: 2, delay: "0.2s" },
  { top: "18%", left: "92%", size: 2, delay: "1.1s" },
  { top: "44%", left: "38%", size: 3, delay: "1.7s" },
  { top: "25%", left: "5%", size: 2, delay: "0.5s" },
  { top: "10%", left: "70%", size: 2, delay: "2.4s" },
  { top: "50%", left: "55%", size: 2, delay: "0.8s" },
  { top: "38%", left: "78%", size: 3, delay: "1.4s" },
];

// Étoiles qui scintillent en fond du Hero. Positions fixes (pas de Math.random
// côté rendu) pour éviter tout écart d'hydratation entre serveur et client.
export default function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {STAR_POSITIONS.map((star, i) => (
        <span
          key={i}
          className="twinkle-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
