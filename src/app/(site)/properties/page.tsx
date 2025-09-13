// ...existing code...
import VideoTest from "./VideoTest";

// VideoTest export temporarily removed to avoid multiple default exports
import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React, { Suspense } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mekanlar | Denge Mekan Menajerlik",
};

const page = () => {
  return (
    <>
      <HeroSub
        title="Tüm Mekanlarımız"
        description="Reklamdan diziye, filmden kliplere... Projeniz için ihtiyacınız olan mekanı kolayca keşfedin."
        badge="Mekanlar"
        compactPadding={true}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            Loading...
          </div>
        }
      >
        <PropertiesListing />
      </Suspense>
    </>
  );
};

export default page;
