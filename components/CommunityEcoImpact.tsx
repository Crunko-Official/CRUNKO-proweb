"use client"

import { getEcoImpactData } from "@/data/eco-impact-data"

const levelColors: Record<string, string> = {
  "Eco Starter": "bg-gray-200 text-gray-700",
  "Eco Supporter": "bg-teal-100 text-teal-800",
  "Eco Champion": "bg-emerald-100 text-emerald-800",
  "Eco Guardian": "bg-amber-100 text-amber-800",
}

export default function CommunityEcoImpact() {
  const data = getEcoImpactData()
  const badgeClass = levelColors[data.aggregateLevel] ?? ""

  return (
    <section className="bg-brand-green-light px-6 py-16 md:py-24">
      <div className="mx-auto max-w-lg">
        <div className="mb-2 inline-block rounded-full bg-brand-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-green">
          Dampak Kolektif
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Dampak <span className="text-brand-green">Kita</span> Bersama
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
          Setiap CRUNKO yang kamu beli ikut mendorong perubahan. Ini estimasi
          dampak kolektif kita sejauh ini.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-brand-green/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Total CRUNKO Terjual
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark">
              {data.totalCrunkoTerjual.toLocaleString("id-ID")}
            </p>
            <p className="mt-1 text-xs text-brand-dark/40">estimasi</p>
          </div>

          <div className="rounded-2xl border border-brand-green/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Kemasan Berpotensi Kembali ke Daur Ulang
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark">
              {data.totalKemasanRecyclable.toLocaleString("id-ID")}
            </p>
            <p className="mt-1 text-xs text-brand-dark/40">estimasi</p>
          </div>

          <div className="rounded-2xl border border-brand-green/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Eco Level Kolektif
            </p>
            <div className="mt-2 flex items-center gap-3">
              <p className="text-3xl font-bold tracking-tight text-brand-dark">
                {data.aggregateLevel}
              </p>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${badgeClass}`}
              >
                {data.aggregateLevel}
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
