"use client";

import { useState, useCallback } from "react";
import { getEcoLevel } from "@/data/eco-impact-data";

const levelStyles: Record<string, string> = {
  "Eco Starter": "bg-brand-beige text-brand-dark/70",
  "Eco Supporter": "bg-brand-green-light text-brand-green-dark",
  "Eco Champion": "bg-brand-sage text-brand-green-dark",
  "Eco Guardian": "bg-brand-leaf/20 text-brand-green-dark",
};

export default function PersonalImpactCalculator() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const num = parseInt(input, 10);
  const valid = !Number.isNaN(num) && num >= 0 && input.trim() !== "";

  const level = valid ? getEcoLevel(num) : "";
  const levelClass = level ? (levelStyles[level] ?? "") : "";

  const handleShare = useCallback(async () => {
    const text = `🌱 Eco Impact Tracker — CRUNKO\n\nAku sudah mencapai level "${level}" dengan ${num} CRUNKO! ${num} kemasan Ivory paperboard diperkirakan berpotensi kembali ke rantai daur ulang.\n\nHitung dampakmu di crunko.eco/impact`;

    if (typeof navigator !== "undefined") {
      if ("share" in navigator) {
        try {
          await navigator.share({ title: "Eco Impact Tracker — CRUNKO", text });
          return;
        } catch {
          // user cancelled fall through to clipboard
        }
      }
      try {
        await (navigator as Navigator).clipboard.writeText(text);
      } catch {
        // clipboard not available
      }
    }
  }, [num, level]);

  return (
    <section className="page-surface px-6 section-pad">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
          Dampak Pribadimu
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
          Setiap CRUNKO yang kamu nikmati adalah bagian dari perjalanan menuju
          masa depan yang lebih lestari.
        </p>

        <label
          htmlFor="crunko-input"
          className="mt-8 block text-sm font-medium text-brand-dark"
        >
          Sudah berapa CRUNKO yang kamu nikmati sejauh ini?
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="crunko-input"
            type="number"
            min={0}
            inputMode="numeric"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSubmitted(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) setSubmitted(true);
            }}
            className="w-full rounded-xl border border-brand-line bg-white/85 px-4 py-3 text-center text-lg font-semibold text-brand-dark shadow-sm outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 sm:w-36 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="0"
          />
          <button
            type="button"
            onClick={() => valid && setSubmitted(true)}
            disabled={!valid}
            className="interactive-lift rounded-xl bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Hitung
          </button>
        </div>

        {submitted && valid && (
          <div className="card-surface mt-8 animate-fade-in-up space-y-4 rounded-2xl p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-brand-dark/60">
                Level Eco-mu
              </span>
              <span
                className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${levelClass}`}
              >
                {level}
              </span>
            </div>

            <div className="border-t border-brand-beige pt-4">
              <p className="text-sm leading-relaxed text-brand-dark">
                Dengan <strong>{num.toLocaleString("id-ID")} CRUNKO</strong>,
                kamu diperkirakan telah menggunakan{" "}
                <strong>{num.toLocaleString("id-ID")}</strong> kemasan Ivory
                paperboard yang <strong>berpotensi</strong> masuk kembali ke
                rantai daur ulang.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
