import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import { ACHIEVEMENTS } from "../constants/data";

const MARQUEE_ITEMS = [
  "Python", "C++", "React", "Scikit-Learn", "SFML", "Tailwind",
  "Pandas", "Figma", "Jira", "MySQL", "Node.js", "Git",
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Numbers that back up the work."
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ACHIEVEMENTS.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden py-6">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: "linear-gradient(90deg, var(--color-void), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: "linear-gradient(270deg, var(--color-void), transparent)" }}
        />
        <div className="flex w-max animate-marquee gap-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-2xl sm:text-3xl text-[var(--color-ink-faint)] whitespace-nowrap"
            >
              {item} <span className="text-[var(--color-line)]">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
