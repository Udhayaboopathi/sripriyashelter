/** Content status flags make gaps explicit instead of inventing data. */
export type ContentStatus = "verified" | "needs-content" | "needs-verification" | "dummy";

/** Licence/provenance for third-party stock media used as dummy content. */
export interface MediaCredit {
  provider: "Pexels" | "Mixkit";
  /** Page the asset was downloaded from. */
  url: string;
  license: "Pexels License" | "Mixkit Stock Video Free License";
}

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** URL the asset was downloaded from (original site, or stock provider page). */
  source: string;
  /** True for stock/sample media that must be replaced before launch. */
  isDummy?: boolean;
  credit?: MediaCredit;
}

export interface VideoAsset {
  src: string;
  /** Poster frame shown until the clip is in view / played. */
  poster: string;
  width: number;
  height: number;
  title: string;
  isDummy: true;
  credit: MediaCredit;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export interface ProjectFact {
  label: string;
  value: string | null;
  contentStatus: ContentStatus;
}

export interface Brochure {
  viewUrl: string;
  downloadUrl: string;
}

export interface PlanTab {
  id: string;
  label: string;
  images: ImageAsset[];
}

export interface Project {
  slug: string;
  /** Legacy slugs used on the original site, redirected to `slug`. */
  legacySlugs: string[];
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  overview: string[];
  heroImage: ImageAsset;
  facts: ProjectFact[];
  price: string | null;
  amenities: string[];
  gallery: ImageAsset[];
  plans: PlanTab[];
  brochure: Brochure | null;
  locationMap: ImageAsset | null;
  seo: { title: string; description: string };
  contentNotes: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  contentStatus: ContentStatus;
}

export type GalleryCategory = "Office" | "Projects" | "Floor Plans";

export interface GalleryItem {
  image: ImageAsset;
  title: string;
  category: GalleryCategory;
}
