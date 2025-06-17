import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Options | BoxFit Utah - Boxing Training in Clearfield",
  description:
    "Choose your boxing membership at BoxFit Utah. 2-day access for $75/month or 4-day access for $100/month. Flexible access-based memberships in Clearfield, Utah.",
  keywords: [
    "boxing membership",
    "boxing gym pricing",
    "Clearfield boxing membership",
    "boxing training cost",
    "boxing gym rates",
    "Utah boxing membership",
    "BoxFit Utah pricing",
    "boxing access membership",
  ],
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
