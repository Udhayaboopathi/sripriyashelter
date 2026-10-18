"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/types/content";
import { cn } from "@/lib/cn";

interface LazyVideoProps {
  video: VideoAsset;
  className?: string;
  /** Ambient clips autoplay muted + loop while visible; otherwise the poster shows until `playing`. */
  ambient?: boolean;
  playing?: boolean;
  controls?: boolean;
  onEnded?: () => void;
}

/**
 * Lazy video: nothing but the poster is requested until the element is near the
 * viewport (`preload="none"` + IntersectionObserver). Ambient clips pause when
 * scrolled away and never autoplay under prefers-reduced-motion.
 */
export function LazyVideo({ video, className, ambient = false, playing = false, controls = false, onEnded }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        if (!ambient || reduce) return;
        if (entry.isIntersecting) el.play().catch(() => undefined);
        else el.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ambient]);

  useEffect(() => {
    const el = ref.current;
    if (!el || ambient) return;
    if (playing) el.play().catch(() => undefined);
    else el.pause();
  }, [playing, ambient]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={video.poster}
      src={near || playing ? video.src : undefined}
      preload="none"
      muted
      playsInline
      loop={ambient}
      controls={controls}
      onEnded={onEnded}
      aria-label={video.title}
      data-dummy-media="true"
    />
  );
}
