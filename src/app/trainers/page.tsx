import type { Metadata } from "next";
import TrainerHero from "@/components/trainers/TrainerHero";
import TrainerProfile from "@/components/trainers/TrainerProfile";
import TrainerGallery from "@/components/trainers/TrainerGallery";
import JoinOurTeam from "@/components/trainers/JoinOurTeam";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "Our Professional Boxing Trainers | BoxFit Utah",
  description:
    "Meet our expert boxing trainers at BoxFit Utah in Clearfield. Led by Coach Pablo with 20+ years of experience training amateur and professional boxers.",
  keywords: [
    "boxing trainers",
    "boxing coaches",
    "professional boxing coach",
    "boxing training",
    "Clearfield",
    "Utah",
    "BoxFit Utah trainers",
  ],
};

export default function TrainersPage() {
  return (
    <>
      <TrainerHero />
      <TrainerProfile />
      <TrainerGallery />
      <JoinOurTeam />
      <CallToAction />
    </>
  );
}
