"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageAsset } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

interface HeroProps {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  slides: readonly ImageAsset[];
  stats: readonly { value: string; label: string }[];
}

/**
 * Reference hero: full-bleed image banner (≈830px at 1440 / ≈500px mobile)
 * directly under the fixed header, with a solid colour strip of key figures
 * separated by vertical dividers at its base. Sripriya's three published hero
 * photos cross-fade (6s) behind the original headline copy.
 */
export function Hero({ eyebrow, titleLead, titleAccent, subtitle, slides, stats }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(t);
  }, [slides.length]);

  return (
    <section aria-label="Introduction" className="relative isolate mt-[var(--header-height)] overflow-hidden bg-navy-deep" data-testid="hero">
      <div className="relative h-[calc(100svh-var(--header-height))] max-h-[830px] min-h-[560px] w-full">
        {slides.map((slide, i) => (
          <div key={slide.src} aria-hidden={i !== active} className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-in-out", i === active ? "opacity-100" : "opacity-0")}>
            <Image
              src={slide.src}
              alt={i === 0 ? slide.alt : ""}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
              sizes="100vw"
              className={cn("object-cover", i === active && "motion-safe:animate-[hero-zoom_7s_ease-out_forwards]")}
            />
          </div>
        ))}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,hsl(234_100%_11%/0.88)_0%,hsl(234_100%_15%/0.6)_45%,hsl(234_100%_21%/0.15)_100%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/80 to-transparent" />

        <div className="container-site relative flex h-full flex-col justify-center pb-32 pt-10 sm:pb-36">
          <div className="max-w-[720px] motion-safe:animate-[fadeUp_0.9s_var(--ease-standard)_both]">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-heading text-[40px] font-bold leading-[1.08] text-white xs:text-[44px] sm:text-[60px] lg:text-[76px]">
              {titleLead} <span className="text-brand">{titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/85 sm:text-[19px]">{subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/projects" size="lg">Explore Projects</ButtonLink>
              <ButtonLink href="/contact" variant="outline-light" size="lg" icon={false}>Contact Us</ButtonLink>
            </div>
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="absolute bottom-[132px] right-6 z-10 hidden gap-2 sm:flex lg:right-[max(24px,calc((100vw-1320px)/2+12px))]">
            {slides.map((s, i) => (
              <button key={s.src} type="button" onClick={() => setActive(i)} aria-label={`Show slide ${i + 1}`} aria-pressed={i === active} className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-10 bg-brand" : "w-4 bg-white/50 hover:bg-white")} />
            ))}
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-brand">
          <dl className="container-site grid grid-cols-3 divide-x divide-white/40 py-5 sm:py-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center gap-1 px-2 text-center sm:flex-row sm:gap-4">
                <dt className="order-2 text-[11px] font-semibold uppercase leading-tight tracking-[1.5px] text-white sm:text-[13px]">{s.label}</dt>
                <dd className="order-1 font-heading text-[30px] font-bold leading-none text-white sm:text-[46px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
