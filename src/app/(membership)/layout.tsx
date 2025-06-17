// src/app/membership/layout.tsx
import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import "../globals.css";

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
  title: "Membership Options | BoxFit Utah - Boxing Training in Clearfield",
  description:
    "Choose your boxing membership at BoxFit Utah. 2-day access for $75/month or 4-day access for $100/month. Flexible access-based memberships in Clearfield, Utah.",
  keywords: [
    "boxing membership",
    "boxing gym pricing",
    "Clearfield boxing membership",
    "boxing training cost",
    "boxing gym rates",
    "Utah boxing membership",
    "BoxFit Utah pricing",
    "boxing access membership",
  ],
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${bebasNeue.variable} overflow-x-hidden`}
    >
      <body className="font-primary bg-clean-white text-body-text">
        {children}
      </body>
    </html>
  );
}
