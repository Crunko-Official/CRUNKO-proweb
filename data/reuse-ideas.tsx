import type { ReactNode } from "react";

function BookIcon() {
  return (
    <svg
      className="inline-block w-5 h-5 align-text-bottom"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg
      className="inline-block w-5 h-5 align-text-bottom"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" rx="1" />
      <line x1="12" y1="7" x2="12" y2="22" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg
      className="inline-block w-5 h-5 align-text-bottom"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export interface ReuseIdea {
  title: string
  icon: ReactNode
  imageAlt: string
  steps: string[]
}

export const reuseIdeas: ReuseIdea[] = [
  {
    title: "Pembatas Buku",
    icon: <BookIcon />,
    imageAlt: "Foto pembatas buku hasil jadi - placeholder",
    steps: [
      "Gunting kemasan CRUNKO mengikuti pola persegi panjang (kurang lebih 5×15 cm).",
      "Lipat kedua ujung kertas ke dalam sepanjang 2 cm untuk membuat lipatan pengunci.",
      "Hias dengan stiker atau gambar sederhana di bagian tengah pembatas.",
      "Selipkan di halaman buku favoritmu — pembatas buku daur ulang siap digunakan!",
    ],
  },
  {
    title: "Label Kado",
    icon: <GiftIcon />,
    imageAlt: "Foto label kado hasil jadi - placeholder",
    steps: [
      "Potong kemasan berbentuk persegi atau persegi panjang dengan gunting.",
      "Lubangi bagian atas dengan pelubang kertas, lalu masukkan tali atau pita.",
      "Tulis nama penerima di sisi depan label dengan spidol atau pulpen.",
      "Ikatkan label pada kado atau tas hadiah — sentuhan personal dari bahan daur ulang!",
    ],
  },
  {
    title: "Kotak Penyimpanan Mini",
    icon: <BoxIcon />,
    imageAlt: "Foto kotak penyimpanan mini hasil jadi - placeholder",
    steps: [
      "Potong kemasan CRUNKO mengikuti pola kotak (bisa unduh pola dari website kami).",
      "Lipat sepanjang garis yang ditandai, lalu tekan lipatan agar rapi.",
      "Oleskan lem pada bagian yang ditandai, lalu rekatkan sisi-sisi kotak.",
      "Biarkan kering selama beberapa menit. Kotak penyimpanan mini siap menampung barang-barang kecilmu!",
    ],
  },
]
