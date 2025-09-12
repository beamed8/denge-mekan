import Link from "next/link";
import { Icon } from "@iconify/react"
import { FooterLinks } from "@/app/api/footerlinks";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col items-center justify-center pb-14 border-b border-white/10 gap-6">
          <div className="flex items-center gap-6 justify-center">
            <Link href="#">
              <Icon icon="ph:x-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#">
              <Icon icon="ph:facebook-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
            <Link href="#">
              <Icon icon="ph:instagram-logo-bold" width={24} height={24} className="text-white hover:text-primary duration-300" />
            </Link>
          </div>
        </div>
        <div className="py-16 border-b border-white/10">
          <div className="flex justify-center">
            {/* Kategoriler görseldeki gibi sabit liste - Ortalanmış */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 max-w-6xl">
              <div className="flex flex-col gap-3">
                {['Malikaneler','Yalılar','Villalar','Fabrika','Rezidanslar','Konutlar','Yat'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors text-lg">
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {['Apartmanlar','Köşkler','Ofisler','Restoranlar','Kafeler','Avm','İnşaat'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors text-lg">
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {['Çiftlikler','Oteller','Taş Evleri','Mağazalar','Saraylar','Hanlar','Atölye'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors text-lg">
                    {cat}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {['Dağ Evi','Okullar','Hangarlar','Plajlar','Stadyumlar','Kulüpler','Spa'].map((cat) => (
                  <Link key={cat} href={`/properties?kategori=${encodeURIComponent(cat)}`} className="text-white hover:text-primary transition-colors text-lg">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-6">
          <p className="text-white/40 text-sm text-center w-full">
            ©{new Date().getFullYear()} Denge Mekan Menajerlik - Her Hakkı Saklıdır
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;