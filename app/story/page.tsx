import type { Metadata } from "next"
import StoryClient from "./StoryClient"

export const metadata: Metadata = {
  title: "Dari Kotagede untuk Masa Depan | Cerita Crunko — Bab Satu",
  description:
    "Kisah Yangko yang hampir terlupakan, dari Kotagede untuk masa depan.",
}

export default function StoryPage() {
  return <StoryClient />
}
