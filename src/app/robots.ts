import { getSEOSettings } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const seo = getSEOSettings();

  return {
    rules: {
      userAgent: "*",
      allow: seo.robotsIndex ? "/" : undefined,
      disallow: seo.robotsIndex
        ? ["/dashboard/", "/api/"]
        : ["/"],
    },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
  };
}
