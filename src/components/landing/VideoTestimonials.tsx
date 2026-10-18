"use client";

import { useState } from "react";
import { Play, Quote, Star } from "lucide-react";
import type { VideoAsset } from "@/types/content";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { VideoModal } from "@/components/ui/VideoModal";

/** Reference "Happy Homeowners": dark band, 2 × 2 video cards with star rating and title. */
export function VideoTestimonials({ testimonials }: { testimonials: LandingContent["testimonials"] }) {
  const [video, setVideo] = useState<VideoAsset | null>(null);
  return (
    <section id="testimonials" className="relative isolate overflow-hidden bg-[#0b0d1a] py-[70px] text-white lg:py-[100px]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,hsl(12_98%_53%/0.22),transparent_70%)]" />
      <div className="container-site">
        <LandingHeading eyebrow={testimonials.eyebrow} title={testimonials.title} description={testimonials.description} tone="dark" />
        <ul className="mt-[50px] grid gap-6 md:grid-cols-2 lg:mt-[60px] lg:gap-[30px]">
          {testimonials.items.map((t, i) => (
            <Reveal as="li" key={t.name} delay={0.1 * (i + 1)}>
              <article className="group h-full overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04] transition duration-500 hover:-translate-y-1.5 hover:border-brand/50">
                <div className="relative aspect-video overflow-hidden">
                  <LazyVideo video={t.video} ambient className="transition-transform duration-700 group-hover:scale-105" />
                  <button type="button" onClick={() => setVideo(t.video)} aria-label={`Play video: ${t.title}`} className="absolute inset-0 grid place-items-center bg-black/25 transition hover:bg-black/10">
                    <span className="grid size-16 place-items-center rounded-full bg-white/90 text-brand shadow-xl transition-transform group-hover:scale-110">
                      <Play aria-hidden className="ml-1 size-7 fill-current" />
                    </span>
                  </button>
                </div>
                <div className="p-6 lg:p-7">
                  <div className="flex gap-1 text-[#ffc94d]" aria-label={`Rated ${t.rating} out of 5`} role="img">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} aria-hidden className={s < t.rating ? "size-4 fill-current" : "size-4 opacity-30"} />
                    ))}
                  </div>
                  <h3 className="mt-3 font-heading text-[22px] font-extrabold">{t.title}</h3>
                  <blockquote className="mt-3 flex gap-3 text-[15px] leading-[1.7] text-white/70">
                    <Quote aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                    <p>{t.quote}</p>
                  </blockquote>
                  <p className="mt-4 text-[14px] font-semibold text-white">
                    {t.name} <span className="font-normal text-white/50">· {t.role}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </section>
  );
}
