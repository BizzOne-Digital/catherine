import { Metadata } from "next";
import BookingForm from "@/components/forms/BookingForm";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FinancingCallout from "@/components/ui/FinancingCallout";
import CmsPageHero from "@/components/cms/CmsPageHero";

export const metadata: Metadata = {
  title: "Book a Consultation | Lumina Medi Spa",
  description: "Book your complimentary consultation at Lumina Medi Spa in Mississauga. We'll create a personalized treatment plan just for you.",
};

export default function BookingPage() {
  return (
    <>
      <CmsPageHero
        slug="booking"
        fallback={{
          eyebrow: "Complimentary Consultation",
          title: "Book Your|Appointment",
          content:
            "Your first consultation is completely complimentary. Let's discuss your goals, answer your questions, and build a plan that's right for you.",
        }}
      />

      {/* Form + Info */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="admin-card">
                  <h2 className="font-playfair text-2xl text-warm-beige mb-2">Booking Inquiry</h2>
                  <p className="font-inter text-sm text-soft-taupe mb-7">
                    Fill out the form below and we&apos;ll confirm your appointment within 24 hours.
                  </p>
                  <BookingForm />
                </div>
              </ScrollReveal>
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="admin-card">
                  <h3 className="font-playfair text-lg text-gold mb-4">Contact Details</h3>
                  <div className="w-8 h-px bg-gold/30 mb-5" />
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <Phone size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-inter text-xs text-soft-taupe mb-0.5">Phone</p>
                        <a href="tel:+19051234567" className="font-inter text-sm text-warm-beige hover:text-gold transition-colors">
                          (905) 123-4567
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Mail size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-inter text-xs text-soft-taupe mb-0.5">Email</p>
                        <a href="mailto:hello@luminamedispa.ca" className="font-inter text-sm text-warm-beige hover:text-gold transition-colors">
                          hello@luminamedispa.ca
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <MapPin size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-inter text-xs text-soft-taupe mb-0.5">Location</p>
                        <p className="font-inter text-sm text-warm-beige">
                          123 Luxury Lane, Suite 200<br />Mississauga, ON L5B 1M7
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Clock size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-inter text-xs text-soft-taupe mb-0.5">Hours</p>
                        <div className="font-inter text-sm text-warm-beige space-y-0.5">
                          <p>Mon – Fri: 9am – 7pm</p>
                          <p>Sat: 10am – 5pm</p>
                          <p>Sun: Closed</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="admin-card">
                  <h3 className="font-playfair text-lg text-gold mb-3">What to Expect</h3>
                  <div className="w-8 h-px bg-gold/30 mb-4" />
                  <ul className="space-y-3">
                    {[
                      "Complimentary skin assessment",
                      "Personalized treatment recommendations",
                      "Honest, pressure-free consultation",
                      "Answers to all your questions",
                      "Custom treatment plan & pricing",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                        <span className="font-inter text-sm text-soft-taupe">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <FinancingCallout className="mt-14" />
        </div>
      </section>
    </>
  );
}
