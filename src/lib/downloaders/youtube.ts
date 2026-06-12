import ytdl from "@distube/ytdl-core";
import type { DownloadResult } from "@/types";

export async function downloadYouTube(url: string): Promise<DownloadResult> {
  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const thumbnail =
      info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]
        ?.url || "";
    const author = info.videoDetails.author?.name || "";
    const duration = info.videoDetails.lengthSeconds
      ? formatDuration(parseInt(info.videoDetails.lengthSeconds))
      : "";

    const formats = info.formats
      .filter(
        (f) =>
          f.hasVideo &&
          f.hasAudio &&
          f.url &&
          (f.qualityLabel || f.quality)
      )
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .slice(0, 5)
      .map((f) => ({
        quality: f.qualityLabel || f.quality || "Unknown",
        format: f.container || "mp4",
        url: f.url!,
        size: f.contentLength
          ? formatBytes(parseInt(f.contentLength))
          : undefined,
      }));

    if (formats.length === 0) {
      const bestFormat = ytdl.chooseFormat(info.formats, {
        quality: "highest",
      });
      if (bestFormat?.url) {
        formats.push({
          quality: bestFormat.qualityLabel || "Best Quality",
          format: bestFormat.container || "mp4",
          url: bestFormat.url,
          size: undefined,
        });
      }
    }

    return {
      success: true,
      platform: "youtube",
      title,
      thumbnail,
      author,
      duration,
      formats,
    };
  } catch (error) {
    return {
      success: false,
      platform: "youtube",
      title: "",
      formats: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to download YouTube video",
    };
  }
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
