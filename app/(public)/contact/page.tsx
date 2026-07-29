import { Metadata } from "next";
import ContactBookingView from "@/components/contact/ContactBookingView";

export const metadata: Metadata = {
  title: "Contact Us | Lumina Medi Spa",
  description:
    "Book your complimentary consultation at Lumina Medi Spa in Mississauga. We'll create a personalized treatment plan just for you.",
};

/** Same layout and form as /booking — kept as a separate URL for navigation links. */
export default function ContactPage() {
  return <ContactBookingView cmsSlug="booking" />;
}
