import React, { FC } from "react";
import Link from "next/link";

interface BreadcrumbProps {
  links: { href: string; text: string }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ links }) => {
  // Son lokasyon (bulunduğun sayfa) hariç, tüm adımlar tıklanabilir olarak gösterilecek
  return (
    <div className="flex items-baseline flex-wrap justify-center mx-0">
      {links.slice(0, -1).map((link, index) => (
        <React.Fragment key={index}>
          <Link
            href={link.href}
            className="no-underline flex items-center dark:text-gray-500 dark:text-opacity-70 font-normal text-sm hover:underline after:relative after:content-[''] after:ml-2.5 after:mr-3 after:my-0 after:inline-block after:w-2 after:h-2 after:border-r-2 after:border-b-2 after:border-midnight_text dark:after:border-white after:-rotate-45"
          >
            {link.text}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
