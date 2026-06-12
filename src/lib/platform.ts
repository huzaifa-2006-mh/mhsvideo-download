import type { Platform } from "@/types";

export function detectPlatform(url: string): Platform {
  const normalized = url.toLowerCase().trim();

  if (
    normalized.includes("youtube.com") ||
    normalized.includes("youtu.be") ||
    normalized.includes("youtube-nocookie.com")
  ) {
    return "youtube";
  }

  if (
    normalized.includes("tiktok.com") ||
    normalized.includes("vm.tiktok.com")
  ) {
    return "tiktok";
  }

  if (
    normalized.includes("instagram.com") ||
    normalized.includes("instagr.am")
  ) {
    return "instagram";
  }

  if (
    normalized.includes("facebook.com") ||
    normalized.includes("fb.watch") ||
    normalized.includes("fb.com")
  ) {
    return "facebook";
  }

  return "unknown";
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    youtube: "YouTube",
    tiktok: "TikTok",
    instagram: "Instagram",
    facebook: "Facebook",
    unknown: "Unknown",
  };
  return labels[platform];
}

export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    youtube: "bg-red-600",
    tiktok: "bg-black",
    instagram: "bg-gradient-to-r from-purple-600 to-pink-500",
    facebook: "bg-blue-600",
    unknown: "bg-gray-600",
  };
  return colors[platform];
}
