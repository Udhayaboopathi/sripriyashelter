"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

function Carousel({ images, label, slideClass, onOpen, autoplay = true, testId }: { images: ImageAsset[]; label: string; slideClass: string; onOpen: (i: number) => void; autoplay?: boolean; testId: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const w = first ? first.offsetWidth + 30 : el.clientWidth * 0.8;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!autoplay || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => step(1), 3500);
    return () => window.clearInterval(t);
  }, [autoplay, paused, step]);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} aria-roledescription="carousel" aria-label={label}>
      <ul ref={track} data-testid={testId} className="flex gap-[30px] overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-[max(16px,calc((100vw-1296px)/2))] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`} className={cn("relative shrink-0 overflow-hidden rounded-[16px] bg-accent", slideClass)}>
            <button type="button" onClick={() => onOpen(i)} className="group block size-full" aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}>
              <Image src={img.src} alt="" fill sizes="(max-width: 640px) 80vw, 420px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <span aria-hidden className="absolute inset-0 grid place-items-center bg-navy-ink/0 transition group-hover:bg-navy-ink/40">
                <Expand className="size-8 scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="container-site mt-8 flex justify-center gap-4">
        <button type="button" onClick={() => step(-1)} aria-label={`Previous – ${label}`} className="grid size-[50px] place-items-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:border-brand hover:bg-brand hover:text-white">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label={`Next – ${label}`} className="grid size-[50px] place-items-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:border-brand hover:bg-brand hover:text-white">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

/** Reference gallery: auto-advancing portrait carousel + "Updates – Current Status" carousel, both opening a lightbox. */
export function GallerySection({ gallery }: { gallery: LandingContent["gallery"] }) {
  const [box, setBox] = useState<{ set: "gallery" | "updates"; index: number } | null>(null);
  const set = box?.set === "updates" ? gallery.updates.items : gallery.items;
  return (
    <section id="gallery" className="relative overflow-hidden bg-white py-[70px] lg:py-[100px]">
      <div aria-hidden className="pointer-events-none absolute -right-60 top-20 size-[700px] rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.08),transparent_65%)]" />
      <div className="container-site">
        <LandingHeading eyebrow={gallery.eyebrow} title={gallery.title} description={gallery.description} />
      </div>
      <div className="mt-10 lg:mt-[50px]">
        <Carousel images={gallery.items} label="Project gallery" testId="gallery-track" slideClass="h-[380px] w-[78vw] max-w-[300px] sm:h-[500px] sm:w-[400px] sm:max-w-none" onOpen={(i) => setBox({ set: "gallery", index: i })} />
      </div>

      <div className="container-site mt-[70px] text-center lg:mt-[90px]">
        <p className="text-[13px] font-bold uppercase tracking-[3px] text-brand">{gallery.updates.eyebrow}</p>
        <h3 className="mt-3 font-heading text-[clamp(1.5rem,1.4vw+1.1rem,2rem)] font-extrabold leading-tight text-navy">
          {gallery.updates.title} <span className="text-brand">({gallery.updates.date})</span>
        </h3>
        <p className="mx-auto mt-4 max-w-[690px] text-[15px] leading-[1.6] text-muted">{gallery.updates.description}</p>
      </div>
      <div className="mt-9">
        <Carousel images={gallery.updates.items} label="Site updates" testId="updates-track" autoplay={false} slideClass="h-[240px] w-[82vw] max-w-[340px] sm:h-[360px] sm:w-[540px] sm:max-w-none" onOpen={(i) => setBox({ set: "updates", index: i })} />
      </div>

      <Lightbox images={set.map((image) => ({ image, title: image.alt }))} index={box?.index ?? null} onClose={() => setBox(null)} onIndexChange={(index) => setBox((b) => (b ? { ...b, index } : b))} />
    </section>
  );
}
