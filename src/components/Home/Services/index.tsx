import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-0 top-0">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-10">
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon
                icon="ph:building-apartment-fill"
                className="text-2xl text-primary "
              />
              Kategoriler
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl mt-4 mb-2 lg:max-w-full font-bold leading-tight text-dark dark:text-white">
              En doğru mekanları keşfedin
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              Organizasyonunuz için malikanelerden kafelere, otellerden köşklere
              ve dairelere kadar birçok farklı mekanı kolayca bulun.
            </p>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Link href="/properties?kategori=malikane" className="block">
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "386px",
                  }}
                >
                  <Image
                    src="/images/categories/malikane.jpg"
                    alt="malikane"
                    fill
                    className="object-cover rounded-2xl"
                    unoptimized={true}
                  />
                </div>
                <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                  <div className="flex justify-end mt-6 mr-6">
                    {/* <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-white text-2xl flex items-center gap-2">
                      <Icon
                        icon="ph:buildings"
                        className="text-xl text-white"
                      />
                      Malikaneler
                    </h3>
                    <p className="text-white/80 text-base leading-6">
                      Geniş bahçeli, lüks ve özel davetler için uygun malikane
                      seçenekleri.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <Link href="/properties?kategori=kafe" className="block">
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "386px",
                  }}
                >
                  <Image
                    src="/images/categories/kafe.jpg"
                    alt="kafe"
                    fill
                    className="object-cover rounded-2xl"
                    unoptimized={true}
                  />
                </div>
                <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                  <div className="flex justify-end mt-6 mr-6">
                    {/* <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-white text-2xl flex items-center gap-2">
                      <Icon icon="ph:coffee" className="text-xl text-white" />
                      Kafeler
                    </h3>
                    <p className="text-white/80 text-base leading-6">
                      Samimi buluşmalar ve küçük etkinlikler için konsept
                      kafeler.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="lg:col-span-3 col-span-6">
            <Link href="/properties?kategori=ofis" className="block">
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "386px",
                  }}
                >
                  <Image
                    src="/images/categories/ofis.jpg"
                    alt="ofis"
                    fill
                    className="object-cover rounded-2xl"
                    unoptimized={true}
                  />
                </div>
                <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                  <div className="flex justify-end mt-6 mr-6">
                    {/* <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-white text-2xl flex items-center gap-2">
                      <Icon
                        icon="ph:briefcase"
                        className="text-xl text-white"
                      />
                      Ofisler
                    </h3>
                    <p className="text-white/80 text-base leading-6">
                      Şehir merkezinde, modern ve profesyonel toplantılar için.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="lg:col-span-3 col-span-6">
            <Link href="/properties?kategori=magaza" className="block">
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "386px",
                  }}
                >
                  <Image
                    src="/images/categories/magaza.jpg"
                    alt="mağaza"
                    fill
                    className="object-cover rounded-2xl"
                    unoptimized={true}
                  />
                </div>
                <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                  <div className="flex justify-end mt-6 mr-6">
                    {/* <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-white text-2xl flex items-center gap-2">
                      <Icon
                        icon="ph:storefront"
                        className="text-xl text-white"
                      />
                      Mağazalar
                    </h3>
                    <p className="text-white/80 text-base leading-6">
                      Etkinlikleriniz için merkezi, kolay erişilebilir mağaza
                      alanları.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
