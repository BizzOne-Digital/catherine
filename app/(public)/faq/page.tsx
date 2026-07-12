"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

const fallbackFaqs: FAQ[] = [
  { _id: "1", question: "What is a complimentary consultation and what does it include?", answer: "Your complimentary consultation is a relaxed, pressure-free conversation where we discuss your aesthetic goals, assess your skin and facial anatomy, and provide honest recommendations. We'll walk you through treatment options, expected results, pricing, and answer any questions you have. There is absolutely no obligation to proceed with any treatment." },
  { _id: "2", question: "How do I know which treatment is right for me?", answer: "That's exactly what your consultation is for! Every person's anatomy, skin type, and goals are unique. We never recommend a one-size-fits-all approach — your personalized plan is based on a thorough assessment of your concerns and what will realistically achieve your goals safely and naturally." },
  { _id: "3", question: "Is Botox safe? Will I look frozen?", answer: "When administered by a trained medical professional, Botox is extremely safe with decades of safety data. The 'frozen' look results from over-treatment — our philosophy is subtle, natural-looking results that preserve your expressions while smoothing lines. We use conservative dosing and precise placement to ensure you still look like yourself." },
  { _id: "4", question: "How long do results last?", answer: "Results vary by treatment: Botox typically lasts 3-4 months, dermal fillers last 12-18 months depending on the product and area, IPL photofacial results are long-lasting with proper sun protection, and laser hair removal provides permanent hair reduction over a series of sessions. We'll discuss expected longevity for your specific treatments at your consultation." },
  { _id: "5", question: "Is there downtime after treatments?", answer: "Most of our treatments have minimal to no downtime. Botox and fillers may cause minor redness or swelling for a few hours to a couple of days. IPL may cause temporary redness. We'll always advise you on what to expect and provide aftercare instructions. Many clients return to their daily activities immediately after treatment." },
  { _id: "6", question: "Are the treatments painful?", answer: "Most clients find our treatments very tolerable. Botox injections feel like tiny pinches. Filler treatments use topical numbing cream to maximize comfort. IPL has a snapping sensation. We prioritize your comfort throughout every treatment and take our time to ensure you feel at ease." },
  { _id: "7", question: "What qualifications does your injector have?", answer: "Our lead injector is a Registered Nurse (RN) with over 10 years of medical aesthetic experience, including advanced training in injectables, laser therapy, and body contouring. All treatments are performed under medical oversight, adhering to the highest safety standards in Ontario." },
  { _id: "8", question: "How soon will I see results?", answer: "Results timeline varies by treatment: Botox takes 7-14 days for full effect, dermal fillers show results immediately (with any swelling subsiding within days), IPL shows progressive improvement over several weeks, and body sculpting results develop over 4-12 weeks as the body naturally processes treated fat cells or builds muscle." },
  { _id: "9", question: "Do you offer packages or memberships?", answer: "Yes! We offer package pricing for laser hair removal series and body sculpting programs. Ask about our loyalty program during your consultation. Package pricing represents significant savings compared to individual sessions." },
  { _id: "10", question: "What is your cancellation policy?", answer: "We require 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a booking fee. We understand that life happens — please reach out as early as possible if you need to change your appointment and we'll always do our best to accommodate you." },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState(fallbackFaqs);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => { if (data?.faqs?.length >= 5) setFaqs(data.faqs); })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 bg-luxury-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,181,109,0.05)_0%,transparent_60%)]" />
        <div className="container-luxury relative z-10 text-center">
          <ScrollReveal>
            <span className="font-inter text-[11px] tracking-[4px] uppercase text-gold/80 mb-4 block">Got Questions?</span>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-6xl text-warm-beige leading-tight mb-5 text-balance">
              Frequently Asked <em className="text-gold not-italic">Questions</em>
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-5" />
            <p className="font-cormorant text-xl italic text-soft-taupe max-w-xl mx-auto">
              Everything you need to know about our treatments, process, and what to expect.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad bg-soft-black">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <FAQAccordion items={faqs} />
          </ScrollReveal>

          {/* Still have questions */}
          <ScrollReveal delay={0.2} className="mt-14 text-center p-8 rounded-xl border border-gold/15 bg-luxury-black/40">
            <h3 className="font-playfair text-2xl text-warm-beige mb-3">Still Have Questions?</h3>
            <p className="font-inter text-sm text-soft-taupe mb-6 max-w-sm mx-auto">
              We&apos;re happy to answer any other questions you may have. Reach out directly or book a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-outline-gold rounded-sm">Contact Us</Link>
              <Link href="/booking" className="btn-gold rounded-sm inline-flex items-center gap-2 group">
                Book Consultation
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
