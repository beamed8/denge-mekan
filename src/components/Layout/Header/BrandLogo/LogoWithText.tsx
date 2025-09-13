import { dancingScript } from "@/app/fonts";
import Logo from "./Logo";
import { Dancing_Script } from "next/font/google";
interface LogoWithTextProps {
  sticky?: boolean;
  isHomepage?: boolean;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ sticky, isHomepage }) => {
  return (
    <div className="flex items-center gap-2 group mb-1">
      {/* Kamera iconu, kırmızı ve hover'da kırmızı glow */}
      <span className="inline-block logo-cam-anim-righteous relative align-baseline">
        <svg
          width={40}
          height={40}
          viewBox="0 0 256 256"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:scale-105"
        >
          <rect width="256" height="256" fill="none" />
          <path
            d="M224,64H200l-14.7-22A16,16,0,0,0,171.3,32H84.7A16,16,0,0,0,70.7,42L56,64H32A16,16,0,0,0,16,80V208a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V80A16,16,0,0,0,224,64ZM128,184a56,56,0,1,1,56-56A56,56,0,0,1,128,184Z"
            fill="#e60e16"
          />
          <circle cx="128" cy="128" r="40" fill="#fff" />
        </svg>
        {/* Glow efekti hover'da kırmızı */}
        <span className="absolute left-0 top-0 w-full h-full pointer-events-none group-hover:logo-cam-glow-righteous"></span>
      </span>
      {/* Denge yazısı Righteous fontuyla, font weight düşürüldü */}
      <span
        className={`font-logo-righteous text-3xl sm:text-4xl font-normal tracking-tight transition-colors duration-300 group-hover:scale-105 group-hover:animate-flashCam ${isHomepage ? (sticky ? "text-black dark:text-white" : "text-white") : "text-black dark:text-white"}`}
        style={{ display: "inline-block" }}
      >
        Denge
      </span>
      {/* Slogan eski haliyle */}
      <span
        className={`${dancingScript.className} transition-all duration-300 ml-3 text-base mt-1 ${isHomepage ? (sticky ? "text-gray-900 dark:text-white" : "text-gray-200") : "text-gray-900 dark:text-white"}`}
      >
        Doğru Mekan, Doğru Kare
      </span>
    </div>
  );
};

export default LogoWithText;
