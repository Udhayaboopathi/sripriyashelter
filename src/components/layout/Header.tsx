"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Phone } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { useEnquiry } from "@/components/layout/EnquiryProvider";
import { projects } from "@/data/projects";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/cn";

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Reference header: fixed white bar (80px desktop / 90px mobile), soft shadow,
 * serif nav centred, orange pill CTA + hamburger (off-canvas) on the right,
 * hides on scroll-down and returns on scroll-up (0.4s ease-in-out).
 */
export function Header() {
  const pathname = usePathname();
  const { hidden } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBrochure } = useEnquiry();
  const currentProject = projects.find((p) => pathname === `/projects/${p.slug}`);

  return (
    <>
      <header
        data-testid="site-header"
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-height)] bg-white shadow-[0_0_8px_rgb(0_0_0/0.2)] transition-transform duration-[400ms] ease-in-out",
          hidden && !menuOpen ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <div className="container-site flex h-full items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {mainNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative px-3 py-2 font-heading text-[18px] transition-colors duration-300 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-100",
                        active ? "text-brand after:scale-x-100" : "text-black",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2.5 sm:gap-5">
            <a href={site.phone.href} className="hidden items-center gap-2 text-sm font-medium text-navy transition hover:text-brand xl:inline-flex">
              <Phone aria-hidden className="size-4" />
              {site.phone.display}
            </a>
            <button
              type="button"
              onClick={() => openBrochure({ project: currentProject?.title })}
              data-testid="header-brochure"
              className="inline-flex h-[40px] items-center gap-2 whitespace-nowrap rounded-full bg-brand px-3.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-[0_0_0_5px_hsl(12_98%_53%/0.2)] transition hover:bg-brand-strong hover:shadow-[0_0_0_8px_hsl(12_98%_53%/0.18)] sm:h-[46px] sm:px-5 sm:text-[13px]"
            >
              <Download aria-hidden className="size-4" />
              Brochure
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="site-offcanvas"
              onClick={() => setMenuOpen(true)}
              className="group grid size-10 place-items-center"
              data-testid="menu-toggle"
            >
              <span aria-hidden className="flex w-7 flex-col items-end gap-[6px]">
                <span className="h-0.5 w-7 rounded bg-navy transition-all group-hover:bg-brand" />
                <span className="h-0.5 w-5 rounded bg-navy transition-all group-hover:w-7 group-hover:bg-brand" />
                <span className="h-0.5 w-7 rounded bg-navy transition-all group-hover:bg-brand" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
