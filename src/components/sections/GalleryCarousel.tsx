"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

interface GalleryCarouselProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: { image: ImageAsset; title?: string }[];
  tone?: "light" | "dark";
  id?: string;
}

/**
 * Reference "Project Gallery": edge-to-edge row of tall 24px-radius images that
 * peek off both sides, arrow controls and a lightbox. Implemented with native
 * scroll-snap (touch friendly, no carousel dependency).
 */
export function GalleryCarousel({ eyebrow, title, description, items, tone = "light", id }: GalleryCarouselProps) {
  const track = useRef<HTMLUListElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  const close = useCallback(() => setLightbox(null), []);

  return (
    <section id={id} className={cn("section-y relative overflow-hidden", tone === "light" ? "bg-white" : "bg-grid-dark")} aria-label={title}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 size-[520px] rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.14),transparent_65%)]" />
      <div className="container-site relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} tone={tone} />
      </div>
      <ul
        ref={track}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] sm:px-[max(16px,calc((100vw-1296px)/2))] [&::-webkit-scrollbar]:hidden"
        data-testid="gallery-track"
      >
        {items.map((item, i) => (
          <li key={`${item.image.src}-${i}`} className="w-[78vw] shrink-0 snap-center xs:w-[300px] sm:w-[360px] lg:w-[400px]">
            <button type="button" onClick={() => setLightbox(i)} className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-media)] bg-accent shadow-[0_15px_35px_rgb(0_0_0/0.1)]" aria-label={`Open image: ${item.title ?? item.image.alt}`}>
              <Image src={item.image.src} alt="" fill sizes="(max-width: 429px) 78vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-ink/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-white">
                  {item.title ?? item.image.alt}
                  <Expand aria-hidden className="size-5 shrink-0" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="container-site mt-6 flex items-center justify-center gap-3">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous images" className="grid size-12 place-items-center rounded-full bg-navy text-white shadow-sm transition hover:bg-brand">
          <ArrowLeft className="size-5" />
        </button>
        <span aria-hidden className="h-0.5 w-16 rounded bg-brand/30" />
        <button type="button" onClick={() => scroll(1)} aria-label="Next images" className="grid size-12 place-items-center rounded-full bg-navy text-white shadow-sm transition hover:bg-brand">
          <ArrowRight className="size-5" />
        </button>
      </div>
      <Lightbox images={items} index={lightbox} onClose={close} onIndexChange={setLightbox} />
    </section>
  );
}
