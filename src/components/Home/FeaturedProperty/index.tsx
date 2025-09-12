"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProprty } from "@/app/api/featuredproperty";
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const FeaturedProperty: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };


  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {featuredProprty.map((item, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={item.scr}
                      alt={item.alt}
                      width={680}
                      height={530}
                      className="rounded-2xl w-full h-540"
                      unoptimized={true}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute left-2/5 bg-dark/50 rounded-full py-2.5 bottom-10 flex justify-center mt-4 gap-2.5 px-2.5">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full ${current === index + 1 ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
                Öne Çıkan Kategoriler
              </p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-dark dark:text-white leading-tight">
                Organizasyonunuza en uygun mekanları bulun
              </h2>
              <div className="flex flex-wrap gap-2.5 mt-2">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-medium">Malikaneler</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-medium">Kafeler</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-medium">Oteller</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-medium">Köşkler</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-medium">Daireler</span>
              </div>
            </div>
            <p className="text-base text-dark/50 dark:text-white/50">
              Düğün, toplantı, doğum günü, atölye, lansman, parti ve daha birçok organizasyon için uygun mekanları kolayca keşfedin.
            </p>
            {/* Kategori detayları örnek olarak yukarıda badge şeklinde verildi, burada ekstra detay kaldırıldı */}
            <div className="flex gap-10 mt-4">
              <Link href="/properties" className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white font-semibold text-lg">
                Tüm Mekanları Gör
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
