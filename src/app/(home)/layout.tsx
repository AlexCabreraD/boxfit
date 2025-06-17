import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

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

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
    </>
  );
}
