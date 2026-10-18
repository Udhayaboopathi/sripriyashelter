import type { Metadata } from "next";
import { galleryPageContent } from "@/data/content";
import { galleryCategories, galleryClosingNote, galleryItems } from "@/data/gallery";
import { homeLanding } from "@/data/landing";
import { FilmsSlider } from "@/components/landing/FilmsSlider";
import { WalkthroughBand } from "@/components/landing/WalkthroughBand";
import { ShortsSlider } from "@/components/landing/ShortsSlider";
import { ContactSplit } from "@/components/landing/ContactSplit";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Gallery | Sripriya Shelter – Premium Construction Photos",
    description: "Photos of Sripriya Shelter's office, residential projects, elevations and floor plans.",
    path: "/gallery",
    image: galleryPageContent.hero.image.src,
  }),
  title: { absolute: "Gallery | Sripriya Shelter – Premium Construction Photos" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero {...galleryPageContent.hero} crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
      <section className="bg-grid-light section-y" aria-label="Photo gallery">
        <div className="container-site">
          <GalleryGrid items={galleryItems} categories={galleryCategories} />
          <Reveal>
            <p className="mx-auto mt-14 max-w-3xl text-center text-[17px] leading-[1.8] text-muted">{galleryClosingNote}</p>
          </Reveal>
        </div>
      </section>
      <FilmsSlider films={homeLanding.films} />
      <WalkthroughBand walkthrough={homeLanding.walkthrough} />
      <ShortsSlider shorts={homeLanding.shorts} />
      <ContactSplit contact={homeLanding.contact} />
    </>
  );
}
