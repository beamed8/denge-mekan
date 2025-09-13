import React from "react";

interface LogoProps {
  sticky?: boolean;
}

const Logo: React.FC<LogoProps> = ({ sticky }) => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Kamera iconu, gri ve hover'da kırmızı glow */}
      <span className="logo-cam-anim-righteous relative">
        <svg
          width={38}
          height={38}
          viewBox="0 0 256 256"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200"
        >
          <rect width="256" height="256" fill="none" />
          <path
            d="M224,64H200l-14.7-22A16,16,0,0,0,171.3,32H84.7A16,16,0,0,0,70.7,42L56,64H32A16,16,0,0,0,16,80V208a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V80A16,16,0,0,0,224,64ZM128,184a56,56,0,1,1,56-56A56,56,0,0,1,128,184Z"
            fill="#444"
          />
          <circle cx="128" cy="128" r="40" fill="#fff" />
        </svg>
        {/* Glow efekti hover'da kırmızı */}
        <span className="absolute left-0 top-0 w-full h-full pointer-events-none logo-cam-glow-righteous"></span>
      </span>
      {/* Denge yazısı Righteous fontuyla */}
      <span
        className="font-logo-righteous text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-300 text-black dark:text-white"
        style={{ display: "inline-block" }}
      >
        Denge
      </span>
    </div>
  );
};

export default Logo;
