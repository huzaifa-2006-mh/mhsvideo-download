"use client";

import { useState } from "react";
import {
  Download,
  Loader2,
  Link2,
  AlertCircle,
  CheckCircle2,
  Play,
  User,
  Clock,
} from "lucide-react";
import { detectPlatform, getPlatformLabel, getPlatformColor } from "@/lib/platform";
import type { DownloadResult } from "@/types";

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState("");

  const detectedPlatform = url ? detectPlatform(url) : null;

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a video URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Failed to download video");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      setError("Could not read clipboard");
    }
  };

  const getDownloadUrl = (videoUrl: string) => {
    return `/api/proxy?url=${encodeURIComponent(videoUrl)}`;
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="card animate-fade-in">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-5 w-5 text-brand-600" />
          <label htmlFor="video-url" className="text-sm font-semibold text-gray-700">
            Paste Video URL
          </label>
        </div>

        <div className="relative">
          <input
            id="video-url"
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
              setResult(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            placeholder="Paste YouTube, TikTok, Instagram, or Facebook video link..."
            className="input-field pr-24"
          />
          <button
            onClick={handlePaste}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
          >
            Paste
          </button>
        </div>

        {detectedPlatform && detectedPlatform !== "unknown" && (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${getPlatformColor(detectedPlatform)}`}
            >
              {getPlatformLabel(detectedPlatform)}
            </span>
            <span className="text-xs text-gray-400">Platform detected</span>
          </div>
        )}

        {detectedPlatform === "unknown" && url.length > 10 && (
          <p className="mt-2 flex items-center gap-1 text-xs text-amber-600">
            <AlertCircle className="h-3 w-3" />
            Unsupported platform. Use YouTube, TikTok, Instagram, or Facebook.
          </p>
        )}

        <button
          onClick={handleDownload}
          disabled={loading || !url.trim()}
          className="btn-primary mt-4 w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin-slow" />
              Processing...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Video
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="card mt-6 animate-fade-in">
          <div className="flex gap-4">
            {result.thumbnail && (
              <div className="relative hidden h-24 w-40 shrink-0 overflow-hidden rounded-xl sm:block">
                <img
                  src={result.thumbnail}
                  alt={result.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold text-white ${getPlatformColor(result.platform)}`}
                >
                  {getPlatformLabel(result.platform)}
                </span>
              </div>
              <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                {result.title}
              </h3>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
                {result.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {result.author}
                  </span>
                )}
                {result.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {result.duration}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <p className="text-sm font-semibold text-gray-700">Available Formats:</p>
            {result.formats.map((format, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {format.quality}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    .{format.format}
                    {format.size && ` • ${format.size}`}
                  </span>
                </div>
                <a
                  href={getDownloadUrl(format.url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-4 !py-2 !text-xs"
                >
                  <Download className="h-3 w-3" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
