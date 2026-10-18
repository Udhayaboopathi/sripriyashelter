import type { Metadata } from "next";
import { homeLanding } from "@/data/landing";
import { pageMetadata } from "@/lib/seo";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Premium Residential Construction | Quality Homes for a Better Tomorrow",
    description:
      "Sripriya Shelter - Your trusted partner in creating quality homes in Chennai. Modern architecture, trusted construction, customer-focused service.",
    path: "/",
  }),
  title: { absolute: "Sripriya Shelter – Premium Residential Construction | Quality Homes for a Better Tomorrow" },
};

/** Home page: the full reference landing-page section sequence with Sripriya content. */
export default function HomePage() {
  return <LandingPage landing={homeLanding} />;
}
