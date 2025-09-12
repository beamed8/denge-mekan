import Image from "next/image";

interface LogoProps {
  sticky?: boolean;
}

const Logo: React.FC<LogoProps> = ({ sticky }) => {
  const logoWidth = sticky ? 150 : 200;
  const logoHeight = sticky ? 68 : 90;
  return (
    <>
      <Image
        src={"/images/header/dark-logo.png"}
        alt="logo"
        width={logoWidth}
        height={logoHeight}
        unoptimized={true}
        className={`dark:hidden transition-all duration-300`}
      />
      <Image
        src={"/images/header/logo.png"}
        alt="logo"
        width={logoWidth}
        height={logoHeight}
        unoptimized={true}
        className={`dark:block hidden transition-all duration-300`}
      />
    </>
  );
};

export default Logo;
