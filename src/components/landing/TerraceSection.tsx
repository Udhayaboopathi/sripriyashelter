import Image from "next/image";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";

/** Reference "View From Terrace": heading over a full-container image framed by a thin orange border. */
export function TerraceSection({ terrace }: { terrace: LandingContent["terrace"] }) {
  return (
    <section id="terrace-view" className="bg-[linear-gradient(135deg,#ffffff_0%,hsl(12_98%_53%/0.08)_100%)] py-[60px] lg:py-20">
      <div className="container-site">
        <LandingHeading title={terrace.title} />
        <Reveal delay={0.2} className="mt-10 lg:mt-[50px]">
          <div className="group relative mx-auto aspect-[16/10] w-full max-w-[1282px] overflow-hidden rounded-[16px] border border-brand/60 shadow-[0_20px_50px_rgb(0_0_0/0.08)] sm:aspect-[16/9]">
            <Image src={terrace.image.src} alt={terrace.image.alt} fill sizes="(max-width: 1320px) 100vw, 1282px" className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
