"use client"; // ❗️Eğer burada fetch yapmayacaksan bunu kaldırabilirsin

import { Icon } from "@iconify/react";
import PropertyCard from "./Card/Card";
import Link from "next/link";
// import { propertyHomes } from '@/app/api/propertyhomes' ❌ bunu kaldır
import { getEmlaklar } from "@/lib/api"; // ✅ senin Strapi api fonksiyonun
import { useEffect, useState } from "react";

const Properties: React.FC = () => {
  const [emlaklar, setEmlaklar] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getEmlaklar(1, 100); // Fetch all items for home page
      setEmlaklar(response.data);
    }
    fetchData();
  }, []);

  // Rastgele 3 mekan seçme (öncelik featured olanlarda)
  function getRandomItems(arr: any[], count: number) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const featured = emlaklar.filter((e) => e.featured);
  const nonFeatured = emlaklar.filter((e) => !e.featured);
  let selected: any[] = [];
  // Featured'lar en önde olacak şekilde sıralama
  if (featured.length >= 3) {
    selected = getRandomItems(featured, 3);
  } else {
    selected = [
      ...getRandomItems(featured, featured.length),
      ...getRandomItems(nonFeatured, 3 - featured.length),
    ];
  }
  // Featured'lar en önde olacak şekilde diziyi sırala
  selected = [
    ...selected.filter((e) => e.featured),
    ...selected.filter((e) => !e.featured),
  ];

  return (
    <section className="overflow-x-hidden w-full">
      <div className="container max-w-8xl mx-auto px-4 sm:px-5 2xl:px-0 w-full">
        <div className="mb-16 flex flex-col gap-3 ">
          <div className="flex gap-2.5 items-center justify-center">
            <span>
              <Icon
                icon={"ph:house-simple-fill"}
                width={20}
                height={20}
                className="text-primary"
              />
            </span>
            <p className="text-base font-semibold text-dark/75 dark:text-white/75">
              Mekanlar
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-black dark:text-white text-center tracking-tight leading-tight mb-2 break-words">
            Çekimlerinize en uygun mekanları bulun
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-normal text-black/50 dark:text-white/50 text-center break-words">
            Her türlü çekiminiz için mağazalardan kafelere, otellerden dairelere
            ve araçlara kadar birçok farklı mekanı kolayca bulun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {selected.map((item, index) => (
            <div key={index}>
              <PropertyCard
                item={{
                  name: item.baslik,
                  location: item.lokasyon,
                  rate: item.fiyat,
                  beds: 3, // Strapi'de yoksa örnek ver
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

        {/* Tüm Mekanları Gör Butonu */}
        <div className="flex justify-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center gap-3 py-4 px-8 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Icon icon="ph:house-simple-fill" className="text-xl" />
            Tüm Mekanları Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Properties;
