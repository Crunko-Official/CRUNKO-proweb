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
    <section className="page-surface min-h-dvh px-6 section-pad">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Ide Daur Ulang &amp; Penggunaan Kembali
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
          Jangan buru-buru membuang kemasan CRUNKO-mu. Dengan sedikit kreativitas,
          kemasan ini bisa disulap jadi barang-barang unik dan berguna.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <BookmarkCard reduced={reduced} />
          <GiftTagCard reduced={reduced} />
          <StorageBoxCard />
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
    <div className="flex min-h-[430px] flex-col">
      {/* Washi-tape accent */}
      <div
        className="absolute -right-4 -top-4 h-16 w-12 rotate-[18deg] rounded-sm opacity-80"
        style={{
          background:
            "repeating-linear-gradient(45deg, #D6A84F 0, #D6A84F 4px, #C9DCC5 4px, #C9DCC5 6px)",
        }}
      />

      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-mint to-brand-leaf/20">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-green/50"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      <div className="flex flex-1 flex-col justify-between px-5 pb-4 pt-4">
        <div>
          <p className="text-lg font-bold text-brand-dark">{data.icon} {data.title}</p>
          <p className="mt-1 text-xs text-brand-dark/55">
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
            className="text-brand-leaf"
          >
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
          <span className="flex-1 border-b-2 border-dashed border-brand-leaf/45" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-green">
            Potong di sini
          </span>
        </div>
      </div>

      {/* Book spine */}
      <div className="mt-auto h-4 rounded-b-2xl bg-brand-green/15" />
    </div>
  )

  const back = (
    <div className="flex min-h-[430px] flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-brand-dark">{data.icon} {data.title}</p>
        <button
          type="button"
          onClick={stopToggle}
          aria-label="Kembali"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-line bg-white text-brand-green transition-colors hover:bg-brand-green-light"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <ol className="mt-4 flex-1 space-y-3">
        {data.steps.map((step, si) => (
          <li key={si} className="flex gap-2.5 text-sm leading-relaxed text-brand-dark/75">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-light text-xs font-bold text-brand-green-dark">
              {si + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-lg border border-dashed border-brand-line bg-brand-mint px-3 py-2 text-xs text-brand-dark/55">
        (Teks contoh — akan diganti dengan tutorial asli)
      </p>

      <button
        type="button"
        onClick={stopToggle}
        className="mt-3 w-full rounded-lg border border-brand-line py-2 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green-light"
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
        className="card-surface cursor-pointer overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        {flipped ? back : front}
      </div>
    )
  }

  return (
    <div
      className="card-surface rounded-2xl"
      style={{ perspective: "1000px" }}
    >
      <div
        {...commonProps}
        className="relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="motion-reduce:!transform-none"
          style={{
            transition: "transform 0.5s var(--ease-out-expo)",
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

/* ──────────────── Card 2: Gift Tag (3D rotateY flip) ──────────────── */

function GiftTagCard({ reduced }: { reduced: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const data = reuseIdeas[1]
  const toggle = () => setFlipped((v) => !v)
  const stopToggle = (e: React.MouseEvent) => { e.stopPropagation(); toggle() }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
  }

  const front = (
    <div className="flex min-h-[430px] flex-col">
      {/* String / ribbon */}
      <div className="relative flex justify-center pt-2">
        <svg
          width="48"
          height="40"
          viewBox="0 0 48 40"
          className="animate-sway motion-reduce:!animate-none text-brand-green"
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
      <div className="relative mx-5 mt-2 flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-brand-mint to-brand-sage/60">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-green/50"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      <div className="flex-1 px-5 pb-4 pt-4">
        <p className="text-lg font-bold text-brand-dark">{data.icon} {data.title}</p>
        <p className="mt-1 text-xs text-brand-dark/55">
          Gambar placeholder — foto label kado hasil jadi
        </p>
      </div>
    </div>
  )

  const back = (
    <div className="flex min-h-[430px] flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-brand-dark">{data.icon} {data.title}</p>
        <button
          type="button"
          onClick={stopToggle}
          aria-label="Kembali"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-line bg-white text-brand-green transition-colors hover:bg-brand-green-light"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <ol className="mt-4 flex-1 space-y-3">
        {data.steps.map((step, si) => (
          <li key={si} className="flex gap-2.5 text-sm leading-relaxed text-brand-dark/75">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-light text-xs font-bold text-brand-green-dark">
              {si + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-lg border border-dashed border-brand-line bg-brand-mint px-3 py-2 text-xs text-brand-dark/55">
        (Teks contoh — akan diganti dengan tutorial asli)
      </p>

      <button
        type="button"
        onClick={stopToggle}
        className="mt-3 w-full rounded-lg border border-brand-line py-2 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green-light"
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
        className="card-surface cursor-pointer overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        {flipped ? back : front}
      </div>
    )
  }

  return (
    <div
      className="card-surface overflow-hidden rounded-2xl"
      style={{ perspective: "1000px" }}
    >
      <div
        {...commonProps}
        className="relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="motion-reduce:!transform-none"
          style={{
            transition: "transform 0.5s var(--ease-out-expo)",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div style={{ backfaceVisibility: "hidden" }}>{front}</div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
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

function StorageBoxCard() {
  const [open, setOpen] = useState(false)
  const data = reuseIdeas[2]
  const toggle = () => setOpen((v) => !v)

  return (
    <div className="card-surface relative overflow-hidden rounded-2xl">
      {/* Content (always rendered under the lid) */}
      <div className="flex min-h-[430px] flex-col p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-brand-dark">{data.icon} {data.title}</p>
          {open && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Tutup"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-line bg-white text-brand-green transition-colors hover:bg-brand-green-light"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <ol className="mt-4 flex-1 space-y-3">
          {data.steps.map((step, si) => (
            <li key={si} className="flex gap-2.5 text-sm leading-relaxed text-brand-dark/75">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-light text-xs font-bold text-brand-green-dark">
                {si + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="mt-4 rounded-lg border border-dashed border-brand-line bg-brand-mint px-3 py-2 text-xs text-brand-dark/55">
          (Teks contoh — akan diganti dengan tutorial asli)
        </p>

        {open && (
          <button
            type="button"
            onClick={toggle}
            className="mt-3 w-full rounded-lg border border-brand-line py-2 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green-light"
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
        className="absolute inset-0 z-10 flex w-full cursor-pointer flex-col outline-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        style={{
          transition: "transform 0.5s var(--ease-out-expo), opacity 0.5s var(--ease-out-expo)",
          transform: open ? "translateY(-100%)" : "translateY(0)",
          opacity: open ? 0 : 1,
        }}
      >
        {/* Subtle grid background */}
        <div
          className="flex flex-1 flex-col rounded-2xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,140,90,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,90,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundColor: "#F1F8EF",
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
              className="text-brand-green/50"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <div className="flex-1 px-5 pb-4 pt-4">
            <p className="text-lg font-bold text-brand-dark">{data.icon} {data.title}</p>
            <p className="mt-1 text-xs text-brand-dark/55">
              Gambar placeholder — foto kotak hasil jadi
            </p>
          </div>

          {/* Dashed fold-lines */}
          <div className="relative px-5 pb-4">
            <div className="border-b-2 border-dashed border-brand-green/30" />
            <div className="ml-8 mt-2 w-3/4 border-b-2 border-dashed border-brand-green/20" />
            <div className="ml-16 mt-2 w-1/2 border-b-2 border-dashed border-brand-green/20" />
          </div>
        </div>
      </button>
    </div>
  )
}
