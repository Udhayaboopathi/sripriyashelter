import type { GalleryCategory, GalleryItem } from "@/types/content";
import { siteAssets } from "@/data/assets";

const { office, home, roseland, individualHouse } = siteAssets;

/** Gallery items and captions exactly as on https://www.sripriyashelter.com/gallery */
export const galleryItems: GalleryItem[] = [
  { image: office.conference, title: "Sripriya Shelter Conference Room", category: "Office" },
  { image: office.reception, title: "Sripriya Shelter Reception Area", category: "Office" },
  { image: office.main, title: "Sripriya Shelter Main Office", category: "Office" },
  { image: office.workspace, title: "Sripriya Shelter Workspace", category: "Office" },
  { image: individualHouse.elevation, title: "Premium Residential Project", category: "Projects" },
  { image: roseland.elevation, title: "Modern Apartment Complex", category: "Projects" },
  { image: home.residentialElevation, title: "Modern Elevation Design", category: "Projects" },
  { image: individualHouse.elevation, title: "Luxury Home Exterior", category: "Projects" },
  { image: home.nightViewResidence, title: "Night View Residence", category: "Projects" },
  { image: home.entranceStaircase, title: "Elegant Entrance Design", category: "Projects" },
  { image: roseland.floorPlan02, title: "2 BHK Floor Plan - 850 Sqft", category: "Floor Plans" },
  { image: roseland.floorPlan06, title: "3 BHK Floor Plan - 1105 Sqft", category: "Floor Plans" },
];

export const galleryCategories: ("All" | GalleryCategory)[] = ["All", "Office", "Projects", "Floor Plans"];

export const galleryClosingNote =
  "Our gallery showcases the dedication and craftsmanship that goes into every Sripriya Shelter project. From modern office spaces to premium residential developments, each image tells a story of quality and excellence.";
