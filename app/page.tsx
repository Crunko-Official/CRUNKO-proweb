import Image from "next/image";

export default function Home() {
  return (
    <section className="page-surface relative flex min-h-dvh items-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,140,90,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(91,140,90,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 pb-14 pt-24 md:gap-12 md:py-20 lg:flex-row lg:py-24">
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div
            className="animate-fade-in-up opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <span className="inline-block rounded-full border border-brand-green/20 bg-white/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green shadow-sm backdrop-blur-sm">
              🌱 Berbasis Tanaman · Organik · Bebas Limbah
            </span>
          </div>

          <h1
            className="animate-fade-in-up max-w-2xl text-4xl font-bold leading-tight tracking-tight text-brand-dark opacity-0 md:text-6xl md:leading-[1.08] lg:text-7xl"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            Natural Bite
            <br />
            <span className="bg-gradient-to-r from-brand-green to-brand-accent bg-clip-text text-transparent">
              Local Delight
            </span>
          </h1>

          <p
            className="animate-fade-in-up max-w-lg text-base leading-relaxed text-brand-dark/60 opacity-0 md:text-lg"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            Camilan renyah dan bergizi yang dibuat dari bahan organik. Setiap
            gigitan mengandung kejutan.
          </p>

          <div
            className="animate-fade-in-up flex w-full flex-col items-stretch gap-3 opacity-0 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
          >
            <a
              href="/products"
              className="interactive-lift rounded-full bg-brand-green px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-green/25 hover:bg-brand-green-dark"
            >
              Jelajahi Camilan Kami
            </a>
            <a
              href="/story"
              className="interactive-lift rounded-full border border-brand-line bg-white/75 px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-brand-dark hover:border-brand-green/30 hover:bg-white"
            >
              Cerita Kami
            </a>
          </div>
        </div>

        <div
          className="animate-fade-in-up relative flex flex-1 items-center justify-center opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <div className="animate-float w-full max-w-[560px]">
            <Image
              src="/product.png"
              alt="Produk CRUNKO"
              width={15000}
              height={15000}
              className="h-auto w-full drop-shadow-[0_26px_50px_rgba(45,58,45,0.16)]"
              priority
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
    </section>
  );
}
