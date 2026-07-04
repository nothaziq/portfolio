import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { PROJECTS } from "../constants/data";

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="relative px-6 py-28 sm:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="A few things I've built end to end."
            description="From trained models to shipped interfaces — each project below is a full loop, not just a demo."
          />
          <span className="font-mono text-xs text-[var(--color-ink-faint)] shrink-0">
            {String(PROJECTS.length).padStart(2, "0")} projects, more on GitHub
          </span>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
