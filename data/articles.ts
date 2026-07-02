export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  icon: "fiber" | "recycle" | "circular" | "sort";
  blocks: ArticleBlock[];
  sources: ArticleSource[];
}

export const sustainabilityArticles: Article[] = [
  {
    slug: "renewable-fibers",
    title:
      "Apa Itu Renewable Fibers? Mengenal Serat Terbarukan sebagai Material Masa Depan",
    excerpt:
      "Serat dari biomassa yang bisa diperbarui, dikembangkan untuk mengurangi ketergantungan pada bahan bakar fosil.",
    readingTime: "4 menit baca",
    icon: "fiber",
    blocks: [
      {
        type: "paragraph",
        text: "Renewable fibers atau serat terbarukan adalah serat yang berasal dari sumber daya hayati (biomassa) yang dapat diperbarui, seperti tanaman, kayu, limbah pertanian, maupun sumber hewani. Berbeda dengan serat sintetis berbasis minyak bumi, renewable fibers dikembangkan untuk mengurangi ketergantungan terhadap bahan bakar fosil sekaligus mendukung industri yang lebih ramah lingkungan.",
      },
      {
        type: "paragraph",
        text: "Secara umum, renewable fibers dapat dibagi menjadi tiga kelompok utama:",
      },
      {
        type: "list",
        items: [
          "**Serat alami (native fibers)**, yaitu serat yang diperoleh langsung dari alam seperti kapas, rami, bambu, wol, dan sutra.",
          "**Serat regenerasi (regenerated fibers)**, yaitu serat yang dibuat dengan mengekstraksi biopolimer alami—misalnya selulosa, kitosan, atau fibroin—kemudian diproses kembali menjadi serat menggunakan teknik pemintalan.",
          "**Serat sintetis berbasis bio (biobased synthetic fibers)**, yaitu serat yang diproduksi dari monomer hasil biomassa melalui proses polimerisasi. Contohnya adalah PLA (polylactic acid), PHA, dan beberapa jenis poliamida berbasis bio.",
        ],
      },
      {
        type: "paragraph",
        text: "Perkembangan renewable fibers mengalami transformasi besar. Awalnya, manusia hanya memanfaatkan serat alami untuk kebutuhan sandang. Kini, kemajuan teknologi memungkinkan biomassa diolah menjadi serat dengan performa tinggi melalui berbagai metode seperti wet spinning, melt spinning, hingga electrospinning. Hasilnya adalah material yang tidak hanya lebih berkelanjutan, tetapi juga dapat dirancang sesuai kebutuhan aplikasi tertentu.",
      },
      {
        type: "paragraph",
        text: "Keunggulan utama renewable fibers meliputi penggunaan bahan baku terbarukan, jejak karbon yang lebih rendah, serta potensi biodegradabilitas dan biokompatibilitas pada banyak jenis serat. Selain digunakan pada industri tekstil, material ini juga mulai dimanfaatkan dalam bidang medis, komposit, penyimpanan energi, wearable technology, hingga material pintar.",
      },
      {
        type: "paragraph",
        text: "Meski memiliki prospek yang sangat menjanjikan, pengembangan renewable fibers masih menghadapi beberapa tantangan. Ketersediaan bahan baku, biaya produksi, peningkatan sifat mekanik, serta standarisasi proses manufaktur masih menjadi fokus penelitian. Seiring berkembangnya teknologi ekstraksi biomassa dan proses produksi, renewable fibers diproyeksikan akan semakin banyak menggantikan serat berbasis minyak bumi dan berperan penting dalam mewujudkan ekonomi sirkular serta industri yang lebih berkelanjutan.",
      },
    ],
    sources: [
      {
        label: "sciencedirect.com",
        url: "https://www.sciencedirect.com/science/article/pii/S2590238524001619",
      },
    ],
  },
  {
    slug: "recyclable",
    title:
      "Apa Itu Recyclable? Pengertian, Manfaat, dan Contohnya",
    excerpt:
      "Material yang berpotensi diproses kembali menjadi bahan baku baru — tapi hanya jika dikelola lewat sistem daur ulang yang tepat.",
    readingTime: "5 menit baca",
    icon: "recycle",
    blocks: [
      {
        type: "paragraph",
        text: "Istilah recyclable semakin sering ditemui pada berbagai jenis kemasan dan produk sehari-hari. Label ini menunjukkan bahwa suatu material memiliki potensi untuk diproses kembali menjadi bahan baku atau produk baru setelah selesai digunakan. Dengan kata lain, material tersebut tidak harus langsung berakhir sebagai sampah apabila dikelola melalui sistem daur ulang yang tepat.",
      },
      {
        type: "paragraph",
        text: "Kemampuan suatu material untuk didaur ulang menjadi salah satu faktor penting dalam mendukung pengelolaan limbah yang lebih berkelanjutan. Selain membantu mengurangi jumlah sampah yang masuk ke tempat pembuangan akhir, proses daur ulang juga dapat menghemat penggunaan sumber daya alam dan energi yang dibutuhkan untuk memproduksi material baru.",
      },
      {
        type: "subheading",
        text: "Apa yang Dimaksud dengan Recyclable",
      },
      {
        type: "paragraph",
        text: "Recyclable adalah istilah yang digunakan untuk material yang masih dapat diproses kembali melalui proses daur ulang. Setelah dikumpulkan, dipilah, dibersihkan, dan diolah, material tersebut dapat dimanfaatkan sebagai bahan baku untuk menghasilkan produk baru.",
      },
      {
        type: "paragraph",
        text: "Namun, tidak semua material yang memiliki label recyclable pasti akan didaur ulang. Keberhasilan proses tersebut juga dipengaruhi oleh sistem pengumpulan sampah, fasilitas daur ulang, teknologi pengolahan, serta partisipasi masyarakat dalam memilah sampah sejak dari sumbernya.",
      },
      {
        type: "paragraph",
        text: "Berbagai jenis material memiliki karakteristik yang memungkinkan untuk didaur ulang, di antaranya:",
      },
      {
        type: "list",
        items: [
          "Botol dan wadah plastik tertentu.",
          "Kertas dan karton.",
          "Kaleng aluminium.",
          "Baja.",
          "Botol kaca.",
        ],
      },
      {
        type: "paragraph",
        text: "Setiap material memiliki proses pengolahan yang berbeda sesuai dengan sifat dan karakteristiknya.",
      },
      {
        type: "paragraph",
        text: "Penggunaan material yang dapat didaur ulang memberikan berbagai manfaat, antara lain:",
      },
      {
        type: "list",
        items: [
          "Mengurangi volume sampah yang berakhir di tempat pembuangan akhir.",
          "Menghemat penggunaan bahan baku baru.",
          "Menekan konsumsi energi dalam proses produksi.",
          "Mengurangi emisi gas rumah kaca dari aktivitas manufaktur.",
          "Mendukung penerapan ekonomi sirkular dengan memanfaatkan kembali material yang masih memiliki nilai.",
        ],
      },
      {
        type: "paragraph",
        text: "Tidak semua plastik memiliki karakteristik yang sama. Beberapa jenis plastik lebih mudah didaur ulang dibandingkan jenis lainnya. Karena itu, banyak kemasan plastik dilengkapi dengan kode identifikasi resin untuk membantu proses pemilahan sebelum masuk ke fasilitas daur ulang.",
      },
      {
        type: "paragraph",
        text: "Apabila dikelola dengan baik, plastik yang dapat didaur ulang dapat diolah menjadi berbagai produk baru, sehingga masa pakainya menjadi lebih panjang dan kebutuhan terhadap bahan baku plastik baru dapat dikurangi.",
      },
      {
        type: "paragraph",
        text: "Recyclable merupakan konsep penting dalam pengelolaan limbah modern. Material yang dapat didaur ulang memberikan peluang untuk digunakan kembali sebagai bahan baku sehingga mampu mengurangi timbulan sampah sekaligus mendukung penggunaan sumber daya yang lebih efisien. Meski demikian, manfaat tersebut hanya dapat tercapai apabila proses pemilahan, pengumpulan, dan daur ulang berjalan dengan baik serta didukung oleh kesadaran seluruh pihak dalam mengelola sampah secara bertanggung jawab.",
      },
    ],
    sources: [
      {
        label: "plasticsandrubberindonesia.com",
        url: "https://www.plasticsandrubberindonesia.com/archives/1188",
      },
      {
        label: "prieds.com",
        url: "https://www.prieds.com/post/recyclable-packaging-arti-fungsi-tips-mengelola-dan-optimalisasi",
      },
    ],
  },
  {
    slug: "circular-economy",
    title: "Apa Itu Circular Economy?",
    excerpt:
      "Model ekonomi yang menjaga nilai produk dan material selama mungkin, alih-alih pola ambil-buat-buang.",
    readingTime: "3 menit baca",
    icon: "circular",
    blocks: [
      {
        type: "paragraph",
        text: "Circular economy atau ekonomi sirkular merupakan model ekonomi yang bertujuan memaksimalkan pemanfaatan sumber daya sekaligus meminimalkan timbulan limbah dan pencemaran. Berbeda dengan ekonomi linear yang menerapkan pola ambil–buat–buang, ekonomi sirkular berfokus pada pengurangan limbah, penggunaan kembali, perbaikan, serta daur ulang agar nilai produk dan material dapat dipertahankan selama mungkin.",
      },
      {
        type: "paragraph",
        text: "Pendekatan ini mendorong perubahan sistem produksi dan konsumsi melalui perancangan produk yang lebih berkelanjutan, penggunaan sumber daya secara efisien, serta pengelolaan limbah sebagai sumber daya baru. Produk dirancang agar lebih awet, mudah diperbaiki, digunakan kembali, maupun didaur ulang sehingga kebutuhan akan bahan baku baru dapat ditekan.",
      },
      {
        type: "paragraph",
        text: "Penerapan ekonomi sirkular memberikan berbagai manfaat, seperti mengurangi tekanan terhadap sumber daya alam, menekan pencemaran lingkungan, meningkatkan efisiensi ekonomi, memperkuat daya saing, menciptakan peluang usaha dan lapangan kerja hijau, serta mendukung pembangunan berkelanjutan dan pengendalian perubahan iklim.",
      },
      {
        type: "paragraph",
        text: "Keberhasilan ekonomi sirkular memerlukan kolaborasi antara pemerintah, dunia usaha, dan masyarakat. Pemerintah berperan melalui kebijakan dan regulasi, pelaku usaha menerapkan desain produk yang berkelanjutan dan pengelolaan sumber daya yang lebih efisien, sedangkan masyarakat dapat berkontribusi dengan mengurangi penggunaan produk sekali pakai, memilah sampah, menggunakan kembali barang yang masih layak, serta mendukung kegiatan daur ulang.",
      },
    ],
    sources: [
      {
        label: "kemenlh.go.id",
        url: "https://kemenlh.go.id/contents/18/Ekonomi-Sirkular",
      },
      {
        label: "sucofindo.co.id",
        url: "https://www.sucofindo.co.id/artikel-1/apa-itu-circular-economy-atau-ekonomi-sirkular/",
      },
    ],
  },
  {
    slug: "memilah-sampah",
    title: "Mengapa Memilah Sampah Itu Penting?",
    excerpt:
      "Langkah sederhana dari rumah yang menentukan seberapa efektif sampah bisa diolah dan didaur ulang.",
    readingTime: "3 menit baca",
    icon: "sort",
    blocks: [
      {
        type: "paragraph",
        text: "Memilah sampah merupakan langkah sederhana yang memberikan dampak besar bagi lingkungan. Dengan memisahkan sampah sejak dari sumbernya, setiap jenis sampah dapat dikelola menggunakan metode yang paling sesuai sehingga proses pengolahan menjadi lebih efektif dan efisien.",
      },
      {
        type: "paragraph",
        text: "Sampah yang tercampur akan menyulitkan proses pengolahan dan mengurangi potensi material yang sebenarnya masih dapat dimanfaatkan kembali. Sebaliknya, ketika sampah organik, anorganik, dan residu dipisahkan, sampah organik dapat diolah menjadi kompos, sedangkan sampah anorganik seperti kertas, plastik, logam, dan kaca memiliki peluang lebih besar untuk didaur ulang menjadi produk baru.",
      },
      {
        type: "paragraph",
        text: "Pemilahan sampah juga membantu mengurangi jumlah sampah yang berakhir di Tempat Pemrosesan Akhir (TPA). Semakin sedikit sampah yang dikirim ke TPA, semakin panjang umur operasional TPA dan semakin kecil risiko pencemaran tanah, air, maupun udara akibat penumpukan sampah.",
      },
      {
        type: "paragraph",
        text: "Selain memberikan manfaat bagi lingkungan, pemilahan sampah juga mendukung penerapan ekonomi sirkular. Material yang masih memiliki nilai dapat kembali dimanfaatkan sebagai bahan baku sehingga mengurangi penggunaan sumber daya alam baru. Dengan demikian, limbah tidak langsung berakhir sebagai sampah, tetapi dapat kembali menjadi bagian dari siklus produksi.",
      },
      {
        type: "paragraph",
        text: "Kebiasaan memilah sampah juga mendorong masyarakat untuk lebih bertanggung jawab terhadap sampah yang dihasilkan setiap hari. Langkah sederhana ini dapat dimulai dari rumah dengan menyediakan tempat sampah terpisah untuk sampah organik, anorganik, dan residu. Apabila dilakukan secara konsisten, pemilahan sampah akan mempermudah proses pengangkutan, pengolahan, hingga daur ulang.",
      },
      {
        type: "paragraph",
        text: "Pada akhirnya, keberhasilan pengelolaan sampah tidak hanya bergantung pada pemerintah atau pengelola sampah, tetapi juga pada partisipasi setiap individu. Dengan membiasakan memilah sampah dari sumbernya, kita turut berkontribusi dalam mengurangi pencemaran lingkungan, meningkatkan tingkat daur ulang, serta menciptakan lingkungan yang lebih bersih dan berkelanjutan.",
      },
    ],
    sources: [
      {
        label: "waste4change.com",
        url: "https://waste4change.com/blog/5-alasan-mengapa-kita-harus-memilah-sampah-dari-sumbernya/",
      },
      {
        label: "dlh.bekasikota.go.id",
        url: "https://dlh.bekasikota.go.id/mengapa-harus-memilah-sampah-",
      },
    ],
  },
];
