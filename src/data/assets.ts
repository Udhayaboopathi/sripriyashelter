import type { ImageAsset } from "@/types/content";

/**
 * Central asset registry. Every image is a first-party asset downloaded from
 * https://www.sripriyashelter.com/assets/* (see docs/asset-inventory.md).
 * Large originals were resized to max 2400px (aspect ratio preserved) and EXIF-rotated.
 */
const ORIGIN = "https://www.sripriyashelter.com/assets/";

function asset(src: string, width: number, height: number, alt: string, original: string): ImageAsset {
  return { src: `/images/${src}`, width, height, alt, source: ORIGIN + original };
}

export const siteAssets = {
  brand: {
    logoMark: asset("brand/sripriya-logo-mark-256.png", 256, 256, "Sripriya Shelter logo", "../favicon.ico"),
  },
  home: {
    residentialElevation: asset("home/residential-elevation.jpg", 1824, 1743, "Modern residential elevation by Sripriya Shelter", "project-5-3e6ITNY3.png"),
    nightViewResidence: asset("home/night-view-residence.jpg", 1440, 1920, "Night view of a Sripriya Shelter residence entrance", "project-7-Csvatah_.jpeg"),
    entranceStaircase: asset("home/entrance-staircase.jpg", 1440, 1920, "Elegant entrance and staircase design", "project-8-DTJl7_UO.jpeg"),
  },
  office: {
    conference: asset("office/office-conference-room.jpg", 1920, 1280, "Sripriya Shelter conference room", "office-1-DuIZ299h.jpg"),
    reception: asset("office/office-reception.jpg", 1920, 1280, "Sripriya Shelter reception area", "office-2-WR0mLHJq.jpg"),
    main: asset("office/office-main.jpg", 1920, 1280, "Sripriya Shelter main office", "office-3-BzZt2gjP.jpg"),
    workspace: asset("office/office-workspace.jpg", 1920, 1280, "Sripriya Shelter workspace", "office-4-D86GLKsL.jpg"),
  },
  team: {
    founder: asset("team/u-nethaji-founder.jpg", 1600, 2400, "U. Nethaji, Founder of Sripriya Shelter", "founder-DQozKT9G.jpg"),
    ceo: asset("team/un-srinath-ceo.jpg", 1600, 2400, "UN. Srinath, CEO of Sripriya Shelter", "srinath-DkjA6hlx.jpg"),
  },
  roseland: {
    elevation: asset("projects/roseland/roseland-elevation.jpg", 2260, 2160, "RoseLand elevation, Shankar Nagar, Pammal", "ELEVATION%20FINAL%20VIEW-C_BJbl94.png"),
    locationMap: asset("projects/roseland/roseland-location-map.png", 966, 772, "RoseLand location map", "map-D6f2gh5A.png"),
    parkingPlan: asset("projects/roseland/roseland-parking-plan.png", 823, 800, "RoseLand stilt parking plan", "PARKING-CE6pQFTf.png"),
    floorPlan01: asset("projects/roseland/roseland-floor-plan-01.jpg", 1600, 999, "RoseLand floor plan 1", "Elevation-CJYQgUj2.jpeg"),
    floorPlan02: asset("projects/roseland/roseland-floor-plan-02.jpg", 1273, 1351, "RoseLand floor plan 2 (published as 2 BHK, 850 sq.ft)", "Elevation2-4YSTgPOT.jpeg"),
    floorPlan03: asset("projects/roseland/roseland-floor-plan-03.jpg", 1273, 1351, "RoseLand floor plan 3", "Elevation3-8otezMO6.jpeg"),
    floorPlan04: asset("projects/roseland/roseland-floor-plan-04.jpg", 1273, 1351, "RoseLand floor plan 4", "Elevation4-CHtbU2W6.jpeg"),
    floorPlan05: asset("projects/roseland/roseland-floor-plan-05.jpg", 1273, 1351, "RoseLand floor plan 5", "Elevation5-Bi9xMfA-.jpeg"),
    floorPlan06: asset("projects/roseland/roseland-floor-plan-06.jpg", 1273, 1351, "RoseLand floor plan 6 (published as 3 BHK, 1105 sq.ft)", "floorplan-2-DdjCpzyz.jpeg"),
  },
  individualHouse: {
    elevation: asset("projects/individual-house/individual-house-elevation.jpg", 1600, 1466, "Individual House elevation, Chennai", "project-6-Cw0gqZ7F.jpeg"),
    site01: asset("projects/individual-house/individual-house-site-01.jpg", 2400, 1800, "Individual House front at night", "site-WFWtsfLC.jpeg"),
    site02: asset("projects/individual-house/individual-house-site-02.jpg", 1800, 2400, "Individual House entrance gate", "site2-LK5EnQuj.jpeg"),
    site03: asset("projects/individual-house/individual-house-site-03.jpg", 2400, 1800, "Individual House parking and entrance", "site3-CYlTJXwZ.jpeg"),
    site04: asset("projects/individual-house/individual-house-site-04.jpg", 1800, 2400, "Individual House staircase", "site4-CXrLsps2.jpeg"),
    site05: asset("projects/individual-house/individual-house-site-05.jpg", 1800, 2400, "Individual House living room", "site5-aKxtmJxT.jpeg"),
  },
} as const;
