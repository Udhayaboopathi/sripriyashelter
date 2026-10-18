import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { amenityIcon } from "@/components/ui/icons";

/**
 * Reference amenities block: dark grid-pattern section with uppercase serif
 * labels on tiles. The original publishes amenity names only (no photos), so
 * tiles use icons rather than invented imagery.
 */
export function Amenities({ items, projectTitle }: { items: string[]; projectTitle: string }) {
  return (
    <section id="amenities" className="bg-grid-dark section-y relative overflow-hidden" aria-label="Amenities">
      <div className="container-site">
        <SectionHeading eyebrow="Amenities" title={`Amenities at ${projectTitle}`} tone="dark" align="left" />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((a, i) => {
            const Icon = amenityIcon(a);
            return (
              <Reveal as="li" key={a} delay={0.05 * (i + 1)}>
                <div className="group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden rounded-[14px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/50">
                  <span className="grid size-12 place-items-center rounded-full bg-brand/15 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="mt-6 font-heading text-[15px] font-semibold uppercase tracking-[1.5px] text-white">{a}</span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
