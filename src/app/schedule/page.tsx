import type { Metadata } from "next";
import ScheduleHero from "@/components/schedule/ScheduleHero";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import ScheduleInfo from "@/components/schedule/ScheduleInfo";
import ScheduleBooking from "@/components/schedule/ScheduleBooking";
import SchedulePricing from "@/components/schedule/SchedulePricing";
import ScheduleFAQ from "@/components/schedule/ScheduleFAQ";
import CallToAction from "@/components/shared/CallToAction";

export const metadata: Metadata = {
  title: "Class Schedule | BoxFit Utah - Boxing Training in Clearfield",
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
    "boxing membership prices",
    "boxing training cost",
  ],
};

export default function SchedulePage() {
  return (
    <>
      <ScheduleHero />
      <ScheduleInfo />
      <ScheduleTable />
      <ScheduleBooking />
      <SchedulePricing />
      <ScheduleFAQ />
      <CallToAction />
    </>
  );
}
