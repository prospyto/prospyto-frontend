import {
  SiNextdotjs,
  SiReact,
  SiAngular,
  SiDjango,
  SiPython,
  SiPostgresql,
  SiTailwindcss,
  SiFigma,
} from "react-icons/si";
import { PenTool, Palette, Users, Puzzle, Compass, MessageCircle } from "lucide-react";

const TECHNICAL_SKILLS = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Angular", Icon: SiAngular },
  { name: "Django", Icon: SiDjango },
  { name: "Python", Icon: SiPython },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Figma", Icon: SiFigma },
  // Pas de logo officiel Canva ou Pixellab dans la librairie utilisée :
  // icônes génériques plutôt que des logos approximatifs.
  { name: "Canva", Icon: Palette },
  { name: "Pixellab", Icon: PenTool },
];

// Compétences non-techniques : traits de savoir-être courants et pertinents
// pour un développeur freelance, pas des certifications ou scores inventés.
const SOFT_SKILLS = [
  { name: "Esprit collaboratif", Icon: Users },
  { name: "Résolution de problèmes", Icon: Puzzle },
  { name: "Autonomie", Icon: Compass },
  { name: "Communication claire", Icon: MessageCircle },
];

const ALL_SKILLS = [...TECHNICAL_SKILLS, ...SOFT_SKILLS];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <span className="section-eyebrow">Savoir-faire</span>
      <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
        Compétences
      </h2>
      <p className="mt-2 text-sm text-white/50 font-body">
        Fais défiler pour voir toutes les compétences.
      </p>

      <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
        {ALL_SKILLS.map(({ name, Icon }) => (
          <div
            key={name}
            className="card-surface snap-start shrink-0 w-[45%] sm:w-[30%] md:w-[23%] p-6 flex flex-col items-center justify-center gap-3 text-center"
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
      </div>
    </section>
  );
}
