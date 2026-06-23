import Link from "next/link";

export default function ArtikelPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 text-center px-6">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="8" y1="15" x2="12" y2="15" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
          Segera Hadir
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-brand-dark/60">
          Halaman Artikel Singkat sedang dalam pengembangan.
        </p>
        <Link
          href="/products"
          className="rounded-full bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:bg-brand-green-dark hover:shadow-xl"
        >
          Lihat Produk
        </Link>
      </div>
    </section>
  );
}
