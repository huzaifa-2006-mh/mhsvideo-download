import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth";
import type { SessionData } from "@/types";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );

  session.destroy();

  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
