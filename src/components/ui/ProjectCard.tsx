import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/types/content";
import { StatusBadge } from "@/components/ui/StatusBadge";

/**
 * Reference "Ongoing Projects" card: tall rounded image with a white info
 * panel overlapping its bottom edge (location eyebrow, serif title, arrow).
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block pb-10 focus-visible:outline-offset-8"
      aria-label={`${project.title}, ${project.location} – view details`}
    >
      <div className="relative aspect-[4/3.6] overflow-hidden rounded-[20px] bg-accent shadow-[0_15px_35px_rgb(0_0_0/0.08)]">
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 640px"
          className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-standard)] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />
        <StatusBadge status={project.status} className="absolute left-5 top-5" />
      </div>
      <div className="absolute inset-x-4 bottom-0 rounded-[16px] bg-white p-5 shadow-[0_15px_35px_rgb(0_11_107/0.1)] transition-transform duration-500 group-hover:-translate-y-1 sm:inset-x-6 sm:p-6">
        <p className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[2px] text-brand">
          <MapPin aria-hidden className="size-3.5" />
          {project.location}
        </p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <h3 className="font-heading text-[22px] font-bold text-navy sm:text-[26px]">{project.title}</h3>
          <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-navy transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            <ArrowRight className="size-5" />
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
