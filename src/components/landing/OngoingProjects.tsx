import type { Project } from "@/types/content";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

/** Reference "Ongoing Projects": light grid band, two tall cards with overlapping info panels. */
export function OngoingProjects({ heading, projects }: { heading: LandingContent["projects"]; projects: Project[] }) {
  return (
    <section id="projects" className="bg-grid-light bg-[#f9f9f9] py-[70px] lg:pb-[160px] lg:pt-[60px]">
      <div className="container-site">
        <LandingHeading eyebrow={heading.eyebrow} title={heading.title} />
        <div className="mt-[50px] grid gap-8 md:grid-cols-2 lg:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={0.1 * (i + 1)}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
