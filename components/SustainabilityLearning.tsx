"use client"

import { useState, useCallback } from "react"
import { sustainabilityArticles } from "@/data/articles"

export default function SustainabilityLearning() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const handleToggle = useCallback(
    (index: number) =>
      setExpanded((prev) => (prev === index ? null : index)),
    [],
  )

  if (expanded === null) {
    return (
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
            Belajar Keberlanjutan
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
            Pahami lebih dalam tentang bahan, kemasan, dan kebiasaan yang
            membuat bumi tetap lestari.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sustainabilityArticles.map((article, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleToggle(i)}
                aria-expanded={false}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brand-beige bg-brand-cream text-left shadow-sm outline-none transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                <div className="flex aspect-[16/9] items-center justify-center bg-gray-200/60">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="flex flex-1 items-center px-5 py-4">
                  <span className="text-sm font-semibold leading-snug text-brand-dark group-hover:text-brand-green">
                    {article.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const activeArticle = sustainabilityArticles[expanded]

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Belajar Keberlanjutan
        </h2>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* ── Expanded card ── */}
          <div className="motion-reduce:animate-none min-w-0 flex-1 animate-fade-in-up">
            <div className="overflow-hidden rounded-2xl border border-brand-beige bg-brand-cream shadow-sm">
              <div className="flex aspect-video items-center justify-center bg-gray-200/60">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold leading-snug text-brand-dark">
                    {activeArticle.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setExpanded(null)}
                    aria-label="Tutup artikel"
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-brand-beige bg-white text-brand-dark/40 transition-colors hover:bg-brand-beige hover:text-brand-dark"
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
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-dark/70">
                  {activeArticle.body.map((paragraph, pi) => (
                    <p key={pi}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-4 rounded-lg border border-dashed border-brand-beige-dark bg-brand-warm px-3 py-2 text-xs text-brand-dark/50">
                  (Teks contoh — akan diganti dengan artikel asli)
                </p>
              </div>
            </div>
          </div>

          {/* ── Stacked cards (desktop) ── */}
          <div className="hidden lg:relative lg:block lg:w-32 lg:flex-shrink-0">
            <div className="lg:absolute lg:inset-x-0 lg:top-0" style={{ height: 200 }}>
              {sustainabilityArticles.map((article, i) => {
                if (i === expanded) return null
                const order = i > expanded ? i - 1 : i
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleToggle(i)}
                    aria-expanded={false}
                    className="motion-reduce:!transform-none motion-reduce:!opacity-100 group absolute inset-x-0 flex flex-col overflow-hidden rounded-xl border border-brand-beige bg-white text-left shadow-sm outline-none transition-[transform,opacity] duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    style={{
                      transform: `translateY(${order * 30}px) scale(${0.92 - order * 0.02})`,
                      zIndex: 10 - order,
                      opacity: 0.75 - order * 0.05,
                      height: 130,
                    }}
                  >
                    <div className="flex h-12 items-center justify-center bg-gray-200/40">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gray-400"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div className="flex flex-1 items-center px-3">
                      <span className="line-clamp-2 text-xs font-semibold leading-snug text-brand-dark group-hover:text-brand-green">
                        {article.title}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile: other articles as grid ── */}
        <div className="mt-6 lg:hidden">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-dark/40">
            Artikel lainnya
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {sustainabilityArticles.map((article, i) => {
              if (i === expanded) return null
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleToggle(i)}
                  aria-expanded={false}
                  className="rounded-xl border border-brand-beige bg-brand-cream px-3 py-3 text-left text-xs font-semibold text-brand-dark shadow-sm transition-colors hover:bg-brand-beige focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  {article.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Back-to-all (mobile) ── */}
        <div className="mt-6 text-center lg:hidden">
          <button
            type="button"
            onClick={() => setExpanded(null)}
            className="rounded-full border border-brand-beige bg-white px-6 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-beige"
          >
            Lihat Semua Artikel
          </button>
        </div>
      </div>
    </section>
  )
}
