"use client";
import Link from "next/link";
import { ArrowLeft, DollarSign, Star, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

const treatments = [
  {
    id: "botox",
    name: "Botox",
    slug: "botox",
    popular: true,
    description: "Smooth dynamic lines on the forehead, frown and crow's feet.",
    price: "From $11–$14 / unit",
    image: "/images/treatments/botox.jpg"
  },
  {
    id: "dysport",
    name: "Dysport & Nuceiva",
    slug: "dysport-nuceiva",
    popular: false,
    description: "Alternative neuromodulators for fast-acting, natural smoothing.",
    price: "From $11–$14 / unit",
    image: "/images/treatments/dysport.jpg"
  },
  {
    id: "daxxify",
    name: "Daxxify",
    slug: "daxxify",
    popular: false,
    description: "Long-lasting neuromodulator with results up to 6 months.",
    price: "From $16–$18 / unit",
    image: "/images/treatments/daxxify.jpg"
  }
];

export default function InjectablesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFFBF6] py-16 sm:py-20 lg:py-24">
        <div className="container-luxury">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-deep-gold transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Services
          </Link>
          
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 rounded-full mb-4">
                Category
              </span>
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight">
                Injectables & Wrinkle Relaxers
              </h1>
              <p className="text-lg sm:text-xl text-text-soft leading-relaxed font-medium">
                Soften fine lines and prevent new ones with precise, natural-looking neuromodulator treatments.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="section-pad bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
              <ScrollReveal key={treatment.id} delay={index * 0.1}>
                <Link href={`/services/injectables-wrinkle-relaxers/${treatment.slug}`}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(196,151,47,0.15)] cursor-pointer h-full">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gold/5 to-gold/10">
                      {treatment.popular && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gold rounded-full">
                          Popular
                        </div>
                      )}
                      <Image
                        src={treatment.image}
                        alt={treatment.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-playfair text-2xl font-bold text-text-dark mb-3 group-hover:text-gold transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-sm text-text-soft mb-4 font-medium leading-relaxed">
                        {treatment.description}
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                        <div className="flex items-center gap-2 text-gold font-bold">
                          <DollarSign size={16} />
                          <span className="text-sm">{treatment.price}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold/80 group-hover:text-gold group-hover:gap-3 transition-all font-semibold">
                          Learn more
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pad-sm bg-gradient-to-b from-[#FFFBF6] to-[#FAF4EB]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-dark mb-4">
                Ready to Reveal Your Best Self?
              </h2>
              <p className="text-lg text-text-soft mb-8 font-medium">
                Book your complimentary consultation and discover which treatment is right for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-deep-gold text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
