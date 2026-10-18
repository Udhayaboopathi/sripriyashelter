import Image from "next/image";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/components/ui/icons";

/** Reference "why" grid: warm gradient, 3 × 2 image cards (412 × 562 at 1440) with number, icon disc and lift-on-hover. */
export function WhySection({ why }: { why: LandingContent["why"] }) {
  return (
    <section id="why" className="relative overflow-hidden bg-[linear-gradient(135deg,#fff9f6_0%,#fff1f1_100%)] py-[70px] lg:py-[100px]">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.10),transparent_65%)]" />
      <div className="container-site relative">
        <LandingHeading eyebrow={why.eyebrow} title={why.title} breakAccent />
        <div className="mt-[50px] grid gap-[30px] md:grid-cols-2 lg:mt-[60px] lg:grid-cols-3">
          {why.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.title} delay={0.1 * (i + 1)} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[hsl(12_98%_53%/0.2)] bg-white shadow-[0_10px_40px_rgb(0_0_0/0.05)] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_50px_rgb(0_0_0/0.15)] hover:before:scale-x-100">
                  <div className="relative h-[240px] overflow-hidden sm:h-[280px]">
                    <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 412px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span aria-hidden className="absolute right-6 top-[212px] z-10 grid size-14 place-items-center rounded-full border-4 border-white bg-brand text-white shadow-[0_8px_20px_hsl(12_98%_53%/0.35)] transition-transform duration-500 group-hover:scale-110 sm:top-[252px]">
                    <Icon className="size-6" />
                  </span>
                  <div className="flex flex-1 flex-col px-[30px] pb-[34px] pt-[30px]">
                    <span aria-hidden className="font-heading text-[44px] font-extrabold leading-none text-[hsl(12_98%_53%/0.18)]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-[20px] font-bold leading-[1.3] text-[#222]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-[#666]">{item.text}</p>
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
