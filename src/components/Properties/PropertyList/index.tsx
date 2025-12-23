"use client";
import Link from "next/link";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import Breadcrumb from "@/components/Breadcrumb";
import { getEmlaklar, getKategoriler } from "@/lib/api";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
import { Filter } from "lucide-react";

const kategoriAliases: Record<string, string[]> = {
  konut: ["ev", "daire", "residans"],
  okul: ["okul", "üniversite", "kolej"],
  restoran: ["restoran", "lokanta", "cafe"],
  // buraya diğer kategoriler ve alias'larını ekleyebilirsin
};

const PropertiesListing: React.FC = () => {
  // Breadcrumb linkleri
  const breadcrumbLinks = [
    { href: "/", text: "Anasayfa" },
    { href: "/properties", text: "Mekanlar" },
  ];
  const [emlaklar, setEmlaklar] = useState<any[]>([]);
  const [kategoriler, setKategoriler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategoriParam = searchParams?.get("kategori") || "";
  
  // Pagination ve Sort state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(12); // 12 items per page
  
  const sortParam = searchParams?.get("sort");
  const [sortOption, setSortOption] = useState<{ field: string; order: "asc" | "desc"; recommended?: boolean }>(() => {
    if (sortParam === "newest") {
      return { field: "createdAt", order: "desc", recommended: false };
    }
    return { field: "createdAt", order: "desc", recommended: true };
  });

  // URL'den sort değişirse state'i güncelle
  useEffect(() => {
    if (sortParam === "newest") {
      setSortOption({ field: "createdAt", order: "desc", recommended: false });
    }
  }, [sortParam]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Türkçe karakterleri normalize eden fonksiyon
  function normalize(str?: string | null) {
    if (!str || typeof str !== "string") return "";
    return str
      .toLocaleLowerCase("tr")
      .replace(/ı/g, "i")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/â/g, "a")
      .replace(/[^a-z0-9]/g, "")
      .replace(/ler$|lar$/g, "");
  }

  // Arama fonksiyonu (Artık SearchBar tarafından yönetiliyor)
  // function handleSearch(e: React.FormEvent) { ... }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [emlakResponse, kategoriData] = await Promise.all([
          getEmlaklar(
            currentPage, 
            pageSize, 
            sortOption.field, 
            sortOption.order, 
            !!sortOption.recommended
          ),
          getKategoriler(),
        ]);
        if (sortOption.recommended) {
          // Frontend safety sort to ensure featured items are at the very top
          const sorted = [...emlakResponse.data].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
          setEmlaklar(sorted);
        } else {
          setEmlaklar(emlakResponse.data);
        }
        setKategoriler(kategoriData);
        setTotalPages(emlakResponse.meta.pagination.pageCount);
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage, pageSize, sortOption]);

  const term = normalize(kategoriParam);

  // Arama terimini kelimelere ayır (boşlukla split)
  const searchWords = term.split(" ").filter(Boolean);

  // Kategorilerde arama kelimesiyle eşleşen kategori bul
  // Kategorilerde arama kelimesiyle eşleşen kategori bul (alias ve fuzzy ile)
  const matchedKategori = kategoriler.find((kat: any) => {
    const katNormAd = normalize(kat.ad);
    const katNormSlug = normalize(kat.slug);
    // Alias'ları da kontrol et
    const aliases =
      kategoriAliases[katNormSlug] || kategoriAliases[katNormAd] || [];
    return searchWords.some((word) => {
      if (katNormAd.includes(word) || katNormSlug.includes(word)) return true;
      if (aliases.some((alias) => normalize(alias).includes(word))) return true;
      return false;
    });
  });

  // Eşleşen kategoriye ait mekanlar (alias ve fuzzy ile)
  const kategoriMekanlar = matchedKategori
    ? emlaklar.filter((e) => {
        const kategoriArr = Array.isArray(e?.kategori)
          ? e.kategori
          : e?.kategori
          ? [e.kategori]
          : [];
        return kategoriArr.some((kat: any) => {
          const katNormAd = normalize(kat.ad);
          const katNormSlug = normalize(kat.slug);
          const aliases =
            kategoriAliases[katNormSlug] || kategoriAliases[katNormAd] || [];
          return (
            katNormAd.includes(term) ||
            katNormSlug.includes(term) ||
            aliases.some((alias) => normalize(alias).includes(term))
          );
        });
      })
    : [];

  // Arama kelimesiyle eşleşen lokasyon bul
  const matchedLokasyon = searchWords.find((word) =>
    emlaklar.some((e) => normalize(e.lokasyon) === word)
  );

  // Eşleşen lokasyona ait mekanlar
  const lokasyonMekanlar = matchedLokasyon
    ? emlaklar.filter((e) => normalize(e.lokasyon) === matchedLokasyon)
    : [];

  // Diğer eşleşen mekanlar (kategori ve lokasyon ile eşleşmeyenler)
  const digerMekanlar = term
    ? emlaklar.filter((e) => {
        // Kategoris adlarını ve slug'larını topla
        const kategoriArr = Array.isArray(e?.kategori)
          ? e.kategori
          : e?.kategori
          ? [e.kategori]
          : [];
        const kategoriNames = kategoriArr
          .map((kat: any) => normalize(kat?.ad))
          .filter(Boolean);
        const kategoriSlugs = kategoriArr
          .map((kat: any) => normalize(kat?.slug))
          .filter(Boolean);

        // Eğer bu mekan zaten kategoriMekanlar'da veya lokasyonMekanlar'da varsa gösterme
        if (kategoriMekanlar.includes(e) || lokasyonMekanlar.includes(e))
          return false;

        // Diğer alanlarda fuzzy search
        const baslik = normalize(e?.baslik);
        const aciklama = normalize(e?.aciklama);
        return searchWords.some(
          (word) => baslik.includes(word) || aciklama.includes(word)
        );
      })
    : emlaklar;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of results
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-0!" ref={scrollContainerRef}>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="w-full max-w-2xl">
            <SearchBar 
              initialValue={kategoriParam} 
              placeholder="Etkinlik türü, şehir, kategori veya mekan adı ile arayın..."
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-6 py-2.5 bg-white/50 dark:bg-dark/40 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-primary/30">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sıralama:</span>
              <select 
                value={sortOption.recommended ? "recommended" : `${sortOption.field}:${sortOption.order}`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "recommended") {
                    setSortOption({ field: "createdAt", order: "desc", recommended: true });
                  } else {
                    const [field, order] = val.split(":");
                    setSortOption({ field, order: order as "asc" | "desc", recommended: false });
                  }
                  setCurrentPage(1);
                }}
                className="bg-transparent outline-none text-sm font-bold text-gray-900 dark:text-white cursor-pointer pr-2"
              >
                <option value="recommended">Önerilen</option>
                <option value="createdAt:desc">Yeniden Eskiye</option>
                <option value="createdAt:asc">Eskiden Yeniye</option>
                <option value="baslik:asc">Alfabetik (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
        {/* ...existing code... */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-dark dark:text-white text-lg">
                Mekanlar yükleniyor...
              </p>
            </div>
          </div>
        ) : (
          <>
            {matchedKategori && kategoriMekanlar.length > 0 && (
              <div className="mb-10 border-2 border-blue-300 rounded-xl p-6 bg-blue-50">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                  &quot;{matchedKategori.ad}&quot; kategorisindeki mekanlar:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {kategoriMekanlar.map((item, index) => (
                    <div key={index}>
                      <PropertyCard
                        item={{
                          name: item.baslik,
                          location: item.lokasyon,
                          rate: item.fiyat,
                          beds: 3,
                          baths: 2,
                          area: 140,
                          slug: item.slug,
                          kategori: item.kategori,
                          aciklama: item.aciklama,
                          featured: item.featured,
                          images:
                            item.resimler?.map((img: any) => ({
                              src: img.url,
                              mime:
                                img.mime ||
                                img.mimeType ||
                                (img.url?.endsWith(".mp4")
                                  ? "video/mp4"
                                  : img.url?.endsWith(".mov")
                                  ? "video/quicktime"
                                  : "image/jpeg"),
                              alt:
                                img.alternativeText ||
                                img.name ||
                                item.baslik ||
                                "",
                            })) || [],
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {matchedLokasyon && lokasyonMekanlar.length > 0 && (
              <div className="mb-10 border-2 border-green-300 rounded-xl p-6 bg-green-50">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  &quot;{lokasyonMekanlar[0]?.lokasyon}&quot; lokasyonundaki
                  mekanlar:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {lokasyonMekanlar.map((item, index) => (
                    <div key={index}>
                      <PropertyCard
                        item={{
                          name: item.baslik,
                          location: item.lokasyon,
                          rate: item.fiyat,
                          beds: 3,
                          baths: 2,
                          area: 140,
                          slug: item.slug,
                          kategori: item.kategori,
                          aciklama: item.aciklama,
                          featured: item.featured,
                          images:
                            item.resimler?.map((img: any) => ({
                              src: img.url,
                              mime:
                                img.mime ||
                                img.mimeType ||
                                (img.url?.endsWith(".mp4")
                                  ? "video/mp4"
                                  : img.url?.endsWith(".mov")
                                  ? "video/quicktime"
                                  : "image/jpeg"),
                              alt:
                                img.alternativeText ||
                                img.name ||
                                item.baslik ||
                                "",
                            })) || [],
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {digerMekanlar.length > 0 && (
              <div className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {digerMekanlar.map((item, index) => (
                    <div key={index}>
                      <PropertyCard
                        item={{
                          name: item.baslik,
                          location: item.lokasyon,
                          rate: item.fiyat,
                          beds: 3,
                          baths: 2,
                          area: 140,
                          slug: item.slug,
                          kategori: item.kategori,
                          aciklama: item.aciklama,
                          featured: item.featured,
                          images:
                            item.resimler?.map((img: any) => ({
                              src: img.url,
                              mime:
                                img.mime ||
                                img.mimeType ||
                                (img.url?.endsWith(".mp4")
                                  ? "video/mp4"
                                  : img.url?.endsWith(".mov")
                                  ? "video/quicktime"
                                  : "image/jpeg"),
                              alt:
                                img.alternativeText ||
                                img.name ||
                                item.baslik ||
                                "",
                            })) || [],
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {kategoriMekanlar.length === 0 &&
              lokasyonMekanlar.length === 0 &&
              digerMekanlar.length === 0 && (
                <div className="relative rounded-2xl overflow-hidden flex items-center justify-center min-h-[340px] md:min-h-[420px] lg:min-h-[520px] my-10">
                  <video
                    className="hero-video dark-reader-protected w-full h-full absolute top-0 left-0 object-cover -z-10"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Video background showing luxurious real estate"
                    style={{
                      filter: "none",
                      opacity: 1,
                      visibility: "visible",
                    }}
                  >
                    <source
                      src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
                    <div className="text-white text-2xl md:text-3xl font-semibold text-center drop-shadow-lg">
                      Aradığınız kategoriye veya arama kriterine uygun mekan
                      bulunamadı.
                    </div>
                    <Link
                      href="/contactus"
                      className="bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300 font-semibold text-lg shadow-lg"
                    >
                      Bizimle iletişime geçin
                    </Link>
                  </div>
                </div>
              )}
          </>
        )}
        
        {/* Pagination */}
        {!loading && digerMekanlar.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-16 mb-8"
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesListing;
