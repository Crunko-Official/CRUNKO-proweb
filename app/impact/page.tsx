import type { Metadata } from "next"
import PersonalImpactCalculator from "@/components/PersonalImpactCalculator"
import CommunityEcoImpact from "@/components/CommunityEcoImpact"

export const metadata: Metadata = {
  title: "Eco Impact Tracker — CRUNKO",
  description:
    "Hitung dampak lingkungan pribadimu dan lihat dampak kolektif komunitas CRUNKO. Estimasi kemasan recyclable yang berpotensi kembali ke rantai daur ulang.",
}

export default function ImpactPage() {
  return (
    <>
      <PersonalImpactCalculator />
      <CommunityEcoImpact />
    </>
  )
}
