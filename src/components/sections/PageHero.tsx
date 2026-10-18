import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { Eyebrow } from "@/components/ui/SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: ImageAsset;
  crumbs: { label: string; href?: string }[];
}

/** Inner-page banner: same full-bleed image + navy overlay treatment as the home hero, shorter. */
export function PageHero({ eyebrow, title, subtitle, image, crumbs }: PageHeroProps) {
  return (
    <section className="relative isolate mt-[var(--header-height)] overflow-hidden bg-navy-deep">
      <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,hsl(234_100%_11%/0.92),hsl(234_100%_15%/0.65)_55%,hsl(234_100%_21%/0.35))]" />
      <div className="container-site flex min-h-[340px] flex-col justify-center py-16 sm:min-h-[420px]">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight aria-hidden className="size-3.5" /> : null}
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl motion-safe:animate-[fadeUp_0.8s_var(--ease-standard)_both]">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-heading text-[38px] font-bold leading-[1.1] text-white sm:text-[56px]">{title}</h1>
          {subtitle ? <p className="mt-4 text-[17px] text-white/85 sm:text-[19px]">{subtitle}</p> : null}
        </div>
      </div>
    </section>
  );
}
