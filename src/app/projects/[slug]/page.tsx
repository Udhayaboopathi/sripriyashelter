import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { findProjectByLegacySlug, getProject, projects } from "@/data/projects";
import { getProjectLanding, sampleFloorPlan } from "@/data/landing";
import { pageMetadata } from "@/lib/seo";
import { PlansTabs } from "@/components/sections/PlansTabs";
import { LandingPage } from "@/components/landing/LandingPage";

/** Canonical slugs plus the original site's mixed-case slugs (which permanently redirect). */
export function generateStaticParams() {
  return projects.flatMap((p) => [{ slug: p.slug }, ...p.legacySlugs.map((slug) => ({ slug }))]);
}


export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug) ?? findProjectByLegacySlug(slug);
  if (!project) return {};
  return {
    ...pageMetadata({ title: project.seo.title, description: project.seo.description, path: `/projects/${project.slug}`, image: project.heroImage.src }),
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const legacy = findProjectByLegacySlug(slug);
  if (legacy) permanentRedirect(`/projects/${legacy.slug}`);
  const project = getProject(slug);
  if (!project) notFound();
  const landing = getProjectLanding(project);
  if (!landing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.title,
    description: project.overview[0],
    image: project.heroImage.src,
    address: { "@type": "PostalAddress", addressLocality: project.location, addressRegion: "Tamil Nadu", addressCountry: "IN" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingPage
        landing={landing}
        project={project}
        afterGallery={
          <PlansTabs tabs={project.plans.length ? project.plans : [{ id: "floor-plans", label: "Floor Plans", images: [sampleFloorPlan] }]} projectTitle={project.title} />
        }
      />
    </>
  );
}
