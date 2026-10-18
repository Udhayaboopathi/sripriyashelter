import type { Project } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Reference "Ongoing Projects": grid-pattern background, centred pill heading, two large cards. */
export function ProjectsShowcase({ eyebrow, title, description, projects }: { eyebrow: string; title: string; description: string; projects: Project[] }) {
  return (
    <section className="bg-grid-light section-y" aria-label={title}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={0.1 * (i + 1)}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/projects" variant="outline" size="lg">View All Projects</ButtonLink>
        </div>
      </div>
    </section>
  );
}
