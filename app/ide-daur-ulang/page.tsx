import Link from "next/link";

export default function IdeDaurUlangPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center gap-6 text-center px-6">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
          Segera Hadir
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-brand-dark/60">
          Halaman Ide Daur Ulang dan Penggunaan Kembali sedang dalam pengembangan.
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
