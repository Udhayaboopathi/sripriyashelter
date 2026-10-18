import type { Metadata } from "next";
import { projectsPageContent } from "@/data/content";
import { projects } from "@/data/projects";
import { homeLanding } from "@/data/landing";
import { ShortsSlider } from "@/components/landing/ShortsSlider";
import { BigTextBand } from "@/components/landing/BigTextBand";
import { VideoTestimonials } from "@/components/landing/VideoTestimonials";
import { ContactSplit } from "@/components/landing/ContactSplit";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Projects | Sripriya Shelter – Ongoing & Completed Homes",
    description: "Explore Sripriya Shelter projects: RoseLand (ongoing, Shankar Nagar, Pammal) and Individual House (completed, Chennai).",
    path: "/projects",
    image: projectsPageContent.hero.image.src,
  }),
  title: { absolute: "Projects | Sripriya Shelter – Ongoing & Completed Homes" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero {...projectsPageContent.hero} crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      <ProjectsExplorer projects={projects} filters={projectsPageContent.filters} />
      <ShortsSlider shorts={homeLanding.shorts} />
      <BigTextBand band={homeLanding.bigText} />
      <VideoTestimonials testimonials={homeLanding.testimonials} />
      <ContactSplit contact={homeLanding.contact} />
    </>
  );
}
