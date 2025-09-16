import { dancingScript } from "@/app/fonts";
import Image from "next/image";
interface LogoWithTextProps {
  sticky?: boolean;
  isHomepage?: boolean;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ sticky, isHomepage }) => {
  // Logo görseli seçimi
  let logoSrc = "/images/logo-black.png";
  if (isHomepage) {
    logoSrc = sticky ? "/images/logo-black.png" : "/images/logo-black.png";
  } else {
    logoSrc = sticky ? "/images/logo-black.png" : "/images/logo-black.png";
  }

  return (
    <div className="flex items-center gap-2 group mb-1">
      {/* Logo görseli */}
      <span className="inline-block relative align-baseline">
        <Image
          src={logoSrc}
          alt="Denge Logo"
          width={60}
          height={60}
          className="transition-transform duration-200 group-hover:scale-105"
          priority
        />
      </span>
      {/* Denge yazısı Righteous fontuyla, font weight düşürüldü */}
      <span
        className={`font-logo-righteous text-3xl sm:text-4xl font-normal tracking-tight transition-colors duration-300 group-hover:scale-105 group-hover:animate-flashCam ${
          isHomepage
            ? sticky
              ? "text-black dark:text-white"
              : "text-white"
            : "text-black dark:text-white"
        }`}
        style={{ display: "inline-block" }}
      >
        Denge
      </span>
      {/* Slogan eski haliyle */}
      <span
        className={`${
          dancingScript.className
        } transition-all duration-300 ml-3 text-base mt-1 ${
          isHomepage
            ? sticky
              ? "text-gray-900 dark:text-white"
              : "text-gray-200"
            : "text-gray-900 dark:text-white"
        }`}
      >
        Doğru Mekan, Doğru Kare
      </span>
    </div>
  );
};

export default LogoWithText;
