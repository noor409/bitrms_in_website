import type { Image } from "sanity";

export type IconKey =
  | "leaf"
  | "shield"
  | "cpu"
  | "radio-tower"
  | "globe"
  | "users"
  | "award"
  | "target"
  | "trending-up"
  | "clock";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconKey;
  summary: string;
  heroKicker: string;
  features: string[];
  benefits: string[];
  body: string[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  serviceSlug: string;
  summary: string;
  outcomes: string[];
  year: string;
  coverImage?: Image;
}

export interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  body: string[];
}
