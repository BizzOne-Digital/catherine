"use client";
import TreatmentDetailView from "@/components/services/TreatmentDetailView";

export default function Page({ params }: { params: { treatmentSlug: string } }) {
  return (
    <TreatmentDetailView
      categorySlug="injectables-wrinkle-relaxers"
      treatmentSlug={params.treatmentSlug}
    />
  );
}
