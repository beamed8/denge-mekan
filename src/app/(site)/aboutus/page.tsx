import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hakkımızda | Denge Mekan Menajerlik",
};

export default function AboutUs() {
  return (
    <div className="container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28">
      <div className="mb-16">
        <div className="flex gap-2.5 items-center justify-center mb-3">
          <span>
            <Icon
              icon={"ph-info-fill"}
              width={20}
              height={20}
              className="text-primary"
            />
          </span>
          <p className="text-base font-semibold text-badge dark:text-white/90">
            Hakkımızda
          </p>
        </div>
        <section className="max-w-4xl mx-auto text-center px-6 py-12">
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Yaklaşık 20 yıldır gayrimenkul sektöründe faaliyet gösteriyoruz.
          </h3>

          <div className="space-y-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              Bu süre boyunca kazandığımız{" "}
              <span className="font-medium">tecrübe</span>,
              <span className="font-medium"> güven</span> ve geniş
              portföyümüzle, sadece alım–satım ve kiralamada değil, aynı zamanda
              sektörün yaratıcı alanlarında da hizmet vermeye başladık.
            </p>

            <p>
              Ekip olarak, emlak bilgisini ve çevresini, oyunculuk geçmişimizden
              gelen sektörel deneyimle birleştirerek dizi, film, reklam ve diğer
              prodüksiyon projeleri için mekan menajerliği hizmeti sunuyoruz.
            </p>

            <p>
              Senaristlerin ve yönetmenlerin hayallerindeki sahneleri gerçeğe
              dönüştürebilmeleri için doğru mekanları buluyor, yapım ekiplerine
              <span className="italic"> pratik çözümler</span> sağlıyoruz.
            </p>

            <p>
              Bizim için bu iş yalnızca mekan kiralamak değil; hikâyelere hayat
              katacak doğru atmosferi bulmak.
            </p>

            <p>
              Gayrimenkuldeki gücümüzü, sanatın ve üretimin dinamizmiyle bir
              araya getirerek, hem sektöre hem de projelere değer katmayı
              hedefliyoruz.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
