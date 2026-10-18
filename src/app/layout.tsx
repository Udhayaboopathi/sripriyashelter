import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { EnquiryProvider } from "@/components/layout/EnquiryProvider";

// Fonts verified from the original stylesheet: headings Playfair Display, body DM Sans.
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sripriya Shelter | Premium Home Builders in Chennai",
    template: "%s | Sripriya Shelter",
  },
  description:
    "Sripriya Shelter - Your trusted partner in creating quality homes. 15+ years of excellence in residential construction across Chennai. Explore our premium apartments, villas, and townhouses.",
  keywords: ["Sripriya Shelter", "home builders", "Chennai real estate", "premium apartments", "residential villas", "construction company", "quality homes"],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Sripriya Shelter | Premium Home Builders in Chennai",
    description: "Building quality shelters for a better tomorrow. Explore our premium residential projects across Chennai.",
    url: "/",
    locale: "en_IN",
    images: [{ url: "/images/office/office-main.jpg", width: 1920, height: 1280 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sripriya Shelter | Premium Home Builders",
    description: "Building quality shelters for a better tomorrow. 15+ years of construction excellence.",
    images: ["/images/office/office-main.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000b6b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip bg-surface font-body text-ink">
        <a href="#main" className="sr-only z-[100] rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <EnquiryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </EnquiryProvider>
      </body>
    </html>
  );
}
