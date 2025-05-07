import type { Metadata } from "next";
import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramsList from "@/components/programs/ProgramsList";
import ProgramsCallToAction from "@/components/programs/ProgramsCallToAction";
import ProgramFAQ from "@/components/programs/ProgramFAQ";

export const metadata: Metadata = {
  title: "Boxing Programs | BoxFit Utah | Clearfield",
  description:
    "Discover our boxing programs for all skill levels in Clearfield, Utah. From beginners to professionals, children to adults. Join BoxFit Utah today!",
  keywords: [
    "boxing programs",
    "boxing classes",
    "Clearfield boxing",
    "Utah boxing gym",
    "kids boxing",
    "boxing fitness",
    "competitive boxing",
  ],
};

export default function ProgramsPage() {
  return (
    <>
      <ProgramsHero />
      <ProgramsList />
      <ProgramFAQ />
      <ProgramsCallToAction />
    </>
  );
}
