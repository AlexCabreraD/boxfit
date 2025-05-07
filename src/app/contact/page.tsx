import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "Contact Us | BoxFit Utah - Boxing & Fitness Training in Clearfield",
  description:
    "Get in touch with BoxFit Utah. We're here to answer your questions about our boxing classes, personal training, and membership options. Visit our gym in Clearfield or call (385) 626-3514.",
  keywords: [
    "boxing gym contact",
    "BoxFit Utah location",
    "boxing classes Clearfield",
    "contact boxing trainer",
    "boxing gym address",
    "boxing fitness contact",
  ],
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
      <LocationMap />
      <CallToAction />
    </>
  );
}
