export interface Mentor {
  id: string;
  name: string;
  title: string;
  seniorityLabel: string;
  seniorityLevel: number; // 1=Aspiring, 2=PM, 3=Senior, 4=Lead/Staff, 5=Principal/Manager, 6=Director+
  industry: string;
  availability: string;
  topics: string[];
  bio: string;
  superpower: string;
  linkedin: string;
}

export interface SeekerInput {
  goal: string;
  topic: string;
  careerStage: string;
  industry?: string;   // optional — seeker's declared sector
}

export interface MatchResult {
  mentor: Mentor;
  score: number;
  reason: string;
  isPartialMatch: boolean;
}

export const TOPICS = [
  "Career transition",
  "Interview prep",
  "FAANG / big tech",
  "Salary negotiation",
  "Returning to work",
  "Promotion strategy",
  "Roadmap strategy",
  "Stakeholder management",
  "Leadership development",
  "Work-life balance",
  "Building in public",
  "Entrepreneurship / founding",
] as const;

export const CAREER_STAGES = [
  { label: "Aspiring/Junior PM (0–2 yrs)", level: 1 },
  { label: "PM (2–4 yrs)", level: 2 },
  { label: "Senior PM (4–7 yrs)", level: 3 },
  { label: "Lead/Staff PM (7–10 yrs)", level: 4 },
  { label: "Principal/Manager (10+ yrs)", level: 5 },
  { label: "Director and above", level: 6 },
] as const;

export const AVAILABILITY_OPTIONS = [
  "1–2/month",
  "Weekly",
  "As needed",
  "Async only",
] as const;

export const mentors: Mentor[] = [
  {
    id: "riya-kapoor",
    name: "Riya Kapoor",
    title: "Senior PM",
    seniorityLabel: "Senior PM · IC3",
    seniorityLevel: 3,
    industry: "Fintech",
    availability: "1–2/month",
    topics: ["Career transition", "Interview prep", "FAANG / big tech"],
    bio: "7 yrs in Fintech, moved from IC to manager at a Series B startup.",
    superpower: "Making career pivots less scary.",
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "maya-johnson",
    name: "Maya Johnson",
    title: "Group PM",
    seniorityLabel: "Group PM · IC4",
    seniorityLevel: 4,
    industry: "B2B SaaS",
    availability: "Weekly",
    topics: ["Leadership development", "Stakeholder management", "Roadmap strategy"],
    bio: "Led cross-functional product teams of 30+ across three business units. Passionate about growing the next generation of PM leaders.",
    superpower: "Turning messy stakeholder dynamics into clear roadmaps.",
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "sara-lin",
    name: "Sara Lin",
    title: "PM",
    seniorityLabel: "PM · IC2",
    seniorityLevel: 2,
    industry: "Health Tech",
    availability: "As needed",
    topics: ["Interview prep", "Career transition", "Work-life balance"],
    bio: "Broke into PM from a non-traditional background. Now building patient-facing products at a digital health startup.",
    superpower: "Helping underrepresented candidates break into PM.",
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    title: "Director",
    seniorityLabel: "Director · Dir+",
    seniorityLevel: 6,
    industry: "Consumer / E-commerce",
    availability: "Async only",
    topics: ["Salary negotiation", "Promotion strategy", "Leadership development"],
    bio: "15 years shipping consumer products at scale. Negotiated my way from IC to VP and helped dozens of women do the same.",
    superpower: "Getting women paid what they're worth.",
    linkedin: "https://linkedin.com/in/",
  },
  {
    id: "anika-patel",
    name: "Anika Patel",
    title: "Principal PM",
    seniorityLabel: "Principal PM · IC5",
    seniorityLevel: 5,
    industry: "Enterprise SaaS",
    availability: "1–2/month",
    topics: ["Building in public", "Roadmap strategy", "Entrepreneurship / founding"],
    bio: "Built and launched three enterprise products from 0→1. Currently advising early-stage founders on product-market fit.",
    superpower: "Translating vision into execution.",
    linkedin: "https://linkedin.com/in/",
  },
];

function getSeekerLevel(stage: string): number {
  const found = CAREER_STAGES.find((s) => s.label === stage);
  return found ? found.level : 2;
}

function scoreSeniorityGap(mentorLevel: number, seekerLevel: number): number {
  const gap = mentorLevel - seekerLevel;
  if (gap < 0) return -1; // exclude
  if (gap >= 1 && gap <= 2) return 30;
  if (gap >= 3) return 15;
  if (gap === 0) return 10;
  return 0;
}

function scoreSectorAlignment(mentorIndustry: string, goalText: string): number {
  const lower = goalText.toLowerCase();
  const industryLower = mentorIndustry.toLowerCase();
  const keywords = industryLower.split(/[\s\/]+/);
  for (const kw of keywords) {
    if (kw.length > 2 && lower.includes(kw)) return 25;
  }
  return 8;
}

function scoreGoalKeyword(goal: string, bio: string, superpower: string): number {
  if (!goal.trim()) return 12;
  const words = goal.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const combined = (bio + " " + superpower).toLowerCase();
  let hits = 0;
  for (const w of words) {
    if (combined.includes(w)) hits++;
  }
  if (hits >= 3) return 25;
  if (hits >= 1) return 18;
  return 5;
}

function scoreAvailability(availability: string): number {
  switch (availability) {
    case "Weekly": return 12;
    case "1–2/month": return 10;
    case "As needed": return 8;
    case "Async only": return 5;
    default: return 6;
  }
}

function scoreCompanyType(industry: string): number {
  if (industry.toLowerCase().includes("saas") || industry.toLowerCase().includes("enterprise")) return 8;
  if (industry.toLowerCase().includes("fintech") || industry.toLowerCase().includes("consumer")) return 6;
  return 4;
}

function buildReason(mentor: Mentor, topic: string, isTopicMatch: boolean): string {
  const topicPart = isTopicMatch ? `offers ${topic}` : `related experience in ${mentor.topics[0]}`;
  return `Matched because: ${mentor.seniorityLabel} in ${mentor.industry}, ${topicPart}, "${mentor.superpower}"`;
}

export function runMatching(input: SeekerInput): MatchResult[] {
  const seekerLevel = getSeekerLevel(input.careerStage);

  // Hard filter: topic match
  const topicMatches = mentors.filter((m) => m.topics.includes(input.topic));
  const usePartial = topicMatches.length < 2;

  const candidates = usePartial ? mentors : topicMatches;

  const scored: MatchResult[] = [];

  for (const mentor of candidates) {
    const seniorityScore = scoreSeniorityGap(mentor.seniorityLevel, seekerLevel);
    if (seniorityScore < 0) continue; // exclude below seeker

    const isTopicMatch = mentor.topics.includes(input.topic);
    const topicBonus = isTopicMatch ? 0 : -10;

    const score =
      seniorityScore +
      scoreSectorAlignment(mentor.industry, input.goal) +
      scoreGoalKeyword(input.goal, mentor.bio, mentor.superpower) +
      scoreAvailability(mentor.availability) +
      scoreCompanyType(mentor.industry) +
      topicBonus;

    scored.push({
      mentor,
      score,
      reason: buildReason(mentor, input.topic, isTopicMatch),
      isPartialMatch: usePartial && !isTopicMatch,
    });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}
