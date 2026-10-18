import type { ImageAsset, VideoAsset } from "@/types/content";

/**
 * Section-by-section content model mirroring the reference landing page order:
 * hero → why → terrace view → dark overview → location + landmarks → films slider →
 * walkthrough video → shorts → giant-text band → gallery + site updates → amenities →
 * specifications → approvals strip → testimonials → company split → contact → projects.
 *
 * Any field marked `isDummy: true` is sample content (text or stock media) that the
 * client must replace before launch — see docs/missing-content.md.
 */
export interface TwoToneTitle {
  lead: string;
  accent: string;
}

export interface Dummyable {
  isDummy?: boolean;
}

export interface HeroContent {
  image: ImageAsset;
  eyebrow: string;
  title: TwoToneTitle;
  subtitle: string;
  priceTag?: { kicker: string; value: string; note: string } & Dummyable;
  locationTag?: { title: string; detail: string } & Dummyable;
  stats: ({ value: string; label: string } & Dummyable)[];
}

export interface WhyPoint extends Dummyable {
  icon: string;
  title: string;
  text: string;
  image: ImageAsset;
}

export interface OverviewStat extends Dummyable {
  icon: string;
  value: string;
  label: string;
}

export interface OverviewContent {
  image: ImageAsset;
  badge: string;
  progress?: { percent: number; label: string } & Dummyable;
  eyebrow: string;
  title: TwoToneTitle;
  price?: { value: string; note: string } & Dummyable;
  paragraphs: string[];
  stats: OverviewStat[];
  brochureHref: string | null;
}

export interface Landmark extends Dummyable {
  name: string;
  distance: string;
  video: VideoAsset;
}

export interface LocationContent {
  eyebrow: string;
  title: TwoToneTitle;
  description: string;
  placeName: string;
  address: string[];
  directionsUrl: string;
  mapEmbedUrl?: string;
  mapImage?: ImageAsset;
  landmarksTitle: TwoToneTitle;
  landmarks: Landmark[];
}

export interface AmenityTile extends Dummyable {
  name: string;
  image: ImageAsset;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecCategory extends Dummyable {
  id: string;
  label: string;
  icon: string;
  items: SpecItem[];
}

export interface Approval extends Dummyable {
  authority: string;
  number: string;
  date: string;
  url: string;
}

export interface VideoTestimonial extends Dummyable {
  title: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  video: VideoAsset;
  /** Quote text verification status (the video is always sample media). */
  quoteStatus: "verified" | "needs-verification" | "dummy";
}

export interface LandingContent {
  hero: HeroContent;
  why: { eyebrow: string; title: TwoToneTitle; items: WhyPoint[] };
  terrace: { title: TwoToneTitle; image: ImageAsset };
  overview: OverviewContent;
  location: LocationContent;
  films: { title: TwoToneTitle; items: VideoAsset[] };
  walkthrough: { video: VideoAsset; label: string };
  shorts: { eyebrow: string; title: TwoToneTitle; items: VideoAsset[] };
  bigText: { image: ImageAsset; words: string };
  gallery: {
    eyebrow: string;
    title: TwoToneTitle;
    description: string;
    items: ImageAsset[];
    updates: { eyebrow: string; title: string; date: string; description: string; items: ImageAsset[] } & Dummyable;
  };
  amenities: { eyebrow: string; title: TwoToneTitle; items: AmenityTile[] };
  specs: { eyebrow: string; title: TwoToneTitle; description: string; categories: SpecCategory[] };
  approvals: Approval[];
  testimonials: { eyebrow: string; title: TwoToneTitle; description: string; items: VideoTestimonial[] };
  company: { eyebrow: string; title: TwoToneTitle; paragraphs: string[]; image: ImageAsset; cta: { label: string; href: string } };
  contact: { eyebrow: string; title: TwoToneTitle; image: ImageAsset; interestOptions: string[]; project?: string };
  projects: { eyebrow: string; title: TwoToneTitle };
}
