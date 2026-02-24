export type HighlightBadge = {
  text: string;
  variant?: "up" | "down" | "info" | "warn" ;
}

export type Highlight = {
  id: string;
  title: string;
  subtitle?: string;
  value: number | string;
  unit?: string;
  badge?: HighlightBadge;
  source?: string;
  description: string;
  videoUrl?: string; // bisa "/videos/xxx.mp4" atau "https://....mp4"
  icon: string;
};

export const highlights: Highlight[] = [
  {
    id: "pertumbuhan-ekonomi",
    title: "Pertumbuhan Ekonomi",
    value: "5,11%",
    badge: { text: "+5,11%", variant: "up"},
    source: "/source/cnbc.png",
    description:
      "Pertumbuhan ekonomi Indonesia tahun 2025 mencapai 5,11 % menjadi yang tertinggi sejak tahun 2022.",
    videoUrl: "video/pertumbuhan.mp4",
    icon: "/icon/pertumbuhan-ekonomi.svg"
  },
  {
    id: "lapangan-pekerjaan-baru",
    title: "Lapangan Pekerjaan Baru",
    value: "1.956.346",
    badge: { text: "+10,4%", variant: "up"},
    source: "/source/metro-tv.png",
    description:
      "Realisasi investasi telah menyerap tenaga kerja sebanyak 2,71 juta orang atau meningkat sebanyak 10,4%.",
    videoUrl: "video/lapangan.mp4",
    icon: "/icon/lapangan-pekerjaan-baru.svg"
  },
  {
    id: "peningkatan-ekspor",
    title: "Peningkatan Ekspor",
    value: "6,15%",
    badge: { text: "+6,15%", variant: "up"},
    source: "/source/kemendag.png",
    description:
      "Ekspor Indonesia pada tahun 2025 meningkat 6,15% dibandingkan tahun 2024.",
    videoUrl: "/video/eskpor.mp4",
    icon: "/icon/peningkatan-ekspor.svg"
  },
  {
    id: "makan-bergizi-gratis",
    title: "Makan Bergizi Gratis",
    value: "60,19",
    unit: "juta",
    badge: { text: "High", variant: "up"},
    source: "/source/kompas.svg",
    description:
      "Penerima setiap hari, dimasak 520.000 pekerja di 14.533 SPPG, melibatkan 23.845 UMKM.",
    videoUrl: "/video/mbg.mp4",
    icon: "/icon/makan-bergizi-gratis.svg"
  },
  {
    id: "produksi-beras",
    title: "Produksi Beras",
    value: "34,71",
    unit: "juta ton",
    badge: { text: "High Record", variant: "up"},
    source: "/source/cnn.png",
    description:
      "BPS mencatat produksi beras Januari - Desember 2025 mencapai 34,71 juta ton.",
    videoUrl: "video/produksi.mp4",
    icon: "/icon/produksi-beras.svg"
  },
  {
    id: "cadangan-beras",
    title: "Cadangan Beras",
    value: "4,2",
    unit: "juta ton",
    source: "/source/bisniscom.png",
    description:
      "Cadangan beras di BULOG pada tahun 2025, tertinggi sepanjang sejarah.",
    videoUrl: "/video/cadangan-beras.mp4",
    icon: "/icon/cadangan-beras.svg"
  },
  {
    id: "koperasi-merah-putih",
    title: "Koperasi Merah Putih",
    value: "81.613",
    source: "/source/kompas.svg",
    description:
      "Koperasi Desa Kelurahan Merah Putih terbentuk.",
    videoUrl: "/video/koperasi.mp4",
    icon: "/icon/koperasi-merah-putih.svg"
  },
  {
    id: "sekolah-rakyat",
    title: "Sekolah Rakyat",
    value: "15.945",
    source: "/source/komunikasi.png",
    description:
      "Anak yang sudah sekolah di 166 Sekolah Rakyat.",
    videoUrl: "/video/sekolah.mp4",
    icon: "/icon/sekolah-rakyat.svg"
  },
  {
    id: "renovasi-sekolah",
    title: "Renovasi Sekolah",
    value: "16.140",
    description:
      "Sekolah SD SMP SMA dalam proses renovasi.",
      source: "/source/kemendikdasmen.png",
    videoUrl: "video/renovasi.mp4",
    icon: "/icon/renovasi-sekolah.svg"
  },
  {
    id: "interactive-flat-panel",
    title: "Interactive Flat Panel",
    value: "288.180",
    source: "/source/kemendikdasmen.png",
    description:
      "Sekolah dalam proses memasang IFP belajar.",
    videoUrl: "video/ifp.mp4",
    icon: "/icon/interactive-flat-panel.svg"
  },
  {
    id: "cek-kesehatan-gratis",
    title: "Cek Kesehatan Gratis",
    value: "70",
    unit: "juta",
    badge: { text: "High", variant: "up"},
    source: "/source/antara.png",
    description:
      "Sepanjang tahun 2025, sebanyak 70 juta masyarakat Indonesia tercatat telah mengikuti program cek kesehatan gratis.",
    videoUrl: "/video/ckg.mp4",
    icon: "/icon/cek-kesehatan-gratis.svg"
  },
];