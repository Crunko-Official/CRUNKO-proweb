"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { reuseIdeas } from "@/data/reuse-ideas";

type LightboxState = { src: string; alt: string; title: string } | null;

export default function RecycleReuseIdeas() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  return (
    <section className="page-surface min-h-dvh px-6 section-pad">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Ide Daur Ulang &amp; Penggunaan Kembali
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
          Jangan buru-buru membuang kemasan CRUNKO-mu. Dengan sedikit
          kreativitas, kemasan ini bisa disulap jadi barang-barang unik dan
          berguna.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <IllustratedIdeaCard
            icon={reuseIdeas[0].icon}
            title={reuseIdeas[0].title}
            image="/bookmark.png"
            imageAlt="Tutorial membuat bookmark dari kemasan CRUNKO"
            onExpand={() =>
              setLightbox({
                src: "/bookmark.png",
                alt: "Tutorial membuat bookmark dari kemasan CRUNKO",
                title: reuseIdeas[0].title,
              })
            }
          />
          <IllustratedIdeaCard
            icon={reuseIdeas[1].icon}
            title={reuseIdeas[1].title}
            image="/gifttag.png"
            imageAlt="Tutorial membuat label kado dari kemasan CRUNKO"
            onExpand={() =>
              setLightbox({
                src: "/gifttag.png",
                alt: "Tutorial membuat label kado dari kemasan CRUNKO",
                title: reuseIdeas[1].title,
              })
            }
          />
          <StorageBoxCard />
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Tutup"
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark shadow-lg transition-colors hover:bg-brand-green-light"
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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ──────────────── Illustrated idea card (image is the full tutorial) ──────────────── */

function IllustratedIdeaCard({
  icon,
  title,
  image,
  imageAlt,
  onExpand,
}: {
  icon: ReactNode;
  title: string;
  image: string;
  imageAlt: string;
  onExpand: () => void;
}) {
  return (
    <div className="card-surface interactive-lift flex min-h-[430px] flex-col overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={onExpand}
        aria-label={`Perbesar ${imageAlt}`}
        className="group relative flex aspect-[4/3] items-center justify-center bg-white p-4 outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-brand-line shadow-sm">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-green shadow">
          🔍 Perbesar
        </span>
      </button>

      <div className="flex flex-1 flex-col justify-between gap-3 px-5 pb-5 pt-4">
        <div>
          <p className="text-lg font-bold text-brand-dark">
            {icon} {title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-brand-dark/55">
            Pola potong dan langkah lengkap ada di dalam gambar — klik untuk
            memperbesar.
          </p>
        </div>
        <button
          type="button"
          onClick={onExpand}
          className="w-full rounded-lg border border-brand-line py-2 text-xs font-semibold text-brand-green transition-colors hover:bg-brand-green-light"
        >
          Lihat Tutorial Lengkap
        </button>
      </div>
    </div>
  );
}

/* ──────────────── Card 3: Mini Storage Box (lid slide) ──────────────── */

function StorageBoxCard() {
  const [open, setOpen] = useState(false);
  const data = reuseIdeas[2];
  const toggle = () => setOpen((v) => !v);

  return (
    <div className="card-surface relative overflow-hidden rounded-2xl">
      {/* Content (always rendered under the lid) */}
      <div className="flex min-h-[430px] flex-col p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-brand-dark">
            {data.icon} {data.title}
          </p>
          {open && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Tutup"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-line bg-white text-brand-green transition-colors hover:bg-brand-green-light"
            >
              <svg
                width="14"
                height="14"
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
          )}
        </div>

        <ol className="mt-4 flex-1 space-y-3">
          {data.steps.map((step, si) => (
            <li
              key={si}
              className="flex gap-2.5 text-sm leading-relaxed text-brand-dark/75"
            >
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
          transition:
            "transform 0.5s var(--ease-out-expo), opacity 0.5s var(--ease-out-expo)",
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
            <p className="text-lg font-bold text-brand-dark">
              {data.icon} {data.title}
            </p>
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
  );
}
