"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IntroLogo from "@/components/ui/IntroLogo";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Welcome back!");
        router.push("/admin");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,181,109,0.04)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <IntroLogo className="intro-logo w-28 h-[7.75rem] mx-auto mb-4" />
          <h1 className="font-playfair text-2xl text-gold">Lumina Admin</h1>
          <p className="font-inter text-xs text-soft-taupe tracking-widest uppercase mt-1">Management Portal</p>
        </div>

        {/* Form Card */}
        <div className="admin-card">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={14} className="text-gold" />
            <span className="font-inter text-sm text-warm-beige">Sign in to continue</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="admin-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Luminamedispa@gmail.com"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="admin-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-soft-taupe/50 hover:text-soft-taupe transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold rounded-sm w-full flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-inter text-xs text-soft-taupe/40">
          Lumina Medi Spa © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
