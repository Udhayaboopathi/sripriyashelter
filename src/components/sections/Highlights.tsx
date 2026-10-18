import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/components/ui/icons";

interface HighlightsProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: { icon: string; title: string; text: string; image?: ImageAsset }[];
}

/**
 * Reference "6 Things" grid: warm-gradient section, white 16px-radius cards
 * with a top image, an orange icon disc overlapping the image edge, a large
 * faded index number and Inter-style title/body. Hover lifts the card 10px,
 * draws an orange top rule and intensifies the number + icon.
 */
export function Highlights({ eyebrow, title, description, items }: HighlightsProps) {
  return (
    <section className="bg-warm section-y relative overflow-hidden" aria-labelledby="highlights-title">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 size-[420px] rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.12),transparent_65%)]" />
      <div className="container-site relative">
        <SectionHeading eyebrow={eyebrow} title={<span id="highlights-title">{title}</span>} description={description} />
        <div className="mt-14 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.title} delay={0.1 * (i + 1)} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-brand/20 bg-white shadow-[var(--shadow-card)] transition-all duration-500 [transition-timing-function:var(--ease-standard)] before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-500 hover:-translate-y-2.5 hover:shadow-[var(--shadow-card-hover)] hover:before:scale-x-100">
                  {item.image ? (
                    <div className="relative aspect-[412/280] overflow-hidden">
                      <Image src={item.image.src} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 320px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  ) : null}
                  <div className={item.image ? "relative px-6 pb-8 pt-10" : "relative px-6 pb-8 pt-8"}>
                    <span aria-hidden className={`absolute ${item.image ? "-top-7" : "top-7"} right-6 grid size-14 place-items-center rounded-full bg-brand/90 text-white shadow-[0_8px_20px_hsl(12_98%_53%/0.35)] transition-transform duration-500 group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </span>
                    <span aria-hidden className="block font-heading text-[48px] font-extrabold leading-none text-brand/15 transition-colors duration-500 group-hover:text-brand/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-body text-[20px] font-bold leading-[1.3] text-navy">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-muted">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
