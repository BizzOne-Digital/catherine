import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LeadCaptureModal from "@/components/ui/LeadCaptureModal";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <LeadCaptureModal />
    </>
  );
}
