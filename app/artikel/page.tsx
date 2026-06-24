import type { Metadata } from "next"
import SustainabilityLearning from "@/components/SustainabilityLearning"

export const metadata: Metadata = {
  title: "Artikel — CRUNKO",
  description:
    "Pelajari tentang renewable fiber, recyclable packaging, circular economy, dan cara memilah sampah. Edukasi keberlanjutan dari CRUNKO.",
}

export default function ArtikelPage() {
  return <SustainabilityLearning />
}
