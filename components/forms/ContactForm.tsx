"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  interestedService: z.string().optional(),
  message: z.string().min(10, "Please enter a message (at least 10 characters)"),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Botox / Neuromodulators",
  "Dermal Fillers",
  "Mesotherapy",
  "Customized Facial",
  "IPL Photofacial",
  "Laser Hair Removal",
  "Muscle Toning",
  "Body Sculpting",
  "Shop / Products",
  "General Inquiry",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-gold">✓</span>
        </div>
        <h3 className="font-playfair text-xl text-gold mb-2">Message Sent!</h3>
        <p className="font-inter text-sm text-soft-taupe max-w-xs mx-auto">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 font-inter text-sm text-gold/60 hover:text-gold transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Your Name *</label>
          <input {...register("name")} placeholder="Jane Smith" className="admin-input" />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label className="admin-label">Email Address *</label>
          <input {...register("email")} type="email" placeholder="jane@example.com" className="admin-input" />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Phone Number</label>
          <input {...register("phone")} type="tel" placeholder="(905) 555-0123" className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Service of Interest</label>
          <select {...register("interestedService")} className="admin-input">
            <option value="">Select (optional)</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="admin-label">Your Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="How can we help you? Feel free to ask any questions..."
          className="admin-input resize-none"
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold rounded-sm w-full flex items-center justify-center gap-3 group disabled:opacity-60 py-3.5"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
