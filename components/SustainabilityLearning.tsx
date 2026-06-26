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
      <section className="page-surface min-h-dvh px-6 section-pad">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
            Belajar Keberlanjutan
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
            Pahami lebih dalam tentang bahan, kemasan, dan kebiasaan yang
            membuat bumi tetap lestari.
          </p>

          <div className="mt-8 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
            {sustainabilityArticles.map((article, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleToggle(i)}
                aria-expanded={false}
                className="card-surface interactive-lift group flex min-h-[260px] flex-col overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-mint to-brand-sage/50">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-green/45"
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
    <section className="page-surface min-h-dvh px-6 section-pad">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Belajar Keberlanjutan
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ── Expanded card ── */}
          <div className="motion-reduce:animate-none min-w-0 animate-fade-in-up">
            <div className="card-surface overflow-hidden rounded-2xl">
              <div className="flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-brand-mint to-brand-sage/50">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-green/45"
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
                className="interactive-lift t-colors flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-brand-line bg-white text-brand-dark/40 hover:bg-brand-green-light hover:text-brand-dark"
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
                <p className="mt-4 rounded-lg border border-dashed border-brand-line bg-brand-mint px-3 py-2 text-xs text-brand-dark/50">
                  (Teks contoh — akan diganti dengan artikel asli)
                </p>
              </div>
            </div>
          </div>

          {/* ── Other articles ── */}
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark/40">
                Artikel lainnya
              </p>
              <button
                type="button"
                onClick={() => setExpanded(null)}
                className="text-xs font-semibold uppercase tracking-widest text-brand-green transition-colors hover:text-brand-green-dark"
              >
                Semua
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {sustainabilityArticles.map((article, i) => {
                if (i === expanded) return null
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleToggle(i)}
                    aria-expanded={false}
                    className="interactive-lift group flex min-h-32 overflow-hidden rounded-2xl border border-brand-line bg-white/85 text-left shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 lg:min-h-36"
                  >
                    <div className="flex w-20 flex-shrink-0 items-center justify-center bg-brand-mint sm:w-full sm:basis-2/5 lg:w-24 lg:basis-auto">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-brand-green/45"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center px-4 py-3">
                      <span className="line-clamp-3 text-sm font-semibold leading-snug text-brand-dark group-hover:text-brand-green">
                        {article.title}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
