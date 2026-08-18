"use client";

import { usePathname } from "next/navigation";
import LeadCaptureModal from "@/components/ui/LeadCaptureModal";

/** Renders lead capture on all public pages (homepage lives outside the (public) route group). */
export default function LeadCaptureGate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <LeadCaptureModal />;
}
