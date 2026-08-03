export type Project = {
  slug: string;
  name: string;
  pitch: string;
  category: 'client' | 'personal';
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
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
  date?: string;
  verifyUrl?: string;
  image?: string;
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

export type SkillLevel = 'Familiar' | 'Comfortable' | 'Proficient' | 'Expert';

export type Skill = {
  name: string;
  usage: string;
  level: SkillLevel;
};

export type SkillGroup = {
  title: string;
  items: Skill[];
};

export type ContactLink = {
  label: string;
  href: string;
};
