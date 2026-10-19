"use client";

import { AnimatePresence, m } from "motion/react";
import { X } from "lucide-react";
import type { VideoAsset } from "@/types/content";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/** Fullscreen player used by the walkthrough band and testimonial cards. */
export function VideoModal({ video, onClose }: { video: VideoAsset | null; onClose: () => void }) {
  useEscapeKey(Boolean(video), onClose);
  useLockBodyScroll(Boolean(video));
  const trapRef = useFocusTrap<HTMLDivElement>(Boolean(video));
  return (
    <AnimatePresence>
      {video ? (
        <m.div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <m.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            data-testid="video-modal"
            className="relative w-full max-w-[1100px]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={onClose} aria-label="Close video" className="absolute -top-14 right-0 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand">
              <X className="size-5" />
            </button>
            <video className="max-h-[80vh] w-full rounded-[16px] bg-black" style={{ aspectRatio: `${video.width} / ${video.height}` }} src={video.src} poster={video.poster} controls autoPlay muted playsInline loop />
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
