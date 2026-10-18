import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Eye, MapPin } from "lucide-react";
import type { Project } from "@/types/content";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";

/** Project banner: full-bleed render, navy overlay, back link, title, location, status and brochure actions. */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative isolate mt-[var(--header-height)] overflow-hidden bg-navy-deep" data-testid="project-hero">
      <Image src={project.heroImage.src} alt={project.heroImage.alt} fill priority sizes="100vw" className="-z-10 object-cover object-[50%_35%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,hsl(234_100%_11%/0.95),hsl(234_100%_15%/0.55)_55%,hsl(234_100%_21%/0.25))]" />
      <div className="container-site flex min-h-[480px] flex-col justify-end py-14 sm:min-h-[600px] lg:min-h-[680px]">
        <Link href="/projects" className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white">
          <ArrowLeft aria-hidden className="size-4" /> Back to Projects
        </Link>
        <div className="motion-safe:animate-[fadeUp_0.8s_var(--ease-standard)_both]">
          <StatusBadge status={project.status} />
          <h1 className="mt-5 font-heading text-[46px] font-bold leading-[1.05] text-white sm:text-[72px]">{project.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-[17px] text-white/85">
            <MapPin aria-hidden className="size-5 text-brand" /> {project.location}
          </p>
          {project.brochure ? (
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={project.brochure.viewUrl} variant="outline-light" icon={<Eye className="size-4" />}>View Brochure</ButtonLink>
              <ButtonLink href={project.brochure.downloadUrl} icon={<Download className="size-4" />}>Download Brochure</ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
