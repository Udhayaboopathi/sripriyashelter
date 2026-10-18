"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { LandingContent, SpecCategory } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { getIcon, NamedIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

function Items({ cat }: { cat: SpecCategory }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {cat.items.map((it) => (
        <div key={it.label} className="rounded-[12px] border border-line bg-surface-alt/60 p-5 transition hover:border-brand/40 hover:bg-white hover:shadow-[0_10px_25px_rgb(0_0_0/0.05)]">
          <dt className="text-[11px] font-bold uppercase tracking-[2px] text-brand">{it.label}</dt>
          <dd className="mt-2 text-[15px] font-semibold leading-[1.55] text-navy">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Reference specifications: vertical tab list (412px) + detail panel on desktop;
 * collapses to an accordion below 768px exactly like the reference.
 */
export function SpecsTabs({ specs }: { specs: LandingContent["specs"] }) {
  const id = useId();
  const cats = specs.categories;
  const [active, setActive] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in map) next = (i + map[e.key] + cats.length) % cats.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = cats.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const cur = cats[active];

  return (
    <section id="specifications" className="bg-network-soft relative bg-[#f4f7f9] py-[70px] lg:py-[120px]">
      <div className="container-site">
        <LandingHeading eyebrow={specs.eyebrow} title={specs.title} description={specs.description} />

        {/* Desktop / tablet: tabs */}
        <div className="mt-[50px] hidden gap-[30px] md:grid md:grid-cols-[260px_1fr] lg:mt-[60px] lg:grid-cols-[412px_1fr]" data-testid="specs-tabs">
          <div role="tablist" aria-orientation="vertical" aria-label="Specification categories" className="flex flex-col gap-2 self-start rounded-[16px] bg-white p-3 shadow-[0_10px_40px_rgb(0_0_0/0.05)]">
            {cats.map((c, i) => {
              const Icon = getIcon(c.icon);
              const selected = i === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`${id}-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "flex items-center gap-4 rounded-[12px] px-4 py-4 text-left text-[15px] font-semibold transition-all lg:px-5",
                    selected ? "bg-gradient-to-r from-brand to-[hsl(20_100%_58%)] text-white shadow-[0_10px_25px_hsl(12_98%_53%/0.3)]" : "text-navy hover:bg-surface-alt",
                  )}
                >
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-[10px]", selected ? "bg-white/20" : "bg-[var(--brand-primary-soft)] text-brand")}>
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="flex-1">{c.label}</span>
                  <ChevronRight aria-hidden className={cn("size-4 transition", selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")} />
                </button>
              );
            })}
          </div>
          <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${cur.id}`} className="relative min-h-[520px] self-start overflow-hidden rounded-[24px] bg-white p-7 shadow-[0_20px_60px_rgb(0_0_0/0.06)] lg:p-10" key={cur.id}>
            <NamedIcon name={cur.icon} className="pointer-events-none absolute -bottom-8 -right-8 size-48 text-brand/[0.06]" />
            <div className="mb-7 flex items-center gap-4 motion-safe:animate-[fadeUp_0.5s_var(--ease-standard)_both]">
              <span className="grid size-16 place-items-center rounded-[16px] bg-[var(--brand-primary-soft)] text-brand">
                <NamedIcon name={cur.icon} className="size-7" />
              </span>
              <h3 className="font-heading text-[26px] font-extrabold text-navy lg:text-[28px]">{cur.label}</h3>
            </div>
            <div className="relative motion-safe:animate-[fadeUp_0.6s_var(--ease-standard)_both]">
              <Items cat={cur} />
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="mt-10 flex flex-col gap-3 md:hidden" data-testid="specs-accordion">
          {cats.map((c, i) => {
            const Icon = getIcon(c.icon);
            const isOpen = openIdx === i;
            return (
              <div key={c.id} className={cn("overflow-hidden rounded-[14px] border bg-white transition", isOpen ? "border-brand/40 shadow-[0_10px_30px_rgb(0_0_0/0.06)]" : "border-line")}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`${id}-acc-${c.id}`} onClick={() => setOpenIdx(isOpen ? null : i)} className="flex w-full items-center gap-3 px-4 py-4 text-left text-[15px] font-semibold text-navy">
                    <span className={cn("grid size-9 place-items-center rounded-[10px]", isOpen ? "bg-brand text-white" : "bg-[var(--brand-primary-soft)] text-brand")}>
                      <Icon aria-hidden className="size-[18px]" />
                    </span>
                    <span className="flex-1">{c.label}</span>
                    <ChevronDown aria-hidden className={cn("size-5 text-muted transition-transform", isOpen && "rotate-180 text-brand")} />
                  </button>
                </h3>
                <div id={`${id}-acc-${c.id}`} hidden={!isOpen} className="px-4 pb-5">
                  <Items cat={c} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
