import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <section id="faqs">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-10 ">
          <div className="lg:mx-0 mx-auto">
            <Image
              src="/images/faqs/faq-image.png"
              alt="image"
              width={680}
              height={644}
              className="lg:w-full"
              unoptimized={true}
            />
          </div>
          <div className="lg:px-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
              <Icon
                icon="ph:question-fill"
                className="text-2xl text-primary "
              />
              Sıkça Sorulan Sorular
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl leading-tight font-bold text-dark dark:text-white">
              Mekan Kiralama Hakkında Merak Ettikleriniz
            </h2>
            <p className="text-dark/50 dark:text-white/50 pr-20">
              Organizasyonunuz için en uygun mekanı bulma sürecinde aklınıza
              takılan soruların cevaplarını burada bulabilirsiniz.
            </p>
            <div className="my-8">
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="w-full flex flex-col gap-6"
              >
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    1. Mekanları kiralamak için ne yapmam gerekiyor?
                  </AccordionTrigger>
                  <AccordionContent>
                    İletişim sayfasından bizimle iletişime geçebilir ve
                    rezervasyon talebinizi iletebilirsiniz.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    2. Fiyatlar ve müsaitlik durumu nasıl öğrenilir?
                  </AccordionTrigger>
                  <AccordionContent>
                    Mekan sayfalarının içinde bulunan iletişime geçin butonu ile
                    bize mail, WhatsApp ve telefon yollarıyla ulaşarak bilgileri
                    alabilirsiniz.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    3. Hangi tür etkinlikler için mekan bulabilirim?
                  </AccordionTrigger>
                  <AccordionContent>
                    Düğün, toplantı, doğum günü, atölye, lansman, parti ve daha
                    birçok organizasyon için uygun mekanlar bulabilirsiniz.
                    Mekan önerileri için menüde bulunan "Mekan Önerisi"
                    kısmından önerilerinizi yapabilirsiniz.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
