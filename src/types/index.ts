export type Platform = "youtube" | "tiktok" | "instagram" | "facebook" | "unknown";

export interface VideoFormat {
  quality: string;
  format: string;
  url: string;
  size?: string;
}

export interface DownloadResult {
  success: boolean;
  platform: Platform;
  title: string;
  thumbnail?: string;
  author?: string;
  duration?: string;
  formats: VideoFormat[];
  error?: string;
}

export interface SEOSettings {
  siteName: string;
  siteUrl: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterSite: string;
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  googleAnalyticsId: string;
  googleSearchConsole: string;
  schemaType: string;
  schemaOrganization: string;
  schemaLogo: string;
  favicon: string;
  language: string;
  author: string;
  updatedAt: string;
}

export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
}
