export type Project = {
  slug: string;
  name: string;
  pitch: string;
  category: 'client' | 'personal';
  status: 'active' | 'completed';
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Screenshot, shown filling the card top. */
  image?: string;
  /** Client mark, shown contained on a light band — for work with no shareable UI. */
  logo?: string;
  caseStudy: {
    problem: string;
    approach: string;
    decisions: string;
    /** Optional: a specific obstacle worth calling out on its own. */
    challenge?: string;
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

export type EducationEntry = {
  qualification: string;
  institution: string;
  start: string;
  end: string;
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

export type Headline = {
  prefix: string;
  words: string[];
  suffix: string;
};
