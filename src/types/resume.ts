export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  technologies: string;
  description: string;
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  template: string;
}

export interface ATSResult {
  score: number;
  missingKeywords: string[];
  suggestions: string[];
}

export interface ReviewResult {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  roast?: string;
}
