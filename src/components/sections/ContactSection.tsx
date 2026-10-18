import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";

interface ContactSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
  project?: string;
  id?: string;
}

/** Reference contact block: image left, underline-input form right, glow accent, "Submit Now" pill. */
export function ContactSection({ eyebrow, title, description, image, project, id = "enquire" }: ContactSectionProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-white pb-24 pt-24 lg:pb-[140px] lg:pt-[120px]" aria-labelledby={`${id}-title`}>
      <div aria-hidden className="pointer-events-none absolute left-1/3 top-0 size-[460px] rounded-full bg-[radial-gradient(circle,hsl(12_98%_53%/0.12),transparent_65%)]" />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <Reveal className="relative hidden aspect-[4/4.7] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_60px_rgb(0_11_107/0.15)] md:block">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 560px" className="object-cover" />
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className="mt-5 font-heading text-[34px] font-semibold leading-[1.05] text-navy sm:text-[52px] lg:text-[60px]">{title}</h2>
          <p className="mt-4 text-[17px] text-muted">{description}</p>
          <EnquiryForm className="mt-10" project={project} />
        </Reveal>
      </div>
    </section>
  );
}
