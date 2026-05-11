import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const weekly: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly";
  const monthly: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";

  const staticPages = [
    "",
    "/privacy-policy",
    "/consent-to-data-processing",
    "/cookie-policy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? weekly : monthly,
    priority: path === "" ? 1 : 0.7,
  }));

  const casePages = cases.map((item) => ({
    url: `${siteUrl}/cases/${item.slug}`,
    lastModified: now,
    changeFrequency: monthly,
    priority: 0.8,
  }));

  return [...staticPages, ...casePages];
}
