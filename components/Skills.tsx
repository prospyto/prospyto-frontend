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
import { PenTool, Palette } from "lucide-react";

const SKILLS = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Angular", Icon: SiAngular },
  { name: "Django", Icon: SiDjango },
  { name: "Python", Icon: SiPython },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Figma", Icon: SiFigma },
  // Pas de logo officiel Canva ou Pixellab dans la librairie d'icônes utilisée :
  // icônes génériques plutôt que des logos inventés ou approximatifs.
  { name: "Canva", Icon: Palette },
  { name: "Pixellab", Icon: PenTool },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Compétences
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {SKILLS.map(({ name, Icon }) => (
          <span
            key={name}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/10 text-white/80 font-body"
            style={{ background: "#2d0a52" }}
          >
            <Icon size={16} />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
