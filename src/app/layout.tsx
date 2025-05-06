import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BoxFit Utah | Boxing & Fitness Training in Clearfield",
  description:
    "BoxFit Utah offers boxing training for all skill levels in Clearfield, Utah. Professional coaching for beginners to experienced boxers. Join our inclusive community today!",
  keywords: [
    "boxing gym",
    "boxing training",
    "Clearfield",
    "Utah",
    "fitness",
    "boxing lessons",
    "boxing classes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${bebasNeue.variable} overflow-x-hidden`}
    >
      <body className="font-primary bg-clean-white text-body-text flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
