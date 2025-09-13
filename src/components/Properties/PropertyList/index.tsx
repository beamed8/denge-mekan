"use client";
import Link from "next/link";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import Breadcrumb from "@/components/Breadcrumb";
import { getEmlaklar, getKategoriler } from "@/lib/api";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const kategoriParam = searchParams?.get("kategori") || "";

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

  // Arama fonksiyonu
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) {
      router.push("/properties");
      return;
    }
    router.push(`/properties?kategori=${encodeURIComponent(input.trim())}`);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [emlakData, kategoriData] = await Promise.all([
          getEmlaklar(),
          getKategoriler(),
        ]);
        setEmlaklar(emlakData);
        setKategoriler(kategoriData);
        // Debug: log fetched data
        console.log("Fetched emlaklar:", emlakData);
        console.log("Fetched kategoriler:", kategoriData);
        if (emlakData.length > 0) {
          console.log("First emlak entry kategori:", emlakData[0]?.kategori);
        }
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  return (
    <section className="pt-0!">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="w-full max-w-3xl mx-auto flex items-center bg-white/90 dark:bg-dark/80 rounded-full shadow-lg px-6 py-3 gap-2 mb-12">
          <Search className="text-primary w-6 h-6" />
          <form className="flex-grow flex items-center" onSubmit={handleSearch}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Etkinlik türü, şehir, kategori veya mekan adı ile arayın..."
              className="flex-grow bg-transparent outline-none text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-white px-2"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 rounded-full px-10 py-3 font-semibold text-white text-lg transition-colors shadow-md ml-2"
            >
              Ara
            </button>
          </form>
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
                  "{matchedKategori.ad}" kategorisindeki mekanlar:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {[...kategoriMekanlar.filter(e => e.featured), ...kategoriMekanlar.filter(e => !e.featured)].map((item, index) => (
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
                  "{lokasyonMekanlar[0]?.lokasyon}" lokasyonundaki mekanlar:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {[...lokasyonMekanlar.filter(e => e.featured), ...lokasyonMekanlar.filter(e => !e.featured)].map((item, index) => (
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
                  {[...digerMekanlar.filter(e => e.featured), ...digerMekanlar.filter(e => !e.featured)].map((item, index) => (
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
      </div>
    </section>
  );
};

export default PropertiesListing;
