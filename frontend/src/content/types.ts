export type Project = {
  slug: string;
  name: string;
  pitch: string;
  category: 'client' | 'personal';
  status: 'active' | 'completed';
  stack: string[];
  /** Shown on the home page; everything else lives on the all-projects page. */
  featured?: boolean;
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
  /** Optional: what the qualification maps to, e.g. the NFQ level. */
  body?: string;
  institution: string;
  start: string;
  end: string;
};

export type Skill = {
  name: string;
  /** Kept as source material — no longer rendered since the skills cards stopped
      opening a panel. Self-rated levels were dropped entirely. */
  usage: string;
};

export type SkillGroup = {
  title: string;
  items: Skill[];
};

export type ContactLink = {
  label: string;
  href: string;
};

