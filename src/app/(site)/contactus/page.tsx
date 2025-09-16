import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "İletişim | Denge Mekan Menajerlik",
};

export default function ContactUs() {
  return (
    <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28">
      <div className="mb-16">
        <div className="flex gap-2.5 items-center justify-center mb-3">
          <span>
            <Icon
              icon={"ph:house-simple-fill"}
              width={20}
              height={20}
              className="text-primary"
            />
          </span>
          <p className="text-base font-semibold text-badge dark:text-white/90">
            İletişim
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14">
            Mekan mı arıyorsunuz? Size yardımcı olalım!
          </h3>
          <p className="text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6">
            Etkinliğiniz, prodüksiyonunuz veya çekiminiz için özel mekanlar mı
            arıyorsunuz? <b>Denge Mekan Menajerlik</b> ekibi olarak size en
            uygun mekanı bulmak için buradayız.
          </p>
        </div>
      </div>
      {/* Sadece iletişim bilgileri ve görsel */}
      <div className="border border-black/10 dark:border-white/10 rounded-2xl p-0 shadow-xl dark:shadow-white/10 min-h-[480px] relative overflow-hidden flex items-center justify-center">
        {/* Arka plan görseli tüm kutunun arkasında */}
        <Image
          src={"/images/contactUs/contactUs.jpg"}
          alt="wall"
          fill
          className="absolute inset-0 w-full h-full object-cover brightness-50 rounded-2xl z-0"
          unoptimized={true}
        />
        {/* İletişim bilgileri içerik */}
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-12 px-4 md:px-12">
          <h5 className="text-2xl md:text-3xl font-medium tracking-tight text-white text-center">
            İletişim Bilgileri
          </h5>
          <p className="text-base md:text-lg font-normal text-white/80 text-center max-w-xl">
            WhatsApp üzerinden bize hemen ulaşabilirsiniz. Size en kısa sürede
            dönüş yapıyoruz!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 w-full">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Icon
                  icon={"ph:phone-fill"}
                  width={28}
                  height={28}
                  className="text-white"
                />
                <span className="text-base font-semibold text-white tracking-wide">
                  <a
                    href="tel:+905337131076"
                    className="hover:text-primary transition-colors"
                  >
                    +90 533 713 10 76
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Icon
                  icon={"ph:envelope-simple-fill"}
                  width={28}
                  height={28}
                  className="text-white"
                />
                <span className="text-base font-semibold text-white tracking-wide">
                  <a
                    href="mailto:dengemekanmenajerlik@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    dengemekanmenajerlik@gmail.com
                  </a>
                </span>
              </div>
              {/* <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <Icon
                  icon={"ph:map-pin-fill"}
                  width={28}
                  height={28}
                  className="text-white"
                />
                <span className="text-base font-semibold text-white tracking-wide">
                  Maslak Mah. Büyükdere Cad. No:100, Sarıyer / İSTANBUL
                </span>
              </div> */}
            </div>
          </div>
          <div className="mt-4">
            <a
              href="https://wa.me/905337131076"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-base font-semibold shadow-lg hover:bg-[#128C7E] transition-colors duration-200"
            >
              <Icon icon="ph:whatsapp-logo" width={24} height={24} />
              WhatsApp ile Hemen Ulaşın
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
