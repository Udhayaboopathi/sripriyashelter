"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Expand } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/types/content";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

/** Category-filtered masonry gallery with lightbox (reference gallery hover: zoom + overlay). */
export function GalleryGrid({ items, categories }: { items: GalleryItem[]; categories: ("All" | GalleryCategory)[] }) {
  const [category, setCategory] = useState<"All" | GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = category === "All" ? items : items.filter((i) => i.category === category);
  const close = useCallback(() => setLightbox(null), []);

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-full bg-white p-2 shadow-[var(--shadow-card)]">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={cn("rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300", category === c ? "bg-brand text-white shadow-[0_8px_18px_hsl(12_98%_53%/0.3)]" : "text-navy hover:bg-accent")}>
            {c}
          </button>
        ))}
      </div>
      <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6" data-testid="gallery-grid">
        {visible.map((item, i) => (
          <li key={`${item.title}-${i}`} className="break-inside-avoid">
            <button type="button" onClick={() => setLightbox(i)} className="group relative block w-full overflow-hidden rounded-[20px] bg-accent shadow-[0_15px_35px_rgb(0_0_0/0.08)]" aria-label={`Open image: ${item.title}`}>
              <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 420px" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-ink/85 via-navy-ink/10 to-transparent p-5 text-left opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-[11px] font-extrabold uppercase tracking-[2px] text-brand">{item.category}</span>
                <span className="mt-1 flex items-center justify-between gap-3 font-heading text-lg font-semibold text-white">
                  {item.title}
                  <Expand aria-hidden className="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={visible} index={lightbox} onClose={close} onIndexChange={setLightbox} />
    </div>
  );
}
