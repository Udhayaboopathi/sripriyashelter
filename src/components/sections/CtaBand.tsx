import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

/** Full-width brand-orange band (reference RERA strip position; original site's CTA content). */
export function CtaBand({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative overflow-hidden bg-brand py-16 sm:py-20" aria-label={title}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="container-site relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <h2 className="font-heading text-[30px] font-bold text-white sm:text-[42px]">{title}</h2>
          <p className="mt-3 max-w-2xl text-[17px] text-white/90">{description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" variant="ghost-light" size="lg">Contact Us</ButtonLink>
          <ButtonLink href={site.phone.href} variant="outline-light" size="lg" icon={<Phone className="size-4" />}>Call Now</ButtonLink>
        </div>
      </div>
    </section>
  );
}
