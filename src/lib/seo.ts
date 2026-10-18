import type { Metadata } from "next";
import { site } from "@/data/site";
import { siteAssets } from "@/data/assets";

export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const ogImage = image ?? siteAssets.office.main.src;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [ogImage] },
  };
}

/** Organisation structured data, built only from verified contact details. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    description: "Premium home builders in Chennai",
    url: site.url,
    logo: new URL(siteAssets.brand.logoMark.src, site.url).toString(),
    image: new URL(siteAssets.office.main.src, site.url).toString(),
    telephone: "+91-96001-03760",
    email: site.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: site.social.map((s) => s.href),
  };
}
