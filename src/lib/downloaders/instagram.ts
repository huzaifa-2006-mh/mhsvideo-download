import type { DownloadResult } from "@/types";

export async function downloadInstagram(url: string): Promise<DownloadResult> {
  try {
    const apiUrl = `https://api.saveig.app/api/ajaxSearch`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: new URLSearchParams({
        q: url,
        t: "media",
        lang: "en",
      }),
    });

    const data = await response.json();

    if (!data.data) {
      return await downloadInstagramFallback(url);
    }

    const formats: { quality: string; format: string; url: string }[] = [];

    const htmlContent = data.data as string;
    const urlMatches = htmlContent.match(/href="(https:\/\/[^"]+\.(mp4|jpg|jpeg|png|webp)[^"]*)"/gi);

    if (urlMatches) {
      urlMatches.forEach((match, index) => {
        const videoUrl = match.replace(/href="([^"]+)"/, "$1");
        if (videoUrl.includes(".mp4")) {
          formats.push({
            quality: index === 0 ? "HD" : `Quality ${index + 1}`,
            format: "mp4",
            url: videoUrl.replace(/&amp;/g, "&"),
          });
        }
      });
    }

    if (formats.length === 0) {
      return await downloadInstagramFallback(url);
    }

    return {
      success: true,
      platform: "instagram",
      title: "Instagram Video",
      thumbnail: formats[0]?.url || "",
      author: "",
      formats,
    };
  } catch {
    return await downloadInstagramFallback(url);
  }
}

async function downloadInstagramFallback(
  url: string
): Promise<DownloadResult> {
  try {
    const response = await fetch(
      `https://v3.igdownloader.app/api/ajaxSearch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: new URLSearchParams({ recaptchaToken: "", q: url, t: "media", lang: "en" }),
      }
    );

    const data = await response.json();

    if (!data.data) {
      throw new Error("Could not extract Instagram video");
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
      platform: "instagram",
      title: "Instagram Video",
      formats,
    };
  } catch (error) {
    return {
      success: false,
      platform: "instagram",
      title: "",
      formats: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to download Instagram video. Make sure the post is public.",
    };
  }
}
