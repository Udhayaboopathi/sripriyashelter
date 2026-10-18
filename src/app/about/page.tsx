import type { Metadata } from "next";
import { aboutContent } from "@/data/content";
import { homeLanding } from "@/data/landing";
import { BigTextBand } from "@/components/landing/BigTextBand";
import { VideoTestimonials } from "@/components/landing/VideoTestimonials";
import { ContactSplit } from "@/components/landing/ContactSplit";
import { OngoingProjects } from "@/components/landing/OngoingProjects";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Leadership, StorySplit, Timeline, VisionMission } from "@/components/sections/AboutSections";
import { GalleryCarousel } from "@/components/sections/GalleryCarousel";
import { Highlights } from "@/components/sections/Highlights";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "About Sripriya Shelter | Trusted Real Estate Developers in Tamil Nadu",
    description: "Sripriya Shelter stands for quality without compromise. Meet our founder U. Nethaji and CEO UN. Srinath, and learn about our vision, mission and values.",
    path: "/about",
    image: aboutContent.hero.image.src,
  }),
  title: { absolute: "About Sripriya Shelter | Trusted Real Estate Developers in Tamil Nadu" },
};

export default function AboutPage() {
  const a = aboutContent;
  return (
    <>
      <PageHero {...a.hero} crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <StorySplit title={a.story.title} paragraphs={a.story.paragraphs} stats={a.story.stats} badge={a.story.badge} image={a.office.images[2]} />
      <Leadership {...a.leadership} />
      <VisionMission vision={a.vision} mission={a.mission} />
      <GalleryCarousel eyebrow={a.office.eyebrow} title={a.office.title} description={a.office.description} items={a.office.images.map((image) => ({ image }))} />
      <Highlights eyebrow={a.values.eyebrow} title={a.values.title} description={a.values.description} items={a.values.items} />
      <Timeline {...a.milestones} />
      <BigTextBand band={homeLanding.bigText} />
      <VideoTestimonials testimonials={homeLanding.testimonials} />
      <OngoingProjects heading={homeLanding.projects} projects={projects} />
      <ContactSplit contact={homeLanding.contact} />
    </>
  );
}
