import type { ContentStatus } from "@/types/content";

/**
 * Company details. Source: visible header/footer/contact page of
 * https://www.sripriyashelter.com/ (inspected 18 Oct 2026).
 */
export const site = {
  name: "Sripriya Shelter",
  nameParts: ["Sripriya", "Shelter"] as const,
  tagline: "Quality Shelters for a Better Tomorrow",
  description:
    "Building quality shelters for a better tomorrow. Your trusted partner in creating homes that stand the test of time.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sripriyashelter.com",
  phone: { display: "+91 96001 03760", href: "tel:+919600103760" },
  whatsapp: {
    href: "https://wa.me/919962863133?text=Hello!%20I%27m%20interested%20in%20your%20residential%20projects.",
    label: "Chat on WhatsApp",
  },
  email: { display: "sripriyashelters@gmail.com", href: "mailto:sripriyashelters@gmail.com" },
  address: {
    lines: ["No.5/122-A, Khaji Shahib Street, C. Pallavaram,", "Chennai – 600043."],
    landmark: "Near Poorvika Mobile, Pallavaram Market",
    street: "No. 5/122-A, Khaji Shahib Street, C. Pallavaram",
    locality: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600043",
    country: "IN",
  },
  hours: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.006278448545!2d80.1441741!3d12.969394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f9fa422e527:0xe0c215d5ac1ca52b!2sSripriya%20Shelter!5e0!3m2!1sen!2sin!4v1733750000000",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Sripriya+Shelter+C.+Pallavaram+Chennai+600043",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/sripriyashelter?igsh=ZmZrcW9jdXFqZDNq", network: "instagram" as const },
  ],
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "4+", label: "Projects Delivered" },
    { value: "200+", label: "Happy Families" },
  ],
  credit: { label: "Justmarketing", href: "https://www.instagram.com/stylojustmarketing?igsh=cXRoeDk5dWNxdGE4" },
  legal: {
    privacyPolicy: { href: null as string | null, contentStatus: "needs-content" as ContentStatus },
    terms: { href: null as string | null, contentStatus: "needs-content" as ContentStatus },
  },
} as const;
