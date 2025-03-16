import type { Timestamp } from "firebase-admin/firestore";

export interface About {
  fullName: string;
  presentation: string;
  experience: Timestamp;
  cv: string;
  social: {
    discord: string;
    linkedin: string;
    github: string;
    dockerhub: string;
  },
  stacks: string[];
  thisApp: {
    repository: string;
  }
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  published: Timestamp;
  tags: string[];
  github: string;
  link: string;
}
