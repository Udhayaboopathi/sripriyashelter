"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors the reference header: fixed, hides while scrolling down past a
 * threshold and slides back in when the user scrolls up.
 */
export function useScrollDirection(threshold = 200) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > threshold);
        lastY = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hidden, scrolled };
}
