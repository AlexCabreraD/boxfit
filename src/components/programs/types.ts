import { ReactElement } from "react";

export interface ProgramType {
  id: string;
  title: string;
  icon: ReactElement<{ size: number; className: string }>;
  description: string;
  details: string[];
  suitable: string;
  schedule: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
