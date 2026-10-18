import Image from "next/image";
import type { LandingContent } from "@/types/landing";

/** Reference giant-text image band (650px at 1440): oversized wordmark sliding across the base of a full-bleed photo. */
export function BigTextBand({ band }: { band: LandingContent["bigText"] }) {
  const words = Array.from({ length: 4 }, () => band.words);
  return (
    <section aria-label={band.words} className="relative h-[300px] overflow-hidden bg-white sm:h-[460px] lg:h-[650px]">
      <Image src={band.image.src} alt={band.image.alt} fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white via-white/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-[-0.12em] overflow-hidden whitespace-nowrap font-heading text-[64px] font-extrabold uppercase leading-none tracking-tight text-navy sm:text-[110px] lg:text-[170px]">
        <div className="marquee-track inline-flex [--marquee-duration:38s]">
          {[...words, ...words].map((w, i) => (
            <span key={i} className={i % 2 ? "text-outline-navy px-[0.3em]" : "px-[0.3em]"}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
