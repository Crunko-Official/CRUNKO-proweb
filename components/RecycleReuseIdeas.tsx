"use client"

import { useState, useEffect } from "react"
import { reuseIdeas } from "@/data/reuse-ideas"

export default function RecycleReuseIdeas() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }
    return false
  })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <section className="bg-brand-cream px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Ide Daur Ulang &amp; Penggunaan Kembali
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
          Jangan buru-buru membuang kemasan CRUNKO-mu. Dengan sedikit kreativitas,
          kemasan ini bisa disulap jadi barang-barang unik dan berguna.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <BookmarkCard reduced={reduced} />
          <GiftTagCard reduced={reduced} />
          <StorageBoxCard reduced={reduced} />
        </div>
      </div>
    </section>
  )
}

/* ──────────────── Card 1: Bookmark (3D rotateY flip) ──────────────── */

function BookmarkCard({ reduced }: { reduced: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const data = reuseIdeas[0]
  const toggle = () => setFlipped((v) => !v)
  const stopToggle = (e: React.MouseEvent) => { e.stopPropagation(); toggle() }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
  }

  const front = (
    <div className="flex min-h-[380px] flex-col">
      {/* Washi-tape accent */}
      <div
        className="absolute -right-4 -top-4 h-16 w-12 rotate-[18deg] rounded-sm opacity-80"
        style={{
          background:
            "repeating-linear-gradient(45deg, #fcd34d 0, #fcd34d 4px, #fbbf24 4px, #fbbf24 6px)",
        }}
      />

      <div className="flex aspect-[4/3] items-center justify-center bg-amber-100/50">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-400"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      <div className="flex flex-1 flex-col justify-between px-5 pb-4 pt-4">
        <div>
          <p className="text-lg font-bold text-amber-900">{data.icon} {data.title}</p>
          <p className="mt-1 text-xs text-amber-700/60">
            Gambar placeholder — foto bookmark hasil jadi
          </p>
        </div>

        {/* Dashed cut-line + scissors */}
        <div className="mt-3 flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-500"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
          <span className="flex-1 border-b-2 border-dashed border-amber-300" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
            Potong di sini
          </span>
        </div>
      </div>

      {/* Book spine */}
      <div className="mt-auto h-4 rounded-b-2xl bg-amber-800/20" />
    </div>
  )

  const back = (
    <div className="flex min-h-[380px] flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-amber-900">{data.icon} {data.title}</p>
        <button
          type="button"
          onClick={stopToggle}
          aria-label="Kembali"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-600 transition-colors hover:bg-amber-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <ol className="mt-4 flex-1 space-y-3">
        {data.steps.map((step, si) => (
          <li key={si} className="flex gap-2.5 text-sm leading-relaxed text-amber-900/75">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">
              {si + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-700/60">
        (Teks contoh — akan diganti dengan tutorial asli)
      </p>

      <button
        type="button"
        onClick={stopToggle}
        className="mt-3 w-full rounded-lg border border-amber-200 py-2 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
      >
        Kembali
      </button>
    </div>
  )

  const commonProps = {
    onClick: toggle,
    onKeyDown: handleKeyDown,
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": flipped,
  }

  if (reduced) {
    return (
      <div
        {...commonProps}
        className="cursor-pointer overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        {flipped ? back : front}
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl bg-amber-50 shadow-sm ring-1 ring-amber-200"
      style={{ perspective: "1000px" }}
    >
      <div
        {...commonProps}
        className="relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="transition-[transform] duration-[350ms] motion-reduce:!transform-none"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div style={{ backfaceVisibility: "hidden" }}>{front}</div>
          {/* Back */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────── Card 2: Gift Tag (bouncy rotateX flip up) ──────────────── */

function GiftTagCard({ reduced }: { reduced: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const data = reuseIdeas[1]
  const toggle = () => setFlipped((v) => !v)
  const stopToggle = (e: React.MouseEvent) => { e.stopPropagation(); toggle() }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
  }

  const front = (
    <div className="flex min-h-[380px] flex-col">
      {/* String / ribbon */}
      <div className="relative flex justify-center pt-2">
        <svg
          width="48"
          height="40"
          viewBox="0 0 48 40"
          className="animate-sway motion-reduce:!animate-none text-rose-400"
          style={{ transformOrigin: "24px 0" }}
          aria-hidden="true"
        >
          <path
            d="M24 8 C24 8, 12 30, 6 36 M24 8 C24 8, 36 30, 42 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="8" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Gift-tag notch near top — simulated via a cut-out circle */}
      <div className="relative mx-5 mt-2 flex aspect-[4/3] items-center justify-center rounded-xl bg-rose-100/60">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-rose-400"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      <div className="flex-1 px-5 pb-4 pt-4">
        <p className="text-lg font-bold text-rose-800">{data.icon} {data.title}</p>
        <p className="mt-1 text-xs text-rose-700/60">
          Gambar placeholder — foto label kado hasil jadi
        </p>
      </div>
    </div>
  )

  const back = (
    <div className="flex min-h-[380px] flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-rose-800">{data.icon} {data.title}</p>
        <button
          type="button"
          onClick={stopToggle}
          aria-label="Kembali"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-600 transition-colors hover:bg-rose-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <ol className="mt-4 flex-1 space-y-3">
        {data.steps.map((step, si) => (
          <li key={si} className="flex gap-2.5 text-sm leading-relaxed text-rose-800/75">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-200 text-xs font-bold text-rose-700">
              {si + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-lg border border-dashed border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700/60">
        (Teks contoh — akan diganti dengan tutorial asli)
      </p>

      <button
        type="button"
        onClick={stopToggle}
        className="mt-3 w-full rounded-lg border border-rose-200 py-2 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
      >
        Kembali
      </button>
    </div>
  )

  const commonProps = {
    onClick: toggle,
    onKeyDown: handleKeyDown,
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": flipped,
  }

  if (reduced) {
    return (
      <div
        {...commonProps}
        className="cursor-pointer overflow-hidden rounded-2xl border border-rose-200 bg-rose-50 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        {flipped ? back : front}
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl bg-rose-50 shadow-sm ring-1 ring-rose-200"
      style={{ perspective: "800px" }}
    >
      <div
        {...commonProps}
        className="relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="transition-[transform] duration-[300ms] motion-reduce:!transform-none"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            transform: flipped ? "rotateX(-180deg)" : "rotateX(0deg)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Front */}
          <div style={{ backfaceVisibility: "hidden" }}>{front}</div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-rose-50"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────── Card 3: Mini Storage Box (lid slide) ──────────────── */

function StorageBoxCard({ reduced }: { reduced: boolean }) {
  const [open, setOpen] = useState(false)
  const data = reuseIdeas[2]
  const toggle = () => setOpen((v) => !v)

  const dur = reduced ? "duration-0" : "duration-300"

  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-orange-50 shadow-sm">
      {/* Content (always rendered under the lid) */}
      <div className="flex min-h-[380px] flex-col p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-orange-900">{data.icon} {data.title}</p>
          {open && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Tutup"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-600 transition-colors hover:bg-orange-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <ol className="mt-4 flex-1 space-y-3">
          {data.steps.map((step, si) => (
            <li key={si} className="flex gap-2.5 text-sm leading-relaxed text-orange-900/75">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-200 text-xs font-bold text-orange-800">
                {si + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="mt-4 rounded-lg border border-dashed border-orange-300 bg-orange-100/50 px-3 py-2 text-xs text-orange-700/60">
          (Teks contoh — akan diganti dengan tutorial asli)
        </p>

        {open && (
          <button
            type="button"
            onClick={toggle}
            className="mt-3 w-full rounded-lg border border-orange-200 py-2 text-xs font-semibold text-orange-700 transition-colors hover:bg-orange-100"
          >
            Tutup Kotak
          </button>
        )}
      </div>

      {/* Lid */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={open}
        className={`absolute inset-0 z-10 flex w-full cursor-pointer flex-col outline-none transition-[transform,opacity] ${dur} motion-reduce:!translate-y-0 motion-reduce:!opacity-100 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2`}
        style={{
          transform: open ? "translateY(-100%)" : "translateY(0)",
          opacity: open ? 0 : 1,
        }}
      >
        {/* Subtle grid background */}
        <div
          className="flex flex-1 flex-col rounded-2xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <div className="flex aspect-[4/3] items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-400"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <div className="flex-1 px-5 pb-4 pt-4">
            <p className="text-lg font-bold text-orange-900">{data.icon} {data.title}</p>
            <p className="mt-1 text-xs text-orange-700/60">
              Gambar placeholder — foto kotak hasil jadi
            </p>
          </div>

          {/* Dashed fold-lines */}
          <div className="relative px-5 pb-4">
            <div className="border-b-2 border-dashed border-orange-300" />
            <div className="mt-2 ml-8 w-3/4 border-b-2 border-dashed border-orange-200" />
            <div className="mt-2 ml-16 w-1/2 border-b-2 border-dashed border-orange-200" />
          </div>
        </div>
      </button>
    </div>
  )
}
