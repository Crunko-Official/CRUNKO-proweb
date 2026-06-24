import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak — CRUNKO",
  description:
    "Hubungi CRUNKO melalui email atau WhatsApp. Kami siap membantu.",
};

const contacts = [
  {
    label: "Email",
    value: "crunko.official@gmail.com",
    href: "mailto:crunko.official@gmail.com",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
  },
  {
    label: "WhatsApp 1",
    value: "0818-230-410",
    href: "https://wa.me/62818230410",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp 2",
    value: "0899-7051-034",
    href: "https://wa.me/628997051034",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-20">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-brand-dark text-center">
          Hubungi Kami
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-brand-dark/60">
          Punya pertanyaan atau masukan? Tim CRUNKO siap membantu.
        </p>

        <div className="mt-10 space-y-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="flex items-center gap-4 rounded-2xl border border-brand-beige bg-white px-6 py-5 text-brand-dark shadow-sm transition-all duration-200 hover:border-brand-green/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                {c.icon}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark/40">
                  {c.label}
                </p>
                <p className="mt-0.5 text-base font-medium">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
