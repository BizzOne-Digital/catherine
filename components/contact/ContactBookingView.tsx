"use client";

import BookingForm from "@/components/forms/BookingForm";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FinancingCallout from "@/components/ui/FinancingCallout";
import CmsPageHero from "@/components/cms/CmsPageHero";
import { phoneToTel, useSiteSettings } from "@/components/cms/useSiteSettings";
import ClinicMap from "@/components/ui/ClinicMap";

const HERO = {
  eyebrow: "Complimentary Consultation",
  title: "Book Your|Appointment",
  content:
    "Your first consultation is completely complimentary. Let's discuss your goals, answer your questions, and build a plan that's right for you.",
};

type Props = {
  cmsSlug?: string;
};

/** Shared Contact + Booking page layout so /contact and /booking stay identical. */
export default function ContactBookingView({ cmsSlug = "booking" }: Props) {
  const { settings } = useSiteSettings();
  const telHref = phoneToTel(settings.phone);

  return (
    <>
      <CmsPageHero slug={cmsSlug} fallback={HERO} />

      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="admin-card">
                  <h2 className="mb-2 font-playfair text-2xl text-warm-beige">Booking Inquiry</h2>
                  <p className="mb-7 font-inter text-sm text-soft-taupe">
                    Fill out the form below and we&apos;ll confirm your appointment within 24 hours.
                  </p>
                  <BookingForm />
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="admin-card">
                  <h3 className="mb-4 font-playfair text-lg text-gold">Contact Details</h3>
                  <div className="mb-5 h-px w-8 bg-gold/30" />
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <Phone size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                      <div>
                        <p className="mb-0.5 font-inter text-xs text-soft-taupe">Phone</p>
                        <a
                          href={telHref}
                          className="font-inter text-sm text-warm-beige transition-colors hover:text-gold"
                        >
                          {settings.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Mail size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                      <div>
                        <p className="mb-0.5 font-inter text-xs text-soft-taupe">Email</p>
                        <a
                          href={`mailto:${settings.email}`}
                          className="break-all font-inter text-sm text-warm-beige transition-colors hover:text-gold"
                        >
                          {settings.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <MapPin size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                      <div>
                        <p className="mb-0.5 font-inter text-xs text-soft-taupe">Location</p>
                        <p className="font-inter text-sm leading-relaxed text-warm-beige">
                          {settings.address}
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Clock size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                      <div className="min-w-0 flex-1">
                        <p className="mb-1 font-inter text-xs text-soft-taupe">Hours</p>
                        <p className="font-inter text-sm leading-relaxed text-warm-beige">
                          Call for information and by appointment 📅
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="admin-card">
                  <h3 className="mb-3 font-playfair text-lg text-gold">What to Expect</h3>
                  <div className="mb-4 h-px w-8 bg-gold/30" />
                  <ul className="space-y-3">
                    {[
                      "Complimentary skin assessment",
                      "Personalized treatment recommendations",
                      "Honest, pressure-free consultation",
                      "Answers to all your questions",
                      "Custom treatment plan & pricing",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
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

      <ClinicMap title="Find Us in Mississauga" />
    </>
  );
}
