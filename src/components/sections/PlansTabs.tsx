"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronRight, Expand, FileImage, LayoutGrid, MapPinned, ParkingSquare, Building } from "lucide-react";
import type { PlanTab } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

const tabIcons: Record<string, typeof LayoutGrid> = { "floor-plans": LayoutGrid, parking: ParkingSquare, "location-map": MapPinned, elevation: Building };

/**
 * Reference "Specifications" interaction: vertical tab list on the left (active
 * tab = orange gradient pill with chevron), content card on the right. Used
 * for the plans & drawings Sripriya actually publishes. Full WAI-ARIA tabs
 * keyboard support (arrows / Home / End).
 */
export function PlansTabs({ tabs, projectTitle }: { tabs: PlanTab[]; projectTitle: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const close = useCallback(() => setLightbox(null), []);
  const current = tabs[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section id="plans" className="section-y relative overflow-hidden bg-[#f4f7f9]" aria-label="Plans and drawings">
      <div className="container-site">
        <SectionHeading eyebrow="Plans & Drawings" title={`Explore ${projectTitle} Layouts`} description="Floor plans, parking layout and location map as published for this project." />
        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr]">
          <div role="tablist" aria-orientation="vertical" aria-label="Plan categories" className="flex gap-2 overflow-x-auto rounded-[18px] bg-white p-3 shadow-[var(--shadow-card)] lg:flex-col lg:self-start lg:overflow-visible">
            {tabs.map((t, i) => {
              const Icon = tabIcons[t.id] ?? FileImage;
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => { refs.current[i] = el; }}
                  role="tab"
                  type="button"
                  id={`${base}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${base}-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-[12px] px-4 py-3.5 text-left text-[15px] font-semibold transition-all duration-300",
                    selected ? "bg-gradient-to-r from-brand to-[hsl(20_98%_56%)] text-white shadow-[0_10px_20px_hsl(12_98%_53%/0.3)]" : "text-navy hover:bg-accent",
                  )}
                >
                  <Icon aria-hidden className="size-[18px]" />
                  <span className="flex-1 whitespace-nowrap">{t.label}</span>
                  <ChevronRight aria-hidden className={cn("hidden size-4 lg:block", selected ? "opacity-100" : "opacity-0")} />
                </button>
              );
            })}
          </div>
          <div role="tabpanel" id={`${base}-panel-${current.id}`} aria-labelledby={`${base}-tab-${current.id}`} tabIndex={0} className="rounded-[24px] bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
            <h3 className="font-heading text-[28px] font-bold text-navy sm:text-[34px]">{current.label}</h3>
            <ul className={cn("mt-7 grid gap-5", current.images.length > 1 ? "sm:grid-cols-2 xl:grid-cols-3" : "")}>
              {current.images.map((img, i) => (
                <li key={img.src}>
                  <button type="button" onClick={() => setLightbox(i)} className="group relative block w-full overflow-hidden rounded-[14px] border border-line bg-surface-alt" aria-label={`Enlarge ${img.alt}`}>
                    <div className={cn("relative w-full", current.images.length > 1 ? "aspect-square" : "aspect-[4/3]")}>
                      <Image src={img.src} alt={img.alt} fill sizes={current.images.length > 1 ? "(max-width: 639px) 100vw, 300px" : "(max-width: 1023px) 100vw, 900px"} className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-navy shadow opacity-0 transition group-hover:opacity-100"><Expand aria-hidden className="size-4" /></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Lightbox images={current.images.map((image) => ({ image }))} index={lightbox} onClose={close} onIndexChange={setLightbox} />
    </section>
  );
}
