"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { LandingContent } from "@/types/landing";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { VideoModal } from "@/components/ui/VideoModal";

/** Reference full-bleed video band (870px at 1440): ambient loop with a central play button. */
export function WalkthroughBand({ walkthrough }: { walkthrough: LandingContent["walkthrough"] }) {
  const [open, setOpen] = useState(false);
  return (
    <section id="walkthrough" aria-label={walkthrough.label} className="relative h-[240px] overflow-hidden bg-navy-ink xs:h-[300px] sm:h-[440px] md:h-[560px] lg:h-[870px]">
      <LazyVideo video={walkthrough.video} ambient />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-navy-ink/30 via-transparent to-navy-ink/50" />
      <div className="absolute inset-0 grid place-items-center">
        <button type="button" onClick={() => setOpen(true)} className="group flex flex-col items-center gap-4 text-white" aria-label={`Play ${walkthrough.label}`}>
          <span className="animate-pulse-ring grid size-[70px] place-items-center rounded-full bg-white/20 backdrop-blur-md transition group-hover:bg-brand sm:size-[96px]">
            <Play aria-hidden className="ml-1 size-7 fill-current sm:size-9" />
          </span>
          <span className="hidden text-[13px] font-semibold uppercase tracking-[3px] sm:block">{walkthrough.label}</span>
        </button>
      </div>
      <VideoModal video={open ? walkthrough.video : null} onClose={() => setOpen(false)} />
    </section>
  );
}
