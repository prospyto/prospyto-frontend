const TECHNICAL_SKILLS = [
  "Next.js",
  "React",
  "Angular",
  "Django",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "TypeScript",
  "MongoDB",
  "Git",
];

const SOFT_SKILLS = [
  "Communication",
  "Autonomie",
  "Résolution de problèmes",
  "Adaptabilité",
  "Gestion de projets",
  "Collaboration",
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Compétences
      </h2>

      {/* Compétences Techniques */}
      <div className="mt-8">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4">
          Techniques
        </h3>
        <div className="flex flex-wrap gap-3">
          {TECHNICAL_SKILLS.map((skill) => (
            <span
              key={skill}
              className="text-sm px-4 py-2 rounded-full border border-white/10 text-white/80 font-body hover:border-primary/50 transition-colors"
              style={{ background: "#2d0a52" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Compétences Non-Techniques */}
      <div className="mt-8">
        <h3 className="font-heading text-lg font-semibold text-secondary mb-4">
          Non-Techniques
        </h3>
        <div className="flex flex-wrap gap-3">
          {SOFT_SKILLS.map((skill) => (
            <span
              key={skill}
              className="text-sm px-4 py-2 rounded-full border border-white/10 text-white/80 font-body hover:border-secondary/50 transition-colors"
              style={{ background: "#1a0a2e" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
