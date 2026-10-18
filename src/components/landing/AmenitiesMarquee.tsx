import Image from "next/image";
import type { AmenityTile, LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";

function Row({ items, reverse, duration }: { items: AmenityTile[]; reverse?: boolean; duration: number }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden">
      <ul className="marquee-track flex w-max gap-4 lg:gap-5" data-direction={reverse ? "reverse" : "forward"} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {loop.map((a, i) => (
          <li key={`${a.name}-${i}`} aria-hidden={i >= items.length} className="group relative h-[130px] w-[200px] shrink-0 overflow-hidden rounded-[10px] sm:h-[170px] sm:w-[260px] lg:h-[200px] lg:w-[300px]">
            <Image src={a.image.src} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/90 via-navy-ink/20 to-transparent" />
            <p className="absolute inset-x-3 bottom-3 font-heading text-[12px] font-bold uppercase tracking-[2px] text-white sm:text-[14px]">{a.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reference amenities: dark band, three full-bleed marquee rows of photo tiles in alternating directions. */
export function AmenitiesMarquee({ amenities }: { amenities: LandingContent["amenities"] }) {
  const items = amenities.items;
  const third = Math.ceil(items.length / 3);
  const rows = [items.slice(0, third), items.slice(third, third * 2), items.slice(third * 2)].map((r) => {
    // Each half of the loop must be wider than a 1920px viewport: repeat short rows.
    let out = r.length ? r : items;
    while (out.length < 7) out = [...out, ...(r.length ? r : items)];
    return out;
  });
  return (
    <section id="amenities" className="bg-grid-dark relative overflow-hidden bg-navy-ink py-[70px] lg:py-[120px]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.18),transparent_65%)]" />
      <div className="container-site relative">
        <LandingHeading eyebrow={amenities.eyebrow} title={amenities.title} tone="dark" />
        <ul className="sr-only">
          {items.map((a) => (
            <li key={a.name}>{a.name}</li>
          ))}
        </ul>
      </div>
      <div className="relative mt-10 flex flex-col gap-4 lg:mt-[60px] lg:gap-5" data-testid="amenity-marquee">
        <Row items={rows[0]} duration={50} />
        <Row items={rows[1]} reverse duration={58} />
        <Row items={rows[2]} duration={54} />
      </div>
    </section>
  );
}
