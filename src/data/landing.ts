import type { ImageAsset, Project } from "@/types/content";
import type { Approval, LandingContent, SpecCategory, VideoTestimonial } from "@/types/landing";
import { siteAssets } from "@/data/assets";
import { stockImages as s, stockVideos as v } from "@/data/stock";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { aboutContent, homeContent } from "@/data/content";
import { galleryItems } from "@/data/gallery";
import { getProject } from "@/data/projects";

/*
 * Landing-page content for Home and each project page, in the reference section order.
 *
 * Content rules:
 *  - Real Sripriya content (copy, photos, prices, contact details) is used wherever it exists.
 *  - Everything else is SAMPLE content flagged `isDummy: true` (text) or carried by stock media
 *    whose ImageAsset/VideoAsset has `isDummy: true`. All of it is listed in docs/missing-content.md
 *    under "Replace before launch". Sample approval numbers are deliberately obvious placeholders
 *    (TN/XX/Building/XXXX/2026) so they can never be mistaken for a real registration.
 */

const founder = aboutContent.leadership.people[0];
const roseland = getProject("sripriya-roseland")!;
const individualHouse = getProject("sripriya-individual-house")!;

const mapsSearch = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const mapsEmbed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed`;

/* ---------------------------------------------------------------- shared samples */

/** SAMPLE specifications — generic Chennai residential spec sheet, not supplied by the client. */
function sampleSpecs(kind: "apartment" | "house"): SpecCategory[] {
  const apartment = kind === "apartment";
  return [
    { id: "structure", label: "Structure", icon: "building", isDummy: true, items: [
      { label: "Framing", value: "RCC framed structure designed for Seismic Zone III" },
      { label: "Walls", value: "9\" outer and 4.5\" inner walls in first-class red brick" },
      { label: "Foundation", value: "Isolated / combined footing as per structural design" },
      { label: "Ceiling Height", value: "10 ft floor-to-floor" },
    ] },
    { id: "flooring", label: "Tiling Works", icon: "grid", isDummy: true, items: [
      { label: "Living & Bedrooms", value: "2' x 4' double-charged vitrified tiles" },
      { label: "Toilets & Balcony", value: "Anti-skid ceramic floor tiles" },
      { label: "Toilet Walls", value: "Glazed ceramic wall tiles up to 7 ft" },
      { label: apartment ? "Staircase & Lobby" : "Staircase", value: "Granite with polished finish" },
      { label: "Terrace", value: "Weathering course with heat-reflective tiles" },
    ] },
    { id: "doors", label: "Doors & Windows", icon: "door", isDummy: true, items: [
      { label: "Main Door", value: "Teak wood frame with teak-finish designer shutter" },
      { label: "Internal Doors", value: "Hardwood frames with flush shutters, laminated both sides" },
      { label: "Windows", value: "UPVC sliding windows with mosquito mesh" },
      { label: "Grills", value: "MS safety grills, enamel painted" },
    ] },
    { id: "kitchen", label: "Kitchen", icon: "chef", isDummy: true, items: [
      { label: "Counter", value: "Polished granite platform with stainless-steel sink" },
      { label: "Dado", value: "Glazed tiles 2 ft above the counter" },
      { label: "Provisions", value: "Points for water purifier, chimney and refrigerator" },
    ] },
    { id: "sanitary", label: "CP & Sanitary", icon: "shower", isDummy: true, items: [
      { label: "Sanitaryware", value: "Branded wall-mounted EWC and wash basin" },
      { label: "CP Fittings", value: "Chrome-plated single-lever fittings" },
      { label: "Hot Water", value: "Geyser provision in all bathrooms" },
    ] },
    { id: "paint", label: "Paint", icon: "paint", isDummy: true, items: [
      { label: "Interior", value: "Two coats of putty with premium emulsion" },
      { label: "Exterior", value: "Weatherproof exterior emulsion" },
      { label: "Doors & Grills", value: "Enamel paint finish" },
    ] },
    { id: "electrical", label: "Electrical", icon: "plug", isDummy: true, items: [
      { label: "Wiring", value: "Concealed fire-retardant copper wiring" },
      { label: "Switches", value: "Branded modular switches" },
      { label: "AC Points", value: "Living room and all bedrooms" },
      { label: "Power Backup", value: apartment ? "Generator backup for lift, pumps and common lighting" : "Inverter provision for lights and fans" },
    ] },
    { id: "services", label: apartment ? "Building Services" : "Water & Services", icon: "droplet", isDummy: true, items: [
      { label: "Water Supply", value: "Borewell with underground sump and overhead tank" },
      { label: "Rainwater Harvesting", value: "As per CMDA norms" },
      ...(apartment ? [{ label: "Lift", value: "Automatic passenger lift" }] : [{ label: "Compound", value: "Compound wall with MS gate" }]),
      { label: "Security", value: "CCTV surveillance and video door phone" },
    ] },
  ];
}

/** SAMPLE approvals — obvious placeholders, never presented as real numbers. */
function sampleApprovals(project: string): Approval[] {
  return [
    { authority: `TNRERA · ${project}`, number: "TN/XX/Building/XXXX/2026", date: "DD/MM/2026", url: "https://www.rera.tn.gov.in", isDummy: true },
    { authority: `Planning Permit · ${project}`, number: "PPA/XXXX/2026", date: "DD/MM/2026", url: "https://www.rera.tn.gov.in", isDummy: true },
  ];
}

/** The four testimonials published on the original site; videos are sample stock clips. */
const testimonialTitles = ["Exceeded Our Expectations", "Complete Transparency", "A Reliable Investment", "A Seamless Journey"];
const testimonialVideos = [v.storyHome, v.storyReading, v.storyChess, v.storyPark];
const videoTestimonials: VideoTestimonial[] = testimonials.map((t, i) => ({
  title: testimonialTitles[i],
  quote: t.quote,
  name: t.name,
  role: t.role,
  rating: t.rating,
  video: testimonialVideos[i],
  quoteStatus: "needs-verification",
  isDummy: true,
}));

const films = { title: { lead: "Step Inside", accent: "Homes Built to Last" }, items: [v.filmSuite, v.filmKitchen, v.filmBedroom, v.filmTerrace] };
const walkthrough = { video: v.walkthroughLiving, label: "Play walkthrough" };
const shorts = {
  eyebrow: "Built From the Ground Up",
  title: { lead: "Every Stage,", accent: "Done Right" },
  items: [v.shortStructure, v.shortSiteTeam, v.shortMasonry, v.shortPlanning, v.shortAerial, v.shortSunset],
};
const constructionUpdates = [s.constructionFoundation, s.constructionSlab, s.constructionTower, s.constructionBricks, s.redBrick];

const company = {
  eyebrow: "Why Sripriya Shelter?",
  title: { lead: "Building Trust Through", accent: "Quality Construction" },
  paragraphs: [founder.bio.charAt(0).toUpperCase() + founder.bio.slice(1), aboutContent.story.paragraphs[0]],
  image: founder.image,
  cta: { label: "To Learn More", href: "/about" },
};

const projectsBlock = { eyebrow: "Our Projects", title: { lead: "Building Dreams", accent: "Across Chennai" } };

function landmarkSet(names: [string, string, string, string], distances: [string, string, string, string]) {
  const videos = [v.landmarkAirport, v.landmarkRailway, v.landmarkHighway, v.landmarkMarket];
  return names.map((name, i) => ({ name, distance: distances[i], video: videos[i], isDummy: true }));
}

const galleryPhotos = (items: ImageAsset[]) => items;

/* ---------------------------------------------------------------- HOME */

export const homeLanding: LandingContent = {
  hero: {
    image: siteAssets.roseland.elevation,
    eyebrow: homeContent.hero.eyebrow,
    title: { lead: homeContent.hero.titleLead, accent: homeContent.hero.titleAccent },
    subtitle: homeContent.hero.subtitle,
    priceTag: { kicker: "RoseLand · 2 & 3 BHK", value: "₹69 L", note: "Onwards" },
    locationTag: { title: "Pammal", detail: "Shankar Nagar, Chennai" },
    stats: [...site.stats, { value: "100%", label: "Vaasthu Compliant" }],
  },
  why: {
    eyebrow: homeContent.whyChooseUs.eyebrow,
    title: { lead: "6 Reasons Families", accent: "Choose Sripriya Shelter" },
    items: [
      ...homeContent.whyChooseUs.items,
      { icon: "compass", title: "Vaasthu-Compliant Planning", text: "Layouts are planned around Vaasthu principles, light and cross-ventilation so every home feels right from day one.", image: siteAssets.home.residentialElevation, isDummy: true },
      { icon: "map-pin", title: "Well-Connected Locations", text: "We build in established South Chennai neighbourhoods close to transit, schools, hospitals and daily needs.", image: s.chennaiAerial, isDummy: true },
    ],
  },
  terrace: { title: { lead: "Rooted in", accent: "South Chennai" }, image: s.chennaiSkyline },
  overview: {
    image: siteAssets.office.main,
    badge: "Since 2008 · Chennai",
    progress: { percent: 45, label: "RoseLand Progress", isDummy: true },
    eyebrow: "Company Overview",
    title: { lead: "Sripriya", accent: "Shelter" },
    paragraphs: homeContent.about.paragraphs,
    stats: site.stats.map((st, i) => ({ icon: ["calendar", "building", "users"][i], value: st.value, label: st.label })),
    brochureHref: roseland.brochure?.viewUrl ?? null,
  },
  location: {
    eyebrow: "Location",
    title: { lead: "Visit Our Office", accent: "in Pallavaram" },
    description: `Our office is ${site.address.landmark.toLowerCase()} — easy to reach from GST Road, the airport and Pallavaram station.`,
    placeName: site.name,
    address: [...site.address.lines],
    directionsUrl: site.directionsUrl,
    mapEmbedUrl: site.mapEmbedUrl,
    landmarksTitle: { lead: "How close is", accent: "everything, really?" },
    landmarks: landmarkSet(["Chennai Airport", "Pallavaram Railway Station", "GST Road", "Pallavaram Market"], ["4.5 km", "1.5 km", "1 km", "0.2 km"]),
  },
  films,
  walkthrough,
  shorts,
  bigText: { image: siteAssets.individualHouse.site01, words: "SRIPRIYA SHELTER" },
  gallery: {
    eyebrow: "Our Gallery",
    title: { lead: "See Our Work", accent: "Up Close" },
    description: "Our projects, spaces, and milestones captured beautifully.",
    items: galleryPhotos(galleryItems.filter((g) => g.category !== "Floor Plans").map((g) => g.image)),
    updates: { eyebrow: "Updates", title: "RoseLand Site Progress", date: "Oct 2026", description: "Watch RoseLand take shape, stage by stage.", items: constructionUpdates, isDummy: true },
  },
  amenities: {
    eyebrow: "Amenities",
    title: { lead: "Thoughtful amenities", accent: "for everyday living" },
    items: [
      { name: "Covered Parking", image: s.amenityParking },
      { name: "EV Charging Point", image: s.amenityEvCharging },
      { name: "Video Door Phone", image: s.amenityVideoDoorPhone },
      { name: "CCTV Surveillance", image: s.amenityCctv },
      { name: "Potable Water", image: s.amenityPotableWater },
      { name: "100% Vaasthu", image: siteAssets.roseland.elevation },
      { name: "Red Brick Walls", image: s.redBrick },
      { name: "Private Gardens", image: s.amenityGarden },
      { name: "Fiber Connectivity", image: s.livingRoom3 },
      { name: "Passenger Lift", image: s.amenityLift, isDummy: true },
      { name: "Entrance Lobby", image: s.amenityLobby, isDummy: true },
      { name: "Rooftop Sit-out", image: s.rooftopSitOut, isDummy: true },
      { name: "Solar Panels", image: s.amenitySolar, isDummy: true },
      { name: "Landscaped Courtyard", image: s.amenityCourtyard, isDummy: true },
      { name: "Kids' Play Area", image: s.amenityKidsPlay, isDummy: true },
      { name: "Fitness Centre", image: s.amenityGym, isDummy: true },
      { name: "Yoga Deck", image: s.amenityYoga, isDummy: true },
      { name: "Jogging Track", image: s.amenityJogging, isDummy: true },
    ],
  },
  specs: { eyebrow: "Specifications", title: { lead: "Built for", accent: "Perfect Living" }, description: "The construction standards we follow in every Sripriya Shelter home.", categories: sampleSpecs("apartment") },
  approvals: sampleApprovals("RoseLand"),
  testimonials: { eyebrow: homeContent.testimonials.eyebrow, title: { lead: "Our Happy Clients", accent: "Say About Us" }, description: homeContent.testimonials.description, items: videoTestimonials },
  company,
  contact: { eyebrow: "Contact Us", title: { lead: "Let's talk about your", accent: "dream home." }, image: siteAssets.home.residentialElevation, interestOptions: ["RoseLand – 2 BHK", "RoseLand – 3 BHK", "Individual House", "Custom Home Construction"] },
  projects: projectsBlock,
};

/* ---------------------------------------------------------------- PROJECTS */

const roselandLanding: LandingContent = {
  hero: {
    image: roseland.heroImage,
    eyebrow: "Ongoing · Shankar Nagar, Pammal",
    title: { lead: "Sripriya", accent: "RoseLand" },
    subtitle: roseland.summary,
    priceTag: { kicker: "2 & 3 BHK Apartments", value: "₹69 L", note: "Onwards" },
    locationTag: { title: "Pammal", detail: "Shankar Nagar, Chennai" },
    stats: [
      { value: "8", label: "Exclusive Units" },
      { value: "2 & 3", label: "BHK Homes" },
      { value: "860–1420", label: "Sq.ft" },
      { value: "100%", label: "Vaasthu" },
    ],
  },
  why: {
    eyebrow: "Why RoseLand?",
    title: { lead: "6 Things That Make", accent: "RoseLand Special" },
    items: [
      { icon: "home", title: "Only 8 Exclusive Residences", text: "A boutique community of just 8 homes, so you enjoy privacy, quiet and a close-knit neighbourhood.", image: roseland.heroImage },
      { icon: "compass", title: "100% Vaasthu Compliant", text: "Every 2 & 3 BHK layout follows Vaasthu principles for light, ventilation and positive energy.", image: siteAssets.roseland.floorPlan02 },
      { icon: "brick", title: "Built With Red Bricks", text: "Traditional red-brick walls keep interiors cooler and stand up to Chennai's climate for decades.", image: s.redBrick, isDummy: true },
      { icon: "car", title: "Covered & EV-Ready Parking", text: "Covered stilt parking with an EV charging point, ready for the way Chennai will drive next.", image: s.amenityEvCharging, isDummy: true },
      { icon: "shield", title: "CCTV & Video Door Phone", text: "CCTV surveillance and a video door phone at every home for round-the-clock peace of mind.", image: s.amenityCctv, isDummy: true },
      { icon: "map-pin", title: "Well-Connected Pammal", text: "Minutes from GST Road, Pallavaram and the airport, with schools and daily needs close by.", image: s.chennaiAerial, isDummy: true },
    ],
  },
  terrace: { title: { lead: "View From", accent: "the Terrace" }, image: s.rooftopTerrace },
  overview: {
    image: roseland.heroImage,
    badge: "Ongoing Project",
    progress: { percent: 45, label: "Project Completed", isDummy: true },
    eyebrow: "Project Overview",
    title: { lead: "Sripriya", accent: "RoseLand" },
    price: { value: "₹69 Lakhs*", note: "Onwards" },
    paragraphs: [roseland.overview[0]],
    stats: [
      { icon: "bed", value: "2 & 3 BHK", label: "Configuration" },
      { icon: "ruler", value: "860–1420", label: "Sq.ft" },
      { icon: "building", value: "8 Units", label: "Exclusive" },
    ],
    brochureHref: roseland.brochure?.viewUrl ?? null,
  },
  location: {
    eyebrow: "Location",
    title: { lead: "RoseLand", accent: "Shankar Nagar, Pammal" },
    description: "Nestled in a serene enclave of Pammal, RoseLand keeps you connected to GST Road, Pallavaram and the airport.",
    placeName: "Sripriya RoseLand",
    address: [roseland.location],
    directionsUrl: mapsSearch("Shankar Nagar, Pammal, Chennai"),
    mapEmbedUrl: mapsEmbed("Shankar Nagar, Pammal, Chennai"),
    landmarksTitle: { lead: "How close is", accent: "RoseLand, really?" },
    landmarks: landmarkSet(["Chennai Airport", "Pallavaram Railway Station", "GST Road", "Pammal Market"], ["6 km", "3.5 km", "3 km", "1 km"]),
  },
  films,
  walkthrough,
  shorts,
  bigText: { image: roseland.heroImage, words: "SRIPRIYA ROSELAND" },
  gallery: {
    eyebrow: "Project Gallery",
    title: { lead: "See Our Project", accent: "Visuals" },
    description: "Elevation, floor plans and sample interiors for RoseLand's 2 & 3 BHK homes.",
    items: [roseland.heroImage, s.livingRoom2, s.kitchen, s.bedroom, s.bathroom, s.balcony, s.livingRoom],
    updates: { eyebrow: "Updates", title: "Current Status", date: "Oct 2026", description: "Watch our construction progress and see RoseLand come to life.", items: constructionUpdates, isDummy: true },
  },
  amenities: {
    eyebrow: "Amenities",
    title: { lead: "Smart amenities", accent: "for smart living" },
    items: [
      { name: "Covered Parking", image: s.amenityParking },
      { name: "EV Charging Point", image: s.amenityEvCharging },
      { name: "Video Door Phone", image: s.amenityVideoDoorPhone },
      { name: "CCTV Surveillance", image: s.amenityCctv },
      { name: "Potable Water", image: s.amenityPotableWater },
      { name: "100% Vaasthu", image: roseland.heroImage },
      { name: "Red Brick Walls", image: s.redBrick },
      { name: "Passenger Lift", image: s.amenityLift, isDummy: true },
      { name: "Entrance Lobby", image: s.amenityLobby, isDummy: true },
      { name: "Rooftop Sit-out", image: s.rooftopSitOut, isDummy: true },
      { name: "Rooftop Terrace", image: s.rooftopTerrace, isDummy: true },
      { name: "Solar Panels", image: s.amenitySolar, isDummy: true },
      { name: "Landscaped Walkway", image: s.amenityWalkway, isDummy: true },
      { name: "Kids' Play Area", image: s.amenityKidsPlay, isDummy: true },
      { name: "Indoor Games", image: s.indoorGames, isDummy: true },
    ],
  },
  specs: { eyebrow: "Specifications", title: { lead: "Built for", accent: "Perfect Living" }, description: "Uncompromising quality and attention to detail in every corner of your new home.", categories: sampleSpecs("apartment") },
  approvals: sampleApprovals("RoseLand"),
  testimonials: { eyebrow: "Testimonials", title: { lead: "Our Happy Clients", accent: "Say About Us" }, description: homeContent.testimonials.description, items: videoTestimonials },
  company,
  contact: { eyebrow: "Contact Us", title: { lead: "Let's talk about your", accent: "RoseLand home." }, image: roseland.heroImage, interestOptions: ["2 BHK", "3 BHK"], project: roseland.title },
  projects: projectsBlock,
};

const ih = siteAssets.individualHouse;
const individualHouseLanding: LandingContent = {
  hero: {
    image: individualHouse.heroImage,
    eyebrow: "Completed · Chennai",
    title: { lead: "Sripriya", accent: "Individual House" },
    subtitle: "A completed 2400 sq.ft independent home designed for ventilation, functional layouts and modern living.",
    priceTag: { kicker: "Independent House", value: "₹2 Cr", note: "Completed" },
    locationTag: { title: "Chennai", detail: "Tamil Nadu" },
    stats: [
      { value: "2400", label: "Sq.ft" },
      { value: "1", label: "Exclusive Home" },
      { value: "100%", label: "Completed" },
      { value: "24/7", label: "CCTV Secured" },
    ],
  },
  why: {
    eyebrow: "Why This Home?",
    title: { lead: "6 Things That Make", accent: "This Home Special" },
    items: [
      { icon: "ruler", title: "2400 sq.ft of Living Space", text: "Generous rooms across two levels give every member of the family space to grow.", image: ih.elevation },
      { icon: "wind", title: "Designed for Ventilation", text: "Maximum ventilation and functional layouts keep the home bright, airy and naturally cool.", image: ih.site05 },
      { icon: "car", title: "Private Parking", text: "Dedicated covered parking right at your doorstep, secured behind your own gate.", image: ih.site03 },
      { icon: "leaf", title: "Private Garden", text: "Your own green corner for morning coffee, weekend gatherings and kitchen herbs.", image: s.amenityGarden, isDummy: true },
      { icon: "shield", title: "CCTV Surveillance", text: "CCTV coverage around the property for round-the-clock peace of mind.", image: s.amenityCctv, isDummy: true },
      { icon: "wifi", title: "Fiber Connectivity", text: "High-speed fiber connectivity ready for work-from-home, streaming and smart devices.", image: s.livingRoom3, isDummy: true },
    ],
  },
  terrace: { title: { lead: "View From", accent: "the Terrace" }, image: s.rooftopSitOut },
  overview: {
    image: ih.elevation,
    badge: "Completed Project",
    progress: { percent: 100, label: "Project Completed" },
    eyebrow: "Project Overview",
    title: { lead: "Individual", accent: "House" },
    price: { value: "₹2 Cr", note: "Price as published" },
    paragraphs: [individualHouse.overview[0]],
    stats: [
      { icon: "home", value: "1 Unit", label: "Independent" },
      { icon: "ruler", value: "2400", label: "Sq.ft" },
      { icon: "map-pin", value: "Chennai", label: "Location" },
    ],
    brochureHref: null,
  },
  location: {
    eyebrow: "Location",
    title: { lead: "Individual House", accent: "Chennai" },
    description: "A completed independent home in Chennai, close to the city's key transit corridors and everyday conveniences.",
    placeName: "Sripriya Individual House",
    address: ["Chennai, Tamil Nadu"],
    directionsUrl: site.directionsUrl,
    mapEmbedUrl: site.mapEmbedUrl,
    landmarksTitle: { lead: "How close is", accent: "everything, really?" },
    landmarks: landmarkSet(["Chennai Airport", "Railway Station", "GST Road", "Local Market"], ["8 km", "3 km", "2 km", "1 km"]),
  },
  films,
  walkthrough,
  shorts,
  bigText: { image: ih.site01, words: "INDIVIDUAL HOUSE" },
  gallery: {
    eyebrow: "Project Gallery",
    title: { lead: "See Our Project", accent: "Visuals" },
    description: "Photographs of the completed Individual House by Sripriya Shelter.",
    items: [ih.elevation, ih.site01, ih.site02, ih.site03, ih.site04, ih.site05],
    updates: { eyebrow: "Updates", title: "Handover Snapshots", date: "Completed", description: "The finished home, ready for its family.", items: [ih.site01, ih.site03, ih.site02, ih.site04, ih.site05] },
  },
  amenities: {
    eyebrow: "Features",
    title: { lead: "Smart features", accent: "for smart living" },
    items: [
      { name: "Private Parking", image: ih.site03 },
      { name: "Private Garden", image: s.amenityGarden },
      { name: "CCTV Surveillance", image: s.amenityCctv },
      { name: "Fiber Connectivity", image: s.livingRoom3 },
      { name: "Grand Entrance", image: ih.site02 },
      { name: "Feature Staircase", image: ih.site04 },
      { name: "Spacious Living", image: ih.site05 },
      { name: "Modular Kitchen", image: s.openKitchen, isDummy: true },
      { name: "Master Bedroom", image: s.masterBedroom, isDummy: true },
      { name: "Designer Bathrooms", image: s.bathroom2, isDummy: true },
      { name: "Rooftop Sit-out", image: s.rooftopSitOut, isDummy: true },
      { name: "Solar Panels", image: s.amenitySolar, isDummy: true },
      { name: "Video Door Phone", image: s.amenityVideoDoorPhone, isDummy: true },
      { name: "EV Charging Point", image: s.amenityEvCharging, isDummy: true },
      { name: "Red Brick Walls", image: s.redBrick, isDummy: true },
    ],
  },
  specs: { eyebrow: "Specifications", title: { lead: "Built for", accent: "Perfect Living" }, description: "Uncompromising quality and attention to detail in every corner of the home.", categories: sampleSpecs("house") },
  approvals: sampleApprovals("Individual House"),
  testimonials: { eyebrow: "Testimonials", title: { lead: "Our Happy Clients", accent: "Say About Us" }, description: homeContent.testimonials.description, items: videoTestimonials },
  company,
  contact: { eyebrow: "Contact Us", title: { lead: "Let's talk about your", accent: "dream home." }, image: ih.site01, interestOptions: ["Individual House", "Custom Home Construction"], project: individualHouse.title },
  projects: projectsBlock,
};

const projectLandings: Record<string, LandingContent> = {
  [roseland.slug]: roselandLanding,
  [individualHouse.slug]: individualHouseLanding,
};

export function getProjectLanding(project: Project): LandingContent | undefined {
  return projectLandings[project.slug];
}

/** Indicative floor plan drawn for the Individual House (client has not supplied one). */
export const sampleFloorPlan: ImageAsset = {
  src: "/images/samples/individual-house-sample-floor-plan.svg",
  width: 1280,
  height: 900,
  alt: "Indicative ground and first floor layout for the Individual House",
  source: "Drawn for this rebuild (sample)",
  isDummy: true,
};
