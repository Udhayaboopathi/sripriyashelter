import Image from "next/image";
import type { ImageAsset } from "@/types/content";

/**
 * Reference "project visuals" band: a full-bleed photograph with an oversized
 * serif wordmark sitting on its lower edge. Uses Sripriya's own name + photo.
 */
export function VisualBand({ image, words }: { image: ImageAsset; words: string }) {
  return (
    <section aria-hidden className="relative h-[300px] overflow-hidden bg-navy-deep sm:h-[460px] lg:h-[650px]">
      <Image src={image.src} alt="" fill sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 via-35% to-transparent" />
      <p className="absolute inset-x-0 -bottom-[0.16em] select-none whitespace-nowrap text-center font-heading text-[8.4vw] font-black uppercase leading-none tracking-tight text-navy/90 mix-blend-multiply">
        {words}
      </p>
    </section>
  );
}
