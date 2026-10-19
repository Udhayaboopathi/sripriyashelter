import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ContactInfo({ title, description }: { title: string; description: string }) {
  const cards = [
    { title: "Visit Us", Icon: MapPin, body: <>{site.address.lines.map((l) => <span key={l} className="block">{l}</span>)}<span className="block">({site.address.landmark})</span></> },
    { title: "Call Us", Icon: Phone, body: <a href={site.phone.href} className="inline-flex min-h-11 items-center hover:text-brand">{site.phone.display}</a> },
    { title: "Email Us", Icon: Mail, body: <a href={site.email.href} className="inline-flex min-h-11 items-center break-all hover:text-brand">{site.email.display}</a> },
    { title: "Working Hours", Icon: Clock, body: <>{site.hours.map((h) => <span key={h} className="block">{h}</span>)}</> },
  ];
  return (
    <section className="bg-warm section-y" aria-label={title}>
      <div className="container-site">
        <SectionHeading eyebrow="Contact" title={title} description={description} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title: t, Icon, body }, i) => (
            <Reveal key={t} delay={0.1 * (i + 1)} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-brand/20 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[var(--shadow-card-hover)]">
                <span className="grid size-14 place-items-center rounded-full bg-brand text-white shadow-[0_8px_20px_hsl(12_98%_53%/0.35)] transition-transform duration-500 group-hover:scale-110">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-6 font-body text-[20px] font-bold text-navy">{t}</h3>
                <div className="mt-3 text-[15px] leading-relaxed text-muted">{body}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
