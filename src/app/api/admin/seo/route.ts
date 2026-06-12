import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth";
import { getSEOSettings, saveSEOSettings } from "@/lib/seo";
import type { SessionData } from "@/types";

async function checkAuth(request: NextRequest) {
  const response = NextResponse.json({});
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );
  return session.isLoggedIn;
}

export async function GET(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getSEOSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const isAuth = await checkAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = saveSEOSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to save SEO settings" },
      { status: 500 }
    );
  }
}
