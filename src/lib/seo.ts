import fs from "fs";
import path from "path";
import type { SEOSettings } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const SEO_FILE = path.join(DATA_DIR, "seo.json");

export const defaultSEOSettings: SEOSettings = {
  siteName: "MHS Video Downloader",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  title: "MHS Video Downloader - Download YouTube, TikTok, Instagram & Facebook Videos Free",
  description:
    "Download videos from YouTube, TikTok, Instagram, and Facebook for free. Fast, easy, and no registration required. MHS Video Downloader supports HD quality downloads.",
  keywords: [
    "video downloader",
    "youtube downloader",
    "tiktok downloader",
    "instagram video download",
    "facebook video download",
    "MHS video downloader",
    "free video download",
    "HD video download",
  ],
  ogTitle: "MHS Video Downloader - Free Social Media Video Downloader",
  ogDescription:
    "Download videos from YouTube, TikTok, Instagram & Facebook instantly. Free, fast, and easy to use.",
  ogImage: "/og-image.png",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@mhsdownloader",
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  robotsIndex: true,
  robotsFollow: true,
  googleAnalyticsId: "",
  googleSearchConsole: "",
  schemaType: "WebApplication",
  schemaOrganization: "MHS Video Downloader",
  schemaLogo: "/logo.png",
  favicon: "/favicon.svg",
  language: "en",
  author: "MHS Team",
  updatedAt: new Date().toISOString(),
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getSEOSettings(): SEOSettings {
  ensureDataDir();

  if (!fs.existsSync(SEO_FILE)) {
    fs.writeFileSync(SEO_FILE, JSON.stringify(defaultSEOSettings, null, 2));
    return defaultSEOSettings;
  }

  try {
    const data = fs.readFileSync(SEO_FILE, "utf-8");
    return { ...defaultSEOSettings, ...JSON.parse(data) };
  } catch {
    return defaultSEOSettings;
  }
}

export function saveSEOSettings(settings: Partial<SEOSettings>): SEOSettings {
  ensureDataDir();
  const current = getSEOSettings();
  const updated: SEOSettings = {
    ...current,
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(SEO_FILE, JSON.stringify(updated, null, 2));
  return updated;
}

export function generateSchemaMarkup(settings: SEOSettings) {
  return {
    "@context": "https://schema.org",
    "@type": settings.schemaType,
    name: settings.siteName,
    description: settings.description,
    url: settings.siteUrl,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: settings.schemaOrganization,
      logo: settings.schemaLogo,
    },
  };
}

export function generateRobotsTxt(settings: SEOSettings): string {
  const indexRule = settings.robotsIndex ? "Allow" : "Disallow";
  const followRule = settings.robotsFollow ? "Allow" : "Disallow";

  return `# MHS Video Downloader Robots.txt
User-agent: *
${indexRule}: /
${followRule}: /

Sitemap: ${settings.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /dashboard/
Disallow: /api/
`;
}
