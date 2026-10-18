import type { Metadata } from "next";
import { contactPageContent } from "@/data/content";
import { siteAssets } from "@/data/assets";
import { site } from "@/data/site";
import { homeLanding } from "@/data/landing";
import { ContactSplit } from "@/components/landing/ContactSplit";
import { LocationSection } from "@/components/landing/LocationSection";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactInfo } from "@/components/sections/ContactInfo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Contact Sripriya Shelter | Enquiry & Site Visit Information",
    description: `Call ${site.phone.display}, email ${site.email.display} or visit our office at C. Pallavaram, Chennai – 600043.`,
    path: "/contact",
  }),
  title: { absolute: "Contact Sripriya Shelter | Enquiry & Site Visit Information" },
};

export default function ContactPage() {
  const c = contactPageContent;
  return (
    <>
      <PageHero {...c.hero} crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <ContactInfo title={c.info.title} description={c.info.description} />
      <ContactSplit contact={{ ...homeLanding.contact, eyebrow: "Get in Touch", image: siteAssets.office.main }} />
      <LocationSection location={homeLanding.location} />
    </>
  );
}
