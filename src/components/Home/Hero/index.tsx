"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getKategoriler } from "@/lib/api";
import Link from "next/link";

const Hero: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [kategoriler, setKategoriler] = useState<any[]>([]);

  useEffect(() => {
    getKategoriler().then((data) => {
      console.log("📌 API’den gelen kategoriler:", data);
      setKategoriler(data);
    });
  }, []);

  // Türkçe karakterleri normalize eden yardımcı fonksiyon
  function normalize(str?: string) {
    if (!str) return "";
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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const normInput = normalize(input);
    console.log("🔍 Kullanıcı araması:", input, "→", normInput);

    let found = kategoriler.find((kat) => {
      const normKat = normalize(kat?.ad);
      console.log("➡️ Karşılaştır:", kat?.ad, "→", normKat);
      return normKat === normInput;
    });

    if (!found) {
      found = kategoriler.find((kat) => {
        const normKat = normalize(kat?.ad);
        return normKat.startsWith(normInput) || normInput.startsWith(normKat);
      });
    }

    if (found) {
      console.log("✅ Bulunan kategori:", found);
      router.push(`/properties?kategori=${encodeURIComponent(found.ad)}`);
    } else {
      console.warn("⚠️ Kategori bulunamadı, input gönderiliyor:", input);
      router.push(`/properties?kategori=${encodeURIComponent(input)}`);
    }
  }

  return (
    <section className="!py-0 relative overflow-hidden min-h-screen flex items-center">
      {/* Video arka plan */}
      <video
        className="hero-video dark-reader-protected absolute top-0 left-0 w-full h-full object-cover -z-20"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Video background showing luxurious real estate"
        style={{
          filter: "none",
          opacity: 1,
          visibility: "visible" as const,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -20,
        }}
        data-darkreader-ignore
      >
        <source
          src="https://videos.pexels.com/video-files/9810700/9810700-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Siyah transparan katman */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />

      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="container max-w-4xl mx-auto px-5 flex flex-col items-center justify-center h-full relative z-10">
          <h1 className="text-white dark:text-white text-4xl sm:text-5xl lg:text-6xl font-bold text-center drop-shadow-2xl mb-8 max-w-5xl leading-tight tracking-tight">
            Aradığın mekanı bul.
          </h1>

          <form
            className="w-full max-w-2xl mx-auto flex items-center bg-white/90 dark:bg-dark/80 rounded-full shadow-lg px-4 py-2 gap-2"
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

          {/* Tüm mekanları gör butonu */}
          <div className="mt-6">
            <Link
              href="/properties"
              className="inline-block py-3 px-6 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Tüm mekanları gör
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
