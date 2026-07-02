"use client";

import { useState, useCallback, type ReactNode } from "react";
import { sustainabilityArticles } from "@/data/articles";
import type { Article, ArticleBlock } from "@/data/articles";

/* ──────────────── Per-topic SVG icons ──────────────── */

function ArticleIcon({ icon }: { icon: Article["icon"] }) {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 48 48"
      fill="none"
      stroke="#5B8C5A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon === "fiber" && (
        <>
          <path d="M24 8 C31 12 33 21 24 30 C15 21 17 12 24 8 Z" />
          <path d="M24 11 C24 17 24 23 24 29" />
          <path d="M24 30 C21 33 24 35 21 38 C18 41 21 43 18 46" />
          <circle cx="18" cy="46" r="1.6" fill="#D6A84F" stroke="none" />
        </>
      )}
      {icon === "recycle" && (
        <>
          <path d="M24 8 L29 17 L23 17" />
          <path d="M24 8 L18 19" />
          <path d="M13 26 L8 34 L14 34" />
          <path d="M8 34 L18 34" />
          <path d="M35 26 L40 34 L34 34" />
          <path d="M40 34 L30 34" />
          <path d="M29 17 L34 26" />
          <path d="M18 19 L13 26" />
          <path d="M18 34 L14 40" />
          <path d="M30 34 L34 40" />
          <circle cx="24" cy="24" r="2" fill="#D6A84F" stroke="none" />
        </>
      )}
      {icon === "circular" && (
        <>
          <path d="M15 12 A13 13 0 0 1 36 19" />
          <path d="M36 19 L31 17" />
          <path d="M36 19 L33 24" />
          <path d="M33 36 A13 13 0 0 1 12 29" />
          <path d="M12 29 L17 31" />
          <path d="M12 29 L15 24" />
          <circle cx="24" cy="24" r="2" fill="#D6A84F" stroke="none" />
        </>
      )}
      {icon === "sort" && (
        <>
          <path d="M6 15 L20 15" />
          <path d="M8 17 L18 17 L17 40 L9 40 Z" />
          <path d="M28 15 L42 15" />
          <path d="M30 17 L40 17 L39 40 L31 40 Z" />
          <path d="M13 22 L13 34" />
          <path d="M35 22 L35 34" />
          <circle cx="13" cy="12" r="1.8" fill="#D6A84F" stroke="none" />
          <circle cx="35" cy="12" r="1.8" fill="#5B8C5A" stroke="none" />
        </>
      )}
    </svg>
  );
}

/* ──────────────── Inline bold helper ──────────────── */

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* ──────────────── Block renderer ──────────────── */

function BlockRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-sm leading-relaxed text-brand-dark/70">
                {renderInline(block.text)}
              </p>
            );
          case "subheading":
            return (
              <div key={i} className="flex items-start gap-3 pt-1">
                <span className="mt-1 block h-5 w-1 flex-shrink-0 rounded-full bg-brand-green" />
                <h4 className="text-base font-bold text-brand-green">
                  {renderInline(block.text)}
                </h4>
              </div>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2 pl-5">
                {block.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-dark/70">
                    <span className="mt-[5px] flex h-[10px] w-[10px] flex-shrink-0 items-center justify-center rounded-full bg-brand-green-light/80" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ──────────────── Sources footer ──────────────── */

function SourcesList({ sources }: { sources: Article["sources"] }) {
  if (!sources.length) return null;
  return (
    <div className="mt-6 space-y-2 border-t border-brand-line pt-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark/40">
        Referensi
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {sources.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs text-brand-dark/45 transition-colors hover:text-brand-green"
          >
            {s.label}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50 transition-opacity group-hover:opacity-100"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17L21 3" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── Grid card (list view) ──────────────── */

function ArticleCard({
  article,
  index,
  onSelect,
}: {
  article: Article;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-expanded={false}
      className="card-surface interactive-lift group flex min-h-[260px] flex-col overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
    >
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-mint to-brand-sage/50">
        <ArticleIcon icon={article.icon} />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold leading-snug text-brand-dark group-hover:text-brand-green">
            {article.title}
          </span>
          <span className="mt-0.5 flex-shrink-0 rounded-full bg-brand-green-light/60 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-brand-green-dark">
            {article.readingTime}
          </span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-brand-dark/55">
          {article.excerpt}
        </p>
      </div>
    </button>
  );
}

/* ──────────────── Sidebar card ──────────────── */

function SidebarCard({
  article,
  index,
  onSelect,
}: {
  article: Article;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-expanded={false}
      className="interactive-lift group flex min-h-32 overflow-hidden rounded-2xl border border-brand-line bg-white/85 text-left shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 lg:min-h-36"
    >
      <div className="flex w-20 flex-shrink-0 items-center justify-center bg-brand-mint sm:w-full sm:basis-2/5 lg:w-24 lg:basis-auto">
        <ArticleIcon icon={article.icon} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
        <span className="line-clamp-2 text-sm font-semibold leading-snug text-brand-dark group-hover:text-brand-green">
          {article.title}
        </span>
        <p className="line-clamp-2 text-xs leading-relaxed text-brand-dark/50">
          {article.excerpt}
        </p>
      </div>
    </button>
  );
}

/* ──────────────── Main component ──────────────── */

export default function SustainabilityLearning() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggle = useCallback(
    (index: number) =>
      setExpanded((prev) => (prev === index ? null : index)),
    [],
  );

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
              <ArticleCard
                key={article.slug}
                article={article}
                index={i}
                onSelect={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activeArticle = sustainabilityArticles[expanded];

  return (
    <section className="page-surface min-h-dvh px-6 section-pad">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Belajar Keberlanjutan
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="motion-reduce:animate-none min-w-0 animate-fade-in-up">
            <div className="card-surface overflow-hidden rounded-2xl">
              <div className="flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-brand-mint to-brand-sage/50">
                <ArticleIcon icon={activeArticle.icon} />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold leading-snug text-brand-dark">
                      {activeArticle.title}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-brand-green-light/60 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-brand-green-dark">
                      {activeArticle.readingTime}
                    </span>
                  </div>
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

                <div className="mt-5">
                  <BlockRenderer blocks={activeArticle.blocks} />
                </div>

                <SourcesList sources={activeArticle.sources} />
              </div>
            </div>
          </div>

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
                if (i === expanded) return null;
                return (
                  <SidebarCard
                    key={article.slug}
                    article={article}
                    index={i}
                    onSelect={() => handleToggle(i)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
