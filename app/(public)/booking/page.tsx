import { Metadata } from "next";
import ContactBookingView from "@/components/contact/ContactBookingView";

export const metadata: Metadata = {
  title: "Book a Consultation | Lumina Medi Spa",
  description:
    "Book your complimentary consultation at Lumina Medi Spa in Mississauga. We'll create a personalized treatment plan just for you.",
};

export default function BookingPage() {
  return <ContactBookingView cmsSlug="booking" />;
}
