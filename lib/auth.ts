import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "lumina-secret-key";
const COOKIE_NAME = "lumina_admin_token";

export function signToken(payload: { email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: string };
  } catch {
    return null;
  }
}

export function getAdminFromCookies(): { email: string; role: string } | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
