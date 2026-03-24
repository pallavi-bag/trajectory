import { supabase } from "@/integrations/supabase/client";
import type { Mentor } from "@/lib/data";

const ROLE_LEVEL_MAP: Record<string, { level: number; label: string }> = {
  "Associate Product Manager": { level: 1, label: "APM · IC1" },
  "Product Manager": { level: 2, label: "PM · IC2" },
  "Senior Product Manager": { level: 3, label: "Senior PM · IC3" },
  "Principal Product Manager": { level: 5, label: "Principal PM · IC5" },
  "Group Product Manager": { level: 4, label: "Group PM · IC4" },
  "Director of Product": { level: 6, label: "Director · Dir+" },
  "VP Product": { level: 6, label: "VP Product · Dir+" },
  "Head of Product": { level: 6, label: "Head of Product · Dir+" },
  "Chief Product Officer": { level: 6, label: "CPO · Dir+" },
  "Founder": { level: 5, label: "Founder · IC5" },
  "Other": { level: 3, label: "PM · IC3" },
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function fetchMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from("mentors")
    .select("*")
    .eq("open_to_mentoring", true);

  if (error) {
    console.error("Failed to fetch mentors:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    title: row.title,
    seniorityLabel: row.seniority_label,
    seniorityLevel: row.seniority_level,
    industry: row.industry,
    availability: row.availability,
    topics: row.topics,
    bio: row.bio ?? "",
    superpower: row.superpower,
    linkedin: row.linkedin ?? "",
    transitionNote: row.transition_note ?? "",
    createdAt: row.created_at,
  }));
}

export async function fetchMentorById(id: string): Promise<Mentor | null> {
  const { data, error } = await supabase
    .from("mentors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    title: data.title,
    seniorityLabel: data.seniority_label,
    seniorityLevel: data.seniority_level,
    industry: data.industry,
    availability: data.availability,
    topics: data.topics,
    bio: data.bio ?? "",
    superpower: data.superpower,
    linkedin: data.linkedin ?? "",
    transitionNote: data.transition_note ?? "",
    createdAt: data.created_at,
  };
}

interface MentorFormData {
  name: string;
  title: string;
  roleLevel: string;
  industry: string;
  openToMentoring: boolean;
  topics: string[];
  availability: string;
  maxMentees: string;
  bio: string;
  superpower: string;
  linkedin: string;
}

export async function saveMentor(form: MentorFormData): Promise<void> {
  const mapping = ROLE_LEVEL_MAP[form.roleLevel] ?? { level: 3, label: "PM · IC3" };
  const id = slugify(form.name) + "-" + Date.now().toString(36);

  const { error } = await supabase.from("mentors").insert({
    id,
    name: form.name,
    title: form.title,
    seniority_label: mapping.label,
    seniority_level: mapping.level,
    industry: form.industry,
    availability: form.availability || "As needed",
    topics: form.topics,
    bio: form.bio,
    superpower: form.superpower,
    linkedin: form.linkedin,
    transition_note: `${form.roleLevel} in ${form.industry}`,
    open_to_mentoring: form.openToMentoring,
    max_mentees: form.maxMentees,
    role_level: form.roleLevel,
  });

  if (error) {
    console.error("Failed to save mentor:", error);
    throw error;
  }
}
