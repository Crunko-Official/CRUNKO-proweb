"use client"

import { useEffect, useState } from "react"
import { getEcoLevel } from "@/data/eco-impact-data"
import type { EcoRank, SiteSettings } from "@/app/actions/impact"

export default function CommunityEcoImpact() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [ranks, setRanks] = useState<EcoRank[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/impact/settings").then((r) => r.json()),
      fetch("/api/impact/eco-ranks").then((r) => r.json()),
    ])
      .then(([s, r]) => {
        setSettings(s)
        setRanks(r)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="bg-brand-green-light/70 px-6 section-pad">
        <div className="mx-auto max-w-3xl text-center text-sm text-brand-dark/40">
          Loading data...
        </div>
      </section>
    )
  }

  if (!settings || !ranks.length) {
    return (
      <section className="bg-brand-green-light/70 px-6 section-pad">
        <div className="mx-auto max-w-3xl text-center text-sm text-brand-dark/40">
          Data tidak tersedia.
        </div>
      </section>
    )
  }

  const total = settings.total_crunko_terjual
  const kemasanRecyclable = Math.round(total * (settings.recycling_rate / 100))
  const rankLabel = settings.community_rank_name ?? getEcoLevel(total, ranks)

  return (
    <section className="bg-brand-green-light/70 px-6 section-pad">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 inline-block rounded-full border border-brand-green/15 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-green">
          Dampak Kolektif
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Dampak <span className="text-brand-green">Kita</span> Bersama
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
          Setiap CRUNKO yang kamu beli ikut mendorong perubahan. Ini estimasi
          dampak kolektif kita sejauh ini.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card-surface interactive-lift rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Total CRUNKO Terjual
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark">
              {total.toLocaleString("id-ID")}
            </p>
            <p className="mt-1 text-xs text-brand-dark/40">estimasi</p>
          </div>

          <div className="card-surface interactive-lift rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Kemasan Berpotensi Kembali ke Daur Ulang
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark">
              {kemasanRecyclable.toLocaleString("id-ID")}
            </p>
            <p className="mt-1 text-xs text-brand-dark/40">estimasi</p>
          </div>

          <div className="card-surface interactive-lift rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Eco Level Kolektif
            </p>
            <div className="mt-2 flex flex-col items-start gap-3">
              <p className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
                {rankLabel}
              </p>
              <span className="rounded-full bg-brand-green-light px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-green-dark">
                {rankLabel}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-brand-dark/40">
          Data bersifat estimasi dan belum merepresentasikan angka
          sesungguhnya.
        </p>
      </div>
    </section>
  )
}
