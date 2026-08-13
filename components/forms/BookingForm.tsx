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
  marketingConsent: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 3pm)",
  "Late Afternoon (3pm – 5pm)",
  "Evening (5pm – 7pm)",
];

const treatmentOptions = [
  "Botox / Neuromodulators",
  "Dermal Fillers",
  "Lip Augmentation",
  "Mesotherapy/Skin Booster",
  "Microneedling",
  "Customized Facial",
  "IPL Photofacial",
  "Laser Hair Removal",
  "Muscle Toning",
  "PRP",
  "IV therapy",
  "Biostimulator (Sculptra/Radiesse)",
  "Chemical Peel",
  "Skin Consultation",
  "Other / Not Sure",
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
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "Something went wrong. Please try again or call us directly."
        );
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
    }
  };

  if (submitted) {
    return (
      <div className="px-6 py-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="mb-3 font-playfair text-2xl text-gold">Inquiry Received!</h3>
        <p className="mx-auto max-w-sm font-inter text-sm leading-relaxed text-soft-taupe">
          Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 24
          hours to confirm your appointment.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-inter text-sm text-gold/60 transition-colors hover:text-gold"
        >
          Submit Another Inquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Full Name *</label>
          <input {...register("fullName")} placeholder="Your full name" className="admin-input" />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
          )}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Phone Number *</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(437) 888-9022"
            className="admin-input"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="admin-label">Treatment Interest *</label>
          <select {...register("treatmentInterest")} className="admin-input">
            <option value="">Select a treatment</option>
            {treatmentOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.treatmentInterest && (
            <p className="mt-1 text-xs text-red-400">{errors.treatmentInterest.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="admin-label">Are you a new or returning client?</label>
        <div className="mt-2 flex gap-4">
          {[
            { value: "new", label: "New Client" },
            { value: "returning", label: "Returning Client" },
          ].map(({ value, label }) => (
            <label key={value} className="group flex cursor-pointer items-center gap-2">
              <input {...register("clientType")} type="radio" value={value} className="accent-gold" />
              <span className="font-inter text-sm text-soft-taupe transition-colors group-hover:text-warm-beige">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="admin-label">Additional Notes</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about any concerns, previous treatments, allergies, or questions..."
          className="admin-input resize-none"
        />
      </div>

      <div className="space-y-3">
        <div>
          <label className="group flex cursor-pointer items-start gap-3">
            <input
              {...register("consent")}
              type="checkbox"
              className="mt-0.5 flex-shrink-0 accent-gold"
            />
            <span className="font-inter text-xs leading-relaxed text-soft-taupe transition-colors group-hover:text-warm-beige">
              I consent to be contacted by Lumina Medi Spa regarding my booking inquiry. I understand
              my information will be kept private and used only for this purpose.
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-xs text-red-400">{errors.consent.message}</p>}
        </div>
        <label className="group flex cursor-pointer items-start gap-3">
          <input
            {...register("marketingConsent")}
            type="checkbox"
            className="mt-0.5 flex-shrink-0 accent-gold"
          />
          <span className="font-inter text-xs leading-relaxed text-soft-taupe transition-colors group-hover:text-warm-beige">
            I would like to receive emails from Lumina Medi Spa with exclusive offers, treatment
            updates, and skincare news. I can unsubscribe at any time.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold group flex w-full items-center justify-center gap-3 rounded-sm py-4 disabled:opacity-60"
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

      <p className="text-center font-inter text-xs text-soft-taupe/50">
        We&apos;ll confirm your appointment within 24 hours. For urgent requests, call us directly.
      </p>
    </form>
  );
}
