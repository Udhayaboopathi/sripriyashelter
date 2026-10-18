import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface FounderSplitProps {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: ImageAsset;
  caption: string;
  cta?: { label: string; href: string };
}

/** Reference "Why Avittam Homes?" split: portrait image left, pill + serif heading + long copy + pill CTA right, warm gradient. */
export function FounderSplit({ eyebrow, title, paragraphs, image, caption, cta }: FounderSplitProps) {
  return (
    <section className="bg-warm relative overflow-hidden pb-24 pt-24 lg:pb-[140px] lg:pt-[130px]" aria-label={title}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
        <Reveal>
          <figure className="relative mx-auto max-w-[460px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_60px_rgb(0_11_107/0.18)]">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 90vw, 460px" className="object-cover object-[50%_30%]" />
            </div>
            <figcaption className="absolute -bottom-5 left-6 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg">{caption}</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-heading text-[32px] font-bold leading-[1.2] text-navy sm:text-[44px] lg:text-[48px]">{title}</h2>
          <div className="mt-6 space-y-4 text-[17px] leading-[1.8] text-muted">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {cta ? <ButtonLink href={cta.href} className="mt-9" size="lg">{cta.label}</ButtonLink> : null}
        </Reveal>
      </div>
    </section>
  );
}
