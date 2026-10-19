"use client";

import { useRef } from "react";

/**
 * Minimal horizontal-swipe detector for touch / pen pointers. Spread the
 * returned handlers onto the slider track (and give it `touch-action: pan-y`
 * so vertical page scrolling keeps working while horizontal drags are ours).
 */
export function useSwipe(
  onNext: () => void,
  onPrev: () => void,
  threshold = 40,
) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  return {
    onPointerDown(e: React.PointerEvent) {
      if (e.pointerType === "mouse") return;
      start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    },
    onPointerUp(e: React.PointerEvent) {
      const s = start.current;
      start.current = null;
      if (!s || s.id !== e.pointerId) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      if (dx < 0) onNext();
      else onPrev();
    },
    onPointerCancel() {
      start.current = null;
    },
  };
}
