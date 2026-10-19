import Image from "next/image";
import { MapPin } from "lucide-react";
import type { HeroContent } from "@/types/landing";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { EnquiryTrigger } from "@/components/layout/EnquiryProvider";
import { cn } from "@/lib/cn";

/**
 * Reference hero banner: full-bleed promotional banner directly under the fixed
 * header (≈750px visible at 1440), price badge + location tag over the artwork,
 * and a solid colour strip of key figures with vertical dividers at the base.
 */
export function LandingHero({ hero, project, exploreHref = "#overview" }: { hero: HeroContent; project?: string; exploreHref?: string }) {
  return (
    <section id="home" aria-label="Introduction" className="relative isolate mt-[var(--header-height)] overflow-hidden bg-navy-deep" data-testid="hero">
      <div className="relative h-[620px] w-full sm:h-[680px] lg:h-[750px]">
        <Image src={hero.image.src} alt={hero.image.alt} fill priority fetchPriority="high" sizes="100vw" className="object-cover object-[70%_center] motion-safe:animate-[hero-zoom_7s_ease-out_forwards]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,hsl(234_100%_9%/0.92)_0%,hsl(234_100%_14%/0.72)_42%,hsl(234_100%_21%/0.1)_75%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_20%,hsl(12_98%_53%/0.28),transparent_70%)]" />

        <div className="container-site relative flex h-full flex-col justify-center pb-[120px] pt-8 lg:pb-[110px]">
          <div className={cn("max-w-[640px] pr-8 motion-safe:animate-[fadeUp_0.9s_var(--ease-standard)_both] lg:pr-0", hero.priceTag && "md:max-w-[calc(100%-250px)] lg:max-w-[640px]")} data-testid="hero-copy">
            <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-heading text-[clamp(2.125rem,5.4vw+1rem,4.5rem)] font-extrabold leading-[1.08] text-white">
              {hero.title.lead} <span className="text-brand">{hero.title.accent}</span>
            </h1>
            <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/85 sm:text-[18px]">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EnquiryTrigger project={project} className="group/btn relative isolate inline-flex h-[54px] items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-7 text-[14px] font-semibold uppercase tracking-wide text-white shadow-[0_0_0_6px_hsl(12_98%_53%/0.2)] transition hover:shadow-[0_0_0_9px_hsl(12_98%_53%/0.25)] before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:size-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-navy before:transition-all before:duration-500 hover:before:size-[420px]">
                Schedule a Visit
              </EnquiryTrigger>
              <ButtonLink href={exploreHref} variant="outline-light" className="h-[54px]">Explore Project</ButtonLink>
            </div>
          </div>
        </div>

        {hero.priceTag ? (
          <div data-testid="hero-price" className="absolute right-[6%] top-[9%] hidden motion-safe:animate-[fadeUp_1.1s_var(--ease-standard)_0.2s_both] md:block lg:right-[9%]">
            <div className="relative grid size-[210px] place-items-center rounded-full bg-brand text-center text-white shadow-[0_20px_50px_hsl(12_98%_40%/0.45)] ring-[10px] ring-white/15 lg:size-[240px]">
              <div className="px-6">
                <p className="text-[12px] font-bold uppercase tracking-[2px] text-white/90">{hero.priceTag.kicker}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[3px] text-white/75">Starts from</p>
                <p className="font-heading text-[56px] font-extrabold leading-none lg:text-[64px]">{hero.priceTag.value}</p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[2px] text-white/85">{hero.priceTag.note}</p>
              </div>
            </div>
          </div>
        ) : null}

        {hero.locationTag ? (
          <div className="absolute bottom-[132px] right-[6%] hidden items-center gap-3 rounded-md bg-white px-5 py-3 shadow-xl md:flex lg:bottom-[150px] lg:right-[24%]">
            <MapPin aria-hidden className="size-7 text-brand" />
            <div>
              <p className="font-heading text-[26px] font-extrabold uppercase leading-none text-navy">{hero.locationTag.title}</p>
              <p className="mt-1 text-[13px] font-semibold text-brand">{hero.locationTag.detail}</p>
            </div>
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-brand">
          <dl className="container-site grid grid-cols-2 gap-y-3 py-4 sm:grid-cols-4 sm:divide-x sm:divide-white/50 sm:py-6">
            {hero.stats.map((st) => (
              <div key={st.label} className="flex items-center justify-center gap-2 px-2 text-center sm:gap-3">
                <dd className="font-heading text-[clamp(1.5rem,2.6vw+0.9rem,2.75rem)] font-extrabold leading-none text-white">{st.value}</dd>
                <dt className="max-w-[90px] text-left text-[11px] font-bold uppercase leading-tight tracking-[1.5px] text-white sm:text-[12px]">{st.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
