import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export function requireAdmin(req: NextRequest): { error: NextResponse } | { email: string; role: string } {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const user = verifyToken(token);
  if (!user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  return user;
}
