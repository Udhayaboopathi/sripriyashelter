import type { NavItem } from "@/types/content";

/** Primary navigation, matching the original site's header order. */
export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer "Quick Links" column, as published on the original site. */
export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];
