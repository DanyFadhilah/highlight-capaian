export type HighlightBadge = {
  text: string;
  variant?: "up" | "down" | "info" | "warn" ;
}

export type HighlightSection =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
      list?: string[];
    }
  | {
      type: "stats";
      image?: string;
      text?: string;
      text1?: string;
      className?: string;
      listClassName?: string;
      items?: {
        text?: string;
        value?: string;
      }[];
    }
  | {
      type: "references";
      title: string;
      source: string[];
      image?: string[];
    };

export type Highlight = {
  id: string;
  title: string;
  location: string;
  date: string;
  subtitle?: string;
  narasi: string;
  value: number | string;
  unit?: string;
  badge?: HighlightBadge;
  source?: string;
  description: string;
  videoUrl?: string;
  icon: string;
  sections?: HighlightSection[];
};

export const highlights: Highlight[] = [
  {
    id: "makan-bergizi-gratis",
    title: "Makan Bergizi Gratis",
    subtitle: "Program Makan Bergizi Gratis (MBG)",
    narasi: "Merupakan salah satu inisiatif pemerintah yang bertujuan untuk memberikan akses makanan bergizi kepada anak-anak sekolah di Indonesia. Program ini bukan hanya fokus pada pemenuhan gizi, namun juga berkontribusi pada peningkatan kualitas pendidikan dan perekonomian masyarakat",
    value: "60,19",
    unit: "juta",
    location: "Jakarta",
    date: "Februari 2026",
    badge: { text: "High", variant: "up"},
    source: "/source/kompas.svg",
    description:
      "Penerima setiap hari, dimasak 520.000 pekerja di 14.533 SPPG, melibatkan 23.845 UMKM.",
    videoUrl: "/video/mbg.mp4",
    icon: "/icon/makan-bergizi-gratis.svg",
    sections: [
    {
      type: "paragraph",
      text: "Program MBG diharapkan dapat mengurangi angka stunting dan malnutrisi di Indonesia, yang masih menjadi masalah kesehatan utama. Menurut laporan dari Badan Gizi Nasional (BGN) pada Februari 2025, program ini dirancang untuk memperbaiki kualitas gizi anak-anak, yang pada gilirannya akan mendukung pertumbuhan dan perkembangan mereka secara optimal. Program ini sangat penting untuk menciptakan generasi yang sehat dan produktif di masa depan (1)."
    },
    {
      type: "paragraph",
      text: "Manfaat lain yang signifikan dari program MBG adalah dampaknya terhadap dunia pendidikan. Sebuah survei yang dilakukan oleh Pusat Standar dan Kebijakan Pendidikan (PSKP) pada Desember 2025 menunjukkan bahwa 66,4% siswa merasa lebih bersemangat untuk bersekolah, sementara 74,6% melaporkan bahwa mereka dapat lebih fokus saat belajar setelah mendapatkan makanan bergizi di sekolah. Ini adalah bukti nyata bahwa pemenuhan gizi yang baik dapat meningkatkan konsentrasi dan semangat belajar anak-anak (2)."
    },
    {
      type: "paragraph",
      text: "Program MBG juga memberikan manfaat ekonomi yang signifikan bagi keluarga. Dengan makanan yang disediakan secara gratis di sekolah, banyak keluarga yang menghemat uang jajan anak-anak mereka. Di Jawa Tengah, misalnya, banyak siswa yang mengaku bisa menabung hingga Rp 5.000 per hari karena mereka tidak perlu membeli makanan tambahan di luar sekolah. Hal ini tentu saja membantu meringankan beban ekonomi keluarga (3)."
    },
    {
      type: "stats",
      image: "/data/makan-bergizi-gratis.jpg",
      text: "Angka di atas menunjukkan bahwa program ini tidak hanya berfokus pada kesehatan masyarakat, tetapi juga mendorong pertumbuhan ekonomi melalui keterlibatan berbagai sektor.",
      className: "flex px-25 justify-around",
      listClassName: "flex flex-col justify-between",
      items: [
        { text: "Penerima Manfaat", value: "60,19 juta" },
        { text: "Tenaga Kerja", value: "520.000" },
        { text: "Dapur Layanan", value: "14.533" },
        { text: "UMKM Terlibat", value: "23.845" }
      ]
    },
    {
      type: "paragraph",
      text: "Dampak program MBG juga terasa pada perekonomian lokal. Program ini telah menciptakan lebih dari 789.000 lapangan pekerjaan, dengan lebih dari 19.000 dapur atau pusat layanan makanan yang tersebar di berbagai daerah. Sebagai contoh, laporan dari Katadata pada Januari 2026 menyebutkan bahwa program ini telah menggerakkan sektor ekonomi lokal melalui penyerapan tenaga kerja yang signifikan, sekaligus memperkuat rantai pasokan pangan di Indonesia (4)."
    },
    {
      type: "quote",
      text: "Program Makan Bergizi Gratis bukan hanya sebuah bantuan makanan, tetapi merupakan upaya besar untuk meningkatkan kesehatan, mendukung pendidikan, dan memperkuat ekonomi lokal. Dengan melibatkan banyak pihak dari berbagai sektor, program ini berperan dalam menciptakan Indonesia yang lebih sehat, produktif, dan berkelanjutan."
    },
    {
      type: "references",
      title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
      image: [
        "/ref/makan-bergizi-gratis1.jpg",
        "/ref/makan-bergizi-gratis2.jpg",
        "/ref/makan-bergizi-gratis3.jpg",
      ],
      source: [
        "https://www.bgn.go.id/news/berita/manfaat-program-mbg-menekan-angka-stunting-ri-yang-masih-tinggi",
        "https://pskp.kemendikdasmen.go.id/file/kebijakan/1765853474_file.pdf",
        "https://jatengprov.go.id/publik/kenyang-makan-bergizi-gratis-siswa-bisa-nabung-rp5-ribu-per-hari/",
        "https://katadata.co.id/berita/nasional/6960c7964f621/satu-tahun-berjalan-program-mbg-serap-hampir-800-ribu-tenaga-kerja"
      ]
    }
  ],
  },
  {
    id: "lapangan-pekerjaan-baru",
    title: "Lapangan Kerja Baru",
    subtitle: "Investasi 2025 Sukses Serap 2,71 Juta Tenaga Kerja",
    narasi: "Sepanjang tahun 2025, Indonesia mencatatkan kinerja gemilang di sektor penanaman modal yang berdampak langsung pada kesejahteraan masyarakat luas. Kementerian Investasi dan Hilirisasi/Badan Koordinasi Penanaman Modal (BKPM) melaporkan bahwa realisasi investasi nasional sukses menembus angka Rp1.931,2 triliun. Capaian impresif ini tidak hanya berhasil melampaui target yang ditetapkan, tetapi juga menjadi motor utama dalam mengentaskan pengangguran dengan menyerap tenaga kerja secara masif.",
    value: "2,71",
    unit: "juta",
    location: "Jakarta",
    date: "Februari 2026",
    badge: { text: "+10,4%", variant: "up"},
    source: "/source/metro-tv.png",
    description: "Realisasi investasi telah menyerap tenaga kerja sebanyak 2,71 juta orang atau meningkat sebanyak 10,4%.",
    videoUrl: "video/lapangan.mp4",
    icon: "/icon/lapangan-pekerjaan-baru.svg",
    sections: [
      {
        type: "paragraph",
        text: "Menteri Investasi dan Hilirisasi, Rosan Roeslani, mengonfirmasi bahwa derasnya arus modal yang masuk selama periode Januari hingga Desember 2025 telah membuka ruang besar bagi ketersediaan lapangan kerja baru. Berdasarkan catatan resmi BKPM, tercatat sebanyak 2,71 juta tenaga kerja berhasil terserap sepanjang tahun tersebut. Angka penyerapan ini mengalami lonjakan yang sangat positif, yakni meningkat sebesar 10,4% jika dibandingkan dengan capaian serapan tenaga kerja pada tahun 2024 yang berada di kisaran 2,45 juta orang."
      },
      {
        type: "stats",
        image: "/data/lapangan-pekerjaan-baru.jpg",
        text: "Angka di atas menunjukkan bahwa program ini tidak hanya berfokus pada kesehatan masyarakat, tetapi juga mendorong pertumbuhan ekonomi melalui keterlibatan berbagai sektor.",
        className: "flex flex-col gap-5",
        listClassName: "flex justify-around gap-2",
        items: [
          { text: "Tenaga Kerja Baru Terserap di 2025", value: "2,71 juta" },
          { text: "Pertumbuhan Serapan Tenaga Kerja (YoY)", value: "10,4%" },
          { text: "Total Realisasi Investasi Nasional", value: "1.931,2 Triliun" },
        ]
      },
      {
        type: "paragraph",
        text: "Keberhasilan luar biasa ini membuktikan peran vital investasi sebagai roda penggerak utama ekonomi riil di Indonesia. Mayoritas serapan tenaga kerja dan nilai investasi triliunan rupiah ini didominasi oleh proyek-proyek strategis hilirisasi, khususnya pada industri logam dasar, serta sektor transportasi, pergudangan, dan pertambangan."
      },
      {
        type: "paragraph",
        text: "Fakta menarik lainnya dari capaian tahun 2025 ini adalah terjadinya pemerataan pembangunan yang signifikan. Aliran dana investasi kini tidak lagi terpusat hanya di Pulau Jawa. Realisasi investasi yang mengalir ke wilayah luar Jawa justru mendominasi dengan porsi 51,3%. Transformasi dan pemerataan ini secara otomatis menciptakan sentra-sentra ekonomi baru yang menyerap banyak tenaga kerja lokal dari wilayah Indonesia bagian timur hingga ke barat."
      },
      {
        type: "quote",
        text: 'Target realisasi investasi 2025 yang sebesar Rp1.905,6 triliun tercapai dan bahkan melebihi sedikit dari target. Ini membuktikan investasi tidak lagi terpusat di Jawa, tetapi mulai bergerak lebih merata, sekaligus menyerap 2,71 juta tenaga kerja kita." — Menteri Investasi dan Hilirisasi/Kepala BKPM, Rosan Roeslani.'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://www.cnbcindonesia.com/news/20260115142459-4-702701/investasi-masuk-rp1931-t-di-2025-serap-tenaga-kerja-271-juta-orang",
          "https://www.metrotvnews.com/play/N9nCyGr4-lampaui-target-realisasi-investasi-indonesia-di-2025-tembus-rp1-931-triliun",
          "https://jogja.antaranews.com/berita/796277/rosan-investasi-di-2025-melampaui-target-menyerap-pekerja-271-juta-orang",
          "https://m.kumparan.com/kumparanbisnis/lampaui-target-realisasi-investasi-ri-serap-2-71-juta-tenaga-kerja-pada-2025-26deBmeZ03d"
        ]
      }
    ],
  },
  {
    id: "pertumbuhan-ekonomi",
    title: "Pertumbuhan Ekonomi",
    subtitle: "Pertumbuhan Ekonomi Nasional",
    narasi: "Pertumbuhan ekonomi Indonesia pada tahun 2025 tercatat 5,11% (Year on Year - YoY). Angka ini menunjukkan adanya pemulihan yang signifikan setelah pandemi, dengan kontribusi sektor-sektor penting dalam perekonomian.",
    value: "5,11%",
    location: "Jakarta",
    date: "Februari 2026",
    badge: { text: "+5,11%", variant: "up"},
    source: "/source/cnbc.png",
    description:
      "Pertumbuhan ekonomi Indonesia tahun 2025 mencapai 5,11 % menjadi yang tertinggi sejak tahun 2022.",
    videoUrl: "video/pertumbuhan.mp4",
    icon: "/icon/pertumbuhan-ekonomi.svg",
    sections: [
      {
        type: "paragraph",
        text: "Indonesia berhasil mencatatkan pertumbuhan ekonomi sebesar 5,11 % sepanjang tahun 2025, menurut rilis resmi dari Badan Pusat Statistik (BPS). Angka ini menunjukkan momentum pemulihan ekonomi nasional setelah pandemi dan sedikit lebih tinggi dibanding capaian 2024 yang sebesar 5,03 %."
      },
      {
        type: "paragraph",
        text: "Pertumbuhan ini bukan hanya angka makro semata, tetapi mencerminkan perkembangan positif di hampir semua sektor ekonomi. Dari sisi produksi, sektor jasa lainnya, jasa perusahaan, serta transportasi dan pergudangan menjadi pendorong utama karena meningkatnya aktivitas layanan dan mobilitas masyarakat."
      },
      {
        type: "paragraph",
        text: "Sementara itu, dari sisi pengeluaran, ekspor barang dan jasa menjadi komponen yang tumbuh paling tinggi, disusul oleh investasi (Pembentukan Modal Tetap Bruto) dan konsumsi rumah tangga. Konsumsi domestik tetap menjadi tulang punggung perekonomian, terutama pada sektor makanan, transportasi, dan komunikasi yang meningkat seiring pulihnya permintaan masyarakat."
      },
      {
        type: "stats",
        image: "/data/pertumbuhan-ekonomi.jpg",
        text: "Pertumbuhan juga tercatat kuat di Triwulan IV‑2025 dengan 5,39 % (y‑on‑y), menandakan bahwa momentum ekonomi tetap solid menjelang akhir tahun. Kontribusi besar juga berasal dari provinsi‑provinsi di Pulau Jawa yang masih menjadi pusat kegiatan ekonomi nasional.",
        className: "flex flex-col gap-5",
        listClassName: "flex justify-around gap-2",
      },
      {
        type: "quote",
        text: 'Amalia Adininggar Widyasanti, Kepala BPS, dalam konferensi pers Februari 2026, menyatakan: "Secara keseluruhan, perekonomian Indonesia di tahun 2025 tumbuh kuat dan mencapai pertumbuhan sebesar 5,11% YoY." (BPS, 2026)'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://www.bps.go.id/id/pressrelease/2026/02/05/2546/ekonomi-indonesia-tahun-2025-tumbuh-5-11-persen",
          "https://nasional.kontan.co.id/news/bps-catat-pertumbuhan-ekonomi-indonesia-pada-2025-mencapai-511",
          "https://www.tempo.co/ekonomi/bps-pertumbuhan-ekonomi-indonesia-2025-mencapai-5-11-persen-2112774",
          "Kemenkeu",
          "https://en.antaranews.com/news/403078/indonesias-economy-grows-511-pct-on-strong-consumption"
        ]
      }
    ],
  },
  {
    id: "peningkatan-ekspor",
    title: "Peningkatan Ekspor",
    subtitle: "Peningkatan Ekspor Tahun 2025",
    narasi: "Sepanjang tahun 2025, ekspor Indonesia berhasil tumbuh sebesar 6,15% (year‑on‑year / YoY), menurut data resmi Badan Pusat Statistik (BPS). Pencapaian ini mencerminkan pemulihan ekonomi Indonesia yang kuat di tengah tantangan global, dengan sektor-sektor unggulan memberikan kontribusi signifikan terhadap peningkatan ini.",
    value: "6,15%",
    location: "Jakarta",
    date: "Februari 2026",
    badge: { text: "+6,15%", variant: "up"},
    source: "/source/kemendag.png",
    description:
      "Ekspor Indonesia pada tahun 2025 meningkat 6,15% dibandingkan tahun 2024.",
    videoUrl: "/video/eskpor.mp4",
    icon: "/icon/peningkatan-ekspor.svg",
    sections: [
      {
        type: "paragraph",
        text: "Sepanjang tahun 2025, nilai ekspor Indonesia meningkat sebesar 6,15 % dibandingkan tahun sebelumnya, mencapai USD 282,91 miliar menurut data dari Liputan6.com yang mengutip rilis resmi Badan Pusat Statistik (BPS). Capaian ini mencerminkan tren positif dalam kinerja perdagangan luar negeri Indonesia meskipun sejumlah tantangan global masih ada, dengan kontribusi terbesar berasal dari ekspor non‑migas yang tumbuh kuat sepanjang periode tersebut."
      },
      {
        type: "paragraph",
        text: "Laporan dari Jakarta Globe juga mengonfirmasi bahwa peningkatan ekspor sebesar 6,15 % ini mendukung surplus neraca perdagangan Indonesia sebesar USD 41,05 miliar sepanjang 2025. Di dalamnya, ekspor non‑migas menyumbang sekitar USD 269,84 miliar atau naik 7,66 %, mengimbangi defisit pada komoditas migas dan menunjukkan bahwa sektor industri pengolahan menjadi pendorong utama pertumbuhan ekspor nasional."
      },
      {
        type: "stats",
        image: "/data/peningkatan-ekspor.jpg",
        text1: "Dalam rilis statistik resmi oleh BPS, disebutkan bahwa ekspor non‑migas pada Desember 2025 mencapai USD 25,09 miliar, naik 13,72 % dibandingkan Desember 2024, sementara total ekspor di bulan yang sama mencapai USD 26,35 miliar, naik 11,64 % secara tahunan. Data ini menunjukkan momentum ekspor Indonesia yang kuat di akhir tahun, menandakan bahwa diversifikasi produk dan peningkatan permintaan pasar internasional turut menopang pertumbuhan total ekspor 2025.",
        className: "flex items-center gap-5",
        listClassName: "",
      },
      {
        type: "paragraph",
        text: "Menurut pemberitaan Infobanknews.com, peningkatan ekspor 6,15 % sepanjang 2025 ini didorong terutama oleh ekspor industri pengolahan, yang mencatat kontribusi terbesar terhadap total nilai ekspor, sekaligus menunjukkan bahwa sektor manufaktur Indonesia memiliki peran penting dalam memperkuat kinerja ekspor nasional. Sementara itu, meskipun ekspor migas mengalami kontraksi, ekspor non‑migas tetap menjadi tulang punggung pertumbuhan perdagangan luar negeri Indonesia pada tahun ini."
      },
      {
        type: "quote",
        text: 'Amalia Adininggar Widyasanti, Kepala BPS, dalam konferensi pers Februari 2026, menyatakan: "Secara keseluruhan, perekonomian Indonesia di tahun 2025 tumbuh kuat dan mencapai pertumbuhan sebesar 5,11% YoY." (BPS, 2026)'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://www.bps.go.id/id/pressrelease/2026/02/05/2546/ekonomi-indonesia-tahun-2025-tumbuh-5-11-persen",
          "https://nasional.kontan.co.id/news/bps-catat-pertumbuhan-ekonomi-indonesia-pada-2025-mencapai-511",
          "https://www.tempo.co/ekonomi/bps-pertumbuhan-ekonomi-indonesia-2025-mencapai-5-11-persen-2112774",
          "Kemenkeu",
          "https://en.antaranews.com/news/403078/indonesias-economy-grows-511-pct-on-strong-consumption"
        ]
      }
    ],
  },
  {
    id: "produksi-beras",
    title: "Produksi Beras",
    subtitle: "Swasembada Terwujud: Produksi Beras 2025 Tembus 34,71 Juta Ton",
    narasi: "Badan Pusat Statistik (BPS) merilis data capaian luar biasa sektor pertanian, di mana produksi beras nasional dari Januari hingga Desember 2025 berhasil menembus angka 34,71 juta ton. Pencapaian ini melonjak tajam sebesar 13,36 persen, atau bertambah sekitar 4,09 juta ton dibandingkan periode yang sama pada tahun sebelumnya.",
    value: "34,71",
    unit: "juta ton",
    location: "Jakarta",
    date: "Februari 2026",
    badge: { text: "High Record", variant: "up"},
    source: "/source/cnn.png",
    description:
      "BPS mencatat produksi beras Januari - Desember 2025 mencapai 34,71 juta ton.",
    videoUrl: "video/produksi.mp4",
    icon: "/icon/produksi-beras.svg",
    sections: [
      {
        type: "paragraph",
        text: "Peningkatan produksi yang signifikan ini menjadi indikator utama keberhasilan swasembada pangan Indonesia di tahun 2025. BPS mencatat bahwa lonjakan produksi tersebut secara langsung didorong oleh meluasnya potensi luas panen padi secara kumulatif sepanjang tahun. Adapun tiga provinsi yang menjadi tulang punggung penyumbang beras terbesar nasional sepanjang tahun 2025 adalah Jawa Timur, Jawa Barat, dan Jawa Tengah."
      },
      {
        type: "paragraph",
        text: "Melimpahnya produksi domestik ini memberikan jaminan kokoh bagi stabilitas ketersediaan pangan nasional. Kementerian Pertanian menegaskan bahwa tren positif ini merupakan wujud nyata ketahanan pangan yang semakin solid, sekaligus mendukung efektivitas pengendalian inflasi dari sektor bahan makanan. Dengan perkiraan konsumsi beras masyarakat yang berada di kisaran 31 juta ton, capaian produksi 34,71 juta ton ini memastikan Indonesia memiliki surplus pangan dan tidak perlu lagi mengimpor beras medium."
      },
      {
        type: "paragraph",
        text: "Angka produksi ini dirumuskan melalui pengumpulan data Survei Kerangka Sampel Area (KSA) yang mencakup ratusan ribu titik amatan di seluruh Indonesia. Validasi data yang ketat ini menghasilkan basis perencanaan tata kelola perberasan yang jauh lebih presisi untuk mempertahankan surplus di masa mendatang."
      },
      {
        type: "paragraph",
        text: "Capaian produksi yang tinggi ini tidak hanya sekadar mengamankan pasokan di gudang pemerintah, tetapi juga secara langsung meningkatkan kesejahteraan jutaan petani di berbagai daerah. Meskipun angka ini masih bersifat dinamis bergantung pada panen penutup awal 2026, rekor ini menumbuhkan optimisme bahwa sektor pertanian nasional mampu terus tangguh menghadapi tantangan iklim."
      },
      {
        type: "quote",
        text: 'Produksi beras nasional pada 2025 mencapai 34,71 juta ton, naik 13,36 persen. Swasembada pangan bukan lagi target semata, melainkan bukti yang benar-benar terjadi dan dirasakan masyarakat.'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        image: [
          "/ref/produksi-beras1.jpg",
          "/ref/produksi-beras2.jpg"
        ],
        source: [
          "https://money.kompas.com/read/2026/01/05/171253226/bps-produksi-beras-2025-diprediksi-3471-juta-ton-naik-1336-persen",
          "https://m.kumparan.com/kumparanbisnis/bps-perkirakan-produksi-beras-tembus-34-71-juta-ton-sepanjang-2025-naik-13-36-26Zdhmc7qTk",
          "https://swa.co.id/read/467999/produksi-beras-di-2025-tembus-347-juta-ton-waspada-gagal-panen-di-sumatra",
          "https://padi.brmp.pertanian.go.id/berita/produksi-beras-2025-tembus-3471-juta-ton-meningkat-1336-persen"
        ]
      }
    ],
  },
  {
    id: "cadangan-beras",
    title: "Cadangan Beras",
    subtitle: "Cadangan Beras Tahun 2025",
    narasi: "Pemerintah Indonesia mencatatkan capaian bersejarah dalam ketersediaan pangan nasional pada tahun 2025. Dengan kepemilikan cadangan beras di gudang pemerintah yang mencapai lebih dari 4,2 juta ton, capaian ini mempertegas komitmen kuat dalam menjaga kedaulatan pangan.",
    value: "4,2",
    unit: "juta ton",
    location: "Jakarta",
    date: "Februari 2026",
    source: "/source/bisniscom.png",
    description:
      "Cadangan beras di BULOG pada tahun 2025, tertinggi sepanjang sejarah.",
    videoUrl: "/video/cadangan-beras.mp4",
    icon: "/icon/cadangan-beras.svg",
    sections: [
      {
        type: "paragraph",
        text: "Sepanjang tahun 2025, volume Cadangan Beras Pemerintah (CBP) menembus angka yang sangat solid, mencapai rekor tertinggi dalam sejarah. Pada Juli 2025, Presiden Prabowo Subianto secara resmi mengumumkan bahwa cadangan beras di gudang pemerintah telah melampaui 4,2 juta ton. Pencapaian luar biasa ini merupakan bukti nyata dari keberhasilan produksi pangan nasional, di mana produksi beras tercatat mengalami peningkatan yang signifikan. Ketersediaan stok yang melimpah ini memberikan rasa aman bagi ketahanan pangan nasional."
      },
      {
        type: "paragraph",
        text: "Laporan evaluasi ketahanan pangan mengonfirmasi bahwa penyerapan beras petani lokal berkontribusi mutlak terhadap total cadangan ini. Perum Bulog mencatat total stok beras nasional menyentuh 4,25 juta ton pada pertengahan Juli 2025, yang mencakup cadangan pemerintah dan stok komersial di seluruh Indonesia. Keberhasilan menyerap gabah dan beras dalam negeri ini tidak hanya memperkuat stok nasional, tetapi juga menjaga kestabilan harga di tingkat petani saat musim panen raya."
      },
      {
        type: "paragraph",
        text: "Pencapaian stok lebih dari 4,2 juta ton ini menjadi simbol konkret keberhasilan kolaborasi nasional, sekaligus memecahkan rekor tertinggi sejak Perum Bulog berdiri. Angka ini sangat jauh melampaui batas aman stok minimal CBP. Dengan cadangan sebesar ini, pemerintah memiliki ruang yang sangat luas untuk melakukan intervensi pasar, menyalurkan bantuan pangan, serta mengantisipasi berbagai gejolak harga pangan tanpa harus bergantung pada impor beras."
      },
      {
        type: "stats",
        image: "/data/cadangan-beras.jpg",
        text1: "Keberadaan stok yang masif ini langsung dimanfaatkan untuk menjaga stabilitas ekonomi masyarakat luas. Pemerintah melalui Badan Pangan Nasional (Bapanas) dan Bulog secara aktif menggulirkan program Stabilisasi Pasokan dan Harga Pangan (SPHP). Program ini mendistribusikan beras ke pasar tradisional maupun ritel modern dengan harga terjangkau. Pada akhirnya, ketahanan stok yang kuat ini di tahun 2025 menjadi fondasi penting untuk mewujudkan cita-cita Indonesia sebagai lumbung pangan dunia.",
        className: "flex items-center justify-between gap-5",
        listClassName: "",
      },
      {
        type: "quote",
        text: 'Produksi pangan kita belum pernah dalam sejarah kita memiliki cadangan beras di gudang pemerintah lebih dari 4,2 juta ton beras. Jagung juga produksinya naik 30 persen, beras naik 48 persen." - Presiden RI Prabowo Subianto (Juli 2025)'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://setkab.go.id/cadangan-beras-capai-42-juta-ton-presiden-prabowo-tegaskan-komitmen-jaga-kedaulatan-pangan/",
          "https://presidenri.go.id/foto/cadangan-beras-capai-42-juta-ton-presiden-prabowo-tegaskan-komitmen-jaga-kedaulatan-pangan/",
          "https://www.antaranews.com/berita/4981393/produk-meningkat-cadangan-beras-ri-tembus-42-juta-ton",
          "https://tribratanews.polri.go.id/blog/nasional-3/bulog-catat-stok-beras-capai-425-juta-ton-90084",
          "https://www.youtube.com/watch?v=TBqU36hWUCM"
        ]
      }
    ],
  },
  {
    id: "koperasi-merah-putih",
    title: "Koperasi Merah Putih",
    subtitle: "81.613 Koperasi Merah Putih Resmi Berdiri",
    narasi: "Satu tahun jalannya pemerintahan Presiden Prabowo Subianto mencatatkan tonggak sejarah baru dalam kebangkitan ekonomi akar rumput. Hingga kuartal akhir tahun 2025, tercatat sebanyak 81.613 Koperasi Merah Putih telah berhasil dibentuk dan beroperasi di berbagai desa serta kelurahan di seluruh Indonesia. Kehadiran puluhan ribu koperasi ini menjadi instrumen strategis negara untuk mewujudkan pemerataan ekonomi dan memperkuat rantai pasok nasional langsung dari tingkat desa.",
    value: "81.613",
    location: "Jakarta",
    date: "Februari 2026",
    source: "/source/kompas.svg",
    description:
      "Koperasi Desa Kelurahan Merah Putih terbentuk.",
    videoUrl: "/video/koperasi.mp4",
    icon: "/icon/koperasi-merah-putih.svg",
    sections: [
      {
        type: "paragraph",
        text: "Menteri Koperasi, Ferry Juliantono, menegaskan bahwa Koperasi Merah Putih dirancang secara khusus sebagai wadah ekonomi bersama. Tujuannya adalah untuk mendistribusikan barang kebutuhan pokok sekaligus menyerap hasil produksi rakyat secara langsung. Melalui gerai dan gudang koperasi ini, masyarakat pedesaan kini memiliki akses yang jauh lebih terjangkau terhadap kebutuhan esensial harian, seperti gas LPG, minyak goreng, hingga pupuk bersubsidi bagi para petani."
      },
      {
        type: "stats",
        image: "/data/koperasi-merah-putih.jpg",
        className: "flex flex-col gap-5",
        listClassName: "flex justify-around gap-2",
        items: [
          { text: "Koperasi Merah Putih yang Terbentuk", value: "81.613" },
          { text: "Sembako, Pupuk Bersubsidi, dan Gas LPG", value: "3 Fokus" },
          { text: "Target Desa dan Kelurahan", value: "100%" },
        ]
      },
      {
        type: "paragraph",
        text: "Pencapaian terbentuknya 81.613 lembaga Koperasi Merah Putih ini merupakan hasil kerja keras yang diakselerasi pasca-peluncuran perdananya oleh Presiden di Kabupaten Klaten pada pertengahan Juli 2025. Pembangunan fasilitas fisik koperasi ini turut melibatkan kolaborasi strategis antara pemerintah desa yang menyiapkan lahan, PT Agrinas, serta pelibatan personel TNI di lapangan untuk percepatan konstruksi gerai dan gudang."
      },
      {
        type: "paragraph",
        text: "Kehadiran puluhan ribu koperasi ini dirancang untuk memotong rantai distribusi yang selama ini terlalu panjang dan merugikan konsumen pedesaan. Di sisi lain, Koperasi Merah Putih ini juga diproyeksikan berfungsi sebagai pembeli siaga (off-taker) bagi hasil panen petani dan produksi UMKM lokal. Dengan sistem berlandaskan gotong royong ini, pemerintah meyakini koperasi akan membuka banyak lapangan kerja baru dan menumbuhkan kemandirian ekonomi daerah secara berkelanjutan."
      },
      {
        type: "quote",
        text: '"Dari lemah menjadi kekuatan. Dari ekonomi lemah menjadi kekuatan ekonomi yang kuat. Ini adalah konsep koperasi, konsep koperasi adalah konsep gotong royong." — Presiden RI Prabowo Subianto'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://www.bgn.go.id/news/berita/manfaat-program-mbg-menekan-angka-stunting-ri-yang-masih-tinggi",
          "https://pskp.kemendikdasmen.go.id/file/kebijakan/1765853474_file.pdf",
          "https://jatengprov.go.id/publik/kenyang-makan-bergizi-gratis-siswa-bisa-nabung-rp5-ribu-per-hari/",
          "https://katadata.co.id/berita/nasional/6960c7964f621/satu-tahun-berjalan-program-mbg-serap-hampir-800-ribu-tenaga-kerja"
        ]
      }
    ],
  },
  {
    id: "sekolah-rakyat",
    title: "Sekolah Rakyat/Garuda",
    subtitle: "15.945 Siswa Kini Belajar di 166 Sekolah Rakyat",
    narasi: "Pemerintah Indonesia di bawah kepemimpinan Presiden Prabowo Subianto terus melakukan terobosan berani dalam upaya pengentasan kemiskinan melalui jalur pendidikan. Sejak mulai beroperasi pada tahun 2025 hingga diresmikan secara serentak pada awal tahun 2026, tercatat sebanyak 166 Sekolah Rakyat telah berdiri dan menampung 15.945 siswa. Program ini secara khusus menyasar anak-anak dari keluarga miskin dan sangat miskin agar mendapatkan akses pendidikan berkualitas.",
    value: "15.945",
    location: "Jakarta",
    date: "Februari 2026",
    source: "/source/komunikasi.png",
    description:
      "Anak yang sudah sekolah di 166 Sekolah Rakyat.",
    videoUrl: "/video/sekolah.mp4",
    icon: "/icon/sekolah-rakyat.svg",
    sections: [
      {
        type: "paragraph",
        text: "Kementerian Sosial mengonfirmasi bahwa operasional ratusan Sekolah Rakyat tersebut tersebar merata di 34 provinsi dan 131 kabupaten/kota di seluruh Indonesia. Siswa-siswa yang ditampung berasal dari kelompok ekonomi terbawah, atau yang masuk dalam kategori desil satu dan dua berdasarkan Data Tunggal Sosial Ekonomi Nasional (DTSEN). Konsep Sekolah Rakyat ini mengintegrasikan pendidikan jenjang SD, SMP, SMA, dan SMK di dalam satu sistem pengelolaan.",
      },
      {
        type: "stats",
        image: "/data/sekolah-rakyat.jpg",
        className: "flex flex-col gap-5",
        listClassName: "flex justify-around gap-2",
        items: [
          { text: "Koperasi Merah Putih yang Terbentuk", value: "81.613" },
          { text: "Sembako, Pupuk Bersubsidi, dan Gas LPG", value: "3 Fokus" },
          { text: "Target Desa dan Kelurahan", value: "100%" },
        ]
      },
      {
        type: "paragraph",
        text: "Peresmian operasional 166 Sekolah Rakyat secara serentak dipusatkan oleh Presiden Prabowo Subianto di Sekolah Rakyat Terintegrasi 9 Banjarbaru, Kalimantan Selatan, pada 12 Januari 2026. Acara ini juga dihadiri oleh Menteri Sosial Saifullah Yusuf. Kehadiran institusi pendidikan ini dirancang tidak hanya untuk memberikan ijazah formal, tetapi juga menanamkan pembentukan karakter, keterampilan vokasi, dan kemandirian bagi para siswa."
      },
      {
        type: "paragraph",
        text: "Program ini menjadi solusi nyata untuk memutus mata rantai kemiskinan struktural yang sering kali diwariskan turun-temurun. Pemerintah optimistis target pembangunan 500 Sekolah Rakyat dapat terwujud guna membantu ratusan ribu keluarga kurang mampu. Dengan adanya fasilitas modern yang disediakan secara gratis—seperti asrama, laboratorium komputer, dan ruang teater mini—anak-anak yang sebelumnya terpaksa memulung atau hidup di jalanan kini memiliki harapan dan ruang untuk merajut cita-cita."
      },
      {
        type: "quote",
        text: '"Ada yang bantu orang tuanya jadi pemulung, ada yang hidup di jalanan sekarang sudah bisa bersekolah di sekolah rakyat. Memang sekolah rakyat itu kita rancang sebagai upaya untuk memotong rantai kemiskinan. Kita harus berani mengubah, kita harus berani memotong rantai kemiskinan. Kita tidak boleh menyerah kepada keadaan." — Presiden RI Prabowo Subianto'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://www.tempo.co/politik/sekolah-rakyat-siap-beroperasi-juli-2025-berikut-model-sekolah-dan-sistem-perekrutan-gurunya-1223404",
          "https://www.inanews.co.id/2026/01/indonesia-renovasi-16-140-sekolah-pasang-288-000-panel-digital-interaktif-di-seluruh-nusantara/",
          "https://www.komdigi.go.id/berita/artikel-gpr/detail/presiden-prabowo-resmi-luncurkan-sekolah-rakyat",
          "https://www.metrotvnews.com/read/bD2CMEzQ-166-sekolah-rakyat-beroperasi-presiden-prabowo-ini-luar-biasa",
          "https://www.beritasatu.com/nasional/2933263/prabowo-15945-siswa-sudah-sekolah-di-sekolah-rakyat",
          "https://www.antaranews.com/infografik/5347989/15945-siswa-rasakan-manfaat-sekolah-rakyat",
        ]
      }
    ],
  },
  {
    id: "renovasi-sekolah",
    title: "Renovasi Sekolah",
    subtitle: "16.140 Sekolah Direnovasi Sepanjang 2025",
    narasi: "Pemerintah Indonesia kembali menegaskan bahwa pendidikan adalah pilar utama sekaligus investasi masa depan bangsa. Sepanjang tahun 2025, program prioritas revitalisasi infrastruktur pendidikan telah dieksekusi secara masif untuk memastikan setiap anak Indonesia mendapatkan akses belajar yang setara. Salah satu pencapaian terbesarnya adalah pelaksanaan proyek perbaikan fisik terhadap puluhan ribu bangunan sekolah di berbagai penjuru Nusantara.",
    value: "16.140",
    location: "Jakarta",
    date: "Februari 2026",
    description:
      "Sekolah SD SMP SMA dalam proses renovasi.",
      source: "/source/kemendikdasmen.png",
    videoUrl: "video/renovasi.mp4",
    icon: "/icon/renovasi-sekolah.svg",
    sections: [
      {
        type: "paragraph",
        text: "Berdasarkan data capaian pemerintah hingga akhir tahun 2025, tercatat sebanyak 16.140 gedung sekolah telah dan sedang menjalani tahapan renovasi. Program perbaikan infrastruktur berskala besar ini menyasar secara komprehensif berbagai jenjang pendidikan, mulai dari Sekolah Dasar (SD), Sekolah Menengah Pertama (SMP), hingga tingkatan Sekolah Menengah Atas (SMA). Langkah perbaikan ini bertujuan murni untuk menghadirkan ruang belajar yang jauh lebih aman, nyaman, dan layak bagi seluruh siswa saat menuntut ilmu.",
      },
      {
        type: "stats",
        image: "/data/renovasi-sekolah.jpg",
        className: "flex flex-col gap-5",
        listClassName: "flex justify-around gap-2",
        items: [
          { text: "Total Gedung Sekolah yang Direnovasi", value: "16.140" },
          { text: "Alokasi Anggaran Revitalisasi Pendidikan", value: "17 Triliun" },
          { text: "Fokus pada Tingkat SD, SMP, dan SMA", value: "3 Jenjang" },
        ]
      },
      {
        type: "paragraph",
        text: "Dalam laporan evaluasinya pada awal tahun 2026, Sekretaris Kabinet menyatakan bahwa negara telah mengalokasikan anggaran sekitar Rp17 triliun khusus untuk menyukseskan program renovasi fisik bangunan sekolah ini. Anggaran bernilai fantastis tersebut difokuskan secara transparan untuk merevitalisasi ruang kelas yang rusak, memperbaiki fasilitas sanitasi, serta memperbarui mebel yang kondisinya sudah tidak memadai di ribuan sekolah."
      },
      {
        type: "paragraph",
        text: "Program renovasi ini ditegaskan tidak sekadar sebatas membangun atau memperbaiki wujud fisik bangunan semata. Lebih dari itu, langkah konkret ini merupakan wujud investasi jangka panjang pemerintah dalam merawat kualitas dan martabat Sumber Daya Manusia (SDM). Melalui pemerataan fasilitas yang memadai, pemerintah berupaya keras memastikan kesiapan generasi muda yang berdaya saing demi menyongsong visi besar Indonesia Emas 2045."
      },
      {
        type: "paragraph",
        text: "Dampak program MBG juga terasa pada perekonomian lokal. Program ini telah menciptakan lebih dari 789.000 lapangan pekerjaan, dengan lebih dari 19.000 dapur atau pusat layanan makanan yang tersebar di berbagai daerah. Sebagai contoh, laporan dari Katadata pada Januari 2026 menyebutkan bahwa program ini telah menggerakkan sektor ekonomi lokal melalui penyerapan tenaga kerja yang signifikan, sekaligus memperkuat rantai pasokan pangan di Indonesia (4)."
      },
      {
        type: "quote",
        text: '"Pada 2025 ada 16.140 sekolah yang direnovasi dan jumlahnya akan ditambah pada tahun ini. Tahun ini kami akan meningkatkan renovasi sekolah." — Presiden RI Prabowo Subianto, Januari 2026'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://presidenri.go.id/siaran-pers/presiden-prabowo-pendidikan-adalah-investasi-masa-depan-bangsa/",
          "https://wartabogor.id/1-tahun-pemerintahan-prabowo-166-sekolah-rakyat-beroperasi-renovasi-16-140-gedung-sekolah-hingga-beasiswa-penuh-ke-15-945-siswa/",
          "https://www.antaranews.com/berita/5441994/seskab-16-ribu-sekolah-direnovasi-pada-2025-anggaran-rp17-triliun",
          "https://www.nusantaratv.com/news/di-wef-prabowo-bertekad-renovasi-dan-modernisasi-6000-sekolah"
        ]
      }
    ],
  },
  {
    id: "interactive-flat-panel",
    title: "Interactive Flat Panel",
    subtitle: "Transformasi Pendidikan: 288 Ribu Unit Interactive Flat Panel (IFP)",
    narasi: "Sepanjang akhir tahun 2025, Pemerintah Indonesia melalui Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) mencatatkan sejarah baru dengan mendistribusikan ratusan ribu unit Interactive Flat Panel (IFP) atau smartboard ke berbagai satuan pendidikan di seluruh penjuru Nusantara. Capaian ini merupakan bagian utama dari program prioritas Digitalisasi Pembelajaran yang diinisiasi oleh Presiden Prabowo Subianto guna mempercepat transformasi dan pemerataan kualitas pendidikan sejak usia dini.",
    value: "288.180",
    location: "Jakarta",
    date: "Februari 2026",
    source: "/source/kemendikdasmen.png",
    description:
      "Sekolah dalam proses memasang IFP belajar.",
    videoUrl: "video/ifp.mp4",
    icon: "/icon/interactive-flat-panel.svg",
    sections: [
      {
        type: "paragraph",
        text: "Laporan resmi dari Kemendikdasmen mengonfirmasi bahwa program penyediaan perangkat teknologi canggih ini ditargetkan menyasar tepatnya 288.180 unit ke sekolah pada tahap awal di tahun 2025. Distribusi perangkat pintar ini disalurkan secara masif dan merata ke berbagai jenjang satuan pendidikan. Kehadiran IFP di ruang kelas dirancang untuk menghadirkan pengalaman belajar yang jauh lebih kolaboratif, memperkaya kreativitas siswa, dan tidak lagi sekadar mengandalkan komunikasi pembelajaran satu arah.",
      },
      {
        type: "stats",
        image: "/data/interactive-flat-panel.jpg",
        className: "flex flex-col gap-5",
        listClassName: "flex justify-around gap-2",
        items: [
          { text: "Target Sekolah Penerima IFP", value: "288.865" },
          { text: "Khusus untuk Jenjang PAUD", value: "64.191" },
          { text: "Realisasi November 2025", value: "75%" },
        ]
      },
      {
        type: "paragraph",
        text: "Dalam peluncuran resminya di pertengahan November 2025, Menteri Pendidikan Dasar dan Menengah (Mendikdasmen) Abdul Mu'ti menegaskan bahwa pengadaan IFP ini memiliki landasan hukum yang kuat, yakni berdasarkan Instruksi Presiden (Inpres) dan Bantuan Presiden. Pengiriman perangkat ini dipantau secara ketat, dengan target penyelesaian distribusi ke lebih dari 288 ribu sekolah negeri dan swasta dipatok rampung pada pertengahan hingga akhir Desember 2025."
      },
      {
        type: "paragraph",
        text: "Peningkatan infrastruktur digital ruang kelas ini juga didorong oleh komitmen pemerintah untuk memastikan akses pendidikan yang setara, termasuk bagi sekolah-sekolah di wilayah terpencil (3T). Berbeda dengan televisi pintar biasa, IFP berfungsi sekaligus sebagai monitor, komputer, dan papan tulis digital interaktif. Perangkat ini bahkan dilengkapi dengan materi pembelajaran terintegrasi yang dapat dioperasikan dengan lancar meskipun sekolah tidak memiliki koneksi internet yang stabil."
      },
      {
        type: "quote",
        text: '"Digitalisasi pendidikan adalah langkah penting untuk mencetak generasi yang adaptif terhadap perkembangan zaman. Hari ini kita meresmikan program pembelajaran digitalisasi di mana cukup besar prestasi yang kita capai, sudah 75 persen sekolah menerima panel interaktif." — Presiden RI Prabowo Subianto, November 2025'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "https://www.cnnindonesia.com/nasional/20251117114622-20-1296284/prabowo-luncurkan-288-ribu-smartboard-untuk-sekolah-seluruh-indonesia",
          "https://www.detik.com/edu/sekolah/d-8177567/sekolah-bakal-punya-6-papan-interaktif-digital-per-2029",
          "https://www.cna.id/indonesia/beri-smartboard-untuk-288-ribu-sekolah-prabowo-rakyat-butuh-hasil-cepat-bukan-kebanyakan-omon-omon-40906",
          "https://rmol.id/politik/read/2025/11/17/687056/mendikdasmen-pastikan-288-865-smartboard-tersalur-ke-sekolah-sebelum-akhir-tahun"
        ]
      }
    ],
  },
  {
    id: "cek-kesehatan-gratis",
    title: "Cek Kesehatan Gratis",
    subtitle: "70 Juta Warga Telah Manfaatkan Cek Kesehatan Gratis",
    narasi: "Pemerintah Indonesia di bawah kepemimpinan Presiden Prabowo Subianto mencatatkan capaian luar biasa di sektor kesehatan melalui program Cek Kesehatan Gratis (CKG). Sejak diluncurkan pada 10 Februari 2025, program prioritas ini secara masif menggeser paradigma kesehatan nasional dari fokus pengobatan (kuratif) menjadi upaya pencegahan dini (preventif). Hingga akhir tahun 2025, tercatat sebanyak 70 juta penduduk Indonesia telah berhasil dijangkau oleh layanan pemeriksaan gratis ini.",
    value: "70",
    unit: "juta",
    location: "Jakarta",
    date: "Februari 2026",
    badge: { text: "High", variant: "up"},
    source: "/source/antara.png",
    description:
      "Sepanjang tahun 2025, sebanyak 70 juta masyarakat Indonesia tercatat telah mengikuti program cek kesehatan gratis.",
    videoUrl: "/video/ckg.mp4",
    icon: "/icon/cek-kesehatan-gratis.svg",
    sections: [
      {
        type: "paragraph",
        text: "Kementerian Kesehatan (Kemenkes) mengonfirmasi bahwa pelaksanaan CKG ini difasilitasi oleh 10.588 Puskesmas yang tersebar di 38 provinsi di seluruh Nusantara.  Program skrining kesehatan ini dirancang secara spesifik untuk menjangkau setiap kelompok usia berdasarkan siklus hidup, mulai dari bayi baru lahir, balita, anak usia sekolah, kelompok usia produktif, hingga kalangan lanjut usia (lansia). Melalui deteksi dini ini, risiko fatalitas dari berbagai penyakit tidak menular yang selama ini membebani masyarakat dapat ditekan secara signifikan.",
      },
      {
        type: "paragraph",
        text: "Selain difokuskan di fasilitas kesehatan umum, ekspansi program CKG juga merambah secara agresif ke ranah pendidikan dengan target awal menjangkau lebih dari 53 juta peserta didik pada tahun ajaran baru. Berdasarkan data rekam medis dari pemeriksaan massal ini, Kemenkes menemukan bahwa penyakit yang paling mendominasi dan memerlukan penanganan segera di kalangan usia dewasa adalah hipertensi, masalah gigi, kolesterol tinggi, dan diabetes."
      },
      {
        type: "stats",
        image: "/data/cek-kesehatan-gratis1.jpg",
        className: "flex justify-center",
      },
      {
        type: "paragraph",
        text: "Antusiasme partisipasi membuktikan bahwa kesadaran masyarakat akan pentingnya memeriksakan kesehatan secara berkala semakin meningkat tajam. Menariknya, dari profil demografi pada awal pelaksanaan, partisipasi kaum perempuan tercatat jauh lebih mendominasi hingga 64 persen, sebelum akhirnya partisipasi laki-laki terus bertambah di penghujung tahun. Ke depannya, program andalan ini diproyeksikan tidak hanya efektif meringankan beban ekonomi keluarga, tetapi juga menjadi fondasi absolut untuk mewujudkan generasi emas Indonesia yang produktif dan bebas stunting."
      },
      {
        type: "stats",
        image: "/data/cek-kesehatan-gratis2.jpg",
        className: "flex justify-center",
      },
      {
        type: "quote",
        text: '"Program ini menyentuh seluruh rakyat Indonesia. Ini mungkin salah satu program terbesar dalam sejarah Indonesia yang bisa menyentuh seluruh rakyat. Karena semua penyakit yang menyebabkan kematian itu bisa dicegah asal diketahui secara dini." — Menteri Kesehatan RI, Budi Gunadi Sadikin'
      },
      {
        type: "references",
        title: "Semua pernyataan di atas diambil dari sumber yang tercantum masing-masing (situs resmi pemerintah, jurnal akademik, laporan internasional, artikel berita) sesuai format kutipan",
        source: [
          "InfoPublik (2026). Program CKG 2025 Jangkau 70 Juta Warga, Gorontalo Tertinggi. Tautan: https://infopublik.id/kategori/prioritas-nasional-2026/956107/program-ckg-2025-jangkau-70-juta-warga-gorontalo-tertinggi",
          "CNBC Indonesia (2026). Sepanjang Tahun 2025, Peserta Cek Kesehatan Gratis Capai 70 Juta Orang. Tautan: https://www.cnbcindonesia.com/lifestyle/20260102134721-33-699181/sepanjang-tahun-2025-peserta-cek-kesehatan-gratis-capai-70-juta-orang",
          "https://www.youtube.com/watch?v=uv9zmn--lgQ",
          "https://www.beritasatu.com/lifestyle/2954811/70-juta-orang-ikuti-cek-kesehatan-gratis-sepanjang-2025",
          "https://indonesiabaik.id/infografis/cek-kesehatan-gratis-jangkau-lebih-dari-70-juta-masyarakat-di-seluruh-indonesia"
        ]
      }
    ],
  },
];