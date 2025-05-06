import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import OurTrainers from "@/components/about/OurTrainers";
import FacilityGallery from "@/components/about/FacilityGallery";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "About BoxFit Utah | Clearfield Boxing Gym",
  description:
    "Learn about BoxFit Utah's story, our experienced coaches with 20+ years in boxing, our values, and our inclusive facility in Clearfield. Latino-owned since 2020.",
  keywords: [
    "BoxFit Utah",
    "boxing gym Clearfield",
    "boxing coaches Utah",
    "Latino-owned gym",
    "boxing facility Clearfield",
    "professional boxing training Utah",
  ],
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurValues />
      <OurTrainers />
      <FacilityGallery />
      <CallToAction />
    </>
  );
}
