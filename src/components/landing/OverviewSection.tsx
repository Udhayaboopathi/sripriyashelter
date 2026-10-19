import Image from "next/image";
import { Download, Sparkles } from "lucide-react";
import type { OverviewContent } from "@/types/landing";
import { Reveal } from "@/components/ui/Reveal";
import { SplitTitle } from "@/components/ui/SplitTitle";
import { getIcon } from "@/components/ui/icons";
import { BrochureTrigger } from "@/components/layout/EnquiryProvider";

/**
 * Reference dark "Project Overview": near-black band with particle network,
 * tall image (status badge + completion card) beside a glass card holding the
 * price, description, three stat tiles and the Download Brochure CTA.
 */
export function OverviewSection({ overview, project }: { overview: OverviewContent; project?: string }) {
  return (
    <section id="overview" className="bg-network relative isolate overflow-hidden bg-navy-ink py-[70px] text-white lg:py-[120px]">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[620px] rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.16),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-[520px] rounded-full bg-[radial-gradient(circle,hsl(234_100%_45%/0.35),transparent_65%)]" />
      <div className="container-site grid items-stretch gap-10 lg:grid-cols-2 lg:gap-[30px]">
        <Reveal className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[728px]">
          <div className="group absolute inset-0 overflow-hidden rounded-[24px] border border-white/10">
            <Image src={overview.image.src} alt={overview.image.alt} fill sizes="(max-width: 1023px) 100vw, 616px" className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-transparent to-transparent" />
          </div>
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-ink/70 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-md">
            <span aria-hidden className="size-2 rounded-full bg-brand shadow-[0_0_0_4px_hsl(12_98%_53%/0.3)]" />
            {overview.badge}
          </span>
          {overview.progress ? (
            <div className="absolute bottom-5 right-5 w-[min(310px,calc(100%-40px))] rounded-[16px] bg-white p-5 text-navy shadow-2xl">
              <div className="flex items-end justify-between gap-3">
                <span className="font-heading text-[40px] font-extrabold leading-none text-brand">{overview.progress.percent}%</span>
                <span className="pb-1 text-right text-[11px] font-bold uppercase tracking-[1.5px] text-muted">{overview.progress.label}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-accent" role="progressbar" aria-valuenow={overview.progress.percent} aria-valuemin={0} aria-valuemax={100} aria-label={overview.progress.label}>
                <div className="h-full rounded-full bg-gradient-to-r from-brand to-[hsl(25_100%_60%)]" style={{ width: `${overview.progress.percent}%` }} />
              </div>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.15}>
          <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgb(0_0_0/0.35)] backdrop-blur-xl sm:p-10 lg:p-[50px]">
            <p className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[3px] text-[hsl(12_98%_65%)]">
              <Sparkles aria-hidden className="size-4" /> {overview.eyebrow}
            </p>
            <SplitTitle title={overview.title} className="mt-4 text-[clamp(1.75rem,2.2vw+1.2rem,2.8rem)] font-extrabold leading-[1.15] text-white" />
            {overview.price ? (
              <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-white/10 py-5">
                <span className="font-heading text-[34px] font-extrabold text-[#ffc94d]">{overview.price.value}</span>
                <span className="text-[14px] text-white/60">{overview.price.note}</span>
              </div>
            ) : (
              <div className="mt-7 border-t border-white/10" />
            )}
            <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-white/70">
              {overview.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-3">
              {overview.stats.map((st) => {
                const Icon = getIcon(st.icon);
                return (
                  <div key={st.label} className="rounded-[14px] border border-white/10 bg-white/[0.05] p-4 transition hover:border-brand/60 hover:bg-white/[0.08]">
                    <Icon aria-hidden className="size-6 text-brand" />
                    <dd className="mt-3 font-heading text-[22px] font-extrabold leading-tight text-white">{st.value}</dd>
                    <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-white/55">{st.label}</dt>
                  </div>
                );
              })}
            </dl>
            <BrochureTrigger project={project} className="mt-9 inline-flex h-[54px] items-center gap-3 rounded-full bg-brand px-7 text-[14px] font-semibold uppercase tracking-wide text-white shadow-[0_0_0_6px_hsl(12_98%_53%/0.2)] transition hover:bg-brand-strong hover:shadow-[0_0_0_9px_hsl(12_98%_53%/0.25)]">
              <Download aria-hidden className="size-5" /> Download Brochure
            </BrochureTrigger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
