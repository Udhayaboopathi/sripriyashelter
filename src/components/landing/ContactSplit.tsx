import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { LandingContent } from "@/types/landing";
import { LandingHeading } from "@/components/ui/SplitTitle";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { site } from "@/data/site";

/** Reference contact block: tall image left, underline form (Name, Phone, Interested In, Message) right. */
export function ContactSplit({ contact }: { contact: LandingContent["contact"] }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-white py-[70px] lg:py-[130px]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,hsl(12_98%_53%/0.10),transparent_70%)]" />
      <div className="container-site relative grid items-center gap-10 lg:grid-cols-[minmax(0,550px)_1fr] lg:gap-[70px] xl:gap-[100px]">
        <Reveal className="relative mx-auto hidden w-full max-w-[550px] lg:block">
          <div className="relative aspect-[11/13] overflow-hidden rounded-[24px] shadow-[0_30px_70px_rgb(0_11_107/0.15)]">
            <Image src={contact.image.src} alt={contact.image.alt} fill sizes="550px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 text-white">
              <a href={site.phone.href} className="inline-flex items-center gap-2 text-[17px] font-semibold hover:text-brand">
                <Phone aria-hidden className="size-5 text-brand" /> {site.phone.display}
              </a>
              <a href={site.email.href} className="inline-flex items-center gap-2 text-[15px] hover:text-brand">
                <Mail aria-hidden className="size-5 text-brand" /> {site.email.display}
              </a>
            </div>
          </div>
        </Reveal>
        <div>
          <LandingHeading eyebrow={contact.eyebrow} title={contact.title} align="left" />
          <Reveal delay={0.2} className="mt-10">
            <EnquiryForm variant="underline" project={contact.project} interestOptions={contact.interestOptions} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
