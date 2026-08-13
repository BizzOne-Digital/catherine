import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Check env credentials first (initial setup)
    const envEmail = process.env.ADMIN_EMAIL_LOGIN;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (envEmail && envPassword && email === envEmail && password === envPassword) {
      const token = signToken({ email, role: "admin" });
      const res = NextResponse.json({ success: true, message: "Login successful" });
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    // Check MongoDB admin
    await connectDB();
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ email: admin.email, role: admin.role });
    const res = NextResponse.json({ success: true, message: "Login successful" });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
