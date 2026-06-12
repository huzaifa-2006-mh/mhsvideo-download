import type { DownloadResult } from "@/types";

export async function downloadTikTok(url: string): Promise<DownloadResult> {
  try {
    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url, hd: "1" }),
    });

    const data = await response.json();

    if (data.code !== 0 || !data.data) {
      throw new Error(data.msg || "Failed to fetch TikTok video");
    }

    const video = data.data;
    const formats = [];

    if (video.hdplay) {
      formats.push({
        quality: "HD",
        format: "mp4",
        url: video.hdplay.startsWith("http")
          ? video.hdplay
          : `https://www.tikwm.com${video.hdplay}`,
      });
    }

    if (video.play) {
      formats.push({
        quality: "Standard",
        format: "mp4",
        url: video.play.startsWith("http")
          ? video.play
          : `https://www.tikwm.com${video.play}`,
      });
    }

    if (video.wmplay) {
      formats.push({
        quality: "With Watermark",
        format: "mp4",
        url: video.wmplay.startsWith("http")
          ? video.wmplay
          : `https://www.tikwm.com${video.wmplay}`,
      });
    }

    if (video.music) {
      formats.push({
        quality: "Audio Only",
        format: "mp3",
        url: video.music.startsWith("http")
          ? video.music
          : `https://www.tikwm.com${video.music}`,
      });
    }

    return {
      success: true,
      platform: "tiktok",
      title: video.title || "TikTok Video",
      thumbnail: video.cover || video.origin_cover || "",
      author: video.author?.nickname || video.author?.unique_id || "",
      duration: video.duration ? `${video.duration}s` : "",
      formats,
    };
  } catch (error) {
    return {
      success: false,
      platform: "tiktok",
      title: "",
      formats: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to download TikTok video",
    };
  }
}
