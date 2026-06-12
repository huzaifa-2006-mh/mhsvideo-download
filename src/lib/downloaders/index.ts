import type { DownloadResult } from "@/types";
import { detectPlatform } from "@/lib/platform";
import { downloadYouTube } from "./youtube";
import { downloadTikTok } from "./tiktok";
import { downloadInstagram } from "./instagram";
import { downloadFacebook } from "./facebook";

export async function downloadVideo(url: string): Promise<DownloadResult> {
  const platform = detectPlatform(url);

  switch (platform) {
    case "youtube":
      return downloadYouTube(url);
    case "tiktok":
      return downloadTikTok(url);
    case "instagram":
      return downloadInstagram(url);
    case "facebook":
      return downloadFacebook(url);
    default:
      return {
        success: false,
        platform: "unknown",
        title: "",
        formats: [],
        error:
          "Unsupported platform. Please use YouTube, TikTok, Instagram, or Facebook URLs.",
      };
  }
}
