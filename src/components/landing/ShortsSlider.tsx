"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { cn } from "@/lib/cn";

/**
 * Reference "Built Different" coverflow: active portrait card 360 × 640 in the
 * centre, neighbours at 90 % scale, arrows + pagination dots underneath.
 */
export function ShortsSlider({ shorts }: { shorts: LandingContent["shorts"] }) {
  const items = shorts.items;
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <section id="shorts" aria-roledescription="carousel" aria-label={`${shorts.title.lead} ${shorts.title.accent}`} className="bg-network-soft relative overflow-hidden bg-white py-[70px] lg:pb-[110px] lg:pt-[100px]">
      <div className="container-site">
        <LandingHeading eyebrow={shorts.eyebrow} title={shorts.title} />
      </div>
      <div className="relative mt-10 h-[460px] sm:h-[560px] lg:mt-[50px] lg:h-[640px]" data-testid="shorts-track">
        {items.map((item, i) => {
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          const active = offset === 0;
          const visible = Math.abs(offset) <= 1;
          return (
            <div
              key={item.src}
              aria-hidden={!active}
              data-active={active}
              className={cn(
                "absolute left-1/2 top-0 h-full w-[260px] overflow-hidden rounded-[20px] bg-navy-ink shadow-[0_25px_60px_rgb(0_0_0/0.18)] transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] sm:w-[315px] lg:w-[360px]",
                !visible && "pointer-events-none opacity-0",
              )}
              style={{
                transform: `translateX(calc(-50% + ${offset} * var(--shorts-step))) scale(${active ? 1 : 0.9})`,
                zIndex: 10 - Math.abs(offset),
                filter: active ? "none" : "brightness(0.75)",
              }}
              onClick={() => !active && setIndex(i)}
            >
              <LazyVideo video={item} ambient={active} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-ink/90 to-transparent p-5 pt-16">
                <p className="font-heading text-[18px] font-bold text-white">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-5">
        <button type="button" onClick={() => go(-1)} aria-label="Previous clip" className="grid size-[50px] place-items-center rounded-full bg-navy text-white transition hover:bg-brand">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-0.5" role="tablist" aria-label="Choose clip">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Clip ${i + 1}: ${item.title}`}
              onClick={() => setIndex(i)}
              className="group grid h-6 min-w-6 place-items-center"
            >
              <span aria-hidden className={cn("block h-2.5 rounded-full transition-all", i === index ? "w-8 bg-brand" : "w-2.5 bg-navy/25 group-hover:bg-navy/50")} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next clip" className="grid size-[50px] place-items-center rounded-full bg-navy text-white transition hover:bg-brand">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
