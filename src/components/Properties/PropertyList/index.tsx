"use client";
import Link from "next/link";
import PropertyCard from "@/components/Home/Properties/Card/Card";
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
    if (!input.trim()) return;
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
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const term = normalize(kategoriParam);

  const filtered = term
    ? emlaklar.filter((e) => {
        // Başlık ve açıklama araması
        const baslik = normalize(e?.baslik);
        const aciklama = normalize(e?.aciklama);

        // Kategori araması (dizi ise tümünü kontrol et)
        const kategoriler = Array.isArray(e?.kategori)
          ? e.kategori
          : [e?.kategori].filter(Boolean);
        const kategoriMatch = kategoriler.some((kat) => {
          if (!kat?.ad) return false;
          const katName = normalize(kat.ad);
          const aliases = kategoriAliases[katName] || [];
          const allNames = [katName, ...aliases.map(normalize)];
          return allNames.some(
            (name) =>
              name && term && (name.includes(term) || term.includes(name))
          );
        });

        // Arama terimi başlıkta, açıklamada veya kategoride varsa eşleşir
        return (
          baslik.includes(term) || aciklama.includes(term) || kategoriMatch
        );
      })
    : emlaklar;

  return (
    <section className="pt-0!">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-dark dark:text-white text-lg">
                Mekanlar yükleniyor...
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="relative rounded-2xl overflow-hidden flex items-center justify-center min-h-[340px] md:min-h-[420px] lg:min-h-[520px] my-10">
            <video
              className="hero-video dark-reader-protected w-full h-full absolute top-0 left-0 object-cover -z-10"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Video background showing luxurious real estate"
              style={{ filter: "none", opacity: 1, visibility: "visible" }}
            >
              <source
                src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
              <div className="text-white text-2xl md:text-3xl font-semibold text-center drop-shadow-lg">
                Aradığınız kategoriye uygun mekan bulunamadı.
              </div>
              <form
                className="w-full max-w-xl mx-auto flex items-center bg-white/90 dark:bg-dark/80 rounded-full shadow-lg px-4 py-2 gap-2"
                onSubmit={handleSearch}
              >
                <Search className="text-primary w-6 h-6" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Etkinlik türü, şehir veya mekan adı ile arayın..."
                  className="flex-grow bg-transparent outline-none text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-white px-2"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/80 rounded-full px-8 py-3 font-semibold text-white text-lg transition-colors shadow-md"
                >
                  Ara
                </button>
              </form>
              <Link
                href="/contactus"
                className="bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300 font-semibold text-lg shadow-lg"
              >
                Bizimle iletişime geçin
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filtered.map((item, index) => (
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
                      images:
                        item.resimler?.map((img: any) => ({
                          src: img.url,
                          mime: img.mime || img.mimeType || (img.url?.endsWith('.mp4') ? 'video/mp4' : img.url?.endsWith('.mov') ? 'video/quicktime' : 'image/jpeg'),
                          alt: img.alternativeText || img.name || item.baslik || ""
                        })) || [],
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PropertiesListing;
