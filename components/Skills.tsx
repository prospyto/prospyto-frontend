const SKILLS = [
  "Next.js",
  "React",
  "Angular",
  "Django",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Figma",
  "Canva",
  "Pixellab",
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Compétences
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="text-sm px-4 py-2 rounded-full border border-white/10 text-white/80 font-body"
            style={{ background: "#2d0a52" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
