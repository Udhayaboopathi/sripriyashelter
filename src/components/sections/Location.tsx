import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface LocationProps {
  eyebrow: string;
  title: string;
  description?: string;
  placeName: string;
  addressLines: string[];
  directionsUrl: string;
  mapEmbedUrl?: string;
  mapImage?: ImageAsset;
  logo?: ImageAsset;
}

/**
 * Reference location card: one rounded panel with an orange hairline border,
 * map on the left (≈2/3) and an info column with logo disc, serif name,
 * address and "Get Directions" pill on the right.
 */
export function Location({ eyebrow, title, description, placeName, addressLines, directionsUrl, mapEmbedUrl, mapImage, logo }: LocationProps) {
  return (
    <section className="bg-grid-light section-y" aria-label={title} id="location">
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Reveal delay={0.15}>
          <div className="mt-12 grid overflow-hidden rounded-[24px] border border-brand/40 bg-white shadow-[0_20px_50px_rgb(0_11_107/0.08)] lg:grid-cols-[1.75fr_1fr]">
            <div className="relative min-h-[320px] bg-accent sm:min-h-[420px]">
              {mapEmbedUrl ? (
                <iframe src={mapEmbedUrl} title={`Map showing ${placeName}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" allowFullScreen />
              ) : mapImage ? (
                <Image src={mapImage.src} alt={mapImage.alt} fill sizes="(max-width: 1023px) 100vw, 820px" className="object-contain p-4" />
              ) : null}
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
              {logo ? (
                <span className="grid size-16 place-items-center rounded-full bg-[var(--brand-primary-soft)] ring-1 ring-[var(--brand-primary-line)]">
                  <Image src={logo.src} alt="" width={44} height={44} className="rounded-full" />
                </span>
              ) : (
                <span className="grid size-16 place-items-center rounded-full bg-[var(--brand-primary-soft)] text-brand"><MapPin aria-hidden className="size-7" /></span>
              )}
              <h3 className="font-heading text-[26px] font-semibold text-navy">{placeName}</h3>
              <address className="not-italic text-[17px] leading-relaxed text-muted">
                {addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <ButtonLink href={directionsUrl} icon={<Navigation className="size-4" />} className="self-start">Get Directions</ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
