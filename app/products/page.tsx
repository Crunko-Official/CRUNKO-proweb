import { SectionHeading, ProductCard } from "@/components";

export default function ProductsPage() {
  return (
    <section className="page-surface min-h-dvh px-6 section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Produk"
          title="CRUNKO Tersedia dengan Banyak Variasi"
          centered
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            name="CRUNKO Pandan"
            description="Yangko Rasa Pandan."
            delay={0}
          />
          <ProductCard
            name="CRUNKO Melon"
            description="Yangko Rasa Melon"
            delay={150}
          />
          <ProductCard
            name="CRUNKO Stroberi"
            description="Yangko Rasa Stroberi."
            delay={300}
          />
          <ProductCard
            name="CRUNKO Matcha"
            description="Yangko Rasa Matcha."
            badge="Segera Hadir"
            delay={450}
          />
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="interactive-lift inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-brand-green/15 bg-white/75 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-brand-green shadow-sm hover:text-brand-green-dark"
          >
            Lihat Semua Produk — Akan Segera Hadir
            <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
