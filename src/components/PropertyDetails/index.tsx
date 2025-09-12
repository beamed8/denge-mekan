// components/PropertyDetails/index.tsx
"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyDetailsProps {
  data: any;
}

const PropertyDetails = ({ data }: PropertyDetailsProps) => {
  const attributes = data?.attributes || {};
  const { baslik, aciklama, resimler, fiyat, lokasyon } = attributes;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Güvenli image URL listesi
  const imageUrls = Array.isArray(resimler?.data)
    ? resimler.data.map((img: any) => {
        const attr = img.attributes || img;
        const url = attr.url || "";
        const mime = attr.mime || attr.mimeType || "";
        return {
          src: url.startsWith("http")
            ? url
            : `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          mime,
        };
      })
    : [];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
    );

  // Rich Text JSON -> React element
  const renderRichText = (content: any): React.ReactNode => {
    if (!content) return null;

    // Eğer düz metin ise doğrudan döndür
    if (typeof content === "string") return content;

    // Eğer bir dizi ise her öğeyi işle
    if (Array.isArray(content)) {
      return content.map((node, index) => (
        <Fragment key={index}>{renderRichText(node)}</Fragment>
      ));
    }

    // text property varsa ve type yoksa, bu bir leaf node
    if (content.text && !content.type) {
      let text = content.text;
      return text;
    }

    // type ve data varsa (Strapi rich text formatı)
    if (content.type && content.data) {
      const children = content.children?.map((child: any, index: number) => (
        <Fragment key={index}>{renderRichText(child)}</Fragment>
      ));

      switch (content.type) {
        case "root":
          return <div className="space-y-4">{children}</div>;
        case "paragraph":
          return <p className="mb-4">{children}</p>;
        case "text":
          return content.text;
        default:
          return children || null;
      }
    }

    return null;
  };

  // Diğer object alanları için güvenli render
  const renderSafeField = (field: any) => {
    if (typeof field === "string" || typeof field === "number") {
      return field;
    } else if (Array.isArray(field)) {
      return field.map((item, index) => (
        <span key={index}>{renderSafeField(item)}</span>
      ));
    } else if (field && typeof field === "object") {
      return <pre>{JSON.stringify(field, null, 2)}</pre>;
    }
    return null;
  };

  return (
    <>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-4">{renderSafeField(baslik)}</h1>

        {lokasyon && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <span className="font-semibold">Konum:</span> {lokasyon}
          </p>
        )}

        <div className="mb-6 prose dark:prose-invert max-w-none">
          {typeof aciklama === 'string' ? (
            <p>{aciklama}</p>
          ) : (
            renderRichText(aciklama)
          )}
        </div>

        {fiyat && (
          <p className="font-semibold text-xl mb-6">
            ₺{renderSafeField(fiyat)}
          </p>
        )}

        {/* Görsel Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {imageUrls.map((media: any, index: number) => (
            <div
              key={index}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              {media.mime?.startsWith("video") ? (
                <video
                  className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300 bg-black"
                  controls
                >
                  <source src={media.src} type={media.src.endsWith('.mov') ? "video/quicktime" : "video/mp4"} />
                  Tarayıcınız bu videoyu desteklemiyor.
                </video>
              ) : (
                <img
                  src={media.src.startsWith("/") ? media.src : `/${media.src}`}
                  alt={`${baslik || "Mekan"} - Görsel ${index + 1}`}
                  className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          ))}
        </div>

        {/* İletişime Geç Butonu */}
        <div className="mt-8 text-center">
          <Link
            href="/contactus"
            className="inline-block bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>

          {imageUrls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-full">
            {imageUrls[currentImageIndex].mime?.startsWith("video") ? (
              <video
                className="max-w-full max-h-full object-contain bg-black"
                controls
              >
                <source src={imageUrls[currentImageIndex].src} type={imageUrls[currentImageIndex].src.endsWith('.mov') ? "video/quicktime" : "video/mp4"} />
                Tarayıcınız bu videoyu desteklemiyor.
              </video>
            ) : (
              <img
                src={imageUrls[currentImageIndex].src.startsWith("/") ? imageUrls[currentImageIndex].src : `/${imageUrls[currentImageIndex].src}`}
                alt={`${baslik || "Mekan"} - Görsel ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {imageUrls.length}
          </div>

          {imageUrls.length > 1 && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
              {imageUrls.map((media: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                    index === currentImageIndex
                      ? "border-white"
                      : "border-transparent opacity-70"
                  }`}
                >
                  {media.mime?.startsWith("video") ? (
                    <video className="w-full h-full object-cover bg-black" muted>
                      <source src={media.src} type={media.src.endsWith('.mov') ? "video/quicktime" : "video/mp4"} />
                      Tarayıcınız bu videoyu desteklemiyor.
                    </video>
                  ) : (
                    <img
                      src={media.src.startsWith("/") ? media.src : `/${media.src}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
