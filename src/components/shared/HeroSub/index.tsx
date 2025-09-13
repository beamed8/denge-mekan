import React, { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface HeroSubProps {
  title: string;
  description: string;
  badge: string;
  compactPadding?: boolean;
}

const HeroSub: FC<HeroSubProps> = ({
  title,
  description,
  badge,
  compactPadding,
}) => {
  const sectionClass =
    "text-center bg-cover !pt-40 !pb-5 relative overflow-x-hidden";

  return (
    <>
      <section className={sectionClass}>
        <div className="flex gap-2.5 items-center justify-center">
          <span>
            <Icon
              icon={"ph:house-simple-fill"}
              width={20}
              height={20}
              className="text-primary"
            />
          </span>
          <p className="text-base font-semibold text-dark/75 dark:text-white/75">
            {badge}
          </p>
        </div>
        <h2 className="text-dark text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl relative font-bold dark:text-white break-words leading-tight px-2">
          {title}
        </h2>
        <p className="text-lg text-dark/50 dark:text-white/50 font-normal w-full mx-auto mb-2">
          {description}
        </p>
      </section>
    </>
  );
};

export default HeroSub;
