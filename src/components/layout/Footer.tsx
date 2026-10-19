import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Heart, Mail, MapPin, Phone } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/SocialIcon";

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="relative pb-3 font-body text-[18px] font-bold uppercase tracking-[2px] text-white">
      {children}
      <span className="text-brand"> .</span>
      <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-8 rounded bg-brand" />
    </h2>
  );
}

/**
 * Reference footer pattern: dark block with tri-colour top rule, brand column
 * with socials, chevron quick-links, icon-circle contact list, centred
 * copyright. Coloured with Sripriya navy instead of the reference's black.
 */
export function Footer() {
  const year = process.env.NEXT_PUBLIC_BUILD_YEAR;
  return (
    <footer className="relative bg-navy-ink text-white/70">
      <div aria-hidden className="flex h-1.5">
        <span className="w-[6%] bg-navy" />
        <span className="flex-1 bg-brand" />
        <span className="w-[27%] bg-navy" />
      </div>
      <div className="bg-[radial-gradient(40%_60%_at_90%_10%,hsl(12_98%_53%/0.12),transparent_70%)]">
        <div className="container-site grid gap-12 pb-10 pt-20 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.3fr] lg:gap-10">
          <div>
            <div className="inline-flex rounded-xl bg-white px-5 py-3">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.8]">{site.description}</p>
            <div className="mt-6 flex gap-3">
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${s.label}`} className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand">
                  <InstagramIcon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Quick links">
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="mt-5 space-y-0.5">
              {footerQuickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex min-h-11 items-center gap-2 text-[15px] transition hover:text-white">
                    <ChevronRight aria-hidden className="size-4 text-brand transition-transform group-hover:translate-x-1" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Our projects">
            <ColumnTitle>Our Projects</ColumnTitle>
            <ul className="mt-5 space-y-0.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group inline-flex min-h-11 items-center gap-2 text-[15px] transition hover:text-white">
                    <ChevronRight aria-hidden className="size-4 text-brand transition-transform group-hover:translate-x-1" />
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <ColumnTitle>Contact Us</ColumnTitle>
            <ul className="mt-6 space-y-5 text-[15px]">
              <li className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"><MapPin aria-hidden className="size-4" /></span>
                <address className="not-italic leading-relaxed">
                  {site.address.lines.join(" ")}
                  <br />({site.address.landmark})
                </address>
              </li>
              <li className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"><Phone aria-hidden className="size-4" /></span>
                <a href={site.phone.href} className="inline-flex min-h-11 items-center hover:text-white">{site.phone.display}</a>
              </li>
              <li className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"><Mail aria-hidden className="size-4" /></span>
                <a href={site.email.href} className="inline-flex min-h-11 items-center break-all hover:text-white">{site.email.display}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-site flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-center text-sm sm:flex-row sm:text-left">
          <p>
            © {year} <span className="font-semibold text-brand">{site.name}</span>. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            by
            <a href={site.credit.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-medium text-white underline-offset-4 hover:underline">{site.credit.label}</a>
            <Heart aria-hidden className="size-3.5 fill-brand text-brand" />
          </p>
        </div>
      </div>
    </footer>
  );
}
