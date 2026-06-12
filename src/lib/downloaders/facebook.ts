import type { DownloadResult } from "@/types";

export async function downloadFacebook(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch(
      "https://getmyfb.com/process",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: new URLSearchParams({ FBUrl: url }),
      }
    );

    const html = await response.text();

    const formats: { quality: string; format: string; url: string }[] = [];

    const hdMatch = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"[^>]*>.*?HD/i);
    const sdMatch = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"[^>]*>.*?SD/i);
    const allMatches = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/gi);

    if (hdMatch) {
      formats.push({
        quality: "HD",
        format: "mp4",
        url: hdMatch[1].replace(/&amp;/g, "&"),
      });
    }

    if (sdMatch) {
      formats.push({
        quality: "SD",
        format: "mp4",
        url: sdMatch[1].replace(/&amp;/g, "&"),
      });
    }

    if (formats.length === 0 && allMatches) {
      allMatches.forEach((match, index) => {
        const videoUrl = match.replace(/href="([^"]+)"/, "$1").replace(/&amp;/g, "&");
        if (!formats.some((f) => f.url === videoUrl)) {
          formats.push({
            quality: index === 0 ? "Best Quality" : `Quality ${index + 1}`,
            format: "mp4",
            url: videoUrl,
          });
        }
      });
    }

    if (formats.length === 0) {
      return await downloadFacebookFallback(url);
    }

    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : "Facebook Video";

    return {
      success: true,
      platform: "facebook",
      title,
      formats,
    };
  } catch {
    return await downloadFacebookFallback(url);
  }
}

async function downloadFacebookFallback(
  url: string
): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://fbdownloader.app/api/ajaxSearch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: new URLSearchParams({ q: url }),
      }
    );

    const data = await response.json();

    if (!data.data) {
      throw new Error("Could not extract Facebook video");
    }

    const formats: { quality: string; format: string; url: string }[] = [];
    const htmlContent = data.data as string;

    const downloadLinks = htmlContent.match(
      /href="(https:\/\/[^"]+\.mp4[^"]*)"/gi
    );

    if (downloadLinks) {
      downloadLinks.forEach((link, index) => {
        const videoUrl = link.replace(/href="([^"]+)"/, "$1").replace(/&amp;/g, "&");
        formats.push({
          quality: index === 0 ? "HD" : `Quality ${index + 1}`,
          format: "mp4",
          url: videoUrl,
        });
      });
    }

    if (formats.length === 0) {
      throw new Error("No video formats found");
    }

    return {
      success: true,
      platform: "facebook",
      title: "Facebook Video",
      formats,
    };
  } catch (error) {
    return {
      success: false,
      platform: "facebook",
      title: "",
      formats: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to download Facebook video. Make sure the video is public.",
    };
  }
}
