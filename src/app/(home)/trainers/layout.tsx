import type { Metadata } from "next";

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

export default function TrainersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
