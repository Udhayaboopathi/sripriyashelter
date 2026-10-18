import { MapPin, Navigation } from "lucide-react";
import type { LocationContent } from "@/types/landing";
import { LandingHeading, SplitTitle } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { site } from "@/data/site";

/**
 * Reference location block: map card (iframe + place card) with a thin orange
 * frame, then "How close is …, really?" — four portrait landmark video cards.
 */
export function LocationSection({ location }: { location: LocationContent }) {
  return (
    <section id="location" className="bg-grid-light relative bg-[#f9f9f9] py-[70px] lg:py-[100px]">
      <div className="container-site">
        <LandingHeading eyebrow={location.eyebrow} title={location.title} description={location.description} />
        <Reveal delay={0.2} className="mt-10 lg:mt-[50px]">
          <div className="grid overflow-hidden rounded-[24px] border border-brand/50 bg-white shadow-[0_20px_60px_rgb(0_0_0/0.06)] lg:grid-cols-[2fr_1fr]">
            <div className="relative h-[300px] sm:h-[380px] lg:h-[450px]">
              {location.mapEmbedUrl ? (
                <iframe
                  title={`Map showing ${location.placeName}`}
                  src={location.mapEmbedUrl}
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : null}
            </div>
            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <div className="w-fit rounded-[14px] border border-line bg-white p-3 shadow-sm">
                <span className="font-heading text-[22px] font-bold leading-none">
                  <span className="text-brand">{site.nameParts[0]}</span> <span className="text-navy">{site.nameParts[1]}</span>
                </span>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[2px] text-brand">
                  <MapPin aria-hidden className="size-4" /> Site address
                </p>
                <h3 className="mt-2 font-heading text-[24px] font-extrabold leading-tight text-navy">{location.placeName}</h3>
                <address className="mt-3 not-italic text-[15px] leading-[1.7] text-muted">
                  {location.address.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
              </div>
              <a href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold uppercase tracking-wide text-white transition hover:bg-brand">
                <Navigation aria-hidden className="size-4" /> Get Directions
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-[70px] lg:mt-[90px]" data-testid="landmarks">
          <SplitTitle title={location.landmarksTitle} as="h3" className="text-center text-[26px] font-extrabold leading-tight text-navy sm:text-[32px]" />
          <ul className="mt-9 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-[30px]">
            {location.landmarks.map((lm, i) => (
              <Reveal as="li" key={lm.name} delay={0.1 * (i + 1)}>
                <figure className="group overflow-hidden rounded-[16px] bg-white shadow-[0_10px_30px_rgb(0_0_0/0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0_0_0/0.14)]">
                  <div className="relative aspect-[9/14] overflow-hidden bg-navy-deep">
                    <LazyVideo video={lm.video} ambient className="transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[12px] font-bold text-navy shadow sm:text-[13px]">{lm.distance}</span>
                  </div>
                  <figcaption className="flex h-[60px] items-center justify-center px-3 text-center font-heading text-[15px] font-bold text-navy sm:text-[18px]">{lm.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
