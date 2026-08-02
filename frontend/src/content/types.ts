export type Project = {
  slug: string;
  name: string;
  pitch: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  caseStudy: {
    problem: string;
    approach: string;
    decisions: string;
    outcome: string;
  };
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
};

export type Achievement = {
  name: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  start: string;
  end: string;
  summary: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  href: string;
};
