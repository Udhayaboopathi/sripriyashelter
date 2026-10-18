import type { ImageAsset, MediaCredit, VideoAsset } from "@/types/content";

/**
 * DUMMY STOCK MEDIA — replace before launch.
 * Every item here is free-licence stock (Pexels License / Mixkit Stock Video Free License),
 * downloaded and re-encoded locally. None of it shows Sripriya Shelter projects; it fills
 * sections the client has not supplied content for. Full list: docs/missing-content.md.
 */
const pexels = (url: string): MediaCredit => ({ provider: "Pexels", url, license: "Pexels License" });
const mixkit = (url: string): MediaCredit => ({ provider: "Mixkit", url, license: "Mixkit Stock Video Free License" });

function img(file: string, width: number, height: number, alt: string, credit: MediaCredit): ImageAsset {
  return { src: `/images/stock/${file}.jpg`, width, height, alt, source: credit.url, isDummy: true, credit };
}

function vid(file: string, width: number, height: number, title: string, credit: MediaCredit): VideoAsset {
  return { src: `/videos/${file}.mp4`, poster: `/images/stock/posters/${file}.jpg`, width, height, title, isDummy: true, credit };
}

export const stockImages = {
  amenityCctv: img("amenity-cctv", 1600, 1200, "CCTV camera mounted on a building wall", pexels("https://www.pexels.com/photo/surveillance-camera-mounted-on-the-wall-10902545/")),
  amenityKidsPlay: img("amenity-kids-play-area", 1600, 1200, "Children\u2019s play area with slides", pexels("https://www.pexels.com/photo/playground-and-modern-skyscrapers-in-distance-13766013/")),
  amenityEvCharging: img("amenity-ev-charging", 1200, 1600, "Electric vehicle charging point", pexels("https://www.pexels.com/photo/electric-car-charger-17748317/")),
  amenitySolar: img("amenity-solar-panels", 1600, 1200, "Solar panels on a building rooftop", pexels("https://www.pexels.com/photo/solar-panels-on-building-roof-19784139/")),
  amenityGym: img("amenity-gym", 1600, 960, "Fitness centre with gym equipment", pexels("https://www.pexels.com/photo/an-empty-gym-17211446/")),
  amenityCardio: img("amenity-cardio-room", 1600, 1200, "Cardio room with exercise bikes", pexels("https://www.pexels.com/photo/a-gym-interior-8933584/")),
  amenityVideoDoorPhone: img("amenity-video-door-phone", 1000, 1600, "Video door phone at an entrance", pexels("https://www.pexels.com/photo/close-up-of-entryphone-16674223/")),
  amenityLobby: img("amenity-entrance-lobby", 1600, 1116, "Entrance lobby with staircase and lift", pexels("https://www.pexels.com/photo/interior-of-modern-apartment-entrance-in-beige-color-7031880/")),
  amenityLift: img("amenity-lift", 1065, 1600, "Passenger lift", pexels("https://www.pexels.com/photo/low-angle-shot-of-modern-elevator-10738765/")),
  amenityParking: img("amenity-covered-parking", 1600, 1496, "Covered car parking", pexels("https://www.pexels.com/photo/interior-of-an-underground-car-park-7314593/")),
  amenityCourtyard: img("amenity-landscaped-courtyard", 1600, 1066, "Landscaped courtyard between residential blocks", pexels("https://www.pexels.com/photo/modern-apartment-building-with-green-courtyard-31656168/")),
  amenityGarden: img("amenity-garden", 879, 1600, "Garden in front of a residential building", pexels("https://www.pexels.com/photo/garden-in-front-of-a-residential-building-17358893/")),
  chennaiSkyline: img("chennai-skyline", 1600, 1066, "Aerial view of Chennai", pexels("https://www.pexels.com/photo/wide-shot-of-a-city-9432498/")),
  chennaiAerial: img("chennai-aerial", 1600, 1066, "Chennai rooftops near the coast", pexels("https://www.pexels.com/photo/cloudy-sky-above-buildings-near-marina-beach-8572308/")),
  livingRoom: img("interior-living-room", 1600, 1066, "Sample living room interior", pexels("https://www.pexels.com/photo/a-living-room-with-leather-couch-and-center-table-7148846/")),
  livingRoom2: img("interior-living-room-2", 1600, 1066, "Sample living room with warm decor", pexels("https://www.pexels.com/photo/modern-cozy-living-room-with-stylish-decor-33452539/")),
  livingRoom3: img("interior-living-room-3", 1600, 1066, "Sample bright living room", pexels("https://www.pexels.com/photo/modern-living-room-in-an-apartment-6764827/")),
  balcony: img("interior-balcony", 900, 1600, "Sample apartment with balcony view", pexels("https://www.pexels.com/photo/interior-of-a-modern-apartment-with-the-view-of-a-bay-from-a-balcony-16916525/")),
  constructionSlab: img("construction-slab-work", 1600, 1200, "Slab work in progress on site", pexels("https://www.pexels.com/photo/construction-workers-working-on-top-of-a-building-20591230/")),
  constructionFoundation: img("construction-foundation", 1600, 1066, "Foundation and column work on site", pexels("https://www.pexels.com/photo/industrial-construction-site-with-concrete-columns-29152268/")),
  constructionTower: img("construction-tower", 1600, 1066, "Building structure under construction", pexels("https://www.pexels.com/photo/high-rise-concrete-building-under-construction-9370034/")),
  kitchen: img("interior-kitchen", 1600, 1066, "Sample modular kitchen", pexels("https://www.pexels.com/photo/contemporary-equipped-white-kitchen-in-stylish-apartment-6969832/")),
  openKitchen: img("interior-open-kitchen", 1600, 1067, "Sample open kitchen and dining", pexels("https://www.pexels.com/photo/interior-of-a-modern-apartment-with-an-open-kitchen-19846349/")),
  bedroom: img("interior-bedroom", 1600, 1071, "Sample bedroom with large window", pexels("https://www.pexels.com/photo/spacious-comfortable-bedroom-with-soft-cozy-bed-and-large-window-6523282/")),
  bedroom2: img("interior-bedroom-2", 1600, 1068, "Sample bedroom with wardrobe", pexels("https://www.pexels.com/photo/spacious-bedroom-with-cozy-bed-and-wooden-furniture-in-modern-apartment-6585612/")),
  rooftopSitOut: img("amenity-rooftop-sit-out", 1600, 1128, "Rooftop sit-out with seating and plants", pexels("https://www.pexels.com/photo/a-table-and-chairs-with-potted-plants-at-the-terrace-6662080/")),
  rooftopTerrace: img("amenity-rooftop-terrace", 1020, 1600, "Rooftop terrace with city views", pexels("https://www.pexels.com/photo/modern-rooftop-terrace-with-city-views-33798955/")),
  redBrick: img("amenity-red-brick", 1200, 1600, "Red brick masonry", pexels("https://www.pexels.com/photo/red-brick-wall-interior-under-construction-29278167/")),
  constructionBricks: img("construction-bricks", 899, 1600, "Stacked red bricks on site", pexels("https://www.pexels.com/photo/stack-of-red-bricks-in-construction-site-33973793/")),
  bathroom: img("interior-bathroom", 1067, 1600, "Sample bathroom with wall tiles", pexels("https://www.pexels.com/photo/interior-of-a-modern-bathroom-19991843/")),
  bathroom2: img("interior-bathroom-2", 1067, 1600, "Sample bathroom with shower", pexels("https://www.pexels.com/photo/modern-minimalist-bathroom-interior-design-28683068/")),
  indoorGames: img("amenity-indoor-games", 1600, 1066, "Indoor games room with table tennis", pexels("https://www.pexels.com/photo/a-living-room-with-a-ping-pong-table-and-a-television-28272336/")),
  amenityPool: img("amenity-swimming-pool", 1280, 720, "Swimming pool", mixkit("https://mixkit.co/free-stock-video/luxury-swimming-pool-4045/")),
  amenityYoga: img("amenity-yoga-deck", 1280, 720, "Yoga deck", mixkit("https://mixkit.co/free-stock-video/woman-doing-yoga-on-a-deck-1053/")),
  amenityJogging: img("amenity-jogging-track", 1280, 720, "Jogging track", mixkit("https://mixkit.co/free-stock-video/man-jogging-on-a-running-track-on-a-sunny-day-32799/")),
  amenityWalkway: img("amenity-walkway", 720, 1280, "Landscaped walkway", mixkit("https://mixkit.co/free-stock-video/slowly-walking-down-a-path-in-a-park-40656/")),
  amenityPotableWater: img("amenity-potable-water", 1280, 720, "Potable water supply", mixkit("https://mixkit.co/free-stock-video/water-coming-out-of-a-tap-in-a-sink-3891/")),
  masterBedroom: img("interior-master-bedroom", 1280, 720, "Sample master bedroom", mixkit("https://mixkit.co/free-stock-video/master-bedroom-and-window-3111/")),
} as const;

export const stockVideos = {
  walkthroughLiving: vid("walkthrough-living", 1280, 720, "Living room & terrace walkthrough", mixkit("https://mixkit.co/free-stock-video/interior-of-a-room-with-terrace-4029/")),
  filmBedroom: vid("film-bedroom", 1280, 720, "Bedroom walkthrough", mixkit("https://mixkit.co/free-stock-video/luxury-hotel-room-panning-shot-4196/")),
  filmKitchen: vid("film-kitchen", 1280, 720, "Kitchen walkthrough", mixkit("https://mixkit.co/free-stock-video/interior-view-of-a-spacious-modern-kitchen-43033/")),
  filmSuite: vid("film-suite", 1280, 720, "Suite walkthrough", mixkit("https://mixkit.co/free-stock-video/hotel-room-with-modern-minimalist-style-4488/")),
  filmTerrace: vid("film-terrace", 1280, 720, "Terrace walkthrough", mixkit("https://mixkit.co/free-stock-video/boutique-hotel-room-and-terrace-4047/")),
  shortStructure: vid("short-structure", 540, 960, "Structure rising", mixkit("https://mixkit.co/free-stock-video/immense-and-modern-building-under-construction-40718/")),
  shortSiteTeam: vid("short-site-team", 540, 960, "Site team at work", mixkit("https://mixkit.co/free-stock-video/construction-workers-at-a-house-under-construction-1459/")),
  shortMasonry: vid("short-masonry", 540, 960, "Masonry in progress", mixkit("https://mixkit.co/free-stock-video/two-construction-workers-1436/")),
  shortPlanning: vid("short-planning", 540, 960, "Planning on site", mixkit("https://mixkit.co/free-stock-video/pointing-to-blueprints-1439/")),
  shortAerial: vid("short-aerial", 540, 960, "Aerial site view", mixkit("https://mixkit.co/free-stock-video/buildings-under-construction-aerial-view-4010/")),
  shortSunset: vid("short-sunset", 540, 960, "Evening on site", mixkit("https://mixkit.co/free-stock-video/sunset-over-a-building-under-construction-1587/")),
  landmarkAirport: vid("landmark-airport", 540, 960, "Airport", mixkit("https://mixkit.co/free-stock-video/flight-getting-ready-for-departure-4065/")),
  landmarkRailway: vid("landmark-railway", 540, 960, "Railway station", mixkit("https://mixkit.co/free-stock-video/train-arriving-to-a-subway-station-1622/")),
  landmarkHighway: vid("landmark-highway", 540, 960, "Highway", mixkit("https://mixkit.co/free-stock-video/traveling-on-the-highway-on-a-sunny-day-42368/")),
  landmarkMarket: vid("landmark-market", 540, 960, "Market", mixkit("https://mixkit.co/free-stock-video/slow-motion-video-of-a-fruit-and-veggie-stand-991/")),
  storyChess: vid("story-family-chess", 960, 540, "Family at home", mixkit("https://mixkit.co/free-stock-video/bored-kids-playing-chess-4762/")),
  storyReading: vid("story-family-reading", 960, 540, "Family at home", mixkit("https://mixkit.co/free-stock-video/father-and-son-reading-a-book-together-4542/")),
  storyPark: vid("story-family-park", 960, 540, "Family outdoors", mixkit("https://mixkit.co/free-stock-video/mother-and-daughter-read-a-book-together-in-a-park-4874/")),
  storyHome: vid("story-family-home", 960, 540, "Family at home", mixkit("https://mixkit.co/free-stock-video/mother-lying-with-her-baby-on-the-bed-49958/")),
} as const;
