"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { cn } from "@/lib/cn";
import { useSwipe } from "@/hooks/useSwipe";

/**
 * Reference "creators" slider: one 856 × 482 video at a time, round arrows
 * outside the frame, caption beneath; clicking the frame plays the clip.
 */
export function FilmsSlider({ films }: { films: LandingContent["films"] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const count = films.items.length;
  const go = (d: number) => {
    setPlaying(false);
    setIndex((i) => (i + d + count) % count);
  };
  const current = films.items[index];
  const swipe = useSwipe(
    () => go(1),
    () => go(-1),
  );

  return (
    <section
      id="films"
      aria-roledescription="carousel"
      aria-label={`${films.title.lead} ${films.title.accent}`}
      className="bg-network-soft relative overflow-hidden bg-[linear-gradient(135deg,#fdfbfb_0%,#ebedee_100%)] py-[60px] lg:py-20"
    >
      <div className="container-site">
        <LandingHeading title={films.title} />
        <div className="relative mx-auto mt-10 max-w-[1000px] lg:mt-[50px]">
          <div className="relative mx-auto max-w-[856px]">
            <div
              data-testid="films-frame"
              {...swipe}
              className="relative aspect-video touch-pan-y overflow-hidden rounded-[20px] bg-navy-ink shadow-[0_30px_70px_rgb(0_11_107/0.18)]"
            >
              {films.items.map((item, i) => (
                <div
                  key={item.src}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    i === index
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                  aria-hidden={i !== index}
                >
                  <LazyVideo
                    video={item}
                    playing={playing && i === index}
                    controls={playing && i === index}
                    onEnded={() => setPlaying(false)}
                  />
                </div>
              ))}
              {!playing ? (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 grid place-items-center bg-navy-ink/25 transition hover:bg-navy-ink/10"
                  aria-label={`Play video: ${current.title}`}
                >
                  <span className="animate-pulse-ring grid size-[76px] place-items-center rounded-full bg-brand text-white shadow-xl transition-transform group-hover:scale-110">
                    <Play aria-hidden className="ml-1 size-8 fill-current" />
                  </span>
                </button>
              ) : null}
            </div>
            <p
              className="mt-6 text-center text-[18px] font-bold text-navy sm:text-[20px]"
              aria-live="polite"
              data-testid="film-caption"
            >
              {current.title}
            </p>
          </div>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous video"
            className="absolute left-1 top-[calc(50%-30px)] grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg transition hover:bg-brand hover:text-white sm:left-0 lg:-left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next video"
            className="absolute right-1 top-[calc(50%-30px)] grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg transition hover:bg-brand hover:text-white sm:right-0 lg:-right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
