import {
  SiNextdotjs,
  SiReact,
  SiAngular,
  SiDjango,
  SiPython,
  SiPostgresql,
  SiTailwindcss,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiGit,
} from "react-icons/si";
import { Palette, Users, Puzzle, Compass, MessageCircle } from "lucide-react";
import StaggerGroup from "./StaggerGroup";

const TECHNICAL_SKILLS = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Angular", Icon: SiAngular },
  { name: "Django", Icon: SiDjango },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Python", Icon: SiPython },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Git", Icon: SiGit },
  { name: "Figma", Icon: SiFigma },
  // Pas de logo officiel Canva dans la librairie utilisée :
  // icône générique plutôt qu'un logo approximatif.
  { name: "Canva", Icon: Palette },
];

// Compétences non-techniques : traits de savoir-être courants et pertinents
// pour un développeur freelance, pas des certifications ou scores inventés.
const SOFT_SKILLS = [
  { name: "Esprit collaboratif", Icon: Users },
  { name: "Résolution de problèmes", Icon: Puzzle },
  { name: "Autonomie", Icon: Compass },
  { name: "Communication claire", Icon: MessageCircle },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <span className="section-eyebrow">Savoir-faire</span>
      <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
        Compétences
      </h2>

      {/* Compétences techniques */}
      <p className="mt-10 font-heading font-semibold text-sm uppercase tracking-wide text-secondary">
        Techniques
      </p>
      <StaggerGroup staggerMs={40} className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {TECHNICAL_SKILLS.map(({ name, Icon }) => (
          <div
            key={name}
            className="card-surface p-6 flex flex-col items-center justify-center gap-3 text-center h-full"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(224, 170, 255, 0.12)" }}
            >
              <Icon size={22} className="text-secondary" />
            </div>
            <span className="text-sm text-white/85 font-body font-medium">{name}</span>
          </div>
        ))}
      </StaggerGroup>

      {/* Compétences non-techniques */}
      <p className="mt-10 font-heading font-semibold text-sm uppercase tracking-wide text-secondary">
        Non-techniques
      </p>
      <StaggerGroup staggerMs={60} className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SOFT_SKILLS.map(({ name, Icon }) => (
          <div
            key={name}
            className="card-surface p-6 flex flex-col items-center justify-center gap-3 text-center h-full"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(224, 170, 255, 0.12)" }}
            >
              <Icon size={22} className="text-secondary" />
            </div>
            <span className="text-sm text-white/85 font-body font-medium">{name}</span>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
