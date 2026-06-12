import { getSEOSettings } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const seo = getSEOSettings();
  const baseUrl = seo.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(seo.updatedAt),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/#youtube`,
      lastModified: new Date(seo.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#tiktok`,
      lastModified: new Date(seo.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#instagram`,
      lastModified: new Date(seo.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#facebook`,
      lastModified: new Date(seo.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
