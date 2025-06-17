import Hero from "@/components/home/Hero";
import Programs from "@/components/home/Programs";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import TrainerSpotlight from "@/components/home/TrainerSpotlight";
import CallToAction from "@/components/shared/CallToAction";
import type { Metadata } from "next";

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

export default function Home() {
  return (
    <>
      <Hero />
      <Programs />
      <AboutPreview />
      <Testimonials />
      <TrainerSpotlight />
      <CallToAction />
    </>
  );
}
