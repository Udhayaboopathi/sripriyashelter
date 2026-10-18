"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import type { Project, ProjectStatus } from "@/types/content";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";

type Filter = "All" | "Ongoing" | "Completed" | "Upcoming";

/** Filterable project grid (filters match the original Projects page). */
export function ProjectsExplorer({ projects, filters }: { projects: Project[]; filters: readonly Filter[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.status === (filter.toLowerCase() as ProjectStatus));

  return (
    <section className="bg-grid-light section-y" aria-label="Projects">
      <div className="container-site">
        <div role="group" aria-label="Filter projects by status" className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-full bg-white p-2 shadow-[var(--shadow-card)]">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn("rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300", filter === f ? "bg-brand text-white shadow-[0_8px_18px_hsl(12_98%_53%/0.3)]" : "text-navy hover:bg-accent")}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} project{visible.length === 1 ? "" : "s"} shown</p>
        {visible.length ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2" data-testid="project-grid">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} priority={i < 2} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 flex max-w-lg flex-col items-center gap-3 rounded-[20px] border border-dashed border-navy/20 bg-white p-12 text-center" data-testid="projects-empty">
            <Building2 aria-hidden className="size-10 text-brand" />
            <p className="font-heading text-2xl font-semibold text-navy">No {filter.toLowerCase()} projects listed yet</p>
            <p className="text-muted">Please check back soon or contact us for upcoming launches.</p>
          </div>
        )}
      </div>
    </section>
  );
}
