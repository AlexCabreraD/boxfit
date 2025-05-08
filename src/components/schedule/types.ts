export interface ScheduleItem {
  time: string;
  className: string;
  level: string;
  notes: string;
}

export interface ClassSchedule {
  [key: string]: ScheduleItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
