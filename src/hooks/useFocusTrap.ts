"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0,
  );
}

/**
 * Keeps keyboard focus inside a modal while `active`: Tab / Shift+Tab wrap
 * around, focus that escapes is pulled back, and the previously focused
 * element gets focus again when the modal closes.
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  { initialFocus = true } = {},
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => {
      const root = ref.current;
      if (initialFocus && root && !root.contains(document.activeElement))
        focusables(root)[0]?.focus({ preventScroll: true });
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = ref.current;
      if (!root) return;
      const items = focusables(root);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (!current || !root.contains(current)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey, true);
      if (previous && document.contains(previous))
        previous.focus({ preventScroll: true });
    };
  }, [active, initialFocus]);
  return ref;
}
