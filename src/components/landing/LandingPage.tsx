import type { ReactNode } from "react";
import type { Project } from "@/types/content";
import type { LandingContent } from "@/types/landing";
import { projects as allProjects } from "@/data/projects";
import { LandingHero } from "./LandingHero";
import { WhySection } from "./WhySection";
import { TerraceSection } from "./TerraceSection";
import { OverviewSection } from "./OverviewSection";
import { LocationSection } from "./LocationSection";
import { FilmsSlider } from "./FilmsSlider";
import { WalkthroughBand } from "./WalkthroughBand";
import { ShortsSlider } from "./ShortsSlider";
import { BigTextBand } from "./BigTextBand";
import { GallerySection } from "./GallerySection";
import { AmenitiesMarquee } from "./AmenitiesMarquee";
import { SpecsTabs } from "./SpecsTabs";
import { ApprovalsStrip } from "./ApprovalsStrip";
import { VideoTestimonials } from "./VideoTestimonials";
import { CompanySplit } from "./CompanySplit";
import { ContactSplit } from "./ContactSplit";
import { OngoingProjects } from "./OngoingProjects";

/**
 * Full landing page in the reference section order (Avittam Nayanmar):
 * hero → why → terrace → dark overview → location + landmarks → films →
 * walkthrough → shorts → big text → gallery + updates → amenities → specs →
 * approvals → testimonials → company → contact → ongoing projects.
 */
export function LandingPage({ landing, project, afterGallery }: { landing: LandingContent; project?: Project; afterGallery?: ReactNode }) {
  const title = project?.title;
  return (
    <>
      <LandingHero hero={landing.hero} project={title} />
      <WhySection why={landing.why} />
      <TerraceSection terrace={landing.terrace} />
      <OverviewSection overview={landing.overview} project={title} />
      <LocationSection location={landing.location} />
      <FilmsSlider films={landing.films} />
      <WalkthroughBand walkthrough={landing.walkthrough} />
      <ShortsSlider shorts={landing.shorts} />
      <BigTextBand band={landing.bigText} />
      <GallerySection gallery={landing.gallery} />
      {afterGallery}
      <AmenitiesMarquee amenities={landing.amenities} />
      <SpecsTabs specs={landing.specs} />
      <ApprovalsStrip approvals={landing.approvals} />
      <VideoTestimonials testimonials={landing.testimonials} />
      <CompanySplit company={landing.company} />
      <ContactSplit contact={landing.contact} />
      <OngoingProjects heading={landing.projects} projects={allProjects} />
    </>
  );
}
