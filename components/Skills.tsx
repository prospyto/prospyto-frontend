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
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Compétences
      </h2>
      <p className="mt-2 text-sm text-white/50 font-body">
        Fais défiler pour voir toutes les compétences.
      </p>

      <div className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-thin">
        {ALL_SKILLS.map(({ name, Icon }) => (
          <div
            key={name}
            className="snap-start shrink-0 w-[45%] sm:w-[30%] md:w-[23%] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center border border-white/10"
            style={{ background: "#2d0a52" }}
          >
            <Icon size={28} className="text-secondary" />
            <span className="text-sm text-white/80 font-body">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
