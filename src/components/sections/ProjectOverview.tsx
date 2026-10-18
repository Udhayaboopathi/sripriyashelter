import Image from "next/image";
import { Building2, Download, Home, MapPin, Ruler, Tag } from "lucide-react";
import type { Project } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryTrigger } from "@/components/layout/EnquiryProvider";

const factIcons = { Units: Building2, Size: Ruler, Configuration: Home, Location: MapPin, Status: Tag } as const;

/**
 * Reference "Project Overview": dark glow section, framed render left with a
 * status pill, glass card right with eyebrow, two-tone serif title, highlighted
 * price, body copy, three-up icon fact tiles and the brochure CTA.
 */
export function ProjectOverview({ project }: { project: Project }) {
  const [titleFirst, ...titleRest] = project.title.split(" ");
  return (
    <section id="overview" className="bg-dark-glow relative overflow-hidden py-24 lg:py-[120px]" aria-labelledby="overview-title">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal className="relative lg:sticky lg:top-28">
          <div className="relative aspect-square overflow-hidden rounded-[20px] shadow-[0_30px_60px_rgb(0_0_0/0.45)]">
            <Image src={project.heroImage.src} alt={project.heroImage.alt} fill sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" />
          </div>
          <StatusBadge status={project.status} className="absolute left-5 top-5" />
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-11">
            <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[3px] text-brand">
              <Building2 aria-hidden className="size-4" /> Project Overview
            </p>
            <h2 id="overview-title" className="mt-4 font-heading text-[38px] font-bold leading-[1.1] text-white sm:text-[52px]">
              {titleFirst} {titleRest.length ? <span className="italic text-brand">{titleRest.join(" ")}</span> : null}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-white/70"><MapPin aria-hidden className="size-4 text-brand" />{project.location}</p>
            <div className="my-7 h-px bg-white/10" />
            {project.price ? (
              <p className="flex flex-wrap items-baseline gap-3">
                <span className="font-body text-[36px] font-extrabold leading-none text-brand sm:text-[40px]">{project.price}</span>
                <span className="font-heading text-sm italic text-white/60">Price</span>
              </p>
            ) : null}
            <div className="my-7 h-px bg-white/10" />
            <div className="space-y-4 text-[16px] leading-[1.8] text-white/75">
              {project.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.facts.map((f) => {
                const Icon = factIcons[f.label as keyof typeof factIcons] ?? Tag;
                return (
                  <div key={f.label} className="flex flex-col items-center gap-2 rounded-[14px] border border-white/10 bg-white/[0.04] px-3 py-5 text-center">
                    <Icon aria-hidden className="size-5 text-brand" />
                    <dd className="text-[15px] font-bold text-white">{f.value ?? "To be confirmed"}</dd>
                    <dt className="order-last text-[11px] font-semibold uppercase tracking-[1.5px] text-white/55">{f.label}</dt>
                  </div>
                );
              })}
            </dl>
            <div className="mt-9 flex flex-wrap gap-4">
              {project.brochure ? (
                <ButtonLink href={project.brochure.downloadUrl} size="lg" icon={<Download className="size-4" />}>Download Brochure</ButtonLink>
              ) : null}
              <EnquiryTrigger project={project.title} className="inline-flex h-[60px] items-center rounded-full border border-white/40 px-8 text-[15px] font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white hover:text-navy">
                Enquire Now
              </EnquiryTrigger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
