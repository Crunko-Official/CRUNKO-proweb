"use client";

import { useEffect, useRef } from "react";

export default function StoryClient() {
  const progressRef = useRef<HTMLDivElement>(null);
  const emberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressEl = progressRef.current;
    function updateProgress() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      if (progressEl) progressEl.style.width = pct + "%";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mq.matches) {
      return () => window.removeEventListener("scroll", updateProgress);
    }

    const revealEls = document.querySelectorAll(".story-reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const dissolveEls = document.querySelectorAll(".story-dissolve");
    const dissolveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("in");
            el.classList.remove("out");
          } else if (
            el.classList.contains("in") &&
            entry.boundingClientRect.top < 0
          ) {
            el.classList.add("out");
          }
        });
      },
      { threshold: 0.6 },
    );
    dissolveEls.forEach((el) => dissolveObserver.observe(el));

    const emberEl = emberRef.current;
    const emberObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.5 },
    );
    if (emberEl) emberObserver.observe(emberEl);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      revealObserver.disconnect();
      dissolveObserver.disconnect();
      emberObserver.disconnect();
    };
  }, []);

  return (
    <div className="page-surface min-h-dvh font-serif text-brand-dark">
      {/* Scroll progress */}
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-50 h-[3px] bg-brand-green"
        aria-hidden="true"
      />

      {/* ─── HERO ─── */}
      <header className="flex min-h-dvh flex-col justify-center px-6 py-20 md:px-8">
        <div className="mx-auto w-full" style={{ maxWidth: "640px" }}>
          <p className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-green">
            Cerita Crunko{" "}
            <span className="text-brand-dark/40">· Bab Satu — Kotagede</span>
          </p>
          <h1 className="mb-3 font-serif font-semibold leading-[1.05] text-[clamp(2.3rem,9vw,3.6rem)]">
            Dari Kotagede untuk Masa Depan
          </h1>
          <p className="mb-10 font-serif text-[clamp(1.1rem,4vw,1.4rem)] font-normal italic text-brand-dark/50">
            Kisah Yangko yang Hampir Terlupakan
          </p>
          <p
            className="font-sans text-[clamp(1rem,3vw,1.15rem)] leading-[1.85] text-brand-dark/50"
            style={{ maxWidth: "560px" }}
          >
            Sebelum Yogyakarta dikenal melalui Malioboro yang ramai, sebelum
            bakpia menjadi oleh-oleh yang diburu wisatawan, dan bahkan sebelum
            Kota Yogyakarta berdiri seperti yang kita kenal saat ini, terdapat
            sebuah kawasan yang menjadi pusat kehidupan Kerajaan Mataram Islam:{" "}
            <em className="font-serif text-[1.2em] font-medium italic text-brand-green not-italic">
              Kotagede
            </em>
            .
          </p>
          <div className="mt-12 flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.12em] text-brand-dark/40 before:h-[30px] before:w-px before:bg-brand-green/20 before:content-['']">
            Gulir untuk membaca
          </div>
        </div>
      </header>

      {/* ─── SECTION A: Kotagede ─── */}
      <section className="story-reveal py-12">
        <div
          className="mx-auto w-full px-6 md:px-8"
          style={{ maxWidth: "640px" }}
        >
          <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
            Terletak di sebelah tenggara Kota Yogyakarta, Kotagede merupakan ibu
            kota pertama Kesultanan Mataram yang didirikan oleh Panembahan
            Senopati pada akhir abad ke-16. Hingga hari ini, jejak kejayaan
            tersebut masih dapat ditemukan melalui gang-gang sempit
            berarsitektur Jawa, Masjid Gedhe Mataram, kompleks makam raja-raja
            Mataram, hingga berbagai tradisi yang diwariskan secara
            turun-temurun oleh masyarakat setempat.
          </p>
        </div>
      </section>

      {/* ─── Plate 1 ─── */}
      <div
        className="mx-auto w-full px-6 md:px-8"
        style={{ maxWidth: "640px" }}
      >
        <div className="story-reveal my-10 border border-brand-line bg-white/55 p-[0.6rem] shadow-sm">
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-beige to-brand-sand">
            <svg
              viewBox="0 0 100 60"
              className="w-[34%] opacity-60"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="var(--color-brand-green)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 50 L50 14 L92 50" />
                <path d="M22 50 L22 34 L78 34 L78 50" />
                <line x1="50" y1="14" x2="50" y2="4" />
              </g>
            </svg>
          </div>
          <p className="px-1 pb-1 pt-3 font-mono text-[0.7rem] tracking-[0.03em] text-brand-dark/40">
            Foto placeholder — gang &amp; arsitektur Kotagede
          </p>
        </div>
      </div>

      {/* ─── SECTION B: shift to Yangko ─── */}
      <section className="story-reveal py-12">
        <div
          className="mx-auto w-full px-6 md:px-8"
          style={{ maxWidth: "640px" }}
        >
          <p className="mx-auto mb-[1.4rem] max-w-[480px] text-center font-serif text-[clamp(1.2rem,4.5vw,1.55rem)] font-medium italic leading-[1.5]">
            Di antara warisan sejarah tersebut, terdapat sebuah kuliner
            sederhana yang telah menemani perjalanan masyarakat selama ratusan
            tahun: Yangko.
          </p>
        </div>
      </section>

      <section className="story-reveal py-12">
        <div
          className="mx-auto w-full px-6 md:px-8"
          style={{ maxWidth: "640px" }}
        >
          <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
            Meskipun kini tidak sepopuler bakpia atau gudeg, Yangko merupakan
            salah satu makanan tradisional tertua yang masih bertahan di
            Yogyakarta. Dibuat dari tepung ketan yang menghasilkan tekstur
            kenyal khas, dipadukan dengan rasa manis dan isian kacang yang
            gurih, Yangko menjadi representasi dari kesederhanaan sekaligus
            kekayaan budaya masyarakat Jawa.
          </p>
        </div>
      </section>

      {/* ─── Plate 2 ─── */}
      <div
        className="mx-auto w-full px-6 md:px-8"
        style={{ maxWidth: "640px" }}
      >
        <div className="story-reveal my-10 border border-brand-line bg-white/55 p-[0.6rem] shadow-sm">
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-beige to-brand-sand">
            <svg
              viewBox="0 0 100 60"
              className="w-[34%] opacity-60"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="var(--color-brand-green)"
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <rect x="10" y="14" width="20" height="20" rx="2" />
                <rect x="40" y="14" width="20" height="20" rx="2" />
                <rect x="70" y="14" width="20" height="20" rx="2" />
                <rect x="25" y="34" width="20" height="20" rx="2" />
                <rect x="55" y="34" width="20" height="20" rx="2" />
              </g>
            </svg>
          </div>
          <p className="px-1 pb-1 pt-3 font-mono text-[0.7rem] tracking-[0.03em] text-brand-dark/40">
            Foto placeholder — Yangko, dipotong khas berbentuk kotak
          </p>
        </div>
      </div>

      {/* ─── SECTION C: etymology ─── */}
      <section className="story-reveal py-12">
        <div
          className="mx-auto w-full px-6 md:px-8"
          style={{ maxWidth: "640px" }}
        >
          <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
            Menariknya, tidak banyak orang mengetahui bahwa asal-usul nama
            Yangko masih menyimpan misteri hingga saat ini.
          </p>

          <div className="my-12">
            <span className="mb-4 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-green">
              Catatan Arsip — Asal Nama
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative bg-brand-beige p-6 text-brand-dark before:absolute before:right-3 before:top-3 before:h-[6px] before:w-[6px] before:rounded-full before:bg-brand-green-dark before:content-['']">
                <h3 className="mb-2.5 font-serif text-[1.1rem] font-semibold">
                  Tiyang Kotagede
                </h3>
                <p className="font-sans text-[0.95rem] leading-[1.65]">
                  Salah satu cerita yang berkembang di masyarakat Kotagede
                  menyebutkan bahwa nama &ldquo;Yangko&rdquo; berasal dari
                  gabungan kata &ldquo;Tiyang&rdquo; yang berarti orang dan
                  &ldquo;Kotagede&rdquo;, sehingga dapat dimaknai sebagai
                  makanan khas masyarakat Kotagede.
                </p>
              </div>
              <div className="relative bg-brand-beige p-6 text-brand-dark before:absolute before:right-3 before:top-3 before:h-[6px] before:w-[6px] before:rounded-full before:bg-brand-green-dark before:content-['']">
                <h3 className="mb-2.5 font-serif text-[1.1rem] font-semibold">
                  Kiyangko
                </h3>
                <p className="font-sans text-[0.95rem] leading-[1.65]">
                  Versi lain menyebut bahwa nama tersebut berkembang dari
                  istilah &ldquo;Kiyangko&rdquo;, sebuah sebutan yang telah
                  digunakan masyarakat sejak masa lampau.
                </p>
              </div>
            </div>
            <p className="mt-5 text-center font-serif text-[1.05rem] italic text-brand-dark/50">
              Terlepas dari berbagai versi tersebut, satu hal yang pasti: Yangko
              telah menjadi bagian dari identitas budaya Kotagede selama
              beberapa generasi.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION D: practicality ─── */}
      <section className="story-reveal py-12">
        <div
          className="mx-auto w-full px-6 md:px-8"
          style={{ maxWidth: "640px" }}
        >
          <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
            Konon, pada masa Mataram Islam, makanan berbahan dasar ketan
            memiliki nilai penting karena mampu memberikan rasa kenyang dan
            energi yang cukup tinggi. Karena sifatnya yang praktis, makanan
            berbahan ketan kerap dibawa dalam perjalanan jauh maupun kegiatan
            sehari-hari masyarakat. Karakteristik inilah yang membuat berbagai
            olahan ketan, termasuk Yangko, mampu bertahan dan diwariskan hingga
            ratusan tahun kemudian.
          </p>
        </div>
      </section>

      {/* ─── PIVOT ─── */}
      <div className="bg-gradient-to-b from-transparent to-brand-warm py-20 text-center">
        <p className="story-reveal font-serif text-[clamp(1.3rem,5vw,1.9rem)] font-medium italic text-brand-dark/50">
          Namun waktu terus berjalan.
        </p>
      </div>

      {/* ─── FADING SECTION ─── */}
      <section className="bg-brand-warm py-12">
        <div
          className="mx-auto w-full px-6 md:px-8"
          style={{ maxWidth: "640px" }}
        >
          <div className="story-reveal">
            <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
              Perkembangan industri makanan modern membawa perubahan besar
              terhadap pola konsumsi masyarakat. Generasi muda mulai mengenal
              lebih banyak camilan internasional, makanan instan, dan berbagai
              produk modern yang hadir dengan tampilan menarik serta kemasan
              yang praktis.
            </p>
            <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
              Di sisi lain, makanan tradisional seperti Yangko perlahan mulai
              kehilangan ruang di tengah perubahan zaman.
            </p>
            <p className="mb-[1.4rem] text-[1.0625rem] leading-[1.75]">
              Banyak wisatawan yang datang ke Yogyakarta tanpa pernah mendengar
              nama Yangko. Sebagian mengenal gudeg. Sebagian mengenal bakpia.
              Namun tidak sedikit yang baru mengetahui keberadaan Yangko ketika
              berkunjung langsung ke Kotagede.
            </p>
          </div>
          <p className="story-reveal mx-auto mt-4 max-w-[480px] text-center font-serif text-[clamp(1.2rem,4.5vw,1.55rem)] font-medium italic leading-[1.5]">
            Padahal, ketika sebuah makanan tradisional mulai terlupakan, yang
            hilang bukan hanya produknya.
          </p>
        </div>
      </section>

      {/* ─── SIGNATURE: dissolve triptych ─── */}
      <section
        className="flex min-h-dvh flex-col items-center justify-center bg-brand-warm px-6 py-16 text-center"
        aria-label="Apa yang hilang ketika sebuah tradisi terlupakan"
      >
        <p className="story-dissolve font-serif text-[clamp(1.3rem,6vw,2.1rem)] font-medium italic text-brand-dark/80 max-w-[560px] py-6">
          Yang hilang adalah cerita.
        </p>
        <p className="story-dissolve font-serif text-[clamp(1.3rem,6vw,2.1rem)] font-medium italic text-brand-dark/80 max-w-[560px] py-6">
          Yang hilang adalah identitas.
        </p>
        <p className="story-dissolve font-serif text-[clamp(1.3rem,6vw,2.1rem)] font-medium italic text-brand-dark/80 max-w-[560px] py-6">
          Yang hilang adalah bagian dari warisan budaya yang telah hidup selama
          ratusan tahun.
        </p>
        <div
          ref={emberRef}
          className="story-ember mt-9 h-2 w-2 rounded-full bg-brand-green"
          style={{ boxShadow: "0 0 18px 4px rgba(91, 140, 90, 0.55)" }}
          aria-hidden="true"
        />
        <p className="mt-10 max-w-[420px] font-mono text-[0.72rem] leading-[1.7] tracking-[0.05em] text-brand-dark/40">
          Akhir Bab Satu.
          <br />
          <em className="font-serif text-[0.98rem] italic text-brand-dark/60">
            Bersambung ke Bab Dua — bagaimana Yangko menemukan bentuk barunya.
          </em>
          <br />
          (Placeholder — isi dengan kisah transformasi Yangko menjadi Crunko
          begitu materinya tersedia)
        </p>
      </section>
    </div>
  );
}
