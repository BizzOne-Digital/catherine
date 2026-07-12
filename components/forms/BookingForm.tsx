"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  treatmentInterest: z.string().min(1, "Please select a treatment"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  clientType: z.enum(["new", "returning"]),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, "You must agree to be contacted"),
});

type FormData = z.infer<typeof schema>;

const treatments = [
  "Botox / Neuromodulators",
  "Dermal Fillers",
  "Lip Augmentation",
  "Cheek Contouring",
  "Mesotherapy",
  "Customized Facial",
  "IPL Photofacial",
  "Laser Hair Removal",
  "Muscle Toning",
  "Body Sculpting",
  "Skin Consultation",
  "Other / Not Sure",
];

const timeSlots = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 3pm)",
  "Late Afternoon (3pm – 5pm)",
  "Evening (5pm – 7pm)",
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { clientType: "new" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="font-playfair text-2xl text-gold mb-3">Inquiry Received!</h3>
        <p className="font-inter text-sm text-soft-taupe max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 24 hours to confirm your appointment.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-inter text-sm text-gold/60 hover:text-gold transition-colors"
        >
          Submit Another Inquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Full Name *</label>
          <input
            {...register("fullName")}
            placeholder="Your full name"
            className="admin-input"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="admin-label">Email Address *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="admin-input"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone + Treatment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Phone Number *</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(905) 555-0123"
            className="admin-input"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="admin-label">Treatment Interest *</label>
          <select {...register("treatmentInterest")} className="admin-input">
            <option value="">Select a treatment</option>
            {treatments.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.treatmentInterest && <p className="mt-1 text-xs text-red-400">{errors.treatmentInterest.message}</p>}
        </div>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Preferred Date</label>
          <input
            {...register("preferredDate")}
            type="date"
            className="admin-input"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label className="admin-label">Preferred Time</label>
          <select {...register("preferredTime")} className="admin-input">
            <option value="">Select a time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Client Type */}
      <div>
        <label className="admin-label">Are you a new or returning client?</label>
        <div className="flex gap-4 mt-2">
          {[
            { value: "new", label: "New Client" },
            { value: "returning", label: "Returning Client" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer group">
              <input
                {...register("clientType")}
                type="radio"
                value={value}
                className="accent-gold"
              />
              <span className="font-inter text-sm text-soft-taupe group-hover:text-warm-beige transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="admin-label">Additional Notes</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about any concerns, previous treatments, allergies, or questions..."
          className="admin-input resize-none"
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            {...register("consent")}
            type="checkbox"
            className="accent-gold mt-0.5 flex-shrink-0"
          />
          <span className="font-inter text-xs text-soft-taupe group-hover:text-warm-beige transition-colors leading-relaxed">
            I consent to be contacted by Lumina Medi Spa regarding my booking inquiry. I understand my information
            will be kept private and used only for this purpose.
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold rounded-sm w-full flex items-center justify-center gap-3 group disabled:opacity-60 py-4"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending Inquiry...
          </>
        ) : (
          <>
            Send Booking Inquiry
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="font-inter text-xs text-center text-soft-taupe/50">
        We&apos;ll confirm your appointment within 24 hours. For urgent requests, call us directly.
      </p>
    </form>
  );
}
