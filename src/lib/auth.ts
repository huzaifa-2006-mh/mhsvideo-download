import { SessionOptions } from "iron-session";
import type { SessionData } from "@/types";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "mhs_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
  },
};

export function getDefaultSession(): SessionData {
  return { isLoggedIn: false };
}

export function validateCredentials(
  username: string,
  password: string
): boolean {
  const adminUser = process.env.ADMIN_USERNAME || "huzaifa";
  const adminPass = process.env.ADMIN_PASSWORD || "Sedil@1234";
  return username === adminUser && password === adminPass;
}
