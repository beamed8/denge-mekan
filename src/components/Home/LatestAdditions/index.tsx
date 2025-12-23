"use client";

import { Icon } from "@iconify/react";
import PropertyCard from "../Properties/Card/Card";
import Link from "next/link";
import { getEmlaklar } from "@/lib/api";
import { useEffect, useState } from "react";

const LatestAdditions: React.FC = () => {
  const [emlaklar, setEmlaklar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEmlaklar(1, 3, "createdAt", "desc", false);
        setEmlaklar(response.data);
      } catch (error) {
        console.error("Son eklenenler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!loading && emlaklar.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-dark/20 overflow-x-hidden w-full">
      <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0 w-full">
        <div className="mb-16 flex flex-col gap-3">
          <div className="flex gap-2.5 items-center justify-center">
            <span className="p-2 bg-primary/10 rounded-lg">
              <Icon
                icon={"ph:clock-fill"}
                width={20}
                height={20}
                className="text-primary"
              />
            </span>
            <p className="text-base font-semibold text-primary uppercase tracking-wider">
              YENİ MEKANLAR
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-black dark:text-white text-center tracking-tight leading-tight mb-2 break-words">
            En Yeniler
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-normal text-black/50 dark:text-white/50 text-center max-w-2xl mx-auto break-words">
            Portföyümüze yeni katılan mekanları keşfedin.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-dark/40 rounded-3xl h-[400px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {emlaklar.map((item, index) => (
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
                    images: item.resimler.map((img: any) => ({
                      src: img.url,
                      mime:
                        img.mime ||
                        img.mimeType ||
                        (img.url?.endsWith(".mp4")
                          ? "video/mp4"
                          : img.url?.endsWith(".mov")
                          ? "video/quicktime"
                          : "image/jpeg"),
                      alt: img.alternativeText || img.name || item.baslik || "",
                    })),
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-16">
          <Link
            href="/properties?sort=newest"
            className="group relative inline-flex items-center gap-3 py-4 px-10 bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 hover:border-primary/50 text-dark dark:text-white rounded-full font-bold text-lg transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <span>Tüm Yeni Mekanları Keşfedin</span>
            <Icon icon="ph:arrow-right-bold" className="text-xl transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestAdditions;
