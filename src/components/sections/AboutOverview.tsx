import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface AboutOverviewProps {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  services: string[];
  badge: { value: string; label: string };
  image: ImageAsset;
}

/**
 * Reference "Project Overview" block: dark section with a framed image on the
 * left (floating pill + figure card) and a translucent glass card on the right.
 */
export function AboutOverview({ eyebrow, title, paragraphs, services, badge, image }: AboutOverviewProps) {
  const [first, ...rest] = title.split(" That ");
  return (
    <section className="bg-dark-glow relative overflow-hidden py-24 lg:py-[120px]" aria-labelledby="about-overview-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <Reveal className="relative">
          <div className="relative aspect-[4/4.2] overflow-hidden rounded-[24px] shadow-[0_30px_60px_rgb(0_0_0/0.45)] sm:aspect-[5/4.4]">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 620px" className="object-cover" />
          </div>
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-navy-ink/80 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur">
            <span aria-hidden className="size-2 rounded-full bg-brand" /> Since 2008 · Chennai
          </span>
          <div className="absolute -bottom-6 right-5 flex items-center gap-3 rounded-[14px] bg-white px-5 py-4 shadow-xl sm:right-8">
            <span className="font-heading text-[44px] font-bold leading-none text-brand">{badge.value}</span>
            <span className="text-[13px] font-semibold uppercase tracking-[1.5px] text-navy">{badge.label}</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_50px_rgb(0_0_0/0.3)] backdrop-blur sm:p-11">
            <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[3px] text-brand">
              <span aria-hidden className="h-3 w-3 rounded-sm bg-brand" /> {eyebrow}
            </p>
            <h2 id="about-overview-title" className="mt-4 font-heading text-[34px] font-bold leading-[1.12] text-white sm:text-[46px]">
              {first}
              {rest.length ? <> That <span className="italic text-brand">{rest.join(" That ")}</span></> : null}
            </h2>
            <div className="my-7 h-px bg-white/10" />
            <div className="space-y-4 text-[16px] leading-[1.8] text-white/75">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] p-4 text-[14px] leading-snug text-white/90">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" /> {s}
                </li>
              ))}
            </ul>
            <ButtonLink href="/about" size="lg" className="mt-9">Learn More About Us</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
