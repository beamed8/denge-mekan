import { dancingScript } from "@/app/fonts";
import Logo from "./Logo";
import { Dancing_Script } from "next/font/google";
interface LogoWithTextProps {
  sticky?: boolean;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ sticky }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo hover efektli */}
      <div className="transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
        <Logo sticky={sticky} />
      </div>

      {/* El yazısı yazı */}
      <span
        className={`${dancingScript.className} transition-all duration-300 ${
          sticky
            ? "text-gray-900 dark:text-white"
            : "text-gray-400 dark:text-white"
        }`}
      >
        <span className="block sm:inline">Doğru Mekan, </span>
        {/* <span className="block sm:inline">, </span> */}
        <span className="block sm:inline">Doğru Kare</span>
      </span>
    </div>
  );
};

export default LogoWithText;
