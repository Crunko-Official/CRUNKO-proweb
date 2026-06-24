import type { Metadata } from "next"
import RecycleReuseIdeas from "@/components/RecycleReuseIdeas"

export const metadata: Metadata = {
  title: "Ide Daur Ulang — CRUNKO",
  description:
    "Inspirasi daur ulang kemasan CRUNKO: ubah menjadi pembatas buku, label kado, atau kotak penyimpanan mini. Kreatif, seru, dan ramah lingkungan.",
}

export default function IdeDaurUlangPage() {
  return <RecycleReuseIdeas />
}
