import type { Project, ProjectStatus } from "@/types/content";
import { siteAssets } from "@/data/assets";

const r = siteAssets.roseland;
const ih = siteAssets.individualHouse;

/**
 * Project data transcribed verbatim from the original project pages:
 *  - https://www.sripriyashelter.com/projects/sripriya-RoseLand
 *  - https://www.sripriyashelter.com/projects/sripriya-Individual-house
 * Items the original does not publish are `null` and flagged `needs-content`.
 */
export const projects: Project[] = [
  {
    slug: "sripriya-roseland",
    legacySlugs: ["sripriya-RoseLand"],
    title: "RoseLand",
    location: "Shankar nagar, Pammal, Chennai",
    status: "ongoing",
    summary: "2 & 3 BHK apartments with modern amenities, designed for comfortable living.",
    overview: [
      "ROSELAND by Sripriya Shelter is a boutique residential project nestled in the serene enclave of Shankar Nagar, Pammal. Inspired by the timeless charm of the rose, this development harmoniously blends luxury, tranquility, and thoughtful design. With just 8 exclusive residences offering 2 & 3 BHK premium units, ROSELAND ensures a personalized living experience centered on privacy and comfort.",
      "Each home is meticulously crafted to embody refined aesthetics and functional layouts, making it the perfect retreat for modern families who seek peace without compromising on connectivity.",
      "Steeped in design: Living in a Roseland is a matter of pride. The campus is impressive to look at from any angle, be it a bird’s eye view, frontal view, or even as a site plan. Convenience and ample space mark the common areas. Etched in the floor plan of every house, you will find attention to detail, care in the layout, care in the fixtures, and materials.",
    ],
    heroImage: r.elevation,
    price: "₹69 Lakhs Onwards",
    facts: [
      { label: "Units", value: "8 Units", contentStatus: "verified" },
      { label: "Size", value: "860-1420 sq.ft", contentStatus: "verified" },
      { label: "Configuration", value: "2 & 3 BHK", contentStatus: "verified" },
      { label: "Status", value: "Ongoing", contentStatus: "verified" },
    ],
    amenities: ["Covered Parking", "Ev-Charging point", "Video Door phone", "CCTV", "Potale Water", "100% Vaasthu Compliance", "Red Bricks"],
    gallery: [r.elevation, r.locationMap, r.floorPlan01, r.parkingPlan, r.floorPlan02, r.floorPlan03, r.floorPlan04, r.floorPlan05, r.floorPlan06],
    plans: [
      { id: "floor-plans", label: "Floor Plans", images: [r.floorPlan01, r.floorPlan02, r.floorPlan03, r.floorPlan04, r.floorPlan05, r.floorPlan06] },
      { id: "parking", label: "Parking Plan", images: [r.parkingPlan] },
      { id: "location-map", label: "Location Map", images: [r.locationMap] },
      { id: "elevation", label: "Elevation", images: [r.elevation] },
    ],
    brochure: {
      viewUrl: "https://drive.google.com/file/d/1gJnHOp09qM4iNpyQVtBUDfChjldbPGzN/view?usp=sharing",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1gJnHOp09qM4iNpyQVtBUDfChjldbPGzN",
    },
    locationMap: r.locationMap,
    seo: {
      title: "RoseLand – Overview, Amenities & Floor Plans",
      description:
        "RoseLand by Sripriya Shelter: 8 exclusive 2 & 3 BHK residences (860-1420 sq.ft) in Shankar Nagar, Pammal, Chennai. ₹69 Lakhs onwards.",
    },
    contentNotes: [
      "Original publishes 'Potale Water' (likely 'Potable Water'), kept verbatim pending client confirmation.",
      "Detailed specifications and RERA registration are not published on the original site.",
    ],
  },
  {
    slug: "sripriya-individual-house",
    legacySlugs: ["sripriya-Individual-house"],
    title: "Individual House",
    location: "Chennai",
    status: "completed",
    summary: "Premium 2 & 3 BHK apartments with world-class amenities, designed for modern families seeking luxury and comfort.",
    overview: [
      "This project is designed with maximum ventilation, functional layouts, and modern architecture. Built with high-quality materials, it offers peaceful living along with essential lifestyle amenities.",
      "Sripriya Gardens offers an exclusive collection of independent villas nestled amidst nature. Located near Electronic City, this gated community provides the perfect balance between urban convenience and peaceful living.",
    ],
    heroImage: ih.elevation,
    price: "₹2Cr",
    facts: [
      { label: "Units", value: "1", contentStatus: "verified" },
      { label: "Size", value: "2400 sq.ft", contentStatus: "verified" },
      { label: "Location", value: "Chennai", contentStatus: "verified" },
      { label: "Status", value: "Completed", contentStatus: "verified" },
    ],
    amenities: ["Private Parking", "Private Gardens", "CCTV", "Fiber Connectivity"],
    gallery: [ih.elevation, ih.site01, ih.site02, ih.site03, ih.site04, ih.site05],
    plans: [],
    brochure: null,
    locationMap: null,
    seo: {
      title: "Individual House – Overview, Amenities & Floor Plans",
      description: "Individual House by Sripriya Shelter, Chennai: a completed 2400 sq.ft independent home with private parking, private gardens, CCTV and fiber connectivity.",
    },
    contentNotes: [
      "Card summary and second overview paragraph (Sripriya Gardens / Electronic City) appear to be template copy on the original; kept verbatim and flagged for client review.",
      "No floor plan, brochure or exact address is published for this project.",
    ],
  },
];

export const projectStatusLabel: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  upcoming: "Upcoming",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function findProjectByLegacySlug(slug: string): Project | undefined {
  return projects.find((p) => p.legacySlugs.includes(slug));
}
