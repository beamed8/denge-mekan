import { PropertyHomes } from "@/types/properyHomes";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const PropertyCard: React.FC<{ item: PropertyHomes }> = ({ item }) => {
  const { name, location, rate, beds, baths, area, slug, images } = item;

  // Thumbnail: ilk video olmayanı bul
  const mainImageObj = images?.find(
    (img) => !(img.mime && img.mime.startsWith("video"))
  );
  const mainImage = mainImageObj?.src || "/images/placeholder.jpg";

  return (
    <div>
      <div
        className={`relative rounded-2xl border group hover:shadow-3xl duration-300 dark:hover:shadow-white/20 ${
          item.featured
            ? "border-yellow-300"
            : "border-dark/10 dark:border-white/10"
        }`}
      >
        <div className="overflow-hidden rounded-t-2xl">
          <Link href={`/properties/${item.slug}`}>
            {mainImage && (
              <Image
                src={mainImage}
                alt={name}
                width={440}
                height={300}
                className="w-full h-64 object-cover rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75"
                unoptimized={true}
              />
            )}
          </Link>
          {/* Featured Star Icon */}
          {item.featured && (
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-block animate-featured-star">
                <Icon
                  icon="ph:star-fill"
                  width={32}
                  height={32}
                  className="text-yellow-400 drop-shadow-lg featured-star"
                  style={{ filter: "drop-shadow(0 0 8px #ffe066)" }}
                />
              </span>
            </div>
          )}
          <div className="absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block">
            <Icon
              icon={"solar:arrow-right-linear"}
              width={24}
              height={24}
              className="text-black"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <Link href={`/properties/${item.slug}`}>
                <h3 className="text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary">
                  {name}
                </h3>
              </Link>
              {location && (
                <p className="flex items-center gap-2 text-base font-normal text-black/50 dark:text-white/50 mt-1">
                  <Icon
                    icon="ph:map-pin-fill"
                    className="text-primary"
                    width={18}
                    height={18}
                  />
                  {location}
                </p>
              )}
            </div>
            {Array.isArray(item.kategori) && item.kategori.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                {item.kategori.map((kat) => (
                  <span
                    key={kat.id}
                    className="inline-block text-xs sm:text-sm font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-sm whitespace-nowrap"
                  >
                    {kat.ad}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* <div className='flex'>
            <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8'>
              <Icon icon={'solar:bed-linear'} width={20} height={20} />
              <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                {beds} Bedrooms
              </p>
            </div>
            <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8'>
              <Icon icon={'solar:bath-linear'} width={20} height={20} />
              <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                {baths} Bathrooms
              </p>
            </div>
            <div className='flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8'>
              <Icon
                icon={'lineicons:arrow-all-direction'}
                width={20}
                height={20}
              />
              <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                {area}m<sup>2</sup>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
