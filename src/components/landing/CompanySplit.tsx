import Image from "next/image";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** Reference company block: warm gradient, framed portrait image left, story + "To Learn More" right. */
export function CompanySplit({ company }: { company: LandingContent["company"] }) {
  return (
    <section id="about-company" className="bg-[linear-gradient(135deg,#ffffff_0%,#ffe5d3_100%)] py-[70px] lg:py-[130px]">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,550px)_1fr] lg:gap-[70px] xl:gap-[100px]">
        <Reveal className="relative mx-auto w-full max-w-[550px]">
          <div aria-hidden className="absolute -left-4 -top-4 h-[85%] w-[85%] rounded-[24px] border-2 border-brand/40" />
          <div className="group relative aspect-[11/13] overflow-hidden rounded-[24px] shadow-[0_30px_70px_rgb(0_11_107/0.18)]">
            <Image src={company.image.src} alt={company.image.alt} fill sizes="(max-width: 1023px) 100vw, 550px" className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
          </div>
        </Reveal>
        <div>
          <LandingHeading eyebrow={company.eyebrow} title={company.title} align="left" />
          <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-muted">
            {company.paragraphs.map((p) => (
              <Reveal key={p.slice(0, 30)} delay={0.2}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-9">
            <ButtonLink href={company.cta.href} size="lg">{company.cta.label}</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
