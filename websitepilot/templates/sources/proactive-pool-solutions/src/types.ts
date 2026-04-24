import { ReactNode, ElementType } from "react";

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  number: string;
  title: ReactNode;
  description: string;
  image?: string;
  icon?: ElementType;
}