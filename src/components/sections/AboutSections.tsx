import Image from "next/image";
import { Eye, Target } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function StorySplit({ title, paragraphs, stats, badge, image }: { title: string; paragraphs: string[]; stats: { value: string; label: string }[]; badge: { value: string; label: string }; image: ImageAsset }) {
  return (
    <section className="bg-warm section-y" aria-labelledby="story-title">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3.2] overflow-hidden rounded-[var(--radius-media)] shadow-[0_30px_60px_rgb(0_11_107/0.15)]">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 640px" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-[16px] bg-brand px-6 py-5 text-white shadow-xl sm:right-8">
            <span className="block font-heading text-[42px] font-bold leading-none">{badge.value}</span>
            <span className="text-[13px] font-semibold uppercase tracking-[1.5px]">{badge.label}</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 id="story-title" className="mt-5 font-heading text-[34px] font-bold text-navy sm:text-[48px]">{title}</h2>
          <div className="mt-6 space-y-4 text-[17px] leading-[1.8] text-muted">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-9 grid grid-cols-3 divide-x divide-navy/10 rounded-[18px] bg-white py-6 shadow-[var(--shadow-card)]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-2">
                <dd className="font-heading text-[32px] font-bold text-brand">{s.value}</dd>
                <dt className="order-last text-xs font-semibold uppercase tracking-[1.5px] text-navy">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function Leadership({ eyebrow, title, people, stats }: { eyebrow: string; title: string; people: { name: string; image: ImageAsset; bio: string }[]; stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-dark-glow section-y" aria-label={title}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} tone="dark" />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={0.1 * (i + 1)}>
              <article className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
                <div className="relative aspect-[4/4.2] overflow-hidden">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 767px) 100vw, 640px" className="object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-ink/90 to-transparent" />
                  <h3 className="absolute bottom-5 left-6 font-heading text-[26px] font-semibold text-white">{p.name}</h3>
                </div>
                <p className="p-7 text-[16px] leading-[1.8] text-white/75">{p.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-white/15">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 text-center">
              <dd className="font-heading text-[34px] font-bold text-brand sm:text-[44px]">{s.value}</dd>
              <dt className="order-last text-[11px] font-semibold uppercase tracking-[1.5px] text-white/70 sm:text-xs">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function VisionMission({ vision, mission }: { vision: string; mission: string }) {
  const items = [
    { title: "Our Vision", text: vision, Icon: Eye },
    { title: "Our Mission", text: mission, Icon: Target },
  ];
  return (
    <section className="bg-white section-y" aria-label="Vision and mission">
      <div className="container-site grid gap-7 md:grid-cols-2">
        {items.map(({ title, text, Icon }, i) => (
          <Reveal key={title} delay={0.1 * (i + 1)}>
            <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-brand/20 bg-white p-9 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)]">
              <span className="grid size-14 place-items-center rounded-full bg-[var(--brand-primary-soft)] text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="mt-6 font-heading text-[28px] font-bold text-navy">{title}</h3>
              <p className="mt-4 text-[16px] leading-[1.8] text-muted">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Timeline({ eyebrow, title, items }: { eyebrow: string; title: string; items: { year: string; title: string; text: string }[] }) {
  return (
    <section className="bg-grid-light section-y" aria-label={title}>
      <div className="container-site">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ol className="relative mx-auto mt-14 max-w-4xl before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-0.5 before:bg-brand/25 md:before:left-1/2">
          {items.map((m, i) => (
            <Reveal as="li" key={m.year} delay={0.08 * (i + 1)} className="relative mb-10 pl-14 last:mb-0 md:w-1/2 md:pl-0 md:odd:pr-14 md:odd:text-right md:even:ml-auto md:even:pl-14">
              <span aria-hidden className={`absolute left-[11px] top-2 size-[18px] rounded-full border-4 border-white bg-brand shadow ${i % 2 === 0 ? "md:left-auto md:-right-[9px]" : "md:-left-[9px]"}`} />
              <span className="font-heading text-[34px] font-bold text-brand">{m.year}</span>
              <h3 className="mt-1 font-body text-[19px] font-bold text-navy">{m.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
