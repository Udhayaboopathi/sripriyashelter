import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Reference testimonials: deep dark section with central glow and a 2-column grid of dark cards with star ratings. */
export function Testimonials({ eyebrow, title, description, items }: { eyebrow: string; title: string; description: string; items: Testimonial[] }) {
  return (
    <section className="section-y relative overflow-hidden bg-navy-ink" aria-label={title}>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.18),transparent_65%)]" />
      <div className="container-site relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} tone="dark" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * ((i % 2) + 1)} className="h-full">
              <figure className="group relative flex h-full flex-col rounded-[20px] border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:border-brand/40 hover:bg-white/[0.06] sm:p-9">
                <Quote aria-hidden className="size-10 text-brand/40" />
                <blockquote className="mt-5 flex-1 text-[17px] leading-[1.75] text-white/85">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="mt-7 flex items-center gap-1" aria-label={`Rated ${t.rating} out of 5`} role="img">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} aria-hidden className={s < t.rating ? "size-4 fill-brand text-brand" : "size-4 text-white/30"} />
                  ))}
                </div>
                <figcaption className="mt-3">
                  <span className="block font-heading text-[19px] font-semibold text-white">{t.name}</span>
                  <span className="text-sm text-white/60">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
