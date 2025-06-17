import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
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

function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "BoxFit Utah",
    description:
      "Professional boxing training for all skill levels in Clearfield, Utah. Latino-owned gym established in 2020.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://boxfit-utah.com",
    telephone: "+1-385-626-3514",
    email: "Boxfitutah@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1740 S 300th W",
      addressLocality: "Clearfield",
      addressRegion: "UT",
      postalCode: "84015",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.0882",
      longitude: "-112.0323",
    },
    openingHours: ["Mo-Fr 06:00-21:00", "Sa 08:00-17:00"],
    priceRange: "$75-$100+",
    foundingDate: "2020",
    image: [],
    sameAs: [
      "https://facebook.com/boxfitutah",
      "https://instagram.com/boxfitutah",
    ],
    sport: "Boxing",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Boxing Ring",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Heavy Bags",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Speed Bags",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Personal Training",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Group Classes",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Youth Programs",
        value: true,
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Free Trial Class",
        description: "Experience BoxFit Utah with a free trial class",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "2-Day Access Membership",
        description: "2 days per week access with basic equipment and coaching",
        price: "75",
        priceCurrency: "USD",
        eligibleDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: "4-Day Access Membership",
        description:
          "4 days per week access with enhanced training opportunities",
        price: "100",
        priceCurrency: "USD",
        eligibleDuration: "P1M",
      },
      {
        "@type": "Offer",
        name: "Advanced Access",
        description:
          "Additional access based on skill level and competition preparation needs",
        price: "Contact for pricing",
        priceCurrency: "USD",
        eligibleDuration: "P1M",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

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
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="font-primary bg-clean-white text-body-text flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
