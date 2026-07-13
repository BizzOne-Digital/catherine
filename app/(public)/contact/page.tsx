import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us | Lumina Medi Spa",
  description: "Get in touch with Lumina Medi Spa in Mississauga. We're here to answer your questions and help you on your aesthetic journey.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 page-text-hero overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.05)_0%,transparent_60%)]" />
        <div className="container-luxury relative z-10 text-center">
          <ScrollReveal>
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">Reach Out</span>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-6xl text-warm-beige leading-tight mb-5 text-balance">
              Get in <em className="text-gold not-italic">Touch</em>
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
            <p className="font-cormorant text-xl italic text-soft-taupe max-w-xl mx-auto">
              Have a question or want to learn more? We&apos;d love to hear from you. 
              Expect a response within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-pad section-warm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="admin-card">
                  <h2 className="font-playfair text-2xl text-warm-beige mb-2">Send Us a Message</h2>
                  <p className="font-inter text-sm text-soft-taupe mb-7">
                    Fill out the form and we&apos;ll get back to you within 24 hours.
                  </p>
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="admin-card space-y-5">
                  <h3 className="font-playfair text-lg text-gold">Contact Information</h3>
                  <div className="w-8 h-px bg-gold/30" />

                  <div className="flex gap-3">
                    <MapPin size={15} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-inter text-xs text-soft-taupe mb-1">Address</p>
                      <p className="font-inter text-sm text-warm-beige leading-relaxed">
                        123 Luxury Lane, Suite 200<br />Mississauga, ON L5B 1M7
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={15} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-inter text-xs text-soft-taupe mb-1">Phone</p>
                      <a href="tel:+19051234567" className="font-inter text-sm text-warm-beige hover:text-gold transition-colors">
                        (905) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail size={15} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-inter text-xs text-soft-taupe mb-1">Email</p>
                      <a href="mailto:catherinezhang01@outlook.com" className="font-inter text-sm text-warm-beige hover:text-gold transition-colors">
                        catherinezhang01@outlook.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Instagram size={15} className="text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-inter text-xs text-soft-taupe mb-1">Instagram</p>
                      <a href="https://instagram.com/luminamedispa" target="_blank" rel="noopener noreferrer"
                        className="font-inter text-sm text-warm-beige hover:text-gold transition-colors">
                        @luminamedispa
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="admin-card">
                  <h3 className="font-playfair text-lg text-gold mb-3">Hours of Operation</h3>
                  <div className="w-8 h-px bg-gold/30 mb-4" />
                  <div className="space-y-2">
                    {[
                      { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                      { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
                      { day: "Sunday", hours: "Closed" },
                    ].map(({ day, hours }) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gold/5 last:border-0">
                        <span className="font-inter text-sm text-soft-taupe">{day}</span>
                        <span className="font-inter text-sm text-warm-beige">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
