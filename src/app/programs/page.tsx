import type { Metadata } from "next";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsAtGlance from "@/components/programs/ProgramsAtGlance";
import ProgramsList from "@/components/programs/ProgramsList";
import ProgramFAQ from "@/components/programs/ProgramFAQ";
import ProgramsCallToAction from "@/components/programs/ProgramsCallToAction";

export const metadata: Metadata = {
  title: "Boxing Programs | BoxFit Utah | Clearfield",
  description:
    "Discover our comprehensive boxing programs for all skill levels in Clearfield, Utah - Beginner, Kids, Adult, Advanced, and Elite boxing classes. Join BoxFit Utah today!",
  keywords: [
    "boxing programs",
    "boxing classes",
    "beginner boxing",
    "kids boxing",
    "adult boxing",
    "advanced boxing",
    "elite boxing",
    "competition boxing",
    "Clearfield boxing",
    "Utah boxing gym",
  ],
};

export default function ProgramsPage() {
  return (
    <>
      <ProgramsHero />
      <ProgramsAtGlance />
      <ProgramsList />
      <ProgramFAQ />
      <ProgramsCallToAction />
    </>
  );
}
