import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch video" }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "video/mp4";
    const videoBuffer = await response.arrayBuffer();

    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="mhs-video.${contentType.includes("mp3") ? "mp3" : "mp4"}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.redirect(url);
  }
}
