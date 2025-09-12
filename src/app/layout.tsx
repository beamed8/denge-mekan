import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import SessionProviderComp from "@/components/nextauth/SessionProvider";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Denge Mekan Menajerlik",
  description:
    "Etkinliğiniz için en uygun mekanları bulun. Malikanelerden kafelere, otellerden köşklere kadar geniş mekan portföyümüzle size hizmet veriyoruz.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-white dark:bg-black antialiased`}>
        <NextTopLoader color="#07be8a" />
        <SessionProviderComp session={session}>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
          >
            <Header />
            {children}
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  );
}
