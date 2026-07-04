import SectionHeading from "../components/SectionHeading";
import SkillConstellation from "../components/SkillConstellation";
import { SKILL_GROUPS } from "../constants/data";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:px-10 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Skills"
          title="A map, not a meter."
          description="Progress bars can't show how tools connect. This constellation can — hover any node to see it light up."
        />

        <div className="mt-16">
          <SkillConstellation />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {Object.entries(SKILL_GROUPS).map(([key, group]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-[var(--color-ink-faint)]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: group.color }}
              />
              {group.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
