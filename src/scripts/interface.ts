export interface About {
  id: string;
  fullName: string;
  presentation: string;
  experience: number;
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
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  published: string;
  tags: string[];
  github: string;
  link: string;
}
