'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type JSX } from 'react';

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ImpactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

function StoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ArtikelIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function RecycleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

const navItems: { href: string; label: string; icon: () => JSX.Element }[] = [
  { href: '/', label: 'Beranda', icon: HomeIcon },
  { href: '/products', label: 'Produk', icon: ProductsIcon },
  { href: '/impact', label: 'Pelacak Dampak', icon: ImpactIcon },
  { href: '/story', label: 'Cerita Crunko', icon: StoryIcon },
  { href: '/artikel', label: 'Artikel Singkat', icon: ArtikelIcon },
  { href: '/ide-daur-ulang', label: 'Ide Daur Ulang', icon: RecycleIcon },
  { href: '/contact', label: 'Kontak', icon: ContactIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 shadow-lg ring-1 ring-brand-line backdrop-blur-md transition-transform duration-300 ease-out hover:scale-105 md:hidden"
        aria-label="Toggle navigation"
      >
        <div className="flex flex-col gap-1">
          <span className={`block h-0.5 w-5 bg-brand-dark transition-all duration-300 ${mobileOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-brand-dark transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-brand-dark transition-all duration-300 ${mobileOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </div>
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-brand-line bg-brand-cream/92 shadow-[18px_0_45px_rgba(45,58,45,0.08)] backdrop-blur-xl transition-transform duration-500 ease-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center border-b border-brand-line px-6 py-7">
          <Image
            src="/logo.png"
            alt="CRUNKO"
            width={240}
            height={80}
            className="h-auto w-auto max-w-[200px]"
            priority
          />
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-3 py-5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`interactive-lift flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? 'bg-white text-brand-green shadow-sm ring-1 ring-brand-green/15'
                    : 'text-brand-dark/60 hover:bg-white/70 hover:text-brand-dark'
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-brand-green" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-brand-line px-6 py-5">
          <div className="flex items-start gap-2 text-xs leading-relaxed text-brand-dark/50">
            <LeafIcon />
            <span>Keberlanjutan di setiap gigitan</span>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-brand-dark/24 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
