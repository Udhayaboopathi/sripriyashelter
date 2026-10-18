"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/SocialIcon";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/** Right-hand off-canvas panel (reference: logo, bordered serif links, "Reach us" card, call CTA, socials). */
export function MobileNavigation({ open, onClose, pathname }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useEscapeKey(open, close);
  useLockBodyScroll(open);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]" id="site-offcanvas">
          <motion.div className="absolute inset-0 bg-navy-ink/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-testid="offcanvas"
            className="absolute right-0 top-0 flex h-full w-[min(90vw,420px)] flex-col overflow-y-auto bg-white px-7 pb-10 pt-6 shadow-2xl sm:px-9"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.645, 0.045, 0.355, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line pb-6">
              <Logo />
              <button ref={closeRef} type="button" onClick={close} aria-label="Close menu" className="grid size-12 place-items-center rounded-full bg-brand text-white transition hover:rotate-90 hover:bg-navy">
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6">
              <ul>
                {mainNavigation.map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <motion.li key={item.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="border-b border-line">
                      <Link href={item.href} onClick={close} aria-current={active ? "page" : undefined} className={cn("block py-4 font-heading text-[18px] transition-colors hover:text-brand", active ? "text-brand" : "text-black")}>
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-8 rounded-[18px] border border-line bg-surface-alt p-6">
              <p className="text-[13px] font-extrabold uppercase tracking-[2px] text-brand">Reach Us</p>
              <p className="mt-4 flex gap-3 text-[15px] leading-relaxed text-navy">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                <span>{site.address.lines.join(" ")} ({site.address.landmark})</span>
              </p>
              <a href={site.email.href} className="mt-4 flex items-center gap-3 text-[15px] text-navy hover:text-brand">
                <Mail aria-hidden className="size-4 text-brand" /> {site.email.display}
              </a>
              <a href={site.phone.href} className="mt-6 flex h-14 items-center justify-center gap-3 rounded-full bg-brand font-semibold text-white transition hover:bg-brand-strong">
                <Phone aria-hidden className="size-4" /> {site.phone.display}
              </a>
            </div>
            <div className="mt-8">
              <p className="text-[13px] font-extrabold uppercase tracking-[2px] text-brand">We&apos;re on social media</p>
              <div className="mt-4 flex gap-3">
                {site.social.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-11 place-items-center rounded-full border border-line text-navy transition hover:border-brand hover:bg-brand hover:text-white">
                    <InstagramIcon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
