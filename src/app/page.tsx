import FeaturedProperty from "@/components/Home/FeaturedProperty";
import Hero from "@/components/Home/Hero";
import Properties from "@/components/Home/Properties";
import Services from "@/components/Home/Services";
import LatestAdditions from "@/components/Home/LatestAdditions";
import FAQ from "@/components/Home/FAQs";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <LatestAdditions />
      <Properties />
      <FAQ />
      {/* İletişime Geç kutusu - Denge Mekan Menajerlik */}
      <section className="bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white py-20 relative overflow-hidden">
        {/* Arka plan deseni */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="container max-w-10xl mx-auto px-5 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            {/* Başlık */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                İletişime Geç
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Etkinliğiniz, prodüksiyonunuz veya çekiminiz için özel mekanlar
                mı arıyorsunuz?
                <br />
                <span className="font-semibold text-primary">
                  Denge Mekan Menajerlik
                </span>{" "}
                ile hemen iletişime geçin!
              </p>
            </div>

            {/* İletişim Bilgileri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <a
                href="tel:+905337131076"
                className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Telefon</h3>
                <div className="text-gray-300 hover:text-primary transition-colors text-center">
                  +90 533 713 10 76
                </div>
              </a>

              <a
                href="mailto:dengemekanmenajerlik@gmail.com"
                className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="font-semibold text-white mb-2">E-posta</h3>
                <div className="text-gray-300 hover:text-primary transition-colors text-center">
                  dengemekanmenajerlik@gmail.com
                </div>
              </a>

              {/* <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Adres</h3>
                <span className="text-gray-300 text-center text-sm leading-relaxed">
                  Maslak Mah. Büyükdere Cad. No:100
                  <br />
                  Sarıyer / İSTANBUL
                </span>
              </div> */}

              <a
                href="https://wa.me/905337131076?text=Merhaba, daha fazla mekan hakkında bilgi almak istiyorum."
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl border border-red/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-white mb-2"></h3>
                <span className="text-gray-300 text-center text-md leading-relaxed">
                  Daha fazla mekan önerisi için bizimle iletişime geçin.
                </span>
              </a>

              <a
                href="https://wa.me/905337131076?text=Merhaba, mekan kiralama hakkında bilgi almak istiyorum."
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl border border-red/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-white mb-2"></h3>
                <span className="text-gray-300 text-center text-md leading-relaxed">
                  Mekanımı kiralamak istiyorum.
                </span>
              </a>
            </div>

            {/* CTA Buton */}
            <div className="text-center">
              <WhatsAppButton
                variant="cta"
                phoneNumber="+905337131076"
                message="Merhaba, size ulaşmak istiyorum."
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
