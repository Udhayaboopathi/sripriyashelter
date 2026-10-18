import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/gallery", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8 })),
  ];
  return pages.map(({ path, priority }) => ({ url: `${base}${path}`, priority }));
}
