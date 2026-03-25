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
  transitionNote: string; // one sentence shown in match reason
  createdAt: number; // unix timestamp — used for tie-breaking
  maxMentees?: string; // ← add this line
}

export interface SeekerInput {
  goal: string;
  topics: string[];
  careerStage: string;
  industry?: string; // optional — seeker's declared sector
  availability?: string; // optional — seeker's preferred cadence
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

export const AVAILABILITY_OPTIONS = ["1–2/month", "Weekly", "As needed", "Async only"] as const;

export const mentors: Mentor[] = [
  {
    id: "riya-kapoor",
    name: "Riya Kapoor",
    title: "Senior PM",
    seniorityLabel: "Senior PM · IC3",
    seniorityLevel: 3,
    industry: "Banking/Finance/FinTech",
    availability: "1–2/month",
    topics: ["Career transition", "Interview prep", "FAANG / big tech"],
    bio: "7 yrs in Fintech, moved from IC to manager at a Series B startup.",
    superpower: "Making career pivots less scary.",
    transitionNote: "moved from IC3 to Manager at a Series B fintech startup",
    linkedin: "https://linkedin.com/in/",
    createdAt: 1710000001,
  },
  {
    id: "maya-johnson",
    name: "Maya Johnson",
    title: "Group PM",
    seniorityLabel: "Group PM · IC4",
    seniorityLevel: 4,
    industry: "Enterprise Software/SaaS",
    availability: "Weekly",
    topics: ["Leadership development", "Stakeholder management", "Roadmap strategy"],
    bio: "Led cross-functional product teams of 30+ across three business units. Passionate about growing the next generation of PM leaders.",
    superpower: "Turning messy stakeholder dynamics into clear roadmaps.",
    transitionNote: "grew from IC PM to managing a team of 8 PMs across 3 product lines",
    linkedin: "https://linkedin.com/in/",
    createdAt: 1710000002,
  },
  {
    id: "sara-lin",
    name: "Sara Lin",
    title: "PM",
    seniorityLabel: "PM · IC2",
    seniorityLevel: 2,
    industry: "Healthcare/Nanotechnology/Wearable",
    availability: "As needed",
    topics: ["Interview prep", "Career transition", "Work-life balance"],
    bio: "Broke into PM from a non-traditional background. Now building patient-facing products at a digital health startup.",
    superpower: "Helping underrepresented candidates break into PM.",
    transitionNote: "transitioned into PM from a non-traditional background with no CS degree",
    linkedin: "https://linkedin.com/in/",
    createdAt: 1710000003,
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    title: "Director of Product",
    seniorityLabel: "Director · Dir+",
    seniorityLevel: 6,
    industry: "Retail/eCommerce",
    availability: "Async only",
    topics: ["Salary negotiation", "Promotion strategy", "Leadership development"],
    bio: "15 years in consumer product. Two-time Director. Known for negotiation coaching.",
    superpower: "Helping PMs get paid what they're worth.",
    transitionNote: "went from Senior PM to Director twice at two different consumer companies",
    linkedin: "https://linkedin.com/in/",
    createdAt: 1710000004,
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
    bio: "Currently advising early-stage founders on product-market fit.",
    superpower: "Translating vision into execution.",
    transitionNote: "moved from IC5 at a public company to advising 3 early-stage startups",
    linkedin: "https://linkedin.com/in/",
    createdAt: 1710000005,
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

// Sector clusters — mentors and seekers in the same cluster score 12 pts (adjacent)
const SECTOR_CLUSTERS: string[][] = [
  ["fintech", "insurtech", "banking", "payments", "finance"],
  ["health", "healthtech", "medtech", "digital health", "nanotechnology", "wearable", "healthcare"],
  ["saas", "enterprise", "b2b", "software"],
  ["consumer", "e-commerce", "ecommerce", "marketplace", "retail"],
  ["edtech", "education", "learning"],
  ["media", "entertainment", "social"],
  ["computing", "iot", "consumer tech"],
  ["data", "analytics"],
  ["transportation", "travel", "hospitality"],
];

function getSectorCluster(industry: string): number {
  const lower = industry.toLowerCase();
  return SECTOR_CLUSTERS.findIndex((cluster) => cluster.some((kw) => lower.includes(kw)));
}

function scoreSectorAlignment(mentorIndustry: string, seekerIndustry: string | undefined, goalText: string): number {
  // Signal 1: declared seeker industry — if provided, use it exclusively
  if (seekerIndustry && seekerIndustry.trim()) {
    const seekerLower = seekerIndustry.toLowerCase();
    const mentorLower = mentorIndustry.toLowerCase();

    if (mentorLower.includes(seekerLower) || seekerLower.includes(mentorLower)) return 25;

    const seekerCluster = getSectorCluster(seekerIndustry);
    const mentorCluster = getSectorCluster(mentorIndustry);
    if (seekerCluster !== -1 && seekerCluster === mentorCluster) return 12;

    return 8; // industry declared but no match — stop here, don't scan goal
  }

  // Signal 2: no industry declared — fall back to goal text keyword scan
  const lower = goalText.toLowerCase();
  const industryLower = mentorIndustry.toLowerCase();
  const keywords = industryLower.split(/[\s\/]+/);
  for (const kw of keywords) {
    if (kw.length > 2 && lower.includes(kw)) return 25;
  }

  return 8;
}

const STOP_WORDS = new Set([
  "want",
  "need",
  "help",
  "with",
  "into",
  "move",
  "work",
  "like",
  "more",
  "make",
  "find",
  "have",
  "been",
  "that",
  "this",
  "from",
  "just",
  "also",
  "some",
  "them",
  "they",
  "will",
  "would",
  "could",
  "about",
  "their",
  "there",
  "these",
  "those",
  "which",
  "other",
  "looking",
  "trying",
  "become",
  "better",
  "really",
  "always",
]);

function scoreGoalKeyword(goal: string, bio: string, superpower: string): number {
  if (!goal.trim()) return 12;
  const words = goal
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
  const combined = (bio + " " + superpower).toLowerCase();
  let hits = 0;
  for (const w of words) {
    if (combined.includes(w)) hits++;
  }
  if (hits >= 3) return 25;
  if (hits >= 1) return 18;
  return 5;
}

function scoreAvailability(mentorAvailability: string, seekerAvailability?: string): number {
  // No seeker preference given — fall back to rewarding more available mentors
  if (!seekerAvailability) {
    switch (mentorAvailability) {
      case "Weekly":
        return 12;
      case "1–2/month":
        return 10;
      case "As needed":
        return 8;
      case "Async only":
        return 5;
      default:
        return 6;
    }
  }
  // Exact match — best score
  if (mentorAvailability === seekerAvailability) return 12;

  // Adjacent cadence — close enough
  const order = ["Weekly", "1–2/month", "As needed", "Async only"];
  const mentorIdx = order.indexOf(mentorAvailability);
  const seekerIdx = order.indexOf(seekerAvailability);
  const gap = Math.abs(mentorIdx - seekerIdx);

  if (gap === 1) return 8; // one step apart e.g. Weekly ↔ 1-2/month
  if (gap === 2) return 4; // two steps apart
  return 2; // completely mismatched (e.g. Weekly ↔ Async only)
}

function scoreMentorCapacity(maxMentees: string): number {
  switch (maxMentees) {
    case "No limit":
      return 3;
    case "3":
      return 2;
    case "2":
      return 1;
    case "1":
      return 0;
    default:
      return 1;
  }
}

function buildReason(mentor: Mentor, topics: string[], isTopicMatch: boolean): string {
  const topicPart = isTopicMatch
    ? `offers ${topics
        .filter((t) => mentor.topics.includes(t))
        .map((t) => t.toLowerCase())
        .join(", ")}`
    : `related experience in ${mentor.topics[0].toLowerCase()}`;
  return `Matched because: ${mentor.seniorityLabel} in ${mentor.industry}, ${topicPart}, ${mentor.transitionNote}.`;
}

export function runMatching(input: SeekerInput, mentorList?: Mentor[]): MatchResult[] {
  const pool = mentorList && mentorList.length > 0 ? mentorList : mentors;
  const seekerLevel = getSeekerLevel(input.careerStage);

  // Hard filter: topic match (any overlap)
  const topicMatches = pool.filter((m) => input.topics.some((t) => m.topics.includes(t)));
  const usePartial = topicMatches.length < 2;
  const candidates = usePartial ? pool : topicMatches;

  const scored: MatchResult[] = [];

  for (const mentor of candidates) {
    const seniorityScore = scoreSeniorityGap(mentor.seniorityLevel, seekerLevel);
    if (seniorityScore < 0) continue; // exclude mentors below seeker level

    const topicMatchCount = input.topics.filter((t) => mentor.topics.includes(t)).length;
    const totalTopics = input.topics.length || 1;
    const topicDepthScore = topicMatchCount === 0 ? 0 : Math.round((topicMatchCount / totalTopics) * 5);
    const isTopicMatch = topicMatchCount > 0;

    const score =
      seniorityScore +
      scoreSectorAlignment(mentor.industry, input.industry, input.goal) +
      scoreGoalKeyword(input.goal, mentor.bio, mentor.superpower) +
      scoreAvailability(mentor.availability, input.availability) +
      scoreMentorCapacity(mentor.maxMentees ?? "") +
      topicDepthScore;

    scored.push({
      mentor,
      score,
      reason: buildReason(mentor, input.topics, isTopicMatch),
      isPartialMatch: usePartial && !isTopicMatch,
    });
  }

  // Sort by score DESC, tie-break by createdAt ASC (earlier profile wins)
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.mentor.createdAt - b.mentor.createdAt;
  });

  return scored;
}
