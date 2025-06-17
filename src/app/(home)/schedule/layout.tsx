import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boxing Class Schedule | BoxFit Utah",
  description:
    "View BoxFit Utah's weekly class schedule for boxing training in Clearfield. Classes for kids, beginners, adults, and advanced boxers. Morning and evening sessions available.",
  keywords: [
    "boxing class schedule",
    "boxing training times",
    "Clearfield boxing classes",
    "kids boxing schedule",
    "beginner boxing classes",
    "advanced boxing training",
    "morning boxing classes",
    "boxing gym Clearfield",
    "boxing lessons Utah",
    "boxing class booking",
  ],
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
