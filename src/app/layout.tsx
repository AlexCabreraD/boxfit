import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
    variable: "--font-barlow",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap",
});

const bebasNeue = Bebas_Neue({
    variable: "--font-bebas-neue",
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

export const metadata: Metadata = {
    title: "BoxFit Utah | Boxing & Fitness Training in Clearfield",
    description: "BoxFit Utah offers boxing training for all skill levels in Clearfield, Utah. Professional coaching for beginners to experienced boxers. Join our inclusive community today!",
    keywords: ["boxing gym", "boxing training", "Clearfield", "Utah", "fitness", "boxing lessons", "boxing classes"],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${barlow.variable} ${bebasNeue.variable} font-primary bg-clean-white text-body-text`}
        >
        <div className="flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
        </div>
        </body>
        </html>
    );
}