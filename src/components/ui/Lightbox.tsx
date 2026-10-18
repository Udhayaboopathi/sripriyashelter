"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface LightboxProps {
  images: { image: ImageAsset; title?: string }[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Accessible lightbox: Esc closes, arrow keys navigate, focus is moved into the dialog. */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(open);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, go]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.title ?? current.image.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-ink/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          data-testid="lightbox"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand"
          >
            <X className="size-6" />
          </button>
          {images.length > 1 ? (
            <>
              <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand sm:left-6">
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand sm:right-6">
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}
          <motion.figure
            key={index}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[72vh] w-full">
              <Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {current.title ?? current.image.alt}
              <span className="ml-3 text-white/50">
                {(index ?? 0) + 1} / {images.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
