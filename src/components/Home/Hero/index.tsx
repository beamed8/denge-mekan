"use client";

import { getKategoriler } from "@/lib/api";
import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar";

const Hero: React.FC = () => {
  return (
    <section className="!py-0 relative overflow-hidden min-h-screen flex items-center">
      {/* Video arka plan */}
      <video
        className="hero-video dark-reader-protected absolute top-0 left-0 w-full h-full object-cover -z-20"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Video background showing luxurious real estate"
        style={{
          filter: "none",
          opacity: 1,
          visibility: "visible" as const,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -20,
          background: "transparent",
          mixBlendMode: "normal",
          boxShadow: "none",
          border: "none",
        }}
        data-darkreader-ignore
        data-darkreader-inline-fill
        data-darkreader-inline-bgcolor
        data-darkreader-inline-bgimage
      >
        <source
          src="https://videos.pexels.com/video-files/9810700/9810700-uhd_2732_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Siyah transparan katman */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />

      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="container max-w-4xl mx-auto px-5 flex flex-col items-center justify-center h-full relative z-10">
          <h1 className="text-white dark:text-white text-4xl sm:text-5xl lg:text-6xl font-bold text-center drop-shadow-2xl mb-12 max-w-5xl leading-tight tracking-tight">
            Aradığın mekanı bul
          </h1>

          <SearchBar className="mb-8" />

          {/* Tüm mekanları gör butonu */}
          <div className="mt-4">
            <Link
              href="/properties"
              className="inline-block py-3 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 shadow-xl"
            >
              Tüm mekanları gör
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
