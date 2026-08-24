import { Metadata } from "next";
import { Suspense } from "react";
import OnlineBookingView from "@/components/booking/OnlineBookingView";

export const metadata: Metadata = {
  title: "Book Online | Lumina Medi Spa",
  description:
    "Book facials, laser hair removal, muscle toning, microneedling, and IPL online with Lumina Medi Spa in Mississauga.",
};

export default function BookOnlinePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center pt-28 font-inter text-soft-taupe">
          Loading…
        </div>
      }
    >
      <OnlineBookingView />
    </Suspense>
  );
}
