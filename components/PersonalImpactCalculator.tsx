"use client"

import { useState, useCallback } from "react"
import { getEcoLevel } from "@/data/eco-impact-data"

const levelStyles: Record<string, string> = {
  "Eco Starter": "bg-gray-200 text-gray-700",
  "Eco Supporter": "bg-teal-100 text-teal-800",
  "Eco Champion": "bg-emerald-100 text-emerald-800",
  "Eco Guardian": "bg-amber-100 text-amber-800",
}

export default function PersonalImpactCalculator() {
  const [input, setInput] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const num = parseInt(input, 10)
  const valid = !Number.isNaN(num) && num >= 0 && input.trim() !== ""

  const level = valid ? getEcoLevel(num) : ""
  const levelClass = level ? levelStyles[level] ?? "" : ""

  const handleShare = useCallback(async () => {
    const text = `🌱 Eco Impact Tracker — CRUNKO\n\nAku sudah mencapai level "${level}" dengan ${num} CRUNKO! ${num} kemasan Ivory paperboard diperkirakan berpotensi kembali ke rantai daur ulang.\n\nHitung dampakmu di crunko.eco/impact`

    if (typeof navigator !== "undefined") {
      if ("share" in navigator) {
        try {
          await navigator.share({ title: "Eco Impact Tracker — CRUNKO", text })
          return
        } catch {
          // user cancelled fall through to clipboard
        }
      }
      try {
        await (navigator as Navigator).clipboard.writeText(text)
      } catch {
        // clipboard not available
      }
    }
  }, [num, level])

  return (
    <section className="bg-brand-cream px-6 py-16 md:py-24">
      <div className="mx-auto max-w-lg">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Dampak Pribadimu
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
      Setiap CRUNKO yang kamu nikmati adalah bagian dari perjalanan menuju masa depan yang lebih lestari.
        </p>

        <label
          htmlFor="crunko-input"
          className="mt-8 block text-sm font-medium text-brand-dark"
        >
          Sudah berapa CRUNKO yang kamu nikmati sejauh ini?
        </label>
        <div className="mt-2 flex gap-3">
          <input
            id="crunko-input"
            type="number"
            min={0}
            inputMode="numeric"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setSubmitted(false)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) setSubmitted(true)
            }}
            className="w-32 rounded-xl border border-brand-beige bg-white px-4 py-3 text-center text-lg font-semibold text-brand-dark shadow-sm outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="0"
          />
          <button
            type="button"
            onClick={() => valid && setSubmitted(true)}
            disabled={!valid}
            className="rounded-xl bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:bg-brand-green-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
          >
            Hitung
          </button>
        </div>

        {submitted && valid && (
          <div className="mt-8 animate-fade-in-up space-y-4 rounded-2xl border border-brand-beige bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-brand-dark/60">
                Level Eco-mu
              </span>
              <span
                className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${levelClass}`}
              >
                {level}
              </span>
            </div>

            <div className="border-t border-brand-beige pt-4">
              <p className="text-sm leading-relaxed text-brand-dark">
                Dengan <strong>{num.toLocaleString("id-ID")} CRUNKO</strong>,
                kamu diperkirakan telah menggunakan{" "}
                <strong>{num.toLocaleString("id-ID")}</strong> kemasan Ivory
                paperboard yang <strong>berpotensi</strong> masuk kembali ke
                rantai daur ulang.
              </p>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-beige bg-brand-cream px-5 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-beige"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Bagikan Hasil
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
