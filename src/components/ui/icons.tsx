import {
  Award,
  BatteryCharging,
  Camera,
  Car,
  Clock,
  Compass,
  Droplets,
  FileCheck,
  Handshake,
  Lightbulb,
  Shield,
  Target,
  Trees,
  Users,
  Video,
  Wifi,
  BrickWall,
  Sparkles,
  Building2,
  CalendarDays,
  MapPin,
  Home,
  Ruler,
  Wind,
  Leaf,
  BedDouble,
  LayoutGrid,
  DoorOpen,
  ChefHat,
  ShowerHead,
  PaintRoller,
  PlugZap,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";

const named: Record<string, LucideIcon> = {
  shield: Shield,
  clock: Clock,
  "file-check": FileCheck,
  users: Users,
  award: Award,
  handshake: Handshake,
  lightbulb: Lightbulb,
  target: Target,
  compass: Compass,
  "map-pin": MapPin,
  home: Home,
  brick: BrickWall,
  car: Car,
  ruler: Ruler,
  wind: Wind,
  leaf: Leaf,
  wifi: Wifi,
  calendar: CalendarDays,
  building: Building2,
  bed: BedDouble,
  grid: LayoutGrid,
  door: DoorOpen,
  chef: ChefHat,
  shower: ShowerHead,
  paint: PaintRoller,
  plug: PlugZap,
  droplet: Droplets,
};

export function getIcon(name: string): LucideIcon {
  return named[name] ?? Sparkles;
}

/** Icon for an amenity label (labels themselves come verbatim from the original site). */
export function amenityIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("parking")) return Car;
  if (l.includes("ev")) return BatteryCharging;
  if (l.includes("video")) return Video;
  if (l.includes("cctv")) return Camera;
  if (l.includes("water")) return Droplets;
  if (l.includes("vaasthu") || l.includes("vastu")) return Compass;
  if (l.includes("brick")) return BrickWall;
  if (l.includes("garden")) return Trees;
  if (l.includes("fiber") || l.includes("fibre")) return Wifi;
  return Sparkles;
}

/** Render a named icon without creating a component during render (react-hooks/static-components). */
export function NamedIcon({ name, className }: { name: string; className?: string }) {
  return createElement(getIcon(name), { className, "aria-hidden": true });
}
